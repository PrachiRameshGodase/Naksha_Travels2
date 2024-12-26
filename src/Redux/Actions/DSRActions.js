
import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import { CREATE_DSR_ERROR, CREATE_DSR_REQUEST, CREATE_DSR_SUCCESS, GET_DSR_ERROR, GET_DSR_REQUEST, GET_DSR_SUCCESS } from '../Constants/DSRConstants';

export const DSRCreateAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_DSR_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/dsr/create/update`, queryParams);
        dispatch({ type: CREATE_DSR_REQUEST, payload: response.data });

        if (response?.data?.message === "DSR created successfully") {
            toast?.success(response?.data?.message);
            // Navigate("/dashboard/help")
        } else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_DSR_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_DSR_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const DSRListActions = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_DSR_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/dsr/list`, queryParams);

        dispatch({ type: GET_DSR_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_DSR_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

