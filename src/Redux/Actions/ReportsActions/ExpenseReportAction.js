import axiosInstance from "../../../Configs/axiosInstance";

import {
    EXPENSE_REPORT_REQUEST,
    EXPENSE_REPORT_SUCCESS,
    EXPENSE_REPORT_FAILURE,
} from "../../Constants/ReportsConstants/ExpenseReportConstant"

export const expeseReportAction = (params) => async dispatch => {
    dispatch({ type: EXPENSE_REPORT_REQUEST });
    try {
        const response = await axiosInstance.post(`/reports/expenseDetailReport`, params);
        dispatch({ type: EXPENSE_REPORT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: EXPENSE_REPORT_FAILURE, payload: error.message });
    }
};