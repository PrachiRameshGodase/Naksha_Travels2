
import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import { ADD_PASSENGER_ERROR, ADD_PASSENGER_REQUEST, ADD_PASSENGER_SUCCESS, CLEAR_MICE_STATE, CREATE_MICE_ERROR, CREATE_MICE_REQUEST, CREATE_MICE_SUCCESS, GET_MICE_ERROR, GET_MICE_REQUEST, GET_MICE_SUCCESS, GET_MICE_SUPPLIER_SUMMARY_ERROR, GET_MICE_SUPPLIER_SUMMARY_REQUEST, GET_MICE_SUPPLIER_SUMMARY_SUCCESS, MICE_DELETE_ERROR, MICE_DELETE_REQUEST, MICE_DELETE_SUCCESS, MICE_DETAIL_ERROR, MICE_DETAIL_REQUEST, MICE_DETAIL_SUCCESS, MICE_STATUS_ERROR, MICE_STATUS_REQUEST, MICE_STATUS_SUCCESS, PASSENGER_DELETE_ERROR, PASSENGER_DELETE_REQUEST, PASSENGER_DELETE_SUCCESS } from '../Constants/MICEConstants';

export const MICECreateAction = (queryParams, Navigate,) => async (dispatch) => {
    dispatch({ type: CREATE_MICE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/mice/create/update`, queryParams);
        dispatch({ type: CREATE_MICE_REQUEST, payload: response.data });
        
        if (response?.data?.message === "Mice created successfully") {
            toast?.success(response?.data?.message);
           
        } else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_MICE_SUCCESS, payload: response.data });
        return response;

    } catch (error) {
        dispatch({ type: CREATE_MICE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const MICEListActions = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_MICE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/mice/list`, queryParams);

        dispatch({ type: GET_MICE_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_MICE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const MICEDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: MICE_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/service/mice/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: MICE_DETAIL_SUCCESS,
            payload: {
                data
            },
        });
        

    } catch (error) {
        dispatch({ type: MICE_DETAIL_ERROR, payload: error.message });
    }
};

export const MICEDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: MICE_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/mice/delete`, queryParams);

        if (response?.data?.message === "Mice Deleted Successfully") {
           
            toast.success(response?.data?.message);
            Navigate("/dashboard/mice");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: MICE_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: MICE_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const MICEStatusActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: MICE_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/mice/invoiced`, queryParams);

        if (response?.data?.message === "Dsr Invoiced Successfully") {
           
            toast.success(response?.data?.message);
            Navigate("/dashboard/mice");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: MICE_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: MICE_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const PassengerAddAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: ADD_PASSENGER_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/service/passenger/create`, queryParams);
        dispatch({ type: ADD_PASSENGER_REQUEST, payload: response.data });

        if (response?.data?.message === "Passenger created successfully") {
            toast?.success(response?.data?.message);
            // Navigate("/dashboard/help")
        } else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: ADD_PASSENGER_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: ADD_PASSENGER_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const PassengerDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGER_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/service/passenger/delete`, queryParams);

        if (response?.data?.message === "Passenger Deleted Successfully") {
           
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGER_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGER_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const clearMiceState = () => ({
    type: CLEAR_MICE_STATE,
});

export const MICESupplierSummaryListActions = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_MICE_SUPPLIER_SUMMARY_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/mice/supplier/summary`, queryParams);

        dispatch({ type: GET_MICE_SUPPLIER_SUMMARY_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_MICE_SUPPLIER_SUMMARY_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};