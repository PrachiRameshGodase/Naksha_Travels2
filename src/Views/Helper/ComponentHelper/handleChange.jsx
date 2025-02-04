import { useSelector } from "react-redux";
import { parsePurchaseDetails } from "../StateHelper/EditPages/parsePurchaseDetails";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { confirIsCurrencyCreate } from "../ConfirmHelperFunction/ConfirmWithZeroAmount";
import { useNavigate } from "react-router-dom";

export const useHandleFormChange = ({ formData, setFormData, cusList, vendorList, setAddSelect, setIsCustomerSelect, setIsVendorSelect, sendChageData }) => {

    // fetch the currency list based on date change 
    const currencyRateList = useSelector((state) => state?.currencyRateList);
    const currencyList = currencyRateList?.data?.data || []
    const Navigate = useNavigate();

    const calculateExpiryDate = (transactionDate, terms) => {
        const daysMap = { "1": 15, "2": 30, "3": 45, "4": 60 };
        return new Date(transactionDate.setDate(transactionDate.getDate() + (daysMap[terms] || 0)));
    };

    const checkIsCurrencyCreated = async () => {
        let confirmed = null;

        const checkIsCurrencyCreated = currencyList?.find(val => val?.code === formData?.currency);
        // console.log("checkIsCurrencyCreated", checkIsCurrencyCreated)
        // console.log("formData?.currency", formData?.currency)
        // console.log("currencyList", currencyList)
        if (checkIsCurrencyCreated) {
            toast.success(`Current Rate is ${checkIsCurrencyCreated?.current_rate} ${checkIsCurrencyCreated?.current_rate} and Exchange rate is ${checkIsCurrencyCreated?.exchange_rate}`)
        } else {
            confirmed = await confirIsCurrencyCreate();
            if (confirmed) {
                const queryParams = new URLSearchParams();
                queryParams.set("date", formData?.transaction_date);
                queryParams.set("currency", formData?.currency);
                Navigate(`/dashboard/manage-currency?${queryParams.toString()}`);
            }


        }
    }

    const handleChange = ({ target: { name, value } }) => {

        if (name === "terms_and_condition" && value.replace(/\s/g, '').length > 300) return;

        const updatedFormData = {
            ...formData,
            [name]: value,



            // When payment terms is selected the expiry data and due data is show calculated acc to payment terms date
            ...(name === "payment_terms" && value !== 5 && {
                expiry_date: calculateExpiryDate(new Date(formData?.transaction_date), value),

                // for invoice and delivery challan...
                due_date: calculateExpiryDate(new Date(formData.transaction_date), value),

                payment_term_day: ["1", "2", "3", "4"].includes(value) ? [15, 30, 45, 60][value - 1] : null
            }),


            // this is for If I select expiry date then terms will custom. and  if the terms is selected and then I select transaction data select then expiry data is calculated acc. to terms...

            ...((name === "transaction_date") && formData.payment_terms != 5 && {
                // expiry_date is in quotation
                expiry_date: calculateExpiryDate(new Date(value), formData.payment_terms),

                // due date is in invoice
                due_date: calculateExpiryDate(new Date(value), formData.payment_terms),
            }),

            // when expiry_date or due_data is selected the payment terms selected custome which is 5
            ...((name === "expiry_date" || name === "due_date") && { payment_terms: 5 }),


        };


        // console.log("formData?.transaction_date", formData?.transaction_date)
        if (name === "customer_id") {
            setIsCustomerSelect(value !== "");
            const selectedItem = cusList?.data?.user?.find(cus => cus.id == value);
            setAddSelect({
                billing: selectedItem?.address?.find(addr => addr?.is_billing == 1),
                shipping: selectedItem?.address?.find(addr => addr?.is_shipping == 1),
            });

            // auto when customer selected its payment terms is calculated in payment terms dorpdown automatically also calculated due and expiry date
            if (selectedItem) {
                updatedFormData.payment_terms = selectedItem?.payment_terms;
                if (formData?.transaction_date) {

                    // this is when I select the customer the payment terms is calculated then also to be calculated expiry data and due date from transaction_date
                    updatedFormData.expiry_date = calculateExpiryDate(new Date(formData?.transaction_date), selectedItem?.payment_terms);
                    updatedFormData.due_date = calculateExpiryDate(new Date(formData?.transaction_date), selectedItem?.payment_terms);
                }
            }
        }

        // use in credit note
        if (name === "invoice_id" && value !== "") {
            sendChageData?.setIsInvoiceSelect(true);
            if (name === "invoice_id") {
                const selectedInvoice = sendChageData?.invoiceList?.find(
                    (val) => val?.id === value
                );
                if (selectedInvoice?.id) {
                    sendChageData?.dispatch(sendChageData?.invoiceDetailes({ id: selectedInvoice.id })).then((data) => {
                        if (data) {
                            // Use the data to parse details
                            const {
                                calculateTotalTaxAmount,
                                itemsFromApi,
                                all_changes,
                                total_charges,
                            } = parsePurchaseDetails(data?.Invoice);

                            console.log("itemsFromApi", itemsFromApi)
                            // Update form data with parsed details
                            console.log("data?.Invoice", data?.Invoice?.items)
                            setFormData((prevInner) => ({
                                ...prevInner,
                                tax_amount: calculateTotalTaxAmount(),
                                items: itemsFromApi,
                                charges: all_changes,
                                total_charges,
                            }));

                            // Update item selection status
                            // setIsItemSelect(!!data?.Invoice.items);
                        }
                    });
                }
            }
        } else if (name === "invoice_id" && value == "") {
            sendChageData?.setIsInvoiceSelect(false);
        }

        // use in debit note
        if (name === "bill_id" && value !== "") {
            sendChageData?.setIsBillSelect(true);
            if (name === "bill_id") {
                const selectedInvoice = sendChageData?.billList?.find(
                    (val) => val?.id === value
                );
                if (selectedInvoice?.id) {
                    sendChageData?.dispatch(sendChageData?.billDetails({ id: selectedInvoice.id })).then((data) => {
                        if (data) {
                            // Use the data to parse details
                            const {
                                calculateTotalTaxAmount,
                                itemsFromApi,
                                all_changes,
                                total_charges,
                            } = parsePurchaseDetails(data?.bill);

                            // console.log("itemsFromApi", itemsFromApi)
                            // Update form data with parsed details
                            // console.log("data?.Invoice", data?.Invoice?.items)

                            setFormData((prevInner) => ({
                                ...prevInner,
                                tax_amount: calculateTotalTaxAmount(),
                                items: itemsFromApi,
                                charges: all_changes,
                                total_charges,
                            }));

                            // Update item selection status
                            // setIsItemSelect(!!data?.Invoice.items);
                        }
                    });
                }
            }
        } else if (name === "bill_id" && value == "") {
            sendChageData?.setIsBillSelect(false);
        }


        // for vendor 
        if (name === "vendor_id") {

            setIsVendorSelect(value !== "");

            const selectedItem = vendorList?.data?.user?.find((cus) => cus.id == value);
            setAddSelect({
                billing: selectedItem?.address?.find(addr => addr?.is_billing == 1),
                shipping: selectedItem?.address?.find(addr => addr?.is_shipping == 1),
            });

            // auto when customer selected its payment terms is calculated in payment terms dorpdown automatically also calculated due and expiry date
            if (selectedItem) {
                updatedFormData.payment_terms = selectedItem?.payment_terms;
                if (formData?.transaction_date) {

                    // this is when I select the customer the payment terms is calculated then also to be calculated expiry data and due date from transaction_date
                    updatedFormData.expiry_date = calculateExpiryDate(new Date(formData?.transaction_date), selectedItem?.payment_terms);
                    updatedFormData.due_date = calculateExpiryDate(new Date(formData?.transaction_date), selectedItem?.payment_terms);
                }
            }
        }

        setFormData(updatedFormData);
    };



    // Using useRef to store the previous value of formData.currency because this useEffect not call on load
    const prevCurrency = useRef(formData?.currency);

    useEffect(() => {
        // Only call checkIsCurrencyCreated when formData?.currency changes and is different from the previous value
        if (formData?.currency !== prevCurrency.current) {
            checkIsCurrencyCreated();

            // Update the ref to the new currency
            prevCurrency.current = formData?.currency;
        }
    }, [formData?.currency]); // Dependency on formData.currency

    return {
        handleChange,
        calculateExpiryDate,
    };
};
