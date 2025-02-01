import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { Attachment2 } from "../../../Helper/Attachment";
import { formatDate3 } from "../../../Helper/DateFormat";
import { ShowUserMastersValue } from "../../../Helper/ShowMastersValue";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";

const PassengerHotelDetails = ({ data, showPopup, setShowPopup }) => {
  const [activeSection, setActiveSection] = useState("roomDetails");
  const attachments = data?.upload_image || "";
  const charge = data?.charges ? JSON.parse(data?.charges) : [];

  return (
    <>
      {data?.loading ? (
        <Loader02 />
      ) : (
        <>
          <div className="custom-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Hotel Name : {data?.hotel_name}</h5>
                <button
                  className="close-button"
                  onClick={() => setShowPopup(false)}
                >
                  <RxCross2 />
                </button>
              </div>
              <div className="modal-body">
                <div
                  id="itemsdetailsrowskl"
                  className="secondinsidedatax15s"
                  style={{ height: "550px" }}
                >
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
                                {/* <li className="pendingfromfrontendx5">
                                  <span>Entry Type</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.entry_type || "-"}
                                  </p>
                                </li> */}
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
                                    {data?.room?.room_number || "-"}
                                  </p>
                                </li>
                                <li>
                                  <span>Bed</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    <ShowUserMastersValue
                                      type="38"
                                      id={data?.bed || ""}
                                    />
                                  </p>
                                </li>
                                <li className="pendingfrombackendx5">
                                  <span>Occupancy</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    <ShowUserMastersValue
                                      type="36"
                                      id={data?.occupancy_id}
                                    />
                                  </p>
                                </li>
                                <li className="pendingfrombackendx5">
                                  <span>Total Days</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.total_nights}
                                  </p>
                                </li>
                                <li className="pendingfrombackendx5">
                                  <span>Meal</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    <ShowUserMastersValue
                                      type="37"
                                      id={data?.meal_id || ""}
                                    />{" "}
                                  </p>
                                </li>

                                <li>
                                  <span>Family Members</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.guests
                                      ?.map((item) => item?.display_name)
                                      .filter(Boolean)
                                      .join(", ")}
                                  </p>
                                </li>

                                <li>
                                  <span>Booking Date</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {formatDate3(data?.booking_date) || ""}
                                  </p>
                                </li>
                                <li>
                                  <span>CheckIn Date</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {formatDate3(data?.check_in_date) || ""}
                                  </p>
                                </li>
                                <li>
                                  <span>CheckOut Date</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {formatDate3(data?.check_out_date) || ""}
                                  </p>
                                </li>
                                <li>
                                  <span>Supplier Name</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.supplier_name || ""}
                                  </p>
                                </li>
                              </ul>
                              <ul>
                                <li>
                                  <span>Hotel Price</span>
                                  <h1>:</h1>
                                  <p>{data?.gross_amount || ""}</p>
                                </li>
                                <li>
                                  <span>Charges</span>
                                  <h1>:</h1>
                                 <p>{charge?.filter((item) => item?.account_name && item?.amount).map((item) => `${item?.account_name || ""} - ${item?.amount || ""}`) .join(", ")}</p>
                                  
                                </li>

                                <li>
                                  <span>Customer tax</span>
                                  <h1>:</h1>
                                  <p>{data?.tax_amount || ""}</p>
                                </li>
                                <li>
                                  <span>Supplier Tax</span>
                                  <h1>:</h1>
                                  <p>{data?.supplier_tax || ""}</p>
                                </li>
                                <li>
                                  <span>Supplier Price</span>
                                  <h1>:</h1>
                                  <p>{data?.supplier_total || ""}</p>
                                </li>
                                <li>
                                  <span>Customer Price</span>
                                  <h1>:</h1>
                                  <p>{data?.total_amount || ""}</p>
                                </li>
                                <li>
                                  <span>Retain</span>
                                  <h1>:</h1>
                                  <p>{data?.retain || ""}</p>
                                </li>

                                <li>
                                  <span>Notes</span>
                                  <h1>:</h1>
                                  <p>{data?.note || ""}</p>
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
