
export const useHandleFormChange = (formData, setFormData, cusList, addSelect, setAddSelect, isCustomerSelect, setIsCustomerSelect) => {

    const calculateExpiryDate = (transactionDate, terms) => {
        // console.log("transactionDate, terms", transactionDate, terms)
        const daysMap = { "1": 15, "2": 30, "3": 45, "4": 60 };
        return new Date(transactionDate.setDate(transactionDate.getDate() + (daysMap[terms] || 0)));
    };

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
                billing: selectedItem?.address?.find(addr => addr?.is_billing === 1),
                shipping: selectedItem?.address?.find(addr => addr?.is_shipping === 1),
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

    const handleDateChange = (date, name) => {
        setFormData((prev) => ({
            ...prev,
            [name]: date,
            ...(name === "expiry_date" && { payment_terms: 5 }),
            ...(name === "transaction_date" && prev.payment_terms !== 5 && {
                expiry_date: calculateExpiryDate(new Date(date), prev.payment_terms),
            }),
        }));
    };

    return {
        handleChange,
        calculateExpiryDate,
    };
};
