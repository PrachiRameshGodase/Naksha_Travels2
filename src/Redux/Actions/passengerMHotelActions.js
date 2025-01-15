
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGERM_HOTEL_ERROR, CREATE_PASSENGERM_HOTEL_REQUEST, CREATE_PASSENGERM_HOTEL_SUCCESS, GET_PASSENGERM_HOTEL_ERROR, GET_PASSENGERM_HOTEL_REQUEST, GET_PASSENGERM_HOTEL_SUCCESS, PASSENGERM_HOTEL_DELETE_ERROR, PASSENGERM_HOTEL_DELETE_REQUEST, PASSENGERM_HOTEL_DELETE_SUCCESS, PASSENGERM_HOTEL_DETAIL_ERROR, PASSENGERM_HOTEL_DETAIL_REQUEST, PASSENGERM_HOTEL_DETAIL_SUCCESS } from "../Constants/passengerMHotelConstants";

 export const CreatePassengerMHotelAction = (queryParams,setShowModal) => async (dispatch) => {
    
    dispatch({ type: CREATE_PASSENGERM_HOTEL_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/hotel/create`, queryParams);
        if (response?.data?.success === true) {
            dispatch({ type: CREATE_PASSENGERM_HOTEL_SUCCESS, payload: response.data });
            toast?.success(response?.data?.message);
            setShowModal(false); 
        } else {
            dispatch({ type: CREATE_PASSENGERM_HOTEL_ERROR, payload: response.data?.message });
            toast?.error(response?.data?.message);
          
        }
    } catch (error) {
        dispatch({ type: CREATE_PASSENGERM_HOTEL_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const PassengermHotelListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_PASSENGERM_HOTEL_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotel/list`, queryParams);

        dispatch({ type: GET_PASSENGERM_HOTEL_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_PASSENGERM_HOTEL_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const PassengerMHotelDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: PASSENGERM_HOTEL_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/mice/passenger/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: PASSENGERM_HOTEL_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: PASSENGERM_HOTEL_DETAIL_ERROR, payload: error.message });
    }
};



export const PassengerMHotelDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGERM_HOTEL_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/hotel/cancle`, queryParams);

        if (response?.data?.message === "MICE Service Hotel Cancelled Successfully") {
            dispatch(PassengerMHotelDetailsAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGERM_HOTEL_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGERM_HOTEL_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

