import { ASSIST_DELETE_ERROR, ASSIST_DELETE_REQUEST, ASSIST_DELETE_SUCCESS, ASSIST_DETAIL_ERROR, ASSIST_DETAIL_REQUEST, ASSIST_DETAIL_SUCCESS, ASSIST_STATUS_ERROR, ASSIST_STATUS_REQUEST, ASSIST_STATUS_SUCCESS, CREATE_ASSIST_ERROR, CREATE_ASSIST_REQUEST, CREATE_ASSIST_SUCCESS, GET_ASSIST_ERROR, GET_ASSIST_REQUEST, GET_ASSIST_SUCCESS } from "../Constants/assistConstant";

  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createAssistReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_ASSIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_ASSIST_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_ASSIST_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const listAssistReducer = (state = initialState, action) => {
    switch (action?.type) {
      case GET_ASSIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ASSIST_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_ASSIST_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const assistDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ASSIST_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ASSIST_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ASSIST_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const assiststatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ASSIST_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ASSIST_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ASSIST_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const assistdeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ASSIST_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ASSIST_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ASSIST_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};