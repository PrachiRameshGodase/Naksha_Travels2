import { CREATE_VISA_ERROR, CREATE_VISA_REQUEST, CREATE_VISA_SUCCESS, GET_VISA_ERROR, GET_VISA_REQUEST, GET_VISA_SUCCESS, VISA_DELETE_ERROR, VISA_DELETE_REQUEST, VISA_DELETE_SUCCESS, VISA_DETAIL_ERROR, VISA_DETAIL_REQUEST, VISA_DETAIL_SUCCESS, VISA_STATUS_ERROR, VISA_STATUS_REQUEST, VISA_STATUS_SUCCESS } from "../Constants/visaConstant";

  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createVisaReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_VISA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_VISA_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_VISA_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const listVisaReducer = (state = initialState, action) => {
    switch (action?.type) {
      case GET_VISA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_VISA_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_VISA_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const visaDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case VISA_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VISA_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case VISA_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const visastatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case VISA_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VISA_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case VISA_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const visadeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case VISA_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VISA_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case VISA_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};