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
import { CreateInsuranceAction } from "../../../../Redux/Actions/InsuranceActions";

const CreateInsurance = ({ popupContent }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const insuranceCreates = useSelector((state) => state?.createInsurance);

  const { setshowAddPopup, showAddPopup,  isEditIndividual, selectedItem,setSearchTrigger, } =
    popupContent;
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [formData, setFormData] = useState({
    company_name:null
  });
 
  const handleSubmitForm = async (e) => {
    e.preventDefault();
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isEditIndividual && selectedItem) {
      setFormData({
        ...formData,
        id: selectedItem?.id,
       company_name:selectedItem?.company_name
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
                          {isEditIndividual ? `Update Insurance` : "Add Insurance"}
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
                                  Company Name<b className="color_red">*</b>
                                </label>
                                <span>
                                  {otherIcons.name_svg}
                                  <input
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    name="company_name"
                                    placeholder="Enter Company Name"
                                  />
                                </span>
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
                          left: "167px",
                          width: "895px",
                          position: "absolute",
                          marginBottom:"62px"
                        }}
                      >
                        <button
                          onClick={handleSubmitForm}
                          id="herobtnskls"
                          //${!isAllReqFilled ? 'disabledbtn' : ''}
                          className={`${(insuranceCreates?.loading || freezLoadingImg) ? 'disabledbtn' : ''} `}
                          disabled={(insuranceCreates?.loading || freezLoadingImg)}
                          type="submit"
                        >
                          {isEditIndividual ? "Update" : "Create"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setshowAddPopup(null)}
                          className={`${(insuranceCreates?.loading || freezLoadingImg) ? 'disabledbtn' : ''} `}
                          disabled={(insuranceCreates?.loading || freezLoadingImg)}
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

export default CreateInsurance;
