//basic details for customer///
import React, { useEffect, useRef, useState } from "react";
import {
  fetchGetCountries,
  fetchMasterData,
} from "../../../Redux/Actions/globalActions";
import { useDispatch, useSelector } from "react-redux";
import { MdCheck } from "react-icons/md";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import { RxCross2 } from "react-icons/rx";
import { OverflowHideBOdy } from "../../../Utils/OverflowHideBOdy";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown19 from "../../../Components/CustomDropdown/CustomDropdown19";
import NumericInput from "../../Helper/NumericInput";
import {
  getCurrencyFormData,
  ShowMasterData,
} from "../../Helper/HelperFunctions";
import { CustomDropdown006 } from "../../../Components/CustomDropdown/CustomDropdown06";
import DatePicker from "react-datepicker";
import { formatDate } from "../../Helper/DateFormat";

const BasicDetails = ({
  updateUserData,
  switchCusData,
  customerData,
  tick,
  setTick,
  dropdownRef1,
  basicDetails,
  setBasicDetails
}) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const countryList = useSelector((state) => state?.countries?.countries);

  const { isDuplicate, isEdit, user } = customerData;
  const { masterData } = useSelector((state) => state?.masterData);
  const [customerDisplayName, setCustomerDisplayName] = useState(false);
  const [showRegisterdFields, setShowRegisterdFields] = useState(false);

  const salutation_options = ShowMasterData("4");
  const paymentTerms = ShowMasterData("8");
  const showdeparment = ShowMasterData("10");
  const customerBloodGroup = ShowMasterData("44");
  const customerGender = ShowMasterData("45");

 

  const [selectedImage, setSelectedImage] = useState(""); // State for the selected image URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    const bloodGroupName = customerBloodGroup?.find(
      (val) => val?.labelid == value
    );
    const genderName = customerGender?.find((val) => val?.labelid == value);

    setBasicDetails((prevDetails) => ({
      ...prevDetails,
      ...(name === "blood_group" && {
        blood_group: bloodGroupName?.label,
      }),
      ...(name === "gender" && {
        gender: genderName?.label,
      }),
      ...(name === "country_id" && { citizenship: value }),
      [name]: value,
    }));

    if (name === "registration_type" && value === "Registered") {
      setShowRegisterdFields(true);
    } else if (name === "registration_type" && value === "Un-Registered") {
      setShowRegisterdFields(false);
    }
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

  useEffect(() => {
    const names = new Set(); // Create a new Set to avoid duplicates

    // Handle combined names with and without salutation
    const showSalutationValue =
      basicDetails?.salutation == 1
        ? "Mr."
        : basicDetails?.salutation == 2
          ? "Mrs."
          : basicDetails?.salutation == 3
            ? "Ms."
            : basicDetails?.salutation == 4
              ? "Miss."
              : basicDetails?.salutation == 5
                ? "Dr"
                : "";
    if (basicDetails.first_name && basicDetails.last_name) {
      names.add(`${basicDetails.first_name} ${basicDetails.last_name}`);
      if (basicDetails.salutation) {
        names.add(
          `${showSalutationValue} ${basicDetails.first_name} ${basicDetails.last_name}`
        );
      }
    } else {
      // Handle individual names with salutation
      if (basicDetails.salutation && basicDetails.first_name) {
        names.add(`${showSalutationValue} ${basicDetails.first_name}`);
      }
      if (basicDetails.salutation && basicDetails.last_name) {
        names.add(`${showSalutationValue} ${basicDetails.last_name}`);
      }
    }

    setDisplayNames(Array.from(names)); // Convert Set back to Array
  }, [
    basicDetails.salutation,
    basicDetails.first_name,
    basicDetails.last_name,
  ]);
  // Function to update displayNames based on basicDetails

  // for set Company name value in display name when I click outside
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "company_name" && !basicDetails.display_name) {
      setBasicDetails((prevDetails) => ({
        ...prevDetails,
        display_name: value,
      }));
    }
    const names = new Set(displayNames);
    if (basicDetails.company_name) names.add(basicDetails.company_name);
    if (basicDetails.company_name) {
      names.add(`${basicDetails.company_name}`);
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
      const depArray = JSON.parse(user?.department || "[]");
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

  // console.log("formdata", basicDetails?.salutation)

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
  // console.log("basicDetails", basicDetails);
  return (
    <>
      {freezLoadingImg && <MainScreenFreezeLoader />}

      {switchCusData === "Basic" ? (
        <div id="secondx2_customer">
          <div id="main_forms_desigin_cus">
           <div className="sections">
              <div id="fcx3s1parent">
                <div className="form_commonblockx3">
                  <label>Primary Contact</label>
                  <div id="fcx3s1">
                   

                    <span>
                      
                      <CustomDropdown04
                        options={salutation_options}
                        value={basicDetails?.salutation}
                        onChange={handleChange}
                        name="salutation"
                        defaultOption="Select Salutation"
                        type="masters_salutation"
                        extracssclassforscjkls="extracssclassforscjklsSalutation"
                      />
                    </span>

                    <span>
                      <input
                        autoComplete="off"
                        type="input"
                        name="first_name"
                        value={basicDetails.first_name}
                        onChange={handleChange}
                        placeholder={`Enter First Name`}
                      />
                    </span>

                    <span>
                      <input
                        autoComplete="off"
                        type="input"
                        name="last_name"
                        value={basicDetails.last_name}
                        onChange={handleChange}
                        placeholder={`Enter Last Name`}
                      />
                    </span>
                  </div>
                </div>
               
              </div>
              <div className="height5"></div>
              <div className="height5"></div>
              {/* error handling */}
              {/* {!customerName && emailValidation === false && <p className="error-message">
                                {otherIcons.error_svg}
                                Please fill customer Details</p>} */}
            </div>

            <div className="sections">
              <div id="fcx3s1parent">
              <div className="form_commonblock">
                  <label>Email</label>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#525252"}
                        fill={"none"}
                      >
                        <path
                          d="M7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 17H10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 13C19.5434 11.7725 15.9734 11 12 11C8.02658 11 4.45659 11.7725 2 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 11.5L17.9425 4.71245C17.7268 3.3282 16.2232 2.57812 15.0093 3.24919L14.3943 3.58915C12.9019 4.41412 11.0981 4.41412 9.60574 3.58915L8.99074 3.24919C7.77676 2.57812 6.27318 3.3282 6.05751 4.71246L5 11.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <CustomDropdown19
                        label="Display Name"
                        options={displayNames}
                        value={basicDetails.display_name}
                        setBasicDetailsDisplayName={setBasicDetails}
                        onChange={handleChange}
                        name="display_name"
                        defaultOption="Select or Type Display Name"
                        type="basicDetail"
                        ref={dropdownRef1}
                      />
                    </span>
                  </div>
                  {!customerDisplayName && (
                    <p className="error-message">
                      {otherIcons.error_svg}
                      Please Fill Display Name
                    </p>
                  )}
                </div>
                
              </div>
              <div className="height5"></div>
              <div className="height5"></div>
            </div>

            <div className="sections">
              <div id="fcx3s1parent">
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
                <div className="form_commonblock">
                  <label>Mobile Number</label>
                  <span>
                    {otherIcons.mobile_no}
                    <NumericInput
                      style={{ width: "100%" }}
                      name="mobile_no"
                      value={basicDetails.mobile_no}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                    />
                  </span>
                  {/* {!customerMobile && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please fill customer Mobile</p>} */}
                </div>

                <div className="form_commonblock">
                  <label className="">Work Phone</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons?.phone}
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
                      dateFormat="dd-MM-yyyy" // Ensure the date format is consistent
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

                      <select
                        name="country_id"
                        value={basicDetails.citizenship}
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
              </div>
              <div className="height5"></div>
              <div className="height5"></div>
            </div>
           

            <div id="fcx3s1parent">
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
                    {/* <input style={{ width: "100%" }} type="number" name="registration_type" value={basicDetails.registration_type} onChange={handleChange} placeholder="Enter registration type" /> */}
                  </span>
                </div>
              </div>
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

                    {/* {!customerGST && <p className="error-message">
                                            {otherIcons.error_svg}
                                            Please fill customer GST</p>} */}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={24}
                          height={24}
                          color={"#525252"}
                          fill={"none"}
                        >
                          <path
                            d="M7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 17H10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 13C19.5434 11.7725 15.9734 11 12 11C8.02658 11 4.45659 11.7725 2 13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 11.5L17.9425 4.71245C17.7268 3.3282 16.2232 2.57812 15.0093 3.24919L14.3943 3.58915C12.9019 4.41412 11.0981 4.41412 9.60574 3.58915L8.99074 3.24919C7.77676 2.57812 6.27318 3.3282 6.05751 4.71246L5 11.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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

            <div id="fcx3s1parent">
              

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
