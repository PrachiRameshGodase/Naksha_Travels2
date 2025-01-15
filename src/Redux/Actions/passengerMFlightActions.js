
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGERM_FLIGHT_ERROR, CREATE_PASSENGERM_FLIGHT_REQUEST, CREATE_PASSENGERM_FLIGHT_SUCCESS, PASSENGERM_FLIGHT_DELETE_ERROR, PASSENGERM_FLIGHT_DELETE_REQUEST, PASSENGERM_FLIGHT_DELETE_SUCCESS } from "../Constants/passengerMFlightConstants";

 export const CreatePassengerMFlightAction = (queryParams,setShowModal) => async (dispatch) => {
    
    dispatch({ type: CREATE_PASSENGERM_FLIGHT_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/flight/create`, queryParams);
        if (response?.data?.success === true) {
            dispatch({ type: CREATE_PASSENGERM_FLIGHT_SUCCESS, payload: response.data });
            toast?.success(response?.data?.message);
            setShowModal(false); 
        } else {
            dispatch({ type: CREATE_PASSENGERM_FLIGHT_ERROR, payload: response.data?.message });
            toast?.error(response?.data?.message);
          
        }
    } catch (error) {
        dispatch({ type: CREATE_PASSENGERM_FLIGHT_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const PassengerMFlightDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type:  PASSENGERM_FLIGHT_DELETE_REQUEST});
    try {
        const response = await axiosInstance.post(`/mice/passenger/flight/cancle`, queryParams);

        if (response?.data?.message === "MICE Service Flight Cancelled Successfully") {
            // dispatch(PassengerMHotelDetailsAction(queryParams));
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGERM_FLIGHT_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGERM_FLIGHT_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};