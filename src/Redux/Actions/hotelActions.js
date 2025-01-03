
 import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_HOTEL_ERROR, CREATE_HOTEL_REQUEST, CREATE_HOTEL_ROOM_ERROR, CREATE_HOTEL_ROOM_REQUEST, CREATE_HOTEL_ROOM_SUCCESS, CREATE_HOTEL_SUCCESS, GET_HOTEL_ERROR, GET_HOTEL_REQUEST, GET_HOTEL_ROOM_ERROR, GET_HOTEL_ROOM_REQUEST, GET_HOTEL_ROOM_SUCCESS, GET_HOTEL_SUCCESS, HOTEL_DELETE_ERROR, HOTEL_DELETE_SUCCESS, HOTEL_DETAIL_ERROR, HOTEL_DETAIL_REQUEST, HOTEL_DETAIL_SUCCESS, HOTEL_ROOM_DELETE_ERROR, HOTEL_ROOM_DELETE_REQUEST, HOTEL_ROOM_DELETE_SUCCESS, HOTEL_ROOM_DETAIL_ERROR, HOTEL_ROOM_DETAIL_REQUEST, HOTEL_ROOM_DETAIL_SUCCESS, HOTEL_ROOM_STATUS_ERROR, HOTEL_ROOM_STATUS_REQUEST, HOTEL_ROOM_STATUS_SUCCESS, HOTEL_STATUS_ERROR, HOTEL_STATUS_REQUEST, HOTEL_STATUS_SUCCESS, } from "../Constants/HotelConstant";

 export const CreateHotelAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_HOTEL_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotel/createupdate`, queryParams);
        dispatch({ type:CREATE_HOTEL_REQUEST , payload: response.data });

        if (response?.data?.message === "Hotel Added Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/hotels-services')
            
        } 
        else if (response?.data?.message === "Hotel Updated Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/hotels-services')
            
        } 
        else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_HOTEL_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_HOTEL_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const hotelListAction = (queryParams, setAllListValue) => async (dispatch) => {
    localStorage.setItem("hotelPayload", JSON.stringify(queryParams));
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

export const hotelStatusActions = (queryParams, setCallApi, billData, autoId, tracking_details, Navigate) => async (dispatch) => {
    dispatch({ type: HOTEL_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotel/status`, queryParams);
        dispatch(hotelListAction(queryParams));//update list then data is change
        if (response?.data?.message === "Hotel Status Updated Successfully") {
            toast.success(response?.data?.message);
            setCallApi((preState) => !preState);

        } 
      
        dispatch({ type: HOTEL_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: HOTEL_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const hotelDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: HOTEL_ROOM_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotel/delete`, queryParams);

        if (response?.data?.message === "Hotel Deleted Successfully") {
            dispatch(hotelListAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: HOTEL_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: HOTEL_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};
export const CreateHotelRoomAction = (queryParams, Navigate,itemId) => async (dispatch) => {
    dispatch({ type: CREATE_HOTEL_ROOM_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotelroom/create/update`, queryParams);
        dispatch({ type:CREATE_HOTEL_ROOM_REQUEST , payload: response.data });

        if (response?.data?.message === "Hotel Room Added Successfully") {
            toast?.success(response?.data?.message);
            Navigate(`/dashboard/hotel-details?id=${itemId}`)
            
        } else if (response?.data?.message === "Hotel Room Updated Successfully") {
            toast?.success(response?.data?.message);
            Navigate(`/dashboard/hotel-details?id=${itemId}`)
            
        } 
        else {
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

export const hotelRoomStatusActions = (queryParams, setCallApi, billData, autoId, tracking_details, Navigate) => async (dispatch) => {
    dispatch({ type: HOTEL_ROOM_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotelroom/status`, queryParams);
        dispatch(hotelRoomListAction(queryParams));//update list then data is change
        if (response?.data?.message === "Rooom Status Updated Successfully") {
            toast.success(response?.data?.message);
            // setCallApi((preState) => !preState);
            } 
      
        dispatch({ type: HOTEL_ROOM_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: HOTEL_ROOM_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const hotelRoomDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: HOTEL_ROOM_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/hotel/delete`, queryParams);

        if (response?.data?.message === "Room Deleted Successfully") {
            dispatch(hotelListAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: HOTEL_ROOM_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: HOTEL_ROOM_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};
