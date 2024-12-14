
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_TOURPACKAGE_ERROR, CREATE_TOURPACKAGE_REQUEST, CREATE_TOURPACKAGE_SUCCESS, GET_TOURPACKAGE_ERROR, GET_TOURPACKAGE_REQUEST, GET_TOURPACKAGE_SUCCESS, TOURPACKAGE_DELETE_ERROR, TOURPACKAGE_DELETE_REQUEST, TOURPACKAGE_DELETE_SUCCESS, TOURPACKAGE_DETAIL_ERROR, TOURPACKAGE_DETAIL_REQUEST, TOURPACKAGE_DETAIL_SUCCESS, TOURPACKAGE_STATUS_ERROR, TOURPACKAGE_STATUS_REQUEST, TOURPACKAGE_STATUS_SUCCESS } from "../Constants/tourPackageConstant";

 export const CreateTourPackageAction = (queryParams, Navigate, isEdit, itemId) => async (dispatch) => {
    dispatch({ type: CREATE_TOURPACKAGE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/tourpackage/create/update`, queryParams);
        dispatch({ type:CREATE_TOURPACKAGE_REQUEST , payload: response.data });

        if (response?.data?.message === "Tour Package Added Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/tour-package-services')
            
        } 
        else  if (response?.data?.message === "Tour Package Updated Successfully") {
            toast?.success(response?.data?.message);
            Navigate('/dashboard/tour-package-services')
            
        } 
        else {
            toast?.error(response?.data?.message);
        }

        dispatch({ type: CREATE_TOURPACKAGE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_TOURPACKAGE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};


export const tourPackageListAction = (queryParams, setAllListValue) => async (dispatch) => {
    dispatch({ type: GET_TOURPACKAGE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/tourpackage/list`, queryParams);

        dispatch({ type: GET_TOURPACKAGE_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: GET_TOURPACKAGE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const tourPackageDetailsAction = (queryParams, setDetail_api_data) => async (dispatch) => {
    try {
        dispatch({ type: TOURPACKAGE_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/service/tourpackage/details',
            queryParams
        );

        if (data?.quotation && setDetail_api_data) {
            setDetail_api_data(data?.quotation)
        }

        dispatch({
            type: TOURPACKAGE_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: TOURPACKAGE_DETAIL_ERROR, payload: error.message });
    }
};

export const tourPackagestatusActions = (queryParams, setCallApi, billData, autoId, tracking_details, Navigate) => async (dispatch) => {
    dispatch({ type: TOURPACKAGE_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/tourpackage/status`, queryParams);
        dispatch(tourPackageListAction(queryParams));//update list then data is change
        if (response?.data?.message === "Tour Package Updated Successfully") {
            toast.success(response?.data?.message);
            setCallApi((preState) => !preState);

        } 
      
        dispatch({ type: TOURPACKAGE_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: TOURPACKAGE_STATUS_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const tourPackagedeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: TOURPACKAGE_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/service/tourpackage/delete`, queryParams);

        if (response?.data?.message === "Tour Package Deleted Successfully") {
            dispatch(tourPackageListAction(queryParams));//update list then data is change
            toast.success(response?.data?.message);
            Navigate("/dashboard/tour-package-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: TOURPACKAGE_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: TOURPACKAGE_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};