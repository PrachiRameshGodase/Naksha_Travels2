import { CREATE_HELP_ERROR } from "../Constants/helpConstant";
import { CREATE_PASSENGER_HOTEL_ERROR, CREATE_PASSENGER_HOTEL_REQUEST, CREATE_PASSENGER_HOTEL_SUCCESS, GET_PASSENGER_HOTEL_ERROR, GET_PASSENGER_HOTEL_REQUEST, GET_PASSENGER_HOTEL_SUCCESS, PASSENGER_HOTEL_DELETE_ERROR, PASSENGER_HOTEL_DELETE_REQUEST, PASSENGER_HOTEL_DELETE_SUCCESS, PASSENGER_HOTEL_DETAIL_ERROR, PASSENGER_HOTEL_DETAIL_REQUEST, PASSENGER_HOTEL_DETAIL_SUCCESS, PASSENGER_HOTEL_STATUS_ERROR, PASSENGER_HOTEL_STATUS_REQUEST, PASSENGER_HOTEL_STATUS_SUCCESS } from "../Constants/passengerHotelConstant";

  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerHotelReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGER_HOTEL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGER_HOTEL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGER_HOTEL_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const listPassengerHotelReducer = (state = initialState, action) => {
    switch (action?.type) {
      case GET_PASSENGER_HOTEL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_PASSENGER_HOTEL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_PASSENGER_HOTEL_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const passengerHotelDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case PASSENGER_HOTEL_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PASSENGER_HOTEL_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case PASSENGER_HOTEL_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const passsengerHotelStatusReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGER_HOTEL_STATUS_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGER_HOTEL_STATUS_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGER_HOTEL_STATUS_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export const passengerHoteltDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGER_HOTEL_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGER_HOTEL_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGER_HOTEL_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
