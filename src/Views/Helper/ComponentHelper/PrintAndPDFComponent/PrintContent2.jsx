// PdfTemplate.js
import React from "react";
import { formatDate3 } from "../../DateFormat";

import "./PdfTemplate.scss";
import "./PrintContent2.scss";
import { PdfShowUserMastersValue } from "../../ShowMastersValue";

const PrintContent2 = ({
  data,
  userMasterData,
  cusVenData,
  moduleId,
  section,
}) => {
  // console.log("userMasterData", userMasterData);
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
            <p className="customer-label">{moduleId}</p>
            <p className="">:</p>
            {section=="DSR" ?  <p className="customer-value">{data?.dsr_no || ""}</p> : <p className="customer-value">{data?.mice_no || ""}</p>}
           
          </div>

          <div className="customer-card">
            <p className="customer-label">Customer Name</p>
            <p className="">:</p>
            <p className="customer-value">
              {data?.customer?.display_name || ""}
            </p>
          </div>

          <div className="customer-card">
            <p className="customer-label">Customer Type</p>
            <p className="">:</p>
            <p className="customer-value">
              {data?.customer?.customer_type || ""}
            </p>
          </div>
        </div>
        <div className="customer-grid" style={{ marginTop: "20px" }}>
          <div className="customer-card">
            <p className="customer-label">Email</p>
            <p className="">:</p>
            <p className="customer-value">{data?.customer?.email || ""}</p>
          </div>
          <div className="customer-card">
            <p className="customer-label">Status</p>
            <p className="">:</p>

            <p className="customer-value">
              Pending
              {data?.customer?.status === "0"
                ? "Pending"
                : data?.customer?.status === "1"
                ? "Approved"
                : ""}
            </p>
          </div>

          <div className="customer-card">
            <p className="customer-label">Mobile No.</p>
            <p className="">:</p>
            <p>{data?.customer?.mobile_no || ""}</p>
          </div>
        </div>
      </div>

      <div
        style={{ marginTop: "20px", marginBottom: "20px", marginTop: "20px" }}
      >
        {data?.passengers?.map((item, index) => (
          <div key={index}>
            <div
              className="customer-details"
              style={{ marginLeft: "20px", marginRight: "10px" }}
            >
              <p className="customer-title">Passenger ({index + 1}):</p>
              <div className="customer-grid">
                <div className="customer-card">
                  <p className="customer-label">Name</p>
                  <p className="">:</p>
                  <p className="customer-value">
                    {item?.passenger?.display_name || "-"}
                  </p>
                </div>
                <div className="customer-card">
                  <p className="customer-label">Email</p>
                  <p className="">:</p>
                  <p className="customer-value">
                    {item?.passenger?.email || "-"}
                  </p>
                </div>
                <div className="customer-card">
                  <p className="customer-label">Mobile No.</p>
                  <p className="">:</p>
                  <p className="customer-value">
                    {item?.passenger?.mobile_no || "-"}
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                marginLeft: "30px",
                marginRight: "10px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <h3 className="customer-title">Services:</h3>
            </div>
            <div style={{ marginTop: "20px" }}>
              {item?.hotels?.map((data, index) => (
                <div key={index}>
                  <div
                    className="customer-details"
                    style={{
                      marginLeft: "20px",
                      marginRight: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Hotel ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <p className="customer-label">Booking Date</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {formatDate3(data?.booking_date) || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Hotel Name</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.hotel_name || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Room No</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.room?.room_number || ""}
                        </p>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Occupany</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          <PdfShowUserMastersValue
                            type="36"
                            id={data?.occupancy_id}
                            masterData={userMasterData}
                          />
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Meal:</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {" "}
                          <PdfShowUserMastersValue
                            type="37"
                            id={data?.meal_id}
                            masterData={userMasterData}
                          />
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Guest</p>
                        <p className="">:</p>
                        <p>
                          {data?.guests
                            ?.map((item) => item?.display_name)
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Check In</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {/* <p className="">:</p> */}
                          {formatDate3(data?.check_in_date) || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Check Out</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {formatDate3(data?.check_out_date) || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Bed</p>
                        <p className="">:</p>
                        <p>
                          <PdfShowUserMastersValue
                            type="38"
                            id={data?.bed}
                            masterData={userMasterData}
                          />
                        </p>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Amount</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.total_amount || ""}
                        </p>
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
                        <p className="customer-label">Booking Date</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {formatDate3(data?.booking_date) || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label"> Travel Date</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {formatDate3(data?.travel_date) || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Airline Name</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.airline_name || ""}
                        </p>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Airline Code</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.air_line_code || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Travel Type</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value"><PdfShowUserMastersValue
                            type="51"
                            id={data?.travel_type_id}
                            masterData={userMasterData}
                          /></p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">GDS Portal</p>{" "}
                        <p className="">:</p>
                        <p><PdfShowUserMastersValue
                            type="53"
                            id={data?.gds_portal}
                            masterData={userMasterData}
                          /></p>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Ticket No</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.ticket_no || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">PRN No.</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">{data?.prn_no || ""}</p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Destination Code:</p>{" "}
                        <p className="">:</p>
                        <p><PdfShowUserMastersValue
                            type="52"
                            id={data?.destination_code}
                            masterData={userMasterData}
                          /></p>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Route</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">{data?.route || ""}</p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Passenger</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.guests
                            ?.map((item) => item?.display_name)
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Amount</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.total_amount || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.visas?.map((data, index) => (
                <div key={index} style={{ marginTop: "20px", marginBottom:"20px" }}>
                  <div
                    className="customer-details"
                    style={{ marginLeft: "20px", marginRight: "10px" }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Visa ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <p className="customer-label">Passenger</p>
                        <p className="">:</p>

                        <p className="customer-value">
                          {data?.visa_passenger?.display_name || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Passport No</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.passport_no || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Date Of Birth</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {formatDate3(data?.dob) || ""}
                        </p>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Email</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">{data?.email || ""}</p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Expiry Date</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {formatDate3(data?.expiry_date) || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Issue Date</p>{" "}
                        <p className="">:</p>
                        <p>{formatDate3(data?.issue_date) || ""}</p>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Visa No</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">{data?.visa_no || ""}</p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Visa Type</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value"><PdfShowUserMastersValue
                            type="40"
                            id={data?.visa_type_id}
                            masterData={userMasterData}
                          /></p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Visa Entry Type</p>{" "}
                        <p className="">:</p>
                        <p><PdfShowUserMastersValue
                            type="39"
                            id={data?.visa_entry_type}
                            masterData={userMasterData}
                          /></p>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Days</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">{data?.days || ""}</p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Country</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.country?.name || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Amount</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.total_amount || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.car_hires?.map((data, index) => (
                <div key={index} style={{ marginTop: "20px", marginBottom:"20px" }}>
                  <div
                    className="customer-details"
                    style={{ marginLeft: "20px", marginRight: "10px" }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Car Hire ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <p className="customer-label">Vehicle Type</p>
                        <p className="">:</p>
                        <p className="customer-value"><PdfShowUserMastersValue
                            type="41"
                            id={data?.vehicle_type_id}
                            masterData={userMasterData}
                          /></p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Days</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">{data?.days || ""}</p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Pickup Location</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.pickup_location || ""}
                        </p>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Drop Location</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.drop_location || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Amount</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.total_amount || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.assists?.map((data, index) => (
                <div key={index} style={{ marginTop: "20px", marginBottom:"20px" }}>
                  <div
                    className="customer-details"
                    style={{ marginLeft: "20px", marginRight: "10px" }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Assist ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <p className="customer-label">Meeting Type:</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.meeting_type || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Airport</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.airport_name || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">No Of Persons</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.no_of_persons || ""}
                        </p>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Amount</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.total_amount || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.insurance?.map((data, index) => (
                <div key={index} style={{ marginTop: "20px" }}>
                  <div
                    className="customer-details"
                    style={{ marginLeft: "20px", marginRight: "10px", marginBottom:"20px" }}
                  >
                    <p className="customer-title" style={{ fontSize: "15px" }}>
                      Insurance ({index + 1}):
                    </p>
                    <div className="customer-grid">
                      <div className="customer-card">
                        <p className="customer-label">Passenger:</p>
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.passenger?.display_name || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Company Name</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.company_name || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Policy No</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.policy_no || ""}
                        </p>
                      </div>
                    </div>

                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px", marginBottom:"20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Insurance Plan</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.insurance_plan || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Issue Date</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {formatDate3(data?.issue_date) || ""}
                        </p>
                      </div>
                      <div className="customer-card">
                        <p className="customer-label">Expiry Date</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {formatDate3(data?.expiry_date) || ""}
                        </p>
                      </div>
                    </div>
                    <div
                      className="customer-grid"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="customer-card">
                        <p className="customer-label">Amount</p>{" "}
                        <p className="">:</p>
                        <p className="customer-value">
                          {data?.total_amount || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {item?.others?.map((data, index) => (
                <div
                  className="customer-details"
                  style={{
                    marginLeft: "20px",
                    marginRight: "10px",
                    marginTop: "20px",
                    marginBottom:"20px"
                  }}
                >
                  <p className="customer-title" style={{ fontSize: "15px" }}>
                    Other ({index + 1}):
                  </p>
                  <div className="customer-grid">
                    <div className="customer-card">
                      <p className="customer-label">Item Name:</p>
                      <p className="">:</p>
                      <p className="customer-value">{data?.item_name || ""}</p>
                    </div>
                    <div className="customer-card">
                      <p className="customer-label">Quantity</p>{" "}
                      <p className="">:</p>
                      <p className="customer-value">{data?.quantity || ""}</p>
                    </div>
                    <div className="customer-card">
                      <p className="customer-label">Amount</p>{" "}
                      <p className="">:</p>
                      <p className="customer-value">
                        {data?.total_amount || ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
             <hr style={{color:"#c8c6cb", marginBottom:"20px", marginTop:"20px",height:""}}></hr>
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
