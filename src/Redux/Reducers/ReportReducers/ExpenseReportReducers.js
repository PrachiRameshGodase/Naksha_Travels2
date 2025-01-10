import {
    EXPENSE_REPORT_REQUEST,
    EXPENSE_REPORT_SUCCESS,
    EXPENSE_REPORT_FAILURE,
} from "../../Constants/ReportsConstants/ExpenseReportConstant"

const initialState = { loading: false, data: null, error: null };

export const expenseReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXPENSE_REPORT_REQUEST: return { ...state, loading: true, error: null };
        case EXPENSE_REPORT_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case EXPENSE_REPORT_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};