import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { MultiImageUploadHelp } from "../../../Helper/ComponentHelper/ImageUpload";
import { ShowMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";

const CreateHotel = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
  const hotelCreates = useSelector((state) => state?.createHotel);
  const hotelDetails = useSelector((state) => state?.hotelDetail);
  const hotelData = hotelDetails?.data?.data?.hotels || {};

  const countryList = useSelector((state) => state?.countries?.countries);
  const states = useSelector((state) => state?.states?.state);
  const statesLoader = useSelector((state) => state?.states?.loading);
  const cities = useSelector((state) => state?.cities?.city);
  const citiesLoader = useSelector((state) => state?.cities?.loading);

  const hotelType = ShowMasterData("35");

  const [formData, setFormData] = useState({
    hotel_type: "",
    hotel_name: null,
    address_line_1: null,
    address_line_2: null,
    country_id: 0,
    state_id: 0,
    city_id: 0,
    pin_code: "",
    status: 0,
    ratings: 0,
    upload_documents: [],
  });
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");
  const [errors, setErrors] = useState({
    hotel_id: false,
  });

  console.log(imgLoader)
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
    dispatch(fetchGetCountries());
  }, [dispatch]);

  useEffect(() => {
    if (itemId) {
      const queryParams = {
        hotel_id: itemId,
        fy: localStorage.getItem("FinancialYear"),
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
        country_id: hotelData?.country_id,
        state_id: hotelData?.state_id,
        city_id: hotelData?.city_id,
        pin_code: hotelData?.pin_code,
        status: hotelData?.status,
        ratings: hotelData?.ratings,
        upload_documents: hotelData?.upload_documents
          ? JSON.parse(hotelData.upload_documents)
          : [],
      });

      if (hotelData?.state_id) {
        dispatch(fetchGetCities({ state_id: hotelData?.state_id }));
      }

      if (hotelData?.country_id) {
        dispatch(fetchGetStates({ country_id: hotelData?.country_id }));
      }
      if (hotelData?.upload_documents) {
        setImgeLoader("success")
      }
    }
  }, [itemId, isEdit, hotelData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // let newErrors = {
    //   hotel_id: formData?.hotel_id ? false : true,
    // };
    // setErrors(newErrors);
    // const hasAnyError = Object.values(newErrors).some(
    //   (value) => value === true
    // );
    console.log("caaaaaaaaaaaaaa")
    // if (hasAnyError) {
    //   return;
    // } else {
    try {
      const sendData = {
        ...formData,
        upload_documents: JSON.stringify(formData?.upload_documents),
      };
      dispatch(CreateHotelAction(sendData, Navigate));
    } catch (error) {
      toast.error("Error updating hotel:", error);
    }
    // }
  };
  return (
    <div>
      <>
        {statesLoader && <MainScreenFreezeLoader />}
        {citiesLoader && <MainScreenFreezeLoader />}
        <TopLoadbar />
        {(freezLoadingImg || hotelCreates?.loading) && (
          <MainScreenFreezeLoader />
        )}
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

                        {/* {!isCustomerSelect && (
                            <p
                              className="error-message"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {otherIcons.error_svg}
                              Please Select Hotel Type
                            </p>
                          )} */}
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
                      </div>

                      <div className="f1wrapofcreqx1">
                        <div className="form_commonblock">
                          <label>Country / Region</label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.country_svg}
                              <select
                                name="country_id"
                                value={formData.country_id}
                                onChange={(e) => handleChange(e, "country_id")}
                              >
                                <option value="">Select Country</option>
                                {countryList?.country?.map((country) => (
                                  <option key={country.id} value={country.id}>
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            </span>
                          </div>
                          {/* {countryErr && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please select the country name</p>} */}
                        </div>

                        <div
                          className={`form_commonblock ${formData.country_id ? "" : "disabledfield"
                            }`}
                        >
                          <label>Province/State</label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.state_svg}

                              <select
                                name="state_id"
                                value={formData.state_id}
                                onChange={(e) => handleChange(e, "state_id")}
                              >
                                <option value="">Select State</option>
                                {states?.country?.map((state) => (
                                  <option key={state.id} value={state.id}>
                                    {state.name}
                                  </option>
                                ))}
                              </select>
                            </span>
                          </div>
                          {/* {stateErr && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please select the Province name</p>} */}
                        </div>

                        <div
                          className={`form_commonblock ${formData.state_id ? "" : "disabledfield"
                            }`}
                        >
                          <label>City</label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.city_svg}
                              <select
                                name="city_id"
                                value={formData.city_id}
                                onChange={(e) => handleChange(e)}
                              >
                                <option value="">Select City</option>
                                {cities?.country?.map((city) => (
                                  <option key={city.id} value={city.id}>
                                    {city.name}
                                  </option>
                                ))}
                              </select>
                            </span>
                          </div>
                          {/* {cityErr && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please select the city name</p>} */}
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>Address Line 1</label>

                        <span>
                          {otherIcons.street_svg}
                          <input
                            autoComplete="off"
                            type="text"
                            name="address_line_1"
                            placeholder="Address Line 1"
                            value={formData.address_line_1}
                            onChange={(e) => handleChange(e)}
                          />
                        </span>
                      </div>

                      <div className="form_commonblock">
                        <label>Address Line 2</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.street_svg}
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
                        <label>Pin Code</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.zip_code_svg}
                            <NumericInput
                              name="pin_code"
                              placeholder="Enter Pin Code"
                              value={formData.pin_code}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                        </div>
                      </div>
                      <div id="imgurlanddesc" className="calctotalsectionx2">
                        <MultiImageUploadHelp
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
                  cancel="hotel-services"
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
