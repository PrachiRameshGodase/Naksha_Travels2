import { CREATE_PASSENGERM_VISA_ERROR, CREATE_PASSENGERM_VISA_REQUEST, CREATE_PASSENGERM_VISA_SUCCESS, PASSENGERM_VISA_DELETE_ERROR, PASSENGERM_VISA_DELETE_REQUEST, PASSENGERM_VISA_DELETE_SUCCESS } from "../Constants/passengerMVisaConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerMVisaReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGERM_VISA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGERM_VISA_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGERM_VISA_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerMVisaDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGERM_VISA_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGERM_VISA_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGERM_VISA_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
