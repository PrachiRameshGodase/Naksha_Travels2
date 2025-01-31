import { getAccountTypes } from '../../Redux/Actions/accountsActions';
import { assistListAction } from '../../Redux/Actions/assistAction';
import { customersList } from '../../Redux/Actions/customerActions';
import { flightListAction } from '../../Redux/Actions/flightActions';
import { fetchAirport } from '../../Redux/Actions/globalActions';
import { hotelListAction, hotelRoomListAction } from '../../Redux/Actions/hotelActions';
import { InsuranceListAction } from '../../Redux/Actions/InsuranceActions';
import { categoryList, itemLists, vendorsLists } from '../../Redux/Actions/listApisActions';
import { visaListAction } from '../../Redux/Actions/visaAction';
import { sendData } from './HelperFunctions';


export const DropdownSearchHealperfunctions = (searchTerm, type, name, dispatch, productType,hotelID) => {

    if (type === "select_item") {
        dispatch(itemLists({ search: searchTerm, ...sendData, ...productType }));
    }
    else if (type === "select_item2") {
        dispatch(flightListAction({ search: searchTerm, ...sendData, ...productType }));
    }

    else if (type === "vendor" || type === "vendor_charges") {
        if (name === "customer_id" || name === "guest_ids") {
            dispatch(customersList({ ...sendData, search: searchTerm }));
        } else if (name === "vendor_id" || name === "passenger_visa_id") {
            dispatch(vendorsLists({ ...sendData, search: searchTerm }));
        }
        else if (name === "room_id") {
            dispatch(hotelRoomListAction({ search: searchTerm, hotel_id:hotelID, ...sendData,}));
        }
        
    }
    else if (type === "countryList" || type==="visa_entry_type" || type==="visa_type_id" || type === "days") {
        dispatch(visaListAction({ search: searchTerm, fy: localStorage.getItem("FinancialYear"), status:1 }));
    }

    else if (type === "categories") {
        dispatch(categoryList({ search: searchTerm, status: "1", fy: localStorage.getItem("FinancialYear"), }));
    }

    else if (type === "account") {
        dispatch(getAccountTypes({ search: searchTerm, fy: localStorage.getItem("FinancialYear"), }));
    }

    else if (type === "hotalList") {
        dispatch(hotelListAction({ search: searchTerm, ...sendData, }));
    }
    else if (type === "airportList2" || type === "meetingType" || type=== "noOfPersons") {
        dispatch(assistListAction({ search: searchTerm, ...sendData, }));
    }
    else if (type === "companyList") {
        dispatch(InsuranceListAction({ search: searchTerm, ...sendData }));
    }
    else if (type === "airportList") {
        dispatch(fetchAirport({ search: searchTerm, }));
    }
};

