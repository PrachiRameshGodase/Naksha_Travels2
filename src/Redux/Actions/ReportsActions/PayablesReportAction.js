import axiosInstance from "../../../Configs/axiosInstance";
import {
    VENDOR_SUMMARY_REPORT_REQUEST,
    VENDOR_SUMMARY_REPORT_SUCCESS,
    VENDOR_SUMMARY_REPORT_FAILURE,
} from "../../Constants/ReportsConstants/PayablesReportConstant.js";

export const vendorSummaryReportAction = (params) => async dispatch => {
    dispatch({ type: VENDOR_SUMMARY_REPORT_REQUEST });
    try {
        const response = await axiosInstance.post(`/reports/vendorsSummaryReport`, params);
        dispatch({ type: VENDOR_SUMMARY_REPORT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: VENDOR_SUMMARY_REPORT_FAILURE, payload: error.message });
    }
};