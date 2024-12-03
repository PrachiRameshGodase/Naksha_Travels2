import { getAccountTypes } from '../../Redux/Actions/accountsActions';
import { customersList } from '../../Redux/Actions/customerActions';
import { categoryList, itemLists } from '../../Redux/Actions/listApisActions';
import { sendData } from './HelperFunctions';

export const DropdownSearchHealperfunctions = (searchTerm, type, dispatch, productType) => {
    if (type === "select_item") {
        dispatch(itemLists({ search: searchTerm, ...sendData, ...productType }));
    }
    else if (type === "vendor" || type === "vendor_charges") {
        dispatch(customersList({ ...sendData, search: searchTerm }));
    }

    else if (type === "categories") {
        dispatch(categoryList({ search: searchTerm, status: "1", fy: localStorage.getItem("FinancialYear"), }));
    }
    else if (type === "account") {
        dispatch(getAccountTypes({ search: searchTerm, fy: localStorage.getItem("FinancialYear"), }));
    }
};

