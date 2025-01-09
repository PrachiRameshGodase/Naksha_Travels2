import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateMasterAction,
  masterListAction,
} from "../../Redux/Actions/mastersAction";
import { SubmitButton7 } from "../Common/Pagination/SubmitButton";
import TextAreaComponentWithTextLimit from "../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";

const AddMaster = ({ popupContent }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const createMaster = useSelector((state) => state?.masterCreate);

  const { setshowAddPopup, showAddPopup, setSearchTrigger, isEditIndividual } =
    popupContent;
  const [formData, setFormData] = useState({
    id: 0,
    // labelid:0,
    type: showAddPopup?.labelid,
    label: null,
    value_string: null,
    value: null,
    note: null,
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const sendData = {
        ...formData,
      };
      dispatch(CreateMasterAction(sendData, Navigate))
        .then(() => {
          dispatch(masterListAction());
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
    setFormData({
      ...formData,
      [name]: value,
    });
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
                        height: "75px",
                        background: "white",
                      }}
                    >
                      <div id="leftareax12">
                        <h1 id="firstheading" className="headingofcreateforems">
                          {isEditIndividual
                            ? `Update Master ${showAddPopup.label}`
                            : "Add Master"}
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
                                  Name<b className="color_red">*</b>
                                </label>
                                <span>
                                  {otherIcons.name_svg}
                                  <input
                                    value={formData.label}
                                    onChange={handleChange}
                                    name="label"
                                    placeholder="Enter Name"
                                  />
                                </span>
                              </div>
                              <div className="form_commonblock">
                                <label>Number Value</label>
                                <span>
                                  {otherIcons.quantity_svg}
                                  <input
                                    type="number"
                                    value={formData.value}
                                    onChange={handleChange}
                                    name="value"
                                    placeholder="Enter Number Value"
                                  />
                                </span>
                              </div>
                              <div className="form_commonblock">
                                <label>Text Value</label>
                                <span>
                                  {otherIcons.quantity_svg}
                                  <input
                                    value={formData.value_string}
                                    onChange={handleChange}
                                    name="value_string"
                                    placeholder="Enter Text Value"
                                  />
                                </span>
                              </div>
                            </div>

                            <div className="secondtotalsections485s">
                              <div className="textareaofcreatqsiform">
                                <label>Comment</label>
                                <div className="show_no_of_text_limit_0121">
                                  <TextAreaComponentWithTextLimit
                                    formsValues={{ handleChange, formData }}
                                    placeholder="Enter comment...."
                                    name="note"
                                    value={formData?.note}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <SubmitButton7
                      onClick={handleSubmitForm}
                      createUpdate={createMaster}
                      setShowPopup={setshowAddPopup}
                    />
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

export default AddMaster;
