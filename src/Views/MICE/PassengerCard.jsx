import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CustomDropdown28 from "../../Components/CustomDropdown/CustomDropdown28";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { ShowMasterData } from "../Helper/HelperFunctions";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "./PassengerCard.scss";
import CreateAssistPopup from "./Services/PassengerAssist/CreateAssistPopup";
import CreateCarHirePopup from "./Services/PassengerCarHire/CreateCarHirePopup";
import CreateFlightPopup from "./Services/PassengerFlight/CreateFlightPopup";
import CreateHotelPopup from "./Services/PassengerHotel/CreateHotelPopup";
import CreateInsurancePopup from "./Services/PassengerInsurance/CreateInsurancePopup";
import CreateOtherPopup from "./Services/PassengerOthers/CreateOtherPopup";
import CreateVisaPopup from "./Services/PassengerVisa/CreateVisaPopup";
import { getCurrencySymbol } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const PassengerCard = ({ passengers, onDelete, disabled }) => {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({ service: "" });

  const servicesList = ShowMasterData("48");
  const currencySymbol = getCurrencySymbol();
  
  const handleServiceChange = (e, passengerId) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));

    setActivePopup({ popupType: value, passengerId });
  };

  const renderPopup = () => {
    if (!activePopup) return null;

    const { popupType, passengerId } = activePopup;

    switch (popupType) {
      case "Hotels":
        return (
          <CreateHotelPopup
            showModal={true}
            setShowModal={setActivePopup}
            data={passengers}
            passengerId={passengerId}
          />
        );
      case "Flights":
        return (
          <CreateFlightPopup
            showModal={true}
            setShowModal={setActivePopup}
            data={passengers}
            passengerId={passengerId}
          />
        );
      case "Visa":
        return (
          <CreateVisaPopup
            showModal={true}
            setShowModal={setActivePopup}
            data={passengers}
            passengerId={passengerId}
          />
        );
      case "Insurance":
        return (
          <CreateInsurancePopup
            showModal={true}
            setShowModal={setActivePopup}
            data={passengers}
            passengerId={passengerId}
          />
        );
      case "Car Hire":
        return (
          <CreateCarHirePopup
            showModal={true}
            setShowModal={setActivePopup}
            data={passengers}
            passengerId={passengerId}
          />
        );
      case "Assist":
        return (
          <CreateAssistPopup
            showModal={true}
            setShowModal={setActivePopup}
            data={passengers}
            passengerId={passengerId}
          />
        );
      case "Others":
        return (
          <CreateOtherPopup
            showModal={true}
            setShowModal={setActivePopup}
            data={passengers}
            passengerId={passengerId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Services</th>
          <th>Service Total</th>

          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {passengers?.passengers?.length > 0 ? (
          passengers?.passengers?.map((passenger, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{passenger?.passenger?.display_name || ""}</td>
              <td>{passenger?.passenger?.email || ""}</td>
              <td>{passenger?.passenger?.mobile_no || ""}</td>
              <td style={{ width: "120px" }}>
                <CustomDropdown28
                  label="Services"
                  options={servicesList}
                  value={formData?.service}
                  onChange={(e) => handleServiceChange(e, passenger?.id)}
                  name="service"
                  defaultOption="Select Service"
                  extracssclassforscjkls="extracssclassforscjklsitem"
                  type="service"
                  disabled={disabled}
                />
              </td>
              <td>({currencySymbol}) {passenger?.service_total || ""}</td>

              <td>
                <span
              data-tooltip-content={disabled ? "Not able to click It is invoiced" : ""}
              data-tooltip-id="my-tooltip"
              data-tooltip-place="bottom"
              style={{
                cursor: disabled ? "not-allowed" : "pointer",
                color: "red",
              }}
              onClick={!disabled ? () => onDelete(passenger?.id) : ""}
                >
                  {otherIcons.delete_svg}
                </span>
                <span
                  style={{
                    cursor: "pointer",
                    color: "gray",
                    fontSize: "20px",
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    navigate(
                      `/dashboard/mice-serviceslist?id=${passenger?.id}`
                    );
                  }}
                >
                  <BsEye />
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">
              <NoDataFound />
            </td>
          </tr>
        )}
      </tbody>
      {renderPopup()}
    </table>
  );
};

export default PassengerCard;
