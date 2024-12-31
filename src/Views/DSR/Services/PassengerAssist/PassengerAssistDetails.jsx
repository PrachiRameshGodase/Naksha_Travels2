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
                  <ShowMastersValue type="41" id={data?.meeting_type || ""} />
                </h5>
                <button
                  className="close-button"
                  onClick={() => setShowPopup(false)}
                >
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
                            <ul>
                              <li className="pendingfromfrontendx5">
                                <span>Meeting Type</span>
                                <h1>:</h1>
                                <p>{data?.meeting_type || ""}</p>
                              </li>
                              <li className="pendingfromfrontendx5">
                                <span>Entry type</span>
                                <h1>:</h1>
                                <p>{data?.entry_type || ""}</p>
                              </li>

                              <li>
                                <span>Airport</span>
                                <h1>:</h1>
                                <p>{data?.airport_name || ""}</p>
                              </li>
                              <li>
                                <span> No Of Persons</span>
                                <h1>:</h1>
                                <p>{data?.no_of_persons || ""}</p>
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
