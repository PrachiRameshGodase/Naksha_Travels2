
import axiosInstance from "../../Configs/axiosInstance";
import toast from "react-hot-toast";
import { CREATE_PASSENGERM_VISA_ERROR, CREATE_PASSENGERM_VISA_REQUEST, CREATE_PASSENGERM_VISA_SUCCESS, PASSENGERM_VISA_DELETE_ERROR, PASSENGERM_VISA_DELETE_REQUEST, PASSENGERM_VISA_DELETE_SUCCESS } from "../Constants/passengerMVisaConstants";
import { MICEDetailsAction } from "./MICEActions";

 export const CreatePassengerMVisaAction = (queryParams, setShowModal, refreshData) => async (dispatch) => {
    
    dispatch({ type: CREATE_PASSENGERM_VISA_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/visa/create`, queryParams);
        if (response?.data?.success === true) {
            dispatch({ type: CREATE_PASSENGERM_VISA_SUCCESS, payload: response.data });
            toast?.success(response?.data?.message);
             dispatch(MICEDetailsAction(refreshData))
            setShowModal(false); 
        } else {
            dispatch({ type: CREATE_PASSENGERM_VISA_ERROR, payload: response.data?.message });
            toast?.error(response?.data?.message);
          
        }

    } catch (error) {
        dispatch({ type: CREATE_PASSENGERM_VISA_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};

export const PassengerMVisaDeleteActions = (queryParams, Navigate) => async (dispatch) => {
    dispatch({ type: PASSENGERM_VISA_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/mice/passenger/visa/cancle`, queryParams);

        if (response?.data?.message === "MICE Service Visa Cancelled Successfully") {
            // dispatch(PassengerMHotelDetailsAction(queryParams));
            toast.success(response?.data?.message);
            // Navigate("/dashboard/hotels-services");
        } else {
            toast.error(response?.data?.message);
        }
        dispatch({ type: PASSENGERM_VISA_DELETE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PASSENGERM_VISA_DELETE_ERROR, payload: error.message });
        toast.error(error?.message);
    }
};