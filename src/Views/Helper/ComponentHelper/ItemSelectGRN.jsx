import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  accountLists,
  itemLists,
} from "../../../Redux/Actions/listApisActions";
import { useDispatch, useSelector } from "react-redux";
import NumericInput from "../NumericInput";
import toast from "react-hot-toast";
import useOutsideClick from "../PopupData";
import { SlReload } from "react-icons/sl";
import { handleKeyPress } from "../KeyPressInstance";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { otherIcons } from "../SVGIcons/ItemsIcons/Icons";
import { ImageUploadGRN } from "./ImageUpload";
import CustomDropdown15 from "../../../Components/CustomDropdown/CustomDropdown15";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import CustomDropdown10 from "../../../Components/CustomDropdown/CustomDropdown10";
import CustomDropdown13 from "../../../Components/CustomDropdown/CustomDropdown13";
import CustomDropdown04, { CustomDropdown004 } from "../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown26 from "../../../Components/CustomDropdown/CustomDropdown26";
import useFetchApiData from "./useFetchApiData";
import { financialYear, getCurrencySymbol } from "./ManageStorage/localStorageUtils";
import { sendData, ShowMasterData } from "../HelperFunctions";
import TextAreaComponentWithTextLimit from "./TextAreaComponentWithTextLimit";
import ExpenseCharges from "./ExpenseCharges";



