import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { Attachment2 } from "../../../Helper/Attachment";
import { formatDate3 } from "../../../Helper/DateFormat";
import ShowMastersValue from "../../../Helper/ShowMastersValue";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";

const PassengerHotelDetails = ({ data, showPopup, setShowPopup }) => {
  const [activeSection, setActiveSection] = useState("roomDetails");
  const attachments = data?.upload_image || "";

  return (
    <>
      {data?.loading ? (
        <Loader02 />
      ) : (
        <>
          <div className="custom-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{data?.hotel_name}</h5>
                <button
                  className="close-button"
                  onClick={() => setShowPopup(false)}
                >
                  <RxCross2 />
                </button>
              </div>
              <div className="modal-body">
                <div id="itemsdetailsrowskl" className="secondinsidedatax15s" style={{height:"550px"}}>
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
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              {otherIcons?.information_svg}
                              Hotel Details
                            </div>
                            <div style={{ display: "flex", gap: "20px" }}>
                              <ul>
                                <li className="pendingfromfrontendx5">
                                  <span>Entry Type</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.entry_type || "-"}
                                  </p>
                                </li>
                                <li className="pendingfromfrontendx5">
                                  <span>Hotel Name</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.hotel_name || "-"}
                                  </p>
                                </li>

                                <li>
                                  <span>Room Name/No</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.room_id || "-"}
                                  </p>
                                </li>
                                <li>
                                  <span>Bed</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    <ShowMastersValue
                                      type="38"
                                      id={data?.bed || ""}
                                    />
                                  </p>
                                </li>
                                <li className="pendingfrombackendx5">
                                  <span>Occupancy</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    <ShowMastersValue
                                      type="36"
                                      id={data?.occupancy_id}
                                    />
                                  </p>
                                </li>
                                <li className="pendingfrombackendx5">
                                  <span>Meal</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    <ShowMastersValue
                                      type="37"
                                      id={data?.meal_id || ""}
                                    />{" "}
                                  </p>
                                </li>

                                <li>
                                  <span>Guest</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.guests
                                      ?.map((item) => item?.display_name)
                                      .filter(Boolean)
                                      .join(", ")}
                                  </p>
                                </li>
                               
                                <li >
                                  <span>Booking Date</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>{formatDate3(data?.booking_date) || ""}</p>
                                </li>
                              </ul>
                              <ul>
                               
                                <li>
                                  <span>CheckIn Date</span>
                                  <h1>:</h1>
                                  <p>
                                    {formatDate3(data?.check_in_date) || ""}
                                  </p>
                                </li>
                                <li>
                                  <span>CheckOut Date</span>
                                  <h1>:</h1>
                                  <p>
                                    {formatDate3(data?.check_out_date) || ""}
                                  </p>
                                </li>
                                <li>
                                  <span>Supplier Name</span>
                                  <h1>:</h1>
                                  <p>{data?.supplier_name || ""}</p>
                                </li>
                                <li>
                                  <span>Hotel Price</span>
                                  <h1>:</h1>
                                  <p>{data?.gross_amount || ""}</p>
                                </li>
                                {/* <li>
                                  <span>Supplier Service Charge</span>
                                  <h1>:</h1>
                                  <p>{data?.charges || ""}</p>
                                </li> */}
                                <li>
                                  <span>Retain</span>
                                  <h1>:</h1>
                                  <p>{data?.retain || ""}</p>
                                </li>
                                <li>
                                  <span>Tax Amount</span>
                                  <h1>:</h1>
                                  <p>{data?.tax_amount || ""}</p>
                                </li>
                                <li>
                                  <span>Total Amount</span>
                                  <h1>:</h1>
                                  <p>{data?.total_amount || ""}</p>
                                </li>
                                <li>
                                  <span>Notes</span>
                                  <h1>:</h1>
                                  <p >
                                    {data?.note || ""}
                                  </p>
                                </li>
                                <li className="pendingfromfrontendx5">
                                  <span>Attachment</span>
                                  <h1>:</h1>
                                  <p>
                                    <Attachment2 attachments={attachments} />
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
        </>
      )}
      <Toaster />
    </>
  );
};
export default PassengerHotelDetails;
