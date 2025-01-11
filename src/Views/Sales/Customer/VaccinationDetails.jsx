import React, { useEffect, useState } from "react";
import { MultiImageUploadDocument } from "../../Helper/ComponentHelper/ImageUpload";
import { ShowMasterData } from "../../Helper/HelperFunctions";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";

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
    if (vaccinationNames.length) {
      setVaccinationDetails(
        vaccinationNames.map((doc) => ({
          vaccination_name: doc.label,
          upload_documents: JSON.stringify([]),
        }))
      );
    }
  }, [vaccinationNames.length]);

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

  useEffect(() => {
    if (user?.id && isEdit) {
      const userVaccinationDetails = user?.vaccination_details || [];
      const vaccinationDetailsFromUser = userVaccinationDetails?.map(
        (item) => ({
          id: item?.id,
          vaccination_name: item.vaccination_name || "",
          upload_documents: item.upload_documents
            ? JSON.parse(item.upload_documents)
            : [],
        })
      );

      setVaccinationDetails(vaccinationDetailsFromUser); // Update state with the transformed array

      setTick((prevTick) => ({
        ...prevTick,
        vaccinationDetailTick: true,
      }));
    }
  }, [user?.id, isEdit, setTick]);

  useEffect(() => {
    if (isEdit) {
      updateUserData(vaccinationDetails); // Only call updateUserData when editing
    }
  }, [VaccinationDetails]);
  return (
    <>
      {freezLoadingImg && <MainScreenFreezeLoader />}

      {switchCusData ===
        "VaccinationDetails.jsx:73 switchCusData Vaccination Details" && (
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
