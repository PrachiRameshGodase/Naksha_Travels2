
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CARHIRE_DELETE_ERROR, CARHIRE_DELETE_REQUEST, CARHIRE_DELETE_SUCCESS, CARHIRE_DETAIL_ERROR, CARHIRE_DETAIL_REQUEST, CARHIRE_DETAIL_SUCCESS, CARHIRE_STATUS_ERROR, CARHIRE_STATUS_REQUEST, CARHIRE_STATUS_SUCCESS, CREATE_CARHIRE_ERROR, CREATE_CARHIRE_REQUEST, CREATE_CARHIRE_SUCCESS, GET_CARHIRE_ERROR, GET_CARHIRE_REQUEST, GET_CARHIRE_SUCCESS } from "../Constants/carHireConstant";

 export const CreateCarHireAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_CARHIRE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/carhire/create/update`, queryParams);
        dispatch({ type:CREATE_CARHIRE_REQUEST , payload: response.data });

        if (response?.data?.message === "Car Hire Added Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/car-hire-services')
            
        } 
        else  if (response?.data?.message === "Car Hire Updated Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/car-hire-services')
            
        } 
        else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_CARHIRE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_CARHIRE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const carHireListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_CARHIRE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/carhire/list`, queryParams);

        dispatch({ type: GET_CARHIRE_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_CARHIRE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const carHireDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: CARHIRE_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/service/carhire/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: CARHIRE_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: CARHIRE_DETAIL_ERROR, payload: error.message });
    }
};

export const carHirestatusActions = (queryParams, setCallApi, billData, autoId, tracking_details, Navigate) => async (dispatch) => {
    dispatch({ type: CARHIRE_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/carhire/status`, queryParams);
        dispatch(carHireListAction(queryParams));//update list then data is change
        if (response?.data?.message === "Car Hire Status Updated Successfully") {
            toast.success(response?.data?.message);
            setCallApi((preState) => !preState);

        } 
      
        dispatch({ type: CARHIRE_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CARHIRE_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const carHiredeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: CARHIRE_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/carhire/delete`, queryParams);

        if (response?.data?.message === "Car Hire Deleted Successfully") {
            dispatch(carHireListAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            Navigate("/dashboard/car-hire-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: CARHIRE_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CARHIRE_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};