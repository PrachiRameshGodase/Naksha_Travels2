import React, { useState, useRef, useEffect } from "react";
import CustomDropdown28 from "../../Components/CustomDropdown/CustomDropdown28";
import { ShowMasterData, ShowUserMasterData } from "../Helper/HelperFunctions";
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
import toast from "react-hot-toast";
import TextAreaComponentWithTextLimit from "../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import ExpenseCharges from "../Helper/ComponentHelper/ExpenseCharges";
import ShowMastersValue from "../Helper/ShowMastersValue";
import { formatDate3 } from "../Helper/DateFormat";
import { getCurrencySymbol } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const AddServices = ({ formData, setFormData, handleChange, note }) => {
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const popupRef = useRef(null);
    const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);
    const servicesList = ShowUserMasterData("48");

    // get currency symbol from active orgnization form localStorage
    const currencySymbol = getCurrencySymbol();


    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const handleDropdownToggle = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };


    useOutsideClick(dropdownRef, () => setOpenDropdownIndex(null));

    const isIdEqualState = useSelector((state) => state?.isIdReducer);

    const [activePopup, setActivePopup] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);

    const handleSelectService = (e) => {
        const { value } = e.target;
        setActivePopup({ popupType: value });
    };

    const handleAddService = (name, data) => {
        console.log("formData.items", formData.items);
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
            type: "",
            quantity: 1,
            rate: parseFloat(data?.gross_amount || 0),
            tax_rate: parseInt(data?.tax_percent || 0),
            tax_amount: parseFloat(data?.tax_amount),
            discount: 0,
            gross_amount: parseFloat(data?.gross_amount) * 1,
            final_amount: parseFloat(data?.gross_amount) * 1,
            discount_type: 1,
            items_data: [data],
        }
        const newItems = (formData?.items[0]?.item_name !== "") ? [...formData.items, item_data] : [item_data];
        setFormData({ ...formData, items: newItems });
    };

    const calculateTotalDiscount = (items) => {
        return items?.reduce(
            (acc, item) => acc + (parseFloat(item?.discount) || 0),
            0
        );
    };
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
        ``;
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

        // setTaxDetails(taxes); // Update the tax details state

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
        const newItems = [...formData?.items];

        newItems[index][field] = value;
        const item = newItems[index];

        let discountAmount = 0;
        let discountPercentage = 0;

        if (field === "discount_type") {
            newItems[index].discount = 0;
        }

        if (field === "unit_id") {
            newItems[index].unit_id = value;
        }

        if (field === "taxRate") {
            newItems[index].tax_rate = value;
        }

        if (field === "rate") {
            newItems[index].gross_amount = +item?.rate * +item?.quantity;
            // newErrors[index].rate = "";
        }

        const grossAmount = item?.rate * item?.quantity;
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
        setFormData((prevFormData) => ({
            ...prevFormData,
            items: newItems,
        }));
        // setItemErrors(newErrors);
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

    const [openCharges, setOpenCharges] = useState(false);
    const openExpenseCharges = () => {
        setOpenCharges(!openCharges);
    };



    return (
        <>
            {renderPopup()}

            <div className="f1wrpofcreqsx2" id={""}>
                <div className="itemsectionrows">
                    <div className="tableheadertopsxs1">
                        <p className="tablsxs1a1x3">
                            Item / Services Name<b className="color_red">*</b>
                        </p>
                        <p className="tablsxs1a2x3">Quantity</p>
                        <p className="tablsxs1a3x3" style={{ flexDirection: "row" }}>
                            Rates<b className="color_red">*</b>
                        </p>
                        <p className="tablsxs1a4x3">Discount</p>
                        <p className="tablsxs1a5x3">Tax(%)</p>
                        <p className="tablsxs1a6x3">Amount</p>
                    </div>

                    {formData?.items?.length > 0 ? (
                        formData?.items?.map((item, index) => (
                            <>
                                {console.log("item", item)}
                                <div className="table_item_border">
                                    <div
                                        key={index}
                                        className="tablerowtopsxs1 border_none"
                                        style={{ padding: "21px 12px" }}
                                    >
                                        <div className="tablsxs1a1x3">
                                            {item?.items_data?.map((data, index) => (
                                                <span key={index}>
                                                    {data?.service_name === "Hotel" ? (
                                                        <span>
                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Hotel Name:</b>{" "}
                                                                {data?.hotel_name || "-"}{" "}
                                                            </span>
                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Room:</b>{" "}
                                                                {data?.room_no || "-"}{" "}
                                                            </span>
                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Meal:</b>{" "}
                                                                <ShowMastersValue
                                                                    type="37"
                                                                    id={data?.meal_id || "-"}
                                                                />
                                                            </span>
                                                        </span>
                                                    ) : data?.service_name === "Assist" ? (
                                                        <span>

                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Airport:</b>{" "}
                                                                {data?.airport_name || "-"}{" "}
                                                            </span>

                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Meeting Type:</b>{" "}
                                                                {data?.meeting_type || "-"}{" "}
                                                            </span>

                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>
                                                                    No Of Persons:
                                                                </b>{" "}
                                                                {data?.no_of_persons || "-"}
                                                            </span>

                                                        </span>
                                                    ) : data?.service_name === "Flight" ? (
                                                        <span>
                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Travel Date:</b>{" "}
                                                                {formatDate3(data?.travel_date) || "-"}{" "}
                                                            </span>
                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Airline Name:</b>{" "}
                                                                {data?.airline_name || "-"}{" "}
                                                            </span>
                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Ticket No:</b>{" "}
                                                                {data?.ticket_no + " " || "-"}
                                                            </span>
                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>PRN No:</b>
                                                                {data?.prn_no || "-"}
                                                            </span>
                                                        </span>
                                                    ) : data?.service_name === "Visa" ? (
                                                        <span>
                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Passport No:</b>{" "}
                                                                {data?.passport_no + " " || "-"}
                                                            </span>
                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Visa No:</b>{" "}
                                                                {data?.visa_no || "-"}{" "}
                                                            </span>
                                                            <span>
                                                                <b style={{ fontWeight: 500 }}>Visa Type:</b>{" "}
                                                                <ShowMastersValue
                                                                    type="40"
                                                                    id={data?.visa_type_id || "-"}
                                                                />
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </span>
                                            ))}
                                        </div>

                                        <div
                                            className="tablsxs1a3x3"
                                            style={{ marginRight: "2px" }}
                                        >
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
                                                style={{ width: "60%", cursor: "not-allowed" }}
                                                disabled
                                            />
                                        </div>

                                        <div
                                            className="tablsxs1a2x3"
                                            style={{ marginRight: "2px" }}
                                        >
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
                                                            if (newValue > 100) {
                                                                // Use toast here if available
                                                                toast(
                                                                    "Discount percentage cannot exceed 100%.",
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
                                                        } else {
                                                            newValue = Math.min(
                                                                newValue,
                                                                item?.rate * item?.quantity +
                                                                (item?.rate *
                                                                    item?.tax_rate *
                                                                    item?.quantity) /
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

                                        {item?.item_name === "" ? (
                                            <div
                                                className="tablsxs1a6x3_rm"
                                                id="ITEM_Selection7"
                                                key={item.id || index}
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
                                                    tax_rate={item?.tax_rate}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="tablsxs1a6x3_rm"
                                                id="ITEM_Selection7"
                                                style={{
                                                    marginRight: "20px",
                                                    cursor: "not-allowed",
                                                    // marginTop: "10px",
                                                }}
                                                key={item.id || index}
                                            >
                                                <> {item?.tax_rate} </>
                                                {/* {item?.tax_name === "Taxable" && <> {item?.tax_rate} </>}
                                            {item?.tax_name === "Non-Taxable" && (
                                                <>{item?.tax_name}</>
                                            )}
                                            {item?.tax_name === "Taxable"} */}
                                            </div>
                                        )}

                                        <div
                                            className="tablsxs1a7x3"
                                            style={{
                                                cursor: "not-allowed",
                                                marginTop: "10px",
                                                width: "47px",
                                            }}
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
                            </>
                        ))
                    ) : (
                        <div class="empty_data_services_messs">
                            Please Select the Services.
                        </div>
                    )}
                </div>

                <CustomDropdown28
                    label="Services"
                    options={servicesList}
                    value={activePopup?.popupType}
                    onChange={(e) => handleSelectService(e)}
                    name="service"
                    defaultOption="Select Service"
                    type="service"
                />

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
            </div>
        </>
    );
};

export default AddServices;
