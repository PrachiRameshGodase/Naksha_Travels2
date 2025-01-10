import {
    CUSTOMER_SUMMARY_REPORT_REQUEST,
    CUSTOMER_SUMMARY_REPORT_SUCCESS,
    CUSTOMER_SUMMARY_REPORT_FAILURE,
} from "../../Constants/ReportsConstants/ReceivablesReportConstant.js";

const initialState = { loading: false, data: null, error: null };

export const customerSummaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_SUMMARY_REPORT_REQUEST: return { ...state, loading: true, error: null };
        case CUSTOMER_SUMMARY_REPORT_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case CUSTOMER_SUMMARY_REPORT_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};