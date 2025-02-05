import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    CREATE_JOURNAL_REQUEST,
    CREATE_JOURNAL_SUCCESS,
    CREATE_JOURNAL_ERROR,

    GET_ACCOUNT_TYPE_REQUEST,
    GET_ACCOUNT_TYPE_SUCCESS,
    GET_ACCOUNT_TYPE_ERROR,

    CREATE_ACCOUNT_TYPE_ERROR,
    CREATE_ACCOUNT_TYPE_REQUEST,
    CREATE_ACCOUNT_TYPE_SUCCESS,

    ACCOUNT_STATUS_REQUEST,
    ACCOUNT_STATUS_SUCCESS,
    ACCOUNT_STATUS_ERROR,

    ACCOUNT_DELETE_REQUEST,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_ERROR,

    ACCOUNT_DETAIL_REQUEST,
    ACCOUNT_DETAIL_SUCCESS,
    ACCOUNT_DETAIL_ERROR,
} from '../Constants/accountConstants';
import { sendData } from '../../Views/Helper/HelperFunctions';
import { accountLists } from './listApisActions';
import { financialYear } from '../../Views/Helper/ComponentHelper/ManageStorage/localStorageUtils';

export const createJournals = (queryParams) => async (dispatch) => {
    dispatch({ type: CREATE_JOURNAL_REQUEST });
    try {
        const response = await axiosInstance.post(`/journal/create/update`,
            queryParams
        );
        if (response?.data?.message === 'Journal Created Successfully') {
            toast.success(response?.data?.message)
        } else if (response?.data?.message === "Journal Updated Successfully") {
            toast.success(response?.data?.message)

        } else {
            toast.error(response?.data?.message)
        }


        dispatch({ type: CREATE_JOURNAL_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_JOURNAL_ERROR, payload: error.message });

    }
};

export const getAccountTypes = (queryParams) => async (dispatch) => {
    dispatch({ type: GET_ACCOUNT_TYPE_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/type/list`,
            queryParams
        );
        dispatch({ type: GET_ACCOUNT_TYPE_SUCCESS, payload: response.data });
        // console.log("account type", response)
    } catch (error) {
        dispatch({ type: GET_ACCOUNT_TYPE_ERROR, payload: error.message });

    }
};

export const createAccounts = (queryParams, isEdit, itemId, Navigate) => async (dispatch) => {
    dispatch({ type: CREATE_ACCOUNT_TYPE_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/create/update`,
            queryParams
        );
        dispatch({ type: CREATE_ACCOUNT_TYPE_SUCCESS, payload: response.data });
        dispatch(accountLists(sendData));//for update list when data is fetched
        if (response?.data?.message === "Account Added Successfully") {
            toast.success(response?.data?.message);
            Navigate("/dashboard/account-chart")
        } else if (response?.data?.message === "Account Updated Successfully") {
            toast.success(response?.data?.message);
            Navigate("/dashboard/account-chart")
        } else {
            toast.error(response?.data?.message);

        }

    } catch (error) {
        dispatch({ type: CREATE_ACCOUNT_TYPE_ERROR, payload: error.message });
        toast.error("Error while creating account")

    }
};

export const accountStatus = (queryParams) => async (dispatch) => {
    console.log("queryParams", queryParams)
    dispatch({ type: ACCOUNT_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/status`,
            queryParams
        );
        dispatch({ type: ACCOUNT_STATUS_SUCCESS, payload: response.data });

        if (response?.data?.message === "Status Updated successfully.") {
            dispatch(accountLists(sendData));//for update list when data is fetched
            const sendData = {
                id: queryParams?.id,
                fy: financialYear(),
            }
            // toast.success(response?.data?.message);
            dispatch(accountDetail(sendData, null, ""));
        } else {
            toast.error(response?.data?.message);
        }

    } catch (error) {
        dispatch({ type: ACCOUNT_STATUS_ERROR, payload: error.message });
        toast.error("Error while creating account")

    }
};

export const accountDelete = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: ACCOUNT_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/delete`,
            queryParams
        );
        dispatch({ type: ACCOUNT_DELETE_SUCCESS, payload: response.data });

        if (response?.data?.message === "Account Deleted Successfully") {
            dispatch(accountLists(sendData));//for update list when data is fetched
            Navigate("/dashboard/account-chart")
            toast.success(response?.data?.message);
        } else {
            toast.error(response?.data?.message);
        }

    } catch (error) {
        dispatch({ type: ACCOUNT_DELETE_ERROR, payload: error.message });
        toast.error("Error while creating account")
    }
};

export const accountDetail = (sendData, Navigate, details) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: ACCOUNT_DETAIL_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/details`,
            sendData
        );


        if (response?.data?.message === "Accounts Transactions fetched Successfully") {

            localStorage.setItem("editAccount", JSON.stringify(response?.data));

            if (details) {
                Navigate(`/dashboard/account-details?id=${sendData.id}`);
            } else {
                const queryParams = new URLSearchParams();
                queryParams.set("id", response?.data?.accounts?.id);
                queryParams.set("edit", true);
                Navigate(`/dashboard/create-account-chart?${queryParams.toString()}`);
            }
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: ACCOUNT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ACCOUNT_DETAIL_ERROR, payload: error.message });
        toast.error("Error while creating account")

    }
};
