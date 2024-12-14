import { CARHIRE_DELETE_ERROR, CARHIRE_DELETE_REQUEST, CARHIRE_DELETE_SUCCESS, CARHIRE_DETAIL_ERROR, CARHIRE_DETAIL_REQUEST, CARHIRE_DETAIL_SUCCESS, CARHIRE_STATUS_ERROR, CARHIRE_STATUS_REQUEST, CARHIRE_STATUS_SUCCESS, CREATE_CARHIRE_ERROR, CREATE_CARHIRE_REQUEST, CREATE_CARHIRE_SUCCESS, GET_CARHIRE_ERROR, GET_CARHIRE_REQUEST, GET_CARHIRE_SUCCESS } from "../Constants/carHireConstant";

  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createcarHireReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_CARHIRE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_CARHIRE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_CARHIRE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const listCarHireReducer = (state = initialState, action) => {
    switch (action?.type) {
      case GET_CARHIRE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_CARHIRE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_CARHIRE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const carHireDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CARHIRE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CARHIRE_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CARHIRE_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const carHirestatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CARHIRE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CARHIRE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CARHIRE_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const carHiredeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CARHIRE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CARHIRE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CARHIRE_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};