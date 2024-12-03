import {  CREATE_HELP_REQUEST,
    CREATE_HELP_SUCCESS,
    CREATE_HELP_ERROR,

    GET_HELP_REQUEST,
    GET_HELP_SUCCESS,
    GET_HELP_ERROR ,

    CREATE_HELP_STATUS_REQUEST,
    CREATE_HELP_STATUS_SUCCESS,
    CREATE_HELP_STATUS_ERROR

 } from "../Constants/helpConstant";
const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createHelpreducer = (state = initialState, action) => {
    switch (action?.type) {
        case CREATE_HELP_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_HELP_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_HELP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const listHelpreducer = (state = initialState, action) => {
    switch (action?.type) {
        case  GET_HELP_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_HELP_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case GET_HELP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const statusHelpreducer = (state = initialState, action) => {
    switch (action?.type) {
        case  CREATE_HELP_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_HELP_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_HELP_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}