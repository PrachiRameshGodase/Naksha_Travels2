import { CREATE_PASSENGER_VISA_ERROR, CREATE_PASSENGER_VISA_REQUEST, CREATE_PASSENGER_VISA_SUCCESS, PASSENGER_VISA_DELETE_ERROR, PASSENGER_VISA_DELETE_REQUEST, PASSENGER_VISA_DELETE_SUCCESS } from "../Constants/passengerVisaConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerVisaReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGER_VISA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGER_VISA_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGER_VISA_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerVisaDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGER_VISA_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGER_VISA_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGER_VISA_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
