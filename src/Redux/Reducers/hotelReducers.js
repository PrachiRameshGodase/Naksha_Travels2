import { CREATE_HELP_ERROR } from "../Constants/helpConstant";
import { CREATE_HOTEL_REQUEST, CREATE_HOTEL_ROOM_ERROR, CREATE_HOTEL_ROOM_REQUEST, CREATE_HOTEL_ROOM_SUCCESS, CREATE_HOTEL_SUCCESS, GET_HOTEL_ERROR, GET_HOTEL_REQUEST, GET_HOTEL_ROOM_ERROR, GET_HOTEL_ROOM_REQUEST, GET_HOTEL_ROOM_SUCCESS, GET_HOTEL_SUCCESS, HOTEL_DELETE_ERROR, HOTEL_DELETE_REQUEST, HOTEL_DELETE_SUCCESS, HOTEL_DETAIL_ERROR, HOTEL_DETAIL_REQUEST, HOTEL_DETAIL_SUCCESS, HOTEL_ROOM_DELETE_ERROR, HOTEL_ROOM_DELETE_REQUEST, HOTEL_ROOM_DELETE_SUCCESS, HOTEL_ROOM_DETAIL_ERROR, HOTEL_ROOM_DETAIL_REQUEST, HOTEL_ROOM_DETAIL_SUCCESS, HOTEL_ROOM_STATUS_ERROR, HOTEL_ROOM_STATUS_REQUEST, HOTEL_ROOM_STATUS_SUCCESS, HOTEL_STATUS_ERROR, HOTEL_STATUS_REQUEST, HOTEL_STATUS_SUCCESS, } from "../Constants/HotelConstant";

  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createHotelReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_HOTEL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_HOTEL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_HELP_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const listHotelReducer = (state = initialState, action) => {
    switch (action?.type) {
      case GET_HOTEL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_HOTEL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_HOTEL_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const hotelDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case HOTEL_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case HOTEL_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case HOTEL_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const hotelStatusReducer = (state = initialState, action) => {
  switch (action?.type) {
      case HOTEL_STATUS_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case HOTEL_STATUS_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case HOTEL_STATUS_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export const hoteltDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case HOTEL_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case HOTEL_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case HOTEL_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export const createHotelRoomReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CREATE_HOTEL_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_HOTEL_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CREATE_HOTEL_ROOM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listHotelrOOMReducer = (state = initialState, action) => {
  switch (action?.type) {
    case GET_HOTEL_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_HOTEL_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_HOTEL_ROOM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const hotelrOOMDetailReducer = (state = initialState, action) => {
  switch (action?.type) {
      case HOTEL_ROOM_DETAIL_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case HOTEL_ROOM_DETAIL_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case HOTEL_ROOM_DETAIL_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};


export const hotelRoomStatusReducer = (state = initialState, action) => {
  switch (action?.type) {
      case HOTEL_ROOM_STATUS_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case HOTEL_ROOM_STATUS_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case HOTEL_ROOM_STATUS_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export const hoteltRoomDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case HOTEL_ROOM_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case HOTEL_ROOM_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case HOTEL_ROOM_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};