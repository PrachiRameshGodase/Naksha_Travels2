import { getCurrencyValue } from "../ComponentHelper/ManageStorage/localStorageUtils";

// currencyConversionUtils.js
export const convertCurrencyWithSymbol = (amount, fetchCurrencyData, moduleCurrency, currencyList) => {
    // const activeOrgCurrencyValue = getCurrencyValue();

    const symbol = currencyList?.find(val => val?.code === moduleCurrency)?.symbol

    // Convert KES to USD or any other currency using exchange rate
    const rate = (amount / fetchCurrencyData?.exchange_rate).toFixed(2);

    return rate == "0" ? `${symbol} 0.00` : rate ? `${symbol} ${rate}` : "";
};

export const convertCurrencyWithPercent = (amount, fetchCurrencyData, moduleCurrency, currencyList) => {
    const activeOrgCurrencyValue = getCurrencyValue();
    const symbol = currencyList?.find(val => val?.code === moduleCurrency)?.symbol

    // If the active organization currency matches the target currency, return the original amount with its symbol
    if (activeOrgCurrencyValue === symbol) {
        return amount ? `${amount} %` : 'Non-Taxable';
    }

    const rate = (amount / fetchCurrencyData?.exchange_rate).toFixed(2);

    return rate ? `${rate} %` : 'Non-Taxable';
}





// export const convertObjectCurrency = (object, fieldsToConvert, exchangeRate) => {
//     const convertedObject = { ...object };

//     fieldsToConvert.forEach(field => {
//         if (convertedObject[field] !== undefined && convertedObject[field] !== null) {
//             // Convert the value using the exchange rate
//             convertedObject[field] = convertCurrency(parseFloat(convertedObject[field]), exchangeRate);
//         }
//     });

//     // Convert nested item fields if needed (like in "items" array)
//     if (Array.isArray(convertedObject?.items)) {
//         convertedObject.items = convertedObject.items.map(item => {
//             const convertedItem = { ...item };

//             fieldsToConvert.forEach(field => {
//                 if (convertedItem[field] !== undefined && convertedItem[field] !== null) {
//                     convertedItem[field] = convertCurrency(parseFloat(convertedItem[field]), exchangeRate);
//                 }
//             });

//             return convertedItem;
//         });
//     }

//     return convertedObject;
// };
