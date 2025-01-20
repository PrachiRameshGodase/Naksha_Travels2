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
