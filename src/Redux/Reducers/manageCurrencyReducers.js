import {
    CURRENCY_RATE_REQUEST,
    CURRENCY_RATE_SUCCESS,
    CURRENCY_RATE_ERROR,

    CURRENCY_RATE_CREATE_REQUEST,
    CURRENCY_RATE_CREATE_SUCCESS,
    CURRENCY_RATE_CREATE_ERROR,
} from "../Constants/manageCurrencyContants";

const initialState = { loading: false, data: null, error: null };


export const currencyRateListReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENCY_RATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CURRENCY_RATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case CURRENCY_RATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}


export const currencyRateCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENCY_RATE_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CURRENCY_RATE_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case CURRENCY_RATE_CREATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}