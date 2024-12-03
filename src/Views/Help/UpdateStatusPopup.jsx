import React, { useState, useRef } from "react";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { helpStatus } from "../Helper/ComponentHelper/DropdownData";
import { RxCross2 } from "react-icons/rx";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HelpCreateStatusAction } from "../../Redux/Actions/helpAction";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
const UpdateStatusPopup = ({ setShowPopup, statusValue, setSearchTrigger }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ status: 0 });
  const dropdownRef1 = useRef(null);

  const helpStatues = useSelector((state) => state?.helpStatus);
  // console.log("helpStatues", helpStatues)
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newStatus = helpStatus.find((val) => val.labelid == value);
    setFormData({
      ...formData,

      [name]: value,
      status: value,
    });
  };
  // console.log("formData",formData)
  const handleSubmitStatus = async () => {
    try {
      const sendData = {
        ...formData,
        id: statusValue,
      };
      dispatch(HelpCreateStatusAction(sendData, Navigate,)).then(() => {
        setSearchTrigger(prev => prev + 1);
        setShowPopup(false);

      })

    } catch (err) {
      console.log("error", err)
    }
  }

  return (
    <div>
      <>
        {helpStatues?.loading && <MainScreenFreezeLoader />}
        <Toaster />
        <div
          className="mainxpopups1"
        //   ref={popupRef}
        //   onKeyDown={handleKeyDown}
        //   tabIndex="0"
        >
          <div className="popup-content" style={{ height: "370px" }}>
            <span className="close-button" onClick={() => setShowPopup(false)}>
              <RxCross2 />
            </span>
            <h2>Update Status</h2>

            <div className="midpopusec12x">
              <div className="form_commonblock">
                <label>Status</label>
                <div id="inputx1">
                  <span id="">
                    {otherIcons.name_svg}
                    <CustomDropdown04
                      ref={dropdownRef1}
                      options={helpStatus}
                      value={formData.status}
                      onChange={handleChange}
                      name="status"
                      defaultOption="Select Status"
                      type="masters"
                      required
                    />
                  </span>
                </div>
              </div>
              <div
                tabIndex="0"
                className={`submitbuttons1  ${!formData?.status ? "disabledfield" : ""
                  }`}
                onClick={() => handleSubmitStatus()}
              >
                <span>
                  {/* <p>
                    {categoryData?.id
                      ? data?.loading === true
                        ? "Updating"
                        : "Update"
                      : data?.loading === true
                      ? "Submitting"
                      : "Submit"}
                  </p> */}
                  <p>Submit</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    color={"#000000"}
                    fill={"none"}
                  >
                    <path
                      d="M20 12L4 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default UpdateStatusPopup;
