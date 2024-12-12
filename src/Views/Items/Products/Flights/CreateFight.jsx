import React, { useEffect, useState } from "react";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import { RxCross2 } from "react-icons/rx";
import { BsArrowRight } from "react-icons/bs";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateMasterAction } from "../../../../Redux/Actions/mastersAction";
import { useNavigate } from "react-router-dom";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import { ShowMasterData } from "../../../Helper/HelperFunctions";

const CreateFlight = ({ popupContent }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { setshowAddPopup, showAddPopup, setSearchTrigger, isEditIndividual } =
    popupContent;
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    // labelid:0,
    flight_name: null,
    type: showAddPopup?.labelid,
    room_name: null,
    value_string: null,
    value: null,
    status:0
  });
  const masterList = useSelector((state) => state.masterList);
  const masterDetails = masterList?.data;
  const occupancy = ShowMasterData("36");
  console.log("occupancy", occupancy);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const sendData = {
        ...formData,
      };
      dispatch(CreateMasterAction(sendData, Navigate))
        .then(() => {
          setshowAddPopup(null);
          setSearchTrigger((prev) => prev + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      toast.error("Error creating masters:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const occpancyType = occupancy?.find((val) => val?.labelid == value);

    setFormData((prev) => ({
      ...prev,
      ...(name === "occupancy" && {
        occupancy: occpancyType?.label,
      }),

      [name]: value,
    }));
  };

  useEffect(() => {
    if (isEditIndividual && showAddPopup) {
      setFormData({
        ...formData,
        id: showAddPopup?.id,
        labelid: showAddPopup?.labelid,
        type: showAddPopup?.type,
        label: showAddPopup?.label,
        value: showAddPopup?.value,
        value_string: showAddPopup?.value_string,
      });
    }
  }, [showAddPopup, isEditIndividual]);

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
                          {isEditIndividual ? `Update Flight` : "Add Flight"}
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
                    <div id="middlesection" style={{}}>
                      <div id="formofcreateitems">
                        <div
                          className={`itemsformwrap1`}
                          style={{ paddingBottom: "0px" }}
                        >
                          <div id="forminside">
                            <div className="secondx2">
                              <div className="form_commonblock">
                                <label>
                                  Flight Name<b className="color_red">*</b>
                                </label>
                                <span>
                                  {otherIcons.name_svg}
                                  <input
                                    value={formData.flight_name}
                                    onChange={handleChange}
                                    name="flight_name"
                                    placeholder="Enter Flight Name"
                                  />
                                </span>
                              </div>
                              {/* <div className="form_commonblock">
                                <label>
                                  Flight Name<b className="color_red">*</b>
                                </label>
                                <span>
                                  {otherIcons.name_svg}
                                  <CustomDropdown04
                                    label="Hotel Type"
                                    options={hotelType}
                                    value={formData?.hotel_type_id}
                                    onChange={handleChange}
                                    name="hotel_type_id"
                                    defaultOption="Select Hotel Type"
                                    type="masters"
                                  />
                                </span>
                              </div> */}
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
                          left: "238px",
                          width: "752px",
                          position: "absolute",
                          marginBottom:"62px"
                        }}
                      >
                        <button
                          onClick={handleSubmitForm}
                          id="herobtnskls"
                          //${!isAllReqFilled ? 'disabledbtn' : ''}
                          className={`${freezLoadingImg ? "disabledbtn" : ""} `}
                          type="submit"
                          disabled={freezLoadingImg}
                        >
                          {isEditIndividual ? "Update" : "Create"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setshowAddPopup(null)}
                          // className={`${(createUpdate?.loading || freezLoadingImg) ? 'disabledbtn' : ''} `}
                          // disabled={(createUpdate?.loading || freezLoadingImg)}
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

export default CreateFlight;
