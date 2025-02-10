import Swal from 'sweetalert2';
import { getCurrencySymbol } from '../ComponentHelper/ManageStorage/localStorageUtils';

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

export const confirIsCurrencyCreate = async () => {
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

export const confirmIsAmountFill = async (totalEntriesAmount) => {
    const { isConfirmed } = await Swal.fire({
        text: `Do you want to reset the entered payments? Because the received amount is less than the total entered payments ${getCurrencySymbol()} ${totalEntriesAmount}?`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            popup: 'swal-wide',
        },
    });
    return isConfirmed;
};
