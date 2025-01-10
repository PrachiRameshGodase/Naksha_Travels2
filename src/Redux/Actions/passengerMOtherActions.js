
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGERM_OTHER_ERROR, CREATE_PASSENGERM_OTHER_REQUEST, CREATE_PASSENGERM_OTHER_SUCCESS, PASSENGERM_OTHER_DELETE_ERROR, PASSENGERM_OTHER_DELETE_REQUEST, PASSENGERM_OTHER_DELETE_SUCCESS } from "../Constants/passengerMOtherConstants";

 export const CreatePassengerMOtherAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    
    dispatch({ type: CREATE_PASSENGERM_OTHER_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/others/create`, queryParams);
        dispatch({ type: CREATE_PASSENGERM_OTHER_REQUEST, payload: response.data });

        if (response?.data?.message === "MICE Service Others Created Successfully") {
            toast?.success(response?.data?.message);
            // Navigate('/dashboard/hotels-services')
            
        } 
        else if (response?.data?.message === "DSR Service Hotel updated Successfully") {
            toast?.success(response?.data?.message);
            // Navigate('/dashboard/hotels-services')
            
        } 
        else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_PASSENGERM_OTHER_SUCCESS, payload: response.data });

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