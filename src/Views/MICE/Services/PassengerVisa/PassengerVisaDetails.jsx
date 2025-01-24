import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { Attachment2 } from "../../../Helper/Attachment";
import { formatDate3 } from "../../../Helper/DateFormat";
import ShowMastersValue from "../../../Helper/ShowMastersValue";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import "../CreateHotelPopup.scss";

const PassengerVisaDetails = ({ data, showPopup, setShowPopup }) => {
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
                <h5>{data?.visa_passenger?.display_name || ""}</h5>
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
                  // style={{ height: "500px" }}
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
                              Visa Details
                            </div>
                            <div style={{ display: "flex", gap: "20px" }}>
                              <ul>
                                <li className="pendingfromfrontendx5">
                                  <span>Passenger Name</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.visa_passenger?.display_name || ""}
                                  </p>
                                </li>
                                <li className="pendingfromfrontendx5">
                                  <span>Passport Number</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.passport_no || ""}
                                  </p>
                                </li>

                                <li>
                                  <span>Date Of Birth</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.dob || ""}
                                  </p>
                                </li>
                                <li>
                                  <span>Email</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.email || ""}
                                  </p>
                                </li>
                                <li className="pendingfrombackendx5">
                                  <span>Visa Number</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.visa_no || ""}
                                  </p>
                                </li>
                                <li className="pendingfrombackendx5">
                                  <span>Visa Type</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    <ShowMastersValue
                                      type="40"
                                      id={data?.visa_type_id || ""}
                                    />
                                  </p>
                                </li>

                                <li>
                                  <span>Visa Entry Type</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    <ShowMastersValue
                                      type="39"
                                      id={data?.visa_entry_type || ""}
                                    />
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
                                  <span>Days</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.days || ""}
                                  </p>
                                </li>
                                <li>
                                  <span>Country</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {data?.country?.name || ""}
                                  </p>
                                </li>
                                <li>
                                  <span>Issue Date</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {formatDate3(data?.issue_date) || ""}
                                  </p>
                                </li>

                                <li>
                                  <span>Expiry Date</span>
                                  <h1>:</h1>
                                  <p style={{ width: "212px" }}>
                                    {formatDate3(data?.expiry_date) || ""}
                                  </p>
                                </li>
                              </ul>
                              <ul>
                                <li>
                                  <span>Supplier Name</span>
                                  <h1>:</h1>
                                  <p>{data?.supplier_name || ""}</p>
                                </li>
                                <li>
                                  <span>Visa Price</span>
                                  <h1>:</h1>
                                  <p>{data?.gross_amount || ""}</p>
                                </li>
                                <li>
                                  <span>Charges</span>
                                  <h1>:</h1>
                                  {charge?.length > 1 ? (
                                    <p>
                                      {charge
                                        .map(
                                          (item) =>
                                            `${item?.account_name || ""} - ${
                                              item?.amount || 0
                                            }`
                                        )
                                        .join(", ")}
                                    </p>
                                  ) : (
                                    charge?.map((item, index) => (
                                      <p key={index}>
                                        {item?.account_name || ""} -{" "}
                                        {item?.amount || 0}
                                      </p>
                                    ))
                                  )}
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
export default PassengerVisaDetails;
