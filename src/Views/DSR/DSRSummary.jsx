import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./PassengerCard.scss";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";

const DSRSummary = ({ passengers, customerData }) => {
  console.log("customerData", customerData);
  return (
    <div className="dsr-summary-card card1">
      {/* Top Section */}
      <div>
        <div
          className="card-top"
          style={{ position: "relative", justifyContent: "center" }}
        >
          <h2 className="card-title">DSR Summary</h2>
        </div>
        <div
          className="card-header"
          style={{
            position: "absolute",
            top: "73px",
            display:"flex",
            justifyContent:"space-between"
          }}
        >
          <div className="card-avatar"> {customerData.company_name ? customerData.company_name[0].toUpperCase() : ""}</div>

          <div className="status-text">
            <p style={{fontSize:"12px", color:"red"}}>Not Invoiced</p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
        className="information"
      >
        <div>
          <p>{customerData?.company_name ||"-"}</p>
          <p>{customerData?.email ||"-"}</p>
        </div>

        <div>
          <p>NDSR-1234</p>
        </div>
      </div>

      <hr className="divider" />

      {/* Details Section */}
      <div className="details-section">
        <p className="detail">
          <span className="label">Mobile No:</span>
          <span className="value">{customerData?.mobile_no ||"-"}</span>
        </p>
        <p className="detail">
          <span className="label">Currency:</span>
          <span className="value">{customerData?.currency ||"-"}</span>
        </p>
        <p className="detail">
          <span className="label">Customer Type:</span>
          <span className="value">{customerData?.customer_type ||"-"}</span>
        </p>
      </div>

      {/* Divider */}
      <hr className="divider" />

      {/* Added Passengers Section */}
      <div className="passengers-section">
        <h3 className="section-title">Address</h3>
     <p>{customerData?.address?.map((item, index)=>(
      <span key={index}> {item?.country?.name} {item?.state?.name} {item?.city?.name}</span>
     ))}</p>
      </div>
      <hr className="divider" />

      {/* Added Passengers Section */}
      <div className="passengers-section">
        <h3 className="section-title">Added Passengers</h3>

        <div className="contents">
          <div className="ProjectList">
            <table style={{ width: "280px" }}>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Name</th>
                  <th>Services</th>
                </tr>
              </thead>
              <tbody>
                {passengers?.map((item, index) => (
                  <tr key={index} style={{fontSize: "12px"}}>
                    <td>{index + 1 || "-"}</td>

                    <td>{item?.name || "-"}</td>
                    <td to={`/dashboard/services/${item?.id}`} className="link" style={{color:"blue"}}>
                      ServiceList
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Payable Amount Section */}
      <div className="payable-section">
        <span style={{ display: "flex" }}>
          {otherIcons.default_svg}
          <h3 style={{marginLeft:"4px"}}>Payable Amount</h3>
        </span>

        <p className="amount">₹ 1000</p>
      </div>
    </div>
  );
};

export default DSRSummary;
