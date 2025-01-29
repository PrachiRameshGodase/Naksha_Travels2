import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateFlightAction } from "../../../../Redux/Actions/flightActions";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import { ShowMasterData, ShowUserMasterData } from "../../../Helper/HelperFunctions";
import { SubmitButton6 } from "../../../Common/Pagination/SubmitButton";
import "../../../DSR/Services/CreateHotelPopup.scss";
const CreateFlight = ({ popupContent }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const flightCreates = useSelector((state) => state?.createFlight);

  const destinationCode = ShowUserMasterData("52");
  const {
    setshowAddPopup,
    showAddPopup,
    isEditIndividual,
    selectedItem,
    setSearchTrigger,
  } = popupContent;
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [formData, setFormData] = useState({
    flight_name: null,
    air_line_code: null,
    destination_code: null,
  });
  const [errors, setErrors] = useState({
    flight_name: false,
    // air_line_code: false,
    // destination_code:false
  });
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let newErrors = {
      flight_name: formData?.flight_name ? false : true,
      // air_line_code: formData?.air_line_code ? false : true,
      // destination_code: formData?.destination_code ? false : true,

    };
    setErrors(newErrors);
    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
      return;
    } else {
      try {
        const sendData = {
          ...formData,
        };
        dispatch(CreateFlightAction(sendData, Navigate))
          .then(() => {
            setshowAddPopup(null);
            setSearchTrigger((prev) => prev + 1);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        toast.error("Error creating flight:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };
  useEffect(() => {
    if (selectedItem && isEditIndividual) {
      setFormData({
        ...formData,
        id: selectedItem?.id,
        flight_name: selectedItem?.flight_name,
        air_line_code:selectedItem?.air_line_code,
        destination_code:selectedItem?.destination_code
      });
    }
  }, [selectedItem, isEditIndividual]);

  return (
    <div id="formofcreateitems">
      <div className="custom-modal" >
        <div className="modal-content"  style={{ width: "50%" }}>
          <div className="modal-header">
            <h5>
              {isEditIndividual
                ? "Update Flight Service"
                : "Add Flight Service"}
            </h5>
            <button
              className="close-button"
              onClick={() => setshowAddPopup(false)}
            >
              <RxCross2 />
            </button>
          </div>

          <div className="modal-body" >
            <form>
              {/* Keep your form as it is */}
              <div className="relateivdiv">
                <div className="itemsformwrap" style={{ paddingBottom: "0px", minHeight:"100px" }}>
                  <div className="f1wrapofcreq">
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          Airline Name<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.flight_name}
                            onChange={handleChange}
                            name="flight_name"
                            placeholder="Enter Airline Name"
                            autoComplete="off"
                          />
                        </span>
                        {errors?.flight_name && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Airline Name
                          </p>
                        )}
                      </div>
                      {/* <div className="form_commonblock">
                        <label>Airline Code<b className="color_red">*</b></label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <input
                              value={formData.air_line_code}
                              onChange={handleChange}
                              name="air_line_code"
                              placeholder="Enter Airline Code"
                            />
                          </span>
                          {errors?.air_line_code && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill AirLine Code
                          </p>
                        )}
                        </div>
                      </div> */}
                      {/* <div className="form_commonblock">
                        <label>Destination Code<b className="color_red">*</b></label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Destination Code"
                            options={destinationCode}
                            value={formData?.destination_code}
                            onChange={handleChange}
                            name="destination_code"
                            defaultOption="Select Destination Code"
                            type="masters2"
                          />
                        </span>
                        {errors?.destination_code && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Destination Code
                          </p>
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <SubmitButton6
                onClick={handleSubmitForm}
                createUpdate={flightCreates}
                setShowModal={setshowAddPopup}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFlight;
