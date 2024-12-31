import { CREATE_PASSENGER_INSURANCE_ERROR, CREATE_PASSENGER_INSURANCE_REQUEST, CREATE_PASSENGER_INSURANCE_SUCCESS, PASSENGER_INSURANCE_DELETE_ERROR, PASSENGER_INSURANCE_DELETE_REQUEST, PASSENGER_INSURANCE_DELETE_SUCCESS } from "../Constants/passengerInsuranceConstant";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerInsuranceReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGER_INSURANCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGER_INSURANCE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGER_INSURANCE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerInsuranceDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGER_INSURANCE_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGER_INSURANCE_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGER_INSURANCE_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
