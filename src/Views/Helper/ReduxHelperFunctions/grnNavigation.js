import toast from "react-hot-toast";
import { GRNstatusActions } from "../../../Redux/Actions/grnActions";

export const handleGrnNavigation = (dispatch, editDub, buttonName, navigate, response) => {

    // console.log("buttonName", buttonName)
    // Purchase Order in create
    if (!editDub) {
        if (buttonName === "saveAsDraft") {
            const sendData = {
                status: 3,
                id: response?.data?.transaction?.id
            };

            // Dispatch the action and handle the response
            dispatch(GRNstatusActions(sendData, null, null))?.then(() => {

                toast.success("GRN Sent For Approval");
                navigate(`/dashboard/grn`); // Redirect to the GRN list page

            })
        }

        // Purchase Order in update
    }

    else if (editDub) {
        if (buttonName === "saveAsDraft") {
            toast.success("GRN Updated Successfully");
            navigate(`/dashboard/grn`); // Redirect to the GRN list page
        }
    }

    // else if (editDub) {
    //     if (buttonName === "saveAndSend" && confirmed === true) {
    //         const queryParams = new URLSearchParams();
    //         queryParams.set("purchase_send", true);
    //         navigate(`/dashboard/send_mail?${queryParams.toString()}`, { state: { data: response?.data?.transaction } });
    //     } else if (buttonName === "saveAndSend" && confirmed === false) {
    //         toast.success("Purchase Order Updated Successfully");
    //         navigate(`/dashboard/purchase`);
    //     } else if (buttonName === "saveAsDraft") {
    //         navigate(`/dashboard/purchase`);
    //         toast.success("Purchase Order Updated Successfully");
    //     }
    // }

};