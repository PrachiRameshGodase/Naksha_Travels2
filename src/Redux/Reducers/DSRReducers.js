import { CREATE_DSR_ERROR, CREATE_DSR_REQUEST, CREATE_DSR_SUCCESS, GET_DSR_ERROR, GET_DSR_REQUEST, GET_DSR_SUCCESS } from "../Constants/DSRConstants";

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

