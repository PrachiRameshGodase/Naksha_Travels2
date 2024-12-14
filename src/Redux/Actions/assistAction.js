
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { ASSIST_DELETE_ERROR, ASSIST_DELETE_REQUEST, ASSIST_DELETE_SUCCESS, ASSIST_DETAIL_ERROR, ASSIST_DETAIL_REQUEST, ASSIST_DETAIL_SUCCESS, ASSIST_STATUS_ERROR, ASSIST_STATUS_REQUEST, ASSIST_STATUS_SUCCESS, CREATE_ASSIST_ERROR, CREATE_ASSIST_REQUEST, CREATE_ASSIST_SUCCESS, GET_ASSIST_ERROR, GET_ASSIST_REQUEST, GET_ASSIST_SUCCESS } from "../Constants/assistConstant";

 export const CreateAssistAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_ASSIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/assist/create/update`, queryParams);
        dispatch({ type:CREATE_ASSIST_REQUEST , payload: response.data });

        if (response?.data?.message === "Assists Added Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/assists-services')
            
        } 
        else  if (response?.data?.message === "Assists Updated Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/assists-services')
            
        } 
        else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_ASSIST_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_ASSIST_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const assistListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_ASSIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/assist/list`, queryParams);

        dispatch({ type: GET_ASSIST_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_ASSIST_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const assistDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: ASSIST_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/service/assist/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: ASSIST_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: ASSIST_DETAIL_ERROR, payload: error.message });
    }
};

export const assiststatusActions = (queryParams,navigate, setCallApi, billData, autoId, tracking_details) => async (dispatch) => {
    dispatch({ type: ASSIST_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/assist/status`, queryParams);
        dispatch(assistListAction(queryParams));//update list then data is change
        if (response?.data?.message === "Assists Status Updated Successfully") {
            toast.success(response?.data?.message);

            // navigate("/dashborad/assists-services")

        } 
      
        dispatch({ type: ASSIST_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: ASSIST_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const assistdeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: ASSIST_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/assist/delete`, queryParams);

        if (response?.data?.message === "Assist Deleted Successfully") {
            dispatch(assistListAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            Navigate("/dashboard/assists-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: ASSIST_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: ASSIST_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};