// currencyConversionUtils.js
export const convertCurrency = (amount, exchangeRate) => {
    // Convert KES to USD or any other currency by dividing by exchange rate
    return (amount / exchangeRate).toFixed(2); // Round to 2 decimals
};

export const convertObjectCurrency = (object, fieldsToConvert, exchangeRate) => {
    const convertedObject = { ...object };

    fieldsToConvert.forEach(field => {
        if (convertedObject[field] !== undefined && convertedObject[field] !== null) {
            // Convert the value using the exchange rate
            convertedObject[field] = convertCurrency(parseFloat(convertedObject[field]), exchangeRate);
        }
    });

    // Convert nested item fields if needed (like in "items" array)
    if (Array.isArray(convertedObject?.items)) {
        convertedObject.items = convertedObject.items.map(item => {
            const convertedItem = { ...item };

            fieldsToConvert.forEach(field => {
                if (convertedItem[field] !== undefined && convertedItem[field] !== null) {
                    convertedItem[field] = convertCurrency(parseFloat(convertedItem[field]), exchangeRate);
                }
            });

            return convertedItem;
        });
    }

    return convertedObject;
};
