import {
    DEBIT_NOTE_REPORT_REQUEST,
    DEBIT_NOTE_REPORT_SUCCESS,
    DEBIT_NOTE_REPORT_FAILURE,

    CREDIT_NOTE_REPORT_REQUEST,
    CREDIT_NOTE_REPORT_SUCCESS,
    CREDIT_NOTE_REPORT_FAILURE,
} from "../../Constants/ReportsConstants/DebitCreditNoteReportConstant"

const initialState = { loading: false, data: null, error: null };

export const debitNoteReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEBIT_NOTE_REPORT_REQUEST: return { ...state, loading: true, error: null };
        case DEBIT_NOTE_REPORT_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case DEBIT_NOTE_REPORT_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};

export const creditNoteReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREDIT_NOTE_REPORT_REQUEST: return { ...state, loading: true, error: null };
        case CREDIT_NOTE_REPORT_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case CREDIT_NOTE_REPORT_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};