import { CREATE_PASSENGER_OTHERS_ERROR, CREATE_PASSENGER_OTHERS_REQUEST, CREATE_PASSENGER_OTHERS_SUCCESS, PASSENGER_OTHERS_DELETE_ERROR, PASSENGER_OTHERS_DELETE_REQUEST, PASSENGER_OTHERS_DELETE_SUCCESS } from "../Constants/passengerOthersConstant";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerOthersReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGER_OTHERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGER_OTHERS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGER_OTHERS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerOthersDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGER_OTHERS_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGER_OTHERS_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGER_OTHERS_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
