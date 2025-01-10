import { CREATE_PASSENGERM_ASSISTS_ERROR, CREATE_PASSENGERM_ASSISTS_REQUEST, CREATE_PASSENGERM_ASSISTS_SUCCESS, PASSENGERM_ASSISTS_DELETE_ERROR, PASSENGERM_ASSISTS_DELETE_REQUEST, PASSENGERM_ASSISTS_DELETE_SUCCESS } from "../Constants/passengerMAssistConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerMAssistReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGERM_ASSISTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGERM_ASSISTS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGERM_ASSISTS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerMAssistDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGERM_ASSISTS_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGERM_ASSISTS_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGERM_ASSISTS_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
