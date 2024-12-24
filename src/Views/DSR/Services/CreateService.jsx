import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateFlightAction } from "../../../Redux/Actions/flightActions";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { ShowMasterData } from "../../Helper/HelperFunctions";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";

const CreateService = ({ popupContent }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const flightCreates = useSelector((state) => state?.createFlight);
  const servicesList = ShowMasterData("48");
  const {
    setshowAddPopup,
    showAddPopup,
    isEditIndividual,
    selectedItem,
    setSearchTrigger,
  } = popupContent;
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [formData, setFormData] = useState({
    flight_name: null,
    service:""
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const sendData = {
        ...formData,
      };
      dispatch(CreateFlightAction(sendData, Navigate))
        .then(() => {
          setshowAddPopup(null);
          setSearchTrigger((prev) => prev + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      toast.error("Error creating flight:", error);
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
        flight_name: selectedItem?.flight_name,
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
                        height: "10px",
                        background: "white",
                      }}
                    >
                      <div id="leftareax12">
                        <h1 id="firstheading" className="headingofcreateforems">
                          {/* {isEditIndividual ? `Update Flight` : "Add Flight"} */}
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
                                  Select Services<b className="color_red">*</b>
                                </label>
                                <span>
                                  {otherIcons.name_svg}
                                  <CustomDropdown04
                                    label="Servises"
                                    options={servicesList}
                                    value={formData?.service}
                                    onChange={handleChange}
                                    name="service"
                                    defaultOption="Select Service"
                                    type="masters"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default CreateService;
