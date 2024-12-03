import axiosInstance from "../../../Configs/axiosInstance";

import {
    ACCOUNT_TRANSACTION_REQUEST,
    ACCOUNT_TRANSACTION_SUCCESS,
    ACCOUNT_TRANSACTION_FAILURE
} from "../../Constants/ReportsConstants/AccountReportConstant"

export const accountTransactionAction = (params) => async dispatch => {
    dispatch({ type: ACCOUNT_TRANSACTION_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/transaction_details_report`, params);
        dispatch({ type: ACCOUNT_TRANSACTION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ACCOUNT_TRANSACTION_FAILURE, payload: error.message });
    }
};