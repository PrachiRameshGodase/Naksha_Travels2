import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import {
  hotelRoomDeleteActions,
  hotelRoomDetailsAction,
  hotelRoomStatusActions,
} from "../../../../Redux/Actions/hotelActions";
import Attachment, { AttachmentPreview4 } from "../../../Helper/Attachment";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";

const HotelServicesDetails = ({ data, setShowPopup }) => {
  const [activeSection, setActiveSection] = useState("roomDetails");
  const attachments = data?.upload_documents
    ? JSON?.parse(data?.upload_documents || "")
    : "";
  return (
    <div className="custom-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5>Room Name: {data?.room_number || ""}</h5>
          <button className="close-button" onClick={() => setShowPopup(false)}>
            <RxCross2 />
          </button>
        </div>
        <div className="modal-body">
          <div id="itemsdetailsrowskl" className="secondinsidedatax15s">
            <div className="insidcontain">
              {activeSection === "roomDetails" && (
                <>
                  <div className="inidbx1">
                    <div
                      className="inidbx1s1"
                      style={{
                        width: "1000px",
                        background: "rgb(232 241 253 / 25%)",
                      }}
                    >
                      <div
                        className="inidbs1x1a1"
                        style={{
                          background: "#f6f8fa",
                        }}
                      >
                        {otherIcons?.information_svg}
                        Room Details
                      </div>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <ul>
                          <li className="pendingfromfrontendx5 ">
                            <span>Room Name</span>
                            <h1>:</h1>
                            <p style={{ width: "212px" }}>
                              {data?.room_number || ""}
                            </p>
                          </li>
                          <li className="pendingfromfrontendx5">
                            <span>Occupancy</span>
                            <h1>:</h1>
                            <p style={{ width: "212px" }}>
                              {data?.occupancy_name || ""}
                            </p>
                          </li>
                          <li className="pendingfromfrontendx5">
                            <span>Max Occupancy</span>
                            <h1>:</h1>
                            <p style={{ width: "212px" }}>
                              {data?.max_occupancy || ""}
                            </p>
                          </li>
                          <li>
                            <span>Bed</span>
                            <h1>:</h1>
                            <p style={{ width: "212px" }}>
                              {data?.bed_name || ""}
                            </p>
                          </li>
                          <li>
                            <span>Meal</span>
                            <h1>:</h1>
                            <p style={{ width: "212px" }}>
                              {" "}
                              {/* <ShowUserMastersValue
                                         type="51"
                                         id={data?.travel_type_id || ""}
                                       /> */}
                              {data?.meal_name || ""}
                            </p>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <span>Price</span>
                            <h1>:</h1>
                            <p>{data?.price || "-"}</p>
                          </li>
                          <li>
                            <span>Status</span>
                            <h1>:</h1>
                            <p>
                              {" "}
                              {data?.availability_status == "1"
                                ? "Available"
                                : data?.availability_status == "0"
                                ? "Unavailable"
                                : ""}
                            </p>
                          </li>
                          <li>
                            <span>Description</span>
                            <h1>:</h1>
                            <p>{data?.description || "-"}</p>
                          </li>

                          <li className="pendingfromfrontendx5">
                            <span>Attachment</span>
                            <h1>:</h1>
                            <p>
                              <AttachmentPreview4 document={attachments} />
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HotelServicesDetails;
