import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CustomDropdown28 from "../../Components/CustomDropdown/CustomDropdown28";
import { ShowMasterData } from "../Helper/HelperFunctions";
import "./PassengerCard.scss";
import CreateAssistPopup from "./Services/CreateAssistPopup";
import CreateCarHirePopup from "./Services/CreateCarHirePopup";
import CreateFlightPopup from "./Services/CreateFlightPopup";
import CreateHotelPopup from "./Services/CreateHotelPopup";
import CreateInsurancePopup from "./Services/CreateInsurancePopup";
import CreateVisaPopup from "./Services/CreateVisaPopup";
import CreateOtherPopup from "./Services/CreateOtherPopup";

const PassengerCard = ({ passengers, onDelete }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
  });

  const servicesList = ShowMasterData("48");

  const handleServiceChange = (e) => {
    const { value } = e.target;
    console.log("value", value);
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));

    // Update the active popup based on the selected service
    switch (value) {
      case "Hotels":
        setActivePopup("Hotels");
        break;
      case "Flights":
        setActivePopup("Flights");
        break;
      case "Visa":
        setActivePopup("Visa");
        break;
      case "Insurance":
        setActivePopup("Insurance");
        break;
      case "Car Hire":
        setActivePopup("Car Hire");
        break;
      case "Assist":
        setActivePopup("Assist");
        break;
      case "Others":
        setActivePopup("Others");
        break;
      default:
        setActivePopup(null); // Hide all popups for invalid services
    }
  };

  const renderPopup = () => {
    switch (activePopup) {
      case "Hotels":
        return <CreateHotelPopup showModal={true} setShowModal={setActivePopup} />;
      case "Flights":
        return <CreateFlightPopup showModal={true} setShowModal={setActivePopup} />;
      case "Visa":
        return <CreateVisaPopup showModal={true} setShowModal={setActivePopup} />;
      case "Insurance":
        return <CreateInsurancePopup showModal={true} setShowModal={setActivePopup} />;
      case "Car Hire":
        return <CreateCarHirePopup showModal={true} setShowModal={setActivePopup} />;
      case "Assist":
        return <CreateAssistPopup showModal={true} setShowModal={setActivePopup} />;
      case "Others":
        return <CreateOtherPopup showModal={true} setShowModal={setActivePopup} />;
      default:
        return null;
    }
  };
  return (
    <div
      className="passenger-list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      {passengers.map((passenger, index) => (
        <div className="card" key={index}>
          {/* Top Section */}
          <div className="card-top">
            <div className="card-avatar">
              {passenger.name ? passenger.name[0].toUpperCase() : "P"}
            </div>
            <div className="card-name">{passenger.name}</div>
            <RxCross2
              className="card-delete"
              onClick={() => onDelete(passenger.id)}
            />
          </div>

          {/* Middle Section */}
          <div className="card-middle">
            <div className="card-details">
              <div className="value">Mobile:</div>
              <div className="value">{passenger.mobile || "N/A"}</div>
            </div>
            <div className="card-details">
              <span className="value">Email:</span>
              <div className="value">{passenger.email || "N/A"}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="card-divider"></div>

          <div
            className="form_commonblock"
          // style={{ flex: "0.6" }}
          >
            <span style={{ border: "none", justifyContent: "center" }}>
              {/* {otherIcons.name_svg} */}
              <CustomDropdown28
                label="Services"
                options={servicesList}
                value={formData?.service}
                onChange={handleServiceChange}
                name="service"
                defaultOption="Select Service"
                type="service"
                className2="service"
              />
            </span>
          </div>
        </div>
      ))}
      {renderPopup()}
    </div>
  );
};

export default PassengerCard;
