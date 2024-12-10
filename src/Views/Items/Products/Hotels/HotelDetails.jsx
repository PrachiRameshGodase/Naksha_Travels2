import React, { useState } from "react";
import HotelServices from "./HotelServices";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import { formatDate3 } from "../../../Helper/DateFormat";

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
                      <li>
                        <span>Date</span>
                        <h1>:</h1>
                        <p>{formatDate3(data?.date_time)}</p>
                      </li>
                      <li>
                        <span>Hotel Name</span>
                        <h1>:</h1>
                        <p>{data?.production_id}</p>
                      </li>
                      <li>
                        <span>Hotel Type</span>
                        <h1>:</h1>
                        <p>{data?.bom?.bom_id}</p>
                      </li>
                      <li>
                        <span>Address</span>
                        <h1>:</h1>
                        <p>
                          {data?.bom?.bom_type
                            ? data?.bom?.bom_type == "1"
                              ? "Single Product"
                              : "By Product"
                            : ""}
                        </p>
                      </li>
                      <li>
                        <span>City</span>
                        <h1>:</h1>
                        <p>{data?.batch?.batch_number}</p>
                      </li>
                      <li>
                        <span>State</span>
                        <h1>:</h1>
                        <p>{data?.order?.order_id}</p>
                      </li>
                      <li>
                        <span>Country</span>
                        <h1>:</h1>
                        <p>{data?.bom?.item?.name}</p>
                      </li>
                     
                      <li>
                        <span>Status</span>
                        <h1>:</h1>
                        <p>
                          {data?.status == "0"
                            ? "Not Started"
                            : data?.status == "1"
                            ? "Inprogress"
                            : data?.status == "2"
                            ? "Partially Completed"
                            : data?.status == "3"
                            ? "Completed"
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
                  productionData={data}
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
