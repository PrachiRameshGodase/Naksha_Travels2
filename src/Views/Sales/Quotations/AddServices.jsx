import React, { useState, useRef } from "react";
import CustomDropdown28 from "../../../Components/CustomDropdown/CustomDropdown28";
import { ShowMasterData } from "../../Helper/HelperFunctions";
// import "./PassengerCard.scss";
import CreateAssistPopup from "../../DSR/Services/PassengerAssist/CreateAssistPopup";
import CreateCarHirePopup from "../../DSR/Services/PassengerCarHire/CreateCarHirePopup";
import CreateFlightPopup from "../../DSR/Services/PassengerFlight/CreateFlightPopup";
import CreateHotelPopup from "../../DSR/Services/PassengerHotel/CreateHotelPopup";
import CreateInsurancePopup from "../../DSR/Services/PassengerInsurance/CreateInsurancePopup";
import CreateOtherPopup from "../../DSR/Services/PassengerOthers/CreateOtherPopup";
import CreateVisaPopup from "../../DSR/Services/PassengerVisa/CreateVisaPopup";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import CustomDropdown13 from "../../../Components/CustomDropdown/CustomDropdown13";

const AddServices = ({ }) => {

    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const popupRef = useRef(null);

    const [activePopup, setActivePopup] = useState(null);
    const [formData, setFormData] = useState({
        service: "",
    });

    const [showAddModal, setShowAddModal] = useState(false);
    const [services, setServices] = useState([]);

    const servicesList = ShowMasterData("48");
    const passengers = {};

    const handleSelectService = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            service: value,
        }));
        setShowAddModal(false);
        setActivePopup({ popupType: value });
    };

    const handleAddService = (data) => {
        setServices(...services, data);
    };

    const renderPopup = () => {
        if (!activePopup) return null;

        const { popupType } = activePopup;

        switch (popupType) {
            case "Hotels":
                return (
                    <CreateHotelPopup
                        showModal={true}
                        setShowModal={setActivePopup}
                        data={passengers}
                        passengerId={""}
                        handleAddService={handleAddService}
                    />
                );
            case "Flights":
                return (
                    <CreateFlightPopup
                        showModal={true}
                        setShowModal={setActivePopup}
                        data={passengers}
                        passengerId={""}
                        handleAddService={handleAddService}
                    />
                );
            case "Visa":
                return (
                    <CreateVisaPopup
                        showModal={true}
                        setShowModal={setActivePopup}
                        data={passengers}
                        passengerId={""}
                        handleAddService={handleAddService}
                    />
                );
            case "Insurance":
                return (
                    <CreateInsurancePopup
                        showModal={true}
                        setShowModal={setActivePopup}
                        data={passengers}
                        passengerId={""}
                        handleAddService={handleAddService}
                    />
                );
            case "Car Hire":
                return (
                    <CreateCarHirePopup
                        showModal={true}
                        setShowModal={setActivePopup}
                        data={passengers}
                        passengerId={""}
                        handleAddService={handleAddService}
                    />
                );
            case "Assist":
                return (
                    <CreateAssistPopup
                        showModal={true}
                        setShowModal={setActivePopup}
                        data={passengers}
                        passengerId={""}
                        handleAddService={handleAddService}
                    />
                );
            case "Others":
                return (
                    <CreateOtherPopup
                        showModal={true}
                        setShowModal={setActivePopup}
                        data={passengers}
                        passengerId={""}
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
                <button
                    id="additembtn45srow"
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    ref={buttonRef}
                >
                    Add Services
                    <GoPlus />
                </button>
                {showAddModal &&
                    <div className="mainxpopups1" ref={popupRef} tabIndex="0">
                        <div className="popup-content">
                            <span className="close-button" onClick={() => setShowAddModal(false)}><RxCross2 /></span>
                            <h2>Add Services</h2>
                            <div className="midpopusec12x" style={{minHeight: "300px"}}>
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
