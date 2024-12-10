import React, { useEffect, useRef, useState } from "react";
import SubmitButton from "../../../Common/Pagination/SubmitButton";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import NumericInput from "../../../Helper/NumericInput";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import { ShowMasterData } from "../../../Helper/HelperFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetCities,
  fetchGetCountries,
  fetchGetStates,
} from "../../../../Redux/Actions/globalActions";

const CreateHotel = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const countryList = useSelector((state) => state?.countries?.countries);
  const states = useSelector((state) => state?.states?.state);
  const statesLoader = useSelector((state) => state?.states?.loading);
  const cities = useSelector((state) => state?.cities?.city);
  const citiesLoader = useSelector((state) => state?.cities?.loading);

  const hotelType = ShowMasterData("35");

  const [formData, setFormData] = useState({
    hotel_type_id: "",
    hotel_name: "",
    country_id: "",
    street_1: "",
    street_2: "",
    state_id: "",
    city_id: "684",
    zip_code: "",
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
      ...(name === "hotel_type_id" && {
        hotel_type_name: hotelTypeName?.label,
      }),

      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchGetCountries());
  }, [dispatch]);

  const customerRef = useRef(null);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.nativeEvent.submitter.name;
    const errors = validateItems(formData?.items);

    // if (errors.length > 0) {
    //   setItemErrors(errors);
    //   return;
    // }
    // if (handleDropdownError(isCustomerSelect, customerRef)) return;

    try {
      const updatedItems = formData?.items?.map((item) => {
        item;
      });

      // dispatch(
      //   updateQuotation(
      //     {
      //       ...formData,
      //       items: updatedItems,

      //     },
      //     Navigate,
      //     "quotation",
      //     isEdit,
      //     buttonName,
      //     showAllSequenceId
      //   )
      // );
    } catch (error) {
      toast.error("Error updating hotel:", error);
    }
  };
  return (
    <div>
      <>
        <TopLoadbar />
        {/* {(freezLoadingImg || quoteCreate?.loading || autoId?.loading) && (
          <MainScreenFreezeLoader />
        )} */}
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
                            value={formData?.hotel_type_id}
                            onChange={handleChange}
                            name="hotel_type_id"
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
                          className={`form_commonblock ${
                            formData.country_id ? "" : "disabledfield"
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
                          className={`form_commonblock ${
                            formData.state_id ? "" : "disabledfield"
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
                        <label>Street 1</label>

                        <span>
                          {otherIcons.street_svg}
                          <input
                            autoComplete="off"
                            type="text"
                            name="street_1"
                            placeholder="Street 1"
                            value={formData.street_1}
                            onChange={(e) => handleChange(e)}
                          />
                        </span>
                      </div>

                      <div className="form_commonblock">
                        <label>Street 2</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.street_svg}
                            <input
                              autoComplete="off"
                              type="text"
                              name="street_2"
                              placeholder="Street 2"
                              value={formData.street_2}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                        </div>
                      </div>

                      <div className="form_commonblock">
                        <label>Zip Code</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.zip_code_svg}
                            <NumericInput
                              name="zip_code"
                              placeholder="Enter Zip Code"
                              value={formData.zip_code}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <SubmitButton
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
