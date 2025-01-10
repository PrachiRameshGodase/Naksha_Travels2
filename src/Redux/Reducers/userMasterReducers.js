import { CREATE_USER_MASTER_ERROR, CREATE_USER_MASTER_REQUEST, CREATE_USER_MASTER_SUCCESS, DELETE_USER_MASTER_ERROR, DELETE_USER_MASTER_REQUEST, DELETE_USER_MASTER_SUCCESS, GET_USER_MASTER_ERROR, GET_USER_MASTER_REQUEST, GET_USER_MASTER_SUCCESS } from "../Constants/userMasterConstant";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const createUserMasterReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CREATE_USER_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CREATE_USER_MASTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listUserMasterReducer = (state = initialState, action) => {
  switch (action?.type) {
    case GET_USER_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_USER_MASTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userMasterDeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case DELETE_USER_MASTER_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case DELETE_USER_MASTER_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case DELETE_USER_MASTER_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};
