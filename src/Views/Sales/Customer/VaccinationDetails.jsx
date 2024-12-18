import React, { useEffect, useState } from "react";
import {MultiImageUploadDocument} from "../../Helper/ComponentHelper/ImageUpload";
import { ShowMasterData } from "../../Helper/HelperFunctions";

const VaccinationDetails = ({
  setUserData,
  switchCusData,
  customerData,
  tick,
  setTick,
  updateUserData,
}) => {
  const { isDuplicate, isEdit, user } = customerData;
  const [vaccinationDetails, setVaccinationDetails] = useState([]);
  const vaccinationNames = ShowMasterData("43");

  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  useEffect(() => {
    if (vaccinationNames?.length) {
      setVaccinationDetails(
        vaccinationNames.map((doc) => ({
          vaccination_name: doc.label,
          upload_documents: JSON.stringify([]),
        }))
      );
    }
  }, [vaccinationNames?.length]);

  // Function to update the upload_documents for a specific vaccination
  const handleUpdateDocument = (index, updatedDocument) => {
    setVaccinationDetails((prevDocuments) =>
      prevDocuments.map((doc, i) => (i === index ? updatedDocument : doc))
    );
  };

  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      vaccination_details: vaccinationDetails,
    }));
  }, [vaccinationDetails, setUserData]);

  return (
    <>
      {switchCusData === "Vaccination Details" && (
        <div id="secondx2_customer">
          {vaccinationDetails.map((item, index) => (
            <div key={index} id="main_forms_desigin_cus">
              <div>{item.vaccination_name}</div>
              <div id="imgurlanddesc" className="calctotalsectionx2">
                <MultiImageUploadDocument
                  formData={item}
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
          ))}
        </div>
      )}
    </>
  );
};

export default VaccinationDetails;
