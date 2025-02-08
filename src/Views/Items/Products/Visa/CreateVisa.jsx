import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import { fetchGetCountries } from "../../../../Redux/Actions/globalActions";
import {
  CreateVisaAction,
  visaDetailsAction,
} from "../../../../Redux/Actions/visaAction";
import { SubmitButton2 } from "../../../Common/Pagination/SubmitButton";
import { ShowUserMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CustomDropdown24 from "../../../../Components/CustomDropdown/CustomDropdown24";
import { financialYear } from "../../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const CreateVisa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const VisaCreates = useSelector((state) => state?.createVisa);
  const VisaDetails = useSelector((state) => state?.visaDetails);
  const visaData = VisaDetails?.data?.data?.data || {};
  const countries = useSelector(state => state?.countries);
  const countryList = countries?.countries?.country

  const visaentryType = ShowUserMasterData("39");
  const visatype = ShowUserMasterData("40");

  const [formData, setFormData] = useState({
    visa_entry_type: "",
    visa_entry_name: "",
    country_id: "",
    country_name: "",
    visa_type_id: "",
    visa_type_name: "",
    days: "",
    price: "",
  });
  const [errors, setErrors] = useState({
    visa_entry_type: false,
    country_id: false,
    visa_type_id: false,
    days: false,
    price: false,
  });
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFields = { [name]: value };

    const visaEntryType = visaentryType?.find((val) => val?.labelid == value);
    const visaType = visatype?.find((val) => val?.labelid == value);
    if (name === "country_id") {
      const selectedCountry = countryList?.find(
        (item) => item?.id == value
      );
      updatedFields = {
        ...updatedFields,
        country_name: selectedCountry?.name || "",
      };
    }
    setFormData((prev) => ({
      ...prev,
      ...(name === "visa_entry_type" && {
        visa_entry_name: visaEntryType?.label,
      }),
      ...(name === "visa_type_id" && {
        visa_type_name: visaType?.label,
      }),
      ...updatedFields,
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
        visa_id: itemId,
        fy: financialYear(),
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
    let newErrors = {
      visa_entry_type: formData?.visa_entry_type ? false : true,
      country_id: formData?.country_id ? false : true,
      visa_type_id: formData?.visa_type_id ? false : true,
      days: formData?.days ? false : true,
      price: formData?.price ? false : true,
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
        };
        dispatch(CreateVisaAction(sendData, navigate));
      } catch (error) {
        toast.error("Error updating visa:", error);
      }
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
                          Country / Region<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.country_svg}

                            {/* <select
                              name="country_id"
                              value={formData?.country_id}
                              onChange={(e) => handleChange(e, "country_id")}
                            >
                              <option value="">Select Country</option>
                              {countryList?.country?.map((country) => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </select> */}
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
                        {errors?.visa_entry_type && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Visa Entry Type
                          </p>
                        )}
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
                        {errors?.visa_type_id && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Visa Type
                          </p>
                        )}
                      </div>

                      <div className="form_commonblock">
                        <label>
                          Days<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="days"
                              placeholder="Enter Days"
                              value={formData?.days}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                          {errors?.days && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Days
                            </p>
                          )}
                        </div>
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
                              value={formData?.price}
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
