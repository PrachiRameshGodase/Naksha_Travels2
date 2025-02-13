import { getCurrencySymbol } from "../ComponentHelper/ManageStorage/localStorageUtils";

// currencyConversionUtils.js
export const convertCurrencyWithSymbol = (amount, fetchCurrencyData) => {
    //fetch the active org currency code
    const orgCurrencyCode = getCurrencySymbol();

    // Convert the currency using exchange rate
    const exchangeRate = parseFloat(fetchCurrencyData?.exchange_rate);
    // console.log("fetch exchangeRate", exchangeRate)

    // Ensure exchangeRate is a valid, non-zero number
    const rate = exchangeRate && exchangeRate !== 0 ? (parseFloat(amount) / exchangeRate).toFixed(2) : "N/A"; // or any fallback value like "0.00"

    // check if the org currency and module currency is same then currency is not converted...
    // const noCurrencyConvert = fetchCurrencyData?.code === orgCurrencyCode;

    if (!fetchCurrencyData) {
        return amount == "0" ? `${orgCurrencyCode} 0.00` : amount ? `${orgCurrencyCode} ${amount}` : "";
    } else { // return converted currrency rate if the org currency and module currency is not equal
        return rate == "0" ? `${fetchCurrencyData?.symbol} 0.00` : rate ? `${fetchCurrencyData?.symbol} ${rate}` : "";
    }

};
