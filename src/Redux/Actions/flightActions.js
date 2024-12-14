
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_FLIGHT_ERROR, CREATE_FLIGHT_REQUEST, CREATE_FLIGHT_SUCCESS, FLIGHT_DELETE_ERROR, FLIGHT_DELETE_REQUEST, FLIGHT_DELETE_SUCCESS, FLIGHT_DETAIL_ERROR, FLIGHT_DETAIL_REQUEST, FLIGHT_DETAIL_SUCCESS, FLIGHT_STATUS_ERROR, FLIGHT_STATUS_REQUEST, FLIGHT_STATUS_SUCCESS, GET_FLIGHT_ERROR, GET_FLIGHT_REQUEST, GET_FLIGHT_SUCCESS } from "../Constants/flightConstant";

 export const CreateFlightAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_FLIGHT_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/flight/create/update`, queryParams);
        dispatch({ type:CREATE_FLIGHT_REQUEST , payload: response.data });

        if (response?.data?.message === "Flight Added Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/flights-services')
            
        } 
        else  if (response?.data?.message === "Flight Updated Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/flights-services')
            
        } 
        else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_FLIGHT_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_FLIGHT_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const flightListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_FLIGHT_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/flight/list`, queryParams);

        dispatch({ type: GET_FLIGHT_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_FLIGHT_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const flightDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: FLIGHT_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/service/flight/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: FLIGHT_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: FLIGHT_DETAIL_ERROR, payload: error.message });
    }
};

export const flightstatusActions = (queryParams, setCallApi, billData, autoId, tracking_details, Navigate) => async (dispatch) => {
    dispatch({ type: FLIGHT_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/flight/status`, queryParams);
        dispatch(flightListAction(queryParams));//update list then data is change
        if (response?.data?.message === "Flight Status Updated Successfully") {
            toast.success(response?.data?.message);
            // setCallApi((preState) => !preState);

        } 
      
        dispatch({ type: FLIGHT_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: FLIGHT_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const flightdeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: FLIGHT_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/flight/delete`, queryParams);

        if (response?.data?.message === "Flight Deleted Successfully") {
            dispatch(flightListAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            Navigate("/dashboard/flights-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: FLIGHT_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: FLIGHT_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};