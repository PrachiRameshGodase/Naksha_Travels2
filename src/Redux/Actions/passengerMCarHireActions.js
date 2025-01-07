
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGERM_CARHIRE_ERROR, CREATE_PASSENGERM_CARHIRE_REQUEST, CREATE_PASSENGERM_CARHIRE_SUCCESS, PASSENGERM_CARHIRE_DELETE_ERROR, PASSENGERM_CARHIRE_DELETE_REQUEST, PASSENGERM_CARHIRE_DELETE_SUCCESS } from "../Constants/passengerMCarHireConstants";

 export const CreatePassengerMCarHireAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    
    dispatch({ type: CREATE_PASSENGERM_CARHIRE_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/carhire/create`, queryParams);
        dispatch({ type: CREATE_PASSENGERM_CARHIRE_REQUEST, payload: response.data });

        if (response?.data?.message === "MICE Service Car Hire Created Successfully") {
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

        dispatch({ type: CREATE_PASSENGERM_CARHIRE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_PASSENGERM_CARHIRE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const PassengerMCarHireDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGERM_CARHIRE_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/carhire/cancle`, queryParams);

        if (response?.data?.message === "MICE Service Car Hire Cancelled Successfully") {
            // dispatch(PassengerMHotelDetailsAction(queryParams));
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGERM_CARHIRE_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGERM_CARHIRE_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};