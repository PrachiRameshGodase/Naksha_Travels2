import { CREATE_PASSENGERM_CARHIRE_ERROR, CREATE_PASSENGERM_CARHIRE_REQUEST, CREATE_PASSENGERM_CARHIRE_SUCCESS, PASSENGERM_CARHIRE_DELETE_ERROR, PASSENGERM_CARHIRE_DELETE_REQUEST, PASSENGERM_CARHIRE_DELETE_SUCCESS } from "../Constants/passengerMCarHireConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerMCarHireReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGERM_CARHIRE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGERM_CARHIRE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGERM_CARHIRE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

export const passengerMCarHireDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGERM_CARHIRE_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGERM_CARHIRE_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGERM_CARHIRE_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
