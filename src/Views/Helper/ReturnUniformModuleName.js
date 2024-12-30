// Common function to transform module names
export const returnUniformModuleName = (module) => {
    switch (module) {
        case "sale_order":
            return "Sale Order";
        case "delivery_challan":
            return "Delivery Challan";
        case "quotation":
            return "Quotation";
        case "invoice":
            return "Invoice";
        case "credit_note":
            return "Credit Note";
        case "payment_receipt":
            return "Payment Receipt";
        case "purchase_order":
            return "Purchase Order";
        case "debit_note":
            return "Debit Note";
        case "payment_made":
            return "Payment Made";
        case "expenses":
            return "Expenses";
        case "grn":
            return "GRN";
        case "accounts":
            return "Accounts";
        case "journal":
            return "Journal";
        case "bill":
            return "Bill";
        case "production_order":
            return "Production Order";
        case "workstation":
            return "Workstation";
        case "requisition":
            return "Requisition";
        case "machinery":
            return "Machinery";
        case "bill_of_material":
            return "Bill Of Material";
        case "batches":
            return "Batches";
        case "production":
            return "Production";
        case "material_request":
            return "Material Request";
        case "quality_check":
            return "Quality Check";
        case "qualityCheck":
            return "Material Quality Check";
        case "dsr":
            return "DSR";
        default:
            return module ? module.replace(/_/g, " ").replace(/(^|\s)\S/g, (letter) => letter.toUpperCase()) : "";
    }
};


