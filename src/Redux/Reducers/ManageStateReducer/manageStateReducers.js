const initialValue = {}
const isIdVal = false;

const initialState = {
    visa_entry_type: [],
    visa_type: [],
    // Add more popups as needed
};

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


export const manageState = (state = initialState, action) => {
    switch (action.type) {

        case "STATE_DATA":
            return { ...state, [action.payload.state]: action.payload.status };

        default:
            return state;
    }
};
