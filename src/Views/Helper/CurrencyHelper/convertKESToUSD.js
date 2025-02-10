import { getCurrencyValue } from "../ComponentHelper/ManageStorage/localStorageUtils";

// currencyConversionUtils.js
export const convertCurrencyWithSymbol = (amount, fetchCurrencyData) => {

    //fetch the active org currency code
    const orgCurrencyCode = getCurrencyValue()

    // Convert the currency using exchange rate
    const rate = ((parseFloat(amount) / parseInt(fetchCurrencyData?.exchange_rate))).toFixed(2);

    // check if the org currency and module currency is same then currency is not converted...
    const noCurrencyConvert = fetchCurrencyData?.code === orgCurrencyCode;

    console.log("rate ? `${fetchCurrencyData?.symbol} ${rate}", fetchCurrencyData?.symbol, rate)

    if (noCurrencyConvert) {
        return amount == "0" ? `${fetchCurrencyData?.symbol} 0.00` : amount ? `${fetchCurrencyData?.symbol} ${amount}` : "";

    } else { // return converted currrency rate if the org currency and module currency is not equal
        return rate == "0" ? `${fetchCurrencyData?.symbol} 0.00` : rate ? `${fetchCurrencyData?.symbol} ${rate}` : "";
    }
};
