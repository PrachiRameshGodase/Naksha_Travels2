import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import {
  MultiImageUploadDocument,
  MultiImageUploadHelp,
} from "../../Helper/ComponentHelper/ImageUpload";
import { ShowMasterData } from "../../Helper/HelperFunctions";
import { formatDate } from "../../Helper/DateFormat";

const Documents = ({
  setUserData,
  switchCusData,
  customerData,
  tick,
  setTick,
  updateUserData,
}) => {
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
        documents:documents,
      }));
    }, [documents, setUserData]);
  return (
    <>
      {switchCusData === "Documents" && (
        <div id="secondx2_customer">
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
                          {otherIcons.zip_code_svg}
                          <input
                            name="document_no"
                            placeholder="Enter Document Number"
                            value={document.document_no}
                            onChange={(e) => handleChange(e, index)}
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
                        />
                      </span>
                    </div>
                    <div id="imgurlanddesc" className="calctotalsectionx2">
                      <MultiImageUploadDocument
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
