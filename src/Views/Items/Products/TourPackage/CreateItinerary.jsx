import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateFlightAction } from "../../../../Redux/Actions/flightActions";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import { MultiImageUploadHelp } from "../../../Helper/ComponentHelper/ImageUpload";
import NumericInput from "../../../Helper/NumericInput";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { CreateItineraryAction } from "../../../../Redux/Actions/tourPackageActions";

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
    upload_documents: [],
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const sendData = {
        ...formData,
        upload_documents: JSON.stringify(formData?.upload_documents),
      };
      const sendData2={
        tour_package_id:itemId
      }
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (selectedItem && isEditIndividual) {
      setFormData({
        ...formData,
        id: selectedItem?.id,
        day: selectedItem?.day,
        day_plan:selectedItem?.day_plan,
        description:selectedItem?.description,
        upload_documents: selectedItem?.upload_documents
          ? JSON.parse(selectedItem.upload_documents)
          : [],
      });
    }
  }, [selectedItem, isEditIndividual]);

  return (
    <div id="formofcreateitems">
      <form action="">
        <div className="itemsformwrap itemformtyop02">
          <div id="forminside">
            <div className="secondx2 thirdx2extra">
              <div className="mainxpopups2">
                <div className="popup-content02" style={{ height: "65vh" }}>
                  <div className={``} style={{ height: "fit-content" }}>
                    <div
                      id="Anotherbox"
                      className="formsectionx"
                      style={{
                        height: "120px",
                        background: "white",
                      }}
                    >
                      <div id="leftareax12">
                        <h1 id="firstheading" className="headingofcreateforems">
                          {isEditIndividual
                            ? `Update Itinerary`
                            : "Add Itinerary"}
                        </h1>
                      </div>

                      <div id="buttonsdata">
                        <div
                          className="linkx3"
                          onClick={() => setshowAddPopup(null)}
                        >
                          <RxCross2 />
                        </div>
                      </div>
                    </div>

                    {/* <div className="bordersinglestroke"></div> */}
                    <div
                      id="middlesection"
                      style={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        marginBottom: "60px",
                      }}
                    >
                      <div id="formofcreateitems">
                        <div
                          className={`itemsformwrap1`}
                          style={{ paddingBottom: "0px" }}
                        >
                          <div id="forminside">
                            <div className="secondx2">
                              <div className="form_commonblock">
                                <label>Day</label>
                                <div id="inputx1">
                                  <span>
                                    {otherIcons.name_svg}
                                    <NumericInput
                                      name="day"
                                      placeholder="Enter Day"
                                      value={formData.day}
                                      onChange={(e) => handleChange(e)}
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="form_commonblock">
                                <label>
                                  Day Plan<b className="color_red">*</b>
                                </label>
                                <span>
                                  {otherIcons.placeofsupply_svg}
                                  <input
                                    value={formData.day_plan}
                                    onChange={handleChange}
                                    name="day_plan"
                                    placeholder="Enter Day Plan"
                                  />
                                </span>
                              </div>
                            </div>

                            <div
                              id="imgurlanddesc"
                              className="calctotalsectionx2"
                            >
                              <MultiImageUploadHelp
                                formData={formData}
                                setFormData={setFormData}
                                setFreezLoadingImg={setFreezLoadingImg}
                                imgLoader={imgLoader}
                                setImgeLoader={setImgeLoader}
                              />
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

                    {
                      <div
                        id="modalactionbar"
                        className="actionbar"
                        style={{
                          left: "230px",
                          width: "770px",
                          position: "absolute",
                        }}
                      >
                        <button
                          onClick={handleSubmitForm}
                          id="herobtnskls"
                          //${!isAllReqFilled ? 'disabledbtn' : ''}
                          className={`${
                            itineraryCreates?.loading || freezLoadingImg
                              ? "disabledbtn"
                              : ""
                          } `}
                          type="submit"
                          disabled={
                            itineraryCreates?.loading || freezLoadingImg
                          }
                        >
                          {isEditIndividual ? "Update" : "Create"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setshowAddPopup(null)}
                          className={`${
                            itineraryCreates?.loading || freezLoadingImg
                              ? "disabledbtn"
                              : ""
                          } `}
                          disabled={
                            itineraryCreates?.loading || freezLoadingImg
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateItinerary;
