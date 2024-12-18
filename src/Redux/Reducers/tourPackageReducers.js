import { CREATE_ITINERARY_ERROR, CREATE_ITINERARY_REQUEST, CREATE_ITINERARY_SUCCESS, CREATE_TOURPACKAGE_ERROR, CREATE_TOURPACKAGE_REQUEST, CREATE_TOURPACKAGE_SUCCESS, GET_ITINERARY_ERROR, GET_ITINERARY_REQUEST, GET_ITINERARY_SUCCESS, GET_TOURPACKAGE_ERROR, GET_TOURPACKAGE_REQUEST, GET_TOURPACKAGE_SUCCESS, ITINERARY_DELETE_ERROR, ITINERARY_DELETE_REQUEST, ITINERARY_DELETE_SUCCESS, ITINERARY_STATUS_ERROR, ITINERARY_STATUS_REQUEST, ITINERARY_STATUS_SUCCESS, TOURPACKAGE_DELETE_ERROR, TOURPACKAGE_DELETE_REQUEST, TOURPACKAGE_DELETE_SUCCESS, TOURPACKAGE_DETAIL_ERROR, TOURPACKAGE_DETAIL_REQUEST, TOURPACKAGE_DETAIL_SUCCESS, TOURPACKAGE_STATUS_ERROR, TOURPACKAGE_STATUS_REQUEST, TOURPACKAGE_STATUS_SUCCESS } from "../Constants/tourPackageConstant";

  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const createTourPackageReducer = (state = initialState, action) => {
    switch (action?.type) {
      case CREATE_TOURPACKAGE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_TOURPACKAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case CREATE_TOURPACKAGE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const listTourPackageReducer = (state = initialState, action) => {
    switch (action?.type) {
      case GET_TOURPACKAGE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_TOURPACKAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_TOURPACKAGE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const tourPackageDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case TOURPACKAGE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case TOURPACKAGE_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case TOURPACKAGE_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const tourPackagestatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case TOURPACKAGE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case TOURPACKAGE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case TOURPACKAGE_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const tourPackagedeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case TOURPACKAGE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case TOURPACKAGE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case TOURPACKAGE_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const createItineraryReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CREATE_ITINERARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ITINERARY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CREATE_ITINERARY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listItineraryReducer = (state = initialState, action) => {
  switch (action?.type) {
    case GET_ITINERARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ITINERARY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ITINERARY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};



export const itinerarystatusReducer = (state = initialState, action) => {
  switch (action?.type) {
      case ITINERARY_STATUS_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case ITINERARY_STATUS_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case ITINERARY_STATUS_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export const itinerarydeleteReducer = (state = initialState, action) => {
  switch (action?.type) {
      case ITINERARY_DELETE_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case ITINERARY_DELETE_SUCCESS:
          return {
              ...state,
              loading: false,
              data: action.payload,
              error: null,
          };
      case ITINERARY_DELETE_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};