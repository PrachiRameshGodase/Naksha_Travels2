
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
import { saleOrderDetails } from '../../../Redux/Actions/saleOrderActions';
import Loader02 from '../../../Components/Loaders/Loader02';
import ItemSelect from '../../Helper/ComponentHelper/ItemSelect';
import ImageUpload from '../../Helper/ComponentHelper/ImageUpload';
import { isPartiallyInViewport } from '../../Helper/is_scroll_focus';
import { activeCustomerData, preventZeroVal, ShowMasterData, stringifyJSON, validateItems } from '../../Helper/HelperFunctions';
import SubmitButton from '../../Common/Pagination/SubmitButton';
import { SelectAddress } from '../../Common/SelectAddress';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';
import ShowCustomerInfoButton from '../../Common/InsideSubModulesCommon/ShowCustomerInfoButton';
// import GenerateAutoId from '../Quotations/GenerateAutoId';
import GenerateAutoId from '../Common/GenerateAutoId';
import TextAreaComponentWithTextLimit from '../../Helper/ComponentHelper/TextAreaComponentWithTextLimit';
import { formatDate } from '../../Helper/DateFormat';
import { isStateIdEqualAction } from '../../../Redux/Actions/ManageStateActions/manageStateData';
import { useEditPurchaseForm } from '../../Helper/StateHelper/EditPages/useEditPurchaseForm';
import { confirmWithZeroAmount } from '../../Helper/ConfirmHelperFunction/ConfirmWithZeroAmount';
import { useHandleFormChange } from '../../Helper/ComponentHelper/handleChange';
import { activeOrg } from '../../Helper/ComponentHelper/ManageStorage/localStorageUtils';
import { handleFormSubmit1 } from '../../Purchases/Utils/handleFormSubmit';
const CreateSalesOrders = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const cusList = activeCustomerData();
    const addUpdate = useSelector((state) => state?.updateAddress);
    // const [cusData, setCusData] = useState(null);
    const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
    const paymentTerms = ShowMasterData("8");

    const saleDetail = useSelector((state) => state?.saleDetail);
    const saleDetails = saleDetail?.data?.data?.salesOrder;

    // const [isCustomerSelect, setIsCustomerSelect] = useState(false);
    // const [isItemSelect, setIsItemSelect] = useState(false);

    const saleStatus = useSelector((state) => state?.saleStatus);
    const quoteCreate = useSelector((state) => state?.quoteUpdate);


    const quoteDetail = useSelector((state) => state?.quoteDetail);
    const quoteDetails = quoteDetail?.data?.data?.quotation;
    const [fetchDetails, setFetchDetails] = useState([]);

    const [showAllSequenceId, setShowAllSequenceId] = useState([]);

    const activeOrg_details = activeOrg();
    const [freezLoadingImg, setFreezLoadingImg] = useState(false);

    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);

    const params = new URLSearchParams(location.search);
    const { id: itemId, edit: isEdit, convert } = Object.fromEntries(params.entries());
    useEffect(() => {
        if (!itemId) return; // Exit early if no itemId

        if (isEdit && saleDetails) {
            setFetchDetails(saleDetails); // Only set when saleDetails is available
        } else if ((convert === "toInvoice" || convert === "quotationToSale") && quoteDetails) {
            setFetchDetails(quoteDetails); // Only set when quoteDetails is available
        }
    }, [itemId, isEdit, saleDetails, quoteDetails, convert]);

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
            sale_type: 'sale_order',
            sale_order_id: null,
            shipment_date: formatDate(new Date()),
            address: [
                {}
            ],
        },
        [],
        fetchDetails,
        itemId,
        isEdit,
        convert
    );

    //this is the common handle select
    const {
        handleChange,
    } = useHandleFormChange(formData, setFormData, cusList, addSelect, setAddSelect, isCustomerSelect, setIsCustomerSelect, null);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     let newValue = value;

    //     if (name === 'shipping_charge' || name === 'adjustment_charge') {
    //         newValue = parseFloat(value) || 0; // Convert to float or default to 0
    //     }

    //     if (name === "customer_id" && value !== "") {
    //         setIsCustomerSelect(true);
    //     } else if (name === "customer_id" && value == "") {
    //         setIsCustomerSelect(false);
    //     }

    //     if (name === "customer_id") {
    //         const selectedItem = cusList?.data?.user?.find(cus => cus.id == value);

    //         const findfirstbilling = selectedItem?.address?.find(val => val?.is_billing == "1")
    //         const findfirstshipping = selectedItem?.address?.find(val => val?.is_shipping == "1")
    //         setAddSelect({
    //             billing: findfirstbilling,
    //             shipping: findfirstshipping,
    //         })
    //     }

    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: newValue,
    //         total: calculateTotal(formData.subtotal, formData.shipping_charge, formData.adjustment_charge),
    //         address: addSelect ? JSON.stringify(addSelect) : null, // Convert address array to string if addSelect is not null
    //     }));
    // };

    // addresssssssssssssssssssssssssssssssssssssssssssssssssssssssss

    // for address select


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


    //trigger show updated address then it updated
    useEffect(() => {
        if (addSelect?.billing) {
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

    const navigate = useNavigate();

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
            section: "sale-order",
            updateDispatchAction: updateQuotation, // This is dynamic for the dispatch action
            sendData
        });
    };

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     let confirmed = null;
    //     const buttonName = e.nativeEvent.submitter.name;
    //     const errors = validateItems(formData?.items);
    //     // console.log("error", errors)

    //     if (!isCustomerSelect) {
    //         if (!isPartiallyInViewport(dropdownRef1.current)) {
    //             dropdownRef1.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //             setTimeout(() => {
    //                 dropdownRef1.current.focus();
    //             }, 500);
    //         }
    //         return;
    //     }

    //     else if (errors.length > 0) {

    //         setItemErrors(errors);
    //         if (!isPartiallyInViewport(dropdownRef2.current)) {
    //             dropdownRef2.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //         }

    //         setTimeout(() => {
    //             dropdownRef2.current.focus();
    //         }, 500);
    //         return
    //     }

    //     // if the amount is zero then show a confirm for proceed to create or not....
    //     else if (parseInt(formData?.total) <= 0) {
    //         confirmed = await confirmWithZeroAmount('sale-order');
    //         // if (confirmed === false) return;
    //     }

    //     if (confirmed || confirmed == null) {
    //         try {
    //             // const { tax_name, ...formDataWithoutTaxName } = formData;
    //             const updatedItems = formData?.items?.map((item) => {
    //                 const { tax_name, ...itemWithoutTaxName } = item;
    //                 return itemWithoutTaxName;
    //             });
    //             dispatch(updateQuotation({ ...formData, items: updatedItems, address: JSON.stringify(formData?.address), charges: stringifyJSON(formData?.charges), }, Navigate, "sale-order", isEdit, buttonName, itemId, convert));

    //         } catch (error) {
    //             toast.error('Error updating quotation:', error);
    //         }

    //     }
    // };


    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            customer_type: cusData?.customer_type,
            display_name: cusData?.display_name,
            email: cusData?.email,
            phone: cusData?.mobile_no,
            address: cusData?.address?.length,
            address: addSelect,
            // payment_terms: cusData?.payment_terms == "0" ? null : cusData?.payment_terms,

        }));

        if (activeOrg_details?.state?.id === addSelect?.billing?.state?.id) {
            dispatch(isStateIdEqualAction(true));
        } else {
            dispatch(isStateIdEqualAction(false));
        }
    }, [cusData]);



    useEffect(() => {
        if (itemId && isEdit && !saleDetails) {
            dispatch(saleOrderDetails({ id: itemId, fy: localStorage.getItem('FinancialYear') }));

        } else if (itemId && convert && !quoteDetails) {
            dispatch(quotationDetails({ id: itemId, fy: localStorage.getItem('FinancialYear') }))
        }
    }, [dispatch, isEdit, itemId]);


    return (
        <>
            {saleDetail?.loading === true || quoteDetail?.loading === true ? <Loader02 /> : <>

                {(quoteCreate?.loading || saleStatus?.loading || addUpdate?.loading || freezLoadingImg) && <MainScreenFreezeLoader />}
                <TopLoadbar />

                <div className='formsectionsgrheigh'>
                    <div id="Anotherbox" className='formsectionx2'>
                        <div id="leftareax12">
                            <h1 id="firstheading">
                                <svg id="fi_9431186" height="512" viewBox="0 0 60 60" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m8.6 20h23.33l16.28 8.63-3.63 11.91a2.4 2.4 0 0 1 -2.17 1.7l-29.58 1.55z" fill="#d5e4ef"></path><circle cx="19" cy="55" fill="#262a33" r="4"></circle><circle cx="37" cy="55" fill="#262a33" r="4"></circle><circle cx="45" cy="15" fill="#19cc61" r="14"></circle><path d="m29 28h-13a1 1 0 0 1 0-2h13a1 1 0 0 1 0 2z" fill="#b9c9d6"></path><path d="m40 36h-23a1 1 0 0 1 0-2h23a1 1 0 0 1 0 2z" fill="#b9c9d6"></path><path d="m43 22a1 1 0 0 1 -.707-.293l-4-4a1 1 0 0 1 1.414-1.414l3.138 3.138 7.323-10.986a1 1 0 1 1 1.664 1.11l-8 12a1 1 0 0 1 -.732.445c-.035 0-.068 0-.1 0z" fill="#fff"></path><path d="m44 52-31.756-.007a3.24 3.24 0 0 1 -2.744-4.958l2.314-3.514c-.185-.777-.409-2.031-.768-4.051l-4.185-23.47h-5.861a1 1 0 0 1 0-2h6.7a1 1 0 0 1 .985.824s5.081 28.529 5.128 28.788a1.008 1.008 0 0 1 -.149.731l-2.484 3.772a1.241 1.241 0 0 0 1.065 1.878l31.755.007a1 1 0 0 1 0 2z" fill="#b9c9d6"></path></svg>
                                {isEdit ? "Update Sale Order" : " New Sale Order"}
                            </h1>
                        </div>
                        <div id="buttonsdata">
                            <Link to={"/dashboard/sales-orders"} className="linkx3">
                                <RxCross2 />
                            </Link>
                        </div>
                    </div>

                    <div id="formofcreateitems" >
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
                                                    <ShowCustomerInfoButton cusData={cusData} viewAllCusDetails={viewAllCusDetails} setViewAllCusDetails={setViewAllCusDetails} />
                                                </span>
                                                {!isCustomerSelect && <p className="error-message" style={{ whiteSpace: "nowrap" }}>
                                                    {otherIcons.error_svg}
                                                    Please Select Customer</p>}

                                                <SelectAddress addSelect={addSelect} setAddSelect={setAddSelect} formData={formData} setFormData={setFormData} cusData={cusData} isEdit={isEdit} itemId={itemId} viewAllCusDetails={viewAllCusDetails} setViewAllCusDetails={setViewAllCusDetails} type='customer' />

                                            </div>

                                        </div>

                                        <div className="f1wrapofcreqx1">

                                            <div className="form_commonblock">
                                                <label >Sales Order<b className='color_red'>*</b></label>
                                                <GenerateAutoId
                                                    formHandlers={{ setFormData, handleChange, setShowAllSequenceId }}
                                                    nameVal="sale_order_id"
                                                    value={formData?.sale_order_id}
                                                    module="sale_order"
                                                    showField={isEdit}
                                                />
                                            </div>

                                            <div className="form_commonblock">
                                                <label>
                                                    Sales Order Date<b className='color_red'>*</b>
                                                </label>
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

                                                        name='transaction_date'
                                                        placeholderText="Enter Sale Order Date"
                                                        dateFormat="dd-MM-yyy"
                                                    />
                                                </span>

                                            </div>

                                            <div className="form_commonblock">
                                                <label>Payment Terms</label>

                                                <span>
                                                    {otherIcons.vendor_svg}
                                                    <CustomDropdown04
                                                        label="Reason Name"
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
                                                <label>Expected Shipment Date</label>
                                                <span>
                                                    {otherIcons.date_svg}
                                                    <DatePicker
                                                        selected={formData.shipment_date}
                                                        onChange={(date) =>
                                                            setFormData({
                                                                ...formData,
                                                                shipment_date: formatDate(date),
                                                            })
                                                        }
                                                        name='shipment_date'
                                                        placeholderText="Enter Expected Shipment Date"
                                                        dateFormat="dd-MM-yyy"
                                                        autoComplete='off'
                                                        minDate={formData.transaction_date}
                                                    />
                                                </span>
                                            </div>

                                            <div className="form_commonblock">
                                                <label >Place of Supply</label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <input
                                                        autoComplete='off'
                                                        type="text"
                                                        value={formData.place_of_supply == "0" ? "" : formData.place_of_supply}
                                                        onChange={handleChange}
                                                        name='place_of_supply'

                                                        placeholder='Enter Place Of Supply'
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
                                                        value={preventZeroVal(formData?.sale_person)}
                                                        name='sale_person'
                                                        onChange={handleChange}
                                                        placeholder='Enter Sales Person'
                                                    />
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
                                        />

                                        <div className='secondtotalsections485s sxfc546sdfr85234e'>
                                            <div className='textareaofcreatqsiform'>
                                                <label>Terms And Conditions</label>
                                                <div className='show_no_of_text_limit_0121'>
                                                    <TextAreaComponentWithTextLimit
                                                        formsValues={{ handleChange, formData }}
                                                        placeholder='Enter the terms and conditions of your business to be displayed in your transaction '
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

                                <SubmitButton isEdit={isEdit} itemId={itemId} cancel="sales-orders" />

                            </div>
                        </form>
                    </div>
                </div>
                <Toaster
                    // position="bottom-right"
                    reverseOrder={false} />
            </>}
        </>
    );
};


export default CreateSalesOrders
