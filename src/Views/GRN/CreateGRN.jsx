import React, { useEffect, useState, useRef, useMemo } from "react";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import {
  purchseOrdersLists,
} from "../../Redux/Actions/listApisActions";
import DatePicker from "react-datepicker";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import toast, { Toaster } from "react-hot-toast";
import {
  purchasesDetails,
} from "../../Redux/Actions/purchasesActions";
import useOutsideClick from "../Helper/PopupData";
import { formatDate } from "../Helper/DateFormat";

import ImageUpload from "../Helper/ComponentHelper/ImageUpload";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown22 from "../../Components/CustomDropdown/CustomDropdown22";
import {
  GRNcreateActions,
  GRNdetailsActions,
} from "../../Redux/Actions/grnActions";
import { withPurchaseOrder } from "../Helper/ComponentHelper/DropdownData";
import { GRNype } from "../Helper/ComponentHelper/DropdownData";
import { SubmitButton2 } from "../Common/Pagination/SubmitButton";
import TextAreaComponentWithTextLimit from "../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import GenerateAutoId from "../Sales/Common/GenerateAutoId";
import { handleDropdownError, preventZeroVal } from "../Helper/HelperFunctions";
import Swal from "sweetalert2";
import { useEditPurchaseForm } from "../Helper/StateHelper/EditPages/useEditPurchaseForm";
import Loader02 from "../../Components/Loaders/Loader02";
import { productTypeItemAction } from "../../Redux/Actions/ManageStateActions/manageStateData";
import { ItemSelectGRN } from "../Helper/ComponentHelper/ItemSelectGRN";
import { financialYear } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const CreateGRN = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const vendorList = useSelector((state) => state?.vendorList);
 
  const purchseList = useSelector((state) => state?.purchseList);
  const detailsPurchase = useSelector((state) => state?.detailsPurchase);
  const GRNcreates = useSelector((state) => state?.GRNcreate);
  const params = new URLSearchParams(location.search);
  const {
    id: itemId,
    edit: isEdit,
    duplicate: isDuplicate,
    convert
  } = Object.fromEntries(params.entries());

  const [showAllSequenceId, setShowAllSequenceId] = useState([]);
  const itemList = useSelector((state) => state?.itemList);
  const allItems = itemList?.data?.item;


  const GRNdetails = useSelector((state) => state?.GRNdetails);
  const GRNdetail = GRNdetails?.data?.bgrnill;

  const purchseDetails = useSelector((state) => state?.detailsPurchase);
  const purchseDetail = purchseDetails?.data?.purchaseOrder;

  const [fetchDetails, setFetchDetails] = useState([]);

  useEffect(() => {
    if (itemId && GRNdetail) {
      // console.log("Setting fetchDetails with GRNdetail");
      setFetchDetails(GRNdetail);
    } else if (itemId && convert === "purchase_to_grn" && purchseDetail) {
      // console.log("Setting fetchDetails with purchseDetail");
      setFetchDetails(purchseDetail);
    }
  }, [itemId, GRNdetail, purchseDetail, convert]);

  const {
    formData,
    setFormData,
    isVendorSelect,
    setIsVendorSelect,
    itemErrors,
    setItemErrors,
    isGrnQntySelect,
    setIsGrnQntySelect,
    imgLoader,
    setImgLoader,
    cusData,
    setCusData,
  } = useEditPurchaseForm(
    {
      grn_type: "Import",
      grn_no: "GRN-1315",
      is_purchase_order: 1, // 0 no and 1 yes
      purchase_order_id: "",
      total_grn_charges: null,

      items: [
        {
          id: 0,
          item_id: 0,
          item_name: "",
          po_qty: null,
          gr_qty: 0,
          rate: 0,
          charges_weight: 0,
          custom_duty: 0,
          gross_amount: 0,
          final_amount: 0,
          tax_rate: 0,
          tax_amount: 0,
          unit_id: 0,
          discount: 0,
          discount_type: null,
          item_remark: "", // Discrepency Notes
          upload_image: [], // Attachments
        },
      ],

      charges_type: [
        {
          account_id: 0,
          amount: 0,
          remarks: "",
          vendor_id: 0,
          upload_image: [], // Attachment
        },
      ],

    },//for set new key's and values
    [], // Keys to remove
    fetchDetails,
    itemId,
    isEdit,
    convert,
    isDuplicate
  );

 console.log("cusData", cusData)


  useEffect(() => {

    // update the field of items
    const itemsFromApi = fetchDetails?.items?.length > 0
      ? fetchDetails?.items?.map((item) => {
        let newItem = {};

        // Extract all keys dynamically from item
        const itemKeys = Object.keys(item || {});
        itemKeys.forEach((key) => {
          if (item[key] !== undefined) {
            newItem[key] = item[key];
          }
        });

        // Extract all keys dynamically from item?.item and merge them
        if (item?.item) {
          const nestedItemKeys = Object.keys(item.item);
          nestedItemKeys.forEach((key) => {
            if (item.item[key] !== undefined) {
              newItem[key] = item.item[key]; // Merge nested item properties
            }
          });
        }
        // console.log("newItem1", newItem1)
        return {
          ...newItem,

          // Ensure purchase_price from item?.item is included
          // purchase_price: +item?.item?.purchase_price,

          item_name: item?.item?.name,
          upload_image: JSON?.parse(item?.upload_image),
          custom_duty:item?.custom_duty,
          // Additional conditions
          ...(convert === "purchase_to_grn" && fetchDetails && {
            po_qty: convert === "purchase_to_grn" ? +item?.quantity : +item?.po_qty,
            gr_qty: +item?.gr_qty,
            charges_weight: +item?.charges_weight,
            custom_duty: item?.custom_duty,
            ...(convert === "purchase_to_grn" ? "" : { upload_image: JSON?.parse(item?.upload_image) }),
          }),

          // quantity: convert === "grn_to_bill" ? +item?.gr_qty : +item?.quantity,
          // discount_type: convert === "grn_to_bill" ? 1 : +item?.discount_type,
          tax_name: item?.item?.tax_preference == "2" ? "Non-Taxable" : "",
          // service_data: JSON?.parse(item?.service_data || "{}"),
        };
      })
      : [
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
          is_service: null,
          service_data: null,
        },
      ];


    // Always add an empty row at the end of the items array
    // itemsFromApi?.push({
    //   item_name: "", service_name: "", discount_type: 1, discount: 0, quantity: 1, tax_rate: 0, tax_amount: 0
    // });



    // update the field of charges
    const chargesFromApi = fetchDetails?.charges_type?.length > 0
      ?
      fetchDetails?.charges_type?.map((charges) => {
        let newChargesType = {};

        // Extract all keys dynamically from item
        const itemKeys = Object.keys(charges || {});
        itemKeys.forEach((key) => {
          if (charges[key] !== undefined) {
            newChargesType[key] = charges[key];
          }
        });

        return {
          ...newChargesType,
          upload_image: JSON?.parse(charges?.upload_image),
          
        };
      })
      : [
        {
          account_id: 0,
          account_name: 0,
          vendor_name: 0,
          amount: 0,
          remarks: "",
          vendor_id: 0,
          upload_image: []
        },
      ];

    setFormData({
      ...formData,
      vendor_id:fetchDetails?.vendor_id,
      purchase_order_id:fetchDetails?.purchase_order_id,
      items: itemsFromApi,
      charges_type: chargesFromApi,
      id: isEdit ? fetchDetails?.id : 0,//it works in 0 is works convert create/and dublicate..


      //for grn update and convert purchase to grn
      ...(fetchDetails && convert === "purchase_to_grn" && {
        is_purchase_order: convert === "purchase_to_grn" ? 1 : (+fetchDetails?.is_purchase_order), // 0 no and 1 yes
        ...(!convert === "purchase_to_grn" && { charges_type: chargesFromApi || [] }),
        purchase_order_id: fetchDetails?.id,

        tracking_details: Json.stringify({
          ...(convert === "purchase_to_grn" ? { module: convert, id: itemId } : []),
        }),
        ...(convert === "purchase_to_grn" && {
          total_charges: total_charges,
          charges: all_changes,
        }),
      }),
    })

  }, [fetchDetails, convert])

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "shipping_charge" || name === "adjustment_charge") {
      newValue = parseFloat(value) || 0;
    }

    if (name === "vendor_id" && value !== "") {
      setIsVendorSelect(true);
      const sendData = {
        fy: financialYear(),
        vendor_id: value,
        status: 1
      };

      dispatch(purchseOrdersLists(sendData));
    } else if (name === "vendor_id" && value == "") {
      setIsVendorSelect(false);
    }


    if (name === "purchase_order_id" && value !== "") {
      dispatch(purchasesDetails({ id: value, fy: localStorage.getItem('FinancialYear'), }));
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      display_name: cusData?.display_name,
      email: cusData?.email,
      phone: cusData?.mobile_no,
    }));
    dispatch(productTypeItemAction(""));
  }, [cusData]);

  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.nativeEvent.submitter.name;
    try {

      if (handleDropdownError(isVendorSelect, dropdownRef1)) return;

      // Helper function to find item name by id
      const findItemNameById = (id) => {
        const item = allItems.find((item) => item.id === id);
        return item ? item.name : 'Unknown Item'; // Handle missing ids
      };


      // if any grn quantity is empty then show a warning message before submit
      const itemsWithGrQty = formData?.items?.filter((val) => val?.gr_qty === 0 && val?.item_id); // 

      let confirmed = null;

      if (itemsWithGrQty.length > 0 && confirmed === null) {
        const itemNames = itemsWithGrQty
          .map((item) => findItemNameById(item.item_id)) // Use the helper function to get item names
          .join(', ');

        const { isConfirmed } = await Swal.fire({
          text: `Are you sure you have not received any quantity against the Item(s): ${itemNames}?`,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          customClass: {
            popup: 'swal-wide',
          },
        });

        confirmed = isConfirmed;
      }

      const prepareFormDataForApi = (formData) => {
        const preparedFormData = JSON?.parse(JSON.stringify(formData));
        preparedFormData.items = preparedFormData.items.map(item => ({
          ...item,
          upload_image: JSON.stringify(item?.upload_image)
        }));

        preparedFormData.charges_type = preparedFormData.charges_type?.map(charge => ({
          ...charge,
          upload_image: JSON.stringify(charge?.upload_image)
        }));

        preparedFormData.charges = JSON.stringify(preparedFormData.charges);
        return preparedFormData;
      };

      // Prepare formData for API
      const formDataForApi = prepareFormDataForApi(formData);
      dispatch(GRNcreateActions(formDataForApi, Navigate, isEdit, buttonName, itemId, convert, showAllSequenceId,));
    } catch (error) {
      toast.error('Error updating GRN:', error);
    }
  };

  useEffect(() => {
    if (itemId && convert && !purchseDetail) {
      // console.log("Fetching purchase details...");
      dispatch(purchasesDetails({ id: itemId, fy: localStorage.getItem('FinancialYear') }));
    }

    //fetch the list of purchases when vendor id is found on convert. 
    if (convert && formData?.vendor_id) {
      dispatch(purchseOrdersLists({
        fy: financialYear(),
        vendor_id: formData?.vendor_id,
        status: 1
      }));
    }
    if (itemId && isEdit && !GRNdetail) {
      // console.log("Fetching GRN details...");
      dispatch(GRNdetailsActions({ id: itemId }));
    }
  }, [dispatch, itemId, convert, isEdit, purchseDetail, GRNdetail]);

  useOutsideClick(dropdownRef, () => setOpenDropdownIndex(null));

  const [freezLoadingImg, setFreezLoadingImg] = useState(false);


  //empty all the fields when no select
  useEffect(() => {
    if (formData?.is_purchase_order == 2) {
      setFormData({
        ...formData,
        purchase_order_id: null,
        vendor_id: null,

        items: [
          {
            id: 0,
            item_id: null,
            item_name: null,
            po_qty: 0,
            gr_qty: 0,
            rate: 0,
            charges_weight: 0,
            custom_duty: null,
            gross_amount: 0,
            final_amount: 0,
            tax_rate: 0,
            tax_amount: 0,
            discount: 0,
            discount_type: null,
            item_remark: null, // Discrepency Notes
            upload_image: [], // Attachments
          },
        ],

        charges_type: [
          {
            account_id: null,
            amount: 0,
            remarks: "",
            vendor_id: null,
            upload_image: [], // Attachment
          },
        ],

        total: 0,
        total_grn_charges: 0,
        adjustment_charge: 0,
        subtotal: 0,
      });
    }
  }, [formData?.is_purchase_order]);

  //empty all the fields when no select
  useEffect(() => {
    if (formData?.purchase_order_id) {
      console.log("purchseDetail", purchseDetail)
      const itemsFromApi = purchseDetail?.items?.map(item => ({
        item_id: +item?.item_id,
        item_name: item?.item?.name,
        unit_id: item?.unit_id,
        tax_rate: (item?.tax_rate),
        po_qty: convert === "purchase_to_grn" ? +item?.quantity : +item?.quantity,
        gr_qty: item?.gr_qty,
        rate: item?.rate,
        charges_weight: item?.charges_weight,
        custom_duty: item?.custom_duty,
        gross_amount: item?.gross_amount,
        final_amount: item?.final_amount,
        tax_amount: item?.tax_amount,
        item_remark: item?.item_remark,
      }));
      console.log("itemsFromApi",purchseDetail?.items)
      setFormData((prev) => ({
        ...prev,
        items: itemsFromApi || []
      }));

      // if (!purchseDetail?.items) {
      //   setIsItemSelect(false);
      // } else {
      //   setIsItemSelect(true);
      // }
    }
  }, [formData?.purchase_order_id, purchseDetail]);
