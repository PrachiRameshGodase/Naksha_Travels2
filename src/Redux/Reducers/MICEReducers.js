import { ADD_PASSENGER_ERROR, ADD_PASSENGER_REQUEST, ADD_PASSENGER_SUCCESS, CLEAR_MICE_STATE, CREATE_MICE_ERROR, CREATE_MICE_REQUEST, CREATE_MICE_SUCCESS, GET_MICE_ERROR, GET_MICE_REQUEST, GET_MICE_SUCCESS, MICE_DELETE_ERROR, MICE_DELETE_REQUEST, MICE_DELETE_SUCCESS, MICE_DETAIL_ERROR, MICE_DETAIL_REQUEST, MICE_DETAIL_SUCCESS, MICE_STATUS_ERROR, MICE_STATUS_REQUEST, MICE_STATUS_SUCCESS, PASSENGER_DELETE_ERROR, PASSENGER_DELETE_REQUEST, PASSENGER_DELETE_SUCCESS } from "../Constants/MICEConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createMICEreducer = (state = initialState, action) => {
    switch (action?.type) {
        case CREATE_MICE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_MICE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_MICE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const listMICEreducer = (state = initialState, action) => {
    switch (action?.type) {
        case  GET_MICE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_MICE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case GET_MICE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const MICEDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case MICE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case MICE_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case MICE_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
            case CLEAR_MICE_STATE:
            return initialState;
        default:
            return state;
    }
};

export const DeleteMICEReducer = (state = initialState, action) => {
    switch (action?.type) {
        case MICE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case MICE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case MICE_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const MICEStatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case MICE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case MICE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case MICE_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const AddMPassengerReducer = (state = initialState, action) => {
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


export const DeleteMPassengerReducer = (state = initialState, action) => {
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