
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGER_HOTEL_ERROR, CREATE_PASSENGER_HOTEL_REQUEST, CREATE_PASSENGER_HOTEL_SUCCESS, GET_PASSENGER_HOTEL_ERROR, GET_PASSENGER_HOTEL_REQUEST, GET_PASSENGER_HOTEL_SUCCESS, PASSENGER_HOTEL_DELETE_ERROR, PASSENGER_HOTEL_DELETE_REQUEST, PASSENGER_HOTEL_DELETE_SUCCESS, PASSENGER_HOTEL_DETAIL_ERROR, PASSENGER_HOTEL_DETAIL_REQUEST, PASSENGER_HOTEL_DETAIL_SUCCESS, PASSENGER_HOTEL_STATUS_ERROR, PASSENGER_HOTEL_STATUS_REQUEST, PASSENGER_HOTEL_STATUS_SUCCESS } from "../Constants/passengerHotelConstant";

 export const CreatePassengerHotelAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    
    dispatch({ type: CREATE_PASSENGER_HOTEL_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/passenger/hotel/create`, queryParams);
        dispatch({ type:CREATE_PASSENGER_HOTEL_REQUEST , payload: response.data });

        if (response?.data?.message === "DSR Service Hotel Created Successfully") {
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

        dispatch({ type: CREATE_PASSENGER_HOTEL_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_PASSENGER_HOTEL_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const PassengerHotelListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_PASSENGER_HOTEL_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotel/list`, queryParams);

        dispatch({ type: GET_PASSENGER_HOTEL_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_PASSENGER_HOTEL_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const PassengerHotelDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: PASSENGER_HOTEL_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/dsr/passenger/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: PASSENGER_HOTEL_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: PASSENGER_HOTEL_DETAIL_ERROR, payload: error.message });
    }
};



export const PassengerHotelDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGER_HOTEL_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/passenger/hotel/cancle`, queryParams);

        if (response?.data?.message === "DSR Service Hotel Cancelled Successfully") {
            dispatch(PassengerHotelDetailsAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGER_HOTEL_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGER_HOTEL_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

