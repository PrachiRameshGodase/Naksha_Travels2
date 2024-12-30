import { CREATE_PASSENGER_FLIGHT_ERROR, CREATE_PASSENGER_FLIGHT_REQUEST, CREATE_PASSENGER_FLIGHT_SUCCESS, PASSENGER_FLIGHT_DELETE_ERROR, PASSENGER_FLIGHT_DELETE_REQUEST, PASSENGER_FLIGHT_DELETE_SUCCESS } from "../Constants/passengerFlightConstant";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerFlightReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGER_FLIGHT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGER_FLIGHT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGER_FLIGHT_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerFlighttDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGER_FLIGHT_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGER_FLIGHT_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGER_FLIGHT_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
