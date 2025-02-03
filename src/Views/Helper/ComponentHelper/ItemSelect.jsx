import React, { useEffect, useMemo, useRef, useState } from "react";
import { itemLists } from "../../../Redux/Actions/listApisActions";
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


import CustomDropdown13 from "../../../Components/CustomDropdown/CustomDropdown13";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown26 from "../../../Components/CustomDropdown/CustomDropdown26";
import useFetchApiData from "./useFetchApiData";

import {
  sendData,
  ShowMasterData,
  ShowUserMasterData,
} from "../HelperFunctions";
import TextAreaComponentWithTextLimit from "./TextAreaComponentWithTextLimit";
import ExpenseCharges from "./ExpenseCharges";
import AddOtherPopup from "../../Invoices/AddOtherPopup";
import AddCarHirePopup from "../../Invoices/AddCarHirePopup";
import AddHotelPopup from "../../Invoices/AddHotelPopup";
import AddFlightPopup from "../../Invoices/AddFlightPopup";
import AddVisaPopup from "../../Invoices/AddVisaPopup";
import AddInsurancePopup from "../../Invoices/AddInsurancePopup";
import AddAssistPopup from "../../Invoices/AddAssistPopup";
import CustomDropdown28 from "../../../Components/CustomDropdown/CustomDropdown28";
import { getCurrencySymbol } from "./ManageStorage/localStorageUtils";
import { useLocation } from "react-router-dom";

