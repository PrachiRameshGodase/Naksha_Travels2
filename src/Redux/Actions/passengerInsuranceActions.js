
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGER_INSURANCE_ERROR, CREATE_PASSENGER_INSURANCE_REQUEST, CREATE_PASSENGER_INSURANCE_SUCCESS, PASSENGER_INSURANCE_DELETE_ERROR, PASSENGER_INSURANCE_DELETE_REQUEST, PASSENGER_INSURANCE_DELETE_SUCCESS } from "../Constants/passengerInsuranceConstant";
import { DSRDetailsAction } from "./DSRActions";

export const CreatePassengerInsuranceAction = (queryParams, setShowModal, refreshData) => async (dispatch) => {

    dispatch({ type: CREATE_PASSENGER_INSURANCE_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/passenger/insurance/create`, queryParams);
        if (response?.data?.success === true) {
            dispatch({ type: CREATE_PASSENGER_INSURANCE_SUCCESS, payload: response.data });
            toast?.success(response?.data?.message);
            dispatch(DSRDetailsAction(refreshData))
            setShowModal(false); 
        } else {
            dispatch({ type: CREATE_PASSENGER_INSURANCE_ERROR, payload: response.data?.message });
            toast?.error(response?.data?.message);
          
        }

    } catch (error) {
        dispatch({ type: CREATE_PASSENGER_INSURANCE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const PassengerInsuranceDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGER_INSURANCE_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/passenger/insurance/cancle`, queryParams);

        if (response?.data?.message === "DSR Service Insurance Cancelled Successfully") {
            // dispatch(PassengerFlightDetailsAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGER_INSURANCE_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGER_INSURANCE_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

