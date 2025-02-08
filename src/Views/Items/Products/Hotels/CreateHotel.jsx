import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import {
  fetchGetCities,
  fetchGetCountries,
  fetchGetStates,
} from "../../../../Redux/Actions/globalActions";
import {
  CreateHotelAction,
  hotelDetailsAction,
} from "../../../../Redux/Actions/hotelActions";
import { SubmitButton2 } from "../../../Common/Pagination/SubmitButton";
import { SingleImageUpload } from "../../../Helper/ComponentHelper/ImageUpload";
import { financialYear } from "../../../Helper/ComponentHelper/ManageStorage/localStorageUtils";
import { ShowUserMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CustomDropdown24 from "../../../../Components/CustomDropdown/CustomDropdown24";

const CreateHotel = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
  const hotelCreates = useSelector((state) => state?.createHotel);
  const hotelDetails = useSelector((state) => state?.hotelDetail);
  const hotelData = hotelDetails?.data?.data?.hotels || {};

  const countryListData = useSelector((state) => state?.countries);
  const countryList = countryListData?.countries?.country;
  const stateListData = useSelector((state) => state?.states);
  const statess = stateListData?.state?.country;
  const cityListData = useSelector((state) => state?.cities);
  const citiess = cityListData?.city?.country;

  const hotelType = ShowUserMasterData("35");

  const [formData, setFormData] = useState({
    hotel_type: "",
    hotel_name: null,
    address_line_1: null,
    address_line_2: null,
    country_id: 0,
    state_id: 0,
    city_id: 0,
    pincode: "",
    status: 1,
    ratings: 0,
    upload_documents: "",
  });
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");
  const [errors, setErrors] = useState({
    hotel_type: false,
    hotel_name: false,
    address_line_1: false,
    country_id: false,
    state_id: false,
    city_id: false,
    pincode: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData };
    if (name === "country_id") {
      const countryId = value;

      updatedFormData = {
        ...updatedFormData,
        country_id: countryId,
        state_id: "",
        city_id: "",
      };

      dispatch(fetchGetStates({ country_id: countryId }));
    } else if (name === "state_id") {
      const stateId = value;

      updatedFormData = {
        ...updatedFormData,
        state_id: stateId,
        city_id: "",
      };

      dispatch(fetchGetCities({ state_id: stateId }));
    }
    const hotelTypeName = hotelType?.find((val) => val?.labelid == value);

    setFormData((prev) => ({
      ...prev,
      ...(name === "hotel_type" && {
        hotel_type_name: hotelTypeName?.label,
      }),
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };

  useEffect(() => {
    if (itemId) {
      const queryParams = {
        hotel_id: itemId,
        fy: financialYear(),
      };
      dispatch(hotelDetailsAction(queryParams));
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    if (itemId && isEdit && hotelData) {
      setFormData({
        ...formData,
        id: hotelData?.id,
        hotel_type: hotelData?.hotel_type,
        hotel_name: hotelData?.hotel_name,
        address_line_1: hotelData?.address_line_1,
        address_line_2: hotelData?.address_line_2,
        country_id: hotelData?.country?.id,
        state_id: hotelData?.state?.id,
        city_id: hotelData?.city?.id,
        pincode: hotelData?.pincode,
        status: hotelData?.status,
        ratings: hotelData?.ratings,
        upload_documents: hotelData?.upload_documents
          ? JSON?.parse(hotelData.upload_documents)
          : "",
      });

      if (hotelData?.state_id) {
        dispatch(fetchGetCities({ state_id: hotelData?.state_id }));
      }

      if (hotelData?.country_id) {
        dispatch(fetchGetStates({ country_id: hotelData?.country_id }));
      }
      if (hotelData?.upload_documents) {
        setImgeLoader("success");
      }
    }
  }, [itemId, isEdit, hotelData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      hotel_type: formData?.hotel_type ? false : true,
      hotel_name: formData?.hotel_name ? false : true,
      address_line_1: formData?.address_line_1 ? false : true,
      country_id: formData?.country_id ? false : true,
      state_id: formData?.state_id ? false : true,
      city_id: formData?.city_id ? false : true,
      pincode: formData?.pincode ? false : true,
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
          upload_documents: JSON.stringify(formData?.upload_documents),
        };
        dispatch(CreateHotelAction(sendData, Navigate));
      } catch (error) {
        toast.error("Error updating hotel:", error);
      }
    }
    // }
  };
  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg ||
          hotelCreates?.loading ||
          stateListData?.loading ||
          cityListData?.loading) && <MainScreenFreezeLoader />}
        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.hotel_svg}
                {isEdit ? "Update Hotel" : "New Hotel"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link to={"/dashboard/hotels-services"} className="linkx3">
                <RxCross2 />
              </Link>
            </div>
          </div>

          <div id="formofcreateitems">
            <form onSubmit={handleFormSubmit}>
              <div className="relateivdiv">
                <div className="itemsformwrap">
                  <div className="f1wrapofcreq">
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          Hotel Type<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Hotel Type"
                            options={hotelType}
                            value={formData?.hotel_type}
                            onChange={handleChange}
                            name="hotel_type"
                            defaultOption="Select Hotel Type"
                            type="masters"
                          />
                        </span>

                        {errors?.hotel_type && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Hotel Type
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Hotel Name<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.hotel_name}
                            onChange={handleChange}
                            name="hotel_name"
                            placeholder="Enter Hotel Name"
                          />
                        </span>
                        {errors?.hotel_name && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Hotel Name
                          </p>
                        )}
                      </div>

                      <div className="f1wrapofcreqx1">
                        <div className="form_commonblock">
                          <label>
                            Country / Region<b className="color_red">*</b>
                          </label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.country_svg}
                              <CustomDropdown24
                                label="Select Country"
                                options={countryList}
                                value={formData?.country_id}
                                onChange={handleChange}
                                name="country_id"
                                defaultOption="Select Country Name"
                                type="countries"
                              />
                            </span>
                            {errors?.country_id && (
                              <p
                                className="error_message"
                                style={{
                                  whiteSpace: "nowrap",
                                  marginBottom: "0px important",
                                }}
                              >
                                {otherIcons.error_svg}
                                Please Select Country
                              </p>
                            )}
                          </div>
                        </div>

                        <div
                          className={`form_commonblock ${
                            formData?.country_id ? "" : "disabledfield"
                          }`}
                          data-tooltip-content={
                            formData?.country_id
                              ? ""
                              : "Please Select Country First"
                          }
                          data-tooltip-id="my-tooltip"
                          data-tooltip-place="bottom"
                        >
                          <label>
                            Province/State<b className="color_red">*</b>
                          </label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.name_svg}

                              <CustomDropdown24
                                label="Select vendor"
                                options={statess}
                                value={formData?.state_id}
                                onChange={handleChange}
                                name="state_id"
                                defaultOption="Select State Name"
                                type="countries"
                              />
                            </span>
                            {errors?.state_id && (
                              <p
                                className="error_message"
                                style={{
                                  whiteSpace: "nowrap",
                                  marginBottom: "0px important",
                                }}
                              >
                                {otherIcons.error_svg}
                                Please Select State
                              </p>
                            )}
                          </div>
                          {/* {stateErr && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please select the Province name</p>} */}
                        </div>

                        <div
                          className={`form_commonblock ${
                            formData.state_id ? "" : "disabledfield"
                          }`}
                        >
                          <label>
                            City<b className="color_red">*</b>
                          </label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.city_svg}
                              <CustomDropdown24
                                label="Select vendor"
                                options={citiess}
                                value={formData.city_id}
                                onChange={handleChange}
                                name="city_id"
                                defaultOption="Select City Name"
                                type="countries"
                              />
                            </span>
                            {errors?.city_id && (
                              <p
                                className="error_message"
                                style={{
                                  whiteSpace: "nowrap",
                                  marginBottom: "0px important",
                                }}
                              >
                                {otherIcons.error_svg}
                                Please Select City
                              </p>
                            )}
                          </div>
                          {/* {cityErr && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please select the city name</p>} */}
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Address Line 1<b className="color_red">*</b>
                        </label>

                        <span>
                          {otherIcons.name_svg}
                          <input
                            autoComplete="off"
                            type="text"
                            name="address_line_1"
                            placeholder="Address Line 1"
                            value={formData.address_line_1}
                            onChange={(e) => handleChange(e)}
                          />
                        </span>
                        {errors?.address_line_1 && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Address
                          </p>
                        )}
                      </div>

                      <div className="form_commonblock">
                        <label>Address Line 2</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <input
                              autoComplete="off"
                              type="text"
                              name="address_line_2"
                              placeholder="Address Line 2"
                              value={formData.address_line_2}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                        </div>
                      </div>

                      <div className="form_commonblock">
                        <label>
                          Pin Code<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="pincode"
                              placeholder="Enter Pin Code"
                              value={formData.pincode}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                          {errors?.pincode && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Pin Code
                            </p>
                          )}
                        </div>
                      </div>
                      <div id="imgurlanddesc" className="calctotalsectionx2">
                        <SingleImageUpload
                          formData={formData}
                          setFormData={setFormData}
                          setFreezLoadingImg={setFreezLoadingImg}
                          imgLoader={imgLoader}
                          setImgeLoader={setImgeLoader}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <SubmitButton2
                  isEdit={isEdit}
                  itemId={itemId}
                  cancel="hotels-services"
                />
              </div>
            </form>
          </div>
        </div>
        <Toaster reverseOrder={false} />
      </>
    </div>
  );
};

export default CreateHotel;
