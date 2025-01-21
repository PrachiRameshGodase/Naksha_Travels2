import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { Attachment2 } from "../../../Helper/Attachment";
import ShowMastersValue from "../../../Helper/ShowMastersValue";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";

const PassengerAssistDetails = ({ data, showPopup, setShowPopup }) => {
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
                <h5>
                  Airport Name: {data?.airport_name || ""}
                </h5>
                <button
                  className="close-button"
                  onClick={() => setShowPopup(false)}
                >
                  <RxCross2 />
                </button>
              </div>
              <div className="modal-body">
                <div id="itemsdetailsrowskl" className="secondinsidedatax15s" style={{height:"400px"}}>
                  <div className="insidcontain">
                    {activeSection === "roomDetails" && (
                      <>
                        <div className="inidbx1">
                          <div
                            className="inidbx1s1"
                            style={{ width: "1000px", background: "#f6f8fa" }}
                          >
                            <div
                              className="inidbs1x1a1"
                              style={{
                                background: "hsl(205deg 14.51% 91.94%)",
                              }}
                            >
                              {otherIcons?.information_svg}
                              Assist Details
                            </div>
                            <div style={{ display: "flex", gap: "20px" }}>
                              <ul>
                                <li className="pendingfromfrontendx5">
                                  <span>Meeting Type</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.meeting_type || ""}
                                  </p>
                                </li>
                                {/* <li className="pendingfromfrontendx5">
                                  <span>Entry type</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.entry_type || ""}
                                  </p>
                                </li> */}

                                <li>
                                  <span>Airport</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.airport_name || ""}
                                  </p>
                                </li>
                                <li>
                                  <span> No Of Persons</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.no_of_persons || ""}
                                  </p>
                                </li>

                                <li>
                                  <span>Supplier Name</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.supplier_name || ""}
                                  </p>
                                </li>
                                <li>
                                  <span>Assist Price</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.gross_amount || ""}
                                  </p>
                                </li>
                              </ul>
                              <ul>
                                {/* <li>
                                  <span>Supplier Service Charge</span>
                                  <h1>:</h1>
                                  <p>{data?.charges || ""}</p>
                                </li> */}
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
export default PassengerAssistDetails;
