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