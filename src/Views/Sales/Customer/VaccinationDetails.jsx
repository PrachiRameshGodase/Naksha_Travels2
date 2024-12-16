import React, { useState } from "react";
import { MultiImageUploadHelp } from "../../Helper/ComponentHelper/ImageUpload";

const VaccinationDetails = ({
  setUserData,
  switchCusData,
  customerData,
  tick,
  setTick,
  updateUserData,
}) => {
  const { isDuplicate, isEdit, user } = customerData;
  const [vaccinationDetails, setVaccinationDetails] = useState({
    yellowFever: {},
    covid19: {},
    otherVaccination: {},
  });
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  const vaccinationFields = [
    { id: "yellowFever", label: "Yellow Fever" },
    { id: "covid19", label: "Covid-19" },
    { id: "otherVaccination", label: "Other Vaccination" },
  ];

  return (
    <>
      {switchCusData === "Vaccination Details" && (
        <div id="secondx2_customer">
          {vaccinationFields.map(({ id, label }) => (
            <div key={id} id="main_forms_desigin_cus">
              <div>{label}</div>
              <div id="imgurlanddesc" className="calctotalsectionx2">
                <MultiImageUploadHelp
                  formData={vaccinationDetails[id]}
                  setFormData={(data) =>
                    setVaccinationDetails((prev) => ({
                      ...prev,
                      [id]: data,
                    }))
                  }
                  setFreezLoadingImg={setFreezLoadingImg}
                  imgLoader={imgLoader}
                  setImgeLoader={setImgeLoader}
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
