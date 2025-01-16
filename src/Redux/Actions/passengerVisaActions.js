
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGER_VISA_ERROR, CREATE_PASSENGER_VISA_REQUEST, CREATE_PASSENGER_VISA_SUCCESS, PASSENGER_VISA_DELETE_ERROR, PASSENGER_VISA_DELETE_REQUEST, PASSENGER_VISA_DELETE_SUCCESS } from "../Constants/passengerVisaConstants";
import { DSRDetailsAction } from "./DSRActions";

 export const CreatePassengerVisaAction = (queryParams, setShowModal, refreshData) => async (dispatch) => {
    
    dispatch({ type: CREATE_PASSENGER_VISA_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/passenger/visa/create`, queryParams);
        if (response?.data?.success === true) {
            dispatch({ type: CREATE_PASSENGER_VISA_SUCCESS, payload: response.data });
            toast?.success(response?.data?.message);
            dispatch(DSRDetailsAction(refreshData))
            setShowModal(false); 
        } else {
            dispatch({ type: CREATE_PASSENGER_VISA_ERROR, payload: response.data?.message });
            toast?.error(response?.data?.message);
          
        }

    } catch (error) {
        dispatch({ type: CREATE_PASSENGER_VISA_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const PassengerVisaDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGER_VISA_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/passenger/visa/cancle`, queryParams);

        if (response?.data?.message === "DSR Service Visa Cancelled Successfully") {
            // dispatch(PassengerFlightDetailsAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGER_VISA_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGER_VISA_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

