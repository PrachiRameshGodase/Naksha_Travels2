
import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import { ADD_PASSENGER_ERROR, ADD_PASSENGER_REQUEST, ADD_PASSENGER_SUCCESS, CLEAR_DSR_STATE, CREATE_DSR_ERROR, CREATE_DSR_REQUEST, CREATE_DSR_SUCCESS, DSR_DELETE_ERROR, DSR_DELETE_REQUEST, DSR_DELETE_SUCCESS, DSR_DETAIL_ERROR, DSR_DETAIL_REQUEST, DSR_DETAIL_SUCCESS, DSR_STATUS_ERROR, DSR_STATUS_REQUEST, DSR_STATUS_SUCCESS, GET_DSR_ERROR, GET_DSR_REQUEST, GET_DSR_SUCCESS, GET_DSR_SUPPLIER_SUMMARY_ERROR, GET_DSR_SUPPLIER_SUMMARY_REQUEST, GET_DSR_SUPPLIER_SUMMARY_SUCCESS, PASSENGER_DELETE_ERROR, PASSENGER_DELETE_REQUEST, PASSENGER_DELETE_SUCCESS } from '../Constants/DSRConstants';

export const DSRCreateAction = (queryParams, showAllSequenceId,) => async (dispatch) => {
    dispatch({ type: CREATE_DSR_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/dsr/create/update`, queryParams);
        dispatch({ type: CREATE_DSR_REQUEST, payload: response.data });

        if (response?.data?.message === "DSR created successfully") {
            toast?.success(response?.data?.message);
        } else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_DSR_SUCCESS, payload: response.data });
        return response;

    } catch (error) {
        dispatch({ type: CREATE_DSR_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const DSRListActions = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_DSR_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/dsr/list`, queryParams);

        dispatch({ type: GET_DSR_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_DSR_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const DSRDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: DSR_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/service/dsr/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: DSR_DETAIL_SUCCESS,
            payload: {
                data
            },
        });


    } catch (error) {
        dispatch({ type: DSR_DETAIL_ERROR, payload: error.message });
    }
};

export const DSRDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: DSR_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/dsr/delete`, queryParams);

        if (response?.data?.message === "Dsr Deleted Successfully") {

            toast.success(response?.data?.message);
            Navigate("/dashboard/dsr");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: DSR_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: DSR_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const DSRStatusActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: DSR_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/dsr/invoiced`, queryParams);

        if (response?.data?.message === "Dsr Invoiced Successfully") {

            toast.success(response?.data?.message);
            Navigate("/dashboard/dsr");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: DSR_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: DSR_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const PassengerAddAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: ADD_PASSENGER_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/service/passenger/create`, queryParams);
        dispatch({ type: ADD_PASSENGER_REQUEST, payload: response.data });

        if (response?.data?.message === "Passenger created successfully") {
            toast?.success(response?.data?.message);
            // Navigate("/dashboard/help")
        } else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: ADD_PASSENGER_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: ADD_PASSENGER_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const PassengerDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGER_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/dsr/service/passenger/delete`, queryParams);

        if (response?.data?.message === "Passenger Deleted Successfully") {

            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGER_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGER_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const clearDsrState = () => ({
    type: CLEAR_DSR_STATE,
});

export const DSRSupplierSummaryListActions = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_DSR_SUPPLIER_SUMMARY_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/supplier/summary`, queryParams);

        dispatch({ type: GET_DSR_SUPPLIER_SUMMARY_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_DSR_SUPPLIER_SUMMARY_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};