import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import { fetchGetCountries } from "../../../../Redux/Actions/globalActions";
import {
  CreateHotelRoomAction,
  hotelRoomDetailsAction,
} from "../../../../Redux/Actions/hotelActions";
import {
  SubmitButton2,
  SubmitButton6,
} from "../../../Common/Pagination/SubmitButton";
import {
  MultiImageUploadHelp,
  SingleImageUpload,
} from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import {
  ShowMasterData,
  ShowUserMasterData,
} from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CurrencySelect, {
  CurrencySelect2,
} from "../../../Helper/ComponentHelper/CurrencySelect";
import { CustomDropdown006 } from "../../../../Components/CustomDropdown/CustomDropdown06";
import { getCurrencyValue } from "../../../Helper/ComponentHelper/ManageStorage/localStorageUtils";
import Swal from "sweetalert2";

const CreateHotelService = ({ data, showPopup, setShowPopup }) => {
 
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
  const currency = getCurrencyValue();

  const hotelRoomCreates = useSelector((state) => state?.createHotelRoom);
  const hotelRoomDetails = useSelector((state) => state?.hotelRoomDetail);
  const hotelRoomData = hotelRoomDetails?.data?.data?.room || {};

  const hotelType = ShowUserMasterData("35");
  const occupancy = ShowUserMasterData("36");
  const bed = ShowUserMasterData("38");
  const meal = ShowUserMasterData("37");
  const amenitiesType = ShowUserMasterData("49");

  const [formData, setFormData] = useState({
    hotel_id: itemId,
    room_type: 0,
    room_number: "",
    occupancy_id: 0,
    occupancy_name: null,
    bed_id: 0,
    bed_name: null,
    meal_id: 0,
    meal_name: null,
    max_occupancy: null,
    amenities: "",
    availability_status: 1,
    description: null,
    price: null,
    upload_documents: "",
    currency: currency,
  });
  const [errors, setErrors] = useState({
    room_number: false,
    occupancy_id: false,
    meal_id: false,
    bed_id: false,
    max_occupancy: false,
    // currency:false,
    price: false,
    // amenities: false,
  });
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

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

  const handleChange1 = (selectedItems, name) => {
    setFormData({
      ...formData,
      amenities: selectedItems, 
    });
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };

  useEffect(() => {
    dispatch(fetchGetCountries());
  }, [dispatch]);

  useEffect(() => {
    if (itemId) {
      const queryParams = {
        room_id: itemId,
      };
      dispatch(hotelRoomDetailsAction(queryParams));
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    if (data) {
      const depArray = JSON?.parse(data?.amenities || "");
      setFormData({
        ...formData,
        id: data?.id,
        room_type: data?.room_type,
        room_number: data?.room_number,
        occupancy_id: data?.occupancy_id,
        occupancy_name: data?.occupancy_name,
        bed_id: data?.bed_id,
        bed_name: data?.bed_name,
        meal_id: data?.meal_id,
        meal_name: data?.meal_name,
        max_occupancy: data?.max_occupancy,
        amenities: !depArray ? [] : depArray,
        price: data?.price,
        availability_status: data?.availability_status,
        description: data?.description,
        currency: data?.currency,
        upload_documents: data?.upload_documents
          ? JSON?.parse(data.upload_documents)
          : "",
      });
      if (data?.upload_documents) {
        setImgeLoader("success");
      }
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      room_number: formData?.room_number ? false : true,
      max_occupancy: formData?.max_occupancy ? false : true,
      occupancy_id: formData?.occupancy_id ? false : true,
      meal_id: formData?.meal_id ? false : true,
      bed_id: formData?.bed_id ? false : true,
      // amenities: formData?.amenities ? false : true,
      price: formData?.price ? false : true,
      // currency: formData?.currency ? false : true,
    };
    setErrors(newErrors);
    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
      await Swal.fire({
        text: "Please fill all the required fields.",
        confirmButtonText: "OK",
      });
      return;
    } else {
      try {
        const sendData = {
          ...formData,
          amenities: JSON.stringify(formData.amenities),
          upload_documents: JSON.stringify(formData?.upload_documents),
        };
        const refreshData = {
          hotel_id: itemId,
        };
        dispatch(CreateHotelRoomAction(sendData, setShowPopup, refreshData));
      } catch (error) {
        toast.error("Error updating hotel room:", error);
      }
    }
  };

  return (
    <div>
      <div id="formofcreateitems">
        <div className="custom-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{data?.id ? "Update Room" : "Add Room"}</h5>
              <button
                className="close-button"
                onClick={() => setShowPopup(false)}
              >
                <RxCross2 />
              </button>
            </div>

            <div className="modal-body">
              <form>
                {/* Keep your form as it is */}
                <div className="relateivdiv">
                  <div
                    className="itemsformwrap"
                    style={{ paddingBottom: "0px" }}
                  >
                    <div className="f1wrapofcreq">
                      <div className="f1wrapofcreqx1">
                        <div className="form_commonblock">
                          <label>
                            Room Number/Name<b className="color_red">*</b>
                          </label>
                          <span>
                            {otherIcons.placeofsupply_svg}
                            <input
                              value={formData.room_number}
                              onChange={handleChange}
                              name="room_number"
                              placeholder="Enter Room Name"
                            />
                          </span>
                          {errors?.room_number && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Room Name/Number
                            </p>
                          )}
                        </div>
                        <div className="form_commonblock">
                          <label>
                            Occupancy<b className="color_red">*</b>
                          </label>

                          <span id="">
                            {otherIcons.name_svg}
                            <CustomDropdown04
                              label="Occupancy"
                              options={occupancy}
                              value={formData?.occupancy_id}
                              onChange={handleChange}
                              name="occupancy_id"
                              defaultOption="Select Occupancy"
                              type="masters"
                            />
                          </span>
                          {errors?.occupancy_id && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Occupancy
                            </p>
                          )}
                        </div>
                        <div className="form_commonblock">
                          <label>
                            Bed<b className="color_red">*</b>
                          </label>

                          <span id="">
                            {otherIcons.name_svg}
                            <CustomDropdown04
                              label="Bed"
                              options={bed}
                              value={formData?.bed_id}
                              onChange={handleChange}
                              name="bed_id"
                              defaultOption="Select Bed"
                              type="masters"
                            />
                          </span>
                          {errors?.bed_id && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Bed
                            </p>
                          )}
                        </div>
                        <div className="form_commonblock">
                          <label>
                            Meal<b className="color_red">*</b>
                          </label>

                          <span id="">
                            {otherIcons.name_svg}
                            <CustomDropdown04
                              label="Meal"
                              options={meal}
                              value={formData?.meal_id}
                              onChange={handleChange}
                              name="meal_id"
                              defaultOption="Select Meal"
                              type="masters"
                            />
                          </span>
                          {errors?.meal_id && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Meal
                            </p>
                          )}
                        </div>

                        <div className="form_commonblock">
                          <label>
                            Max Occupancy Of Persons
                            <b className="color_red">*</b>
                          </label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.name_svg}
                              <NumericInput
                                name="max_occupancy"
                                placeholder="Enter Max Occupancy"
                                value={formData.max_occupancy}
                                onChange={(e) => handleChange(e)}
                              />
                            </span>
                            {errors?.max_occupancy && (
                              <p
                                className="error_message"
                                style={{
                                  whiteSpace: "nowrap",
                                  marginBottom: "0px important",
                                }}
                              >
                                {otherIcons.error_svg}
                                Please Fill Max Occupancy Of Persons
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="form_commonblock">
                          <CurrencySelect2
                            value={formData?.currency}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form_commonblock">
                          <label>
                            Price<b className="color_red">*</b>
                          </label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.name_svg}
                              <NumericInput
                                name="price"
                                placeholder="Enter Price"
                                value={formData.price}
                                onChange={(e) => handleChange(e)}
                              />
                            </span>
                            {errors?.price && (
                              <p
                                className="error_message"
                                style={{
                                  whiteSpace: "nowrap",
                                  marginBottom: "0px important",
                                }}
                              >
                                {otherIcons.error_svg}
                                Please Fill Price
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="form_commonblock">
                          <label>Amenities</label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.name_svg}
                              <CustomDropdown006
                                options={amenitiesType}
                                value={formData?.amenities}
                                onChange={(selectedItems) =>
                                  handleChange1(selectedItems, "amenities")
                                }
                                name="amenities"
                                defaultOption="Select Ammenties"
                                id1="position_depart_3221"
                              />
                            </span>
                          </div>
                        </div>
                        <div className="f1wrapofcreqx1">
                          <div
                            id="imgurlanddesc"
                            className="calctotalsectionx2"
                          >
                            <SingleImageUpload
                              formData={formData}
                              setFormData={setFormData}
                              setFreezLoadingImg={setFreezLoadingImg}
                              imgLoader={imgLoader}
                              setImgeLoader={setImgeLoader}
                            />
                          </div>
                          <div className="secondtotalsections485s">
                            <div className="textareaofcreatqsiform">
                              <label>Description</label>
                              <div className="show_no_of_text_limit_0121">
                                <TextAreaComponentWithTextLimit
                                  formsValues={{ handleChange, formData }}
                                  placeholder="Enter Description...."
                                  name="description"
                                  value={formData?.description}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <SubmitButton6
                  onClick={handleFormSubmit}
                  createUpdate={hotelRoomCreates}
                  setShowModal={setShowPopup}
                  isEdit={data?.id}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHotelService;
