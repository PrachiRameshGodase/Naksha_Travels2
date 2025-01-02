import {
    CREATE_ORGNIZATION_REQUEST,
    CREATE_ORGNIZATION_SUCCESS,
    CREATE_ORGNIZATION_FAILURE,
    ORGNIZATION_LIST_REQUEST,
    ORGNIZATION_LIST_SUCCESS,
    ORGNIZATION_LIST_FAILURE,
} from '../Constants/orgnizationConstants.js';
const initialState = { loading: false, data: null, error: null };

export const createUpdateOrgnizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORGNIZATION_REQUEST: return { ...state, loading: true, error: null };
        case CREATE_ORGNIZATION_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case CREATE_ORGNIZATION_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};

export const orgnizationListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORGNIZATION_LIST_REQUEST: return { ...state, loading: true, error: null };
        case ORGNIZATION_LIST_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case ORGNIZATION_LIST_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};