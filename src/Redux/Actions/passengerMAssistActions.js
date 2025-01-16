
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGERM_ASSISTS_ERROR, CREATE_PASSENGERM_ASSISTS_REQUEST, CREATE_PASSENGERM_ASSISTS_SUCCESS, PASSENGERM_ASSISTS_DELETE_ERROR, PASSENGERM_ASSISTS_DELETE_REQUEST, PASSENGERM_ASSISTS_DELETE_SUCCESS } from "../Constants/passengerMAssistConstants";
import { MICEDetailsAction } from "./MICEActions";

export const CreatePassengerMAssistAction = (queryParams, setShowModal, refreshData) => async (dispatch) => {
    dispatch({ type: CREATE_PASSENGERM_ASSISTS_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/assits/create`, queryParams);
    
        if (response?.data?.success === true) {
            dispatch({ type: CREATE_PASSENGERM_ASSISTS_SUCCESS, payload: response.data });
            toast?.success(response?.data?.message);
            dispatch(MICEDetailsAction(refreshData))
            setShowModal(false); 
        } else {
            dispatch({ type: CREATE_PASSENGERM_ASSISTS_ERROR, payload: response.data?.message });
            toast?.error(response?.data?.message);
          
        }
    } catch (error) {
        dispatch({ type: CREATE_PASSENGERM_ASSISTS_ERROR, payload: error.message });
        toast.error(error?.message);
        
    }
};



export const PassengerMAssistDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGERM_ASSISTS_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/assits/cancle`, queryParams);

        if (response?.data?.message === "MICE Service Assists Cancelled Successfully") {
            // dispatch(PassengerMHotelDetailsAction(queryParams));
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGERM_ASSISTS_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGERM_ASSISTS_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};