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

import {
  createPurchases,
  purchasesDetails,
} from "../../../Redux/Actions/purchasesActions";
import Loader02 from "../../../Components/Loaders/Loader02";
import useOutsideClick from "../../Helper/PopupData";
import { formatDate } from "../../Helper/DateFormat";
import { preventZeroVal, ShowMasterData, stringifyJSON } from "../../Helper/HelperFunctions";
import CurrencySelect, { CurrencySelect2 } from "../../Helper/ComponentHelper/CurrencySelect";
import ItemSelect from "../../Helper/ComponentHelper/ItemSelect";
import ImageUpload from "../../Helper/ComponentHelper/ImageUpload";
import { SelectAddress } from "../../Common/SelectAddress";
import { activeOrg_details } from '../../Helper/HelperFunctions';
import GenerateAutoId from "../Common/GenerateAutoId";
import TextAreaComponentWithTextLimit from "../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import SubmitButton from "../../Common/Pagination/SubmitButton";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";

import { handleFormSubmitCommon } from "../../Purchases/Utils/handleFormSubmit"
import { isStateIdEqualAction, productTypeItemAction } from "../../../Redux/Actions/ManageStateActions/manageStateData";
import { Toaster } from "react-hot-toast";
import { useEditPurchaseForm } from "../../Helper/StateHelper/EditPages/useEditPurchaseForm";

