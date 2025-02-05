import { billStatus } from "../../../Redux/Actions/billActions";
import { invoicesStatus } from "../../../Redux/Actions/invoiceActions";
import { CreditNotesStatus, debitNotesStatus } from "../../../Redux/Actions/notesActions";
import { purchasesStatus } from "../../../Redux/Actions/purchasesActions";
import { quotationStatus } from "../../../Redux/Actions/quotationActions";
import { saleOrderStatus } from "../../../Redux/Actions/saleOrderActions";


export const convertStatus = (dispatch, section, navigate, itemId, convert, response, quotationData) => {
    // quotation to sale-order show sale-ordered status
    if (section === "sale-order" && convert === "quotationToSale") {
        dispatch(quotationStatus({ id: itemId, status: "7" }, null));
        navigate(`/dashboard/sales-orders`);
    }

    // sent and approve quotation to invoice approval show Invoiced status
    if (section === "invoices" && convert === "quotationToInvoice" && response) {
        dispatch(quotationStatus({ id: itemId, status: "4" }, null));//status shown invoiced in quotaion...
        dispatch(invoicesStatus({ id: response?.data?.transaction?.id, status: "3" }, null, null));//status shown pending in invoice...
        navigate(`/dashboard/${section}`);
    }

    // Sales Orders to invoice show Invoiced status
    if (section === "invoices" && convert === "saleToInvoice" && response) {
        dispatch(saleOrderStatus({ id: itemId, status: "4" }, null));
        dispatch(invoicesStatus({ id: response?.data?.transaction?.id, status: "3" }, null, null));

        const tracking_details = quotationData?.tracking_details
        const parshTracking_details = JSON?.parse(tracking_details)

        if (parshTracking_details?.module_data?.module === "quotationToSale") {
            dispatch(quotationStatus({ id: parshTracking_details?.module_data?.id, status: "4" }, null));//status shown pending in invoice
        }

        navigate(`/dashboard/${section}`);
    }

    // purchase order to bill show bill status
    if (section === "bills" && convert === "purchase_to_bill") {
        dispatch(purchasesStatus({ id: itemId, status: "4" }, null));//purchase order become billed status...
    }
    if (section === "grn" && convert === "purchase_to_grn") {
        dispatch(purchasesStatus({ id: itemId, status: "3" }, null));//purchase order become Transfer to grn status...
        // dispatch(GRNstatusActions({ id: itemId, status: "3" }, null));
    }

    if (section === "grn" && convert === "grn_to_bill") {
        dispatch(purchasesStatus({ id: itemId, status: "3" }, null));//purchase order become Transfer to grn status...
    }
    if (section === "payment_rec" && convert === "toPayment") {
        dispatch(invoicesStatus({ id: itemId, status: "5" }, null));//paid status(invoice) when convert invoice to payment receive...
        navigate("/dashboard/payment-recieved")
    }

    if (section === "payment_made" && convert === "bill_to_payment") {
        dispatch(billStatus({ id: itemId, status: "5" }, null));//paid status(bill) when convert bill to payment made...
    }

    if (section === "credit" && convert === "invoiceToCredit" && response) {
        dispatch(CreditNotesStatus({ id: response?.data?.data?.id, status: "4" }));//close status in credit note...
        dispatch(invoicesStatus({ id: itemId, status: "5" }, null));//paid status(invoice) when convert invoice to credit note...
        navigate("/dashboard/credit-notes")
    }

    // bill to debit note
    if (section === "debit_note" && convert === "bill_to_debit" && response) {
        dispatch(debitNotesStatus({ id: response?.data?.data?.id, status: "4" }));//close status in debit note...
        dispatch(billStatus({ id: itemId, status: "5" }, null));;//paid status(bill) when convert bill to payment made...
    }

};