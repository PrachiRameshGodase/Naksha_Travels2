import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import {
  MultiImageUploadDocument,
  MultiImageUploadHelp,
  SingleImageUploadDocument,
} from "../../Helper/ComponentHelper/ImageUpload";
import { ShowMasterData } from "../../Helper/HelperFunctions";
import { formatDate } from "../../Helper/DateFormat";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";

const Documents = ({
  setUserData,
  switchCusData,
  customerData,
  tick,
  setTick,
  updateUserData,
}) => {
  const { isDuplicate, isEdit, user } = customerData;

  const documentNames = ShowMasterData("42");

  const [documents, setDocuments] = useState([]);
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");
  // Initialize or update documents state when documentNames changes
  useEffect(() => {
    if (documentNames?.length) {
      setDocuments(
        documentNames.map((doc) => ({
          document_name: doc.label,
          document_no: "",
          issue_date: null,
          expiry_date: null,
          upload_documents: JSON.stringify([]),
        }))
      );
    }
  }, [documentNames?.length]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc, i) =>
        i === index ? { ...doc, [name]: value } : doc
      )
    );
  };

  const handleDateChange = (date, name, index) => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc, i) =>
        i === index ? { ...doc, [name]: formatDate(date) } : doc
      )
    );
  };

  const handleUpdateDocument = (index, updatedDocument) => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc, i) => (i === index ? updatedDocument : doc))
    );
  };

  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      documents: documents?.map((detail) => ({
        ...detail,
        upload_documents: detail.upload_documents
          ? JSON.stringify(detail?.upload_documents)
          : "",
      })),
    }));
  }, [documents, setUserData]);

  useEffect(() => {
    if (user?.id && isEdit) {
      const userDocumentDetails = user?.documents || [];
      const documentsFromUser = userDocumentDetails?.map((item) => ({
        document_name: item.document_name || "",
        document_no: item.document_no || "",
        issue_date: item.issue_date || null,
        expiry_date: item.expiry_date || null,
        upload_documents: item.upload_documents
          ? JSON?.parse(item.upload_documents)
          : [],
      }));
      if (documentsFromUser?.map((item) => item?.upload_documents)) {
        setImgeLoader("success")
      }
      setDocuments(documentsFromUser); // Update state with the transformed array
      
      setTick((prevTick) => ({
        ...prevTick,
        documentsTick: true,
      }));
    }
  }, [user?.id, isEdit]);

  useEffect(() => {
    if (isEdit) {
      updateUserData((prevData) => ({
        ...prevData,
        documents: documents?.map((detail) => ({
          ...detail,
          upload_documents: detail?.upload_documents
            ? JSON.stringify(detail?.upload_documents)
            : "",
        })),
      }));
    }
  }, [documents]);

  return (
    <>
      {freezLoadingImg && <MainScreenFreezeLoader />}

      {switchCusData === "Documents" && (
        <div id="secondx2_customer">
          <div className="iconheading">
            {otherIcons.quotation_icon}
            <p>Documents</p>
          </div>
          <div id="main_forms_desigin_cus">
            {documents.map((document, index) => (
              <div className="x1parenchild54" key={index}>

                <div className="iconheading">
                  {otherIcons.title_svg}
                  <p>{document.document_name}</p>
                </div>
                <div className="insidesectiony1">
                  <div id="fcx3s1parent">
                    <div className="form_commonblock">
                      <label>Document Number</label>
                      <div id="inputx1">
                        <span>
                          {otherIcons.quotation_icon}
                          <input
                            name="document_no"
                            placeholder="Enter Document Number"
                            value={document.document_no}
                            onChange={(e) => handleChange(e, index)}
                            autoComplete="off"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="form_commonblock">
                      <label>Issue Date</label>
                      <span>
                        {otherIcons.date_svg}
                        <DatePicker
                          selected={document.issue_date}
                          onChange={(date) =>
                            handleDateChange(date, "issue_date", index)
                          }
                          name="issue_date"
                          placeholderText="Enter Date"
                          dateFormat="dd-MM-yyyy"
                          autoComplete="off"
                          minDate={
                            new Date(new Date().getFullYear() - 50, 0, 1)
                          } // Minimum date: 50 years ago
                          maxDate={
                            document?.expiry_date
                              ? new Date(document.expiry_date) // Max date: Expiry Date (if set)
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
                    <div className="form_commonblock">
                      <label>Expiry Date</label>
                      <span>
                        {otherIcons.date_svg}
                        <DatePicker
                          selected={document.expiry_date}
                          onChange={(date) =>
                            handleDateChange(date, "expiry_date", index)
                          }
                          name="expiry_date"
                          placeholderText="Enter Date"
                          dateFormat="dd-MM-yyyy"
                          autoComplete="off"
                          minDate={
                            document?.issue_date
                              ? new Date(document.issue_date) // Min date: Issue Date (if set)
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
                  </div>
                  <div id="fcx3s1parent">
                    <div id="imgurlanddesc" className="calctotalsectionx2">
                      <SingleImageUploadDocument
                        formData={document}
                        setFormData={(index, updatedDocument) =>
                          handleUpdateDocument(index, updatedDocument)
                        }
                        setFreezLoadingImg={setFreezLoadingImg}
                        imgLoader={imgLoader}
                        setImgeLoader={setImgeLoader}
                        index={index}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Documents;
