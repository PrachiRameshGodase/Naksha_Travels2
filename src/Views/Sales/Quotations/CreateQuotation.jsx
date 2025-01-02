import React, { useEffect, useState, useRef } from 'react';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { quotationDetails, updateQuotation } from '../../../Redux/Actions/quotationActions';
import CustomDropdown10 from '../../../Components/CustomDropdown/CustomDropdown10';
import DatePicker from "react-datepicker";
import Loader02 from '../../../Components/Loaders/Loader02';
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { Toaster, toast } from "react-hot-toast";
import ItemSelect from '../../Helper/ComponentHelper/ItemSelect';
import ImageUpload from '../../Helper/ComponentHelper/ImageUpload';
import { isPartiallyInViewport } from '../../Helper/is_scroll_focus';
import { activeOrg_details, preventZeroVal, ShowMasterData, stringifyJSON, validateItems } from '../../Helper/HelperFunctions';
import SubmitButton from '../../Common/Pagination/SubmitButton';
import { SelectAddress } from '../../Common/SelectAddress';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';
import GenerateAutoId from '../Common/GenerateAutoId';
import CurrencySelect from '../../Helper/ComponentHelper/CurrencySelect';
import TextAreaComponentWithTextLimit from '../../Helper/ComponentHelper/TextAreaComponentWithTextLimit';
import { isStateIdEqualAction, productTypeItemAction } from '../../../Redux/Actions/ManageStateActions/manageStateData';
import { useEditPurchaseForm } from '../../Helper/StateHelper/EditPages/useEditPurchaseForm';

