import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { Attachment2 } from "../../../Helper/Attachment";
import ShowMastersValue from "../../../Helper/ShowMastersValue";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";

const PassengerCarHireDetails = ({ data, showPopup, setShowPopup }) => {
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
                  <ShowMastersValue
                    type="41"
                    id={data?.vehicle_type_id || ""}
                  />
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
                              Car Hire Details
                            </div>
                            <div style={{display:"flex", gap:"20px"}}>
                            <ul>
                              <li className="pendingfromfrontendx5">
                                <span>Vechile Type</span>
                                <h1>:</h1>
                                <p style={{width:"212px"}}>
                                  <ShowMastersValue
                                    type="41"
                                    id={data?.vehicle_type_id || ""}
                                  />
                                </p>
                              </li>
                              <li className="pendingfromfrontendx5">
                                <span>Entry type</span>
                                <h1>:</h1>
                                <p style={{width:"212px"}}>{data?.entry_type || ""}</p>
                              </li>

                              <li>
                                <span>Days</span>
                                <h1>:</h1>
                                <p style={{width:"212px"}}>{data?.days || ""}</p>
                              </li>
                              <li>
                                <span> Pickup Location</span>
                                <h1>:</h1>
                                <p style={{width:"212px"}}>{data?.pickup_location || ""}</p>
                              </li>

                              <li className="pendingfrombackendx5">
                                <span>Dropdown Location</span>
                                <h1>:</h1>
                                <p style={{width:"212px"}}>{data?.drop_location || ""}</p>
                              </li>

                              <li>
                                <span>Supplier Name</span>
                                <h1>:</h1>
                                <p style={{width:"212px"}}>{data?.supplier_name || ""}</p>
                              </li>
                            
                            </ul>
                            <ul>
                              <li className="pendingfromfrontendx5">
                                <span>Carhire Price</span>
                                <h1>:</h1>
                                <p>
                                 {data?.gross_amount || ""}
                                </p>
                              </li>
                              {/* <li className="pendingfromfrontendx5">
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
                                <span> Total Amount</span>
                                <h1>:</h1>
                                <p>{data?.total_amount || ""}</p>
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
export default PassengerCarHireDetails;
