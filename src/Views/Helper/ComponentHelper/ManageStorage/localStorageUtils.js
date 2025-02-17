// src/utils/localStorageUtils.js

// Set item to localStorage
export const setLocalStorage = (key, value) => {
    try {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

// Get item from localStorage
export const getLocalStorage = (key) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON?.parse(value) : null;
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        return null;
    }
};


// Remove item from localStorage
export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from localStorage:", error);
    }
};

// Clear all localStorage data
export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("Error clearing localStorage:", error);
    }
};

//others get data form local Storage...

// get currency symbol like($)
export const getCurrencySymbol = () => {
    const UserData = getLocalStorage("UserData");
    const activeOrg_details = UserData?.active_organisation;
    return activeOrg_details?.symbol || "$";
};

// get currency value like(USD)
export const getCurrencyValue = () => {
    const UserData = getLocalStorage("UserData");
    const activeOrg_details = UserData?.active_organisation;
    return activeOrg_details?.currency || "USD";
};

// get Active orgnization
export const activeOrg = () => {
    const UserData = getLocalStorage("UserData");
    return UserData?.active_organisation;
}


// get Active orgnization financial year
export const financialYear = () => {
    const UserData = getLocalStorage("FinancialYear");
    return UserData;
}

// get Active orgnization admin
export const isAdmin = () => {
    const UserData = getLocalStorage("UserData");
    const isAdmin = UserData?.is_admin;
    return isAdmin;
}

