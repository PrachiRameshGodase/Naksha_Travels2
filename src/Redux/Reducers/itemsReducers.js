import {
    ADD_ITMES_REQUEST,
    ADD_ITMES_SUCCESS,
    ADD_ITMES_ERROR,

    STOCK_ITMES_REQUEST,
    STOCK_ITMES_SUCCESS,
    STOCK_ITMES_ERROR,

    ITMES_DETAIL_REQUEST,
    ITMES_DETAIL_SUCCESS,
    ITMES_DETAIL_ERROR,

    ACITVE_INACTIVE_REQUEST,
    ACITVE_INACTIVE_SUCCESS,
    ACITVE_INACTIVE_FAILURE,

    ITEM_DELETE_REQUEST,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_FAILURE,

    ITEM_IMPORT_REQUEST,
    ITEM_IMPORT_SUCCESS,
    ITEM_IMPORT_FAILURE,

    ITEM_EXPORT_REQUEST,
    ITEM_EXPORT_SUCCESS,
    ITEM_EXPORT_FAILURE,

    ITEM_STOCK_REQUEST,
    ITEM_STOCK_SUCCESS,
    ITEM_STOCK_FAILURE,

    ITEM_ACTIVITY_REQUEST,
    ITEM_ACTIVITY_SUCCESS,
    ITEM_ACTIVITY_FAILURE,
} from "../Constants/itemsConstants";

const initialState = {
    loading: false
}

export const addItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITMES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case ADD_ITMES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                addItemsResponse: action.payload,
            }

        case ADD_ITMES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const stockItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STOCK_ITMES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case STOCK_ITMES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                stockData: action.payload,
            }

        case STOCK_ITMES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const itemsDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case ITMES_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case ITMES_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                itemsDetail: action.payload,
            }

        case ITMES_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const activeInactiveItemReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ACITVE_INACTIVE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ACITVE_INACTIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload,
                error: null,
            };
        case ACITVE_INACTIVE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const itemDeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ITEM_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ITEM_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                delete: action.payload,
                error: null,
            };
        case ITEM_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const itemImportReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ITEM_IMPORT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ITEM_IMPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ITEM_IMPORT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const itemExportReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ITEM_EXPORT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ITEM_EXPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ITEM_EXPORT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const itemStockeducer = (state = initialState, action) => {
    switch (action?.type) {
        case ITEM_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ITEM_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ITEM_STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const itemActivityReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ITEM_ACTIVITY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ITEM_ACTIVITY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ITEM_ACTIVITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
