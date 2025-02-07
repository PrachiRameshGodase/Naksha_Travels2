import React, { useEffect, useState, useRef } from "react";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown10 from "../../../Components/CustomDropdown/CustomDropdown10";
import { invoiceLists } from "../../../Redux/Actions/listApisActions";
import DatePicker from "react-datepicker";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import { Toaster } from "react-hot-toast";
import {
  createCreditNotes,
  creditNotesDetails,
} from "../../../Redux/Actions/notesActions";
import CustomDropdown17 from "../../../Components/CustomDropdown/CustomDropdown17";
import Loader02 from "../../../Components/Loaders/Loader02";

import {
  preventZeroVal,
  ShowMasterData,
} from "../../Helper/HelperFunctions";
import ImageUpload from "../../Helper/ComponentHelper/ImageUpload";
import SubmitButton from "../../Common/Pagination/SubmitButton";
import { SelectAddress } from "../../Common/SelectAddress";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";
import GenerateAutoId from "../Common/GenerateAutoId";
import TextAreaComponentWithTextLimit from "../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { invoiceDetailes } from "../../../Redux/Actions/invoiceActions";
import { formatDate } from "../../Helper/DateFormat";
import { useEditPurchaseForm } from "../../Helper/StateHelper/EditPages/useEditPurchaseForm";
import { isStateIdEqualAction } from "../../../Redux/Actions/ManageStateActions/manageStateData";
import ItemSelect from "../../Helper/ComponentHelper/ItemSelect";
import { useHandleFormChange } from "../../Helper/ComponentHelper/handleChange";
import { handleFormSubmit1 } from "../../Purchases/Utils/handleFormSubmit";
import { activeOrg, financialYear } from "../../Helper/ComponentHelper/ManageStorage/localStorageUtils";
import { CurrencySelect2 } from "../../Helper/ComponentHelper/CurrencySelect";

const CreateCreditNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeOrg_details = activeOrg();

  const location = useLocation();
  const cusList = useSelector((state) => state?.customerList);
  const addUpdate = useSelector((state) => state?.updateAddress);

  const invoiceList = useSelector((state) => state?.invoiceList?.data?.invoice);
  const invoiceDetail = useSelector((state) => state?.invoiceDetail);
  const invoiceDetails = invoiceDetail?.data?.data?.Invoice;

  const quoteDetail = useSelector((state) => state?.creditNoteDetail);
  const creditNoteDetail = quoteDetail?.creditDetail?.data?.CreditNote;
  const createCreditNote = useSelector((state) => state?.createCreditNote);

  const reasonTypeData = ShowMasterData("12");

  // const [imgLoader, setImgLoader] = useState("");

  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  // const [isCustomerSelect, setIsCustomerSelect] = useState(false);
  // const [isItemSelect, setIsItemSelect] = useState(false);

  // const [cusData, setCusData] = useState(null);
  const [viewAllCusDetails, setViewAllCusDetails] = useState(false);

  const [fetchDetails, setFetchDetails] = useState([]);

  const params = new URLSearchParams(location.search);
  const {
    id: itemId,
    edit: isEdit,
    duplicate: isDuplicate,
    convert,
  } = Object.fromEntries(params.entries());

  useEffect(() => {
    if (!itemId) return; // Exit early if no itemId
    if (itemId && creditNoteDetail) {
      setFetchDetails(creditNoteDetail);
    } else if (itemId && convert === "invoiceToCredit" && invoiceDetail) {
      setFetchDetails(invoiceDetails);
    }
  }, [itemId, isEdit, convert, creditNoteDetail, invoiceDetail]);

  const {
    formData,
    setFormData,
    addSelect,
    setAddSelect,
    isCustomerSelect,
    setIsCustomerSelect,
    isInvoiceSelect,
    setIsInvoiceSelect,
    itemErrors,
    setItemErrors,
    imgLoader,
    setImgLoader,
    setCusData,
    cusData,
  } = useEditPurchaseForm(
    {
      tran_type: "credit_note",
      credit_note_id: null,
      invoice_id: null,
      reason_type: "",
    }, //for set new key's and values
    [""], // Keys to remove
    fetchDetails,
    itemId,
    isEdit,
    convert
  );

  console.log("fetchDetails", fetchDetails)
  console.log("formData.bill_id", formData.invoice_id)

  const sendChageData = {
    dispatch: dispatch,
    invoiceList,
    setIsInvoiceSelect,
    invoiceDetailes
  }

  const {
    handleChange,
  } = useHandleFormChange({ formData, setFormData, cusList, addSelect, setAddSelect, isCustomerSelect, setIsCustomerSelect, sendChageData });



  // trigger show updated address..
  useEffect(() => {
    if (addSelect?.billing) {
      // console.log("addreupdate response", addUpdate?.data?.address)
      setAddSelect({
        ...addSelect,
        billing: addUpdate?.data?.address,
      });
    }
    if (addSelect?.shipping) {
      setAddSelect({
        ...addSelect,
        shipping: addUpdate?.data?.address,
      });
    }
  }, [addUpdate]);
  //trigger show updated address then it updated
  // addresssssssssssssssssssssssssssssssssssssssssssssssssssssssss

  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);


  const sendData = {
    itemId,
    convert,
    dropdownRef3,
    isInvoiceSelect
  }

  // console.log("formdata", formData)
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
      section: "credit",
      updateDispatchAction: createCreditNotes, // This is dynamic for the dispatch action
      toSelect: "customer",
      sendData
    });
  };

  // console.log("formdata", formData)

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      display_name: cusData?.display_name,
      email: cusData?.email,
      phone: cusData?.mobile_no,
      address: cusData?.address?.length,
      address: addSelect,
      payment_terms:
        cusData?.payment_terms == "0" ? null : cusData?.payment_terms,
    }));

    if (activeOrg_details?.state?.id === addSelect?.billing?.state?.id) {
      dispatch(isStateIdEqualAction(true));
    } else {
      dispatch(isStateIdEqualAction(false));
    }
  }, [cusData]);

  useEffect(() => {
    if (itemId && !invoiceDetails) {
      dispatch(invoiceDetailes({ id: itemId }));
    } else if (cusData?.id) {
      dispatch(
        invoiceLists({
          fy: financialYear(),
          customer_id: cusData?.id,
          status: 1,
        })
      );
    } else if (!creditNoteDetail && itemId && !convert) {
      dispatch(creditNotesDetails({ id: itemId }));
    }
  }, [dispatch, cusData]);


  return (
    <>
      {quoteDetail?.loading ||
        // invoiceDetail?.loading 

        creditNoteDetail?.loading
        ? (
          <Loader02 />
        ) : (
          <>
            <TopLoadbar />
            {(freezLoadingImg ||
              addUpdate?.loading ||
              createCreditNote?.loading) && <MainScreenFreezeLoader />}

            <div className="formsectionsgrheigh">
              <div id="Anotherbox" className="formsectionx2">
                <div id="leftareax12">
                  <h1 id="firstheading">
                    {otherIcons?.credit_debit_note_svg}
                    New Credit Note
                  </h1>
                </div>
                <div id="buttonsdata">
                  <Link to={"/dashboard/credit-notes"} className="linkx3">
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
                          <label>
                            Customer Name<b className="color_red">*</b>
                          </label>
                          <div id="sepcifixspanflex">
                            <span id="">
                              {otherIcons.name_svg}
                              <CustomDropdown10
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
                                      Hide Customer Information
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
                                      View Customer Information
                                    </button>
                                  )}
                                </div>
                              )}
                            </span>
                            {!isCustomerSelect && (
                              <p
                                className="error-message"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                {otherIcons.error_svg}
                                Please Select Customer
                              </p>
                            )}
                            <SelectAddress
                              addSelect={addSelect}
                              setAddSelect={setAddSelect}
                              formData={formData}
                              setFormData={setFormData}
                              cusData={cusData}
                              isEdit={isEdit}
                              itemId={itemId}
                              viewAllCusDetails={viewAllCusDetails}
                              setViewAllCusDetails={setViewAllCusDetails}
                              type="customer"
                            />
                          </div>
                        </div>

                        <div className="f1wrapofcreqx1">
                          <div className="form_commonblock">
                            <label>Reason</label>
                            <span>
                              {otherIcons.vendor_svg}
                              <CustomDropdown04
                                label="Reason Name"
                                options={reasonTypeData}
                                value={formData?.reason_type}
                                onChange={handleChange}
                                name="reason_type"
                                defaultOption="Select Reason"
                                type="masters"
                              />
                            </span>
                          </div>

                          <div className="form_commonblock">
                            <label>Invoice</label>
                            {/* {console.log("invoiceList", invoiceList)} */}
                            <span id="">
                              {otherIcons.name_svg}
                              <CustomDropdown17
                                ref={dropdownRef3}
                                options={invoiceList}
                                value={formData.invoice_id}
                                onChange={handleChange}
                                name="invoice_id"
                                defaultOption="Select Inoivce"
                                type="invoice_no"
                                invoice_id={convert && invoiceDetails?.invoice_id}
                              />
                            </span>
                            {!isInvoiceSelect && (
                              <p
                                className="error-message"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                {otherIcons.error_svg}
                                Please Select Invoie
                              </p>
                            )}
                          </div>

                          <div className="form_commonblock">
                            <label>Credit Note No</label>

                            <GenerateAutoId
                              formHandlers={{
                                setFormData,
                                handleChange,
                              }}
                              nameVal="credit_note_id"
                              value={formData?.credit_note_id}
                              module="credit_note"
                              showField={isEdit}
                            />
                          </div>
                          <div className="form_commonblock">
                            <label>Credit Note Date</label>
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
                                placeholderText="Enter Credit Note Date"
                                dateFormat="dd-MM-yyy"
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
                            <label>Place Of Supply</label>
                            <span>
                              {otherIcons.placeofsupply_svg}
                              <input
                                type="text"
                                value={preventZeroVal(formData.place_of_supply)}
                                onChange={handleChange}
                                name="place_of_supply"
                                autoComplete="off"
                                placeholder="Enter Place of Supply"
                              />
                            </span>
                          </div>

                          {/* <div className="form_commonblock">
                                                <label>Currency</label>
                                                <span >
                                                    {otherIcons.currency_icon}

                                                    <CustomDropdown12
                                                        autoComplete='off'
                                                        label="Item Name"
                                                        options={getCurrency?.currency}
                                                        value={formData?.currency}
                                                        onChange={handleChange}
                                                        name="currency"
                                                        defaultOption="Select Currency"
                                                    />
                                                </span>
                                            </div> */}

                          <div className="form_commonblock ">
                            <label>Reference Number</label>
                            <span>
                              {otherIcons.placeofsupply_svg}
                              <input
                                type="text"
                                value={preventZeroVal(formData.reference_no)}
                                onChange={handleChange}
                                // disabled
                                autoComplete="off"
                                name="reference_no"
                                placeholder="Enter Reference Number"
                              />
                            </span>
                          </div>

                          {/* <div className="form_commonblock ">
                                            <label >Subject</label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <input type="text" value={formData.subject} onChange={handleChange}
                                                    // disabled
                                                    name='subject'
                                                    placeholder='Enter Subject' />
                                            </span>
                                        </div> */}

                          <div className="form_commonblock">
                            <label>Sales Person</label>
                            <span>
                              {otherIcons.vendor_svg}
                              <input
                                autoComplete="off"
                                type="text"
                                value={preventZeroVal(formData.sale_person)}
                                name="sale_person"
                                onChange={handleChange}
                                placeholder="Enter Sales Person"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}

                      <div className="">

                        {invoiceDetail?.loading ? <Loader02 style={{ margin: "34px auto" }} /> :
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
                          />}
                      </div>

                      <div className="secondtotalsections485s sxfc546sdfr85234e">
                        <div className="textareaofcreatqsiform">
                          <label>Terms And Conditions</label>
                          <div className="show_no_of_text_limit_0121">
                            <TextAreaComponentWithTextLimit
                              formsValues={{ handleChange, formData }}
                              placeholder="Enter the terms and conditions of your business to be displayed in your transaction "
                              name="terms_and_condition"
                              value={preventZeroVal(
                                formData?.terms_and_condition
                              )}
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

                    <SubmitButton
                      isEdit={isEdit}
                      itemId={itemId}
                      cancel="credit-notes"
                    />
                  </div>
                </form>
              </div>
            </div>
            <Toaster position="bottom-right" reverseOrder={false} />
          </>
        )}
    </>
  );
};

export default CreateCreditNotes;
