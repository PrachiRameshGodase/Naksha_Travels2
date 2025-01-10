import { CREATE_PASSENGERM_HOTEL_ERROR, CREATE_PASSENGERM_HOTEL_REQUEST, CREATE_PASSENGERM_HOTEL_SUCCESS, GET_PASSENGERM_HOTEL_ERROR, GET_PASSENGERM_HOTEL_REQUEST, GET_PASSENGERM_HOTEL_SUCCESS, PASSENGERM_HOTEL_DELETE_ERROR, PASSENGERM_HOTEL_DELETE_REQUEST, PASSENGERM_HOTEL_DELETE_SUCCESS, PASSENGERM_HOTEL_DETAIL_ERROR, PASSENGERM_HOTEL_DETAIL_REQUEST, PASSENGERM_HOTEL_DETAIL_SUCCESS } from "../Constants/passengerMHotelConstants";

  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createPassengerMHotelReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_PASSENGERM_HOTEL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_PASSENGERM_HOTEL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_PASSENGERM_HOTEL_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const listPassengerMHotelReducer = (state = initialState, action) => {
    switch (action?.type) {
      case GET_PASSENGERM_HOTEL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_PASSENGERM_HOTEL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_PASSENGERM_HOTEL_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const passengerHotelMDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case PASSENGERM_HOTEL_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PASSENGERM_HOTEL_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case PASSENGERM_HOTEL_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};



export const passengerMHoteltDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case PASSENGERM_HOTEL_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case PASSENGERM_HOTEL_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case PASSENGERM_HOTEL_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
