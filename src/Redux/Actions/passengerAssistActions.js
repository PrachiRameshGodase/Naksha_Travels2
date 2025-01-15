
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGER_ASSISTS_ERROR, CREATE_PASSENGER_ASSISTS_REQUEST, CREATE_PASSENGER_ASSISTS_SUCCESS, PASSENGER_ASSISTS_DELETE_ERROR, PASSENGER_ASSISTS_DELETE_REQUEST, PASSENGER_ASSISTS_DELETE_SUCCESS } from "../Constants/passengerAssistConstant";

export const CreatePassengerAssistAction = (queryParams, setShowModal) => async (dispatch) => {

    dispatch({ type: CREATE_PASSENGER_ASSISTS_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/passenger/assits/create`, queryParams);
        if (response?.data?.success === true) {
            dispatch({ type: CREATE_PASSENGER_ASSISTS_SUCCESS, payload: response.data });
            toast?.success(response?.data?.message);
            setShowModal(false); 
        } else {
            dispatch({ type: CREATE_PASSENGER_ASSISTS_ERROR, payload: response.data?.message });
            toast?.error(response?.data?.message);
          
        }

    } catch (error) {
        dispatch({ type: CREATE_PASSENGER_ASSISTS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const PassengerAssistDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGER_ASSISTS_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/passenger/assits/cancle`, queryParams);

        if (response?.data?.message === "DSR Service Assists Cancelled Successfully") {
            // dispatch(PassengerFlightDetailsAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGER_ASSISTS_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGER_ASSISTS_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

