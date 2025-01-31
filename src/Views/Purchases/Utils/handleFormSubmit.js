import toast from "react-hot-toast";
import { confirmWithZeroAmount } from "../../Helper/ConfirmHelperFunction/ConfirmWithZeroAmount";
import { handleDropdownError, validateItems } from "../../Helper/HelperFunctions";
import { isPartiallyInViewport } from "../../Helper/is_scroll_focus";

export const handleFormSubmitCommon = async ({
    e,
    formData,
    isVendorSelect,
    dropdownRef1,
    isItemSelect,
    dropdownRef2,
    dispatch,
    createPurchases,
    Navigate,
    isEdit,
    showAllSequenceId,
    itemId,
    convert,
    type,
    additionalData = {}
}) => {
    e.preventDefault();
    const button = e.nativeEvent.submitter.name;

    if (handleDropdownError(isVendorSelect, dropdownRef1)) return;
    // if (handleDropdownError(isItemSelect, dropdownRef2)) return;

    try {
        const updatedItems = formData?.items?.map(({ tax_name, ...rest }) => rest);

        const mainSendData = {
            ...formData,
            items: updatedItems,
            address: JSON.stringify(formData?.address),
            ...additionalData,
        };

        dispatch(
            createPurchases(
                mainSendData,
                Navigate,
                type,
                isEdit,
                button,
                showAllSequenceId,
                itemId,
                convert
            )
        );
    } catch (error) {
        toast.error(`Error updating ${type}:`, error);
    }
};

export const handleFormSubmit1 = async ({
    e,
    formData,
    isCustomerSelect,
    isVendorSelect,
    setItemErrors,
    dropdownRef1,
    dropdownRef2,
    dispatch,
    navigate,
    editDub,
    section, // This will be dynamic, like "quotation"
    updateDispatchAction, // This is dynamic for dispatching
    toSelect,
    sendData
}) => {
    e.preventDefault();
    let confirmed = null;
    const buttonName = e.nativeEvent.submitter.name;
    const errors = validateItems(formData?.items);
    // console.log("errors", errors)

    // selection check
    if (toSelect === "customer") {
        if (handleDropdownError(isCustomerSelect, dropdownRef1)) return;
    }

    // it is worked when create credit note is opened....
    if ((formData?.credit_note_id)) {
        if (handleDropdownError(sendData?.isInvoiceSelect, sendData?.dropdownRef3)) return;
    }

    if (toSelect === "vendor") {
        if (handleDropdownError(isVendorSelect, dropdownRef1)) return;

    }

    if (errors?.length > 0) {
        setItemErrors(errors);
        if (!isPartiallyInViewport(dropdownRef2?.current)) {
            dropdownRef2.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(() => {
            dropdownRef2.current.focus();
        }, 500);
        return;
    }

    // Proceed with dispatch if confirmed or null
    else {
        try {

            // Filter out items where rate is not available or equals 0
            const filteredItems = formData?.items?.filter(item => item?.rate && item?.rate > 0);

            // Remove 'tax_name' from each item and convert 'service_data' to JSON string
            const updatedItems = filteredItems?.map(({ tax_name, service_data, ...rest }) => ({
                ...rest,
                service_data: JSON.stringify(service_data), // Convert service_data to JSON string
            }));

            // If total is <= 0, confirm with zero amount
            if (parseInt(formData?.total) <= 0) {
                confirmed = await confirmWithZeroAmount(updateAction);
                if (!confirmed) return; // Exit early if user doesn't confirm
            }

            // Dispatch update action (common code for both scenarios)
            dispatch(updateDispatchAction({
                quotationData: {
                    ...formData,
                    items: updatedItems,
                    address: JSON.stringify(formData?.address),
                    charges: JSON.stringify(formData?.charges),

                    // use in purchases
                    ...(formData?.delivery_address && { delivery_address: JSON.stringify(formData?.delivery_address) })
                },
                navigate,
                section,
                buttonName,
                editDub,
                itemId: sendData?.itemId,
                convert: sendData?.convert,
            }));
        } catch (error) {
            toast.error('Error updating ' + updateAction + ':', error);
        }
    }

};


