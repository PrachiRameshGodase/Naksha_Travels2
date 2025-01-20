// PdfTemplate.js
import React from "react";
import { formatDate3 } from "../../DateFormat";
import ShowMastersValue from "../../ShowMastersValue";
import "./PdfTemplate.scss";
import "./PrintContent2.scss";

const PrintContent2 = ({ data, cusVenData, masterData, moduleId, section }) => {
  return (
    <div id="pdf_print_container">
      <div className="top_section" style={{ justifyContent: "center" }}>
        <div className="contacts_321">
          <h1>{section} Summary</h1>
        </div>
      </div>
      <div>
        <p>Customer Details:</p>
        <table>
          <thead className="">
            <tr>
              <th style={{ width: "244px" }}>DSR NO</th>
              <td>{data?.dsr_no || ""}</td>
              <th>Customer Name</th>
              <td>{data?.customer?.display_name || ""}</td>
            </tr>
            <tr>
              <th style={{ width: "244px" }}>Customer Type</th>
              <td>{data?.customer?.customer_type || ""}</td>

              <th>Email</th>
              <td>{data?.customer?.email || ""}</td>
            </tr>
            <tr>
              <th style={{ width: "244px" }}>Status</th>
              <td>
                {" "}
                {data?.customer?.status == "0"
                  ? "Pending"
                  : data?.customer?.status == "1"
                  ? "Approved"
                  : ""}
              </td>

              <th>Mobile No.</th>
              <td>{data?.customer?.mobile_no || ""}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>Passenger Details:</p>
        {data?.passengers?.map((item, index) => (
          <div key={index}>
            <div>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "285px" }}>Sr No.</th>
                    <td style={{ width: "230px" }}>{index + 1}</td>
                    <th style={{ width: "285px" }}>Name</th>
                    <td>{item?.passenger?.display_name || "-"}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "285px" }}>Email</th>
                    <td style={{ width: "230px" }}>
                      {item?.passenger?.email || "-"}
                    </td>
                    <th style={{ width: "285px" }}>Mobile No.</th>
                    <td>{item?.passenger?.mobile_no || "-"}</td>
                  </tr>
                </thead>
              </table>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p>Services:</p>
              {item?.hotels?.length > 0 ? (
                <p>Hotel: ({item?.hotels?.length || 0})</p>
              ) : (
                ""
              )}

              {item?.hotels?.map((data, index) => (
                <div key={index}>
                  {" "}
                  <table style={{ marginBottom: "20px" }}>
                    <thead className="">
                      <tr>
                        <th>Booking Date</th>
                        <td>{formatDate3(data?.booking_date) || ""}</td>
                        <th>Hotel Name</th>
                        <td>{data?.hotel_name || ""}</td>
                      </tr>
                      <tr>
                        <th>Room No</th>
                        <td>{data?.room?.room_number || ""}</td>

                        <th>Occupany</th>
                        <td>
                          <ShowMastersValue type="36" id={data?.occupancy_id} />
                        </td>
                      </tr>
                      <tr>
                        <th>Meal</th>
                        <td>
                          <ShowMastersValue
                            type="37"
                            id={data?.meal_id || ""}
                          />
                        </td>

                        <th>Guest</th>
                        <td>
                          {" "}
                          {data?.guests
                            ?.map((item) => item?.display_name)
                            .filter(Boolean)
                            .join(", ")}{" "}
                        </td>
                      </tr>
                      <tr>
                        <th>Check In</th>
                        <td> {formatDate3(data?.check_in_date) || ""}</td>

                        <th>Check Out</th>
                        <td>{data?.customer?.email || ""}</td>
                      </tr>
                      <tr>
                        <th>Bed</th>
                        <td>
                          <ShowMastersValue type="38" id={data?.bed || ""} />
                        </td>

                        <th>Amount</th>
                        <td>{data?.total_amount || ""}</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              ))}
              {item?.flights?.length > 0 ? (
                <p>Flight: ({item?.flights?.length || 0})</p>
              ) : (
                ""
              )}

              {item?.flights?.map((data, index) => (
                <div key={index}>
                  {" "}
                  <table style={{ marginBottom: "20px" }}>
                    <thead className="">
                      <tr>
                        <th style={{ width: "230px" }}>Booking Date</th>
                        <td style={{ width: "270px" }}>
                          {formatDate3(data?.booking_date) || ""}
                        </td>
                        <th>Travel Date</th>
                        <td>{formatDate3(data?.travel_date) || ""}</td>
                      </tr>
                      <tr>
                        <th style={{ width: "230px" }}>Airline Name</th>
                        <td style={{ width: "270px" }}>
                          {data?.airline_name || ""}
                        </td>

                        <th>Airline Code</th>
                        <td>{data?.air_line_code || ""}</td>
                      </tr>
                      <tr>
                        <th style={{ width: "230px" }}>Travel Type</th>
                        <td style={{ width: "270px" }}>
                          <ShowMastersValue
                            type="51"
                            id={data?.travel_type_id || ""}
                          />
                        </td>

                        <th>GDS Portal</th>
                        <td>{data?.gds_portal || ""}</td>
                      </tr>
                      <tr>
                        <th style={{ width: "230px" }}>Ticket No.</th>
                        <td style={{ width: "270px" }}>
                          {data?.ticket_no || ""}
                        </td>

                        <th>PNR No.</th>
                        <td>{data?.prn_no || ""}</td>
                      </tr>
                      <tr>
                        <th style={{ width: "230px" }}>Destination Code</th>
                        <td style={{ width: "270px" }}>
                          {data?.destination_code || ""}
                        </td>

                        <th>Route</th>
                        <td>{data?.route || ""}</td>
                      </tr>
                      <tr>
                        <th style={{ width: "230px" }}>Passenger</th>
                        <td style={{ width: "270px" }}>
                          {data?.guests
                            ?.map((item) => item?.display_name)
                            .filter(Boolean)
                            .join(", ")}
                        </td>

                        <th>Amount</th>
                        <td>{data?.total_amount || ""}</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              ))}
              {item?.visas?.length > 0 ? (
                <p>Visa: ({item?.visas?.length || 0})</p>
              ) : (
                ""
              )}

              {item?.visas?.map((data, index) => (
                <div key={index}>
                  <table style={{ marginBottom: "20px" }}>
                    <thead className="">
                      <tr>
                        <th>Passenger</th>
                        <td> {data?.visa_passenger?.display_name || ""}</td>
                        <th>Passport No</th>
                        <td>{data?.passport_no || ""}</td>
                      </tr>
                      <tr>
                        <th>Date Of Birth</th>
                        <td>{formatDate3(data?.dob) || ""}</td>

                        <th>Email</th>
                        <td>{data?.email || ""}</td>
                      </tr>
                      <tr>
                        <th>Expiry Date</th>
                        <td>{formatDate3(data?.expiry_date) || ""}</td>

                        <th>Issue Date</th>
                        <td>{formatDate3(data?.issue_date) || ""}</td>
                      </tr>
                      <tr>
                        <th>Visa No</th>
                        <td>{data?.visa_no || ""}</td>

                        <th>Visa Type</th>
                        <td>
                          <ShowMastersValue
                            type="40"
                            id={data?.visa_type_id || ""}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Visa Entry Type</th>
                        <td>
                          <ShowMastersValue
                            type="39"
                            id={data?.visa_entry_type || ""}
                          />
                        </td>

                        <th>Days</th>
                        <td>{data?.days || ""}</td>
                      </tr>
                      <tr>
                        <th>Country</th>
                        <td>{data?.country?.name || ""}</td>

                        <th>Amount</th>
                        <td>{data?.total_amount || ""}</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              ))}
              {item?.car_hires?.length > 0 ? (
                <p>Car Hire: ({item?.car_hires?.length || 0})</p>
              ) : (
                ""
              )}

              {item?.car_hires?.map((data, index) => (
                <div key={index}>
                  {" "}
                  <table style={{ marginBottom: "20px" }}>
                    <thead className="">
                      <tr>
                        <th>Vehicle Type</th>
                        <td style={{ width: "240px" }}>
                          <ShowMastersValue
                            type="41"
                            id={data?.vehicle_type_id || ""}
                          />
                        </td>

                        <th style={{ width: "240px" }}>Days</th>
                        <td style={{ width: "240px" }}>{data?.days || ""}</td>
                      </tr>
                      <tr>
                        <th>Pickup Location</th>
                        <td style={{ width: "240px" }}>
                          {data?.pickup_location || ""}
                        </td>

                        <th style={{ width: "240px" }}>Drop Location</th>
                        <td>{data?.drop_location || ""}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <td style={{ width: "240px" }}></td>

                        <th style={{ width: "240px" }}>Amount</th>
                        <td>{data?.total_amount || ""}</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              ))}
              {item?.assists?.length > 0 ? (
                <p>Assit: ({item?.assists?.length || 0})</p>
              ) : (
                ""
              )}

              {item?.assists?.map((data, index) => (
                <table style={{ marginBottom: "20px" }} key={index}>
                  <thead className="">
                    <tr>
                      <th style={{ width: "265px" }}>Meeting Type</th>
                      <td style={{ width: "260px" }}>
                        {data?.meeting_type || ""}
                      </td>
                      <th style={{ width: "260px" }}>Airport </th>
                      <td>{data?.airport_name || ""}</td>
                    </tr>
                    <tr>
                      <th style={{ width: "265px" }}>No Of Persons</th>
                      <td style={{ width: "260px" }}>
                        {data?.no_of_persons || ""}
                      </td>

                      <th style={{ width: "260px" }}>Amount</th>
                      <td>{data?.total_amount || ""}</td>
                    </tr>
                  </thead>
                </table>
              ))}
              {item?.insurance?.length > 0 ? (
                <p>Insurance: ({item?.insurance?.length || 0})</p>
              ) : (
                ""
              )}

              {item?.insurance?.map((data, index) => (
                <table style={{ marginBottom: "20px" }}>
                  <thead className="" key={index}>
                    <tr>
                      <th>Passenger</th>
                      <td>{data?.passenger?.display_name || ""}</td>
                      <th>Company Name</th>
                      <td>{data?.company_name || ""}</td>
                    </tr>
                    <tr>
                      <th>Policy No</th>
                      <td>{data?.policy_no || ""}</td>

                      <th>Insurance Plan</th>
                      <td>{data?.insurance_plan || ""}</td>
                    </tr>
                    <tr>
                      <th>Issue Date</th>
                      <td>{formatDate3(data?.issue_date) || ""}</td>

                      <th>Expiry Date</th>
                      <td>{formatDate3(data?.expiry_date) || ""}</td>
                    </tr>

                    <tr>
                      <th></th>
                      <td></td>

                      <th>Amount</th>
                      <td>{data?.total_amount || ""}</td>
                    </tr>
                  </thead>
                </table>
              ))}
              {item?.others?.length > 0 ? (
                <p>Other: ({item?.others?.length || 0})</p>
              ) : (
                ""
              )}

              {item?.others?.map((data, index) => (
                <table style={{ marginBottom: "20px" }} key={index}>
                  <thead className="">
                    <tr>
                      <th>Item Name</th>
                      <td>{data?.item_name || ""}</td>
                      <th>Quantity </th>
                      <td>{data?.entry_type || ""}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <td></td>

                      <th>Amount</th>
                      <td>{data?.total_amount || ""}</td>
                    </tr>
                  </thead>
                </table>
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
