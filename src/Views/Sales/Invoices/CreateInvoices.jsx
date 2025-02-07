import React, { useEffect, useState, useRef } from 'react';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { quotationDetails, updateQuotation } from '../../../Redux/Actions/quotationActions';
import CustomDropdown10 from '../../../Components/CustomDropdown/CustomDropdown10';
import DatePicker from "react-datepicker";

import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { Toaster, toast } from "react-hot-toast";
import Loader02 from '../../../Components/Loaders/Loader02';
import { invoiceDetailes } from '../../../Redux/Actions/invoiceActions';
import { saleOrderDetails } from '../../../Redux/Actions/saleOrderActions';
import { activeCustomerData, preventZeroVal, ShowMasterData, showRealatedText, stringifyJSON, validateItems } from '../../Helper/HelperFunctions';
import ItemSelect from '../../Helper/ComponentHelper/ItemSelect';
import ImageUpload from '../../Helper/ComponentHelper/ImageUpload';
import { SelectAddress } from '../../Common/SelectAddress';
import { SubmitButton2 } from '../../Common/Pagination/SubmitButton';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';
import GenerateAutoId from '../Common/GenerateAutoId';
import TextAreaComponentWithTextLimit from '../../Helper/ComponentHelper/TextAreaComponentWithTextLimit';
import { isStateIdEqualAction, productTypeItemAction } from '../../../Redux/Actions/ManageStateActions/manageStateData';
import { useEditPurchaseForm } from '../../Helper/StateHelper/EditPages/useEditPurchaseForm';
import { useHandleFormChange } from '../../Helper/ComponentHelper/handleChange';
import { handleFormSubmit1 } from '../../Purchases/Utils/handleFormSubmit';
import { formatDate } from '../../Helper/DateFormat';
import { activeOrg } from '../../Helper/ComponentHelper/ManageStorage/localStorageUtils';
import { CurrencySelect2 } from '../../Helper/ComponentHelper/CurrencySelect';

const CreateSalesOrders = ({ section }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const activeOrg_details = activeOrg();

    const cusList = activeCustomerData();
    const addUpdate = useSelector((state) => state?.updateAddress);
    // const [cusData, setCusData] = useState(null);
    const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
    const quoteCreate = useSelector((state) => state?.quoteUpdate);
    const paymentTerms = ShowMasterData("8");
    const challanType = ShowMasterData("16");

    const invoiceDetail = useSelector((state) => state?.invoiceDetail);
    const invoiceDetails = invoiceDetail?.data?.data?.Invoice;

    const saleDetail = useSelector((state) => state?.saleDetail);

    const saleDetails = saleDetail?.data?.data?.salesOrder;

    const quoteDetail = useSelector((state) => state?.quoteDetail);
    const quoteDetails = quoteDetail?.data?.data?.quotation;
    const [fetchDetails, setFetchDetails] = useState([]);

    const params = new URLSearchParams(location.search);
    const { id: itemId, edit: isEdit, convert, duplicate: isDuplicate } = Object.fromEntries(params.entries());

    //for convert 
    useEffect(() => {

        if (!itemId) return; // Exit early if no itemId
        if (invoiceDetails && itemId) {
            setFetchDetails(invoiceDetails);
        } else if (itemId && (convert === "quotationToInvoice" && quoteDetails)) {
            setFetchDetails(quoteDetails);

        } else if (itemId && convert === "saleToInvoice" && saleDetails) {
            setFetchDetails(saleDetails);

        } else if (itemId && convert === "challanToInvoice" && invoiceDetails) {
            setFetchDetails(invoiceDetails);
        }
    }, [itemId, isEdit, convert, quoteDetails, saleDetails, invoiceDetails, isDuplicate])

    // console.log("quoteDetails", fetchDetails?.items)

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
            sale_type: 'invoice',
            quotation_id: null,
            challan_type_id: null,
            is_invoice: section === "delivery_challan" ? 0 : 1,
            invoice_id: "",
            address: [
                {}
            ],
            payment_term_day: null,
        },//for set new key's and values
        ["expiry_date"], // Keys to remove
        fetchDetails,
        itemId,
        isEdit,
        convert
    );

    // console.log("saleDetailssaleDetails", saleDetails)
    // console.log("formdaaaaaaaaaaaaaa", formData)

    //this is the common handle select
    const {
        handleChange,
    } = useHandleFormChange({ formData, setFormData, cusList, addSelect, setAddSelect, isCustomerSelect, setIsCustomerSelect, });

    //set selected billing and shipping addresses inside formData
    useEffect(() => {

        setFormData({
            ...formData,
            address: addSelect
        });
        // check orgnization state id and selected customer state is equal..
        if (activeOrg_details?.state?.id === addSelect?.billing?.state?.id) {
            dispatch(isStateIdEqualAction(true));
        } else {
            dispatch(isStateIdEqualAction(false));
        }
    }, [addSelect])
    // set selected billing and shipping addresses inside formData



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
    //trigger show updated address then it updated



    const navigate = useNavigate();

    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);

    const sendData = {
        itemId, convert
    }

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
            section: section,
            updateDispatchAction: updateQuotation, // This is dynamic for the dispatch action
            sendData,
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
            payment_terms: cusData?.payment_terms == "0" ? null : cusData?.payment_terms,
            // due_date: calculateExpiryDate(new Date(prev.transaction_date), cusData?.payment_terms)
        }));

        if (activeOrg_details?.state?.id === addSelect?.billing?.state?.id) {
            dispatch(isStateIdEqualAction(true));
        } else {
            dispatch(isStateIdEqualAction(false));
        }
    }, [cusData]);


    useEffect(() => {
        // Create sendData object
        const sendData = {
            id: itemId,
            is_invoice: section === "delivery_challan" ? 0 : 1,
        };

        // Check for invoiceDetails, quoteDetails, and saleDetails, and dispatch accordingly
        if (itemId) {
            if (convert === "quotationToInvoice" && (!quoteDetails)) {
                // console.log("Fetching quotation details for item:", itemId);
                dispatch(quotationDetails(sendData)); // Dispatch only if quoteDetails is not available
            } else if (convert === "saleToInvoice" && (!saleDetails)) {
                // console.log("Fetching sale details for item:", itemId);
                dispatch(saleOrderDetails(sendData)); // Dispatch only if saleDetails is not available
            } else if (!invoiceDetails && isEdit) {
                // console.log("Fetching invoice details for item:", itemId);
                dispatch(invoiceDetailes(sendData)); // Dispatch only if invoiceDetails is not available
            }
        }

        // Dispatch account lists and product type actions (these seem independent of the specific details)
        dispatch(productTypeItemAction("Product"));
    }, [dispatch, itemId, section, convert, invoiceDetails, quoteDetails, saleDetails]);

    // useFetchApiData(accountLists, useMemo(() => () => ({}), []), []);//call account list api one at page load


    // image upload from firebase

    const [freezLoadingImg, setFreezLoadingImg] = useState(false);

    return (
        <>
            {(invoiceDetail?.loading || quoteDetail?.loading) ? <Loader02 /> : <>
                <TopLoadbar />
                {(quoteCreate?.loading || addUpdate?.loading || freezLoadingImg || quoteCreate?.loading) && <MainScreenFreezeLoader />}
                <div className='formsectionsgrheigh'>
                    <div id="Anotherbox" className='formsectionx2'>
                        <div id="leftareax12">
                            <h1 id="firstheading">
                                <svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" id="fi_9485672"><g id="Layer_2" data-name="Layer 2"><path d="m5.75 3.5v8.5a.75.75 0 0 1 -.5.7.7.7 0 0 1 -.25.05h-3a.76.76 0 0 1 -.75-.75v-8.5a2.24 2.24 0 0 1 2.12-2.24h.13a2.25 2.25 0 0 1 2.25 2.24z" fill="#145638"></path><path d="m20.75 7v13.78a1.75 1.75 0 0 1 -2.58 1.54l-.32-.18a2.17 2.17 0 0 0 -1.35-.41 2.21 2.21 0 0 0 -1.37.42 3.94 3.94 0 0 1 -4.26 0 2.28 2.28 0 0 0 -1.37-.41 2.24 2.24 0 0 0 -1.36.41l-.31.18a1.75 1.75 0 0 1 -2.58-1.54v-17.54a2 2 0 0 0 -1.88-2h11.63a5.76 5.76 0 0 1 5.75 5.75z" fill="#0db561"></path><g fill="#fff"><path d="m16.5 7.75h-7a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 0 1.5z"></path><path d="m13.5 15.75h-4a.75.75 0 0 1 0-1.5h4a.75.75 0 0 1 0 1.5z"></path><path d="m16.5 11.75h-7a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 0 1.5z"></path></g></g></svg>
                                {isEdit ?
                                    <>
                                        {showRealatedText(section, "invoice_receive", "Invoice Receive", "delivery_challan", "Update Delivery Challan", "Update Invoice")}
                                    </>
                                    :
                                    <>
                                        {showRealatedText(section, "invoice_receive", "Invoice Receive", "delivery_challan", "New Delivery Challan", "New Invoice")}
                                    </>
                                }
                            </h1>
                        </div>
                        <div id="buttonsdata">
                            <Link to={"/dashboard/invoices"} className="linkx3">
                                <RxCross2 />
                            </Link>
                        </div>
                    </div>

                    <div id="formofcreateitems">
                        <form onSubmit={handleFormSubmit}>
                            <div className="relateivdiv">
                                {/* <div className=""> */}
                                <div className="itemsformwrap">
                                    <div className="f1wrapofcreq">
                                        <div className="form_commonblock">
                                            <label >Customer Name<b className='color_red'>*</b></label>
                                            <div id='sepcifixspanflex'>
                                                <span id=''>
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
                                                    {cusData &&
                                                        <div className="view_all_cus_deial_btn">
                                                            {viewAllCusDetails === true ?
                                                                <button type="button" onClick={() => setViewAllCusDetails(false)}
                                                                    onKeyDown={(event) => {
                                                                        if (event.key === 'Enter') {
                                                                            setViewAllCusDetails(false)
                                                                        }
                                                                    }}
                                                                >Hide customer information</button>
                                                                :
                                                                <button type="button" onClick={() => setViewAllCusDetails(true)}
                                                                    onKeyDown={(event) => {
                                                                        if (event.key === 'Enter') {
                                                                            setViewAllCusDetails(true)
                                                                        }
                                                                    }}
                                                                >View customer information</button>

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
                                                <label >{section === "delivery_challan" ? "Challan" : "Invoice"}<b className='color_red'>*</b></label>
                                                <GenerateAutoId
                                                    formHandlers={{ setFormData, handleChange }}
                                                    nameVal="invoice_id"
                                                    value={formData?.invoice_id}
                                                    module={section === "delivery_challan" ? "delivery_challan" : "invoice"}
                                                    showField={isEdit}
                                                />
                                            </div>

                                            <div className="form_commonblock">
                                                <label >{section === "delivery_challan" ? "Challan Date" : "Invoice Date"}<b className='color_red'>*</b></label>
                                                <span >
                                                    {otherIcons.date_svg}
                                                    <DatePicker
                                                        selected={formData.transaction_date}
                                                        onChange={(date) =>
                                                            handleChange({
                                                                target: {
                                                                    name: 'transaction_date',
                                                                    value: formatDate(date)
                                                                },
                                                            })
                                                        }
                                                        name='transaction_date'
                                                        placeholderText="Enter Quotation Date"
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
                                                <label>Payment Terms</label>
                                                <span>
                                                    {otherIcons.vendor_svg}
                                                    <CustomDropdown04
                                                        label="Reason Name"
                                                        options={paymentTerms}
                                                        value={formData?.payment_terms == 0 ? "" : formData?.payment_terms}
                                                        onChange={handleChange}
                                                        name="payment_terms"
                                                        defaultOption='Select Payment Terms'
                                                        type="masters"
                                                    />
                                                </span >
                                            </div>
                                            <div className="form_commonblock">
                                                <label>Due date</label>
                                                <span>
                                                    {otherIcons.date_svg}
                                                    <DatePicker
                                                        selected={formData.due_date}
                                                        onChange={(date) =>
                                                            handleChange({
                                                                target: {
                                                                    name: 'due_date',
                                                                    value: date,
                                                                },
                                                            })
                                                        }
                                                        name='due_date'
                                                        placeholderText="Enter Due date"
                                                        dateFormat="dd-MM-yyy"
                                                        minDate={formData?.transaction_date}
                                                    />

                                                </span>
                                            </div>

                                            {section === "delivery_challan" &&
                                                <div className="form_commonblock">
                                                    <label>Challan Type</label>
                                                    <span>
                                                        {otherIcons.vendor_svg}
                                                        <CustomDropdown04
                                                            label="Reason Name"
                                                            options={challanType}
                                                            value={formData?.challan_type_id}
                                                            onChange={handleChange}
                                                            name="challan_type_id"
                                                            defaultOption='Select Challan Type'
                                                            type="masters"
                                                        />
                                                    </span >
                                                </div>
                                            }

                                            <div className="form_commonblock">
                                                <label >Place Of Supply</label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <input
                                                        type="text"
                                                        value={preventZeroVal(formData.place_of_supply)}
                                                        onChange={handleChange}
                                                        name='place_of_supply'
                                                        autoComplete='off'
                                                        placeholder='Enter Place of Supply'
                                                    />
                                                </span>
                                            </div>


                                            <div className="form_commonblock ">
                                                <label >Reference</label>
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
                                            // shwoCharges={true}
                                            // invoice_section="invoice_section_style_001"
                                            section="sales"
                                        />

                                        <div className='secondtotalsections485s sxfc546sdfr85234e'>
                                            <div className='textareaofcreatqsiform'>
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
                                <SubmitButton2 isEdit={isEdit} itemId={itemId} cancel={showRealatedText(section, "invoice_receive", "invoice-approval", "delivery_challan", "delivery_challan", "invoices")}
                                />
                            </div>
                        </form>
                    </div>

                </div>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false} />
            </>}
        </>
    );
};


export default CreateSalesOrders



