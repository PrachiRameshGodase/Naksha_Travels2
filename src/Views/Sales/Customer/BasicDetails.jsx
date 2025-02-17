//basic details for customer///
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";
import { CustomDropdown006 } from "../../../Components/CustomDropdown/CustomDropdown06";
import CustomDropdown19 from "../../../Components/CustomDropdown/CustomDropdown19";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import { fetchGetCountries } from "../../../Redux/Actions/globalActions";
import { OverflowHideBOdy } from "../../../Utils/OverflowHideBOdy";
import { formatDate } from "../../Helper/DateFormat";
import {
  ShowMasterData,
  ShowUserMasterData,
} from "../../Helper/HelperFunctions";
import NumericInput from "../../Helper/NumericInput";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import CustomDropdown24 from "../../../Components/CustomDropdown/CustomDropdown24";

const BasicDetails = ({
  updateUserData,
  switchCusData,
  customerData,
  tick,
  setTick,
  dropdownRef1,
  basicDetails,
  setBasicDetails,
  errors,
  setErrors,
}) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const countries = useSelector(state => state?.countries);
  const countriess = countries?.countries?.country

  const { isDuplicate, isEdit, user } = customerData;
  const [customerDisplayName, setCustomerDisplayName] = useState(false);
  const [showRegisterdFields, setShowRegisterdFields] = useState(false);

  const salutation_options = ShowMasterData("4");
  const paymentTerms = ShowMasterData("8");
  const showdeparment = ShowMasterData("10");
  const customerBloodGroup = ShowMasterData("44");
  const customerGender = ShowUserMasterData("45");

  const [selectedImage, setSelectedImage] = useState(""); // State for the selected image URL

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBasicDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        [name]: value,
      };

      // Automatically set display_name to first_name if first_name is updated and display_name is empty
      if (name === "first_name") {
        updatedDetails.display_name = value;
      }

      // Update citizenship when country_id changes
      if (name === "citizenship") {
        updatedDetails.citizenship = value;
      }

      return updatedDetails;
    });

    // Handle registration_type specific logic
    if (name === "registration_type") {
      setShowRegisterdFields(value === "Registered");
    }

    // Clear errors for the field being updated
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  useEffect(() => {
    dispatch(fetchGetCountries());
  }, [dispatch]);

  const handleChange1 = (selectedItems) => {
    setBasicDetails({
      ...basicDetails,
      department: selectedItems, // Update selected items array
    });
  };

  // Function to update displayNames based on basicDetails
  const [displayNames, setDisplayNames] = useState([]);

  // useEffect(() => {
  //   const names = new Set(); // Create a new Set to avoid duplicates

  //   // Handle combined names with and without salutation
  //   const showSalutationValue =
  //     basicDetails?.salutation == 1
  //       ? "Mr."
  //       : basicDetails?.salutation == 2
  //       ? "Mrs."
  //       : basicDetails?.salutation == 3
  //       ? "Ms."
  //       : basicDetails?.salutation == 4
  //       ? "Miss."
  //       : basicDetails?.salutation == 5
  //       ? "Dr"
  //       : "";
  //   if (basicDetails.first_name) {
  //     names.add(`${basicDetails.first_name} ${basicDetails.last_name}`);
  //     if (basicDetails.salutation) {
  //       names.add(
  //         `${showSalutationValue} ${basicDetails.first_name} ${basicDetails.last_name}`
  //       );
  //     }
  //   } else {
  //     // Handle individual names with salutation
  //     if (basicDetails.salutation && basicDetails.first_name) {
  //       names.add(`${showSalutationValue} ${basicDetails.first_name}`);
  //     }
  //     if (basicDetails.salutation && basicDetails.last_name) {
  //       names.add(`${showSalutationValue} ${basicDetails.last_name}`);
  //     }
  //   }

  //   setDisplayNames(Array.from(names)); // Convert Set back to Array
  // }, [
  //   basicDetails.salutation,
  //   basicDetails.first_name,
  //   basicDetails.last_name,
  // ]);
  // Function to update displayNames based on basicDetails

  // for set Company name value in display name when I click outside
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "first_name" && !basicDetails.display_name) {
      setBasicDetails((prevDetails) => ({
        ...prevDetails,
        display_name: value,
      }));
    }
    const names = new Set(displayNames);
    if (basicDetails.first_name) names.add(basicDetails.first_name);
    if (basicDetails.first_name) {
      names.add(`${basicDetails.first_name}`);
    }
    setDisplayNames(Array.from(names));
  };
  // for set Company name value in display name when I click outside

  //return true for set tick mark if all required fields are filled
  const setTickBasicDetails = () => {
    const { email, display_name, mobile_no } = basicDetails;
    const isBasicDetailsFilled =
      display_name !== "" && basicDetails.display_name !== "";
    setTick({
      ...tick,
      basicTick: isBasicDetailsFilled,
    });
  };

  //for error handling
  useEffect(() => {
    setTickBasicDetails();
    const { display_name } = basicDetails;
    setCustomerDisplayName(display_name !== "");
    const updatedDetails = {
      ...basicDetails,
      department:
        basicDetails?.department?.length === 0
          ? null
          : JSON?.stringify(basicDetails?.department),
    };
    updateUserData(updatedDetails);
  }, [basicDetails]);

  //for edit and duplicate

  useEffect(() => {
    if ((user?.id && isEdit) || (user?.id && isDuplicate)) {
      const depArray = JSON?.parse(user?.department || "[]");
      setBasicDetails({
        ...basicDetails,
        salutation: user?.salutation,
        department: !depArray ? [] : depArray,
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        mobile_no: user?.mobile_no,
        work_phone: user?.work_phone,
        customer_type: user?.customer_type,
        is_customer: +user?.is_customer,
        gst_no: user?.gst_no,
        pan_no: user?.pan_no,
        gender: user?.gender,
        d_o_b: user?.d_o_b,
        blood_group: user?.blood_group,
        citizenship: user?.citizenship,
        business_leagal_name: user?.business_leagal_name,
        display_name: user?.display_name,
        company_name: user?.company_name,
        place_of_supply: user?.place_of_supply,
        tax_preference: user?.tax_preference,
        currency: user?.currency,
        payment_terms: user?.payment_terms,
        opening_balance: user?.opening_balance,
        // designation: user?.designation,
        website: user?.website,
        registration_type: user?.registration_type,
      });

      if (user?.registration_type) {
        setShowRegisterdFields(true);
      }
      setTick({
        ...tick,
        basicTick: true,
      });
    }
  }, [user]);

  //handleclick outside
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
      setShowDropdownx1(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //handleclick outside

  // image upload from firebase
  const [imgLoader, setImgeLoader] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  useEffect(() => {
    OverflowHideBOdy(showPopup);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPopup]);

  // image upload from firebase

  const registerationtypes = [
    {
      id: 1,
      type: "Registered",
      labelid: "Registered",
      label: "Registered",
      value: "0",
    },
    {
      id: 2,
      type: "Un-Registered",
      labelid: "Un-Registered",
      label: "Un-Registered",
      value: "0",
    },
  ];

  return (
    <>
      {freezLoadingImg && <MainScreenFreezeLoader />}

      {switchCusData === "Basic" ? (
        <div id="secondx2_customer">
          <div id="main_forms_desigin_cus">
            <div className="sections">
              <div id="fcx3s1parent">
                <div className="form_commonblockx3">
                  <div className="iconheading">
                    {otherIcons.quotation_icon}
                    <p>Basic Details</p>
                  </div>
                  <div className="sections">
                    <div id="fcx3s1parent">
                      <div className="form_commonblock">
                        <label>Salutation</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.quotation_icon}

                            <CustomDropdown04
                              options={salutation_options}
                              value={basicDetails?.salutation}
                              onChange={handleChange}
                              name="salutation"
                              defaultOption="Select Salutation"
                              type="masters_salutation"
                              // extracssclassforscjkls="extracssclassforscjklsSalutation"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          First Name<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            <input
                              autoComplete="off"
                              type="input"
                              style={{ width: "100%" }}
                              name="first_name"
                              value={basicDetails.first_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={`Enter First Name`}
                            />
                          </span>
                        </div>
                        {errors?.first_name && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill First Name
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label className="">Last Name</label>
                        <div id="inputx1">
                          <span>
                            {/* {otherIcons.company_name_svg} */}
                            <input
                              autoComplete="off"
                              style={{ width: "100%" }}
                              type="text"
                              name="last_name"
                              value={basicDetails.last_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Last Name"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sections">
              <div id="fcx3s1parent">
                <div className="form_commonblock">
                  <label>
                    Email<b className="color_red">*</b>
                  </label>
                  <span>
                    {otherIcons.email_svg}
                    <input
                      autoComplete="off"
                      type="email"
                      name="email"
                      value={basicDetails.email}
                      onChange={handleChange}
                      placeholder={`Enter Email`}
                    />
                  </span>
                  {errors?.email && (
                    <p
                      className="error_message"
                      style={{
                        whiteSpace: "nowrap",
                        marginBottom: "0px important",
                      }}
                    >
                      {otherIcons.error_svg}
                      Please Fill Email
                    </p>
                  )}
                </div>
                <div className="form_commonblock">
                  <label className="">Company Name</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.company_name_svg}
                      <input
                        autoComplete="off"
                        style={{ width: "100%" }}
                        type="text"
                        name="company_name"
                        value={basicDetails.company_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter Company Name"
                      />
                    </span>
                  </div>
                </div>
                <div className="form_commonblock">
                  <label>
                    Customer Display Name <b className="color_red">*</b>
                  </label>
                  <div id="inputx1">
                    <span>
                      {otherIcons?.quotation_icon}

                      <CustomDropdown19
                        label="Display Name"
                        options={displayNames}
                        value={basicDetails.display_name}
                        // setBasicDetailsDisplayName={setBasicDetails}
                        onChange={handleChange}
                        name="display_name"
                        defaultOption="Select or Type Display Name"
                        type="basicDetail"
                        ref={dropdownRef1}
                      />
                    </span>
                    {errors?.display_name && (
                      <p
                        className="error_message"
                        style={{
                          whiteSpace: "nowrap",
                          marginBottom: "0px important",
                        }}
                      >
                        {otherIcons.error_svg}
                        Please Fill Display Name
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="height5"></div>
              <div className="height5"></div>
            </div>

            <div className="sections">
              <div id="fcx3s1parent">
                <div className="form_commonblock">
                  <label>Mobile Number</label>
                  <span>
                    {otherIcons.mobile_svg}
                    <NumericInput
                      style={{ width: "100%" }}
                      name="mobile_no"
                      value={basicDetails.mobile_no}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                    />
                  </span>
                </div>

                <div className="form_commonblock">
                  <label className="">Work Phone</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons?.mobile_svg}
                      <NumericInput
                        style={{ width: "100%" }}
                        name="work_phone"
                        value={basicDetails.work_phone}
                        onChange={handleChange}
                        placeholder="Enter Work Phone"
                      />
                    </span>
                  </div>
                </div>
                <div className="form_commonblock">
                  <label>Departmants</label>
                  <span>
                    {otherIcons.vendor_svg}
                    <CustomDropdown006
                      options={showdeparment}
                      value={basicDetails?.department}
                      onChange={handleChange1}
                      name="department"
                      defaultOption="Select Departments"
                      id1="position_depart_3221"
                    />
                  </span>
                </div>
              </div>
              <div className="height5"></div>
              <div className="height5"></div>
            </div>
            <div className="sections">
              <div id="fcx3s1parent">
                <div className="form_commonblock ">
                  <label>Date Of Birth</label>
                  <span>
                    {otherIcons.date_svg}
                    <DatePicker
                      selected={basicDetails?.d_o_b}
                      onChange={(date) =>
                        setBasicDetails({
                          ...basicDetails,
                          d_o_b: formatDate(date),
                        })
                      }
                      name="d_o_b"
                      placeholderText="Enter Date"
                      dateFormat="dd-MM-yyyy"
                      autoComplete="off"
                      minDate={new Date(new Date().getFullYear() - 50, 0, 1)} // Start 50 years in the past
                      maxDate={new Date(new Date().getFullYear() + 50, 11, 31)} // End 50 years in the future
                      showYearDropdown // Enables the year dropdown
                      scrollableYearDropdown // Allows scrolling in the year dropdown
                      yearDropdownItemNumber={101}
                    />
                  </span>
                </div>

                <div className="form_commonblock">
                  <label>Blood Group</label>
                  <span>
                    {otherIcons.vendor_svg}
                    <CustomDropdown04
                      label="Blood Group"
                      options={customerBloodGroup}
                      value={basicDetails?.blood_group}
                      onChange={handleChange}
                      name="blood_group"
                      defaultOption="Select Blood Group"
                      type="masters"
                    />
                  </span>
                </div>
                <div className="form_commonblock">
                  <label>Citizenship</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.country_svg}

                      <CustomDropdown24
                        label="Select vendor"
                        options={countriess}
                        value={basicDetails?.citizenship}
                        onChange={handleChange}
                        name="citizenship"
                        defaultOption="Select Citizenship"
                        type="countries"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="height5"></div>
              <div className="height5"></div>
            </div>

            <div id="fcx3s1parent">
              <div className="form_commonblock">
                <label>Gender</label>
                <span>
                  {otherIcons.vendor_svg}
                  <CustomDropdown04
                    label="Gender"
                    options={customerGender}
                    value={basicDetails?.gender}
                    onChange={handleChange}
                    name="gender"
                    defaultOption="Select Gender"
                    type="masters"
                  />
                </span>
              </div>
              <div className="form_commonblock">
                <label>Registration Type</label>
                <div id="inputx1">
                  <span>
                    {otherIcons.registration_type_svg}
                    <CustomDropdown04
                      label="Registation name"
                      options={registerationtypes}
                      value={basicDetails?.registration_type}
                      onChange={handleChange}
                      name="registration_type"
                      defaultOption="Select Registation Types"
                      type="masters"
                    />
                  </span>
                </div>
              </div>
              <div className="form_commonblock">
                <label>Website</label>
                <div id="inputx1">
                  <span>
                    {otherIcons.website_icon_svg}
                    <input
                      autoComplete="off"
                      style={{ width: "100%" }}
                      type="text"
                      name="website"
                      value={basicDetails.website}
                      onChange={handleChange}
                      placeholder="Enter Website"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div id="fcx3s1parent">
              {showRegisterdFields && (
                <>
                  <div className="form_commonblock">
                    <label>VAT Number</label>
                    <div id="inputx1">
                      <span>
                        {otherIcons.vatno_svg}

                        <input
                          autoComplete="off"
                          style={{ width: "100%" }}
                          type="text"
                          name="gst_no"
                          value={basicDetails?.gst_no}
                          onChange={handleChange}
                          placeholder="Enter VAT Number"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="form_commonblock">
                    <label>Taxpayer Identification Number</label>
                    <div id="inputx1">
                      <span>
                        {otherIcons.taxno_svg}
                        <input
                          autoComplete="off"
                          required
                          style={{ width: "100%" }}
                          type="text"
                          name="pan_no"
                          value={basicDetails.pan_no}
                          onChange={handleChange}
                          placeholder="Enter TIN Number"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="form_commonblock">
                    <label style={{ marginLeft: "2px" }}>
                      Business Legal Name
                    </label>
                    <div id="inputx1">
                      <span>
                        {otherIcons.quotation_icon}
                        <input
                          autoComplete="off"
                          style={{ width: "100%" }}
                          type="text"
                          name="business_leagal_name"
                          value={basicDetails.business_leagal_name}
                          onChange={handleChange}
                          placeholder="Enter Business Legal Name"
                        />
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {showPopup && (
            <div className="mainxpopups2" ref={popupRef}>
              <div className="popup-content02">
                <span
                  className="close-button02"
                  onClick={() => setShowPopup(false)}
                >
                  <RxCross2 />
                </span>
                <img
                  src={selectedImage}
                  alt="Selected Image"
                  height={500}
                  width={500}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BasicDetails;
