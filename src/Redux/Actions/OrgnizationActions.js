import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    CREATE_ORGNIZATION_REQUEST,
    CREATE_ORGNIZATION_SUCCESS,
    CREATE_ORGNIZATION_FAILURE,

    ORGNIZATION_LIST_REQUEST,
    ORGNIZATION_LIST_SUCCESS,
    ORGNIZATION_LIST_FAILURE,
} from '../Constants/orgnizationConstants.js';

export const createUpdateOrgAction = (params, navigate, setSuccessMessage) => async dispatch => {
    // console.log("praaaaaaaaaaaaaa", params)
    dispatch({ type: CREATE_ORGNIZATION_REQUEST });
    try {
        const response = await axiosInstance.post(`/organisation/create/update`, params);
        if (response?.data?.message === "Organisation Created Successfullly") {
            toast?.success(response?.data?.message);
            setSuccessMessage(response?.data?.message)
            navigate("/settings/organisations");
        }

        dispatch({ type: CREATE_ORGNIZATION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_ORGNIZATION_FAILURE, payload: error.message });
    }
};
export const orgListAction = (params) => async dispatch => {
    dispatch({ type: ORGNIZATION_LIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/organisation/list`, params);
        dispatch({ type: ORGNIZATION_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ORGNIZATION_LIST_FAILURE, payload: error.message });
    }
};