const CreateQuotation = () => {

  const dispatch = useDispatch();
  const cusList = useSelector((state) => state?.customerList);
  const quoteDetail = useSelector((state) => state?.quoteDetail);
  const quoteCreate = useSelector((state) => state?.quoteUpdate);
  const quoteDetails = quoteDetail?.data?.data?.quotation;
  const autoId = useSelector(state => state?.autoId);

  const [showAllSequenceId, setShowAllSequenceId] = useState([]);

  const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  const paymentTerms = ShowMasterData("8");

  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  const {
    formData,
    setFormData,
    addSelect,
    setAddSelect,
    isCustomerSelect,
    setIsCustomerSelect,
    itemErrors,
    setItemErrors,
    imgLoader,
    setImgLoader,
    setCusData,
    cusData,
  } = useEditPurchaseForm(
    {
      sale_type: 'quotation',
      quotation_id: null,
    },//for set new key's and values
    [], // Keys to remove
    quoteDetails,
    itemId,
    isEdit
  );

  const calculateExpiryDate = (transactionDate, terms) => {
    const daysMap = { "1": 15, "2": 30, "3": 45, "4": 60 };
    return new Date(transactionDate.setDate(transactionDate.getDate() + (daysMap[terms] || 0)));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'shipping_charge' || name === 'adjustment_charge') {
      newValue = parseFloat(value) || 0; // Convert to float or default to 0
    }

    if (name === "customer_id" && value !== "") {
      setIsCustomerSelect(true);
    } else if (name === "customer_id" && value === "") {
      setIsCustomerSelect(false);
    }

    if (name === "customer_id") {
      const selectedItem = cusList?.data?.user?.find(cus => cus.id == value);
      const findfirstbilling = selectedItem?.address?.find(val => val?.is_billing === 1);
      const findfirstshipping = selectedItem?.address?.find(val => val?.is_shipping === 1);
      setAddSelect({
        billing: findfirstbilling,
        shipping: findfirstshipping,
      });
    }


    if (name === "terms_and_condition") {
      // Remove spaces for counting purposes
      const countableText = value.replace(/\s/g, '');
      if (countableText.length > 300) {
        return; // Exit without updating state if limit is exceeded
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
      ...(name === "payment_terms" && value != 5 && {
        expiry_date: calculateExpiryDate(new Date(prev.transaction_date), value)
      }),

    }));
  };

  // console.log("first", formData?.payment_terms)
  const handleDateChange = (date, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: date,
      ...(name === 'expiry_date' && { payment_terms: 5 }),
      ...(name === 'transaction_date' && prev.payment_terms !== 5 && {
        expiry_date: calculateExpiryDate(new Date(date), prev.payment_terms)
      }),

    }));
  };

  const Navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.nativeEvent.submitter.name;
    const errors = validateItems(formData?.items);

    if (!isCustomerSelect) {
      if (!isPartiallyInViewport(dropdownRef1.current)) {
        dropdownRef1.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setTimeout(() => {
        dropdownRef1.current.focus();
      }, 500);

    }
    else if (errors.length > 0) {
      setItemErrors(errors);
      if (!isPartiallyInViewport(dropdownRef2.current)) {
        dropdownRef2.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setTimeout(() => {
        dropdownRef2.current.focus();
      }, 500);
    } else {
      try {
        const updatedItems = formData?.items?.map((item) => {
          const { tax_name, ...itemWithoutTaxName } = item;
          return itemWithoutTaxName;
        });

        dispatch(updateQuotation({ ...formData, items: updatedItems, address: JSON.stringify(formData?.address), charges: stringifyJSON(formData?.charges) }, Navigate, "quotation", isEdit, buttonName, showAllSequenceId));

      } catch (error) {
        toast.error('Error updating quotation:', error);
      }
    }

  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      customer_type: cusData?.customer_type,
      display_name: cusData?.display_name,
      email: cusData?.email,
      phone: cusData?.mobile_no,
      address: cusData?.address?.length,
      address: addSelect,
      payment_terms: cusData?.payment_terms == "0" ? null : cusData?.payment_terms,
      expiry_date: calculateExpiryDate(new Date(prev.transaction_date), cusData?.payment_terms)
    }));

    if (activeOrg_details?.state?.id === addSelect?.billing?.state?.id) {
      dispatch(isStateIdEqualAction(true));
    } else {
      dispatch(isStateIdEqualAction(false));
    }
  }, [cusData]);


  useEffect(() => {
    if (!quoteDetails && itemId) {
      dispatch(quotationDetails({ id: itemId, fy: localStorage.getItem('FinancialYear'), }));
    }
    dispatch(productTypeItemAction("Product"));
  }, [dispatch]);


  return (
    <>
      {
        quoteDetail?.loading === true ? <Loader02 />
          : <>
            <TopLoadbar />
            {(freezLoadingImg || quoteCreate?.loading || autoId?.loading) && <MainScreenFreezeLoader />}
            <div className='formsectionsgrheigh'>
              <div id="Anotherbox" className='formsectionx2'>
                <div id="leftareax12">
                  <h1 id="firstheading">
                    {otherIcons?.create_quotation_icon}
                    {isEdit ? "Update Quotation" : "New Quotation"}

                  </h1>
                </div>
                <div id="buttonsdata">
                  <Link to={"/dashboard/quotation"} className="linkx3">
                    <RxCross2 />
                  </Link>
                </div>
              </div>

              <div id="formofcreateitems">
                <form onSubmit={handleFormSubmit}>
                  <div className="relateivdiv">
                    <div className="itemsformwrap">
                      <div className="f1wrapofcreq">
                        <div className="form_commonblock">
                          <label >Customer Name<b className='color_red'>*</b></label>
                          <div id='sepcifixspanflex'>
                            <span id=''>
                              {otherIcons.name_svg}
                              <CustomDropdown10
                                autoComplete='off'
                                ref={dropdownRef1}
                                label="Customer Name"
                                options={cusList?.data?.user}
                                value={formData.customer_id}
                                onChange={handleChange}
                                name="customer_id"
                                defaultOption="Select Customer"
                                setcusData={setCusData}
                                cusData={cusData}
                                type="vendor"
                                required
                              />

                              {cusData &&
                                <div className="view_all_cus_deial_btn">
                                  {viewAllCusDetails === true ?
                                    <button type="button" onClick={() => setViewAllCusDetails(false)}
                                      onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                          setViewAllCusDetails(false)
                                        }
                                      }}
                                    >Hide Customer Information</button>
                                    :
                                    <button type="button" onClick={() => setViewAllCusDetails(true)}
                                      onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                          setViewAllCusDetails(true)
                                        }
                                      }}
                                    >View Customer Information</button>
                                  }
                                </div>
                              }
                            </span>

                            {
                              !isCustomerSelect &&
                              <p className="error-message" style={{ whiteSpace: "nowrap" }}>
                                {otherIcons.error_svg}
                                Please Select Customer
                              </p>
                            }

                            <SelectAddress addSelect={addSelect} setAddSelect={setAddSelect} formData={formData} setFormData={setFormData} cusData={cusData} isEdit={isEdit} itemId={itemId} viewAllCusDetails={viewAllCusDetails} setViewAllCusDetails={setViewAllCusDetails} type='customer' />

                          </div>

                        </div>


                        <div className="f1wrapofcreqx1">

                          <div className="form_commonblock">
                            <label >Quotation ID<b className='color_red'>*</b></label>
                            <GenerateAutoId
                              formHandlers={{ setFormData, handleChange, setShowAllSequenceId }}
                              nameVal="quotation_id"
                              value={formData?.quotation_id}
                              module="quotation"
                              showField={isEdit}
                            />
                          </div>

                          <div className="form_commonblock">
                            <label >Quotation Date<b className='color_red'>*</b></label>
                            <span >
                              {otherIcons.date_svg}
                              <DatePicker
                                selected={formData?.transaction_date}
                                onChange={(date) => handleDateChange(date, 'transaction_date')}
                                placeholderText="Enter Quotation Date" dateFormat="dd-MM-yyy"
                                autoComplete='off'
                              />
                            </span>
                          </div>

                          <div className="form_commonblock">
                            <label>Quotation Terms</label>

                            <span>
                              {otherIcons.vendor_svg}
                              <CustomDropdown04
                                autoComplete='off'
                                options={paymentTerms}
                                value={formData?.payment_terms}
                                onChange={handleChange}
                                name="payment_terms"
                                defaultOption='Enter Quotation Terms'
                                type="masters"
                              />
                            </span >
                          </div>

                          <div className="form_commonblock">
                            <label>Expiry Date</label>
                            <span>
                              {otherIcons.date_svg}
                              <DatePicker
                                selected={formData.expiry_date}
                                onChange={(date) => handleDateChange(date, 'expiry_date')}
                                name='expiry_date'
                                placeholderText="Enter Expiry Date"
                                dateFormat="dd-MM-yyy"
                                autoComplete='off'
                                minDate={formData?.transaction_date}
                              />
                            </span>
                          </div>

                          <div className="form_commonblock">
                            <CurrencySelect
                              value={formData?.currency}
                              onChange={handleChange}
                            />
                          </div>


                          <div className="form_commonblock ">
                            <label >Reference Number</label>
                            <span >
                              {otherIcons.placeofsupply_svg}
                              <input type="text" value={preventZeroVal(formData.reference_no)} onChange={handleChange}
                                // disabled
                                autoComplete='off'
                                name='reference_no'
                                placeholder='Enter Reference Number' />
                            </span>
                          </div>

                          <div className="form_commonblock">
                            <label>Delivery Method</label>
                            <span >
                              {otherIcons.vendor_svg}
                              <input
                                autoComplete='off'
                                type="text"
                                value={formData.delivery_method}
                                name='delivery_method'
                                onChange={handleChange}
                                placeholder='Enter Delivery Method'
                              />
                            </span>
                          </div>


                          <div>

                          </div>
                        </div>
                      </div>
                      {/* </div> */}



                      <div className="">
                        <ItemSelect
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          itemErrors={itemErrors}
                          setItemErrors={setItemErrors}
                          extracssclassforscjkls={"extracssclassforscjkls"}
                          dropdownRef2={dropdownRef2}
                          note="customer"
                          section="sales"
                        />

                        <div className='secondtotalsections485s sxfc546sdfr85234e'>
                          <div className='textareaofcreatqsiform'>
                            <label>Terms And Conditions</label>
                            <div className='show_no_of_text_limit_0121'>
                              <TextAreaComponentWithTextLimit
                                formsValues={{ handleChange, formData }}
                                placeholder="Enter the terms and conditions of your business to be displayed in your transaction "
                                name="terms_and_condition"
                                value={preventZeroVal(formData?.terms_and_condition)}
                              />
                            </div>
                          </div>

                          <div id="imgurlanddesc" className='calctotalsectionx2'>
                            <ImageUpload
                              formData={formData}
                              setFormData={setFormData}
                              setFreezLoadingImg={setFreezLoadingImg}
                              imgLoader={imgLoader}
                              setImgeLoader={setImgLoader}
                              component="purchase"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <SubmitButton isEdit={isEdit} itemId={itemId} cancel="quotation" />

                  </div>
                </form>
              </div>
            </div >
            <Toaster
              reverseOrder={false} />
          </>}

    </>
  );
};

export default CreateQuotation;