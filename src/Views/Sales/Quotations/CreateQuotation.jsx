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
import { Toaster } from "react-hot-toast";
import ItemSelect from "../../Helper/ComponentHelper/ItemSelect";
import ImageUpload from "../../Helper/ComponentHelper/ImageUpload";
import {
  activeOrg_details,
  preventZeroVal,
  ShowMasterData,
} from "../../Helper/HelperFunctions";
import SubmitButton from "../../Common/Pagination/SubmitButton";
import { SelectAddress } from "../../Common/SelectAddress";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";
import GenerateAutoId from "../Common/GenerateAutoId";
import { CurrencySelect2 } from "../../Helper/ComponentHelper/CurrencySelect";
import TextAreaComponentWithTextLimit from "../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import {
  isStateIdEqualAction,
  productTypeItemAction,
} from "../../../Redux/Actions/ManageStateActions/manageStateData";
import { useEditPurchaseForm } from '../../Helper/StateHelper/EditPages/useEditPurchaseForm';
import { useHandleFormChange } from '../../Helper/ComponentHelper/handleChange';
import { handleFormSubmit1 } from '../../Purchases/Utils/handleFormSubmit';
import { formatDate } from '../../Helper/DateFormat';

const CreateQuotation = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  const cusList = useSelector((state) => state?.customerList);
  const quoteDetail = useSelector((state) => state?.quoteDetail);
  const quoteCreate = useSelector((state) => state?.quoteUpdate);
  const quoteDetails = quoteDetail?.data?.data?.quotation;
  const autoId = useSelector(state => state?.autoId);

  const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  const paymentTerms = ShowMasterData("8");//quotation terms


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

  // console.log("quoteDetails", quoteDetails)
  //this is the common handle select
  const {
    handleChange,
    calculateExpiryDate,
  } = useHandleFormChange({ formData, setFormData, cusList, addSelect, setAddSelect, isCustomerSelect, setIsCustomerSelect, });


  // this is the common handle submit 
  const handleFormSubmit = async (e) => {
    await handleFormSubmit1({
      e,
      formData,
      isCustomerSelect,
      setItemErrors,
      dropdownRef1,
      dropdownRef2,
      dispatch,
      navigate,
      editDub: isEdit,
      section: "quotation",
      updateDispatchAction: updateQuotation, // This is dynamic for the dispatch action
      toSelect: "customer"
    });

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

  // console.log("daaaaaaaaaaaaaaaa", formData?.transaction_date)

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
                              formHandlers={{ setFormData, handleChange }}
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
                                name='transaction_date'
                                selected={formData?.transaction_date}
                                onChange={(date) =>
                                  handleChange({
                                    target: {
                                      name: 'transaction_date',
                                      value: formatDate(date),
                                    },
                                  })
                                }
                                placeholderText="Enter Quotation Date" dateFormat="dd-MM-yyy"
                                autoComplete='off'
                              />
                            </span>
                          </div>

                          <div className="form_commonblock">
                            <label>Quotation Terms</label>

                            {/* {console.log("formData?.payment_terms", formData?.payment_terms)} */}

                            <span>
                              {otherIcons.vendor_svg}
                              <CustomDropdown04
                                autoComplete='off'
                                options={paymentTerms}
                                value={(formData?.payment_terms)}
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
                                onChange={(date) =>
                                  handleChange({
                                    target: {
                                      name: 'expiry_date',
                                      value: date,
                                    },
                                  })
                                }
                                name='expiry_date'
                                minDate={formData?.transaction_date}
                                placeholderText="Enter Expiry Date"
                                dateFormat="dd-MM-yyy"
                                autoComplete='off'
                              />
                            </span>
                          </div>

                          <div className="form_commonblock">
                            <CurrencySelect2
                              value={formData?.currency}
                              onChange={handleChange}
                            />
                          </div>


                          <div className="form_commonblock ">
                            <label >Reference Number</label>
                            <span >
                              {otherIcons.placeofsupply_svg}
                              <input type="number" value={preventZeroVal(formData.reference_no)} onChange={handleChange}
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
                                value={preventZeroVal(formData.delivery_method)}
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