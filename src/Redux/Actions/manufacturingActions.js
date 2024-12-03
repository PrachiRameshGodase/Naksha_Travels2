
import axiosInstance from "../../Configs/axiosInstance";
import { showToast } from "../../Views/Helper/ComponentHelper/toastConfigure";
import {
    REQUISITIONS_LIST_REQUEST,
    REQUISITIONS_LIST_SUCCESS,
    REQUISITIONS_LIST_ERROR,

    REQUISITIONS_DETAIL_REQUEST,
    REQUISITIONS_DETAIL_SUCCESS,
    REQUISITIONS_DETAIL_ERROR,

    REQUISITIONS_APPROVAL_LIST_REQUEST,
    REQUISITIONS_APPROVAL_LIST_SUCCESS,
    REQUISITIONS_APPROVAL_LIST_ERROR,

    STOCK_APPROVAL_CREATE_REQUEST,
    STOCK_APPROVAL_CREATE_SUCCESS,
    STOCK_APPROVAL_CREATE_ERROR,


} from "../Constants/manufacturingConstants";

export const materialRequisitionsList = (queryParams) => async (dispatch) => {
    try {
        dispatch({ type: REQUISITIONS_LIST_REQUEST });

        const { data } = await axiosInstance.post(`/requestion/list`,
            queryParams,
        );
        dispatch({
            type: REQUISITIONS_LIST_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        toast.error(error.message)
        dispatch({ type: REQUISITIONS_LIST_ERROR, payload: error.message });
    }
};

export const materialRequisitionsDetails = (queryParams) => async (dispatch) => {
    try {
        dispatch({ type: REQUISITIONS_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(`/requestion/details`,
            queryParams,
        );
        dispatch({
            type: REQUISITIONS_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        toast.error(error.message)
        dispatch({ type: REQUISITIONS_DETAIL_ERROR, payload: error.message });
    }
};

export const requisitionApprovalListAction = (queryParams) => async (dispatch) => {
    try {
        dispatch({ type: REQUISITIONS_APPROVAL_LIST_REQUEST });

        const { data } = await axiosInstance.post(`/requestion/approval/list`,
            queryParams,
        );
        dispatch({
            type: REQUISITIONS_APPROVAL_LIST_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        toast.error(error.message)
        dispatch({ type: REQUISITIONS_APPROVAL_LIST_ERROR, payload: error.message });
    }
};

export const manufacturingCreateStockApprovalAction = (queryParams, setSearchTrigger) => async (dispatch) => {
    try {
        dispatch({ type: STOCK_APPROVAL_CREATE_REQUEST });

        const { data } = await axiosInstance.post(`/manufacturing/stock/approval`,
            queryParams,
        );

        if (data?.message === "MaterialRequestion Approved successfully.") {
            showToast(data?.message, "success");
            setSearchTrigger((prev) => prev + 1);
        } else {
            showToast(data?.message, "error");
        }

        dispatch({
            type: STOCK_APPROVAL_CREATE_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        toast.error(error.message)
        dispatch({ type: STOCK_APPROVAL_CREATE_ERROR, payload: error.message });
    }
};