// PdfTemplate.js
import React, { useState } from "react";
import "./PdfTemplate.scss";
import {
  activeOrg_details,
  showAmountWithCurrencySymbol,
  showRateWithPercent,
} from "../../HelperFunctions";
import ShowMastersValue, { PdfShowMastersValue } from "../../ShowMastersValue";
import { formatDate3 } from "../../DateFormat";
import nakshalogo from "../../../../assets/Naksha.png";
import { otherIcons } from "../../SVGIcons/ItemsIcons/Icons";

const PrintContent = ({ data, cusVenData, masterData, moduleId, section }) => {
  // console.log("masterData", masterData)
  const [showCharges, setShowCharges] = useState(false);
  const active_orgnization = activeOrg_details;
  const calculateTotalTaxAmount = () => {
    return data?.items?.reduce((total, entry) => {
      return total + (entry?.tax_amount ? parseFloat(entry?.tax_amount) : 0);
    }, 0);
  };

  const totalExpenseCharges = data?.charges ? JSON?.parse(data?.charges) : "";
  // const showModuleText = section==="Quotation"?
  console.log("active_orgnization", active_orgnization);
  return (
    <div id="pdf_print_container">
      <div
        className="top_section"
        style={{ marginLeft: "5px", justifyContent: "space-between" }}
      >
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
                  {/* <p>Payment Due: October 04, 2024</p>
                  <p>Amount Due (USD): $704.30</p> */}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        <table
          className="itemTable_01"
          id="modidy_table_form_details"
         
        >
          <thead className="table_head_item_02">
            <tr className="table_head_item_02_row">
              <th className="table_column_item item_table_width_01"style={{width: "30px",}}>#</th>
              <th className="table_column_item item_table_width_02"style={{width: "150px",}}>Item & Description</th>
              <th className="table_column_item">Type</th>
              <th className="table_column_item item_text_end_01">Rate</th>
              <th className="table_column_item">Qty</th>
              <th className="table_column_item">Tax Rate</th>
              <th className="table_column_item item_text_end_01">Amount</th>
            </tr>
          </thead>
          <tbody className="table_head_item_02" style={{background: "white", textTransform: "capitalize",}}>
            {data?.items?.map((val, index) => ( <tr key={index} className="table_head_item_02_row">
                <td className="table_column_item" style={{width: "30px"}}>{index + 1}</td>
                <td className="table_column_item" style={{width: "150px",}}>{val?.item?.name || val?.item_name}</td>
                <td className="table_column_item">
                  {val?.item?.type || val?.type}
                </td>
                <td
                  className="table_column_item item_text_end_01"
                 
                >
                  {showAmountWithCurrencySymbol(val?.rate)}
                </td>
                <td
                  className="table_column_item"
                 
                >
                  {val?.quantity || ""} {(val?.unit_id || val?.unit_id != 0) && (
                    <>
                      (<PdfShowMastersValue type="2" id={val?.unit_id}
                            masterData={masterData} />)
                    </>
                  )}
                </td>
                <td
                  className="table_column_item"
                 
                >
                  {showRateWithPercent(val?.tax_rate)}
                </td>
                <td
                  className="table_column_item item_text_end_01"
                  
                >
                  {showAmountWithCurrencySymbol(val?.final_amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="finalcalculateiosxl44s" style={{borderTop:"none"}}>
          <p>
            <p>Subtotal</p>{" "}
            <h5>{showAmountWithCurrencySymbol(data?.subtotal)}</h5>
          </p>
          <p>
            <p>Total Tax</p>{" "}
            <h5>
              {showAmountWithCurrencySymbol(
                calculateTotalTaxAmount()?.toFixed(2)
              )}
            </h5>
          </p>

         

            <>
              {totalExpenseCharges?.map((val, index) => (
                <p>
                  <p className="" key={index}>
                    {val?.account_name}
                  </p>{" "}
                  <h5>{showAmountWithCurrencySymbol(val?.amount.toFixed(2))}</h5>
                </p>
              ))}
            </>
          {/* <p><p className='finalcalcuFs'>Total</p> <h5 className='finalcalcuFs'>{showAmountWithCurrencySymbol(((parseFloat(itemsData?.total)) + (parseFloat(calculateTotalTaxAmount() || 0)) + (parseFloat(calculateTotalCharges() || 0))))}</h5></p> */}
          <p>
            <p className="finalcalcuFs">Total</p>{" "}
            <h5 className="finalcalcuFs">
              {showAmountWithCurrencySymbol(parseFloat(data?.total))}
            </h5>
          </p>

          {/* {section === "bill" ?
               <>
                 <p><p>Payment Made</p> <h5>{showAmountWithCurrencySymbol(itemsData?.amount_paid)}</h5></p>
                 <p><p>Amount In Excess</p> <h5>{showAmountWithCurrencySymbol(itemsData?.amt_excess)}</h5></p>
               </> :
               <>
               </>
     
             } */}
        </div>
      </>

      <div
        className="copy_bottom_footer_98"
        style={{ marginTop: "50px", marginLeft: "16px" }}
      >
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

      <h4 style={{ color: "gray", fontSize: "13px" }}>
        Travel, Tours & Safaris
      </h4>
    </div>
  );
};

export default PrintContent;
