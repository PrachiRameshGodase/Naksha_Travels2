import Swal from 'sweetalert2';

export const confirmWithZeroAmount = async (entityName) => {
    const { isConfirmed } = await Swal.fire({
        text: `You are about to create the ${entityName} with zero amount. Are you sure you want to proceed?`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            popup: 'swal-wide',
        },
    });
    return isConfirmed;
};
export const confirIsCurrencyCreate = async (entityName) => {
    const { isConfirmed } = await Swal.fire({
        text: `The currency rate is not created for the selected currency. Do you want to create?`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            popup: 'swal-wide',
        },
    });
    return isConfirmed;
};
export const confirIsCurrencyPDF = async (currency) => {
    const { isConfirmed } = await Swal.fire({
        text: `The currency rate is not created for ${currency} for this date. Do you want to create?`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            popup: 'swal-wide',
        },
    });
    return isConfirmed;
};
