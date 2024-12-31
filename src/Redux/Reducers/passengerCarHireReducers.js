import { CREATE_PASSENGER_CARHIRE_ERROR, CREATE_PASSENGER_CARHIRE_REQUEST, CREATE_PASSENGER_CARHIRE_SUCCESS, PASSENGER_CARHIRE_DELETE_ERROR, PASSENGER_CARHIRE_DELETE_REQUEST, PASSENGER_CARHIRE_DELETE_SUCCESS } from "../Constants/passengerCarHireConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerCarHireReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGER_CARHIRE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGER_CARHIRE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGER_CARHIRE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerCarHireDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGER_CARHIRE_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGER_CARHIRE_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGER_CARHIRE_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
