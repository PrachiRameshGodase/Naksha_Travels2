import React, { useEffect, useState, useRef } from 'react';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DisableEnterSubmitForm from '../../Helper/DisableKeys/DisableEnterSubmitForm';
import { useDispatch, useSelector } from 'react-redux';
import { customersList } from '../../../Redux/Actions/customerActions';
import CustomDropdown10 from '../../../Components/CustomDropdown/CustomDropdown10';
import DatePicker from "react-datepicker";

import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { Toaster, toast } from "react-hot-toast";
import { createCreditNotes, debitNotesDetails } from '../../../Redux/Actions/notesActions';
import Loader02 from '../../../Components/Loaders/Loader02';
import CustomDropdown18 from '../../../Components/CustomDropdown/CustomDropdown18';
import { billDetails, billLists } from '../../../Redux/Actions/billActions';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';
import ItemSelect from '../../Helper/ComponentHelper/ItemSelect';
import ImageUpload from '../../Helper/ComponentHelper/ImageUpload';
import { preventZeroVal, ShowMasterData } from '../../Helper/HelperFunctions';
import GenerateAutoId from '../../Sales/Common/GenerateAutoId';
import SubmitButton from '../../Common/Pagination/SubmitButton';
import TextAreaComponentWithTextLimit from '../../Helper/ComponentHelper/TextAreaComponentWithTextLimit';
import { formatDate } from '../../Helper/DateFormat';
import { useEditPurchaseForm } from '../../Helper/StateHelper/EditPages/useEditPurchaseForm';
import { useHandleFormChange } from '../../Helper/ComponentHelper/handleChange';
import { handleFormSubmit1 } from '../Utils/handleFormSubmit';
import NumericInput from '../../Helper/NumericInput';
import { CurrencySelect2 } from '../../Helper/ComponentHelper/CurrencySelect';

