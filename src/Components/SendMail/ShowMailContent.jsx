import { formatDate3 } from "../../Views/Helper/DateFormat";

export const SubjectContent = ({ detail_api_data }) => {

    const generateSubject = (detail_api_data) => {

        if (detail_api_data?.purchase_order_id) {
            return `Purchase Order from ${(detail_api_data?.vendor?.first_name || "") + " " + (detail_api_data?.vendor?.last_name || "")} (Purchase Order #: ${detail_api_data?.purchase_order_id})`;
        }

        else if (detail_api_data?.quotation_id) {
            return `Quotation from ${(detail_api_data?.customer?.first_name || "") + " " + (detail_api_data?.customer?.last_name || "")} (Quotation #: ${detail_api_data?.quotation_id})`;
        }
        else if (detail_api_data?.sale_order_id) {
            return `Sales Orders from ${(detail_api_data?.customer?.first_name || "") + " " + (detail_api_data?.customer?.last_name || "")} (Sales Orders #: ${detail_api_data?.sale_order_id})`;
        }
        else if (detail_api_data?.credit_note_id) {
            return `Credit Note from ${(detail_api_data?.customer?.first_name || "") + " " + (detail_api_data?.customer?.last_name || "")} (Credit Note #: ${detail_api_data?.credit_note_id})`;
        }
        else if (detail_api_data?.invoice_id) {
            return `Invoice from ${(detail_api_data?.customer?.first_name || "") + " " + (detail_api_data?.customer?.last_name || "")} (Invoice #: ${detail_api_data?.invoice_id})`;
        }
        else if (detail_api_data?.bill_no) {
            return `Bill from ${(detail_api_data?.customer?.first_name || "") + " " + (detail_api_data?.customer?.last_name || "")} (Bill #: ${detail_api_data?.bill_no})`;
        }
    };
    return generateSubject(detail_api_data);
};


export const BodyContent = ({ detail_api_data }) => {
    const generateBody = (detail_api_data) => {
        if (detail_api_data?.purchase_order_id) {
            return `<p>----------------------------------------------------------------------------------------</p><p><br></p><h2>Purchase Order&nbsp;# :&nbsp;${detail_api_data?.purchase_order_id}<br>Total: ${detail_api_data?.total} </h2><p><br></p><p>----------------------------------------------------------------------------------------</p><p><strong>&nbsp;Order Date&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${formatDate3(detail_api_data?.transaction_date)}</p><p>----------------------------------------------------------------------------------------</p><p><br></p><p>Please go through it and confirm the order. We look forward to working with you</p><p><br></p><p><br></p><p>Regards,</p><p><br></p><p>${detail_api_data?.email}</p><p>${(detail_api_data?.vendor?.first_name || "") + " " + (detail_api_data?.vendor?.last_name || "")}</p><p><br></p>`;
            ;
        } else if (detail_api_data?.quotation_id) {
            return `<p>----------------------------------------------------------------------------------------</p><p><br></p><h2>Quotation&nbsp;# :&nbsp;${detail_api_data?.quotation_id}<br>Total: ${detail_api_data?.total} </h2><p><br></p><p>----------------------------------------------------------------------------------------</p><p><strong>&nbsp;Order Date&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${formatDate3(detail_api_data?.transaction_date)}</p><p>----------------------------------------------------------------------------------------</p><p><br></p><p>Please go through it and confirm the order. We look forward to working with you</p><p><br></p><p><br></p><p>Regards,</p><p><br></p><p>${detail_api_data?.email}</p><p>${detail_api_data?.customer?.first_name + " " + detail_api_data?.customer?.last_name}</p><p><br></p>`;
            ;
        }
        else if (detail_api_data?.sale_order_id) {
            return `<p>----------------------------------------------------------------------------------------</p><p><br></p><h2>Sale Order&nbsp;# :&nbsp;${detail_api_data?.sale_order_id}<br>Total: ${detail_api_data?.total} </h2><p><br></p><p>----------------------------------------------------------------------------------------</p><p><strong>&nbsp;Order Date&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${formatDate3(detail_api_data?.transaction_date)}</p><p>----------------------------------------------------------------------------------------</p><p><br></p><p>Please go through it and confirm the order. We look forward to working with you</p><p><br></p><p><br></p><p>Regards,</p><p><br></p><p>${detail_api_data?.email}</p><p>${detail_api_data?.customer?.first_name + " " + detail_api_data?.customer?.last_name}</p><p><br></p>`;

        }
        else if (detail_api_data?.credit_note_id) {
            return `<p>----------------------------------------------------------------------------------------</p><p><br></p><h2>Credit Note&nbsp;# :&nbsp;${detail_api_data?.credit_note_id}<br>Total: ${detail_api_data?.total} </h2><p><br></p><p>----------------------------------------------------------------------------------------</p><p><strong>&nbsp;Order Date&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${formatDate3(detail_api_data?.transaction_date)}</p><p>----------------------------------------------------------------------------------------</p><p><br></p><p>Please go through it and confirm the order. We look forward to working with you</p><p><br></p><p><br></p><p>Regards,</p><p><br></p><p>${detail_api_data?.email}</p><p>${detail_api_data?.customer?.first_name + " " + detail_api_data?.customer?.last_name}</p><p><br></p>`;

        }
        else if (detail_api_data?.invoice_id) {
            return `<p>----------------------------------------------------------------------------------------</p><p><br></p><h2>Invoice&nbsp;# :&nbsp;${detail_api_data?.invoice_id}<br>Total: ${detail_api_data?.total} </h2><p><br></p><p>----------------------------------------------------------------------------------------</p><p><strong>&nbsp;Order Date&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${formatDate3(detail_api_data?.transaction_date)}</p><p>----------------------------------------------------------------------------------------</p><p><br></p><p>Please go through it and confirm the order. We look forward to working with you</p><p><br></p><p><br></p><p>Regards,</p><p><br></p><p>${detail_api_data?.email}</p><p>${detail_api_data?.customer?.first_name + " " + detail_api_data?.customer?.last_name}</p><p><br></p>`;

        }
        else if (detail_api_data?.bill_no) {
            return `<p>----------------------------------------------------------------------------------------</p><p><br></p><h2>Bill&nbsp;# :&nbsp;${detail_api_data?.bill_no}<br>Total: ${detail_api_data?.total} </h2><p><br></p><p>----------------------------------------------------------------------------------------</p><p><strong>&nbsp;Order Date&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${formatDate3(detail_api_data?.transaction_date)}</p><p>----------------------------------------------------------------------------------------</p><p><br></p><p>Please go through it and confirm the order. We look forward to working with you</p><p><br></p><p><br></p><p>Regards,</p><p><br></p><p>${detail_api_data?.email}</p><p>${detail_api_data?.customer?.first_name + " " + detail_api_data?.customer?.last_name}</p><p><br></p>`;

        }
    };

    return generateBody(detail_api_data);
};

