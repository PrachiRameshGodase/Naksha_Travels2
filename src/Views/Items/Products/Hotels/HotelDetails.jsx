import React, { useState } from "react";
import HotelServices from "./HotelServices";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import { formatDate3 } from "../../../Helper/DateFormat";
import ShowMastersValue from "../../../Helper/ShowMastersValue";

const HotelDetails = ({ data }) => {
  const [activeSection, setActiveSection] = useState("basicDetails");
  return (
    <>
      <>
        <div id="itemsdetailsrowskl" className="secondinsidedatax15s">
          <div className="buttonscontainxs2">
            <div
              className={`divac12cs32 ${
                activeSection === "basicDetails" ? "activediv12cs" : ""
              }`}
              onClick={() => setActiveSection("basicDetails")}
            >
              {/* <img src={overviewIco} alt="" /> */}
              Basic Details
            </div>
            <div
              className={`divac12cs32 ${
                activeSection === "Hotel-Services" ? "activediv12cs" : ""
              }`}
              onClick={() => setActiveSection("Hotel-Services")}
            >
              {/* <img src={stocktransactionIco} alt="" /> */}
              Hotel-Services
            </div>
          </div>

          <div className="insidcontain">
            {activeSection === "basicDetails" && (
              <>
                <div className="inidbx1">
                  <div className="inidbx1s1">
                    <div className="inidbs1x1a1">
                      {otherIcons?.information_svg}
                      Basic Details
                    </div>
                    <ul>
                      {/* <li>
                        <span>Date</span>
                        <h1>:</h1>
                        <p>{formatDate3(data?.date_time)}</p>
                      </li> */}
                      <li>
                        <span>Hotel Name</span>
                        <h1>:</h1>
                        <p>{data?.hotel_name || "-"}</p>
                      </li>
                      <li>
                        <span>Hotel Type</span>
                        <h1>:</h1>
                        <p>
                          <ShowMastersValue type="35" id={data?.hotel_type} />
                        </p>
                      </li>
                      <li>
                        <span>Address</span>
                        <h1>:</h1>
                        <p>{data?.address_line_1 || "-"}</p>
                      </li>
                      <li>
                        <span>City</span>
                        <h1>:</h1>
                        <p>{data?.city?.name || "-"}</p>
                      </li>
                      <li>
                        <span>State</span>
                        <h1>:</h1>
                        <p>{data?.state?.name || "-"}</p>
                      </li>
                      <li>
                        <span>Country</span>
                        <h1>:</h1>
                        <p>{data?.country?.name || "-"}</p>
                      </li>

                      <li>
                        <span>Status</span>
                        <h1>:</h1>
                        <p>
                          {data?.status == "0"
                            ? "Active"
                            : data?.status == "1"
                            ? "Inactive"
                            : ""}
                        </p>
                      </li>

                      {/* <li><span>Attachments</span><h1>:</h1><p><Attachment attachments={images}/></p></li> */}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeSection === "Hotel-Services" && (
              <div className="insidx23s2302">
                <HotelServices
                  list={data?.bom?.scraps}
                  loading=""
                  data={data}
                />
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default HotelDetails;