const CreateDebitNotes = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const addUpdate = useSelector((state) => state?.updateAddress);
    const vendorList = useSelector((state) => state?.vendorList);
    const billList = useSelector(state => state?.billList?.data?.bills);
    const billDetailss = useSelector((state) => state?.billDetail);
    const billDetail = billDetailss?.data?.bill;

    const debitNoteDetails = useSelector((state) => state?.debitNoteDetail);
    const debitNote = debitNoteDetails?.data?.data?.debit_note;

    const createCreditNote = useSelector((state) => state?.createCreditNote);

    const reasonTypeData = ShowMasterData("12");
    const [freezLoadingImg, setFreezLoadingImg] = useState(false);

    const [fetchDetails, setFetchDetails] = useState(null);

    const params = new URLSearchParams(location.search);
    const { id: itemId, edit: isEdit, duplicate: isDuplicate, convert } = Object.fromEntries(params.entries());

    useEffect(() => {
        if (itemId && isEdit || itemId && isDuplicate) {
            setFetchDetails(debitNote);
        } else if (itemId && (convert === "bill_to_debit")) {
            setFetchDetails(billDetail);
        }
    }, [itemId, isEdit, convert, billDetail, debitNote, isDuplicate])


    useEffect(() => {
        if (!itemId) return; // Exit early if no itemId
        if (itemId && debitNote) {
            setFetchDetails(debitNote);
        } else if (itemId && convert === "invoiceToCredit" && invoiceDetail) {
            setFetchDetails(invoiceDetails);
        }
    }, [itemId, isEdit, convert, debitNote, billDetail]);

    // const currency = getCurrencyValue();

    const {
        formData,
        setFormData,
        addSelect,
        setAddSelect,
        isVendorSelect,
        setIsVendorSelect,
        isBillSelect,
        setIsBillSelect,
        itemErrors,
        setItemErrors,
        imgLoader,
        setImgLoader,
        setCusData,
        cusData,
    } = useEditPurchaseForm(
        {
            tran_type: "debit_note",
            debit_note_id: null,
            bill_id: null,
            reason_type: "",
        }, //for set new key's and values
        [""], // Keys to remove
        fetchDetails,
        itemId,
        isEdit,
        convert
    );


    console.log("fetchDetails", fetchDetails)
    console.log("formData.bill_id", formData.bill_id)
    console.log("billDetail.billDetail", billDetail)
    // useEffect(() => {
    //     if ((itemId && isEdit && fetchDetails) || (itemId && isDuplicate && fetchDetails) || itemId && fetchDetails && convert) {

    //         const calculateTotalTaxAmount = () => {
    //             return fetchDetails?.items?.reduce((total, entry) => {
    //                 return total + ((entry?.tax_amount) ? parseFloat(entry?.tax_amount) : 0);
    //             }, 0);
    //         };

    //         const filterBillId = billList?.find((val) => val?.id == (+fetchDetails?.bill_id));

    //         const itemsFromApi = fetchDetails.items?.map(item => ({
    //             item_id: (+item?.item_id),
    //             quantity: (+item?.quantity),
    //             item_name: item?.item_name,
    //             gross_amount: (+item?.gross_amount),
    //             unit_id: (item?.unit_id),
    //             rate: (+item?.rate),
    //             final_amount: (+item?.final_amount),
    //             tax_rate: (+item?.tax_rate),
    //             tax_amount: (+item?.tax_amount),
    //             discount: (+item?.discount),
    //             discount_type: (+item?.discount_type),
    //             item_remark: item?.item_remark,
    //             tax_name: item?.item?.tax_preference == "1" ? "Taxable" : "Non-Taxable"
    //         }));


    //         setFormData({
    //             ...formData,
    //             id: isEdit ? itemId : 0,
    //             tran_type: 'debit_note',
    //             transaction_date: fetchDetails?.transaction_date,
    //             warehouse_id: fetchDetails?.warehouse_id,
    //             debit_note_id: fetchDetails?.debit_note_id,
    //             upload_image: fetchDetails?.upload_image,
    //             customer_type: fetchDetails?.customer_type,
    //             customer_name: fetchDetails?.customer_name,
    //             display_name: fetchDetails?.display_name,
    //             phone: fetchDetails?.phone,
    //             reason_type: fetchDetails?.reason_type,
    //             vendor_id: (+fetchDetails?.vendor_id),
    //             email: fetchDetails?.email,
    //             reference_no: fetchDetails?.reference_no,
    //             invoice_id: (+fetchDetails?.invoice_id),
    //             reference: fetchDetails?.reference,
    //             currency: fetchDetails?.currency,
    //             place_of_supply: fetchDetails?.place_of_supply == "0" ? "" : fetchDetails?.place_of_supply,
    //             sale_person: fetchDetails?.sale_person == "0" ? "" : fetchDetails?.sale_person,
    //             customer_note: fetchDetails?.customer_note,
    //             terms_and_condition: fetchDetails?.terms_and_condition,
    //             bill_id: filterBillId?.id,
    //             fy: fetchDetails?.fy,
    //             subtotal: fetchDetails?.subtotal,
    //             shipping_charge: fetchDetails?.shipping_charge,
    //             adjustment_charge: fetchDetails?.adjustment_charge,
    //             total: fetchDetails?.total,
    //             status: fetchDetails?.status,
    //             tax_amount: calculateTotalTaxAmount(),
    //             items: itemsFromApi || []
    //         });

    //         if (fetchDetails.upload_image) {
    //             setImgeLoader("success");
    //         }

    //         if (fetchDetails?.address) {
    //             const parsedAddress = JSON?.parse(fetchDetails?.address);
    //             const dataWithParsedAddress = {
    //                 ...fetchDetails,
    //                 address: parsedAddress
    //             };

    //             setAddSelect({
    //                 billing: dataWithParsedAddress?.address?.billing,
    //                 shipping: dataWithParsedAddress?.address?.shipping,
    //             });

    //             setCusData(dataWithParsedAddress?.customer)
    //         }

    //         if (fetchDetails?.vendor_id) {
    //             setIsVendorSelect(true);
    //         }



    //         if (filterBillId?.bill_id) {
    //             setIsBillSelect(false);
    //         }

    //     }
    // }, [fetchDetails, itemId, isEdit, convert, isDuplicate]);

    const sendChageData = {
        dispatch: dispatch,
        billList,
        setIsBillSelect,
        billDetails
    }

    const {
        handleChange,
    } = useHandleFormChange({ formData, setFormData, vendorList, addSelect, setAddSelect, isVendorSelect, setIsVendorSelect, sendChageData });


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     let newValue = value;

    //     if (name === 'shipping_charge' || name === 'adjustment_charge') {
    //         newValue = parseFloat(value) || 0; // Convert to float or default to 0
    //     }


    //     if (name === "vendor_id" && value !== "") {
    //         setIsVendorSelect(true);
    //     }
    //     else if (name === "vendor_id" && value == "") {
    //         setIsVendorSelect(false);
    //     }

    //     if (name == "bill_id" && value !== "") {
    //         setIsBillSelect(true);
    //     }
    //     else if (name == "bill_id" && value == "") {
    //         setIsBillSelect(false);
    //     }

    //     const selectedItem = vendorList?.data?.user?.find((cus) => cus.id == value);

    //     if (name === "vendor_id") {
    //         const findfirstbilling = selectedItem?.address?.find(
    //             (val) => val?.is_billing == "1"
    //         );
    //         const findfirstshipping = selectedItem?.address?.find(
    //             (val) => val?.is_shipping == "1"
    //         );
    //         setAddSelect({
    //             billing: findfirstbilling,
    //             shipping: findfirstshipping,
    //         });
    //     }
    //     if (name === "bill_id" && value !== "") {
    //         setIsBillSelect(true);
    //     }
    //     else if (name === "vendor_id") {
    //         setIsBillSelect(false);
    //     }

    //     setFormData({
    //         ...formData,
    //         [name]: newValue,
    //         ...(name === "vendor_id" ? { bill_id: "" } : ""),
    //         total: calculateTotal(formData.subtotal, formData.shipping_charge, formData.adjustment_charge),
    //         address: addSelect ? JSON.stringify(addSelect) : null, // Convert address array to string if addSelect is not null
    //     });
    // };



    // useEffect(() => {
    //     if (formData?.bill_id) {
    //         const getSelectedBillData = billList?.find((val) => val?.id == formData?.bill_id);

    //         const itemsFromApi = getSelectedBillData?.items?.map(item => ({
    //             item_id: (+item?.item_id),
    //             item_name: (item?.item?.name),
    //             quantity: (+item?.quantity),
    //             gross_amount: (+item?.gross_amount),
    //             unit_id: (item?.unit_id),
    //             rate: (+item?.rate),
    //             final_amount: (+item?.final_amount),
    //             tax_rate: (+item?.tax_rate),
    //             tax_amount: (+item?.tax_amount),
    //             discount: (+item?.discount),
    //             discount_type: (+item?.discount_type),
    //             item_remark: item?.item_remark,
    //             item_name: item?.item?.name,
    //             tax_name: item?.item?.tax_preference == "1" ? "Taxable" : "Non-Taxable"
    //         }));


    //         setFormData((prev) => ({
    //             ...prev,
    //             items: itemsFromApi || []
    //         }));
    //         const errors = validateItems(getSelectedBillData?.items || []);
    //         if (errors.length > 0) {
    //             setItemErrors(errors);
    //         }

    //     }

    // }, [formData?.bill_id]);

    // addresssssssssssssssssssssssssssssssssssssssssssssssssssssssss

    useEffect(() => {
        setFormData({
            ...formData,
            address: addSelect
        })
    }, [addSelect])

    //trigger show updated address then it updated
    useEffect(() => {
        if (addSelect?.billing) {
            // console.log("addreupdate response", addUpdate?.data?.address)
            setAddSelect({
                ...addSelect,
                billing: addUpdate?.data?.address,
            })
        } if (addSelect?.shipping) {
            setAddSelect({
                ...addSelect,
                shipping: addUpdate?.data?.address,
            })
        }
    }, [addUpdate])
    // addresssssssssssssssssssssssssssssssssssssssssssssssssssssssss

    const navigate = useNavigate()

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     const buttonName = e.nativeEvent.submitter.name;
    //     const errors = validateItems(formData?.items);

    //     if (errors.length > 0) {
    //         setItemErrors(errors);
    //         return;
    //     }
    //     if (handleDropdownError(isVendorSelect, vendorRef)) return;

    //     try {
    //         const updatedItems = formData.items.map((item) => {
    //             const { tax_name, ...itemWithoutTaxName } = item;
    //             return itemWithoutTaxName;
    //         });
    //         dispatch(createCreditNotes({ ...formData, items: updatedItems, address: JSON.stringify(formData?.address) }, Navigate, "debit_note", isEdit, buttonName, itemId, convert));
    //     } catch (error) {
    //         toast.error('Error updating quotation:', error);
    //     }
    // };

    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);
    const dropdownRef3 = useRef(null);

    const sendData = {
        itemId,
        convert,
        dropdownRef3,
        isBillSelect
    }

    // console.log("formdata", formData)
    const handleFormSubmit = async (e) => {
        await handleFormSubmit1({
            e,
            formData,
            isVendorSelect,
            setItemErrors,
            dropdownRef1,
            dropdownRef2,
            dispatch,
            navigate,
            editDub: isEdit,
            section: "debit_note",
            updateDispatchAction: createCreditNotes, // This is dynamic for the dispatch action
            toSelect: "vendor",
            sendData
        });
    };


    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            customer_type: cusData?.customer_type,
            display_name: cusData?.display_name || fetchDetails?.display_name,
            customer_name: cusData ? `${cusData.first_name} ${cusData.last_name}` : '',
            email: cusData?.email,
            phone: cusData?.mobile_no,

        }));
    }, [cusData]);

    useEffect(() => {

        if (itemId && !billDetail) {
            dispatch(billDetails({ id: itemId }));
        }

        else if (cusData?.id) {
            dispatch(billLists({ fy: localStorage.getItem('FinancialYear'), vendor_id: cusData?.id, status: 1 }));
        }

        else if (!debitNoteDetails && itemId && !convert) {
            dispatch(debitNotesDetails({ id: itemId }));
        }

    }, [dispatch, cusData]);

    // useEffect(() => {
    //     dispatch(vendorsLists({ fy: localStorage.getItem('FinancialYear'), active: 1, status: 1 }));
    // }, [dispatch,]);


    return (
        <>
            {debitNoteDetails?.loading === true ? < Loader02 /> : <>
                <TopLoadbar />
                {(freezLoadingImg || addUpdate?.loading || createCreditNote?.loading) && <MainScreenFreezeLoader />}

                <div className='formsectionsgrheigh'>
                    <div id="Anotherbox" className='formsectionx2'>
                        <div id="leftareax12">
                            <h1 id="firstheading">
                                {otherIcons?.credit_debit_note_svg}
                                New Debit Note
                            </h1>
                        </div>
                        <div id="buttonsdata">
                            <Link to={"/dashboard/debit-notes"} className="linkx3">
                                <RxCross2 />
                            </Link>
                        </div>
                    </div>

                    <div id="formofcreateitems" >
                        <DisableEnterSubmitForm onSubmit={handleFormSubmit}>
                            <div className="relateivdiv">
                                {/* <div className=""> */}
                                <div className="itemsformwrap">
                                    <div className="f1wrapofcreq">
                                        <div className="form_commonblock">
                                            <label >Vendor Name<b className='color_red'>*</b></label>
                                            <div id='sepcifixspanflex'>
                                                <span id=''>
                                                    {otherIcons.name_svg}
                                                    <CustomDropdown10
                                                        label="Select vendor"
                                                        options={vendorList?.data?.user}
                                                        value={formData?.vendor_id}
                                                        onChange={handleChange}
                                                        name="vendor_id"
                                                        defaultOption="Select Vendor Name"
                                                        setcusData={setCusData}
                                                        cusData={cusData}
                                                        type="vendor"
                                                        ref={dropdownRef1}
                                                    />
                                                </span>

                                                {
                                                    !isVendorSelect &&
                                                    <p className="error-message" style={{ whiteSpace: "nowrap" }}>
                                                        {otherIcons.error_svg}
                                                        Please Select Vendor
                                                    </p>
                                                }
                                            </div>


                                        </div>


                                        <div className="f1wrapofcreqx1">

                                            <div className="form_commonblock">
                                                <label>Reason</label>
                                                <span >
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
                                                <CurrencySelect2
                                                    value={formData?.currency}
                                                    onChange={handleChange}
                                                />
                                            </div>


                                            <div className="form_commonblock">
                                                <label>Bill</label>
                                                <span id=''>
                                                    {otherIcons.name_svg}
                                                    <CustomDropdown18
                                                        options={billList}
                                                        value={formData.bill_id}
                                                        onChange={handleChange}
                                                        name="bill_id"
                                                        defaultOption="Select Bill"
                                                        type="bill_no"
                                                        bill_id={convert && billDetail?.bill_no}
                                                        ref={dropdownRef3}
                                                    />
                                                </span>
                                                {
                                                    !isBillSelect &&
                                                    <p className="error-message" style={{ whiteSpace: "nowrap" }}>
                                                        {otherIcons.error_svg}
                                                        Please Select Bill
                                                    </p>
                                                }
                                            </div>



                                            <div className="form_commonblock">
                                                <label>Debit Note</label>
                                                <GenerateAutoId
                                                    formHandlers={{ setFormData, handleChange }}
                                                    nameVal="debit_note_id"
                                                    value={formData?.debit_note_id}
                                                    module="debit_note"
                                                    showField={isEdit}
                                                />
                                            </div>

                                            <div className="form_commonblock">
                                                <label>Debit Note Date</label>
                                                <span >
                                                    {otherIcons.date_svg}
                                                    <DatePicker
                                                        selected={formData.transaction_date}
                                                        onChange={(date) =>
                                                            setFormData({
                                                                ...formData,
                                                                transaction_date: formatDate(date),
                                                            })
                                                        }
                                                        name='transaction_date'
                                                        placeholderText="Enter Debit Note Date"
                                                        dateFormat="dd-MM-yyy"
                                                    />
                                                </span>
                                            </div>

                                            <div className="form_commonblock">
                                                <label>Place Of Supply<b ></b></label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <input
                                                        type="text"
                                                        value={preventZeroVal(formData.place_of_supply)}
                                                        onChange={handleChange}
                                                        name='place_of_supply'
                                                        placeholder='Enter Place Of Supply'
                                                    />
                                                </span>
                                            </div>

                                            <div className="form_commonblock ">
                                                <label >Reference Number</label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <NumericInput value={preventZeroVal(formData.reference_no)} onChange={handleChange}
                                                        // disabled
                                                        name='reference_no'
                                                        placeholder='Enter Reference Number' />
                                                </span>
                                            </div>


                                            <div className="form_commonblock">
                                                <label>Sales Person</label>
                                                <span >
                                                    {otherIcons.vendor_svg}
                                                    <input
                                                        autoComplete='off'
                                                        type="text"
                                                        value={preventZeroVal(formData.sale_person)}
                                                        name='sale_person'
                                                        onChange={handleChange}
                                                        placeholder='Enter Sales Person'
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
                                            // setIsItemSelect={setIsItemSelect}
                                            // isItemSelect={isItemSelect}
                                            extracssclassforscjkls={"extracssclassforscjkls"}
                                            dropdownRef2={dropdownRef2}
                                        />

                                        <div className='secondtotalsections485s sxfc546sdfr85234e'>
                                            <div className='textareaofcreatqsiform'>
                                                <label>Terms and Conditions</label>
                                                <div className='show_no_of_text_limit_0121'>
                                                    <TextAreaComponentWithTextLimit
                                                        formsValues={{ handleChange, formData }}
                                                        placeholder='Enter the terms and conditions of your business to be displayed in your transaction '
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
                                    <SubmitButton isEdit={isEdit} itemId={itemId} cancel="debit-notes" />

                                </div>

                            </div>
                        </DisableEnterSubmitForm>
                    </div>
                </div>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false} />
            </>}
        </>
    );
};


export default CreateDebitNotes



