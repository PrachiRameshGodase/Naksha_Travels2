import { getAccountTypes } from '../../Redux/Actions/accountsActions';
import { customersList } from '../../Redux/Actions/customerActions';
import { flightListAction } from '../../Redux/Actions/flightActions';
import { hotelListAction } from '../../Redux/Actions/hotelActions';
import { categoryList, itemLists, vendorsLists } from '../../Redux/Actions/listApisActions';
import { manageStateAction } from '../../Redux/Actions/ManageStateActions/manageStateData';
import { visaListAction } from '../../Redux/Actions/visaAction';
import { sendData } from './HelperFunctions';


export const DropdownSearchHealperfunctions = (searchTerm, type, name, dispatch, productType) => {
    console.log("type", type)

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

    else if (type === "countryList" || type === "visa_entry_type" || type === "visa_type_id") {

        dispatch(visaListAction({ search: searchTerm, status: "1", fy: localStorage.getItem("FinancialYear"), }))
            .then((res) => {
                if (type === "visa_type_id") {
                    dispatch(manageStateAction("visa_type", res))
                }
                if (type === "visa_entry_type") {
                    dispatch(manageStateAction("visa_entry_type", res))
                }
            })

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

