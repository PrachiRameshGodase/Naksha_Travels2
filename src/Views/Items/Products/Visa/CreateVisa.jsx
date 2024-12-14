import React, { useEffect, useRef, useState } from "react";
import SubmitButton, {
  SubmitButton2,
} from "../../../Common/Pagination/SubmitButton";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
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
import { MultiImageUploadHelp } from "../../../Helper/ComponentHelper/ImageUpload";
import {
  CreateVisaAction,
  visaDetailsAction,
} from "../../../../Redux/Actions/visaAction";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";

const CreateVisa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
  const VisaCreates = useSelector((state) => state?.createVisa);
  const VisaDetails = useSelector((state) => state?.visaDetails);
  const visaData = VisaDetails?.data?.data?.data || {};

  const countryList = useSelector((state) => state?.countries?.countries);
  const states = useSelector((state) => state?.states?.state);
  const statesLoader = useSelector((state) => state?.states?.loading);
  const cities = useSelector((state) => state?.cities?.city);
  const citiesLoader = useSelector((state) => state?.cities?.loading);

  const visaentryType = ShowMasterData("39");
  const visatype = ShowMasterData("40");

  const [formData, setFormData] = useState({
    visa_entry_type: "",
    visa_entry_name: "",
    country_id: 0,
    country_name: "",
    visa_type_id: "",
    visa_type_name: "",
    days: "",
    price: "",
  });
 
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

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
    }
    const visaEntryType = visaentryType?.find((val) => val?.labelid == value);
    const visaType = visatype?.find((val) => val?.labelid == value);

    setFormData((prev) => ({
      ...prev,
      ...(name === "visa_entry_type" && {
        visa_entry_name: visaEntryType?.label,
      }),
      ...(name === "visa_type_id" && {
        visa_type_name: visaType?.label,
      }),
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchGetCountries());
  }, [dispatch]);

  useEffect(() => {
    if (itemId) {
      const queryParams = {
        visa_id: itemId,
        fy: localStorage.getItem("FinancialYear"),
      };
      dispatch(visaDetailsAction(queryParams));
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    if (itemId && isEdit && visaData) {
      setFormData({
        ...formData,
        id: visaData?.id,
        visa_entry_type: visaData?.visa_entry_type,
        visa_entry_name: visaData?.visa_entry_name,
        country_id: visaData?.country_id,
        country_name: visaData?.country_name,
        visa_type_id: visaData?.visa_type_id,
        visa_type_name: visaData?.visa_type_name,
        days: visaData?.days,
        price: visaData?.price,
        status: visaData?.status,
      });
    }
  }, [itemId, isEdit, visaData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = {
        ...formData,
      };
      dispatch(CreateVisaAction(sendData, navigate));
    } catch (error) {
      toast.error("Error updating visa:", error);
    }
  };
  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg || VisaCreates?.loading) && (
          <MainScreenFreezeLoader />
        )}
        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.hotel_svg}
                {isEdit ? "Update Visa" : "New Visa"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link to={"/dashboard/visas-services"} className="linkx3">
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
                          Visa Entry Type<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Visa Entry Type"
                            options={visaentryType}
                            value={formData?.visa_entry_type}
                            onChange={handleChange}
                            name="visa_entry_type"
                            defaultOption="Select Visa Entry Type"
                            type="masters"
                          />
                        </span>
                      </div>

                      <div className="form_commonblock">
                        <label>
                          Visa Type<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Visa Type"
                            options={visatype}
                            value={formData?.visa_type_id}
                            onChange={handleChange}
                            name="visa_type_id"
                            defaultOption="Select Visa Type"
                            type="masters"
                          />
                        </span>
                      </div>
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
                        <label>Price</label>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <SubmitButton2
                  isEdit={isEdit}
                  itemId={itemId}
                  cancel="visas-services"
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

export default CreateVisa;
