import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoGenerateIdList } from "../../Redux/Actions/globalActions";
import { isPartiallyInViewport } from "./is_scroll_focus";

const getLocalStorageData = localStorage?.getItem("UserData");
const UserData = JSON.parse(getLocalStorageData);

export const showRateWithPercent = (val) => {
    return val ? `${val} %` : 'Non-Taxable';
}


export const sendData = {
    fy: 2024,
    noofrec: 10,
    active: 1
}

export const activeOrg_details = UserData?.active_organisation;
export const currencySymbol = activeOrg_details?.symbol ? activeOrg_details?.symbol : "$";
export const getCurrencyFormData = activeOrg_details?.currency ? activeOrg_details?.currency : "INR";
export const orgnizationEmail = activeOrg_details?.email ? activeOrg_details?.email : "";

export const showAmountWithCurrencySymbol = (val) => {
    return val == "0" ? `${currencySymbol} 0.00` : val ? `${currencySymbol} ${val} ` : "";
}

export const showAmountWithCurrencySymbolWithPoints = (val) => {
    return val ? `${currencySymbol} ${val}.00` : '';
}

export const ShowMasterData = (type) => {
    const masterData = useSelector(state => state?.masterData?.masterData);
    const filteredData = masterData?.filter(item => item.type == type);
    return filteredData || [];
};

export const ShowAutoGenerateId = (module, showField) => {
    const dispatch = useDispatch();
    const moduleIdList = useSelector(state => state?.autoIdList);
    const showMainGenerateIdData = moduleIdList?.data?.sequence[0];

    useEffect(() => {
        dispatch(autoGenerateIdList({ module: module }))
    }, [dispatch]);

    return showMainGenerateIdData || [];
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







