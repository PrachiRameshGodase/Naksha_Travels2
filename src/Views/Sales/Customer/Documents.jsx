import React, { useState } from "react";
import NumericInput from "../../Helper/NumericInput";
import DatePicker from "react-datepicker";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { MultiImageUploadHelp } from "../../Helper/ComponentHelper/ImageUpload";

const Documents = ({
  setUserData,
  switchCusData,
  customerData,
  tick,
  setTick,
  updateUserData,
}) => {
  const { isDuplicate, isEdit, user } = customerData;
  const [documents, setDocuments] = useState([
    { type: "Passport", pin_code: "", issue_date: null, expiry_date: null },
    { type: "Driving License", pin_code: "", issue_date: null, expiry_date: null },
    { type: "Government ID", pin_code: "", issue_date: null, expiry_date: null },
    { type: "TAX/KRA/PAN", pin_code: "", issue_date: null, expiry_date: null },
  ]);

  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setDocuments((prevDocuments) => {
      const updatedDocuments = [...prevDocuments];
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        [name]: value,
      };
      return updatedDocuments;
    });
  };

  const handleDateChange = (date, name, index) => {
    setDocuments((prevDocuments) => {
      const updatedDocuments = [...prevDocuments];
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        [name]: date,
      };
      return updatedDocuments;
    });
  };

  return (
    <>
      {switchCusData === "Documents" ? (
        <div id="secondx2_customer">
          <div id="main_forms_desigin_cus">
            {documents?.map((document, index) => (
              <div className="x1parenchild54" key={index}>
                <div className="iconheading">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"#525252"}
                    fill={"none"}
                  >
                    <rect
                      x="4"
                      y="2"
                      width="17.5"
                      height="20"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10.59 13.7408C9.96125 14.162 8.31261 15.0221 9.31674 16.0983C9.80725 16.624 10.3536 17 11.0404 17H14.9596C15.6464 17 16.1928 16.624 16.6833 16.0983C17.6874 15.0221 16.0388 14.162 15.41 13.7408C13.9355 12.7531 12.0645 12.7531 10.59 13.7408Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 9C15 10.1046 14.1046 11 13 11C11.8954 11 11 10.1046 11 9C11 7.89543 11.8954 7 13 7C14.1046 7 15 7.89543 15 9Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5 6L2.5 6M5 12L2.5 12M5 18H2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>{document.type}</p>
                </div>
                <div className="insidesectiony1">
                  <div id="fcx3s1parent">
                    <div className="form_commonblock">
                      <label>Document Number</label>
                      <div id="inputx1">
                        <span>
                          {otherIcons.zip_code_svg}
                          <NumericInput
                            name="pin_code"
                            placeholder="Enter Document Number"
                            value={document.pin_code}
                            onChange={(e) => handleChange(e, index)}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="form_commonblock ">
                      <label className="color_red">Issue Date</label>
                      <span>
                        {otherIcons.date_svg}
                        <DatePicker
                          selected={document.issue_date}
                          onChange={(date) => handleDateChange(date, "issue_date", index)}
                          name="issue_date"
                          placeholderText="Enter Issue Date"
                          dateFormat="dd-MM-yyyy"
                        />
                      </span>
                    </div>
                    <div className="form_commonblock ">
                      <label className="color_red">Expiry Date</label>
                      <span>
                        {otherIcons.date_svg}
                        <DatePicker
                          selected={document.expiry_date}
                          onChange={(date) => handleDateChange(date, "expiry_date", index)}
                          name="expiry_date"
                          placeholderText="Enter Expiry Date"
                          dateFormat="dd-MM-yyyy"
                        />
                      </span>
                    </div>
                    <div id="imgurlanddesc" className="calctotalsectionx2">
                      <MultiImageUploadHelp
                        formData={document}
                        setFormData=""
                        setFreezLoadingImg={setFreezLoadingImg}
                        imgLoader={imgLoader}
                        setImgeLoader={setImgeLoader}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Documents;
