import { CREATE_PASSENGERM_INSURANCE_ERROR, CREATE_PASSENGERM_INSURANCE_REQUEST, CREATE_PASSENGERM_INSURANCE_SUCCESS, PASSENGERM_INSURANCE_DELETE_ERROR, PASSENGERM_INSURANCE_DELETE_REQUEST, PASSENGERM_INSURANCE_DELETE_SUCCESS } from "../Constants/passengerMInsuranceConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerMInsuranceReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGERM_INSURANCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGERM_INSURANCE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGERM_INSURANCE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerMInsuranceDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGERM_INSURANCE_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGERM_INSURANCE_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGERM_INSURANCE_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
