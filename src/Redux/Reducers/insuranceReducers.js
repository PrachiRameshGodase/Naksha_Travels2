import { CREATE_INSURANCE_ERROR, CREATE_INSURANCE_REQUEST, CREATE_INSURANCE_SUCCESS, GET_INSURANCE_ERROR, GET_INSURANCE_REQUEST, GET_INSURANCE_SUCCESS, INSURANCE_DELETE_ERROR, INSURANCE_DELETE_REQUEST, INSURANCE_DELETE_SUCCESS, INSURANCE_DETAIL_ERROR, INSURANCE_DETAIL_REQUEST, INSURANCE_DETAIL_SUCCESS, INSURANCE_STATUS_ERROR, INSURANCE_STATUS_REQUEST, INSURANCE_STATUS_SUCCESS } from "../Constants/insuranceConstants";

  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createInsuranceReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_INSURANCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_INSURANCE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_INSURANCE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const listInsuranceReducer = (state = initialState, action) => {
    switch (action?.type) {
      case GET_INSURANCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_INSURANCE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_INSURANCE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const InsuranceDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case INSURANCE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case INSURANCE_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case INSURANCE_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const InsurancestatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case INSURANCE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case INSURANCE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case INSURANCE_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const InsurancedeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case INSURANCE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case INSURANCE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case INSURANCE_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};