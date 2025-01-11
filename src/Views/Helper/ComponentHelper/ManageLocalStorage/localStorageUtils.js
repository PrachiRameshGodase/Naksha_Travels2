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
        return value ? JSON.parse(value) : null;
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
