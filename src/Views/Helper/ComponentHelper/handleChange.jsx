
export const useHandleFormChange = (formData, setFormData, cusList, addSelect, setAddSelect, isCustomerSelect, setIsCustomerSelect, calculateExpiryDate) => {

    const handleChange = ({ target: { name, value } }) => {
        if (name === "terms_and_condition" && value.replace(/\s/g, '').length > 300) return;

        const updatedFormData = {
            ...formData,
            [name]: value,
            ...(name === "payment_terms" && value !== 5 && {
                expiry_date: calculateExpiryDate(new Date(formData?.transaction_date), value)
            }),
            ...(name === "customer_id" && {
                payment_terms: cusList?.data?.user?.find(cus => cus.id == value)?.payment_terms
            }),
        };

        if (name === "customer_id") {
            setIsCustomerSelect(value !== "");
            const selectedItem = cusList?.data?.user?.find(cus => cus.id == value);
            setAddSelect({
                billing: selectedItem?.address?.find(addr => addr?.is_billing === 1),
                shipping: selectedItem?.address?.find(addr => addr?.is_shipping === 1),
            });
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
        handleDateChange,
    };
};
