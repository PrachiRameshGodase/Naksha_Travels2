import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateInsuranceAction } from "../../../../Redux/Actions/InsuranceActions";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import { SubmitButton6 } from "../../../Common/Pagination/SubmitButton";
import Swal from "sweetalert2";

const CreateInsurance = ({ popupContent }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const insuranceCreates = useSelector((state) => state?.createInsurance);

  const {
    setshowAddPopup,
    showAddPopup,
    isEditIndividual,
    selectedItem,
    setSearchTrigger,
  } = popupContent;
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [formData, setFormData] = useState({
    company_name: null,
  });
  const [errors, setErrors] = useState({
    company_name: false,
  });
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let newErrors = {
      company_name: formData?.company_name ? false : true,
    };
    setErrors(newErrors);
    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
       await Swal.fire({
              text: "Please fill all the required fields.",
             confirmButtonText: "OK",
             
            });
      return;
    } else {
      try {
        const sendData = {
          ...formData,
        };
        dispatch(CreateInsuranceAction(sendData, Navigate))
          .then(() => {
            setshowAddPopup(null);
            setSearchTrigger((prev) => prev + 1);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        toast.error("Error creating insurance:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };

  useEffect(() => {
    if (isEditIndividual && selectedItem) {
      setFormData({
        ...formData,
        id: selectedItem?.id,
        company_name: selectedItem?.company_name,
      });
    }
  }, [selectedItem, isEditIndividual]);

  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content" style={{ width: "50%" }}>
          <div className="modal-header">
            <h5>
              {isEditIndividual
                ? "Update Insurance Service"
                : "Add Insurance Service"}
            </h5>
            <button
              className="close-button"
              onClick={() => setshowAddPopup(false)}
            >
              <RxCross2 />
            </button>
          </div>

          <div className="modal-body">
            <form>
              {/* Keep your form as it is */}
              <div className="relateivdiv">
                <div
                  className="itemsformwrap"
                  style={{ paddingBottom: "0px", minHeight: "100px" }}
                >
                  <div className="f1wrapofcreq">
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          Company Name<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <input
                              value={formData?.company_name}
                              onChange={handleChange}
                              name="company_name"
                              placeholder="Enter Company Name"
                            />
                          </span>
                          {errors?.company_name && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Company Name
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SubmitButton6
                onClick={handleSubmitForm}
                createUpdate={insuranceCreates}
                setShowModal={setshowAddPopup}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInsurance;
