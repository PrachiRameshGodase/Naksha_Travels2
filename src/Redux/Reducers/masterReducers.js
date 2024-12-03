import {
  CREATE_MASTER_ERROR,
  CREATE_MASTER_REQUEST,
  CREATE_MASTER_SUCCESS,
  
  GET_MASTER_ERROR,
  GET_MASTER_REQUEST,
  GET_MASTER_SUCCESS,
} from "../Constants/masterConstant";
const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const createMasterReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CREATE_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CREATE_MASTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listMasterReducer = (state = initialState, action) => {
  switch (action?.type) {
    case GET_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_MASTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
