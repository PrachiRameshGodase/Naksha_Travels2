import {
    CREATE_HELP_REQUEST,
    CREATE_HELP_SUCCESS,
    CREATE_HELP_ERROR,

    GET_HELP_REQUEST,
    GET_HELP_SUCCESS,
    GET_HELP_ERROR,

    CREATE_HELP_STATUS_REQUEST,
    CREATE_HELP_STATUS_SUCCESS,
    CREATE_HELP_STATUS_ERROR

} from "../Constants/helpConstant";
import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';

export const HelpCreateAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_HELP_REQUEST });
    try {
        const response = await axiosInstance.post(`/help/center/create/update`, queryParams);
        dispatch({ type: CREATE_HELP_REQUEST, payload: response.data });

        if (response?.data?.message === "Help Recorded Successfully") {
            toast?.success(response?.data?.message);
            Navigate("/dashboard/help")
        } else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_HELP_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_HELP_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const helplistActions = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_HELP_REQUEST });
    try {
        const response = await axiosInstance.post(`/help/center/list`, queryParams);

        dispatch({ type: GET_HELP_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_HELP_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const HelpCreateStatusAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_HELP_STATUS_REQUEST });

    try {
        const response = await axiosInstance.post(`/help/center/status`, queryParams);
        dispatch({ type: CREATE_HELP_STATUS_REQUEST, payload: response.data });

        if (response?.data?.message === "Help Center Status Updated Successfully") {
            toast?.success(response?.data?.message);
            Navigate("/dashboard/help");
        } else {
            toast?.error(response?.data?.message);
        }


        dispatch({ type: CREATE_HELP_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_HELP_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};