const ItemSelect = ({
  formData,
  setFormData,
  handleChange,
  itemErrors,
  setItemErrors,
  extracssclassforscjkls,
  dropdownRef2,
  note,
  invoice_section,
}) => {
  const itemList = useSelector((state) => state?.itemList);
  const productType = useSelector((state) => state?.type);
  const [itemData, setItemData] = useState(false);

  // console.log("itemErrors")

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const currencySymbol = getCurrencySymbol();
  // console.log("currencySymbole", currencySymbole)
  const isIdEqualState = useSelector((state) => state?.isIdReducer);
  const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const [taxDetails, setTaxDetails] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const unitList = ShowMasterData("2");
  const itemTypeList = ShowMasterData("5");

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useOutsideClick(dropdownRef, () => setOpenDropdownIndex(null));

  const calculateTotalDiscount = (items) => {
    return items?.reduce(
      (acc, item) => acc + (parseFloat(item?.discount) || 0),
      0
    );
  };

  //set all the values of items// when do any changes in items
  useEffect(() => {
    const newItems = [...formData?.items];
    const newCharges = [...formData?.charges];

    // Calculate total discount
    const totalDiscount = calculateTotalDiscount(newItems);

    // Calculate total tax amount (Sum of all tax_amount fields)
    const tax_amount = newItems?.reduce(
      (acc, item) => acc + parseFloat(item?.tax_amount || 0),
      0
    );

    const gross_amount = newItems?.reduce(
      (acc, item) => acc + parseFloat(item?.gross_amount || 0),
      0
    );

    // Calculate total charges
    const total_charges = newCharges?.reduce((acc, item) => {
      const amount =
        item?.amount && !isNaN(item?.amount) ? parseFloat(item?.amount) : 0;
      return acc + amount;
    }, 0);

    // Calculate subtotal (Sum of all final_amount fields)
    const subtotal = newItems?.reduce((acc, item) => {
      const finalAmount = parseFloat(item?.final_amount || 0);
      return acc + (isNaN(finalAmount) ? 0 : finalAmount);
    }, 0);

    // Calculate overall total
    const total =
      subtotal +
      (parseFloat(formData.shipping_charge) || 0) +
      (parseFloat(formData.adjustment_charge) || 0) +
      (parseFloat(tax_amount) || 0) +
      (parseFloat(total_charges) || 0);

    // Update Tax Details (SGST/CGST or IGST)
    const taxes = [];

    newItems.forEach((item, index) => {
      if (item?.tax_name === "Taxable" && item?.tax_rate) {
        const grossAmount = item?.gross_amount || 0;

        let applicableTaxRate = item?.tax_rate;

        if (isIdEqualState?.isId && index > 0) {
          // Compare HSN code with the previous item
          const previousItem = newItems[index - 1];
          if (item?.hsn_code === previousItem?.hsn_code) {
            applicableTaxRate = previousItem?.tax_rate;
          }
        }

        if (isIdEqualState?.isId) {
          // Calculate SGST and CGST
          const sgstRate = applicableTaxRate / 2;
          const cgstRate = applicableTaxRate / 2;
          const sgstAmount = (grossAmount * sgstRate) / 100;
          const cgstAmount = (grossAmount * cgstRate) / 100;

          // Check if the tax group already exists
          const existingTax = taxes.find(
            (tax) => tax.CGST === cgstRate && tax.SGST === sgstRate
          );

          if (existingTax) {
            // Add amounts to existing tax group
            existingTax.CGSTAmount += cgstAmount;
            existingTax.SGSTAmount += sgstAmount;
          } else {
            // Add a new tax group
            taxes.push({
              CGST: cgstRate,
              SGST: sgstRate,
              CGSTAmount: cgstAmount,
              SGSTAmount: sgstAmount,
            });
          }
        } else {
          // Calculate IGST
          const igstAmount = (grossAmount * applicableTaxRate) / 100;

          // Check if the tax group already exists
          const existingTax = taxes.find(
            (tax) => tax.IGST === applicableTaxRate
          );

          if (existingTax) {
            // Add amount to existing IGST group
            existingTax.IGSTAmount += igstAmount;
          } else {
            // Add a new IGST group
            taxes.push({
              IGST: applicableTaxRate,
              IGSTAmount: igstAmount,
            });
          }
        }
      }
    });

    setTaxDetails(taxes); // Update the tax details state

    // Update formData with calculated totals
    setFormData((prevFormData) => ({
      ...prevFormData,
      discount: totalDiscount,
      subtotal: subtotal?.toFixed(2),
      total_tax: tax_amount?.toFixed(2),
      tax_amount: tax_amount?.toFixed(2),
      total_charges: total_charges?.toFixed(2),
      total: total?.toFixed(2),
      taxes: taxes,
      tax_rate: tax_rate,
      total_gross_amount: gross_amount,
    }));

  }, [
    formData.items, // Re-calculate when items change
    formData.shipping_charge, // Re-calculate when shipping charges change
    formData.adjustment_charge, // Re-calculate when adjustment charges change
    formData.charges, // Re-calculate when charges change
    isIdEqualState, // Re-calculate when isIdEqualState changes
  ]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    const newErrors = [...itemErrors];

    newItems[index][field] = value;
    const item = newItems[index];

    let discountAmount = 0;
    let discountPercentage = 0;

    if (field === "item_name") {
      newItems[index].item_name = value;
      newItems[index].item_id = 0;
      newItems[index].hsn_code = "";
      newErrors[index].item_id = 0;
      newErrors[index].item_name = "";
    }

    if (field === "discount_type") {
      newItems[index].discount = 0;
    }

    if (field === "unit_id") {
      newItems[index].unit_id = value;
      // newErrors[index].unit_id = "";
    }
    if (field === "type") {
      newItems[index].type = value;
      // newErrors[index].type = "";
    }
    if (field === "taxRate") {
      newItems[index].tax_rate = value;
      newErrors[index].tax_rate = "";
    }

    if (field === "item_id") {
      const selectedItem = itemList?.data?.item?.find(
        (item) => item?.id == value
      );
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

    if (field === "quantity" || field === "rate") {
      newItems[index].gross_amount = +item?.rate * +item?.quantity;
      // newErrors[index].rate = "";
    }

    const grossAmount = item?.rate * item?.quantity;
    const taxAmount = (grossAmount * item?.tax_rate) / 100;
    if (item?.discount_type == 1) {
      discountAmount = Math.min(item?.discount, grossAmount);
    } else if (item?.discount_type == 2) {
      discountPercentage = Math.min(item?.discount, 100);
    }

    const discount =
      item?.discount_type == 1
        ? discountAmount
        : (grossAmount * discountPercentage) / 100;
    const finalAmount = grossAmount - discount;

    newItems[index].final_amount = finalAmount?.toFixed(2); // Round to 2 decimal places
    newItems[index].tax_amount = taxAmount?.toFixed(2); // For calculate tax amount


    // Check if all previous items have valid item_name
    const firstEmptyRowIndex = formData?.items.findIndex(
      (item) => !(item.item_name && item.item_name.trim()) && !(item?.service_data?.service_name && item?.service_data?.service_name.trim())
    );

    // add new empty at the end of row when item is selected 
    const finalItems = firstEmptyRowIndex === -1 ? [...newItems, { item_name: "", service_name: "", discount_type: 1, quantity: 1, discount: 0, tax_rate: 0 }] : newItems;

    setFormData((prevFormData) => ({
      ...prevFormData,
      items: finalItems,
    }));
    setItemErrors(newErrors);
  };

  const handleItemRemove = (index) => {
    const newItems = formData.items.filter((item, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemReset = (index) => {
    setSearchTrigger((prev) => prev + 1);
    const newItems = [...formData?.items];
    newItems[index] = {
      item_id: 0,
      item_name: "",
      quantity: 1,
      hsn_code: "",
      gross_amount: 0,
      rate: 0,
      unit_id: 0,
      type: "",
      final_amount: 0,
      tax_amount: 0,
      tax_rate: 0,
      tax_amount: 0,
      discount: 0,
      discount_type: 1,
      item_remark: 0,
    };
    const newErrors = [...itemErrors]; // Assuming itemErrors is your error state
    newErrors[index] = {}; // Clear errors for the specific item at this index

    const taxAmount = newItems?.reduce(
      (acc, item) => acc + parseFloat(item?.tax_amount || 0),
      0
    );
    const subtotal = newItems?.reduce(
      (acc, item) => acc + parseFloat(item?.final_amount || 0),
      0
    );
    const total =
      subtotal +
      parseFloat(formData.shipping_charge || 0) +
      parseFloat(formData.adjustment_charge || 0);

    setFormData({
      ...formData,
      items: newItems,
      subtotal: subtotal?.toFixed(2),
      total: total?.toFixed(2),
      tax_amount: taxAmount?.toFixed(2),
    });

    setItemErrors(newErrors);
  };

  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleItemAdd = () => {
    // if type is not selected or undedined then we can not add new row

    const isTypeNull =
      formData?.items?.length > 0 &&
      formData.items[formData.items.length - 1]?.type !== "" &&
      formData.items[formData.items.length - 1]?.item_name !== "";

    // console.log(formData?.items)
    if (!isTypeNull) {
      toast.error("Please select the type and valid item name of above row");
      return;
    }

    setSearchTrigger((prev) => prev + 1);
    const newItems = [
      ...formData.items,
      {
        item_id: 0,
        item_name: "",
        quantity: 1,
        unit_id: 0,
        hsn_code: "",
        type: "",
        gross_amount: 0,
        rate: 0,
        final_amount: 0,
        tax_amount: 0,
        tax_rate: 0,
        tax_amount: 0,
        discount: 0,
        discount_type: 1,
        item_remark: "",
        tax_name: "",
        items_data: null,
      },
    ];
    const newErrors = [
      ...itemErrors,
      {}, // Add an empty error object for the new item
    ];
    setItemErrors(newErrors);
    setFormData({ ...formData, items: newItems });
  };

  useEffect(() => {
    return handleKeyPress(buttonRef, handleItemAdd);
  }, [buttonRef, handleItemAdd]);

  const [openCharges, setOpenCharges] = useState(false);
  const openExpenseCharges = () => {
    setOpenCharges(!openCharges);
  };

  // show only products items for sales module
  // const options2 = note === "customer" && itemList?.data?.item?.filter((val) => val.type === "Product") || itemList?.data?.item
  const options2 = itemList?.data?.item;

  //for call api when we add new row after searching. and type Product for all sales modules...
  const dispatch = useDispatch();
  const itemPayloads = localStorage.getItem("itemPayload");

  useEffect(() => {
    const parshPayload = JSON?.parse(itemPayloads);

    if (parshPayload?.search) {
      dispatch(
        itemLists({
          ...sendData,
          ...productType,
          noofrec: 20,
        })
      );
    }
  }, [searchTrigger, productType]);

  // call item api on page load...
  const payloadGenerator = useMemo(
    () => () => ({
      //useMemo because  we ensure that this function only changes when [dependency] changes
      ...sendData,
      ...productType,
    }),
    [productType]
  );

  useFetchApiData(itemLists, payloadGenerator, [productType]); //call api common function

  // for service select code..............................................
  const servicesList = ShowUserMasterData("48");
  useOutsideClick(dropdownRef, () => setOpenDropdownIndex(null));

  const [activePopup, setActivePopup] = useState(null);
  // console.log("activePopupactivePopup", activePopup)

  const [showAddModal, setShowAddModal] = useState(false);

  const handleSelectService = (e) => {
    const { value } = e.target;
    setActivePopup({ popupType: value });
  };

  const handleAddService = (data) => {
    // Check if there's an empty type in the existing rows
    const isTypeNull = formData?.items?.find(
      (val) => val?.type === "" && val?.item_name
    );
    if (isTypeNull) {
      toast.error(
        "Please select the type and valid item name of the above row"
      );
      return;
    }
    const newItem = {
      tax_name: "",
      item_name: data?.service_name,
      quantity: 1,
      rate: parseFloat(data?.gross_amount || 0),
      tax_rate: data?.tax_percent || 0,
      tax_amount: parseFloat(data?.tax_amount),
      discount: 0,
      gross_amount: parseFloat(data?.gross_amount) * 1,
      final_amount: parseFloat(data?.gross_amount).toFixed(2),
      discount_type: 1,
      item_id: 0,
      type: "Service",
      service_data: data,
      is_service: 1
    };


    const firstEmptyRowIndex = formData?.items.findIndex(
      (item) =>
        !(item.item_name && item.item_name.trim()) &&
        !(item?.service_data?.service_name && item?.service_data?.service_name.trim())
    );

    // Determine whether to add or update rows
    const updatedItems =
      activePopup?.index !== undefined
        ? formData.items.map((item, idx) =>
          idx === activePopup.index
            ? { ...item, ...newItem } // Update the row being edited
            : item
        )
        : firstEmptyRowIndex !== -1
          ? formData.items.map((item, idx) =>
            idx === firstEmptyRowIndex
              ? { ...item, ...newItem } // Update the first empty row
              : item
          )
          : [...formData.items, newItem]; // Add a new row if no empty rows exist

    // Add an empty row only if you're not editing
    const finalItems =
      activePopup?.index === undefined
        ? [...updatedItems, { item_name: "", service_name: "", discount_type: 1, discount: 0, quantity: 1, tax_rate: 0 }]
        : updatedItems;

    // Save the updated list back to formData
    setFormData({ ...formData, items: finalItems });
  };


  // console.log("iteererere", formData?.items)

  const renderPopup = () => {
    if (!activePopup) return null;

    const { popupType } = activePopup;

    switch (popupType) {
      case "Hotels":
        return (
          <AddHotelPopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
            edit_data={activePopup?.data || []}
          />
        );

      case "Flights":
        return (
          <AddFlightPopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
            edit_data={activePopup?.data || []}
          />
        );

      case "Visa":
        return (
          <AddVisaPopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
            edit_data={activePopup?.data || []}
          />
        );

      case "Insurance":
        return (
          <AddInsurancePopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
            edit_data={activePopup?.data || []}
          />
        );
      case "Car Hire":
        return (
          <AddCarHirePopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
            edit_data={activePopup?.data || []}
          />
        );

      case "Assist":
        return (
          <AddAssistPopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
            edit_data={activePopup?.data || []}
          />
        );

      case "Others":
        return (
          <AddOtherPopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
            edit_data={activePopup?.data || []}
          />
        );
      default:
        return null;
    }
  };


  return (
    <>
      {renderPopup()}

      <div className="f1wrpofcreqsx2" id={invoice_section}>

        {/* Table Started */}
        <table className="itemTable_01">
          <thead className="table_head_item_02">
            <tr className="table_head_item_02_row">
              <th className="table_column_item item_table_width_01">
                Item / Service<b className="color_red">*</b>
              </th>
              <th className="table_column_item item_table_width_03">
                Type <b className="color_red">*</b>
              </th>

              <th className="table_column_item item_text_end_01 item_table_width_02">
                Sales Price
              </th>

              <th className="table_column_item item_qty_01 item_table_width_02">
                Quantity
              </th>
              <th className="table_column_item item_table_width_02">
                Unit
              </th>
              <th className="table_column_item item_table_width_03">
                Discount
              </th>
              <th className="table_column_item item_table_width_02">
                Tax (%)
              </th>
              <th className="table_column_item item_table_width_02 item_text_end_01">Amount {currencySymbol} </th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          {/* {console.log("formData", formData?.items)} */}
          <tbody className="table_head_item_02">
            {formData?.items?.map((item, index) => (
              <React.Fragment key={index}>
                <tr className="table_head_item_02_row">
                  {/* Item Details */}
                  <td className="table_column_item item_table_width_01 item_table_text_transform">

                    <CustomDropdown26
                      options={options2 || []}
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
                      service_data={item?.service_data}
                    />
                  </td>

                  {/* Type Dropdown */}
                  <td className="table_column_item item_table_text_transform item_table_width_02">
                    <span>
                      <CustomDropdown04
                        options={itemTypeList}
                        value={item?.type}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "type",
                            e.target.value,
                            e.target.option
                          )
                        }
                        name="type"
                        defaultOption="Type"
                        type="item_type"
                        extracssclassforscjkls="extracssclassforscjklsitem"
                        style={{ fontSize: "11px" }}
                        item_data={item}
                      />
                    </span>
                  </td>

                  {/* Sales Price */}
                  <td className="table_column_item table_input_01">
                    <NumericInput
                      value={item?.rate}
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
                  </td>

                  {/* Quantity */}
                  <td className="table_column_item table_input_01">

                    <NumericInput
                      value={item?.quantity}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue === "") {
                          handleItemChange(index, "quantity", 0);
                        } else {
                          const newValue = parseInt(inputValue, 10);
                          if (isNaN(newValue)) newValue = 0;
                          if (newValue >= 1) {
                            handleItemChange(index, "quantity", newValue);
                          }
                        }
                      }}
                      disabled={item?.is_service == 1}
                      style={{
                        cursor:
                          item?.is_service == 1 ? "not-allowed" : "default",
                      }}
                    />
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
                      item_data={item}
                    />
                  </td>

                  {/* Discount */}
                  <td className="table_column_item table_input_01 ">
                    <div className="discount_type_dropdown">
                      <NumericInput
                        value={item?.discount}
                        onChange={(e) => {
                          let newValue = e.target.value;
                          if (newValue < 0) newValue = 0;
                          if (item?.discount_type == 2) {
                            newValue = Math.min(newValue, 100);
                            if (newValue === 100) {
                              // Use toast here if available
                              toast("Discount percentage cannot exceed 100%.", {
                                icon: "👏",
                                style: {
                                  borderRadius: "10px",
                                  background: "#333",
                                  fontSize: "14px",
                                  color: "#fff",
                                },
                              });
                            }
                          } else {
                            newValue = Math.min(
                              newValue,
                              item?.rate * item?.quantity +
                              (item?.rate * item?.tax_rate * item?.quantity) /
                              100
                            );
                            if (newValue > item?.rate * item?.quantity) {
                              toast(
                                "Discount amount cannot exceed the final amount.",
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
                            }
                          }
                          handleItemChange(index, "discount", newValue);
                        }}
                      />
                      <div
                        className="dropdownsdfofcus56s"
                        onClick={() => handleDropdownToggle(index)}
                      >
                        {item?.discount_type == 1
                          ? currencySymbol
                          : item?.discount_type == 2
                            ? "%"
                            : ""}
                        {openDropdownIndex === index && (
                          <div
                            className="dropdownmenucustomx1"
                            ref={dropdownRef}
                          >
                            <div
                              className="dmncstomx1"
                              onClick={() =>
                                handleItemChange(index, "discount_type", 1)
                              }
                            >
                              {currencySymbol}
                            </div>
                            <div
                              className="dmncstomx1"
                              onClick={() =>
                                handleItemChange(index, "discount_type", 2)
                              }
                            >
                              %
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* {console.log("item?.tax_rate", item?.tax_rate)} */}

                  {/* Tax Rate */}
                  {/* {console.log("item?.item?.tax_preference", item)} */}
                  <td className="table_column_item item_table_text_transform">
                    {item?.tax_name === "Non-Taxable" ? <span style={{ cursor: "not-allowed" }}>
                      {item?.tax_name}
                      {/* this is always shows Non-Taxable for items select */}
                    </span>
                      :
                      <>
                        <CustomDropdown13
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
                          tax_rate={item?.tax_rate}
                        />
                      </>}
                  </td>
                  {/* <td className="table_column_item item_table_text_transform">
                    {item?.item_name === "" || item?.tax_rate == 0 ? (//it the selected row have no item name and no tax rate only we given the option of tax rate selection.
                      <CustomDropdown13
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

                  {/* Amount */}
                  <td className="table_column_item item_table_width_02 item_text_end_01 item_table_text_transform">
                    {item?.final_amount}
                  </td>

                  {/* reload and remove butttons */}
                  <td className="table_column_item refresh_remove_button_item">
                    {item?.is_service == 1 &&
                      <button
                        className="refresh_remove_button_item"
                        type="button"
                        onClick={() => setActivePopup({ popupType: item?.service_data?.service_name, index, data: item })}//set index and data in active popup
                      >
                        <FiEdit className="react_icn_items" />
                      </button>
                    }

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
                          onClick={() => handleItemReset(index)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleItemReset(index);
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

        <div className="items_services_add_buttons">
          <button
            id="additembtn45srow"
            type="button"
            onClick={handleItemAdd}
            ref={buttonRef}
          >
            Add New Row
            <GoPlus />
          </button>

          <div className="form_commonblock">
            <span style={{ width: "200px" }}>
              {otherIcons.name_svg}
              <CustomDropdown28
                label="Services"
                options={servicesList}
                value={activePopup?.popupType}
                onChange={(e) => handleSelectService(e)}
                name="service"
                defaultOption="Select Service"
                type="service"
              />
            </span>
          </div>
        </div>

        {showAddModal && (
          <div className="mainxpopups1" ref={popupRef} tabIndex="0">
            <div className="popup-content">
              <span
                className="close-button"
                onClick={() => setShowAddModal(false)}
              >
                <RxCross2 />
              </span>
              <h2>Add Services</h2>

              <div className="midpopusec12x" style={{ minHeight: "300px" }}>
                <CustomDropdown28
                  label="Services"
                  options={servicesList}
                  value={formData?.service}
                  onChange={(e) => handleSelectService(e)}
                  name="service"
                  defaultOption="Add Services"
                  type="service"
                />
              </div>
            </div>
          </div>
        )}
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
                  value={
                    formData?.customer_note == 0 ? "" : formData?.customer_note
                  }
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
                  value={formData.vendor_note == 0 ? "" : formData.vendor_note}
                />
              </div>
            </div>
          )}

          <div className="calctotalsection">
            <div className="clcsecx12s2">
              <label>Subtotal: ({currencySymbol}):</label>
              <input
                type="text"
                value={formData?.subtotal}
                readOnly
                placeholder="0.00"
              />
            </div>
            <div className="calcuparentc">
              <div id="tax-details">
                <div className="clcsecx12s1">
                  <label>Total Tax ({currencySymbol}):</label>
                  <input
                    type="text"
                    value={formData?.tax_amount}
                    readOnly
                    placeholder="0.00"
                    className="inputsfocalci465s"
                  />
                </div>

                {/* for showing cgst/sgst and taxes at change the gst type for 1 show tax rates and for 2 show cgst/sgst */}
                {/* {gstType == 2 ? <>
    <div className='clcsecx12s1'>
        <label>Total Tax ({currencySymbol}):</label>
        <input
            type="text"
            value={formData?.tax_amount}
            readOnly
            placeholder='0.00'
            className='inputsfocalci465s'
        />
    </div>
</>
    :
    <>

        {isIdEqualState?.isId
            ? taxDetails?.map((tax, idx) => (
                <div key={idx} id="">
                    <div className='clcsecx12s1'>
                        <label>CGST [{tax?.CGST}%]:</label>
                        <span className='inputsfocalci465s'>{tax?.CGSTAmount?.toFixed(2)}</span>

                    </div>
                    <div className='clcsecx12s1'>
                        <label>SGST [{tax?.SGST}%]:</label>
                        <span className='inputsfocalci465s'>{tax?.SGSTAmount?.toFixed(2)}</span>
                    </div>
                </div>
            ))
            :
            <>
                <div className='clcsecx12s1'>
                    <label>Total Tax ({currencySymbol}):</label>
                    <input
                        type="text"
                        value={formData?.tax_amount}
                        readOnly
                        placeholder='0.00'
                        className='inputsfocalci465s'
                    />
                </div>
            </>
        }
    </>
} */}
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
              <label>Total ({currencySymbol}):</label>
              <input
                type="text"
                value={formData?.total}
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
export default ItemSelect;