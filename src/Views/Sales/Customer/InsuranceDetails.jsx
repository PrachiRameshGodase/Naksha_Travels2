import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { MultiImageUploadHelp } from "../../Helper/ComponentHelper/ImageUpload";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import NumericInput from "../../Helper/NumericInput";
import { formatDate } from "../../Helper/DateFormat";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";

const InsuranceDetails = ({
  switchCusData,
  customerData,
  userData,
  setUserData,
  updateUserData,
  setTick,
  tick,
}) => {
  const { isDuplicate, isEdit, user } = customerData;

  const [insuranceDetails, setInsuranceDetails] = useState({
    company_name: "",
    policy_no: "",
    issue_date: "",
    expiry_date: "",
    upload_documents: [],
  });

  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInsuranceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      insurance_details: {
        ...insuranceDetails,
        upload_documents: JSON.stringify(insuranceDetails.upload_documents), // Pass as stringified JSON
      },
    }));
  }, [insuranceDetails, setUserData]);

  useEffect(() => {
    if (user?.id && isEdit) {
      const userInsuranceDetails = user?.insurrance_details || [];

      // Extract the first item's details or set default values
      const insuranceDetailsFromUser =
        userInsuranceDetails.length > 0 ? userInsuranceDetails[0] : {};

      setInsuranceDetails({
        company_name: insuranceDetailsFromUser.company_name || "",
        policy_no: insuranceDetailsFromUser.policy_no || "",
        issue_date: insuranceDetailsFromUser.issue_date || "",
        expiry_date: insuranceDetailsFromUser?.expiry_date || "",
        upload_documents: insuranceDetailsFromUser?.upload_documents
          ? JSON?.parse(insuranceDetailsFromUser.upload_documents)
          : [],
      });
      if (insuranceDetailsFromUser.upload_documents) {
        setImgeLoader("success")
      }

      setTick((prevTick) => ({
        ...prevTick,
        insuranceDetailTick: true,
      }));
    }
  }, [user?.id, isEdit, setTick]);

  useEffect(() => {
    if (isEdit) {
      updateUserData(insuranceDetails); // Only call updateUserData when editing
    }
  }, [insuranceDetails]);
  return (
    <div>
      {freezLoadingImg && <MainScreenFreezeLoader />}

      {switchCusData === "Insurance Details" ? (
        <div id="secondx2_customer">
          <div className="iconheading">
            {otherIcons.quotation_icon}
            <p>Insurance Details</p>
          </div>
          <div id="main_forms_desigin_cus"></div>
          <div className="insidesectiony1">
            <div id="fcx3s1parent">
              <div className="form_commonblock">
                <label>
                  Company Name
                </label>
                <span>
                  {otherIcons.placeofsupply_svg}
                  <input
                    value={insuranceDetails.company_name}
                    onChange={handleChange}
                    name="company_name"
                    placeholder="Enter Company Name"
                    autoComplete="off"
                  />
                </span>
              </div>
              <div className="form_commonblock">
                <label>Policy Number</label>
                <div id="inputx1">
                  <span>
                    {otherIcons.quotation_icon}
                    <NumericInput
                      name="policy_no"
                      placeholder="Enter Policy Number"
                      value={insuranceDetails.policy_no}
                      onChange={handleChange}
                    />
                  </span>
                </div>
              </div>
              <div className="form_commonblock ">
                <label>Issue Date</label>
                <span>
                  {otherIcons.date_svg}
                  <DatePicker
                    selected={insuranceDetails?.issue_date}
                    onChange={(date) =>
                      setInsuranceDetails({
                        ...insuranceDetails,
                        issue_date: formatDate(date),
                      })
                    }
                    name="issue_date"
                    placeholderText="Enter Date"
                    dateFormat="dd-MM-yyyy"
                    autoComplete="off"
                    minDate={
                      new Date(new Date().getFullYear() - 50, 0, 1)
                    } // Minimum date: 50 years ago
                    maxDate={
                      insuranceDetails?.expiry_date
                        ? new Date(insuranceDetails.expiry_date) // Max date: Expiry Date (if set)
                        : new Date(
                            new Date().getFullYear() + 50,
                            11,
                            31
                          ) // Default max date: 50 years in the future
                    }
                    showYearDropdown // Enables the year dropdown
                    scrollableYearDropdown // Allows scrolling in the year dropdown
                    yearDropdownItemNumber={101}
                  />
                </span>
              </div>
            </div>
            <div id="fcx3s1parent">
              <div className="form_commonblock " style={{ marginTop: "20px" }}>
                <label>Expiry Date</label>
                <span>
                  {otherIcons.date_svg}
                  <DatePicker
                    selected={insuranceDetails?.expiry_date}
                    onChange={(date) =>
                      setInsuranceDetails({
                        ...insuranceDetails,
                        expiry_date: formatDate(date),
                      })
                    }
                    name="expiry_date"
                    placeholderText="Enter Date"
                    dateFormat="dd-MM-yyyy"
                    autoComplete="off"
                    minDate={
                      insuranceDetails?.issue_date
                        ? new Date(insuranceDetails.issue_date) // Min date: Issue Date (if set)
                        : new Date(new Date().getFullYear() - 50, 0, 1) // Default min date: 50 years ago
                    }
                    maxDate={
                      new Date(new Date().getFullYear() + 50, 11, 31)
                    } // Max date: 50 years in the future
                    showYearDropdown // Enables the year dropdown
                    scrollableYearDropdown // Allows scrolling in the year dropdown
                    yearDropdownItemNumber={101}
                  />
                </span>
              </div>
              <div className="form_commonblock " >
                <div
                  id="imgurlanddesc"
                  className="calctotalsectionx2"
                  style={{ marginTop: "20px" }}
                >
                  <MultiImageUploadHelp
                    formData={insuranceDetails}
                    setFormData={setInsuranceDetails}
                    setFreezLoadingImg={setFreezLoadingImg}
                    imgLoader={imgLoader}
                    setImgeLoader={setImgeLoader}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InsuranceDetails;
