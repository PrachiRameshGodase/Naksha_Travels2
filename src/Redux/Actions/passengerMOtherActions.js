
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGERM_OTHER_ERROR, CREATE_PASSENGERM_OTHER_REQUEST, CREATE_PASSENGERM_OTHER_SUCCESS, PASSENGERM_OTHER_DELETE_ERROR, PASSENGERM_OTHER_DELETE_REQUEST, PASSENGERM_OTHER_DELETE_SUCCESS } from "../Constants/passengerMOtherConstants";
import { MICEDetailsAction } from "./MICEActions";

 export const CreatePassengerMOtherAction = (queryParams, setShowModal, refreshData) => async (dispatch) => {
    
    dispatch({ type: CREATE_PASSENGERM_OTHER_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/others/create`, queryParams);
        if (response?.data?.success === true) {
            dispatch({ type: CREATE_PASSENGERM_OTHER_SUCCESS, payload: response.data });
            toast?.success(response?.data?.message);
            dispatch(MICEDetailsAction(refreshData))
            setShowModal(false); 
        } else {
            dispatch({ type: CREATE_PASSENGERM_OTHER_ERROR, payload: response.data?.message });
            toast?.error(response?.data?.message);
          
        }

    } catch (error) {
        dispatch({ type: CREATE_PASSENGERM_OTHER_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const PassengerMOtherDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGERM_OTHER_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/others/cancle`, queryParams);

        if (response?.data?.message === "MICE Service Others Cancelled Successfully") {
            // dispatch(PassengerMHotelDetailsAction(queryParams));
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGERM_OTHER_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGERM_OTHER_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};