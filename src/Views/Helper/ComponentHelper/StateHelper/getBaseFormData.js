import { formatDate } from "../DateFormat";
import { getCurrencyValue } from "../ManageStorage/localStorageUtils";

export const getBaseFormData = (overrides = {}, removeKeys = []) => {
    const currency = getCurrencyValue();
    console.log("currency", currency)

    // Base form data structure
    let baseData = {
        id: "",
        warehouse_id: localStorage.getItem('selectedWarehouseId') || '',
        fy: localStorage.getItem('FinancialYear') || 2024,

        customer_id: '',
        customer_name: '',
        customer_note: null,
        customer_type: null,
        display_name: null,
        vendor_id: '',
        vendor_name: '',
        vendor_note: null,

        upload_image: null,
        phone: null,
        email: null,
        sale_person: '',
        address: "",
        currency: "",
        payment_terms: "",
        delivery_method: '',
        place_of_supply: null,

        reference_no: "",
        reference: "",

        expiry_date: formatDate(new Date()),
        transaction_date: formatDate(new Date()),


        terms_and_condition: null,
        tcs: null,

        subtotal: null,
        total: null,
        discount: "",
        total_tax: null,
        total_charges: null,
        total_gross_amount: null,

        taxes: [{
            CGST: null,
            SGST: null,
            IGST: null
        }],

        charges: [
            {
                account_id: null,
                amount: null
            }
        ],

        items: [
            {
                item_id: null,
                unit_id: null,
                item_name: "",
                tax_name: "",
                hsn_code: "",
                type: "",
                quantity: 1,
                tax_rate: null,
                tax_amount: null,
                discount: 0,
                gross_amount: null,
                final_amount: null,
                discount_type: 1,
                item_remark: null,
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
