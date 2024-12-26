import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./PassengerCard.scss";
import CreateService from "./Services/CreateService";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import { ShowMasterData } from "../Helper/HelperFunctions";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import CustomDropdown27 from "../../Components/CustomDropdown/CustomDropdown27";
import CustomDropdown28 from "../../Components/CustomDropdown/CustomDropdown28";
import CreateHotelPopup from "./Services/CreateHotelPopup";
import CreateFlightPopup from "./Services/CreateFlightPopup";

const PassengerCard = ({ passengers, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    flight_name: null,
    service: "",
  });

  const servicesList = ShowMasterData("48");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleServiceChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));
    if (value == "1") {
      setShowPopup(true);
    } else if (value == "2") {
      setShowPopup(false);
    } else {
      setShowPopup(false); // Hide popup if service is something else
    }
  };

  console.log("formData", formData);
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
            style={{ width: "160px", marginLeft: "45px", marginBottom: "10px" }}
          >
            <span style={{ border: "none" }}>
              {/* {otherIcons.name_svg} */}
              <CustomDropdown28
                label="Servises"
                options={servicesList}
                value={formData?.service}
                onChange={handleServiceChange}
                name="service"
                defaultOption="Select Service"
                type="masters"
                className2="service"
              />
            </span>
          </div>
          {showPopup && (
            <CreateHotelPopup
              showModal={showPopup}
              setShowModal={setShowPopup}
            />
          )}
          {showPopup && (
            <CreateFlightPopup
              showModal={showPopup}
              setShowModal={setShowPopup}
            />
          )}
        </div>
      ))}
      {/* {formData?.service=="1" && (<CreateHotelPopup />)} */}
      {/* {showPopup && <CreateHotelPopup showModal={showPopup} setShowModal={setShowPopup} />} */}
    </div>
  );
};

export default PassengerCard;
