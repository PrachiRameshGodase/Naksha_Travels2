const initialValue = {}
const isIdVal = false;

export const productTypeReducer = (state = initialValue, action) => {

    switch (action.type) {
        case "PRODUCT_TYPE_ITEM":
            return { ...state, type: action.payload };
        default:
            return state;
    }
}

export const isIdEqualReducer = (state = isIdVal, action) => {
    switch (action.type) {
        case "STATE_ID_EQUAL":
            return { ...state, isId: action.payload };
        default:
            return state;
    }
}