console.log("formData", formData?.purchase_order_id)

  return (
    <>
      {(GRNdetails?.loading) ? <Loader02 /> : <>
        <TopLoadbar />
        {(freezLoadingImg || GRNcreates?.loading || purchseList?.loading || detailsPurchase?.loading) && <MainScreenFreezeLoader />}
        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.create_grn_svg}
                {isEdit ? "Update GRN" :"New GRN"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link to={"/dashboard/grn"} className="linkx3">
                <RxCross2 />
              </Link>
            </div>
          </div>

          <div id="formofcreateitems">
            <form onSubmit={handleFormSubmit}>
              <div className="relateivdiv">
                {/* <div className=""> */}
                <div className="itemsformwrap">
                  <div className="f1wrapofcreq">

                    <div className="form_commonblock">
                      <label>
                        GRN Type<b className="color_red">*</b>
                      </label>
                      <div id="sepcifixspanflex">
                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            ref={dropdownRef1}
                            options={GRNype}
                            value={formData.grn_type}
                            onChange={handleChange}
                            name="grn_type"
                            defaultOption="Select GRN Type"
                            type="masters"
                            required
                          />
                        </span>
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>GRN Date</label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData.transaction_date}
                            onChange={(date) =>
                              setFormData({
                                ...formData,
                                transaction_date: formatDate(date),
                              })
                            }
                            name="transaction_date"
                            placeholderText="Enter Transaction Date"
                            dateFormat="dd-MM-yyyy" // Add format prop
                          />
                        </span>
                      </div>

                      <div className="form_commonblock">
                        <label>GRN Number</label>
                        <GenerateAutoId
                          formHandlers={{ setFormData, handleChange, setShowAllSequenceId }}
                          nameVal="grn_no"
                          value={formData?.grn_no}
                          module="grn"
                          showField={isEdit}
                        />
                      </div>

                      <div className="form_commonblock ">
                        <label>Reference</label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input

                            type="text"
                            value={formData.reference}
                            onChange={handleChange}
                            name="reference"
                            placeholder="Enter Reference"
                          />
                        </span>
                      </div>

                      <div className="form_commonblock">
                        <label>With Purchase Order<b className='color_red'>*</b></label>
                        <div id="inputx1">
                          <span>
                            {otherIcons?.home_brek_svg}
                            <CustomDropdown04
                              label="With Purchase Order name"
                              options={withPurchaseOrder}
                              value={formData?.is_purchase_order}
                              onChange={handleChange}
                              name="is_purchase_order"
                              defaultOption="Select Yes/No"
                              type="masters"
                            />
                          </span>
                        </div>
                      </div>

                      <div className="form_commonblock">
                        <label>
                          Select Vendor<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">

                          <span id="">
                            {otherIcons.name_svg}
                            <CustomDropdown10
                              ref={dropdownRef1}
                              label="Select vendor"
                              options={vendorList?.data?.user}
                              value={formData.vendor_id}
                              onChange={handleChange}
                              name="vendor_id"
                              defaultOption="Select Vendor Name"
                              setcusData={setCusData}
                              cusData={cusData}
                              type="vendor"
                              itemData={formData?.vendor_name}
                            />
                          </span>

                        </div>
                        {!isVendorSelect && (
                          <p
                            className="error-message"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {otherIcons.error_svg}
                            Please Select Vendor
                          </p>
                        )}
                      </div>

                      {formData?.is_purchase_order == 1 ? (
                        <>
                          <div className="form_commonblock">
                            <label>Purchase Order</label>
                            <div id="inputx1">
                              <span id="">
                                {otherIcons.name_svg}
                                <CustomDropdown22
                                  options={purchseList?.data?.purchase_order}
                                  value={formData?.purchase_order_id}
                                  onChange={handleChange}
                                  name="purchase_order_id"
                                  defaultOption="Select Purchase Order"
                                  setcusData={setCusData}
                                  type="purchase"
                                  label="Select purchase_order"
                                // purchase_order_id=

                                />
                              </span>

                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <div></div>
                    </div>
                  </div>
                  {/* </div> */}

                  <div id="select_item_in_grn_0101">
                    {fetchDetails && formData?.charges && formData?.items &&
                      <ItemSelectGRN
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                        itemErrors={itemErrors}
                        setItemErrors={setItemErrors}
                        extracssclassforscjkls={"extracssclassforscjkls"}
                        dropdownRef2={dropdownRef2}
                        itemData1={cusData}
                        imgLoader={imgLoader}
                        setImgeLoader={setImgLoader}
                        vendorList={vendorList}
                        isGrnQntySelect={isGrnQntySelect}
                        setIsGrnQntySelect={setIsGrnQntySelect}
                      />
                    }
                    <div className="secondtotalsections485s sxfc546sdfr85234e">

                      <div className="textareaofcreatqsiform">
                        <label>Terms And Conditions</label>
                        <div className='show_no_of_text_limit_0121'>
                          <TextAreaComponentWithTextLimit
                            formsValues={{ handleChange, formData }}
                            placeholder="Enter the terms and conditions of your business to be displayed in your transaction "
                            name="terms_and_condition"
                            value={preventZeroVal(formData?.terms_and_condition)}
                          />
                        </div>
                      </div>

                      <div id="imgurlanddesc" className="calctotalsectionx2">

                        <ImageUpload
                          formData={formData}
                          setFormData={setFormData}
                          setFreezLoadingImg={setFreezLoadingImg}
                          imgLoader={imgLoader}
                          setImgeLoader={setImgLoader}
                          component="purchase"
                        />

                      </div>
                    </div>
                  </div>
                </div>

                <SubmitButton2 isEdit={isEdit} itemId={itemId} cancel="grn" />
              </div>
            </form>
          </div>
          <Toaster />
        </div>
      </>}
    </>
  );
};
export default CreateGRN;
