import axiosInstance, { axiosInstanceForFile } from '../../Configs/axiosInstance';
import {
    ADD_ITMES_REQUEST,
    ADD_ITMES_SUCCESS,
    ADD_ITMES_ERROR,

    STOCK_ITMES_REQUEST,
    STOCK_ITMES_SUCCESS,
    STOCK_ITMES_ERROR,

    ITMES_DETAIL_REQUEST,
    ITMES_DETAIL_SUCCESS,
    ITMES_DETAIL_ERROR,

    ACITVE_INACTIVE_REQUEST,
    ACITVE_INACTIVE_SUCCESS,
    ACITVE_INACTIVE_FAILURE,

    ITEM_DELETE_REQUEST,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_FAILURE,

    ITEM_IMPORT_REQUEST,
    ITEM_IMPORT_SUCCESS,
    ITEM_IMPORT_FAILURE,

    ITEM_EXPORT_REQUEST,
    ITEM_EXPORT_SUCCESS,
    ITEM_EXPORT_FAILURE,

    ITEM_STOCK_REQUEST,
    ITEM_STOCK_SUCCESS,
    ITEM_STOCK_FAILURE,

    ITEM_ACTIVITY_REQUEST,
    ITEM_ACTIVITY_SUCCESS,
    ITEM_ACTIVITY_FAILURE,
} from "../Constants/itemsConstants";
import toast from 'react-hot-toast';
import { itemLists } from './listApisActions';
import { sendData } from '../../Views/Helper/HelperFunctions';


export const addItems = (queryParams, Navigate, editDub, closePopup,) => async (dispatch) => {
    // console.log("queryParams", queryParams); 
    try {
        dispatch({ type: ADD_ITMES_REQUEST });

        const { data } = await axiosInstance.post(`/item/create/update`,
            queryParams,
        );
        const { message, status } = data;
        dispatch({
            type: ADD_ITMES_SUCCESS,
            payload: {
                message,
                status
            },
        });



        dispatch(itemLists(sendData)); // call itemList api when We change something on it...

        if (editDub === "edit" && (data?.message === "Item Created Successfully")) {
            toast.success("Item Updated Successfully");
            Navigate('/dashboard/manage-items');
        } else if (editDub === "duplicate" && (data?.message === "Item Created Successfully")) {
            toast.success("Item Duplicated Successfully");
            Navigate('/dashboard/manage-items');
        }
        else if (data?.message === "Item Created Successfully") {
            if (closePopup) {
                closePopup(false)
            }
            toast.success(data?.message);
            Navigate('/dashboard/manage-items');
        }
        else {
            toast.error(data?.message);
        }

    } catch (error) {
        toast.error(error.message)
        dispatch({ type: ADD_ITMES_ERROR, payload: error.message });
    }
};

export const stockItemAdjustment = (queryParams, Navigate) => async (dispatch) => {
    try {

        dispatch({ type: STOCK_ITMES_REQUEST });

        const { data } = await axiosInstance.post(`/item/stock/adjust`,
            queryParams,
        );

        dispatch({
            type: STOCK_ITMES_SUCCESS,
            payload: {
                data
            },
        });

        dispatch(itemLists(sendData)); // call itemList api when We change something on it...

        toast.success('Stock adjustment successful!');
        setTimeout(() => {
            Navigate(`/dashboard/manage-items`);
        }, 1000);

    } catch (error) {
        dispatch({ type: STOCK_ITMES_ERROR, payload: error.message });
        toast.error(error.message);
    }
};

export const itemDetails = (queryParams) => async (dispatch) => {
    try {
        dispatch({ type: ITMES_DETAIL_REQUEST });
        const { data } = await axiosInstance.post('/item/details', queryParams);

        dispatch({
            type: ITMES_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: ITMES_DETAIL_ERROR, payload: error.message });
    }
};

export const activeInActive = (data) => async dispatch => {
    dispatch({ type: ACITVE_INACTIVE_REQUEST });
    try {
        const response = await axiosInstance.post(`item/status`, data);
        dispatch({ type: ACITVE_INACTIVE_SUCCESS, payload: response?.data });
        dispatch(itemLists(sendData)); // call itemList api when We change something on it...

    } catch (error) {
        dispatch({ type: ACITVE_INACTIVE_FAILURE, payload: error.message });
    }
};


export const importItems = (data) => async dispatch => {
    dispatch({ type: ITEM_IMPORT_REQUEST });
    try {
        const response = await axiosInstanceForFile.post(`items/import`, data);
        dispatch({ type: ITEM_IMPORT_SUCCESS, payload: response?.data });

        if (response?.data?.message === 'Item Excel Imported Successfully') {
            toast?.success(response?.data?.message);
        } else {
            toast?.error(response?.data?.message);
        }
    } catch (error) {
        dispatch({ type: ITEM_IMPORT_FAILURE, payload: error.message });
        toast?.error(error.message);
    }
};


export const exportItems = (data) => async dispatch => {
    dispatch({ type: ITEM_EXPORT_REQUEST });
    try {
        const response = await axiosInstanceForFile.get(`/items/export`, data);
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'items.xlsx');

        // Append the link to the body, trigger download, and remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        dispatch({ type: ITEM_EXPORT_SUCCESS, payload: response?.data });
        // console.log("data from Action", response);
    } catch (error) {
        dispatch({ type: ITEM_EXPORT_FAILURE, payload: error.message });
    }
};


export const deleteItems = (data, navigate) => async dispatch => {
    dispatch({ type: ITEM_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`item/delete`, data);

        dispatch({ type: ITEM_DELETE_SUCCESS, payload: response?.data });
        dispatch(itemLists(sendData)); // call itemList api when We change something on it...

        if (response?.data?.message === "Item Deleted successfully.") {
            toast.success(response?.data?.message);
            navigate('/dashboard/manage-items');
        } else {
            toast.error(response?.data?.message);
        }
    } catch (error) {
        dispatch({ type: ITEM_DELETE_FAILURE, payload: error.message });
    }
};


export const stockTransactionAction = (data, navigate) => async dispatch => {
    dispatch({ type: ITEM_STOCK_REQUEST });
    try {
        const response = await axiosInstance.post(`/item/stock/list`, data);

        dispatch({ type: ITEM_STOCK_SUCCESS, payload: response?.data });

        // if (response?.data?.message === "Item Deleted successfully.") {
        //     toast.success(response?.data?.message);
        //     navigate('/dashboard/manage-items');
        // } else {
        //     toast.error(response?.data?.message);
        // }
    } catch (error) {
        dispatch({ type: ITEM_STOCK_FAILURE, payload: error.message });
    }
};

export const activityTransactionAction = (data, navigate) => async dispatch => {
    dispatch({ type: ITEM_ACTIVITY_REQUEST });
    try {
        const response = await axiosInstance.post(`/item/activity/list`, data);

        dispatch({ type: ITEM_ACTIVITY_SUCCESS, payload: response?.data });


    } catch (error) {
        dispatch({ type: ITEM_ACTIVITY_FAILURE, payload: error.message });
    }
};

