import React, { useState, useRef, useEffect } from "react";
import CustomDropdown28 from "../../Components/CustomDropdown/CustomDropdown28";
import { currencySymbol, ShowMasterData } from "../Helper/HelperFunctions";
// import "./PassengerCard.scss";
import { RxCross2 } from "react-icons/rx";
import CustomDropdown13 from "../../Components/CustomDropdown/CustomDropdown13";
import AddHotelPopup from "./AddHotelPopup";
import NumericInput from "../Helper/NumericInput";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../Helper/PopupData";
import AddFlightPopup from "./AddFlightPopup";
import AddVisaPopup from "./AddVisaPopup";
import AddInsurancePopup from "./AddInsurancePopup";
import AddCarHirePopup from "./AddCarHirePopup";
import AddAssistPopup from "./AddAssistPopup";
import AddOtherPopup from "./AddOtherPopup";

const AddServices = ({ formData, setFormData }) => {

    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const popupRef = useRef(null);
    const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);
    const servicesList = ShowMasterData("48");

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const handleDropdownToggle = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    useOutsideClick(dropdownRef, () => setOpenDropdownIndex(null));

    const [activePopup, setActivePopup] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const [services, setServices] = useState([]);

    const handleSelectService = (e) => {
        const { value } = e.target;
        setActivePopup({ popupType: value });
    };

    const handleAddService = (name, data) => {
        const itemName = (name === "Hotel") ? data?.hotel_name : (name === "Flight") ? data?.airline_name : (name === "Assist") ? data?.airport_name : (name === "Insurance") ? data?.company_name : (name === "Visa") ? data?.passport_no : (name === "CarHire") ? data?.vehicle_type_id : (name === "Other") ? data?.item_name : "";
        const item_data = {
            item_name: itemName,
            tax_name: "",
            // hsn_code: "",
            type: "",
            quantity: 1,
            tax_rate: null,
            tax_amount: null,
            discount: 0,
            gross_amount: null,
            final_amount: null,
            discount_type: 1,
            // item_remark: null,
            data: data
        }
        if (services?.length === 0) {
            setServices([data]);
            setFormData({
                ...formData,
                items: [item_data]
            });
        }
        else {
            setServices([...services, data]);
            const newItems = [
                ...formData.items,
                item_data
            ];
        }
    };

    useEffect(() => {
        setActivePopup(null);
    }, [services])


    const handleItemChange = (index, field, value) => {

        const newItems = [...formData?.items];
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

    return (
        <>
            {renderPopup()}
            <div className="f1wrpofcreqsx2" id={""}>
                <div className="itemsectionrows">
                    <div className="tableheadertopsxs1">
                        <p className="tablsxs1a1x3">
                            Item<b className="color_red">*</b>
                        </p>
                        <p className="tablsxs1a2x3">Quantity</p>
                        <p className="tablsxs1a3x3" style={{ flexDirection: "row" }}>
                            Rates<b className="color_red">*</b>
                        </p>
                        <p className="tablsxs1a4x3">Discount(%)</p>
                        <p className="tablsxs1a5x3">
                            Tax
                        </p>
                        <p className="tablsxs1a6x3">
                            Amount
                        </p>
                    </div>

                    {services?.length > 0 && services?.map((item, index) => (
                        <>
                            <div className="table_item_border">
                                <div
                                    key={index}
                                    className="tablerowtopsxs1 border_none"
                                    style={{ padding: "21px 5px" }}
                                >
                                    <div className="tablsxs1a1x3">
                                        <span>

                                        </span>
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
                                            style={{ width: "60%" }}
                                        />
                                    </div>

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

                                    <div
                                        className="tablsxs1a5x3"
                                        // id="ITEM_Selection6"
                                        style={{ marginRight: "5px" }}
                                    >
                                        <span>

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
                                            {item?.tax_name === "Taxable" && <> {item?.tax_rate} </>}
                                            {item?.tax_name === "Non-Taxable" && (
                                                <>{item?.tax_name}</>
                                            )}
                                            {item?.tax_name === "Taxable"}
                                        </div>
                                    )}

                                    <div
                                        className="tablsxs1a7x3"
                                        style={{ cursor: "not-allowed", marginTop: "10px" }}
                                    >
                                        {item?.final_amount}
                                    </div>

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
                                </div>
                            </div>
                            {/* <div style={{ display: "flex" }}>
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
              </div> */}
                        </>
                    ))}
                </div>

                {/* <div className="breakerci"></div> */}
                <div className="height5"></div>
                <CustomDropdown28
                    label="Services"
                    options={servicesList}
                    value={activePopup?.popupType}
                    onChange={(e) => handleSelectService(e)}
                    name="service"
                    defaultOption="Select Service"
                    type="service"
                />
                {/* <button
                    id="additembtn45srow"
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    ref={buttonRef}
                >
                    Add Services
                    <GoPlus />
                </button> */}
                {showAddModal &&
                    <div className="mainxpopups1" ref={popupRef} tabIndex="0">
                        <div className="popup-content">
                            <span className="close-button" onClick={() => setShowAddModal(false)}><RxCross2 /></span>
                            <h2>Add Services</h2>
                            <div className="midpopusec12x" style={{ minHeight: "300px" }}>
                                {/* <label>Select Service</label> */}
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
                }
            </div >
        </>
    );
};

export default AddServices;
