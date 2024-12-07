// PdfTemplate.js
import React, { useState } from "react";
import "./PdfTemplate.scss";
import {
  activeOrg_details,
  parseJSONofString,
  showAmountWithCurrencySymbol,
  showRateWithPercent,
} from "../../HelperFunctions";
import { PdfShowMastersValue } from "../../ShowMastersValue";
import { otherIcons } from "../../SVGIcons/ItemsIcons/Icons";
import { currentTime, formatDate3, todayDate } from "../../DateFormat";
import nakshalogo from "../../../../assets/Naksha.png";
const PrintContent = ({ data, cusVenData, masterData, moduleId, section }) => {
  const [showCharges, setShowCharges] = useState(false);
  const active_orgnization = activeOrg_details;

  const calculateTotalTaxAmount = () => {
    return data?.items?.reduce((total, entry) => {
      return total + (entry?.tax_amount ? parseFloat(entry?.tax_amount) : 0);
    }, 0);
  };

  const totalExpenseCharges = parseJSONofString(data?.charges);
  console.log("active_orgnization", active_orgnization);
  // const showModuleText = section==="Quotation"?
  console.log("cusVenData", cusVenData);
  console.log("moduleId", moduleId)
  return (
    <div id="pdf_print_container">
      <div className="top_section" style={{ marginLeft: "5px" }}>
        <div className="contacts_321">
          <h1>{section}</h1>
          <p style={{ color: "gray" }}>PIN: P051850633C</p>
          {/* <p>Tel. : {cusVenData?.work_phone}</p> */}
          <p>Naksha Travels Limited</p>

          <p>#3G-02, Maruti Heights</p>
          <p>Nairobi, Kenya</p>
          <p>Phone: +254700124369</p>
          {/* <p>{active_orgnization?.name || ""}</p>

<p>
  {active_orgnization?.street1 || ""}
  {active_orgnization?.street1
    ? `, ${active_orgnization?.street1}`
    : ""}
  {active_orgnization?.zipcode
    ? `, ${active_orgnization?.zipcode}`
    : ""}
</p>
<p>
  {active_orgnization?.city?.name || ""}
  {active_orgnization?.state?.name
    ? `, ${active_orgnization?.state?.name}`
    : ""}
  {active_orgnization?.country?.name
    ? `, ${active_orgnization?.country?.name}`
    : ""}
</p>

<p>Phone: {active_orgnization?.mobile_no || ""}</p> */}
          <a
            href="https://www.nakshatravels.com"
            target="_blank"
            style={{ cursor: "pointer" }}
          >
            www.nakshatravels.com
          </a>
        </div>
        <div className="megamarket_logo_module_no_12_time_date">
          <div className="logoofkcs42w5wss">
            {" "}
            <img
              src={nakshalogo}
              alt=""
              style={{ width: "80px", height: "60px", marginRight: "30px" }}
            />
          </div>
        </div>
      </div>

      {/*Section 2  Addresses*/}
      <div className="del_And_Billing_Address">
        <div className="commonquoatjkx55s">
          <div className="childommonquoatjkx55s">
            <div className="detailsbox4x15s2">
              <div className="cjkls5xs1">
                <p>
                  <h3 style={{ color: "gray" }}>Bill To</h3>

                  <p>{active_orgnization?.email || ""}</p>
                </p>
              </div>
              <div className="cjkls5xs2">
                <>
                  <p>
                    {section} Number: {moduleId}
                  </p>
                  <p>
                    {section} Date: {formatDate3(data?.transaction_date)}
                  </p>
                  <p>Payment Due: October 04, 2024</p>
                  <p>Amount Due (USD): $704.30</p>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* /*Section 3 table print and pdf */}

      <>
        <table id="tablex15s56s31s1" style={{ marginLeft: "13px" }}>
          <thead className="thaedaksx433">
            <tr>
              <th className="sfdjklsd1xs2w1">#</th>
              <th className="sfdjklsd1xs2w2" style={{ width: "12%" }}>
                Item & Description
              </th>
              <th className="sfdjklsd1xs2w4 sfdjklsd1xs2wrate">Rate</th>
              <th className="sfdjklsd1xs2w3 sfdjklsd1xs2w3qty">Qty</th>
              {/* <th className="sfdjklsd1xs2w3">Unit</th> */}
              <th className="sfdjklsd1xs2w3 sfdjklsd1xs2w3Width">Tax Rate</th>
              <th className="sfdjklsd1xs2w5 sfdjklsd1xs2wamount ">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((val, index) => (
              <tr key={index} className="rowsxs15aksx433">
                <td className="sfdjklsd1xs2w1">{index + 1}</td>
                <td className="sfdjklsd1xs2w2">{val?.item?.name || ""}</td>
                <td className="sfdjklsd1xs2w4 sfdjklsd1xs2wrate">
                  {showAmountWithCurrencySymbol(val?.rate)}
                </td>
                <td className="sfdjklsd1xs2w3 sfdjklsd1xs2w3qty">
                  {val?.quantity || ""}
                  {"  "}
                  {val?.unit_id && (
                    <>
                      (
                      <PdfShowMastersValue
                        type="2"
                        id={val?.unit_id}
                        masterData={masterData}
                      />
                      )
                    </>
                  )}
                </td>
                {/* <td className="sfdjklsd1xs2w3"><ShowMastersValue type="2" id={val?.unit_id} /></td> */}
                <td className="sfdjklsd1xs2w3">
                  {showRateWithPercent(val?.tax_rate)}
                </td>
                <td className="sfdjklsd1xs2w5 sfdjklsd1xs2wamount">
                  {showAmountWithCurrencySymbol(val?.final_amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="finalcalculateiosxl44s">
          <span>
            <p>Subtotal</p>{" "}
            <h5>{showAmountWithCurrencySymbol(data?.subtotal)}</h5>
          </span>
          <span>
            <p>Total Tax</p>{" "}
            <h5>{showAmountWithCurrencySymbol(calculateTotalTaxAmount())}</h5>
          </span>
          <span>
            <p>Shipping Charge</p>{" "}
            <h5>{showAmountWithCurrencySymbol(data?.shipping_charge)}</h5>
          </span>
          <span>
            <p>Adjustment Charge</p>{" "}
            <h5>{showAmountWithCurrencySymbol(data?.adjustment_charge)}</h5>
          </span>

          {totalExpenseCharges?.length >= 1 && (
            <>
              <span
                onClick={() => setShowCharges(!showCharges)}
                style={{ cursor: "pointer", color: "#408dfb" }}
              >
                <p>Charges</p>{" "}
              </span>
              <>
                {totalExpenseCharges?.map((val) => (
                  <span>
                    <p>{val?.account_name}</p>{" "}
                    <h5>{showAmountWithCurrencySymbol(val?.amount)}</h5>
                  </span>
                ))}
              </>
            </>
          )}

          <span>
            <p>Total</p> <h5>{showAmountWithCurrencySymbol(data?.total)}</h5>
          </span>
        </div>
      </>

      {/* /*Section 3 table print and pdf */}

      {/* /*Section 4 copy stamp */}
      <div className="copy_bottom_footer_98" style={{ marginTop: "50px" , marginLeft:"16px"}}>
        {/* <h3>Notes / Terms</h3> */}
        <div className="stamp_remark">
          <div className="remark">
            <p>Notes: {data?.customer?.remarks}</p>
          </div>
        </div>
        <p>Banking Details:</p>
        <p>Account Name : Naksha Travels Limited</p>
        <p>Account Number KES : 0587122001</p>
        <p>Account Number USD : 0587122002</p>
        <p>Bank Name : Diamond Trust Bank Ltd</p>
        <p>Bank Branch : DTB Center</p>
        <p>Bank Branch Code 052 </p>
        <p>Bank Swift Code : DTKEKENA </p>
      </div>
      {/* /*Section 4 copy stamp */}

      {/* /*Section 5 main footer boxes */}
      {/* <div className="megamarket_boxes_343">
        <p>Naksha Travels</p>
        <p>AEF 53543564/AFQ 9244</p>
      </div>
      <div className="megamarket_boxes_343">
        <p>PETROS K</p>
        <p>86656</p>
      </div> */}

      {/* /*Section 5 main footer boxes */}
      <h4 style={{ color: "gray", fontSize: "13px" }}>
        Travel, Tours & Safaris
      </h4>
    </div>
  );
};

export default PrintContent;
