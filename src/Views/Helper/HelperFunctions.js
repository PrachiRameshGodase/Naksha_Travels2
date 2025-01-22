import { useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { autoGenerateIdList } from "../../Redux/Actions/globalActions";
import { isPartiallyInViewport } from "./is_scroll_focus";
import { getCurrencyValue, getLocalStorage } from "./ComponentHelper/ManageLocalStorage/localStorageUtils";
import useFetchApiData from "./ComponentHelper/useFetchApiData";

// const getLocalStorageData = localStorage?.getItem("UserData");
const UserData = getLocalStorage("UserData");
// const UserData = JSON.parse(getLocalStorageData);

export const showRateWithPercent = (val) => {
    return val ? `${val} %` : 'Non-Taxable';
}


export const sendData = {
    fy: 2024,
    noofrec: 10,
    active: 1, status: 1
}
export const sendData2 = {
    fy: 2024,
    noofrec: 10,
    active: 1
}
//this is only for accounts
export const sendData3 = {
    fy: 2024,
    // noofrec: 10,
    active: 1, status: 1
}
export const activeOrg_details = UserData?.active_organisation;
export const currencySymbol = activeOrg_details?.symbol ? activeOrg_details?.symbol : "$";
export const orgnizationEmail = activeOrg_details?.email ? activeOrg_details?.email : "";

console.log("currencySymbol", currencySymbol)
export const showAmountWithCurrencySymbol = (val) => {
    return val == "0" ? `${currencySymbol} 0.00` : val ? `${currencySymbol} ${val} ` : "";
}

// console.log("activeOrg_details", activeOrg_details)

export const showAmountWithCurrencySymbolWithPoints = (val) => {
    return val ? `${currencySymbol} ${val}.00` : '';
}

export const ShowMasterData = (type) => {
    const masterData = useSelector(state => state?.masterData?.masterData);
    const filteredData = masterData?.filter(item => item.type == type);
    return filteredData || [];
};

export const ShowUserMasterData = (type) => {
    const userMasterData = useSelector(state => state?.userMasterList?.data);

    const filteredData = userMasterData?.filter(item => item.type == type);
    return filteredData || [];
};

export const formatString = (str) => {
    return str
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

export const ShowAutoGenerateId = (module) => {
    const moduleIdList = useSelector(state => state?.autoIdList);
    const showMainGenerateIdData = moduleIdList?.data?.sequence[0];

    const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
        module: module
    }), []);
    useFetchApiData(autoGenerateIdList, payloadGenerator, []);
    return showMainGenerateIdData || "";
};

export const activeCustomerData = (type) => {
    const cusList = useSelector((state) => state?.customerList);
    return cusList;
};

export const showRealatedText = (section, val1, showtext1, val2, showtext2, showtext3) => {
    const showText = section == val1 ? showtext1 : section == val2 ? showtext2 : showtext3
    return showText;
}

// utils/useDebounce.js

export const useDebounceSearch = (callback, delay) => {
    const debounceTimeout = useRef(null);

    const debouncedFunction = (...args) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    useEffect(() => {
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, []);

    return debouncedFunction;
};

export const handleDropdownError = (isSelected, dropdownRef) => {
    if (!isSelected) {
        if (!isPartiallyInViewport(dropdownRef.current)) {
            dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(() => {
            dropdownRef.current.focus();
        }, 500);
        return true;
    }
    return false;
};


export const stringifyJSON = (data) => {
    try {
        return JSON.stringify(data);
    } catch (error) {
        console.error("Error stringifying JSON:", error);
        return null;
    }
};


export const parseJSONofString = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
};


//it does not seen the 0 value..
export const preventZeroVal = (val) => {
    return val == "0" ? "" : val
}

// show department
// utils.js

export const showDeparmentLabels = (department, mainDeparmentVal) => {
    if (typeof department !== "string") return "";

    try {
        const depArray = JSON.parse(department);
        const labels = depArray
            .map((depId) => {
                const depObj = mainDeparmentVal.find((val) => val.labelid == depId);
                return depObj ? depObj.label : "";
            })
            .filter((label) => label !== "");

        return labels.join(", ");
    } catch (e) {
        console.error("Invalid JSON string in department:", department);
        return "";
    }
};

export function getDateStatus(createdDate, expiryDate) {
    const now = new Date();
    const created = new Date(createdDate);
    const expiry = new Date(expiryDate);

    const totalDays = (expiry - created) / (1000 * 60 * 60 * 24);

    const passedDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));

    const leftDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    const thirtyPercentDays = Math.floor(totalDays * 0.3);

    if (passedDays <= thirtyPercentDays) {
        return "Sent";
    } else if (leftDays > 1) {
        return `Due In ${leftDays} Days`;
    } else if (leftDays == 1) {
        return "Expires Tomorrow";
    } else if (leftDays == 0) {
        return "Expires Today";
    } else {
        return "Expired";
    }
}

export function getDateStatus1(createdDate, expiryDate) {
    const now = new Date();
    const created = new Date(createdDate);
    const expiry = new Date(expiryDate);

    const totalDays = (expiry - created) / (1000 * 60 * 60 * 24);

    const passedDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));

    const leftDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    const thirtyPercentDays = Math.floor(totalDays * 0.3);
    if (passedDays <= thirtyPercentDays) {
        return "Approved";
    } else if (leftDays > 1) {
        return `Due In ${leftDays} Days`;
    } else if (leftDays == 1) {
        return `Due In Tomorrow`;
    } else if (leftDays == 0) {
        return `Due In Today`;
    } else if (leftDays < 0) {
        return `Overdue by ${-leftDays} Days`;
    }
}


export const validateItems = (items) => {
    const errors = [];

    items.forEach((item, index) => {
        const itemErrors = {};
        if (!item?.item_name) itemErrors.item_name = "Please Select/type An Item or select Services";
        // if (!item?.type) itemErrors.type = "Please Select Type";
        if (!item?.rate || item.rate <= 0) itemErrors.rate = "Please Fill the Price";
        // if (!item?.tax_rate) itemErrors.tax_rate = "Please Select Tax Rate";
        // if (!item?.unit_id) itemErrors.unit_id = "Please Select An Unit";

        if (Object.keys(itemErrors).length > 0) {
            errors[index] = itemErrors;
        }

    });

    return errors;
};








