import { CREATE_FLIGHT_ERROR, CREATE_FLIGHT_REQUEST, CREATE_FLIGHT_SUCCESS, FLIGHT_DELETE_ERROR, FLIGHT_DELETE_REQUEST, FLIGHT_DELETE_SUCCESS, FLIGHT_DETAIL_ERROR, FLIGHT_DETAIL_REQUEST, FLIGHT_DETAIL_SUCCESS, FLIGHT_STATUS_ERROR, FLIGHT_STATUS_REQUEST, FLIGHT_STATUS_SUCCESS, GET_FLIGHT_ERROR, GET_FLIGHT_REQUEST, GET_FLIGHT_SUCCESS } from "../Constants/flightConstant";

  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createFlightReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_FLIGHT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_FLIGHT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_FLIGHT_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const listFlightReducer = (state = initialState, action) => {
    switch (action?.type) {
      case GET_FLIGHT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_FLIGHT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_FLIGHT_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const flightDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case FLIGHT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FLIGHT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case FLIGHT_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const flightstatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case FLIGHT_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FLIGHT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case FLIGHT_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const flightdeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case FLIGHT_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FLIGHT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case FLIGHT_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};