import axiosInstance from "../../../Configs/axiosInstance";
import {
    CUSTOMER_SUMMARY_REPORT_REQUEST,
    CUSTOMER_SUMMARY_REPORT_SUCCESS,
    CUSTOMER_SUMMARY_REPORT_FAILURE,
} from "../../Constants/ReportsConstants/ReceivablesReportConstant.js";

export const customerSummaryReportAction = (params) => async dispatch => {
    dispatch({ type: CUSTOMER_SUMMARY_REPORT_REQUEST });
    try {
        const response = await axiosInstance.post(`/reports/customerSummaryReport`, params);
        dispatch({ type: CUSTOMER_SUMMARY_REPORT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CUSTOMER_SUMMARY_REPORT_FAILURE, payload: error.message });
    }
};