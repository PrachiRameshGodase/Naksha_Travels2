// PdfTemplate.js
import React, { useState } from "react";
import nakshalogo from "../../../../assets/Naksha.png";
import { formatDate3 } from "../../DateFormat";
import {activeOrg_details,parseJSONofString,showAmountWithCurrencySymbol,showRateWithPercent,} from "../../HelperFunctions";
import { PdfShowMastersValue } from "../../ShowMastersValue";
import "./PdfTemplate.scss";

const PrintContent2 = ({ data, cusVenData, masterData, moduleId, section }) => {
  const [showCharges, setShowCharges] = useState(false);
  const active_orgnization = activeOrg_details;

  const calculateTotalTaxAmount = () => {
    return data?.items?.reduce((total, entry) => {
      return total + (entry?.tax_amount ? parseFloat(entry?.tax_amount) : 0);
    }, 0);
  };

  const totalExpenseCharges = parseJSONofString(data?.charges);
console.log("data", data)

  return (
    <div id="pdf_print_container">
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
      <div className="copy_bottom_footer_98" style={{ marginTop: "50px", marginLeft: "16px" }}>
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
      <h4 style={{ color: "gray", fontSize: "13px" }}>
        Travel, Tours & Safaris
      </h4>
    </div>
  );
};

export default PrintContent2;
