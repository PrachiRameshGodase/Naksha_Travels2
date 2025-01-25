import { getCurrencyValue } from "../ComponentHelper/ManageStorage/localStorageUtils";
import { formatDate } from "../DateFormat";

export const getBaseFormData = (overrides = {}, removeKeys = []) => {
    // Base form data structure
    const currency = getCurrencyValue();
    let baseData = {
        id: "",
        warehouse_id: localStorage.getItem('selectedWarehouseId') || '',
        fy: localStorage.getItem('FinancialYear') || 2024,

        customer_id: '',
        customer_name: '',
        customer_note: "",
        customer_type: "",
        display_name: "",
        vendor_id: '',
        vendor_name: '',
        vendor_note: null,

        upload_image: "null",
        phone: null,
        email: "",
        sale_person: '',
        address: "",
        currency: currency,
        payment_terms: "",
        delivery_method: '',
        place_of_supply: "",

        reference_no: "",
        reference: "",

        expiry_date: formatDate(new Date()),
        transaction_date: formatDate(new Date()),
        due_date: formatDate(new Date()),

        terms_and_condition: "",
        tcs: "",

        subtotal: 0,
        total: 0,
        discount: "",
        total_tax: 0,
        total_charges: 0,
        total_gross_amount: 0,

        taxes: [{
            CGST: 0,
            SGST: 0,
            IGST: 0
        }],

        charges: [
            {
                account_id: null,
                amount: 0
            }
        ],

        items: [
            {
                item_id: null,
                unit_id: 0,
                item_name: "",
                tax_name: "",
                hsn_code: "",
                type: "",
                quantity: 1,
                tax_rate: 0,
                tax_amount: 0,
                discount: 0,
                gross_amount: 0,
                final_amount: 0,
                discount_type: 1,
                item_remark: "",
            },
        ],
    };

    // Remove specified keys
    removeKeys.forEach(key => {
        delete baseData[key];
    });

    // Override with custom values
    return { ...baseData, ...overrides };
};
