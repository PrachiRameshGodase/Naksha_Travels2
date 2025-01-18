// PdfTemplate.js
import React, { useEffect, useState } from "react";
import { activeOrg_details, parseJSONofString } from "../../HelperFunctions";
import "./PdfTemplate.scss";
import "./PrintContent2.scss";

import { PassengerHotelDetailsAction } from "../../../../Redux/Actions/passengerHotelActions";

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
        <table>
          {data?.passengers?.map((item, index) => (
            <thead key={index}>
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
          ))}
        </table>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>Services:</p>
        <p>Hotel:</p>
        <table style={{ marginBottom: "20px" }}>
          <thead className="">
            <tr>
              <th>Booking Date</th>
              <td>{data?.dsr_no || ""}</td>
              <th>Hotel Name</th>
              <td>{data?.customer?.display_name || ""}</td>
            </tr>
            <tr>
              <th>Room No</th>
              <td>{data?.customer?.customer_type || ""}</td>

              <th>Occupany</th>
              <td>{data?.customer?.email || ""}</td>
            </tr>
            <tr>
              <th>Meal</th>
              <td>
                {" "}
                {data?.customer?.status == "0"
                  ? "Pending"
                  : data?.customer?.status == "1"
                  ? "Approved"
                  : ""}
              </td>

              <th>Guest</th>
              <td>{data?.customer?.mobile_no || ""}</td>
            </tr>
            <tr>
              <th>Check In</th>
              <td>{data?.customer?.customer_type || ""}</td>

              <th>Check Out</th>
              <td>{data?.customer?.email || ""}</td>
            </tr>
            <tr>
              <th>Bed</th>
              <td>
                {" "}
                {data?.customer?.status == "0"
                  ? "Pending"
                  : data?.customer?.status == "1"
                  ? "Approved"
                  : ""}
              </td>

              <th>Amount</th>
              <td>{data?.customer?.mobile_no || ""}</td>
            </tr>
          </thead>
        </table>
        <p>Flight:</p>
        <table style={{marginBottom:"20px"}}>
          <thead className="" >
            <tr>
              <th style={{width:"230px"}}>Booking Date</th>
              <td style={{width:"270px"}}>{data?.booking_date || ""}</td>
              <th>Travel Date</th>
              <td>{data?.travel_date || ""}</td>
            </tr>
            <tr>
              <th style={{width:"230px"}}>Airline Name</th>
              <td style={{width:"270px"}}>{data?.air_line_name || ""}</td>

              <th>Airline Code</th>
              <td>{data?.air_line_code || ""}</td>
            </tr>
            <tr>
              <th style={{width:"230px"}}>Travel Type</th>
              <td style={{width:"270px"}}>{data?.travel_type || ""}</td>

              <th>GDS Portal</th>
              <td>{data?.gds_portal || ""}</td>
            </tr>
            <tr>
              <th style={{width:"230px"}}>Ticket No.</th>
              <td style={{width:"270px"}}>{data?.ticket_no || ""}</td>

              <th>PNR No.</th>
              <td>{data?.prn_no || ""}</td>
            </tr>
            <tr>
              <th style={{width:"230px"}}>Destination Code</th>
              <td style={{width:"270px"}}>{data?.destination_code || ""}</td>

              <th>Route</th>
              <td>{data?.route || ""}</td>
            </tr>
            <tr>
              <th style={{width:"230px"}}>Passenger</th>
              <td style={{width:"270px"}}>{data?.passenger_name || ""}</td>

              <th>Amount</th>
              <td>{data?.amount || ""}</td>
            </tr>
          </thead>
        </table>
        <p>Visa:</p>
        <table style={{ marginBottom: "20px" }}>
          <thead className="">
            <tr>
              <th>Passenger</th>
              <td>{data?.passenger_name || ""}</td>
              <th>Passport No</th>
              <td>{data?.customer?.display_name || ""}</td>
            </tr>
            <tr>
              <th>Date Of Birth</th>
              <td>{data?.customer?.customer_type || ""}</td>

              <th>Email</th>
              <td>{data?.customer?.email || ""}</td>
            </tr>
            <tr>
              <th>Expiry Date</th>
              <td>
                {" "}
                {data?.customer?.status == "0"
                  ? "Pending"
                  : data?.customer?.status == "1"
                  ? "Approved"
                  : ""}
              </td>

              <th>Issue Date</th>
              <td>{data?.customer?.mobile_no || ""}</td>
            </tr>
            <tr>
              <th>Visa No</th>
              <td>{data?.customer?.customer_type || ""}</td>

              <th>Visa Type</th>
              <td>{data?.customer?.email || ""}</td>
            </tr>
            <tr>
              <th>Visa Entry Type</th>
              <td>
                {" "}
                {data?.customer?.status == "0"
                  ? "Pending"
                  : data?.customer?.status == "1"
                  ? "Approved"
                  : ""}
              </td>

              <th>Days</th>
              <td>{data?.customer?.mobile_no || ""}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>
                {" "}
                {data?.customer?.status == "0"
                  ? "Pending"
                  : data?.customer?.status == "1"
                  ? "Approved"
                  : ""}
              </td>

              <th>Amount</th>
              <td>{data?.customer?.mobile_no || ""}</td>
            </tr>
          </thead>
        </table>
        <p>Car Hire:</p>
        <table style={{ marginBottom: "20px" }}>
          <thead className="">
            <tr>
              <th>Vehicle Type</th>
              <td  style={{width:"240px"}}>
                {" "}
                {data?.customer?.status == "0"
                  ? "Pending"
                  : data?.customer?.status == "1"
                  ? "Approved"
                  : ""}
              </td>

              <th  style={{width:"240px"}}>Days</th>
              <td  style={{width:"240px"}}>{data?.customer?.mobile_no || ""}</td>
            </tr>
            <tr>
              <th>Pickup Location</th>
              <td  style={{width:"240px"}}>{data?.customer?.customer_type || ""}</td>

              <th  style={{width:"240px"}}>Drop Location</th>
              <td>{data?.customer?.email || ""}</td>
            </tr>
            <tr>
              <th></th>
              <td  style={{width:"240px"}}></td>

              <th  style={{width:"240px"}}>Amount</th>
              <td>{data?.customer?.mobile_no || ""}</td>
            </tr>
          </thead>
        </table>

        <p>Assit:</p>
        <table style={{ marginBottom: "20px" }}>
          <thead className="">
            <tr>
              <th style={{width:"265px"}}>Meeting Type</th>
              <td style={{width:"260px"}}>{data?.passenger_name || ""}</td>
              <th style={{width:"260px"}}>Airport </th>
              <td>{data?.customer?.display_name || ""}</td>
            </tr>
            <tr>
              <th style={{width:"265px"}}>No Of Persons</th>
              <td style={{width:"260px"}}>{data?.customer?.customer_type || ""}</td>

              <th style={{width:"260px"}}>Amount</th>
              <td>{data?.customer?.email || ""}</td>
            </tr>
          </thead>
        </table>
        <p>Insurance:</p>
        <table style={{ marginBottom: "20px" }}>
          <thead className="">
            <tr>
              <th>Passenger</th>
              <td>{data?.passenger_name || ""}</td>
              <th>Company Name</th>
              <td>{data?.customer?.display_name || ""}</td>
            </tr>
            <tr>
              <th>Policy No</th>
              <td>{data?.customer?.customer_type || ""}</td>

              <th>Insurance Plan</th>
              <td>{data?.customer?.email || ""}</td>
            </tr>
            <tr>
              <th>Issue Date</th>
              <td></td>

              <th>Expiry Date</th>
              <td>{data?.customer?.mobile_no || ""}</td>
            </tr>

            <tr>
              <th></th>
              <td></td>

              <th>Amount</th>
              <td>{data?.customer?.mobile_no || ""}</td>
            </tr>
          </thead>
        </table>
        <p>Other:</p>
        <table style={{ marginBottom: "20px" }}>
          <thead className="">
            <tr>
              <th>Item Name</th>
              <td>{data?.passenger_name || ""}</td>
              <th>Quantity </th>
              <td>{data?.customer?.display_name || ""}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>

              <th>Amount</th>
              <td>{data?.customer?.email || ""}</td>
            </tr>
          </thead>
        </table>
      </div>
      {/* /*Section 5 main footer boxes */}
      <h4 style={{ color: "gray", fontSize: "13px" }}>
        Travel, Tours & Safaris
      </h4>
    </div>
  );
};

export default PrintContent2;
