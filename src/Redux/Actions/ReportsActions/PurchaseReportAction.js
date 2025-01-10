import axiosInstance from "../../../Configs/axiosInstance";
import {
    PURCHASE_BY_VENDOR_REQUEST,
    PURCHASE_BY_VENDOR_SUCCESS,
    PURCHASE_BY_VENDOR_FAILURE,
} from "../../Constants/ReportsConstants/PurchaseReportConstant";

export const purchaseByVendorAction = (params) => async dispatch => {
    dispatch({ type: PURCHASE_BY_VENDOR_REQUEST });
    try {
        const response = await axiosInstance.post(`/report/purchase/purchase_by_vendor`, params);
        dispatch({ type: PURCHASE_BY_VENDOR_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: PURCHASE_BY_VENDOR_FAILURE, payload: error.message });
    }
};