import {
    REQUISITIONS_LIST_REQUEST,
    REQUISITIONS_LIST_SUCCESS,
    REQUISITIONS_LIST_ERROR,

    REQUISITIONS_DETAIL_REQUEST,
    REQUISITIONS_DETAIL_SUCCESS,
    REQUISITIONS_DETAIL_ERROR,

    REQUISITIONS_APPROVAL_LIST_REQUEST,
    REQUISITIONS_APPROVAL_LIST_SUCCESS,
    REQUISITIONS_APPROVAL_LIST_ERROR,

    STOCK_APPROVAL_CREATE_REQUEST,
    STOCK_APPROVAL_CREATE_SUCCESS,
    STOCK_APPROVAL_CREATE_ERROR,

} from "../Constants/manufacturingConstants";

const initialState = { loading: false, data: null, error: null };


export const requisitionListReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUISITIONS_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case REQUISITIONS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case REQUISITIONS_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const requisitionDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUISITIONS_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case REQUISITIONS_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case REQUISITIONS_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const requisitionApprovalListReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUISITIONS_APPROVAL_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case REQUISITIONS_APPROVAL_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case REQUISITIONS_APPROVAL_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const manufacturingCreateStockApprovalReducers = (state = initialState, action) => {
    switch (action.type) {
        case STOCK_APPROVAL_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case STOCK_APPROVAL_CREATE_REQUEST:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case STOCK_APPROVAL_CREATE_REQUEST:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}