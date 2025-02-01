export const productTypeItemAction = (type) => {
    return {
        type: "PRODUCT_TYPE_ITEM",
        payload: type,
    };
};

export const isStateIdEqualAction = (isId) => {
    return {
        type: "STATE_ID_EQUAL",
        payload: isId,
    };
};

export const manageStateAction = (state, status) => {
    return {
        type: "STATE_DATA",
        payload: { state, status }, // Specify which popup and its new status
    };
};