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
import { transport } from "../../../Helper/ComponentHelper/DropdownData";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";

const CreateTourPackage = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const countryList = useSelector((state) => state?.countries?.countries);
  const states = useSelector((state) => state?.states?.state);
  const statesLoader = useSelector((state) => state?.states?.loading);
  const cities = useSelector((state) => state?.cities?.city);
  const citiesLoader = useSelector((state) => state?.cities?.loading);

  const hotelType = ShowMasterData("35");
  const meal = ShowMasterData("37");

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
    const mealName = meal?.find((val) => val?.labelid == value);
 
    setFormData((prev) => ({
      ...prev,
      ...(name === "hotel_type_id" && {
        hotel_type_name: hotelTypeName?.label,
      }),
      ...(name === "meal_id" && {
        meal_name: mealName?.label,
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
                {isEdit ? "Update Tour Package" : "New Tour Package"}
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
                          Package Name<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.package_name}
                            onChange={handleChange}
                            name="package_name"
                            placeholder="Enter Package Name"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>
                           Destination<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.destination}
                            onChange={handleChange}
                            name="destination"
                            placeholder="Enter Destination"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>Days</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="days"
                              placeholder="Enter Days"
                              value={formData.days}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                        </div>
                      </div>
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
                      <label>Transport<b className='color_red'>*</b></label>
                      <div id="inputx1">
                        <span>
                          {otherIcons?.home_brek_svg}
                          <CustomDropdown04
                            label="Transport"
                            options={transport}
                            value={formData?.transport}
                            onChange={handleChange}
                            name="transport"
                            defaultOption="Select Yes/No"
                            type="masters"
                          />
                        </span>
                      </div>
                    </div>
                      <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>Price Per Person</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="price_per_person"
                              placeholder="Enter Price Per Person"
                              value={formData.price_per_person}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                        </div>
                      </div>
                      </div>
                      <div className="secondtotalsections485s">
                              <div className="textareaofcreatqsiform">
                                <label>Description</label>
                                <div className="show_no_of_text_limit_0121">
                                  <TextAreaComponentWithTextLimit
                                    formsValues={{ handleChange, formData }}
                                    placeholder="Enter description...."
                                    name="value_string"
                                    value={formData?.value_string}
                                  />
                                </div>
                              </div>
                            </div>
                      
                    </div>
                  </div>
                </div>

                <SubmitButton
                  isEdit={isEdit}
                  itemId={itemId}
                  cancel="tour-package-services"
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

export default CreateTourPackage;
