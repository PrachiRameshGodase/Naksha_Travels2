
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGER_FLIGHT_ERROR, CREATE_PASSENGER_FLIGHT_REQUEST, CREATE_PASSENGER_FLIGHT_SUCCESS, PASSENGER_FLIGHT_DELETE_ERROR, PASSENGER_FLIGHT_DELETE_REQUEST, PASSENGER_FLIGHT_DELETE_SUCCESS, PASSENGER_FLIGHT_DETAIL_ERROR, PASSENGER_FLIGHT_DETAIL_REQUEST, PASSENGER_FLIGHT_DETAIL_SUCCESS } from "../Constants/passengerFlightConstant";

 export const CreatePassengerFlightAction = (queryParams, setShowModal) => async (dispatch) => {
    
    dispatch({ type: CREATE_PASSENGER_FLIGHT_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/passenger/flight/create`, queryParams);
        if (response?.data?.success === true) {
            dispatch({ type: CREATE_PASSENGER_FLIGHT_SUCCESS, payload: response.data });
            toast?.success(response?.data?.message);
            setShowModal(false); 
        } else {
            dispatch({ type: CREATE_PASSENGER_FLIGHT_ERROR, payload: response.data?.message });
            toast?.error(response?.data?.message);
          
        }

    } catch (error) {
        dispatch({ type: CREATE_PASSENGER_FLIGHT_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};




export const PassengerFlightDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: PASSENGER_FLIGHT_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/dsr/passenger/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: PASSENGER_FLIGHT_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: PASSENGER_FLIGHT_DETAIL_ERROR, payload: error.message });
    }
};



export const PassengerFlightDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGER_FLIGHT_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/passenger/flight/cancle`, queryParams);

        if (response?.data?.message === "DSR Service Flight Cancelled Successfully") {
            // dispatch(PassengerFlightDetailsAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGER_FLIGHT_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGER_FLIGHT_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

