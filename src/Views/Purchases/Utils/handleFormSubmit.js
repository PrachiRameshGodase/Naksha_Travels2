import toast from "react-hot-toast";
import { confirmWithZeroAmount } from "../../Helper/ConfirmHelperFunction/ConfirmWithZeroAmount";
import { handleDropdownError, validateItems } from "../../Helper/HelperFunctions";
import { isPartiallyInViewport } from "../../Helper/is_scroll_focus";
import { formatDate } from "../../Helper/DateFormat";

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
    setItemErrors,
    dropdownRef1,
    dropdownRef2,
    dispatch,
    navigate,
    editDub,
    section, // This will be dynamic, like "quotation"
    updateDispatchAction, // This is dynamic for dispatching
    sendData
}) => {
    e.preventDefault();
    let confirmed = null;
    const buttonName = e.nativeEvent.submitter.name;
    const errors = validateItems(formData?.items);
    // console.log("confirmedconfirmed", confirmed)

    // Customer selection check
    if (!isCustomerSelect) {
        if (!isPartiallyInViewport(dropdownRef1.current)) {
            dropdownRef1.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(() => {
            dropdownRef1.current.focus();
        }, 500);
        return;
    }
    else if (errors.length > 0) { // Item validation check
        setItemErrors(errors);
        if (!isPartiallyInViewport(dropdownRef2.current)) {
            dropdownRef2.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(() => {
            dropdownRef2.current.focus();
        }, 500);
        return;
    }

    // Proceed with dispatch if confirmed or null
    else {
        try {
            // Remove 'tax_name' from each item
            const updatedItems = formData?.items?.map(({ tax_name, ...itemWithoutTaxName }) => itemWithoutTaxName);

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


