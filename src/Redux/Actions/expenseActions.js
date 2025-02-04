import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';

import {
    EXPENSE_LIST_REQUEST,
    EXPENSE_LIST_SUCCESS,
    EXPENSE_LIST_ERROR,

    EXPENSE_DETAIL_REQUEST,
    EXPENSE_DETAIL_SUCCESS,
    EXPENSE_DETAIL_ERROR,

    EXPENSE_CREATE_REQUEST,
    EXPENSE_CREATE_SUCCESS,
    EXPENSE_CREATE_ERROR,

    EXPENSE_DELETE_REQUEST,
    EXPENSE_DELETE_SUCCESS,
    EXPENSE_DELETE_ERROR,

    EXPENSE_STATUS_REQUEST,
    EXPENSE_STATUS_SUCCESS,
    EXPENSE_STATUS_ERROR,
} from '../Constants/expenseConstants.js';

import { sendData } from '../../Views/Helper/HelperFunctions.js';

export const expenseLists = (queryParams, setAllListValue) => async (dispatch) => {
    localStorage.setItem("expensePayload", JSON.stringify(queryParams));
    dispatch({ type: EXPENSE_LIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/expense/list`,
            queryParams
        );

        dispatch({ type: EXPENSE_LIST_SUCCESS, payload: response.data });
        if (setAllListValue) {
            setAllListValue(response?.data)
        }

    } catch (error) {
        dispatch({ type: EXPENSE_LIST_ERROR, payload: error.message });
    }
};

export const createExpenses = (queryParams, Navigate) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: EXPENSE_CREATE_REQUEST });
    try {
        const response = await axiosInstance.post(`/expense/create/update`,
            queryParams
        );

        if (response?.data?.Expense === "Expense Created Successfully") {
            toast.success(response?.data?.Expense);
            Navigate("/dashboard/expenses");
        } else if (response?.data?.Expense === "Expense Updated Successfully") {
            toast.success(response?.data?.Expense);
            Navigate("/dashboard/expenses");
        }

        else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: EXPENSE_CREATE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: EXPENSE_CREATE_ERROR, payload: error.message });
    }
};

export const expensesStatus = (queryParams, Navigate) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: EXPENSE_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/expense/status`,
            queryParams
        );

        dispatch({ type: EXPENSE_STATUS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: EXPENSE_STATUS_ERROR, payload: error.message });
    }
};

export const deleteExpenses = (queryParams, Navigate) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: EXPENSE_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/expense/delete`,
            queryParams
        );
        if (response?.data?.message === "Expense deleted Successfully") {
            toast.success(response?.data?.message);
            Navigate("/dashboard/expenses");
        } else {
            toast.error(response?.data?.Expense);
        }
        dispatch({ type: EXPENSE_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: EXPENSE_DELETE_ERROR, payload: error.message });
    }
};

export const expensesDetails = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: EXPENSE_DETAIL_REQUEST });
    try {
        const response = await axiosInstance.post(`/expense/details`,
            queryParams
        );
        // if (response?.data?.message === "Expense deleted Successfully") {
        //     toast.success(response?.data?.message);
        //     Navigate("/dashboard/expenses");
        // } else {
        //     toast.error(response?.data?.Expense);
        // }
        dispatch({ type: EXPENSE_DETAIL_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: EXPENSE_DETAIL_ERROR, payload: error.message });
    }
};