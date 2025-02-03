import { } from "../../HelperFunctions";

// this is the common calculation part of formdata
export const parsePurchaseDetails = (detailData, convert) => {

    const calculateTotalTaxAmount = () => {
        return detailData?.items?.reduce((total, entry) => {
            return total + (entry?.tax_amount ? parseFloat(entry?.tax_amount) : 0);
        }, 0);
    };

    const itemsFromApi = detailData?.items?.length > 0
        ? detailData?.items?.map((item) => ({

            item_id: +item?.item_id,
            quantity: convert === "grn_to_bill" ? +item?.gr_qty : +item?.quantity,

            //when grn update
            ...(convert === "purchase_to_grn" && detailData && {
                po_qty: convert === "purchase_to_grn" ? +item?.quantity : +item?.po_qty,
                gr_qty: +item?.gr_qty,
                charges_weight: +item?.charges_weight,
                custom_duty: item?.custom_duty,
                ...(convert === "purchase_to_grn" ? "" : { upload_image: JSON?.parse(item?.upload_image) }),
            }),

            unit_id: item?.unit_id,
            item_name: item?.item_name,
            gross_amount: +item?.gross_amount,
            rate: +item?.rate,
            hsn_code: +item?.item?.hsn_code,
            type: item?.type,
            final_amount: +item?.final_amount,
            tax_rate: +item?.tax_rate,
            tax_amount: +item?.tax_amount,
            discount: +item?.discount,
            discount_type: convert === "grn_to_bill" ? 1 : +item?.discount_type,
            item_remark: item?.item_remark,
            tax_name: item?.item?.tax_preference == "2" && "Non-Taxable",
            unit_id: item?.unit_id,

            // for service select
            is_service: item?.is_service,
            service_data: JSON?.parse(item?.service_data || "{}"),
        }))
        :
        // if the item details data have no items then by default set an Item.
        [
            {
                item_id: 0,
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

                // for service select
                is_service: null,
                item_data: null,
            },
        ];

    // Always add an empty row at the end of the items array
    itemsFromApi?.push({
        item_name: "", service_name: "", discount_type: 1, discount: 0, quantity: 1, tax_rate: 0, tax_amount: 0
    });

    const all_changes = JSON?.parse(detailData?.charges || "[]");

    const total_charges = all_changes?.reduce((acc, item) => {
        const amount = item?.amount && !isNaN(item?.amount) ? parseFloat(item?.amount) : 0;
        return acc + amount;
    }, 0);

    return {
        calculateTotalTaxAmount,
        itemsFromApi,
        all_changes,
        total_charges,
    };
};
