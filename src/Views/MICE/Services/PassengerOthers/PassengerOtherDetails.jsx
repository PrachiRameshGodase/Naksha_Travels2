import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { Attachment2 } from "../../../Helper/Attachment";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";

const PassengerOtherDetails = ({ data, showPopup, setShowPopup }) => {
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
                <h5>{data?.item_name || ""}</h5>
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
                  // style={{ height: "400px" }}
                >
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
                              Other Details
                            </div>
                            <div style={{ display: "flex", gap: "20px" }}>
                              <ul>
                                <li className="pendingfromfrontendx5">
                                  <span>Item Name</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.item_name || ""}
                                  </p>
                                </li>

                                <li>
                                  <span>Quantity</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.quantity || ""}
                                  </p>
                                </li>
                                {/* <li>
                                                          <span>Price</span>
                                                          <h1>:</h1>
                                                          <p style={{ width: "212px" }}>
                                                            {data?.price || ""}
                                                          </p>
                                                        </li> */}

                                <li className="pendingfromfrontendx5">
                                  <span>Other Price</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.gross_amount || ""}
                                  </p>
                                </li>
                              </ul>
                              <ul>
                                <li>
                                  <span>Charges</span>
                                  <h1>:</h1>
                                  <p>
                                    {charge
                                      ?.filter(
                                        (item) =>
                                          item?.account_name && item?.amount
                                      )
                                      .map(
                                        (item) =>
                                          `${item?.account_name || ""} - ${
                                            item?.amount || ""
                                          }`
                                      )
                                      .join(", ")}
                                  </p>
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
                        <div className="inidbx1">
                          <div
                            className="inidbx1s1"
                            style={{
                              width: "447px",
                              background: "rgb(232 241 253 / 25%)",
                              marginTop: "20px",
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
                              Supplier Details
                            </div>
                            <div style={{ display: "flex", gap: "20px" }}>
                              <ul>
                                <li>
                                  <span>Supplier Name</span>
                                  <h1>:</h1>
                                  <p>{data?.supplier_name || ""}</p>
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
                              </ul>
                            </div>
                          </div>
                          <div
                            className="inidbx1s1"
                            style={{
                              width: "422px",
                              background: "rgb(232 241 253 / 25%)",
                              marginTop: "20px",
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
                              Customer Details
                            </div>
                            <div style={{ display: "flex", gap: "20px" }}>
                              <ul>
                                <li>
                                  <span style={{ width: "200px" }}>
                                    Customer tax
                                  </span>
                                  <h1>:</h1>
                                  <p>{data?.tax_amount || ""}</p>
                                </li>

                                <li>
                                  <span style={{ width: "200px" }}>
                                    Customer Price
                                  </span>
                                  <h1>:</h1>
                                  <p>{data?.total_amount || ""}</p>
                                </li>
                                <li>
                                  <span style={{ width: "200px" }}>Retain</span>
                                  <h1>:</h1>
                                  <p>{data?.retain || ""}</p>
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
export default PassengerOtherDetails;
