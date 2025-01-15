
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGERM_INSURANCE_ERROR, CREATE_PASSENGERM_INSURANCE_REQUEST, CREATE_PASSENGERM_INSURANCE_SUCCESS, PASSENGERM_INSURANCE_DELETE_ERROR, PASSENGERM_INSURANCE_DELETE_REQUEST, PASSENGERM_INSURANCE_DELETE_SUCCESS } from "../Constants/passengerMInsuranceConstants";

 export const CreatePassengerMInsuranceAction = (queryParams, setShowModal) => async (dispatch) => {
    
    dispatch({ type: CREATE_PASSENGERM_INSURANCE_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/insurance/create`, queryParams);
        if (response?.data?.success === true) {
            dispatch({ type: CREATE_PASSENGERM_INSURANCE_SUCCESS, payload: response.data });
            toast?.success(response?.data?.message);
            setShowModal(false); 
        } else {
            dispatch({ type: CREATE_PASSENGERM_INSURANCE_ERROR, payload: response.data?.message });
            toast?.error(response?.data?.message);
          
        }

    } catch (error) {
        dispatch({ type: CREATE_PASSENGERM_INSURANCE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const PassengerMInsuranceDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGERM_INSURANCE_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/insurance/cancle`, queryParams);

        if (response?.data?.message === "MICE Service Insurance Cancelled Successfully") {
            // dispatch(PassengerMHotelDetailsAction(queryParams));
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGERM_INSURANCE_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGERM_INSURANCE_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};