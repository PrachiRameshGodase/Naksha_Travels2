import {
    VENDOR_SUMMARY_REPORT_REQUEST,
    VENDOR_SUMMARY_REPORT_SUCCESS,
    VENDOR_SUMMARY_REPORT_FAILURE,
} from "../../Constants/ReportsConstants/PayablesReportConstant.js";

const initialState = { loading: false, data: null, error: null };

export const vendorSummaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case VENDOR_SUMMARY_REPORT_REQUEST: return { ...state, loading: true, error: null };
        case VENDOR_SUMMARY_REPORT_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case VENDOR_SUMMARY_REPORT_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};