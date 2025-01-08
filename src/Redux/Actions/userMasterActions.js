
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_USER_MASTER_ERROR, CREATE_USER_MASTER_REQUEST, CREATE_USER_MASTER_SUCCESS, DELETE_USER_MASTER_ERROR, DELETE_USER_MASTER_REQUEST, DELETE_USER_MASTER_SUCCESS, GET_USER_MASTER_ERROR, GET_USER_MASTER_REQUEST, GET_USER_MASTER_SUCCESS } from "../Constants/userMasterConstant";

 export const CreateUserMasterAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_USER_MASTER_REQUEST });
    try {
        const response = await axiosInstance.post(`/user/master/createupdate`, queryParams);
        dispatch({ type: CREATE_USER_MASTER_REQUEST, payload: response.data });

        if (response?.data?.message === "Master Recorded Successfully") {
            toast?.success(response?.data?.message);
            
        } else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_USER_MASTER_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_USER_MASTER_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const UserMasterListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_USER_MASTER_REQUEST });
    try {
        const response = await axiosInstance.post(`/user/master/fetch/required`, queryParams);

        dispatch({ type: GET_USER_MASTER_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_USER_MASTER_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const userMasterDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: DELETE_USER_MASTER_REQUEST });
    try {
        const response = await axiosInstance.post(`/user/master/delete`, queryParams);

        if (response?.data?.message === "MICE Service Visa Cancelled Successfully") {
            // dispatch(PassengerMHotelDetailsAction(queryParams));
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: DELETE_USER_MASTER_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: DELETE_USER_MASTER_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};