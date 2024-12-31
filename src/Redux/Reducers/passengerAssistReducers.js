import { CREATE_PASSENGER_ASSISTS_ERROR, CREATE_PASSENGER_ASSISTS_REQUEST, CREATE_PASSENGER_ASSISTS_SUCCESS, PASSENGER_ASSISTS_DELETE_ERROR, PASSENGER_ASSISTS_DELETE_REQUEST, PASSENGER_ASSISTS_DELETE_SUCCESS } from "../Constants/passengerAssistConstant";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerAssistReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGER_ASSISTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGER_ASSISTS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGER_ASSISTS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerAssistDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGER_ASSISTS_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGER_ASSISTS_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGER_ASSISTS_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
