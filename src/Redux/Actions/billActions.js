import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    BILL_LIST_REQUEST,
    BILL_LIST_SUCCESS,
    BILL_LIST_ERROR,

    BILL_DETAILS_REQUEST,
    BILL_DETAILS_SUCCESS,
    BILL_DETAILS_ERROR,

    BILL_DELETE_REQUEST,
    BILL_DELETE_SUCCESS,
    BILL_DELETE_ERROR,

    PENDING_BILL_LIST_REQUEST,
    PENDING_BILL_LIST_SUCCESS,
    PENDING_BILL_LIST_ERROR,

    BILL_STATUS_REQUEST,
    BILL_STATUS_SUCCESS,
    BILL_STATUS_ERROR,

    BILL_SEND_REQUEST,
    BILL_SEND_SUCCESS,
    BILL_SEND_ERROR,
} from '../Constants/billConstants';
import { sendData } from '../../Views/Helper/HelperFunctions';


export const pendingBillLists = (queryParams, setInoiceData) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: PENDING_BILL_LIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/bills/pending/vendor`,
            queryParams
        );
        setInoiceData(response?.data)
        dispatch({ type: PENDING_BILL_LIST_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PENDING_BILL_LIST_ERROR, payload: error.message });
    }
};


export const billLists = (queryParams, setAllListValue) => async (dispatch) => {
    localStorage.setItem("billPayload", JSON.stringify(queryParams));
    dispatch({ type: BILL_LIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/bills/list`,
            queryParams
        );

        dispatch({ type: BILL_LIST_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: BILL_LIST_ERROR, payload: error.message });
    }
};


export const billDetails = (queryParams) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: BILL_DETAILS_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/bills/details`,
            queryParams
        );

        dispatch({ type: BILL_DETAILS_SUCCESS, payload: response.data });
        return response?.data;
    } catch (error) {
        dispatch({ type: BILL_DETAILS_ERROR, payload: error.message });
        toast.error(response?.data?.message)
    }
};


export const billDeletes = (queryParams, Navigate) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: BILL_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/bills/delete`,
            queryParams
        );

        dispatch({ type: BILL_DELETE_SUCCESS, payload: response.data });
        if (response?.data?.message === "Bill deleted Successfully") {
            dispatch(billLists(sendData));
            toast.success(response?.data?.message);
            Navigate("/dashboard/bills");
        } else {
            toast.error(response?.data?.message);
        }
    } catch (error) {
        dispatch({ type: BILL_DELETE_ERROR, payload: error.message });
        toast.error(response?.data?.message)
    }
};

export const billStatus = (queryParams, setCallApi) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: BILL_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/bills/status`,
            queryParams
        );
        dispatch(billLists(sendData));
        if (setCallApi) {
            if (response?.data?.message === "Bill Declined Updated Successfully") {
                toast.success(response?.data?.message);
                setCallApi((preState) => !preState);

            } else if (response?.data?.message === "Bill Approved Updated Successfully") {
                toast.success(response?.data?.message);
                setCallApi((preState) => !preState);
            }
            else if (response?.data?.message === "Bill  Updated Successfully") {
                toast.success(response?.data?.message);
                setCallApi((preState) => !preState);
            }
        }

        dispatch({ type: BILL_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: BILL_STATUS_ERROR, payload: error.message });
        toast.error(response?.data?.message)
    }
};

export const billSend = (quotationData, Navigate) => async (dispatch) => {
    try {
        dispatch({ type: BILL_SEND_REQUEST });

        const { data } = await axiosInstance.post(
            `/purchase/bills/send`,
            quotationData
        );

        dispatch({
            type: BILL_SEND_SUCCESS,
            payload: {
                data
            },
        });

        if (data?.message === "Bill sent Successfully") {
            dispatch(billLists(sendData));
            const sendData = {
                id: quotationData?.id,
                status: 6,
            };
            await dispatch(billStatus(sendData, ""));
            toast.success(data?.message);
            Navigate('/dashboard/bills');
        } else {
            toast.error(data?.message)
        }

    } catch (error) {
        dispatch({ type: BILL_SEND_ERROR, payload: error.message });
    }
};