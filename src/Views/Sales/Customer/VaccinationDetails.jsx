import React, { useEffect, useState } from "react";
import { MultiImageUploadDocument, SingleImageUploadDocument } from "../../Helper/ComponentHelper/ImageUpload";
import { ShowMasterData } from "../../Helper/HelperFunctions";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";

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
      vaccination_details: vaccinationDetails?.map((detail) => ({
        ...detail,
        upload_documents: detail.upload_documents
          ? JSON.stringify(detail?.upload_documents)
          : "",
      })),
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
            ? JSON?.parse(item.upload_documents)
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
      updateUserData((prevData) => ({
        ...prevData,
        vaccination_details: vaccinationDetails?.map((detail) => ({
          ...detail,
          upload_documents: detail?.upload_documents
            ? JSON.stringify(detail?.upload_documents)
            : "",
        })),
      }));
    }
  }, [VaccinationDetails]);
  return (
    <>
      {freezLoadingImg && <MainScreenFreezeLoader />}

      {switchCusData === "Vaccination Details" && (
        <div id="secondx2_customer">
          <div className="iconheading">
            {otherIcons.quotation_icon}
            <p>Vaccination Details</p>
          </div>
          {vaccinationDetails.map((item, index) => (
            <div key={index} id="main_forms_desigin_cus">
              <div>{item.vaccination_name}</div>
              <div id="imgurlanddesc" className="calctotalsectionx2">
                <SingleImageUploadDocument
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
