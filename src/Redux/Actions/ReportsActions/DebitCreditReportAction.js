import axiosInstance from "../../../Configs/axiosInstance";

import {
    DEBIT_NOTE_REPORT_REQUEST,
    DEBIT_NOTE_REPORT_SUCCESS,
    DEBIT_NOTE_REPORT_FAILURE,

    CREDIT_NOTE_REPORT_REQUEST,
    CREDIT_NOTE_REPORT_SUCCESS,
    CREDIT_NOTE_REPORT_FAILURE,
} from "../../Constants/ReportsConstants/DebitCreditNoteReportConstant"

export const debitNoteReportAction = (params) => async dispatch => {
    dispatch({ type: DEBIT_NOTE_REPORT_REQUEST });
    try {
        const response = await axiosInstance.post(`/report/debit_note_details`, params);
        dispatch({ type: DEBIT_NOTE_REPORT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DEBIT_NOTE_REPORT_FAILURE, payload: error.message });
    }
};

export const creditNoteReportAction = (params) => async dispatch => {
    dispatch({ type: CREDIT_NOTE_REPORT_REQUEST });
    try {
        const response = await axiosInstance.post(`/report/credit_note_details`, params);
        dispatch({ type: CREDIT_NOTE_REPORT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREDIT_NOTE_REPORT_FAILURE, payload: error.message });
    }
};