import {
    PURCHASE_BY_VENDOR_REQUEST,
    PURCHASE_BY_VENDOR_SUCCESS,
    PURCHASE_BY_VENDOR_FAILURE,
} from "../../Constants/ReportsConstants/PurchaseReportConstant";

const initialState = { loading: false, data: null, error: null };

export const purchaseByVendorReducer = (state = initialState, action) => {
    switch (action.type) {
        case PURCHASE_BY_VENDOR_REQUEST: return { ...state, loading: true, error: null };
        case PURCHASE_BY_VENDOR_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case PURCHASE_BY_VENDOR_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};