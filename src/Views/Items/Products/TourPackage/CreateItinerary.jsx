import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateFlightAction } from "../../../../Redux/Actions/flightActions";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import { MultiImageUploadHelp, SingleImageUpload } from "../../../Helper/ComponentHelper/ImageUpload";
import NumericInput from "../../../Helper/NumericInput";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { CreateItineraryAction } from "../../../../Redux/Actions/tourPackageActions";
import { SubmitButton6 } from "../../../Common/Pagination/SubmitButton";

const CreateItinerary = ({ popupContent }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
  const itineraryCreates = useSelector((state) => state?.createItinerary);

  const {
    setshowAddPopup,
    showAddPopup,
    isEditIndividual,
    selectedItem,
    setSearchTrigger,
  } = popupContent;
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  const [formData, setFormData] = useState({
    tour_package_id: itemId,
    day: "",
    day_plan: "",
    description: "",
    upload_documents: "",
  });
  const [errors, setErrors] = useState({
    day: false,
    day_plan: false,
  });
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let newErrors = {
      day: formData?.day ? false : true,
      day_plan: formData?.day_plan ? false : true,
    };
    setErrors(newErrors);
    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
      return;
    } else {
      try {
        const sendData = {
          ...formData,
          upload_documents: JSON.stringify(formData?.upload_documents),
        };
        const sendData2 = {
          tour_package_id: itemId,
        };
        dispatch(CreateItineraryAction(sendData, Navigate, itemId, sendData2))
          .then(() => {
            setshowAddPopup(null);
            setSearchTrigger((prev) => prev + 1);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        toast.error("Error creating itinerary:", error);
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
    if (selectedItem && isEditIndividual) {
      setFormData({
        ...formData,
        id: selectedItem?.id,
        day: selectedItem?.day,
        day_plan: selectedItem?.day_plan,
        description: selectedItem?.description,
        upload_documents: selectedItem?.upload_documents
          ? JSON.parse(selectedItem.upload_documents)
          : "",
      });
      if(selectedItem?.upload_documents){
        setImgeLoader("success")
      }
    }
  }, [selectedItem, isEditIndividual]);
console.log("formData",formData)
  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>
              {isEditIndividual
                ? "Update Itinerary Service"
                : "Add Itinerary Service"}
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
                          Day<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <NumericInput
                            name="day"
                            placeholder="Enter Day"
                            value={formData?.day}
                            onChange={(e) => handleChange(e)}
                          />
                        </span>
                        {errors?.day && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Day
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Day Plan<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <input
                              value={formData?.day_plan}
                              onChange={handleChange}
                              name="day_plan"
                              placeholder="Enter Day Plan"
                            />
                          </span>
                          {errors?.day_plan && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Day Plan
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <div id="imgurlanddesc" className="calctotalsectionx2">
                          <SingleImageUpload
                            formData={formData}
                            setFormData={setFormData}
                            setFreezLoadingImg={setFreezLoadingImg}
                            imgLoader={imgLoader}
                            setImgeLoader={setImgeLoader}
                          />
                        </div>
                      </div>
                      <div className="secondtotalsections485s">
                        <div className="textareaofcreatqsiform">
                          <label>Description</label>
                          <div className="show_no_of_text_limit_0121">
                            <TextAreaComponentWithTextLimit
                              formsValues={{ handleChange, formData }}
                              placeholder="Enter Description...."
                              name="description"
                              value={formData?.description}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SubmitButton6
                onClick={handleSubmitForm}
                createUpdate={itineraryCreates}
                setShowModal={setshowAddPopup}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItinerary;
