
 import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_HOTEL_ERROR, CREATE_HOTEL_REQUEST, CREATE_HOTEL_ROOM_ERROR, CREATE_HOTEL_ROOM_REQUEST, CREATE_HOTEL_ROOM_SUCCESS, CREATE_HOTEL_SUCCESS, GET_HOTEL_ERROR, GET_HOTEL_REQUEST, GET_HOTEL_ROOM_ERROR, GET_HOTEL_ROOM_REQUEST, GET_HOTEL_ROOM_SUCCESS, GET_HOTEL_SUCCESS, HOTEL_DETAIL_ERROR, HOTEL_DETAIL_REQUEST, HOTEL_DETAIL_SUCCESS, HOTEL_ROOM_DETAIL_ERROR, HOTEL_ROOM_DETAIL_REQUEST, HOTEL_ROOM_DETAIL_SUCCESS, } from "../Constants/HotelConstant";

 export const CreateHotelAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_HOTEL_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotel/createupdate`, queryParams);
        dispatch({ type:CREATE_HOTEL_REQUEST , payload: response.data });

        if (response?.data?.message === "Hotel Added Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/hotels-services')
            
        } else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_HOTEL_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_HOTEL_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const hotelListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_HOTEL_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotel/list`, queryParams);

        dispatch({ type: GET_HOTEL_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_HOTEL_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const hotelDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: HOTEL_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/service/hotel/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: HOTEL_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: HOTEL_DETAIL_ERROR, payload: error.message });
    }
};

export const CreateHotelRoomAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_HOTEL_ROOM_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotelroom/create/update`, queryParams);
        dispatch({ type:CREATE_HOTEL_ROOM_REQUEST , payload: response.data });

        if (response?.data?.message === "Hotel Room Added Successfully") {
            toast?.success(response?.data?.message);
            Navigate(`/dashboard/hotel-details?id=${itemId}`)
            
        } else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_HOTEL_ROOM_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_HOTEL_ROOM_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const hotelRoomListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_HOTEL_ROOM_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotelroom/list`, queryParams);

        dispatch({ type: GET_HOTEL_ROOM_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_HOTEL_ROOM_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const hotelRoomDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: HOTEL_ROOM_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/service/hotelroom/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: HOTEL_ROOM_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: HOTEL_ROOM_DETAIL_ERROR, payload: error.message });
    }
};