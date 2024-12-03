import axiosInstance from "../../../Configs/axiosInstance";

import {
    SALE_BY_CUSTOMER_REQUEST,
    SALE_BY_CUSTOMER_SUCCESS,
    SALE_BY_CUSTOMER_FAILURE
} from "../../Constants/ReportsConstants/SaleReportContants"

export const saleByCustomerAction = (params) => async dispatch => {
    dispatch({ type: SALE_BY_CUSTOMER_REQUEST });
    try {
        const response = await axiosInstance.post(`/sales/sale_by_customer`, params);
        dispatch({ type: SALE_BY_CUSTOMER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: SALE_BY_CUSTOMER_FAILURE, payload: error.message });
    }
};