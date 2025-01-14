import { getAccountTypes } from '../../Redux/Actions/accountsActions';
import { customersList } from '../../Redux/Actions/customerActions';
import { flightListAction } from '../../Redux/Actions/flightActions';
import { hotelListAction } from '../../Redux/Actions/hotelActions';
import { categoryList, itemLists, vendorsLists } from '../../Redux/Actions/listApisActions';
import { sendData } from './HelperFunctions';


export const DropdownSearchHealperfunctions = (searchTerm, type, name, dispatch, productType) => {

    if (type === "select_item") {
        dispatch(itemLists({ search: searchTerm, ...sendData, ...productType }));
    }
    else if (type === "select_item2") {
        dispatch(flightListAction({ search: searchTerm, ...sendData, ...productType }));
    }

    else if (type === "vendor" || type === "vendor_charges") {
        if (name === "customer_id" || name === "guest_ids") {
            dispatch(customersList({ ...sendData, search: searchTerm }));
        } else if (name === "vendor_id") {
            dispatch(vendorsLists({ ...sendData, search: searchTerm }));
        }
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
};

