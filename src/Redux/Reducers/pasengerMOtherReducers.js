import { CREATE_PASSENGERM_OTHER_ERROR, CREATE_PASSENGERM_OTHER_REQUEST, CREATE_PASSENGERM_OTHER_SUCCESS, PASSENGERM_OTHER_DELETE_ERROR, PASSENGERM_OTHER_DELETE_REQUEST, PASSENGERM_OTHER_DELETE_SUCCESS } from "../Constants/passengerMOtherConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerMOtherReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGERM_OTHER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGERM_OTHER_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGERM_OTHER_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerMOtherDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGERM_OTHER_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGERM_OTHER_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGERM_OTHER_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
