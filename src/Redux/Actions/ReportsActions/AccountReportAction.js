import axiosInstance from "../../../Configs/axiosInstance";

import {
    ACCOUNT_TRANSACTION_REQUEST,
    ACCOUNT_TRANSACTION_SUCCESS,
    ACCOUNT_TRANSACTION_FAILURE,
    GERNAL_LEDGER_REPORT_REQUEST,
    GERNAL_LEDGER_REPORT_SUCCESS,
    GERNAL_LEDGER_REPORT_FAILURE,
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

export const gernalLedgerAction = (params) => async dispatch => {
    dispatch({ type: GERNAL_LEDGER_REPORT_REQUEST });
    try {
        const response = await axiosInstance.post(`/getAccountSummary/generalLedger`, params);
        dispatch({ type: GERNAL_LEDGER_REPORT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GERNAL_LEDGER_REPORT_FAILURE, payload: error.message });
    }
};