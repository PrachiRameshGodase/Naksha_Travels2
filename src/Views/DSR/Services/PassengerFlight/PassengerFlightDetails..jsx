import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { Attachment2 } from "../../../Helper/Attachment";
import { formatDate3 } from "../../../Helper/DateFormat";
import ShowMastersValue from "../../../Helper/ShowMastersValue";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";

const PassengerFlightDetails = ({ data, showPopup, setShowPopup }) => {
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
                <h5>{data?.airline_name || ""}</h5>
                <button
                  className="close-button"
                  onClick={() => setShowPopup(false)}
                >
                  <RxCross2 />
                </button>
              </div>
              <div className="modal-body">
                <div id="itemsdetailsrowskl" className="secondinsidedatax15s" style={{height:"350px"}}>
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
                              Flight Details
                            </div>
                            <div style={{ display: "flex", gap: "20px" }}>
                              <ul>
                                <li className="pendingfromfrontendx5 ">
                                  <span>Airline Name</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.airline_name || ""}
                                  </p>
                                </li>
                                <li className="pendingfromfrontendx5">
                                  <span>Entry type</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.entry_type || ""}
                                  </p>
                                </li>

                                <li>
                                  <span>Travel Date</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {formatDate3(data?.travel_date) || ""}
                                  </p>
                                </li>
                                <li>
                                  <span>Travel Type</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {" "}
                                    <ShowMastersValue
                                      type="51"
                                      id={data?.travel_type_id || ""}
                                    />
                                  </p>
                                </li>

                                <li className="pendingfrombackendx5">
                                  <span>Passengers</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.guests
                                      ?.map((item) => item?.display_name)
                                      .filter(Boolean)
                                      .join(", ")}
                                  </p>
                                </li>
                                <li>
                                  <span>GDS Portal</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.gds_portal || ""}
                                  </p>
                                </li>
                              </ul>
                              <ul>
                                {" "}
                                <li>
                                  <span>Ticket Number</span>
                                  <h1>:</h1>
                                  <p>{data?.ticket_no || ""}</p>
                                </li>
                                <li>
                                  <span>PRN Number</span>
                                  <h1>:</h1>
                                  <p>{data?.prn_no || ""}</p>
                                </li>
                                <li>
                                  <span>Route</span>
                                  <h1>:</h1>
                                  <p>{data?.route || ""}</p>
                                </li>
                                <li>
                                  <span>Supplier Name</span>
                                  <h1>:</h1>
                                  <p>{data?.supplier_name || ""}</p>
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
export default PassengerFlightDetails;
