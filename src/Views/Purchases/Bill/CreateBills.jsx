import React, { useEffect, useState, useRef } from "react";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import DisableEnterSubmitForm from "../../Helper/DisableKeys/DisableEnterSubmitForm";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown10 from "../../../Components/CustomDropdown/CustomDropdown10";
import DatePicker from "react-datepicker";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import { createPurchases, purchasesDetails, } from "../../../Redux/Actions/purchasesActions";
import { Toaster } from "react-hot-toast";
import { billDetails } from "../../../Redux/Actions/billActions";
import Loader02 from "../../../Components/Loaders/Loader02";
import { formatDate } from "../../Helper/DateFormat";
import { preventZeroVal, ShowMasterData } from "../../Helper/HelperFunctions";
import { CurrencySelect2 } from "../../Helper/ComponentHelper/CurrencySelect";
import ImageUpload from "../../Helper/ComponentHelper/ImageUpload";
import { GRNdetailsActions } from "../../../Redux/Actions/grnActions";
import GenerateAutoId from "../../Sales/Common/GenerateAutoId";
import TextAreaComponentWithTextLimit from "../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import SubmitButton from "../../Common/Pagination/SubmitButton";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";
import { SelectAddress } from "../../Common/SelectAddress";
import { handleFormSubmit1 } from "../Utils/handleFormSubmit";
import { useEditPurchaseForm } from "../../Helper/StateHelper/EditPages/useEditPurchaseForm";
import { isStateIdEqualAction, productTypeItemAction } from "../../../Redux/Actions/ManageStateActions/manageStateData";
import ItemSelect from "../../Helper/ComponentHelper/ItemSelect";
import { useHandleFormChange } from "../../Helper/ComponentHelper/handleChange";
import { activeOrg } from "../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const CreateBills = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vendorList = useSelector((state) => state?.vendorList);
  const getCurrency = useSelector((state) => state?.getCurrency?.data);
  const billDetailss = useSelector((state) => state?.billDetail);
  const billDetail = billDetailss?.data?.bill;
  const purchase = useSelector((state) => state?.detailsPurchase);
  const purchases = purchase?.data?.purchaseOrder;
  const createPurchse = useSelector((state) => state?.createPurchase);
  const GRNdetails = useSelector((state) => state?.GRNdetails);
  const GRNdetail = GRNdetails?.data?.bgrnill;
  const paymentTerms = ShowMasterData("8");

  const activeOrg_details = activeOrg();

  const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
  const [fetchDetails, setFetchDetails] = useState([]);


  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit, convert, duplicate: isDuplicate, } = Object.fromEntries(params.entries());

  useEffect(() => {
    if (!itemId) return;

    if (billDetail && convert !== "purchase_to_bill" && convert !== "grn_to_bill") {
      setFetchDetails(billDetail);
    } else if (convert === "purchase_to_bill" && purchases) {
      setFetchDetails(purchases);
    } else if (convert === "grn_to_bill" && GRNdetail) {
      setFetchDetails(GRNdetail);
    }
  }, [itemId, billDetail, convert, purchases, GRNdetail]);

  const {
    formData,
    setFormData,
    addSelect,
    setAddSelect,
    isVendorSelect,
    setIsVendorSelect,
    itemErrors,
    setItemErrors,
    imgLoader,
    setImgLoader,
    cusData,
    setCusData,
  } = useEditPurchaseForm(
    {
      purchase_type: 'bills',
      bill_no: "",
      source_of_supply: null,
      shipment_date: null,
      order_no: null,
    },//for set new key's and values
    [], // for Keys to remove
    fetchDetails,
    itemId,
    isEdit,
    convert
  );

  const [loading, setLoading] = useState(false);

  //this is the common handle select
  const {
    handleChange,
  } = useHandleFormChange({ formData, setFormData, addSelect, setAddSelect, setIsVendorSelect, vendorList });

  //trigger show updated address then it updated
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  // this is the common handle submit 
  const handleFormSubmit = async (e) => {
    await handleFormSubmit1({
      e,
      formData,
      setItemErrors,
      dropdownRef1,
      dropdownRef2,
      dispatch,
      navigate,
      editDub: isEdit,
      section: "bills",
      updateDispatchAction: createPurchases, // This is dynamic for the dispatch action
      sendData: {
        isVendorSelect
      },
    });

  };

  //set the customer/vendor data in formData form state when customer/vendor select
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      display_name: cusData?.display_name,
      email: cusData?.email,
      phone: cusData?.mobile_no,
      address: cusData?.address?.length,
      address: addSelect,
      payment_terms: cusData?.payment_terms == "0" ? null : cusData?.payment_terms,
    }));

    if (activeOrg_details?.state?.id === addSelect?.billing?.state?.id) {
      dispatch(isStateIdEqualAction(true));
    } else {
      dispatch(isStateIdEqualAction(false));
    }
    dispatch(productTypeItemAction(""));
  }, [cusData]);

  useEffect(() => {
    if (!itemId) return;
    const financialYear = localStorage.getItem('FinancialYear');
    if (!purchases && convert === "purchase_to_bill") {
      dispatch(purchasesDetails({ id: itemId, fy: financialYear }));
    } else if (!GRNdetail && convert === "grn_to_bill") {
      dispatch(GRNdetailsActions({ id: itemId, fy: financialYear }));
    } else if (!billDetail && !convert) {
      dispatch(billDetails({ id: itemId, fy: financialYear }));
    }
  }, [dispatch, itemId, convert, purchases, billDetail, GRNdetail]);

  const dropdownRef = useRef(null);
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // image upload from firebase
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  return (
    <>
      <Toaster reverseOrder={false} />
      <TopLoadbar />
      {billDetailss?.loading || purchase?.loading ? (
        <Loader02 />
      ) : (
        <>
          {loading && <MainScreenFreezeLoader />}
          {(freezLoadingImg || createPurchse?.loading) && <MainScreenFreezeLoader />}

          <div className="formsectionsgrheigh">
            <div id="Anotherbox" className="formsectionx2">
              <div id="leftareax12">
                <h1 id="firstheading">
                  {otherIcons.all_bills_svg}
                  {isEdit ? "Update Bill" : "New Bill"}

                </h1>
              </div>
              <div id="buttonsdata">
                <Link to={"/dashboard/bills"} className="linkx3">
                  <RxCross2 />
                </Link>
              </div>
            </div>

            <div id="formofcreateitems">
              <DisableEnterSubmitForm onSubmit={handleFormSubmit}>
                <div className="relateivdiv">
                  <div className="itemsformwrap">
                    <div className="f1wrapofcreq">
                      <div className="form_commonblock">
                        <label>
                          Vendor Name <b className="color_red">*</b>
                        </label>
                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}

                            <CustomDropdown10
                              ref={dropdownRef1}
                              label="Select vendor"
                              options={vendorList?.data?.user}
                              value={formData?.vendor_id}
                              onChange={handleChange}
                              name="vendor_id"
                              defaultOption="Select Vendor Name"
                              setcusData={setCusData}
                              cusData={cusData}
                              type="vendor"
                              required
                            />

                            {cusData && (
                              <div className="view_all_cus_deial_btn">
                                {viewAllCusDetails === true ? (
                                  <button
                                    type="button"
                                    onClick={() => setViewAllCusDetails(false)}
                                    onKeyDown={(event) => {
                                      if (event.key === "Enter") {
                                        setViewAllCusDetails(false);
                                      }
                                    }}
                                  >
                                    Hide Vendor Information
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setViewAllCusDetails(true)}
                                    onKeyDown={(event) => {
                                      if (event.key === "Enter") {
                                        setViewAllCusDetails(true);
                                      }
                                    }}
                                  >
                                    View Vendor Information
                                  </button>
                                )}
                              </div>
                            )}

                          </span>
                          {
                            !isVendorSelect &&
                            <p className="error-message" style={{ whiteSpace: "nowrap" }}>
                              {otherIcons.error_svg}
                              Please Select Vendor
                            </p>
                          }

                          <SelectAddress
                            addSelect={addSelect}
                            setAddSelect={setAddSelect}
                            formData={formData}
                            setFormData={setFormData}
                            cusData={cusData}
                            viewAllCusDetails={viewAllCusDetails}
                            setViewAllCusDetails={setViewAllCusDetails}
                            type="vendor"
                          />
                        </div>
                      </div>
                      <div className="f1wrapofcreqx1">
                        <div className="form_commonblock">
                          <label>Bill<b className="color_red">*</b></label>
                          <GenerateAutoId
                            formHandlers={{
                              setFormData,
                              handleChange,
                            }}
                            nameVal="bill_no"
                            value={formData?.bill_no}
                            module="bill"
                            showField={isEdit}

                          />

                        </div>

                        <div className="form_commonblock">
                          <label>Bill Date <b className="color_red">*</b></label>
                          <span>
                            {otherIcons.date_svg}
                            <DatePicker
                              selected={formData.transaction_date}
                              onChange={(date) =>
                                setFormData({
                                  ...formData,
                                  transaction_date: formatDate(date),
                                })
                              }
                              name="transaction_date"
                              placeholderText="Enter Bill Date"
                              autoComplete="off"
                              dateFormat="dd-MM-yyy"
                              required
                            />
                          </span>
                        </div>

                        <div className="form_commonblock ">
                          <label>Payment Terms</label>
                          <span>
                            {otherIcons.vendor_svg}
                            <CustomDropdown04
                              autoComplete='off'
                              options={paymentTerms}
                              value={formData?.payment_terms}
                              onChange={handleChange}
                              name="payment_terms"
                              defaultOption='Enter Payment Terms'
                              type="masters"
                            />
                          </span >
                        </div>

                        <div className="form_commonblock">
                          <label>Due Date</label>
                          <span>
                            {otherIcons.date_svg}
                            <DatePicker
                              selected={formData.expiry_date}
                              onChange={(date) =>
                                setFormData({
                                  ...formData,
                                  expiry_date: formatDate(date),
                                })
                              }
                              dateFormat="dd-MM-yyy"
                              autoComplete='off'
                              name="expiry_date"
                              placeholderText="Enter Due Date"
                              minDate={formData?.transaction_date}
                            />
                          </span>
                        </div>

                        <div className="form_commonblock">
                          <CurrencySelect2
                            options={getCurrency?.currency}
                            value={formData?.currency}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form_commonblock">
                          <label>Place Of Supply</label>
                          <span>
                            {otherIcons.placeofsupply_svg}
                            <input
                              type="text"
                              value={preventZeroVal(formData?.place_of_supply)}
                              onChange={handleChange}
                              name="place_of_supply"
                              autoComplete="off"
                              placeholder="Enter Place Of Supply"
                            />
                          </span>
                        </div>

                        <div className="form_commonblock">
                          <label>Reference Number</label>
                          <span>
                            {otherIcons.placeofsupply_svg}
                            <input
                              type="text"
                              value={preventZeroVal(formData?.reference_no)}
                              onChange={handleChange}
                              name="reference_no"
                              autoComplete="off"
                              placeholder="Enter Reference Number"
                            />
                          </span>
                        </div>


                        <div className="form_commonblock ">
                          <label>Order Number</label>
                          <span>
                            {otherIcons.placeofsupply_svg}
                            <input
                              type="text"
                              value={preventZeroVal(formData.order_no)}
                              onChange={handleChange}
                              // disabled
                              name="order_no"
                              placeholder="Enter Order Number"
                              autoComplete="off"
                            />
                          </span>
                        </div>

                        <div></div>

                      </div>
                    </div>
                    {/* </div> */}

                    <div className="" style={{ padding: 0 }}>

                      {fetchDetails && formData?.items &&
                        <ItemSelect
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          itemErrors={itemErrors}
                          setItemErrors={setItemErrors}
                          extracssclassforscjkls={"extracssclassforscjkls"}
                          dropdownRef2={dropdownRef2}
                        />
                      }

                      <div className="secondtotalsections485s sxfc546sdfr85234e">
                        <div className="textareaofcreatqsiform">
                          <label>Terms And Conditions</label>
                          <div className="show_no_of_text_limit_0121">
                            <TextAreaComponentWithTextLimit
                              formsValues={{ handleChange, formData }}
                              placeholder="Enter the terms and conditions of your business to be displayed in your transaction "
                              name="terms_and_condition"
                              value={
                                formData?.terms_and_condition == 0
                                  ? ""
                                  : formData.terms_and_condition
                              }
                            />
                          </div>
                        </div>

                        <div id="imgurlanddesc" className="calctotalsectionx2">
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
                  <SubmitButton isEdit={isEdit} itemId={itemId} cancel="bills" />
                </div>
              </DisableEnterSubmitForm>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateBills;