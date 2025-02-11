import React, { useEffect, useState, useRef, useMemo } from 'react';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdown10 from '../../../Components/CustomDropdown/CustomDropdown10';
import { accountLists } from '../../../Redux/Actions/listApisActions';
import DatePicker from "react-datepicker";
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { Toaster, toast } from "react-hot-toast";
import { paymentRecDetail, updatePaymentRec } from '../../../Redux/Actions/PaymentRecAction';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';
import { IoCheckbox } from 'react-icons/io5';
import { formatDate } from '../../Helper/DateFormat';
import CustomDropdown15 from '../../../Components/CustomDropdown/CustomDropdown15';
import { invoiceDetailes, pendingInvoices } from '../../../Redux/Actions/invoiceActions';
import NumericInput from '../../Helper/NumericInput';
import { SubmitButton2 } from '../../Common/Pagination/SubmitButton';
import ImageUpload from '../../Helper/ComponentHelper/ImageUpload';
import { handleDropdownError, preventZeroVal, showAmountWithCurrencySymbolWithPoints, ShowMasterData } from '../../Helper/HelperFunctions';
import { PaymentTable } from '../../Common/InsideSubModulesCommon/ItemDetailTable';
import GenerateAutoId from '../Common/GenerateAutoId';
import TextAreaComponentWithTextLimit from '../../Helper/ComponentHelper/TextAreaComponentWithTextLimit';
import { getCurrencySymbol, getCurrencyValue } from '../../Helper/ComponentHelper/ManageStorage/localStorageUtils';
import useFetchApiData from '../../Helper/ComponentHelper/useFetchApiData';
import { CurrencySelect2 } from '../../Helper/ComponentHelper/CurrencySelect';
import { confirmIsAmountFill } from '../../Helper/ConfirmHelperFunction/ConfirmWithZeroAmount';

const CreatePaymentRec = () => {

    const dispatch = useDispatch();
    const cusList = useSelector((state) => state?.customerList);
    const addUpdate = useSelector((state) => state?.updateAddress);
    const paymentDetails = useSelector((state) => state?.paymentRecDetail);
    const allAccounts = useSelector((state) => state?.accountList);
    const accountList = allAccounts?.data?.accounts || [];

    // get currency symbol from active orgnization form localStorage

    const currencySymbol = getCurrencySymbol();

    const createPayment = useSelector((state) => state?.createPayment);
    const paymentRecStatus = useSelector((state) => state?.paymentRecStatus);

    const invoiceDetail = useSelector(state => state?.invoiceDetail);
    const invoice = invoiceDetail?.data?.data?.Invoice;

    const allPaymentMode = ShowMasterData("9");

    const [showAllSequenceId, setShowAllSequenceId] = useState([]);

    const paymentDetail = paymentDetails?.data?.data?.payment;
    const [cusData, setcusData] = useState(null);
    const pendingInvoice = useSelector((state) => state?.invoicePending);
    const [fetchDetails, setFetchDetails] = useState(null);
    const [invoiceDatas, setInoiceData] = useState("")


    const params = new URLSearchParams(location.search);
    const { id: itemId, edit: isEdit, duplicate: isDuplicate, convert, invoice_no } = Object.fromEntries(params?.entries());


    useEffect(() => {
        if (itemId && isEdit) {
            setFetchDetails(paymentDetail);
        } else if (itemId && convert) {
            setFetchDetails(invoice);
        }
    }, [itemId, isEdit, paymentDetail, invoice, convert]);


    const [formData, setFormData] = useState({
        id: 0,
        payment_id: null,
        customer_id: null,
        display_name: null,
        debit: null,
        bank_charges: null,
        transaction_date: formatDate(new Date()),
        fy: localStorage.getItem('FinancialYear'),
        payment_mode: 1,// for set payment mode to Cash. By default.
        to_acc: 50, // // for set account Pettiy Cash. By default.
        inout: 1,
        tax_deducted: null,
        tax_acc_id: 0,
        reference: "",
        terms_and_condition: "",
        customer_note: null,
        upload_image: null,
        amt_excess: null,
        entity_type: 1, // for sale    2-for purchase
        transaction_id: 0,
        currency: getCurrencyValue(),

        entries: [
            {
                invoice_id: null,
                invoice_no: null,
                invoice_amount: null,
                amount: null,
                balance_amount: null,
                date: null
            }
        ]

    },);


    useEffect(() => {
        if (itemId && isEdit && fetchDetails || itemId && isDuplicate && fetchDetails || itemId && convert && invoice) {

            const itemsFromApi = fetchDetails?.entries?.map(item => ({
                invoice_id: item?.id,
                invoice_no: item?.invoice_no,
                invoice_amount: item?.invoice_amount,
                balance_amount: item?.balance_amount,
                amount: item?.amount,
                date: formatDate(item?.invoice?.transaction_date),
            }));

            setFormData({
                ...formData,
                id: isEdit ? itemId : 0,
                payment_id: fetchDetails?.payment_id,
                customer_id: (+fetchDetails?.customer_id),
                debit: convert ? (+fetchDetails?.total) : (+fetchDetails?.debit), // amount received
                bank_charges: fetchDetails?.bank_charges,
                transaction_date: formatDate(fetchDetails?.transaction_date), // payment date
                fy: fetchDetails?.fy,
                display_name: fetchDetails?.display_name,
                payment_mode: 1,// for set payment mode to Cash. when convert.
                to_acc: 50, // // for set account Pettiy Cash. when convert.
                tax_deducted: (+fetchDetails?.tax_deducted || 0),
                tax_acc_id: (+fetchDetails?.tax_acc_id || 0),
                reference: fetchDetails?.reference,
                customer_note: fetchDetails?.customer_note,
                terms_and_condition: fetchDetails?.terms_and_condition,
                upload_image: fetchDetails?.upload_image,
                amt_excess: (+fetchDetails?.amt_excess || 0),
                // currency: fetchDetails?.currency,

                // this details will be filled when there is one invoice
                entity_type: fetchDetails?.entity_type, // for sale    2-for purchase
                transaction_id: fetchDetails?.transaction_id,

                // when there are multiple invoices
                entries: itemsFromApi || []
            });

            if (fetchDetails?.customer_id) {
                setIsCustomerSelect(true);
            }

            if (fetchDetails?.customer) {
                setcusData(fetchDetails?.customer);//if vendor data found in detail api
            }
            if (fetchDetails?.debit || fetchDetails?.total) {
                setIsAmoutSelect(true);
            }

            if (fetchDetails?.upload_image) {
                setImgeLoader("success");
            }

            if (fetchDetails?.customer_id) {
                const sendData = {
                    fy: localStorage.getItem('FinancialYear'),
                    customer_id: fetchDetails?.customer_id,
                    invoice_no: invoice_no
                }
                dispatch(pendingInvoices(sendData, setInoiceData));
            }
        }

    }, [fetchDetails, itemId, isEdit, isDuplicate, convert]);

    useEffect(() => {
        if (itemId && convert && !invoice) {
            const queryParams = {
                id: itemId,
            };
            dispatch(invoiceDetailes(queryParams));
        }
    }, [dispatch, itemId, convert]);


    const calculateTotalPayment = () => {
        const total = formData?.entries?.reduce((total, entry) => {
            return total + (entry.amount ? parseFloat(entry.amount) : 0.00);
        }, 0.00);

        return parseFloat(total?.toFixed(2)); // Ensures it's a number, not a string
    };


    const [isChecked, setIsChecked] = useState({ checkbox1: true, checkbox2: true });

    const handleCheckboxClick = (checkboxName) => {
        setIsChecked((prevState) => ({
            ...prevState,
            [checkboxName]: !prevState[checkboxName],
        }));

        const totalPayment = calculateTotalPayment(); // Get total payment from entries

        setFormData((prevFormData) => {
            if (isChecked?.checkbox1) {
                // If checkbox is checked, set form debit to unpaid amount//which is amount receive field
                setIsAmoutSelect(true);
                return { ...prevFormData, debit: parseFloat(invoiceDatas?.unpaid_amount)?.toFixed(2) };
            }

            if (totalPayment >= 1) {
                // If entries have payment, ask for confirmation before resetting
                confirmIsAmountFill(totalPayment).then((res) => {
                    if (res) {
                        // User clicked "Yes" → Reset all entries and clear debit
                        setFormData({
                            ...prevFormData,
                            debit: "",
                            entries: prevFormData?.entries?.map((entry) => ({ ...entry, amount: "" })),
                        });
                        setIsAmoutSelect(false);
                    } else {
                        // User clicked "No" → Keep debit amount as total entries amount
                        setFormData({ ...prevFormData, debit: totalPayment });
                        setIsAmoutSelect(true);
                    }
                });
            } else {
                // If no entries, reset debit and entries
                setIsAmoutSelect(false);
                return {
                    ...prevFormData,
                    debit: "",
                    entries: prevFormData?.entries?.map((entry) => ({ ...entry, amount: "" })),
                };

            }
        });
    };

    /**
     * Handles input change events for form fields.
     */

    const handleChange = (e) => {
        const { name, value } = e.target;

        let newValue = parseFloat(value) || value; // Convert value to number or default to 0

        // If the input field is one of the charges, ensure it's parsed as a float
        if (["bank_charges"].includes(name)) {
            newValue = parseFloat(value) || 0;
        }

        // Handle customer selection
        if (name === "customer_id") {
            setIsCustomerSelect(value !== ""); // Set customer selection flag

            const selectedCustomer = cusList?.data?.user?.find((cus) => cus.id == value);
            if (selectedCustomer) {
                dispatch(
                    pendingInvoices(
                        { fy: localStorage.getItem("FinancialYear"), customer_id: selectedCustomer?.id },
                        setInoiceData
                    )
                );
            }
        }

        // Handle changes in the "debit" field
        if (name === "debit" && value !== "") {
            setIsAmoutSelect(true); // Mark amount as selected

            const totalPayment = calculateTotalPayment(); // Get the total payment from entries

            if (newValue < totalPayment) {
                // If the new debit value is less than total entries, ask for confirmation
                confirmIsAmountFill(totalPayment).then((res) => {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        debit: res ? newValue : totalPayment, // Keep debit as totalPayment if user cancels
                        entries: res ? prevFormData?.entries?.map((entry) => ({ ...entry, amount: "" })) : prevFormData?.entries,
                    }));
                });
                return; // Stop further execution to wait for confirmation
            }
        }

        // Update form state with the new value
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));

    };




    useEffect(() => {
        if (!formData?.debit) {
            setFormData((prevData) => ({
                ...prevData,
                entries: prevData?.entries?.map(entry => ({
                    ...entry,
                    amount: null
                }))
            }));
        }
    }, [formData?.debit]);


    // invoiceDatas this is the pending invoice list data, pass customer id and set it inside entries
    useEffect(() => {
        if (invoiceDatas) {
            setFormData({
                ...formData,
                entries: invoiceDatas?.invoices?.map(invoice => ({
                    invoice_no: invoice?.invoice_id,
                    invoice_id: invoice?.id,
                    // amount: invoice?.amount,
                    invoice_amount: +invoice?.total,
                    balance_amount: (+invoice?.total) - (+invoice?.amount_paid),
                    date: formatDate(invoice?.transaction_date),
                    ...(invoice_no && { amount: (+invoice?.total) - (+invoice?.amount_paid) })
                }))
            })
        }
    }, [invoiceDatas]);



    // console.log("invoiceDAta", invoiceDatas)
    // console.log("formdatqa", formData)




    useEffect(() => {
        setFormData({
            ...formData,
            amt_excess: (+formData?.debit) - calculateTotalPayment()
        })
    }, [formData?.entries]);


    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);

    const [isCustomerSelect, setIsCustomerSelect] = useState(false);
    const [isAmountSelect, setIsAmoutSelect] = useState(false);

    const Navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const buttonName = e.nativeEvent.submitter.name;

        if (handleDropdownError(isCustomerSelect, dropdownRef1)) return;
        if (handleDropdownError(isAmountSelect, dropdownRef2)) return;

        try {
            // Update balance_amount in each entry
            const updatedEntries = formData?.entries?.map((entry) => {
                if (entry?.amount && entry?.balance_amount != null) {
                    return {
                        ...entry,
                        balance_amount: entry.balance_amount - entry.amount
                    };
                }
                return entry;
            });

            const entriesWithAmount = updatedEntries?.filter((val) => val?.amount > 0);

            const sendData = {
                ...formData,
                entries: entriesWithAmount,
            };

            // console.log("entriesWithAmount", entriesWithAmount)
            if (entriesWithAmount?.length <= 0) {
                toast?.error("Please Fill a Payment.")
                return;
            }

            dispatch(updatePaymentRec({ ...sendData }, Navigate, "payment_rec", isEdit, buttonName, itemId, convert, showAllSequenceId));
        } catch (error) {
            toast.error('Error updating quotation:', error);
        }
    };


    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            customer_type: cusData?.customer_type,
            display_name: cusData?.display_name,
            email: cusData?.email,
            phone: cusData?.mobile_no,
        }));
    }, [cusData]);

    useEffect(() => {
        if (itemId && !paymentDetail) {
            dispatch(paymentRecDetail({ id: itemId }));
        }
    }, [dispatch]);

    useFetchApiData(accountLists, useMemo(() => () => ({}), []), []);//call account list api one at page load

    // image upload from firebase
    const [imgLoader, setImgeLoader] = useState("");

    const [freezLoadingImg, setFreezLoadingImg] = useState(false);

    return (
        <>

            <TopLoadbar />
            {(freezLoadingImg || pendingInvoice?.loading || addUpdate?.loading || paymentRecStatus?.loading || createPayment?.loading) && <MainScreenFreezeLoader />}
            <div className='formsectionsgrheigh'>
                <div id="Anotherbox" className='formsectionx2'>
                    <div id="leftareax12">
                        <h1 id="firstheading">
                            {otherIcons?.payment_rec_svg}
                            New Payment
                        </h1>
                    </div>
                    <div id="buttonsdata">
                        <Link to={"/dashboard/quotation"} className="linkx3">
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
                                                    ref={dropdownRef1}
                                                    label="Customer Name"
                                                    options={cusList?.data?.user}
                                                    value={formData?.customer_id}
                                                    onChange={handleChange}
                                                    name="customer_id"
                                                    defaultOption="Select Customer"
                                                    setcusData={setcusData}
                                                    cusData={cusData}
                                                    type="vendor"
                                                    disabled={invoice_no}
                                                />
                                            </span>

                                            {
                                                !isCustomerSelect &&
                                                <p className="error-message" style={{ whiteSpace: "nowrap" }}>
                                                    {otherIcons.error_svg}
                                                    Please Select Customer
                                                </p>
                                            }
                                        </div>
                                    </div>


                                    <div className={`${formData?.customer_id ? "f1wrapofcreqx1" : "disabledfield f1wrapofcreqx1"}`} >

                                        <div className="form_commonblock">
                                            <label className='clcsecx12s1'>Amount Received<b className='color_red'>*</b></label>

                                            <span>
                                                {otherIcons.vendor_svg}
                                                <input
                                                    autoComplete='off'
                                                    ref={dropdownRef2}
                                                    type="number"
                                                    value={formData?.debit}
                                                    name='debit'
                                                    onChange={handleChange}
                                                    placeholder='Enter Received Amount'
                                                    className={`${!isChecked?.checkbox1 ? "disabledfield" : ""}`}
                                                    disabled={!isChecked?.checkbox1}
                                                />
                                            </span>
                                            {
                                                !isAmountSelect &&
                                                <p className="error-message" style={{ whiteSpace: "nowrap" }}>
                                                    {otherIcons.error_svg}
                                                    Please Select Or Fill Amount
                                                </p>
                                            }

                                            {invoiceDatas?.unpaid_amount ?
                                                <>
                                                    <label htmlFor="" className="xkls5663" style={{ display: "flex" }} id='xxfefe'>Receive Full Amount{" "}
                                                        {showAmountWithCurrencySymbolWithPoints(parseInt((invoiceDatas?.unpaid_amount)?.toFixed(2)))}

                                                        <IoCheckbox
                                                            className={`checkboxeffecgtparent ${isChecked.checkbox1 ? 'checkboxeffects' : ''}`}
                                                            onClick={() => handleCheckboxClick('checkbox1')}
                                                        />
                                                    </label>
                                                </> : ""}
                                        </div>


                                        <div className="form_commonblock">
                                            <label className=''>Bank Charges (If Any)</label>
                                            <span >
                                                {otherIcons.tag_svg}

                                                <NumericInput
                                                    value={formData?.bank_charges}
                                                    placeholder='Enter Bank Charges'
                                                    onChange={handleChange}
                                                    name='bank_charges'
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
                                            <label className=''>Payment Date</label>
                                            <span >
                                                {otherIcons.date_svg}
                                                <DatePicker
                                                    selected={formData?.transaction_date}
                                                    onChange={(date) =>
                                                        setFormData({
                                                            ...formData,
                                                            transaction_date: formatDate(date),
                                                        })
                                                    }
                                                    name='transaction_date'
                                                    placeholderText="Select Payment Date"
                                                    dateFormat="dd-MM-yyy"
                                                />

                                            </span>
                                        </div>

                                        <div className="form_commonblock">
                                            <label className=''>Payment Number</label>

                                            <GenerateAutoId
                                                formHandlers={{ setFormData, handleChange, setShowAllSequenceId }}
                                                nameVal="payment_id"
                                                value={formData?.payment_id}
                                                module="payment_receipt"
                                                showField={isEdit}
                                            />
                                        </div>

                                        <div className="form_commonblock">
                                            <label>Payment Mode <b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.currency_icon}
                                                <CustomDropdown04
                                                    options={allPaymentMode}
                                                    value={formData?.payment_mode}
                                                    onChange={handleChange}
                                                    name="payment_mode"
                                                    defaultOption="Select Payment Mode"
                                                    type="masters"
                                                />


                                            </span>

                                        </div>

                                        <div className="form_commonblock">
                                            <label className=''>Deposit To <b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.tag_svg}
                                                <CustomDropdown15
                                                    label="Account"
                                                    options={accountList}
                                                    value={formData?.to_acc}
                                                    onChange={handleChange}
                                                    name="to_acc"
                                                    defaultOption="Select An Account"
                                                />
                                            </span>

                                        </div>


                                        <div className="form_commonblock ">
                                            <label className=''>Reference</label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <input type="text" value={preventZeroVal(formData?.reference)} onChange={handleChange}
                                                    // disabled
                                                    name='reference'
                                                    placeholder='Enter Reference' autoComplete='off' />

                                            </span>
                                        </div>

                                    </div>
                                </div>
                                {/* </div> */}



                                <div className={`${formData?.customer_id ? "f1wrpofcreqsx2" : "disabledfield f1wrpofcreqsx2"}`}>

                                    {
                                        formData?.entries?.length >= 1 ?
                                            <>
                                                <PaymentTable formData={formData} setFormData={setFormData} section={true} />
                                            </>
                                            :
                                            <p style={{ textAlign: "center", padding: "20px 0" }}> There are no unpaid invoices associated with this customer. </p>
                                    }

                                    <div className="height5"></div>

                                    <div className='secondtotalsections485s'>
                                        <div className='textareaofcreatqsiform'>
                                            <label>Customer Note</label>
                                            <div className='show_no_of_text_limit_0121'>
                                                <TextAreaComponentWithTextLimit
                                                    formsValues={{ handleChange, formData }}
                                                    placeholder='Will be displayed on the estimate'
                                                    name="customer_note"
                                                    value={preventZeroVal(formData?.customer_note)}
                                                />
                                            </div>

                                        </div>

                                        <div className="calctotalsection">
                                            <div className="calcuparentc">
                                                <div className='clcsecx12s1'>
                                                    <label>Amount received: ({currencySymbol})</label>
                                                    <input
                                                        type="text"
                                                        value={(parseInt(formData?.debit || 0.00))?.toFixed(2)}
                                                        readOnly
                                                        placeholder='0.00'
                                                        className='inputsfocalci465s'
                                                        style={{ color: formData?.debit < 0 ? 'rgb(255, 46, 18)' : 'black', }}
                                                    />
                                                </div>

                                                <div className='clcsecx12s1'>
                                                    <label>Amount used for payment: ({currencySymbol})</label>
                                                    <input
                                                        className='inputsfocalci465s'
                                                        readOnly
                                                        type="text"
                                                        value={calculateTotalPayment()}
                                                        placeholder='0.00'
                                                    />
                                                </div>

                                                <div className='clcsecx12s1'>
                                                    <label>Amount In Excess: ({currencySymbol})</label>
                                                    <input
                                                        className='inputsfocalci465s'
                                                        readOnly
                                                        type="text"
                                                        value={formData?.amt_excess?.toFixed(2)}
                                                        placeholder='0.00'
                                                        style={{ color: formData?.amt_excess < 0 ? 'rgb(255, 46, 18)' : 'black', }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="breakerci"></div>
                                    <div className="height5"></div>


                                    <div className='secondtotalsections485s' style={{}}>
                                        <div className='textareaofcreatqsiform'>
                                            <label>Terms</label>
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
                                                setImgeLoader={setImgeLoader}
                                                component="purchase"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <SubmitButton2 isEdit={isEdit} itemId={itemId} cancel="payment-recieved" />

                        </div>
                    </form>
                </div>
            </div >
            <Toaster
                position="bottom-right"
                reverseOrder={false} />

        </>
    );
};


export default CreatePaymentRec
