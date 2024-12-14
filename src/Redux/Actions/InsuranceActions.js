
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_INSURANCE_ERROR, CREATE_INSURANCE_REQUEST, CREATE_INSURANCE_SUCCESS, GET_INSURANCE_ERROR, GET_INSURANCE_REQUEST, GET_INSURANCE_SUCCESS, INSURANCE_DELETE_ERROR, INSURANCE_DELETE_REQUEST, INSURANCE_DELETE_SUCCESS, INSURANCE_DETAIL_ERROR, INSURANCE_DETAIL_REQUEST, INSURANCE_DETAIL_SUCCESS, INSURANCE_STATUS_ERROR, INSURANCE_STATUS_REQUEST, INSURANCE_STATUS_SUCCESS } from "../Constants/insuranceConstants";

 export const CreateInsuranceAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_INSURANCE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/insurance/create/update`, queryParams);
        dispatch({ type:CREATE_INSURANCE_REQUEST , payload: response.data });

        if (response?.data?.message === "Insurance Added Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/insurances-services')
            
        } 
        else  if (response?.data?.message === "Insurance Updated Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/insurances-services')
            
        } 
        else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_INSURANCE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_INSURANCE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const InsuranceListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_INSURANCE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/insurance/list`, queryParams);

        dispatch({ type: GET_INSURANCE_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_INSURANCE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const InsuranceDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: INSURANCE_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/service/insurance/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: INSURANCE_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: INSURANCE_DETAIL_ERROR, payload: error.message });
    }
};

export const InsurancestatusActions = (queryParams, setCallApi, billData, autoId, tracking_details, Navigate) => async (dispatch) => {
    dispatch({ type: INSURANCE_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/insurance/status`, queryParams);
        dispatch(InsuranceListAction(queryParams));//update list then data is change
        if (response?.data?.message === "Insurance Status Updated Successfully") {
            toast.success(response?.data?.message);
            setCallApi((preState) => !preState);

        } 
      
        dispatch({ type: INSURANCE_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: INSURANCE_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const InsurancedeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: INSURANCE_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/insurance/delete`, queryParams);

        if (response?.data?.message === "Insurance Deleted Successfully") {
            dispatch(InsuranceListAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            Navigate("/dashboard/insurances-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: INSURANCE_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: INSURANCE_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};