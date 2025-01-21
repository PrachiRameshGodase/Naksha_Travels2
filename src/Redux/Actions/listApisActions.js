import {
    FETCH_ITEM_LIST_DATA_REQUEST,
    FETCH_ITEM_LIST_DATA_SUCCESS,
    FETCH_ITEM_LIST_DATA_FAILURE,

    FETCH_CAT_LIST_DATA_REQUEST,
    FETCH_CAT_LIST_DATA_SUCCESS,
    FETCH_CAT_LIST_DATA_FAILURE,

    FETCH_ACC_LIST_DATA_REQUEST,
    FETCH_ACC_LIST_DATA_SUCCESS,
    FETCH_ACC_LIST_DATA_FAILURE,

    FETCH_QUOTE_LIST_DATA_REQUEST,
    FETCH_QUOTE_LIST_DATA_SUCCESS,
    FETCH_QUOTE_LIST_DATA_FAILURE,

    FETCH_SALE_LIST_DATA_REQUEST,
    FETCH_SALE_LIST_DATA_SUCCESS,
    FETCH_SALE_LIST_DATA_FAILURE,

    FETCH_INVOICE_LIST_DATA_REQUEST,
    FETCH_INVOICE_LIST_DATA_SUCCESS,
    FETCH_INVOICE_LIST_DATA_FAILURE,

    FETCH_CREDIT_LIST_DATA_REQUEST,
    FETCH_CREDIT_LIST_DATA_SUCCESS,
    FETCH_CREDIT_LIST_DATA_FAILURE,

    FETCH_VENDOR_LIST_DATA_REQUEST,
    FETCH_VENDOR_LIST_DATA_SUCCESS,
    FETCH_VENDOR_LIST_DATA_FAILURE,

    CUSTOM_FIELD_REQUEST,
    CUSTOM_FIELD_SUCCESS,
    CUSTOM_FIELD_FAILURE,

    PURCHSE_LIST_REQUEST,
    PURCHSE_LIST_SUCCESS,
    PURCHSE_LIST_FAILURE,

    FETCH_JOURNAL_LIST_DATA_REQUEST,
    FETCH_JOURNAL_LIST_DATA_SUCCESS,
    FETCH_JOURNAL_LIST_DATA_FAILURE,

    FETCH_DEBIT_LIST_DATA_REQUEST,
    FETCH_DEBIT_LIST_DATA_SUCCESS,
    FETCH_DEBIT_LIST_DATA_ERROR,
} from '../Constants/listApiConstants';

import axiosInstance from '../../Configs/axiosInstance';



export const categoryList = (params) => async dispatch => {
    localStorage.setItem("catpayload", JSON.stringify(params))
    dispatch({ type: FETCH_CAT_LIST_DATA_REQUEST });
    try {
        // Sending `params` as part of the request body
        const response = await axiosInstance.post(`/category/list`, params);
        dispatch({ type: FETCH_CAT_LIST_DATA_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_CAT_LIST_DATA_FAILURE, payload: error.message });
    }
};




export const itemLists = (additionalData) => async dispatch => {
    // console.log("manageItem queryparams", additionalData)
    localStorage.setItem("itemPayload", JSON.stringify(additionalData))
    dispatch({ type: FETCH_ITEM_LIST_DATA_REQUEST });
    try {
        const warehouseId = +localStorage.getItem('selectedWarehouseId');
        const data = { ...additionalData, warehouse_id: warehouseId }; // Add warehouse_id to the additional data object
        const response = await axiosInstance.post(`/item/list`, data);
        dispatch({ type: FETCH_ITEM_LIST_DATA_SUCCESS, payload: response?.data });
        // // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: FETCH_ITEM_LIST_DATA_FAILURE, payload: error.message });
    }
};



