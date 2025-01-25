import { useState, useEffect } from "react";
import { parsePurchaseDetails } from "./parsePurchaseDetails";
import { getBaseFormData } from "../getBaseFormData";
import { stringifyJSON, validateItems } from "../../HelperFunctions";

//Common component for state management
export const useEditPurchaseForm = (initialOverrides = {}, removeKeys = [], detailData, itemId, isEdit, convert) => {

    const [formData, setFormData] = useState(getBaseFormData(initialOverrides, removeKeys));//dynmic form state data where some default keys/and we add or remove keys.

    const [addSelect, setAddSelect] = useState({ billing: "", shipping: "", });//set address when select custome/vendor
    const [isVendorSelect, setIsVendorSelect] = useState(false);//vendor show error message
    const [isCustomerSelect, setIsCustomerSelect] = useState(false);//vendor show error message
    const [itemErrors, setItemErrors] = useState([]);
    const [isInvoiceSelect, setIsInvoiceSelect] = useState(false);
    const [isGrnQntySelect, setIsGrnQntySelect] = useState(false);
    const [isBillSelect, setIsBillSelect] = useState(false);
    const [imgLoader, setImgLoader] = useState(null);//show loader until image is uploaded
    const [cusData, setCusData] = useState(null);//set all selected customer data

    // use only When the form is edit/dublicate/convert
    useEffect(() => {
        if (itemId && isEdit && detailData || (itemId && (convert === "toInvoice" || convert === "quotationToInvoice" || convert === "invoiceToCredit" || convert === "quotationToSale" || convert === "saleToInvoice" || convert === "purchase_to_bill" || convert === "bill_to_payment" || convert === "purchase_to_grn" || convert === "grn_to_bill" || convert === "bill_to_debit"))) {
            console.log("detailData", detailData)
            const {
                calculateTotalTaxAmount,
                itemsFromApi,
                all_changes,
                total_charges,
            } = parsePurchaseDetails(detailData, convert);//form state data which have calculations.

            const currentKeys = Object?.keys(formData); // Keys from the current formData
            const updatedFields = {};

            // Loop through detailData keys and update only matching keys in formData
            currentKeys?.forEach((key) => {
                if (detailData && key in detailData) { // Check if detailData is valid
                    updatedFields[key] = detailData[key]; // Update the matching keys
                }
            });

            // console.log("updatedFields", updatedFields);
            // console.log("billDaaaaaaaaaaaaaaaaaaaaaaaa", detailData)

            // set all data inside the formdata
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...updatedFields,

                id: isEdit ? detailData?.id : 0,//it works in 0 is works convert create/and dublicate..

                // for bill update
                ...(convert && { is_grn_convert: convert === "grn_to_bill" ? 1 : 0, }),//in bill create form when convert grn to bill


                //for sales order update
                ...(detailData?.sale_order_id && {
                    sale_type: (convert === "toInvoice" || convert === "saleToInvoice") ? "invoice" : 'sale_order',
                    payment_terms: parseInt(detailData?.payment_terms),
                    shipment_date: convert ? detailData?.expiry_date : detailData?.shipment_date,
                    tracking_details: convert ? stringifyJSON({
                        module: convert,
                        id: itemId
                    }) : null,
                }),

                //for delivery challan/invoice update
                ...(detailData?.invoice_id && {
                    tracking_details: stringifyJSON({
                        ...(convert === "saleToInvoice" && { module: convert, id: itemId }),
                        ...(detailData?.tracking_details && { module_data: JSON?.parse(detailData?.tracking_details) })
                    })
                }),

                //for grn update and convert purchase to grn
                ...(detailData && convert === "purchase_to_grn" && {
                    is_purchase_order: convert === "purchase_to_grn" ? 1 : (+detailData?.is_purchase_order), // 0 no and 1 yes
                    ...(!convert === "purchase_to_grn" && { charges_type: chargesFromApi || [] }),
                    purchase_order_id: detailData?.id,
                    tracking_details: stringifyJSON({
                        ...(convert === "purchase_to_grn" ? { module: convert, id: itemId } : []),
                    }),

                    ...(convert === "purchase_to_grn" && {
                        total_charges: total_charges,
                        charges: all_changes,
                    }),
                }),

                ...(detailData?.reference && { reference_no: detailData?.reference, reference: detailData?.reference, reference_no: detailData?.reference_no }),
                status: detailData?.status,
                tax_amount: calculateTotalTaxAmount(),
                items: itemsFromApi,
                charges: all_changes,
                total_charges: total_charges,
            }));


            if (detailData?.upload_image) setImgLoader("success");

            // console.log("detailData", detailData)
            if (detailData?.address) {
                const parsedAddress = JSON?.parse(detailData?.address);
                setAddSelect({
                    billing: parsedAddress?.billing,
                    shipping: parsedAddress?.shipping,
                });

                if (detailData?.vendor) {
                    setCusData(detailData?.vendor);//if vendor data found in detail api

                } else {
                    setCusData(detailData?.customer);//if customer data found. in detail api
                }
            }

            setIsCustomerSelect(!!detailData?.customer_id);//remove vendor error if vendor is selected
            setIsVendorSelect(!!detailData?.vendor_id);//remove vendor error if vendor is selected
            setIsInvoiceSelect(!!detailData?.invoice_id);//remove invoice error if invoice is selected
            setIsBillSelect(!!detailData?.bill_id);//remove bill error if bill is selected
            setIsGrnQntySelect(!!detailData?.items);


            // setIsItemSelect(!!detailData?.items);//remove items error if item is selected
            // for showing items select errors..
            const errors = validateItems(detailData?.items || []);
            if (errors.length > 0) {
                setItemErrors(errors);
            }
        }
        // console.log("formDataformDataformDataformData", formData)

    }, [detailData, itemId, isEdit, convert]);

    return {
        formData,
        setFormData,
        addSelect,
        setAddSelect,
        isVendorSelect,
        setIsVendorSelect,
        isCustomerSelect,
        setIsCustomerSelect,
        isInvoiceSelect,
        setIsInvoiceSelect,
        itemErrors,
        setItemErrors,
        isBillSelect,
        setIsBillSelect,
        isGrnQntySelect,
        setIsGrnQntySelect,
        imgLoader,
        setImgLoader,
        cusData,
        setCusData,
    };
}