export const ItemSelectGRN = ({
  formData,
  setFormData,
  handleChange,
  itemErrors,
  setItemErrors,
  extracssclassforscjkls,
  dropdownRef2,
  note,
  itemData1,
  imgLoader,
  setImgeLoader,
  vendorList,
  setIsGrnQntySelect,
}) => {
  const itemList = useSelector((state) => state?.itemList);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonRef1 = useRef(null);
  const accountList = useSelector((state) => state?.accountList);
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);

  const currencySymbol = getCurrencySymbol();

  const unitList = ShowMasterData("2");

  const dispatch = useDispatch();

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [itemData, setItemData] = useState(false);
  const [cusData, setcusData] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useOutsideClick(dropdownRef, () => setOpenDropdownIndex(null));

  //set all the values of items// when do any changes in items
  useEffect(() => {
    const newItems = [...formData?.items];
    const newCharges = [...formData?.charges];
    const newChargesType = [...formData?.charges_type];

    const tax_amount = newItems?.reduce(
      (acc, item) => acc + (item?.tax_amount),
      0
    );

   const total_charges = newCharges?.reduce((acc, item) => {
      const amount =
        item?.amount && !isNaN(item?.amount) ? parseFloat(item?.amount) : 0;
      return acc + amount;
    }, 0);

    const total_charges_type = newChargesType?.reduce(
      (total, item) => total + (+item?.amount || 0),
      0
    );

    const subtotal = newItems?.reduce((acc, item) => {
      const finalAmount = parseFloat(item?.final_amount);
      return acc + (isNaN(finalAmount) ? 0 : finalAmount);
    }, 0);

    const total = subtotal + (parseFloat(tax_amount) || 0) + (parseFloat(total_charges) || 0);

    setFormData((prevFormData) => ({
      ...prevFormData,
      subtotal: subtotal?.toFixed(2),
      total_tax: tax_amount?.toFixed(2),
      tax_amount: tax_amount?.toFixed(2),
      total_charges: total_charges?.toFixed(2),
      total: total?.toFixed(2),
    }));

  }, [
    formData.items, // Re-calculate when items change
    formData.charges, // Re-calculate when charges change
  ]);
  //set all the values of items// when do any changes in items

  // call item api on page load...
  const payloadGenerator = useMemo(
    () => () => ({
      fy: financialYear(),
      noofrec: 15,
      active: 1,
    }),
    []
  );

  useFetchApiData(itemLists, payloadGenerator, []); //call api common function
  useFetchApiData(accountLists, payloadGenerator, []); //call api common function

  const [openCharges, setOpenCharges] = useState(false);
  const openExpenseCharges = () => {
    setOpenCharges(!openCharges);
  };

  const [totalCharges, setTotalCharges] = useState(0);

  const calculateTotalCharges = (charges) => {
    return charges?.reduce((total, item) => total + (+item?.amount || 0), 0);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    const item = newItems[index];
    const newErrors = [...itemErrors];

    const chargesItems = [...formData.charges];
    const newCharges = [...formData.charges_type];
    let updatedTotalCharges = totalCharges || formData?.total_grn_charges;
    // Update charges and recalculate total charges
    if (field === "amount" && newCharges[index]) {
      newCharges[index][field] = value;
      updatedTotalCharges = calculateTotalCharges(newCharges);
      setTotalCharges(updatedTotalCharges);
    }

    if (field === "item_name") {
      newItems[index].item_name = value;
      newItems[index].item_id = 0;
      newItems[index].hsn_code = "";
    }

    if (field === "item_name" && value !== "") {
      setItemErrors(true);
    } else if (field === "item_name" && value === "") {
      setItemErrors(false);
    }

    // Update item details
    if (field === "item_id") {
      const selectedItem = itemList?.data?.item?.find((item) => item?.id == value);

      // console.log("selectedItem", selectedItem)
      if (selectedItem) {
        const showPrice = formData?.sale_type
          ? selectedItem?.price
          : selectedItem?.purchase_price;

        newItems[index].unit_id = selectedItem?.unit;
        newItems[index].item_name = selectedItem?.name;
        newItems[index].type = selectedItem?.type;
        newItems[index].rate = showPrice;
        newItems[index].gross_amount = +showPrice * +item?.quantity;
        newItems[index].hsn_code = selectedItem?.hsn_code;
        newItems[index].hsn_code = selectedItem?.hsn_code;
        newItems[index].item_id = selectedItem?.id;

        if (selectedItem?.tax_preference == "1") {
          newItems[index].tax_rate = !selectedItem?.tax_rate
            ? 0
            : selectedItem?.tax_rate;
          newItems[index].tax_name = "Taxable";
        } else {
          newItems[index].tax_rate = "0";
          newItems[index].tax_name = "Non-Taxable";
        }

        newErrors[index] = {
          ...newErrors[index],
          item_id: 0,
          item_name: "",
          tax_rate: "",
          unit_id: 0,
          rate: "",
        };
      }
    }

    else if (field === "unit_id") {
      newItems[index].unit_id = value;
    } else if (["account_id", "remarks", "vendor_id"].includes(field)) {
      newCharges[index][field] = value;
    } else {
      newItems[index][field] = value;

      // Recalculate gross_amount only when "gr_qty" is updated
      // if (field === "gr_qty") {
      //   newItems[index].gross_amount = +newItems[index].rate * +value;
      // }
    }

    // Only update final_amount if specific fields change or total charges change
    const updatedItems = newItems.map((item, i) => {
      if (i === index || field === "amount" || field === "custom_duty") {
        const grossAmount = +item?.rate * +item?.gr_qty;

        const taxAmount = (grossAmount * (+item?.tax_rate || 0)) / 100;

       // Ensure custom_duty is a valid number; if not, set it to 0
        const customDuty = !isNaN(+item.custom_duty) ? +item.custom_duty : 0;
        const customDutyAmount = (grossAmount * customDuty) / 100;

        // Calculate charges_weight based on the updatedTotalCharges value
        const chargesWeight = updatedTotalCharges
          ? grossAmount / updatedTotalCharges
          : 0;

        // Calculate finalAmount with the custom duty included
        const finalAmount = grossAmount + chargesWeight + customDutyAmount; // Not including tax in final amount
        newItems[index].tax_amount = taxAmount?.toFixed(2); // For calculate tax amount
        newItems[index].final_amount = finalAmount?.toFixed(2); // Round to 2 decimal places

        return {
          ...item,
          custom_duty: customDuty, // Update custom_duty to reflect the actual value used in calculation
          charges_weight: chargesWeight || null,
          tax_amount: taxAmount,
          final_amount: finalAmount?.toFixed(2),
        };
      }
      return item;
    });

    const total_charges = chargesItems?.reduce((acc, item) => {
      const amount =
        item?.amount && !isNaN(item?.amount) ? parseFloat(item?.amount) : 0;
      return acc + amount;
    }, 0);

    const tax_amount = updatedItems?.reduce(
      (acc, item) => acc + parseFloat(item?.tax_amount),
      0
    );
    const subtotal = updatedItems.reduce(
      (acc, item) => acc + parseFloat(item?.final_amount || 0),
      0
    );

    const total = subtotal + (parseFloat(tax_amount) || 0) + (parseFloat(total_charges) || 0);
    // const total = subtotal;

    setFormData({
      ...formData,
      items: updatedItems,
      charges_type: newCharges,
      subtotal: subtotal?.toFixed(2),
      total: total?.toFixed(2),
    });
  };
  // console.log("formedatraa", formData)
  useEffect(() => {
    setFormData({
      ...formData,
      total_grn_charges: totalCharges,
    });
  }, [totalCharges]);

  const handleGRNReset = (index) => {
    setItemErrors(false);
    setIsGrnQntySelect(false);
    const newItems = [...formData?.items];
    newItems[index] = {
      item_id: 0,
      item_name: "",
      tax_amount: 0,
      gr_qty: 0,
      po_qty: null,
      gross_amount: 0,
      rate: 0,
      final_amount: 0,
      tax_rate: 0,
      item_remark: "",
      upload_image: "",
    };
  };

  const handleItemAdd = () => {
    const newItems = [
      ...formData?.items,
      {
        item_id: 0,
        item_name: "",
        gr_qty: 0,
        po_qty: 0,
        gross_amount: 0,
        rate: 0,
        final_amount: 0,
        tax_amount: 0,
        tax_rate: 0,
        item_remark: "",
        upload_image: "",
      },
    ];
    setFormData({ ...formData, items: newItems });
  };

  const handleChargesAdd = () => {
    const newItems = [
      ...formData?.charges_type,
      {
        account_id: 0,
        amount: 0,
        remarks: "",
        vendor_id: 0,
        upload_image: "",
      },
    ];
    setFormData({ ...formData, charges_type: newItems });
  };

  const handleItemRemove = (index) => {
    const newItems = formData.items.filter((item, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleChargeRemove = (index) => {
    const newItems = formData.charges_type.filter((item, i) => i !== index);
    setFormData({ ...formData, charges_type: newItems });
  };

  useEffect(() => {
    return handleKeyPress(buttonRef, handleChargesAdd);
  }, [buttonRef, handleChargesAdd]);

  useEffect(() => {
    return handleKeyPress(buttonRef1, handleItemAdd);
  }, [buttonRef1, handleItemAdd]);

  return (
    <>
      <div className="f1wrpofcreqsx2 ">
        {freezLoadingImg && <MainScreenFreezeLoader />}

        <>
          {/* Table Started */}
          <table className="itemTable_01" id="modidy_table_form_grn_item">

            <thead className="table_head_item_02">
              <tr className="table_head_item_02_row">

                <th className="table_column_item item_table_width_01">
                  Item<b className="color_red">*</b>
                </th>

                <th className="table_column_item item_table_width_02 item_text_end_01">({currencySymbol})Item Price  </th>

                {formData?.purchase_order_id &&
                  formData?.purchase_order_id !== 0 ? (
                  <th className="table_column_item item_table_width_02">
                    PO QTY
                  </th>
                ) : (
                  ""
                )}

                <th className="table_column_item item_qty_01 item_table_width_02">
                  GRN QTY
                </th>
                <th className="table_column_item item_qty_01 item_table_width_02">
                  Charges Weight
                </th>

                <th className="table_column_item item_table_width_02">
                  Unit
                </th>

                <th className="table_column_item item_table_width_02">
                  Tax(%)
                </th>

                {formData?.grn_type === "Import" && (
                  <th className="table_column_item item_table_width_03">
                    Custom Duty(%)
                  </th>
                )}

                <th className="table_column_item item_table_width_02 item_text_end_01">({currencySymbol})Amount </th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>

            {/* {console.log("formData?.items", formData?.items)} */}
            <tbody className="table_head_item_02">
              {formData?.items?.map((item, index) => (
                <React.Fragment key={index}>
                  <tr className="table_head_item_02_row">
                    {/* Item Details */}
                    <td className="table_column_item item_table_width_01 item_table_text_transform">

                      <CustomDropdown26
                        options={itemList?.data?.item || []}
                        value={item?.item_id}
                        onChange={(event) =>
                          handleItemChange(
                            index,
                            event.target.name,
                            event.target.value
                          )
                        }
                        name="item_id"
                        type="select_item"
                        setItemData={setItemData}
                        index={index}
                        extracssclassforscjkls={extracssclassforscjkls}
                        itemData={item}
                        ref={dropdownRef2}
                        service_data={null}
                      />

                      <div

                        className={`form_commonblock ${formData?.grn_type === "Import" ? "Note_import" : ""
                          }`}
                      >
                        <input
                          type="text"
                          style={{ width: "100%", border: "1px dashed #d0d7de" }}
                          value={item?.item_remark}
                          onChange={(e) =>
                            handleItemChange(index, "item_remark", e.target.value)
                          }
                          name="item_remark"
                          placeholder="Enter Discrepency Notes"
                        />
                      </div>

                    </td>

                    {/* ITEM PRICE */}
                    <td className={`table_column_item table_input_01  ${formData?.grn_type === "Import" ? "incom_12312" : ""
                      }`}>
                      <NumericInput
                        value={item?.rate}
                        readOnly={formData?.purchase_order_id}
                        placeholder="0.00"
                        onChange={(e) => {
                          let newValue = e.target.value;
                          if (newValue < 0) newValue = 0;
                          if (!isNaN(newValue) && newValue >= 0) {
                            handleItemChange(index, "rate", newValue);
                          } else {
                            toast("Amount cannot be negative", {
                              icon: "👏",
                              style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                                fontSize: "14px",
                              },
                            });
                          }
                        }}
                        className="item_text_end_01"
                      />

                      {/* image upload */}
                      <div id="formofcreateitems " style={{ marginTop: "37px" }}>
                        <form action="">
                          <div id="imgurlanddesc">
                            <ImageUploadGRN
                              formData={formData}
                              setFormData={setFormData}
                              setFreezLoadingImg={setFreezLoadingImg}
                              imgLoader={imgLoader}
                              setImgeLoader={setImgeLoader}
                              component="purchase"
                              type="grm"
                              index={index}
                            />
                          </div>
                        </form>
                      </div>
                    </td>


                    {/* PO QUANTITY */}
                    {formData?.purchase_order_id &&
                      formData?.purchase_order_id !== 0 ? (
                      <td className="table_column_item table_input_01">
                        <NumericInput value={item?.po_qty} readOnly />
                      </td>
                    ) : ("")}

                    {/* GRN QUANTITY */}
                    <td className="table_column_item table_input_01">
                      <NumericInput
                        value={item?.gr_qty}
                        placeholder="0"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue < 0) inputValue = 0;

                          if (inputValue > item?.po_qty && item?.po_qty) {
                            toast(
                              "GRN quantity is cannot grater than the Purchase Order Quantity.",
                              {
                                icon: "👏",
                                style: {
                                  borderRadius: "10px",
                                  background: "#333",
                                  fontSize: "14px",
                                  color: "#fff",
                                },
                              }
                            );
                          } else {
                            if (inputValue === "") {
                              handleItemChange(index, "gr_qty", 0); // or some other default value
                            } else {
                              const newValue = parseInt(inputValue, 10);
                              if (isNaN(newValue)) newValue = 0;
                              if (!isNaN(newValue) && newValue >= 1) {
                                handleItemChange(index, "gr_qty", newValue);
                              }
                            }
                          }
                        }} />
                    </td>


                    {/* CHARGES WEIGHT */}
                    <td className="table_column_item item_table_text_transform">
                      {item?.charges_weight
                        ? item?.charges_weight?.toFixed(2)
                        : 0}
                    </td>

                    {/* Unit Dropdown */}
                    <td className="table_column_item item_table_text_transform">
                      <CustomDropdown04
                        options={unitList}
                        value={item?.unit_id}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "unit_id",
                            e.target.value,
                            e.target.option
                          )
                        }
                        name="unit_id"
                        defaultOption="Units"
                        type="masters"
                        extracssclassforscjkls="extracssclassforscjklsitem"
                      />
                    </td>



                    {/* Tax Rate */}
                    {/* {console.log("item?.item?.tax_preference", item)} */}
                    <td className="table_column_item item_table_text_transform">
                      {item?.tax_name === "Non-Taxable" ? <span style={{ cursor: "not-allowed" }}>
                        {item?.tax_name}
                        {/* this is always shows Non-Taxable for items select */}
                      </span>
                        :
                        <>
                          <CustomDropdown004
                            options={tax_rate}
                            value={item?.tax_rate}
                            onChange={(e) =>
                              handleItemChange(index, "tax_rate", e.target.value)
                            }
                            name="tax_rate"
                            type="taxRate"
                            defaultOption="Taxes"
                            extracssclassforscjkls="extracssclassforscjklsitem"
                            className2="items"
                            item_data={formData?.is_purchase_order}
                            tax_rate={item?.tax_rate} />
                        </>}
                    </td>

                    {/*Old Tax Rate */}
                    {/* <td className="table_column_item table_input_01">
                      {item?.item_name === "" || item?.tax_rate == 0 ? (//it the selected row have no item name and no tax rate only we given the option of tax rate selection.
                        <CustomDropdown004
                          options={tax_rate}
                          value={item?.tax_rate}
                          onChange={(e) =>
                            handleItemChange(index, "tax_rate", e.target.value)
                          }
                          name="tax_rate"
                          type="taxRate"
                          defaultOption="Taxes"
                          extracssclassforscjkls="extracssclassforscjklsitem"
                          item_data={formData?.is_purchase_order}
                          tax_rate={item?.tax_rate}
                        />
                      ) : (
                        <span style={{ cursor: "not-allowed" }}>
                          {item?.tax_name === "Non-Taxable"
                            ? item?.tax_name
                            : item?.tax_rate}
                        </span>
                      )}
                    </td> */}

                    {/* Custom Duty*/}
                    {formData?.grn_type === "Import" && (
                      <td className="table_column_item table_input_01 ">
                        {formData?.grn_type === "Import" && (
                          <CustomDropdown004
                            options={tax_rate}
                            value={item?.custom_duty}
                            onChange={(e) =>
                              handleItemChange(index, "custom_duty", e.target.value)
                            }
                            name="custom_duty"
                            type="taxRate"
                            defaultOption="Duties"
                            extracssclassforscjkls="extracssclassforscjklsitem"
                            tax_rate={item?.tax_rate}
                          />
                        )}
                      </td>
                    )}
                    {/* Amount */}
                    <td className="table_column_item table_input_01">
                      <NumericInput
                        value={item?.final_amount}
                        placeholder="0.00"
                        onChange={(e) =>
                          handleItemChange(index, "final_amount", e.target.value)
                        }
                        readOnly
                        className="item_text_end_01"
                      />
                    </td>

                    {/* reload and remove butttons */}
                    <td className="table_column_item refresh_remove_button_item">

                      {formData?.items?.length > 1 ? (
                        <>
                          <button
                            className="refresh_remove_button_item"
                            type="button"
                            onClick={() => handleItemRemove(index)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleItemRemove(index);
                              }
                            }}
                          >
                            <RxCross2 className="react_icn_items" />
                          </button>

                        </>
                      ) : (
                        <>
                          <button
                            className="refresh_remove_button_item"
                            type="button"
                            onClick={() => handleGRNReset(index)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleGRNReset(index);
                              }
                            }}
                          >
                            <SlReload />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  {/* Validation Errors */}
                  <tr className="error-row">
                    <td colSpan={9} style={{ textTransform: "capitalize" }}>
                      {itemErrors[index]?.item_name && (
                        <span className="error-message">
                          {otherIcons.error_svg} {itemErrors[index].item_name}
                        </span>
                      )}
                      {itemErrors[index]?.rate && (
                        <span className="error-message">
                          {otherIcons.error_svg} {itemErrors[index].rate}
                        </span>
                      )}

                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {/* Table End */}



          <button
            id="additembtn45srow"
            type="button"
            onClick={handleItemAdd}
            ref={buttonRef1}
          >
            Add New Row
            <GoPlus />
          </button>
        </>
        <>

          {/*Charges Table Started */}
          <table className="itemTable_01" id="modidy_table_form_grn_charges">
            <thead className="table_head_item_02">
              <tr className="table_head_item_02_row">

                <th className="table_column_item item_table_width_01">
                  CHARGES TYPE<b className="color_red">*</b>
                </th>
                <th className="table_column_item item_table_width_01">
                  SELECT VENDOR <b className="color_red">*</b>
                </th>

                <th className="table_column_item item_text_end_01 table_input_01">
                  AMOUNT
                </th>

                <th className="table_column_item table_input_01" >
                  REMARK
                </th>
                <th className="table_column_item item_table_width_01">
                  ATTACHAMENT
                </th>

              </tr>
            </thead>
            {/* {console.log("formData", formData?.items)} */}
            <tbody className="table_head_item_02">
              {formData?.charges_type?.map((item, index) => (
                <React.Fragment key={index}>

                  <tr className="table_head_item_02_row">

                    {/* charges type */}
                    <td className="table_column_item item_table_text_transform">

                      <CustomDropdown15
                        style={{ paddingLeft: 0 }}
                        label="Expense Account"
                        options={accountList?.data?.accounts || []}
                        value={item?.account_id}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "account_id",
                            e.target.value,
                            e.target.option
                          )
                        }
                        data={item?.account}
                        name="account_id"
                        defaultOption="Select Expense Account"
                        extracssclassforscjkls="extracssclassforscjkls_grn"
                        index={index}
                      />
                    </td>

                    {/* Select vendor */}
                    <td className="table_column_item">
                      <CustomDropdown10
                        label="Select vendor"
                        options={vendorList?.data?.user?.filter(
                          (val) => val?.active == "1"
                        )}
                        value={item?.vendor_id}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "vendor_id",
                            e.target.value,
                            e.target.option
                          )
                        }

                        cusData={item?.vendor}
                        name="vendor_id"
                        defaultOption="Select Vendor Name"
                        sd154w78s877="extracssclassforscjkls_grn"
                        setcusData={setcusData}
                        type="vendor"
                        required
                      />
                    </td>

                    {/* Amount */}
                    <td className="table_column_item table_input_01 item_text_end_01">

                      <NumericInput
                        value={item?.amount}
                        placeholder="0.00"
                        onChange={(e) => {
                          let newValue = e.target.value;
                          if (newValue < 0) newValue = 0;
                          if (!isNaN(newValue) && newValue >= 0) {
                            handleItemChange(index, "amount", newValue);
                          } else {
                            toast("Amount cannot be negative", {
                              icon: "👏",
                              style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                                fontSize: "14px",
                              },
                            });
                          }
                        }}

                        className="item_text_end_01"
                      />
                    </td>

                    {/* Remark */}
                    <td className="table_column_item table_input_01">
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        value={item?.remarks}
                        onChange={(e) => {
                          let newValue = e.target.value;
                          handleItemChange(index, "remarks", newValue);
                        }}
                        name="remarks"
                        placeholder="Remark"
                      />
                    </td>


                    {/* ATTACHAMENT */}
                    <td className="table_column_item item_table_text_transform">

                      {/* <div id="formofcreateitems " style={{ marginTop: "37px" }}> */}
                      <form action="">
                        <div id="imgurlanddesc">
                          <ImageUploadGRN
                            formData={formData}
                            setFormData={setFormData}
                            setFreezLoadingImg={setFreezLoadingImg}
                            imgLoader={imgLoader}
                            setImgeLoader={setImgeLoader}
                            component="purchase"
                            type="grm_charge"
                            index={index}
                          />
                        </div>
                      </form>
                      {/* </div> */}
                    </td>



                    {/* reload and remove butttons */}
                    <td className="table_column_item refresh_remove_button_item">

                      {formData?.charges_type?.length > 1 ? (
                        <>
                          <button
                            className="refresh_remove_button_item"
                            type="button"
                            onClick={() => handleChargeRemove(index)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleChargeRemove(index);
                              }
                            }}
                          >
                            <RxCross2 className="react_icn_items" />
                          </button>

                        </>
                      ) : (
                        <>
                          <button
                            className="refresh_remove_button_item"
                            type="button"
                            onClick={() => handleGRNReset(index)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleGRNReset(index);
                              }
                            }}
                          >
                            <SlReload />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  {/* Validation Errors */}
                  <tr className="error-row">
                    <td colSpan={9} style={{ textTransform: "capitalize" }}>
                      {itemErrors[index]?.item_name && (
                        <span className="error-message">
                          {otherIcons.error_svg} {itemErrors[index].item_name}
                        </span>
                      )}
                      {itemErrors[index]?.rate && (
                        <span className="error-message">
                          {otherIcons.error_svg} {itemErrors[index].rate}
                        </span>
                      )}

                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {/* Table End */}



          {!itemErrors && (
            <p className="error-message">
              {otherIcons.error_svg}
              Please Select An Item
            </p>
          )}

          <button
            id="additembtn45srow"
            type="button"
            onClick={handleChargesAdd}
            ref={buttonRef}
          >
            Add New Row
            <GoPlus />
          </button>
        </>

        <div className="height5"></div>
        <div className="secondtotalsections485s">
          {note ? (
            <div className="textareaofcreatqsiform">
              <label>Customer Note</label>
              <div className="show_no_of_text_limit_0121">
                <TextAreaComponentWithTextLimit
                  formsValues={{ handleChange, formData }}
                  placeholder="Will be displayed on the estimate"
                  name="customer_note"
                  value={formData?.customer_note}
                />
              </div>
            </div>
          ) : (
            <div className="textareaofcreatqsiform">
              <label>Vendor Note</label>
              <div className="show_no_of_text_limit_0121">
                <TextAreaComponentWithTextLimit
                  formsValues={{ handleChange, formData }}
                  placeholder="Will be displayed on the estimate"
                  name="vendor_note"
                  value={formData?.vendor_note}
                />
              </div>
            </div>
          )}

          <div className="calctotalsection">
            <div className="calcuparentc">
              <div className="clcsecx12s1">
                <label>Subtotal:</label>
                <NumericInput
                  value={formData.subtotal}
                  readOnly
                  placeholder="0.00"
                  className="inputsfocalci465s"
                />
              </div>

              {/* Add expense changes */}
              <div className="clcsecx12s1">
                <label>
                  <p className="edit_changes_021" onClick={openExpenseCharges}>
                    {" "}
                    Edit and add charges{" "}
                    {openCharges
                      ? otherIcons?.down_arrow_svg
                      : otherIcons?.up_arrow_svg}
                  </p>
                </label>
              </div>

              {openCharges && (
                <ExpenseCharges
                  formValues={{ formData, setFormData, handleChange }}
                />
              )}
            </div>

            <div className="clcsecx12s2">
              <label>Total Tax:</label>
              <input
                type="text"
                value={formData?.tax_amount}
                readOnly
                placeholder="0.00"
                className="inputsfocalci465s"
              />
            </div>
            <div className="clcsecx12s2">
              <label>Total ({currencySymbol}):</label>
              <input
                type="text"
                value={formData?.total}
                readOnly
                placeholder="0.00"
              />
              {/* <span>{(+formData?.total)}</span> */}
            </div>

            <div className="clcsecx12s2">
              <label>Total Charges ({currencySymbol}):</label>
              <input
                type="text"
                value={formData.total_grn_charges}
                readOnly
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div className="breakerci"></div>
        <div className="height5"></div>
      </div>
    </>
  );
};