export const accountLists = (data) => async dispatch => {
    localStorage.setItem("accountPayload", JSON.stringify(data))
    dispatch({ type: FETCH_ACC_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/list`, data)
        dispatch({ type: FETCH_ACC_LIST_DATA_SUCCESS, payload: response?.data });
    } catch (error) {
        dispatch({ type: FETCH_ACC_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const journalLists = (data) => async dispatch => {

    dispatch({ type: FETCH_JOURNAL_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/journal/list`, data);
        dispatch({ type: FETCH_JOURNAL_LIST_DATA_SUCCESS, payload: response?.data });

    } catch (error) {
        dispatch({ type: FETCH_JOURNAL_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const quotationLists = (data, setAllListValue) => async dispatch => {
    

    localStorage.setItem("quotPayload", JSON.stringify(data));
    dispatch({ type: FETCH_QUOTE_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/quotations/list`, data);
        dispatch({ type: FETCH_QUOTE_LIST_DATA_SUCCESS, payload: response?.data });

        if (setAllListValue) {
            setAllListValue(response?.data);
        }

    } catch (error) {
        dispatch({ type: FETCH_QUOTE_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const saleOrderLists = (data, setAllListValue) => async dispatch => {
    localStorage.setItem("salePayload", JSON.stringify(data));
    dispatch({ type: FETCH_SALE_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/sales-order/list`, data);
        dispatch({ type: FETCH_SALE_LIST_DATA_SUCCESS, payload: response?.data });
        if (setAllListValue) {
            setAllListValue(response?.data);
        }
    } catch (error) {
        dispatch({ type: FETCH_SALE_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const invoiceLists = (data, setAllListValue, section) => async dispatch => {
    // localStorage.setItem("invoicePayload", JSON.stringify(data));
    dispatch({ type: FETCH_INVOICE_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/invoice/list`, data);
        dispatch({ type: FETCH_INVOICE_LIST_DATA_SUCCESS, payload: response?.data });
        if (setAllListValue) {
            setAllListValue(response?.data);
        }
    } catch (error) {
        dispatch({ type: FETCH_INVOICE_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const creditNoteLists = (data, setAllListValue) => async dispatch => {
    localStorage.setItem("creditPayload", JSON.stringify(data));

    dispatch({ type: FETCH_CREDIT_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/credit-note/list`, data);
        dispatch({ type: FETCH_CREDIT_LIST_DATA_SUCCESS, payload: response?.data });
        if (setAllListValue) {
            setAllListValue(response?.data);
        }
    } catch (error) {
        dispatch({ type: FETCH_CREDIT_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const debitNoteLists = (data, setAllListValue) => async dispatch => {
    localStorage.setItem("debitPayload", JSON.stringify(data));

    dispatch({ type: FETCH_DEBIT_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance?.post(`/debit-note/list`, data);

        dispatch({ type: FETCH_DEBIT_LIST_DATA_SUCCESS, payload: response?.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }
    } catch (error) {
        dispatch({ type: FETCH_DEBIT_LIST_DATA_ERROR, payload: error.message });
    }
};

export const vendorsLists = (data, setAllListValue) => async dispatch => {
    localStorage.setItem("vendorPayload", JSON.stringify(data));

    dispatch({ type: FETCH_VENDOR_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/vendors/list?is_vendor=1`, data);
        dispatch({ type: FETCH_VENDOR_LIST_DATA_SUCCESS, payload: response?.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }
    } catch (error) {
        dispatch({ type: FETCH_VENDOR_LIST_DATA_FAILURE, payload: error.message });
    }
};

export const customFieldsLists = (data) => async dispatch => {

    dispatch({ type: CUSTOM_FIELD_REQUEST });
    try {
        const response = await axiosInstance.post(`/custom-fields/list`, data);
        dispatch({ type: CUSTOM_FIELD_SUCCESS, payload: response?.data });
        // // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: CUSTOM_FIELD_FAILURE, payload: error.message });
    }
};

export const purchseOrdersLists = (data, setAllListValue) => async dispatch => {
    localStorage.setItem("purchasePayload", JSON.stringify(data));
    dispatch({ type: PURCHSE_LIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase-order/list`, data);
        dispatch({ type: PURCHSE_LIST_SUCCESS, payload: response?.data });
        // // console.log("data from Action", response?.data);
        if (setAllListValue) {
            setAllListValue(response?.data)
        }
    } catch (error) {
        dispatch({ type: PURCHSE_LIST_FAILURE, payload: error.message });
    }
};