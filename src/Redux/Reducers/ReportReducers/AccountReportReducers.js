import {
    ACCOUNT_TRANSACTION_REQUEST,
    ACCOUNT_TRANSACTION_SUCCESS,
    ACCOUNT_TRANSACTION_FAILURE
} from "../../Constants/ReportsConstants/AccountReportConstant"

const initialState = { loading: false, data: null, error: null };
export const accountTransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_TRANSACTION_REQUEST: return { ...state, loading: true, error: null };
        case ACCOUNT_TRANSACTION_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case ACCOUNT_TRANSACTION_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};