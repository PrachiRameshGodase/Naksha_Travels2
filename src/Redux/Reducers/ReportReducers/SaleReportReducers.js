import {
    SALE_BY_CUSTOMER_REQUEST,
    SALE_BY_CUSTOMER_SUCCESS,
    SALE_BY_CUSTOMER_FAILURE,

    SALE_BY_ITEM_REQUEST,
    SALE_BY_ITEM_SUCCESS,
    SALE_BY_ITEM_FAILURE,
} from "../../Constants/ReportsConstants/SaleReportContants"

const initialState = { loading: false, data: null, error: null };

export const saleByCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SALE_BY_CUSTOMER_REQUEST: return { ...state, loading: true, error: null };
        case SALE_BY_CUSTOMER_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case SALE_BY_CUSTOMER_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};

export const saleByItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SALE_BY_ITEM_REQUEST: return { ...state, loading: true, error: null };
        case SALE_BY_ITEM_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case SALE_BY_ITEM_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    };
}

