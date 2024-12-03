import { CREATE_MASTER_SUCCESS,
    CREATE_MASTER_REQUEST,
    CREATE_MASTER_ERROR,

    GET_MASTER_SUCCESS,
    GET_MASTER_REQUEST,
    GET_MASTER_ERROR

 } from "../Constants/masterConstant";
 import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";

 export const CreateMasterAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_MASTER_REQUEST });
    try {
        const response = await axiosInstance.post(`/master/createupdate`, queryParams);
        dispatch({ type: CREATE_MASTER_REQUEST, payload: response.data });

        if (response?.data?.message === "Master Recorded Successfully") {
            toast?.success(response?.data?.message);
            
        } else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_MASTER_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_MASTER_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const masterListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_MASTER_REQUEST });
    try {
        const response = await axiosInstance.post(`/master/fetch/required`, queryParams);

        dispatch({ type: GET_MASTER_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_MASTER_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};