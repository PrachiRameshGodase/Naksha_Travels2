
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_VISA_ERROR, CREATE_VISA_REQUEST, CREATE_VISA_SUCCESS, GET_VISA_ERROR, GET_VISA_REQUEST, GET_VISA_SUCCESS, VISA_DELETE_ERROR, VISA_DELETE_REQUEST, VISA_DELETE_SUCCESS, VISA_DETAIL_ERROR, VISA_DETAIL_REQUEST, VISA_DETAIL_SUCCESS, VISA_STATUS_ERROR, VISA_STATUS_REQUEST, VISA_STATUS_SUCCESS } from "../Constants/visaConstant";

export const CreateVisaAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_VISA_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/visa/create/update`, queryParams);
        dispatch({ type: CREATE_VISA_REQUEST, payload: response.data });

        if (response?.data?.message === "Visa Details Added Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/visas-services')

        }
        else if (response?.data?.message === "Visa Details Updated Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/visas-services')

        }
        else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_VISA_SUCCESS, payload: response.data });
        return response?.data;
    } catch (error) {
        dispatch({ type: CREATE_VISA_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const visaListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_VISA_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/visa/list`, queryParams);

        dispatch({ type: GET_VISA_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

        console.log("response?.data?.data", response?.data?.data)
        return response?.data?.data;
    } catch (error) {
        dispatch({ type: GET_VISA_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const visaDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: VISA_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/service/visa/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: VISA_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: VISA_DETAIL_ERROR, payload: error.message });
    }
};

export const visastatusActions = (queryParams, setCallApi, billData, autoId, tracking_details, Navigate) => async (dispatch) => {
    dispatch({ type: VISA_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/visa/status`, queryParams);
        dispatch(visaListAction(queryParams));//update list then data is change
        if (response?.data?.message === "GRN Declined Updated Successfully") {
            toast.success(response?.data?.message);
            setCallApi((preState) => !preState);

        }

        dispatch({ type: VISA_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: VISA_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const visadeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: VISA_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/visa/delete`, queryParams);

        if (response?.data?.message === "Visa Deleted Successfully") {
            dispatch(visaListAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            Navigate("/dashboard/visas-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: VISA_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: VISA_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};