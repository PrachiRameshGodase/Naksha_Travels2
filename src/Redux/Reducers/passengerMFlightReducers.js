import { CREATE_PASSENGERM_FLIGHT_ERROR, CREATE_PASSENGERM_FLIGHT_REQUEST, CREATE_PASSENGERM_FLIGHT_SUCCESS, PASSENGERM_FLIGHT_DELETE_ERROR, PASSENGERM_FLIGHT_DELETE_REQUEST, PASSENGERM_FLIGHT_DELETE_SUCCESS } from "../Constants/passengerMFlightConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerMFlightReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGERM_FLIGHT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGERM_FLIGHT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGERM_FLIGHT_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerMFlightDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGERM_FLIGHT_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGERM_FLIGHT_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGERM_FLIGHT_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
