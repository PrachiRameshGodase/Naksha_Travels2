import { ADD_PASSENGER_ERROR, ADD_PASSENGER_REQUEST, ADD_PASSENGER_SUCCESS, CREATE_DSR_ERROR, CREATE_DSR_REQUEST, CREATE_DSR_SUCCESS, DSR_DETAIL_ERROR, DSR_DETAIL_REQUEST, DSR_DETAIL_SUCCESS, GET_DSR_ERROR, GET_DSR_REQUEST, GET_DSR_SUCCESS, PASSENGER_DELETE_ERROR, PASSENGER_DELETE_REQUEST, PASSENGER_DELETE_SUCCESS } from "../Constants/DSRConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createDSRreducer = (state = initialState, action) => {
    switch (action?.type) {
        case CREATE_DSR_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_DSR_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_DSR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const listDSRreducer = (state = initialState, action) => {
    switch (action?.type) {
        case  GET_DSR_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_DSR_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case GET_DSR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const DSRDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case DSR_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DSR_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case DSR_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const AddPassengerReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ADD_PASSENGER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_PASSENGER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ADD_PASSENGER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const DeletePassengerReducer = (state = initialState, action) => {
    switch (action?.type) {
        case PASSENGER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PASSENGER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case PASSENGER_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};