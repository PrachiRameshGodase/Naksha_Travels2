import React, { useEffect, useMemo, useRef, useState } from "react";
import { accountLists, itemLists } from "../../../Redux/Actions/listApisActions";
import { useDispatch, useSelector } from "react-redux";
import NumericInput from "../NumericInput";
import toast from "react-hot-toast";
import useOutsideClick from "../PopupData";
import { SlReload } from "react-icons/sl";
import { handleKeyPress } from "../KeyPressInstance";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { otherIcons } from "../SVGIcons/ItemsIcons/Icons";
import { ImageUploadGRN } from "./ImageUpload";
import CustomDropdown15 from "../../../Components/CustomDropdown/CustomDropdown15";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import CustomDropdown10 from "../../../Components/CustomDropdown/CustomDropdown10";
import CustomDropdown13 from "../../../Components/CustomDropdown/CustomDropdown13";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown26 from "../../../Components/CustomDropdown/CustomDropdown26";
import useFetchApiData from './useFetchApiData';

import {
  activeOrg_details,
  currencySymbol,
  parseJSONofString,
  sendData,
  ShowMasterData,
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

  const gstType = activeOrg_details?.tax_type;

  const isIdEqualState = useSelector((state) => state?.isIdReducer);
  const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const [taxDetails, setTaxDetails] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const unitList = ShowMasterData("2");
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
      newItems[index].item_id = "";
      newItems[index].hsn_code = "";
      newErrors[index].item_id = "";
      newErrors[index].item_name = "";
    }

    if (field === "discount_type") {
      newItems[index].discount = 0;
    }

    if (field === "unit_id") {
      newItems[index].unit_id = value;
      newErrors[index].unit_id = "";
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

        if (selectedItem.tax_preference == "1") {
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
          item_id: "",
          item_name: "",
          tax_rate: "",
          unit_id: "",
          rate: "",
        };
      }
    }

    if (field === "quantity" || field === "rate") {
      newItems[index].gross_amount = +item?.rate * +item?.quantity;
      newErrors[index].rate = "";
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

    setFormData((prevFormData) => ({
      ...prevFormData,
      items: newItems,
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
      item_id: "",
      item_name: "",
      quantity: 1,
      hsn_code: "",
      gross_amount: 0,
      rate: 0,
      unit_id: null,
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
    setSearchTrigger((prev) => prev + 1);
    const newItems = [
      ...formData.items,
      {
        item_id: "",
        item_name: "",
        quantity: 1,
        unit_id: null,
        hsn_code: "",
        type: "",
        gross_amount: null,
        rate: null,
        final_amount: null,
        tax_amount: null,
        tax_rate: null,
        tax_amount: 0,
        discount: 0,
        discount_type: 1,
        item_remark: null,
        tax_name: "",
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
    const parshPayload = parseJSONofString(itemPayloads);

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
  const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
    ...sendData,
    ...productType,
  }), [productType]);

  useFetchApiData(itemLists, payloadGenerator, [productType]);//call api common function



  // for service select code..............................................


  const servicesList = ShowMasterData("48");


  useOutsideClick(dropdownRef, () => setOpenDropdownIndex(null));


  const [activePopup, setActivePopup] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleSelectService = (e) => {
    const { value } = e.target;
    setActivePopup({ popupType: value });
  };

  const handleAddService = (name, data) => {
    const itemName =
      name === "Hotel"
        ? data?.hotel_name
        : name === "Flight"
          ? data?.airline_name
          : name === "Assist"
            ? data?.airport_name
            : name === "Insurance"
              ? data?.company_name
              : name === "Visa"
                ? data?.passport_no
                : name === "CarHire"
                  ? data?.vehicle_type_id
                  : name === "Other"
                    ? data?.item_name
                    : "";
    const item_data = {
      item_name: itemName,
      tax_name: "",
      quantity: 1,
      rate: parseFloat(data?.gross_amount || 0),
      tax_rate: data?.tax_percent,
      tax_amount: parseFloat(data?.tax_amount),
      discount: 0,
      gross_amount: parseFloat(data?.gross_amount) * 1,
      final_amount: parseFloat(data?.gross_amount) * 1,
      discount_type: 1,
      type: "Service"
      // items_data: [data],
    };
    const newItems = (formData?.items[0]?.item_name !== "") ? [...formData.items, item_data] : [item_data];
    setFormData({ ...formData, items: newItems });
  };

  const renderPopup = () => {
    if (!activePopup) return null;

    const { popupType } = activePopup;

    switch (popupType) {
      case "Hotels":
        return (
          <AddHotelPopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
          />
        );

      case "Flights":
        return (
          <AddFlightPopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
          />
        );

      case "Visa":
        return (
          <AddVisaPopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
          />
        );

      case "Insurance":
        return (
          <AddInsurancePopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
          />
        );
      case "Car Hire":
        return (
          <AddCarHirePopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
          />
        );

      case "Assist":
        return (
          <AddAssistPopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
          />
        );

      case "Others":
        return (
          <AddOtherPopup
            setShowModal={setActivePopup}
            handleAddService={handleAddService}
          />
        );
      default:
        return null;
    }
  };

  // const [openCharges, setOpenCharges] = useState(false);

  // const openExpenseCharges = () => {
  //   setOpenCharges(!openCharges);
  // };
  // for service select code..............................................

  return (
    <>
      {renderPopup()}

      <div className="f1wrpofcreqsx2" id={invoice_section}>
        <div className="itemsectionrows">
          <div className="tableheadertopsxs1">
            <p className="tablsxs1a1x3">
              Item<b className="color_red">*</b>
            </p>
            <p className="tablsxs1a2x3">
              Sales Price<b className="color_red">*</b>
            </p>
            <p className="tablsxs1a3x3">Quantity</p>
            <p className="tablsxs1a3x3" style={{ flexDirection: "row" }}>
              Unit<b className="color_red">*</b>
            </p>
            <p className="tablsxs1a4x3">Discount</p>
            <p className="tablsxs1a5x3">
              Tax (%)<b className="color_red">*</b>
            </p>
            <p className="tablsxs1a6x3" style={{ marginLeft: "1%" }}>
              Amount
            </p>
          </div>

          {formData?.items?.map((item, index) => (
            <>
              <div className="table_item_border">
                <div
                  key={index}
                  className="tablerowtopsxs1 border_none"
                  style={{ padding: "21px 5px" }}
                >
                  <div className="tablsxs1a1x3">
                    <span>
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
                      />
                    </span>
                  </div>

                  <div></div>
                  <div className="tablsxs1a2x3" style={{ marginRight: "2px" }}>
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
                    />
                  </div>

                  <div className="tablsxs1a3x3" style={{ marginRight: "2px" }}>
                    <NumericInput
                      value={item?.quantity}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue === "") {
                          handleItemChange(index, "quantity", 0); // or some other default value
                        } else {
                          const newValue = parseInt(inputValue, 10);
                          if (newValue === NaN) newValue = 0;
                          if (!isNaN(newValue) && newValue >= 1) {
                            handleItemChange(index, "quantity", newValue);
                          }
                        }
                      }}
                      style={{
                        width: "60%",
                        cursor: item?.type === "Service" ? "not-allowed" : "default",
                      }}
                      disabled={item?.type === "Service"} // Explicitly set the disabled attribute

                    />

                  </div>



                  <div
                    className="tablsxs1a5x3"
                    // id="ITEM_Selection6"
                    style={{
                      marginRight: "5px", cursor: item?.type === "Service" ? "not-allowed" : "default",
                      pointerEvents: item?.type === "Service" ? "none" : "auto", // Prevent interaction
                    }}

                    disabled={item?.type === "Service"} // Explicitly set the disabled attribute
                    data-tooltip-content={item?.type === "Service" && "Unit is not allowed for service select"}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-place="bottom"
                  >
                    <span>
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
                        className2="item"


                      />
                    </span>
                  </div>

                  <div className="tablsxs1a5x3">
                    <span>
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
                          ? "$"
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
                    </span>
                  </div>

                  {item?.item_id == "" || item?.item_name == "" ? (
                    <div
                      className="tablsxs1a6x3_rm"
                      id="ITEM_Selection7"
                      key={item.id || index}
                      style={{ marginRight: "20px" }}
                    >
                      <CustomDropdown13
                        options={tax_rate}
                        value={item?.tax_rate}
                        onChange={(e) =>
                          handleItemChange(index, "tax_rate", e.target.value)
                        }
                        name="tax_rate"
                        type="taxRate"
                        defaultOption="Taxes"
                        className2="items"
                      />
                    </div>
                  ) : (
                    <div
                      className="tablsxs1a6x3_rm"
                      id="ITEM_Selection7"
                      style={{
                        marginRight: "20px",
                        cursor: "not-allowed",
                        marginTop: "10px",
                      }}
                      key={item.id || index}
                    >
                      {item?.tax_name === "Taxable" ? <> {item?.tax_rate} </>

                        :
                        item?.tax_rate != 0 ?
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
                              className2="items"
                              style={{ width: "100px" }}
                            />
                          </> : <>{item?.tax_name}</>

                      }
                    </div>
                  )}

                  <div
                    className="tablsxs1a7x3"
                    style={{ cursor: "not-allowed", marginTop: "10px" }}
                  >
                    {item?.final_amount}
                  </div>

                  {formData?.items?.length > 1 ? (
                    <button
                      className="removeicoofitemrow"
                      type="button"
                      onClick={() => handleItemRemove(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleItemRemove(index);
                        }
                      }}
                    >
                      {" "}
                      <RxCross2 />{" "}
                    </button>
                  ) : (
                    <button
                      className="removeicoofitemrow"
                      type="button"
                      onClick={() => handleItemReset(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleItemReset(index);
                        }
                      }}
                    >
                      {" "}
                      <SlReload />{" "}
                    </button>
                  )}
                </div>

                {item?.hsn_code && (
                  <div className="itemDetailsData_900">
                    <p className="item_type_00">{item?.type}</p>
                    <p>
                      HSN Code:{" "}
                      <span className="item_hsn_code_9">{item?.hsn_code}</span>
                    </p>
                  </div>
                )}
              </div>

              <div style={{ display: "flex" }}>
                {/* Item Name Error */}
                <span
                  className="error-message"
                  style={{
                    width: "323px",
                    visibility: itemErrors[index]?.item_name
                      ? "visible"
                      : "hidden",
                  }}
                >
                  {itemErrors[index]?.item_name && (
                    <>
                      {otherIcons.error_svg} {itemErrors[index].item_name}
                    </>
                  )}
                </span>

                {/* Rate Error */}
                <span
                  className="error-message"
                  style={{
                    width: "254px",
                    visibility: itemErrors[index]?.rate ? "visible" : "hidden",
                  }}
                >
                  {itemErrors[index]?.rate && (
                    <>
                      {otherIcons.error_svg} {itemErrors[index].rate}
                    </>
                  )}
                </span>

                {/* Unit ID Error */}
                <span
                  className="error-message"
                  style={{
                    width: "253px",
                    visibility: itemErrors[index]?.unit_id
                      ? "visible"
                      : "hidden",
                  }}
                >
                  {itemErrors[index]?.unit_id && (
                    <>
                      {otherIcons.error_svg} {itemErrors[index].unit_id}
                    </>
                  )}
                </span>

                {/* Tax Rate Error */}
                <span
                  className="error-message"
                  style={{
                    visibility: itemErrors[index]?.tax_rate
                      ? "visible"
                      : "hidden",
                  }}
                >
                  {itemErrors[index]?.tax_rate && (
                    <>
                      {otherIcons.error_svg} {itemErrors[index].tax_rate}
                    </>
                  )}
                </span>
              </div>
            </>
          ))}
        </div>

        <button
          id="additembtn45srow"
          type="button"
          onClick={handleItemAdd}
          ref={buttonRef}
        >
          Add New Row
          <GoPlus />
        </button>
        <CustomDropdown28
          label="Services"
          options={servicesList}
          value={activePopup?.popupType}
          onChange={(e) => handleSelectService(e)}
          name="service"
          defaultOption="Select Service"
          type="service"
        />
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
              <div id='tax-details'>

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
                    Edit and add charges
                  </p>
                </label>
              </div>
              {openCharges && (
                <ExpenseCharges
                  formValues={{ formData, setFormData, handleChange }}
                />
              )}

              {!formData?.items[0]?.item_id ? (
                <b className="idofbtagwarninhxs5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={40}
                    height={40}
                    color={"#f6b500"}
                    fill={"none"}
                  >
                    <path
                      d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12.2422 17V13C12.2422 12.5286 12.2422 12.2929 12.0957 12.1464C11.9493 12 11.7136 12 11.2422 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.992 8.99997H12.001"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  To edit the shipping and adjustment charge, select an item
                  first.
                </b>
              ) : (
                ""
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

export const ItemSelectGRM = ({
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
      (acc, item) => acc + parseFloat(item?.tax_amount),
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

    const total =
      subtotal +
      (parseFloat(tax_amount) || 0) +
      (parseFloat(total_charges) || 0);

    setFormData((prevFormData) => ({
      ...prevFormData,
      subtotal: subtotal?.toFixed(2),
      tax_amount: tax_amount?.toFixed(2),
      total_charges: total_charges?.toFixed(2),
      total: total?.toFixed(2),
    }));
  }, [
    formData?.items,
    formData?.total_charges,
    formData?.charges,
    formData?.total,
    formData?.charges_type,
  ]);
  //set all the values of items// when do any changes in items

  useEffect(() => {
    let sendData = {
      fy: localStorage.getItem("FinancialYear"),
      noofrec: 15,
      active: 1,
    };

    dispatch(itemLists(sendData));
    dispatch(accountLists({ fy: localStorage.getItem("FinancialYear") }));
  }, [dispatch]);

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
      newItems[index].item_id = "";
      newItems[index].hsn_code = "";
    }

    if (field === "item_name" && value !== "") {
      setItemErrors(true);
    } else if (field === "item_name" && value === "") {
      setItemErrors(false);
    }

    // Update item details
    if (field === "item_id") {
      const selectedItem = itemList?.data?.item?.find(
        (item) => item?.id == value
      );
      if (selectedItem) {
        newItems[index] = {
          ...newItems[index],
          rate: +selectedItem.price,
          gross_amount: +selectedItem?.price * +newItems[index]?.gr_qty,
          tax_rate: selectedItem?.tax_rate
            ? Math.floor(selectedItem?.tax_rate).toString()
            : null,
          item_id: selectedItem?.id,
        };
      }
      setItemErrors(value !== "");
    }

    else if (field === "unit_id") {
      newItems[index].unit_id = value;
    }
    else if (["account_id", "remarks", "vendor_id"].includes(field)) {
      newCharges[index][field] = value;
    } else {
      newItems[index][field] = value;

      // Recalculate gross_amount only when "gr_qty" is updated
      if (field === "gr_qty") {
        newItems[index].gross_amount = +newItems[index].rate * +value;
      }
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

    const total =
      subtotal +
      (parseFloat(tax_amount) || 0) +
      (parseFloat(total_charges) || 0);
    // const total = subtotal;

    setFormData({
      ...formData,
      items: updatedItems,
      charges_type: newCharges,
      subtotal: subtotal?.toFixed(2),
      total: total?.toFixed(2),
    });
  };

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
      item_id: "",
      item_name: "",
      tax_amount: 0,
      gr_qty: 0,
      po_qty: null,
      gross_amount: null,
      rate: null,
      final_amount: null,
      tax_rate: null,
      item_remark: null,
      upload_image: "",
    };
  };

  const handleItemAdd = () => {
    const newItems = [
      ...formData?.items,
      {
        item_id: "",
        item_name: "",
        gr_qty: 0,
        po_qty: null,
        gross_amount: null,
        rate: null,
        final_amount: null,
        tax_amount: 0,
        tax_rate: null,
        item_remark: null,
        upload_image: "",
      },
    ];
    setFormData({ ...formData, items: newItems });
  };

  const handleChargesAdd = () => {
    const newItems = [
      ...formData?.charges_type,
      {
        account_id: null,
        amount: null,
        remarks: null,
        vendor_id: null,
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
        {/* {grnDetai?.loaging && <MainScreenFreezeLoader />} */}
        <>
          <div className="itemsectionrows1" style={{ minWidth: "1225px" }}>
            <div className="tableheadertopsxs1" id="tableheadertopsxs1">
              <p
                className={`tablsxs1a1x34 ${formData?.grn_type === "Import" ? "import_P" : "local_p"
                  }`}
              >
                ITEM<b className="color_red">*</b>
              </p>
              <p
                className="tablsxs1a2x3 tablsxs1a2x1"
                style={{
                  textAlign: "right",
                  width: "117px",
                  marginRight: "20px",
                }}
              >
                ITEM PRICE ($)
              </p>

              {formData?.purchase_order_id &&
                formData?.purchase_order_id !== 0 ? (
                <p className="tablsxs1a3x3 tablsxs1a2x2">PO QTY</p>
              ) : (
                ""
              )}

              <p className="tablsxs1a3x3 tablsxs1a2x3">
                GRN QTY<b className="color_red">*</b>
              </p>
              <p
                className="tablsxs1a4x3 tablsxs1a2x4"
                style={{ width: "131px" }}
              >
                CHARGES WEIGHT
              </p>
              <p
                className="tablsxs1a4x3 tablsxs1a2x5"
                style={{ width: "125px" }}
              >
                SELECT UNIT
              </p>
              <p
                className="tablsxs1a5x3_grm tablsxs1a2x6"
                style={{ width: "124px", textAlign: "left" }}
              >
                TAX (%)
              </p>

              {formData?.grn_type === "Import" && (
                <p
                  className="tablsxs1a5x3_grm tablsxs1a2x7"
                  style={{ width: "148px", textAlign: "left" }}
                >
                  CUSTOM DUTY
                </p>
              )}

              <p
                className="tablsxs1a6x3 tablsxs1a2x8"
                style={{ width: "120px", textAlign: "right" }}
              >
                FINAL AMOUNT ($)
              </p>
            </div>
            {/* {console.log("formdata", formData?.items)} */}
            {formData?.items?.map((item, index) => (
              <>
                <div key={index} className="tablerowtopsxs1" style={{ padding: "16px 5px" }}>
                  <div className="tablsxs1a1x3">
                    <span id="ITEM_Selection">
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
                      />
                    </span>
                  </div>

                  {/* ITEM PRICE */}
                  <div
                    id="ITEM_Selection2"
                    className={`tablsxs1a2x3 ${formData?.grn_type === "Import" ? "incom_12312" : ""
                      }`}
                    style={{ boder: "1px solid #e7d8d", marginRight: "20px" }}
                  >
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
                    />
                  </div>

                  {/* PO QUANTITY */}
                  {formData?.purchase_order_id &&
                    formData?.purchase_order_id !== 0 ? (
                    <div className="tablsxs1a3x3" id="ITEM_Selection3">
                      <NumericInput value={item?.po_qty} readOnly />
                    </div>
                  ) : (
                    ""
                  )}

                  {/* GRN QUANTITY */}
                  <div className="tablsxs1a3x3x3" id="ITEM_Selection4">
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
                      }}
                    />
                  </div>

                  {/* CHARGES WEIGHT */}
                  <div className="tablsxs1a4x3" id="ITEM_Selection5">
                    <span>
                      {item?.charges_weight
                        ? item?.charges_weight?.toFixed(2)
                        : 0}
                    </span>
                  </div>

                  <div className="tablsxs1a5x3" id="ITEM_Selection6">
                    <span>
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
                    </span>
                  </div>

                  {/* TAX RATE */}
                  {formData?.is_purchase_order !== 1 ? (
                    <div className="tablsxs1a6x3_rm" id="ITEM_Selection7">
                      <CustomDropdown13
                        options={tax_rate}
                        value={item?.tax_rate}
                        onChange={(e) =>
                          handleItemChange(index, "tax_rate", e.target.value)
                        }
                        name="tax_rate"
                        type="taxRate"
                        defaultOption="Taxes"
                        extracssclassforscjkls="extracssclassforscjkls grn_tax"
                      />
                    </div>
                  ) : (
                    <div
                      className="tablsxs1a6x3_rm disabledbtn"
                      id="ITEM_Selection7"
                      data-tooltip-content="Tax already applyed"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-place="bottom"
                    >
                      <CustomDropdown13
                        options={tax_rate}
                        value={item?.tax_rate}
                        onChange={(e) =>
                          handleItemChange(index, "tax_rate", e.target.value)
                        }
                        name="tax_rate"
                        type="taxRate"
                        defaultOption="Taxes"
                        extracssclassforscjkls="extracssclassforscjkls grn_tax disabledfield"
                      />
                    </div>
                  )}

                  {formData?.grn_type === "Import" && (
                    <div className="form_commonblock" id="ITEM_Selection8">
                      <CustomDropdown13
                        options={tax_rate}
                        value={item?.custom_duty}
                        onChange={(e) =>
                          handleItemChange(index, "custom_duty", e.target.value)
                        }
                        name="custom_duty"
                        type="taxRate"
                        defaultOption="Duties"
                        extracssclassforscjkls="extracssclassforscjkls grn_tax"
                      />
                    </div>
                  )}

                  {/* FINAL AMOUNT */}
                  <div
                    className="tablsxs1a7x3"
                    id="ITEM_Selection9"
                    style={{ width: "120px" }}
                  >
                    <NumericInput
                      value={item?.final_amount}
                      placeholder="0.00"
                      onChange={(e) =>
                        handleItemChange(index, "final_amount", e.target.value)
                      }
                      readOnly
                    />
                  </div>

                  {/* IMAGE UPLOAD */}

                  {formData?.items?.length > 1 ? (
                    <button
                      className="removeicoofitemrow"
                      type="button"
                      onClick={() => handleItemRemove(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleItemRemove(index);
                        }
                      }}
                    >
                      <RxCross2 />
                    </button>
                  ) : (
                    <button
                      className="removeicoofitemrow"
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
                  )}
                </div>
                <div className="tablerowtopsxs1">
                  <div
                    style={{ maxWidth: "318px" }}
                    className={`form_commonblock ${formData?.grn_type === "Import" ? "Note_import" : ""
                      }`}
                  >
                    <span>
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        value={item?.item_remark}
                        onChange={(e) =>
                          handleItemChange(index, "item_remark", e.target.value)
                        }
                        name="item_remark"
                        placeholder="Discrepency Notes"
                      />
                    </span>
                  </div>

                  <div id="imgurlanddesc" className="calctotalsectionx2">
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
                </div>
              </>
            ))}
          </div>
          {!itemErrors && (
            <p className="error-message">
              {otherIcons.error_svg}
              Please Select Item
            </p>
          )}

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
          <div className="itemsectionrows1" style={{ minWidth: "1225px" }}>
            <div className="tableheadertopsxs1" id="new_grm_tabal_2">
              <p className="tablsxs1a1x3">CHARGES TYPE</p>
              <p className="tablsxs1a1x3">SELECT VENDOR</p>
              <p className="tablsxs1a2x3">AMOUNT</p>
              <p className="tablsxs1a3x3">REMARK</p>
              <p className="tablsxs1a4x3">ATTACHAMENT</p>
            </div>

            <br></br>
            {formData?.charges_type?.map((item, index) => (
              <>
                <div key={index} className="tablerowtopsxs1">
                  <div
                    className="tablsxs1a1x3"
                    style={{
                      background: "hsla(205, 86%, 95%, 0.45)",
                      borderRadius: "4px",
                    }}
                  >
                    <span>
                      {/* {otherIcons.currency_icon} */}
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
                        name="account_id"
                        defaultOption="Select Expense Account"
                        extracssclassforscjkls={extracssclassforscjkls}
                        index={index}
                      />
                    </span>
                  </div>
                  <div
                    className="tablsxs1a1x3"
                    style={{
                      background: "hsla(205, 86%, 95%, 0.45)",
                      borderRadius: "4px",
                    }}
                  >
                    <span id="">
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
                        name="vendor_id"
                        defaultOption="Select Vendor Name"
                        setcusData={setcusData}
                        type="vendor"
                        required
                      />
                    </span>
                  </div>

                  {/* AMOUNT */}
                  <div
                    className="tablsxs1a2x3"
                    style={{
                      width: "106px",
                      marginLeft: "28px",
                    }}
                  >
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
                    />
                  </div>

                  {/* REMARK */}
                  <div className="tablsxs1a3x3">
                    <div className="form_commonblock ">
                      <span>
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
                      </span>
                    </div>
                  </div>

                  {/* ATTACHAMENT */}
                  <div id="imgurlanddesc" className="calctotalsectionx2">
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

                  {formData?.charges_type?.length > 1 ? (
                    <button
                      className="removeicoofitemrow"
                      type="button"
                      onClick={() => handleChargeRemove(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleChargeRemove(index);
                        }
                      }}
                    >
                      {" "}
                      <RxCross2 />{" "}
                    </button>
                  ) : (
                    <button
                      className="removeicoofitemrow"
                      type="button"
                      onClick={() => handleGRNReset(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleGRNReset(index);
                        }
                      }}
                    >
                      {" "}
                      <SlReload />{" "}
                    </button>
                  )}
                </div>
              </>
            ))}
          </div>
          {!itemErrors && <p className="error-message">
            {otherIcons.error_svg}
            Please Select An Item</p>}

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
                    Edit and add charges
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