const CreatePurchaseOrder = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
  const vendorAddress = useSelector((state) => state?.updateAddress);
  // const [cusData, setCusData] = useState(null);
  const [cusData2, setCusData2] = useState(null);

  const paymentTerms = ShowMasterData("8");


  const { city, country, state, zipcode, name, email, street1, street2, mobile_no } = activeOrg_details;

  const [deliveryAddress, setDeliveryAddress] = useState("orgnization");
  const [showAllSequenceId, setShowAllSequenceId] = useState([]);


  const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
  const purchseDetails = useSelector((state) => state?.detailsPurchase);
  const createPurchse = useSelector((state) => state?.createPurchase);
  const purchseDetail = purchseDetails?.data?.purchaseOrder;
  const purchaseStatus = useSelector((state) => state?.purchseStatus);

  const params = new URLSearchParams(location.search);
  const {
    id: itemId,
    edit: isEdit,
    duplicate: isDuplicate,
  } = Object.fromEntries(params.entries());

  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  // 
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
      purchase_type: 'purchase_order',
      purchase_order_id: "",
      expected_delivery_Date: formatDate(new Date()),
      delivery_address: [
        {
          address_type: "1",
          address: null,
          customer_id: null
        }
      ],
    },//for set new key's and values
    [], // Keys to remove
    purchseDetail,
    itemId,
    isEdit,
    isDuplicate
  );

  // console.log("formData in purchases", formData)

  // set billing/shipping when customer select
  const [addSelectCus, setAddSelectCus] = useState({
    billing: "",
    shipping: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value; ``

    if (name === "shipping_charge" || name === "adjustment_charge") {
      newValue = parseFloat(value) || 0; // Convert to float or default to 0
    }

    if (name === "vendor_id" && value !== "") {
      setIsVendorSelect(true);
    } else if (name === "vendor_id" && value == "") {
      setIsVendorSelect(false);
    }

    if (name === "vendor_id") {
      const selectedItem = vendorList?.data?.user?.find(
        (cus) => cus.id == value
      );
      const findfirstbilling = selectedItem?.address?.find(
        (val) => val?.is_billing == "1"
      );
      const findfirstshipping = selectedItem?.address?.find(
        (val) => val?.is_shipping == "1"
      );
      setAddSelect({
        billing: findfirstbilling,
        shipping: findfirstshipping,
      });
    }

    if (name === "customer_id") {
      const selectedItem = cusList?.data?.user?.find((cus) => cus.id == value);
      const findfirstbilling = selectedItem?.delivery_address?.find(
        (val) => val?.is_billing == "1"
      );
      const findfirstshipping = selectedItem?.delivery_address?.find(
        (val) => val?.is_shipping == "1"
      );

      setAddSelectCus({
        billing: findfirstbilling,
        shipping: findfirstshipping,
      });
    }
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };


  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      delivery_address: {
        address_type: deliveryAddress === "customer" ? "2" : "1",
        address: deliveryAddress === "customer" ? (addSelectCus) : (`${country?.name || ""} ${city?.name || ""} ${state?.name || ""}`),
        customer_id: cusData2?.id
      }
    }))

  }, [deliveryAddress, addSelectCus, cusData2])


  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  const handleFormSubmit = (e) => {
    handleFormSubmitCommon({
      e,
      formData,
      isVendorSelect,
      dropdownRef1,
      // isItemSelect,
      setItemErrors,
      dropdownRef2,
      dispatch,
      createPurchases,
      Navigate,
      isEdit,
      showAllSequenceId,
      itemId,
      type: "purchase order",
      additionalData: {
        delivery_address: stringifyJSON(formData?.delivery_address),
        charges: stringifyJSON(formData?.charges),
      },

    });
  };

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
  }, [cusData]);


  useEffect(() => {
    if (itemId && isEdit && !purchseDetail) {
      dispatch(purchasesDetails({ id: itemId, fy: localStorage.getItem('FinancialYear'), }));
    }
    dispatch(productTypeItemAction(""));
  }, [dispatch, isEdit, itemId]);
  useOutsideClick(dropdownRef, () => setOpenDropdownIndex(null));

  return (
    <>
      {purchseDetails?.loading === true ? <Loader02 /> : <>
        {(createPurchse?.loading || purchaseStatus?.loading || vendorAddress?.loading || freezLoadingImg) && <MainScreenFreezeLoader />}
        <TopLoadbar />

        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.purchase_order_icon}
                {isEdit ? "Update Purchase Order" : " New Purchase Order"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link to={"/dashboard/purchase"} className="linkx3">
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
                        Vendor Name<b className="color_red">*</b>
                      </label>
                      <div id="sepcifixspanflex">
                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown10
                            ref={dropdownRef1}
                            label="Select vendor"
                            options={vendorList?.data?.user}
                            value={formData.vendor_id}
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

                        {!isVendorSelect && (
                          <p
                            className="error-message"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {otherIcons.error_svg}
                            Please Select Vendor
                          </p>
                        )}

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
                        <label>Purchase Order Number</label>
                        <GenerateAutoId
                          formHandlers={{ setFormData, handleChange, setShowAllSequenceId }}
                          nameVal="purchase_order_id"
                          value={formData?.purchase_order_id}
                          module="purchase_order"
                          showField={isEdit}
                        />
                      </div>

                      <div className="form_commonblock ">
                        <label>Reference</label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            type="text"
                            value={formData.reference}
                            onChange={handleChange}
                            name="reference"
                            placeholder="Enter Reference Number"
                          />
                        </span>
                      </div>

                      <div className="form_commonblock">
                        <CurrencySelect2
                          value={formData?.currency}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form_commonblock">
                        <label>Date</label>
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
                            placeholderText="Enter Shipping Date"
                            dateFormat="dd-MMM-yyyy" // Use MMM for month name
                            format="dd-MMM-yyyy" // Add format prop
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
                            defaultOption='Enter Purchase Terms'
                            type="masters"
                          />
                        </span >
                      </div>

                      <div className="form_commonblock">
                        <label>Expected Delivery Date</label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            autoComplete="off"
                            selected={formData.expected_delivery_Date}
                            onChange={(date) =>
                              setFormData({
                                ...formData,
                                expected_delivery_Date: formatDate(date),
                              })
                            }
                            name="expected_delivery_Date"
                            placeholderText="Enter Purchase Order Date"
                            dateFormat="dd-MM-yyyy"
                            minDate={formData.transaction_date}
                          />
                        </span>
                      </div>

                      <div className="form_commonblock">
                        <label>Place Of Supply</label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            type="text"
                            value={preventZeroVal(formData.place_of_supply)}
                            onChange={handleChange}
                            name="place_of_supply"
                            placeholder="Enter Place Of Supply"
                          />
                        </span>
                      </div>



                      <div className="form_commonblock">
                        <label>Sale Person</label>
                        <span>
                          {otherIcons.vendor_svg}
                          <input
                            type="text"
                            value={preventZeroVal(formData.sale_person)}
                            name="sale_person"
                            onChange={handleChange}
                            placeholder="Enter Sales Person"
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
                    />

                    <div className="secondtotalsections485s sxfc546sdfr85234e">
                      <div className="textareaofcreatqsiform">
                        <label>Terms And Conditions</label>
                        <div className='show_no_of_text_limit_0121'>
                          <TextAreaComponentWithTextLimit
                            formsValues={{ handleChange, formData }}
                            placeholder='Enter the terms and conditions of your business to be displayed in your transaction '
                            name="terms_and_condition"
                            value={preventZeroVal(formData?.terms_and_condition)}
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

                        {/* <ImageUpload
                          formData={formData}
                          setFormData={setFormData}
                          setFreezLoadingImg={setFreezLoadingImg}
                          imgLoader={imgLoader}
                          setImgeLoader={setImgLoader}
                          component="purchase"
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>

                <SubmitButton isEdit={isEdit} itemId={itemId} cancel="purchase" />
              </div>
            </DisableEnterSubmitForm>
          </div>
          <Toaster />
        </div>
      </>}
    </>
  );
};
export default CreatePurchaseOrder;
