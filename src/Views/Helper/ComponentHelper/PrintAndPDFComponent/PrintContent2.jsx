// PdfTemplate.js
import React from "react";
import { formatDate3 } from "../../DateFormat";

import "./PdfTemplate.scss";
import "./PrintContent2.scss";

const PrintContent2 = ({ data, cusVenData, masterData, moduleId, section }) => {
  return (
    <div id="pdf_print_container" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="top_section" style={{ justifyContent: "center" }}>
        <div className="contacts_321">
          <h1>{section} Summary</h1>
        </div>
      </div>
      <div
        className="customer-details"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <p className="customer-title">Customer Details:</p>
        <div className="customer-grid">
          <div className="customer-card">
            <span className="customer-label">DSR NO:</span>
            <span className="customer-value">{data?.dsr_no || ""}</span>
            {/* {data?.dsr_no || ""} */}
          </div>
          <div className="customer-card">
            <span className="customer-label">Customer Name:</span>{" "}
            <span className="customer-value">
              {" "}
              {data?.customer?.display_name || ""}
            </span>
          </div>
          <div className="customer-card">
            <span className="customer-label">Customer Type:</span>{" "}
            <span className="customer-value">
              {" "}
              {data?.customer?.customer_type || ""}
            </span>{" "}
          </div>
        </div>
        <div className="customer-grid" style={{ marginTop: "20px" }}>
          <div className="customer-card">
            <span className="customer-label">Email:</span>{" "}
            <span className="customer-value">
              {data?.customer?.email || ""}
            </span>
          </div>
          <div className="customer-card">
            <span className="customer-label">Status:</span>{" "}
            <span className="customer-value">
              {" "}
              {data?.customer?.status === "0"
                ? "Pending"
                : data?.customer?.status === "1"
                ? "Approved"
                : ""}
            </span>
          </div>
          <div className="customer-card">
            <span className="customer-label">Mobile No.:</span>{" "}
            <span>{data?.customer?.mobile_no || ""}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px", marginBottom:"20px" }}>
        {data?.passengers?.map((item, index) => (
          <div key={index}>
            <div
              className="customer-details"
              style={{ marginLeft: "20px", marginRight: "10px" }}
            >
              <p className="customer-title">Passenger ({index + 1}):</p>
              <div className="customer-grid">
                <div className="customer-card">
                  <span className="customer-label">Name:</span>
                  <span className="customer-value">
                    {item?.passenger?.display_name || "-"}
                  </span>
                </div>
                <div className="customer-card">
                  <span className="customer-label">Email:</span>{" "}
                  <span className="customer-value">
                    {item?.passenger?.email || "-"}
                  </span>
                </div>
                <div className="customer-card">
                  <span className="customer-label">Mobile No.:</span>{" "}
                  <span className="customer-value">
                    {item?.passenger?.mobile_no || "-"}
                  </span>{" "}
                </div>
              </div>
            </div>
            <div  style={{ marginLeft: "30px", marginRight: "10px", marginBottom:"20px", marginTop:"20px" }}> <h3 className="customer-title">Services:</h3></div>
            <div style={{ marginTop: "20px" }}>
              {item?.hotels?.map((data, index) => (
                <div key={index}>
                  <div
                    className="customer-details"
                    style={{ marginLeft: "20px", marginRight: "10px", marginBottom:"20px" }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Hotel ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <span className="customer-label">Booking Date:</span>
                        <span className="customer-value">
                          {formatDate3(data?.booking_date) || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Hotel Name:</span>{" "}
                        <span className="customer-value">
                          {data?.hotel_name || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Room No:</span>{" "}
                        <span className="customer-value">
                          {data?.room?.room_number || ""}
                        </span>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Occupany:</span>{" "}
                        <span className="customer-value">Single Room</span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Meal:</span>{" "}
                        <span className="customer-value">Room Only</span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Guest:</span>{" "}
                        <span>
                          {data?.guests
                            ?.map((item) => item?.display_name)
                            .filter(Boolean)
                            .join(", ")}{" "}
                        </span>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Check In:</span>{" "}
                        <span className="customer-value">
                          {" "}
                          {formatDate3(data?.check_in_date) || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Check Out:</span>{" "}
                        <span className="customer-value">
                          {formatDate3(data?.check_out_date) || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Bed:</span>{" "}
                        <span>Single Bed</span>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Amount:</span>{" "}
                        <span className="customer-value">
                          {data?.total_amount || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.flights?.map((data, index) => (
                <div key={index} style={{ marginTop: "20px" }}>
                  <div
                    className="customer-details"
                    style={{ marginLeft: "20px", marginRight: "10px" }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Flight ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <span className="customer-label">Booking Date:</span>
                        <span className="customer-value">
                          {formatDate3(data?.booking_date) || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label"> Travel Date:</span>{" "}
                        <span className="customer-value">
                          {formatDate3(data?.travel_date) || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Airline Name:</span>{" "}
                        <span className="customer-value">
                          {data?.airline_name || ""}
                        </span>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Airline Code:</span>{" "}
                        <span className="customer-value">
                          {data?.air_line_code || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Travel Type:</span>{" "}
                        <span className="customer-value">Room Only</span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">GDS Portal:</span>{" "}
                        <span>{data?.gds_portal || ""}</span>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Ticket No:</span>{" "}
                        <span className="customer-value">
                          {data?.ticket_no || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">PNR No.:</span>{" "}
                        <span className="customer-value">
                          {data?.prn_no || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">
                          Destination Code:
                        </span>{" "}
                        <span>Single Bed</span>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Route:</span>{" "}
                        <span className="customer-value">
                          {data?.route || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Passenger:</span>{" "}
                        <span className="customer-value">
                          {data?.guests
                            ?.map((item) => item?.display_name)
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Amount:</span>{" "}
                        <span className="customer-value">
                          {data?.total_amount || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.visas?.map((data, index) => (
                <div key={index} style={{ marginTop: "20px" }}>
                  <div
                    className="customer-details"
                    style={{ marginLeft: "20px", marginRight: "10px" }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Visa ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <span className="customer-label">Passenger:</span>
                        <span className="customer-value">
                          {data?.visa_passenger?.display_name || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Passport No:</span>{" "}
                        <span className="customer-value">
                          {data?.passport_no || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Date Of Birth:</span>{" "}
                        <span className="customer-value">
                          {formatDate3(data?.dob) || ""}
                        </span>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Email:</span>{" "}
                        <span className="customer-value">
                          {data?.email || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Expiry Date:</span>{" "}
                        <span className="customer-value">
                          {formatDate3(data?.expiry_date) || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Issue Date:</span>{" "}
                        <span>{formatDate3(data?.issue_date) || ""}</span>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Visa No:</span>{" "}
                        <span className="customer-value">
                          {data?.visa_no || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Visa Type:</span>{" "}
                        <span className="customer-value">
                          {data?.prn_no || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Visa Entry Type:</span>{" "}
                        <span>Single Bed</span>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Days:</span>{" "}
                        <span className="customer-value">
                          {data?.days || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Country:</span>{" "}
                        <span className="customer-value">
                          {data?.country?.name || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Amount:</span>{" "}
                        <span className="customer-value">
                          {data?.total_amount || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.car_hires?.map((data, index) => (
                <div key={index} style={{ marginTop: "20px" }}>
                  <div
                    className="customer-details"
                    style={{ marginLeft: "20px", marginRight: "10px" }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Car Hire ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <span className="customer-label">Vehicle Type:</span>
                        <span className="customer-value"></span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Days:</span>{" "}
                        <span className="customer-value">
                          {data?.days || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Pickup Location:</span>{" "}
                        <span className="customer-value">
                          {data?.pickup_location || ""}
                        </span>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Drop Location:</span>{" "}
                        <span className="customer-value">
                          {data?.drop_location || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Amount:</span>{" "}
                        <span className="customer-value">
                          {data?.total_amount || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.assists?.map((data, index) => (
                <div key={index} style={{ marginTop: "20px" }}>
                  <div
                    className="customer-details"
                    style={{ marginLeft: "20px", marginRight: "10px" }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Car Hire ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <span className="customer-label">Meeting Type:</span>
                        <span className="customer-value">
                          {" "}
                          {data?.meeting_type || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Airport:</span>{" "}
                        <span className="customer-value">
                          {data?.airport_name || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">No Of Persons:</span>{" "}
                        <span className="customer-value">
                          {data?.no_of_persons || ""}
                        </span>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Amount:</span>{" "}
                        <span className="customer-value">
                          {data?.total_amount || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.insurance?.map((data, index) => (
                <div key={index} style={{ marginTop: "20px" }}>
                  <div
                    className="customer-details"
                    style={{ marginLeft: "20px", marginRight: "10px" }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Insurance ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <span className="customer-label">Passenger:</span>
                        <span className="customer-value">
                          {data?.passenger?.display_name || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Company Name:</span>{" "}
                        <span className="customer-value">
                          {data?.company_name || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Policy No:</span>{" "}
                        <span className="customer-value">
                          {data?.policy_no || ""}
                        </span>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Insurance Plan:</span>{" "}
                        <span className="customer-value">
                          {data?.insurance_plan || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Issue Date:</span>{" "}
                        <span className="customer-value">
                          {formatDate3(data?.issue_date) || ""}
                        </span>
                      </div>
                      <div className="customer-card">
                        <span className="customer-label">Expiry Date:</span>{" "}
                        <span className="customer-value">
                          {formatDate3(data?.expiry_date) || ""}
                        </span>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <span className="customer-label">Amount:</span>{" "}
                        <span className="customer-value">
                          {data?.total_amount || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.others?.map((data, index) => (
                <div
                  className="customer-details"
                  style={{ marginLeft: "20px", marginRight: "10px", marginTop:"20px" }}
                >
                  <p className="customer-title" style={{ fontSize: "15px" }}>
                    Other ({index + 1}):
                  </p>
                  <div className="customer-grid">
                    <div className="customer-card">
                      <span className="customer-label">Item Name:</span>
                      <span className="customer-value">
                        {data?.item_name || ""}
                      </span>
                    </div>
                    <div className="customer-card">
                      <span className="customer-label">Quantity:</span>{" "}
                      <span className="customer-value">
                        {data?.entry_type || ""}
                      </span>
                    </div>
                    <div className="customer-card">
                      <span className="customer-label">Amount</span>{" "}
                      <span className="customer-value">
                        {data?.total_amount || ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* /*Section 5 main footer boxes */}
      <h4 style={{ color: "gray", fontSize: "13px" }}>
        Travel, Tours & Safaris
      </h4>
    </div>
  );
};

export default PrintContent2;
