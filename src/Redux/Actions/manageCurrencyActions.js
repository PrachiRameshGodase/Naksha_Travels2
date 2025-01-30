import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance.js';

import {
    CURRENCY_RATE_REQUEST,
    CURRENCY_RATE_SUCCESS,
    CURRENCY_RATE_ERROR,

    CURRENCY_RATE_CREATE_REQUEST,
    CURRENCY_RATE_CREATE_SUCCESS,
    CURRENCY_RATE_CREATE_ERROR,
} from '../Constants/manageCurrencyContants.js';

export const currencyRateListAction = (queryParams) => async (dispatch) => {
    dispatch({ type: CURRENCY_RATE_REQUEST });
    try {
        const response = await axiosInstance.post(`/currency/rate/list/datewise`,
            queryParams
        );

        dispatch({ type: CURRENCY_RATE_SUCCESS, payload: response.data });
        // console.log("resssssssssss", response)

        return response?.data;
    } catch (error) {
        dispatch({ type: CURRENCY_RATE_ERROR, payload: error.message });
    }
};

export const currencyRateCreateAction = (queryParams) => async (dispatch) => {
    dispatch({ type: CURRENCY_RATE_CREATE_REQUEST });
    try {
        const response = await axiosInstance.post(`/currency/rate/create/update`,
            queryParams
        );

        if (response?.data?.success === false) {
            toast?.error(response?.data?.message);
        } else {
            toast?.success(response?.data?.message)
        }
        dispatch({ type: CURRENCY_RATE_CREATE_SUCCESS, payload: response.data });
        return response

    } catch (error) {
        dispatch({ type: CURRENCY_RATE_CREATE_ERROR, payload: error.message });
        console.log("error", error);
    }
};