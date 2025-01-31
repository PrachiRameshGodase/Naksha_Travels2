// PdfTemplate.js
import React, { useState } from "react";
import "./PdfTemplate.scss";
import {
  activeOrg_details,
} from "../../HelperFunctions";
import { PdfShowMastersValue } from "../../ShowMastersValue";
import { formatDate3, formatDate4 } from "../../DateFormat";
import nakshalogo from "../../../../assets/Naksha.png";
import { convertCurrencyWithPercent, convertCurrencyWithSymbol } from "../../CurrencyHelper/convertKESToUSD";
// import { useSelector } from "react-redux";

const PrintContent = ({ data, masterData, moduleId, section, fetchCurrencyData, currencyList }) => {

  const [showCharges, setShowCharges] = useState(false);

  const active_orgnization = activeOrg_details;

  const calculateTotalTaxAmount = () => {
    return data?.items?.reduce((total, entry) => {
      return total + (entry?.tax_amount ? parseFloat(entry?.tax_amount) : 0);
    }, 0);
  };

  // const render_table = section === "Payment Receive" ? data?.entries : data?.items

  // console.log("moduleId, section", moduleId, section)
  console.log("data?.entries", data?.entries)

  const totalExpenseCharges = section === "Payment Receive" ? [] : data?.charges ? JSON?.parse(data?.charges) : "";

  const calculateTotalAmount = () => {
    const total = data?.entries?.reduce((total, entry) => {
      return +total + (entry.amount ? parseFloat(entry.amount) : 0.0);
    }, 0.0);

    // Return "0.00" as a string if the total is 0, otherwise return the total formatted to 2 decimal places
    return +total == 0 ? "0.00" : (+total).toFixed(2);
  };

  return (
    <div id="pdf_print_container">
      <div
        className="top_section"
        style={{ marginLeft: "5px", justifyContent: "space-between" }}
      >
        <div className="contacts_321">
          <h1>{section}</h1>
          <p style={{ color: "gray" }}>PIN: P051850633C</p>
          <p>Naksha Travels Limited</p>

          <p>#3G-02, Maruti Heights</p>
          <p>Nairobi, Kenya</p>
          <p>Phone: +254700124369</p>

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

          {section !== "Payment Receive" &&

            <thead className="table_head_item_02">
              <tr className="table_head_item_02_row">
                <th className="table_column_item item_table_width_01" style={{ width: "30px", }}>#</th>
                <th className="table_column_item item_table_width_02" style={{ width: "150px", }}>Date</th>
                <th className="table_column_item">Type</th>
                <th className="table_column_item item_text_end_01">Rate</th>
                <th className="table_column_item">Qty</th>
                <th className="table_column_item">Tax Rate</th>
                <th className="table_column_item item_text_end_01">Amount</th>
              </tr>
            </thead>
          }
          <tbody className="table_head_item_02" style={{ background: "white", textTransform: "capitalize", }}>

            {section === "Payment Receive" ?
              <>

                <>
                  {data?.entries?.length >= 1 ? (
                    <table className="itemTable_01" id="modidy_table_form_details">
                      <thead className="table_head_item_02">
                        <tr className="table_head_item_02_row">
                          <th className="table_column_item item_table_width_01" >#</th>
                          <th className="table_column_item item_table_width_02">
                            Date
                          </th>
                          <th className="table_column_item">Invoice Number</th>
                          <th className="table_column_item item_text_end_01">Invoice Amount</th>
                          <th className="table_column_item item_text_end_01">Amount Due</th>
                          <th className="table_column_item item_text_end_01">Payment</th>
                        </tr>
                      </thead>
                      <tbody className="table_head_item_02" style={{ background: "white", textTransform: "capitalize" }}>

                        {data?.entries?.map((val, index) => (

                          <tr key={index} className="table_head_item_02_row">
                            <td className="table_column_item">{index + 1}</td>
                            <td className="table_column_item">{formatDate4(val?.invoice?.transaction_date) || ""}</td>
                            <td className="table_column_item">
                              {val?.invoice?.invoice_id || ""}
                            </td>

                            <td className="table_column_item item_text_end_01">
                              {convertCurrencyWithSymbol(val?.invoice?.total, fetchCurrencyData, data?.currency, currencyList)}
                            </td>

                            <td className="table_column_item item_text_end_01">
                              {convertCurrencyWithSymbol(((+val?.invoice?.total) - (+val?.invoice?.amount_paid)), fetchCurrencyData, data?.currency, currencyList)}
                            </td>
                            <td className="table_column_item item_text_end_01">
                              {convertCurrencyWithSymbol(val?.amount, fetchCurrencyData, data?.currency, currencyList)}
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  ) : (
                    <p style={{ textAlign: "center", padding: "20px 0" }}>
                      There are no unpaid invoices associated with this customer.
                    </p>
                  )}
                </>

              </> : <>
                <>
                  {data?.items?.map((val, index) => (<tr key={index} className="table_head_item_02_row">
                    <td className="table_column_item" style={{ width: "30px" }}>{index + 1}</td>
                    <td className="table_column_item" style={{ width: "150px", }}>{val?.item?.name || val?.item_name}</td>
                    <td className="table_column_item">
                      {val?.item?.type || val?.type}
                    </td>

                    <td
                      className="table_column_item item_text_end_01"
                    >
                      {/* {showAmountWithCurrencySymbol(val?.rate)} */}
                      {convertCurrencyWithSymbol(val?.rate, fetchCurrencyData, data?.currency, currencyList)}

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
                      {convertCurrencyWithPercent(val?.tax_rate, fetchCurrencyData, data?.currency, currencyList)}
                    </td>
                    <td
                      className="table_column_item item_text_end_01"

                    >
                      {convertCurrencyWithSymbol(val?.final_amount, fetchCurrencyData, data?.currency, currencyList)}
                    </td>
                  </tr>
                  ))}
                </>
              </>}

          </tbody>
        </table>

        {section === "Payment Receive" ?
          <>
            <div className="finalcalculateiosxl44s">
              <p><p>Amount Received: </p> <h5>{convertCurrencyWithSymbol(data?.debit, fetchCurrencyData, data?.currency, currencyList)}</h5></p>
              <p><p>Amount In Blance:</p> <h5>
                ({fetchCurrencyData}) {+data?.amt_excess < 0 ? (
                  <span style={{ color: "rgb(255, 46, 18)" }}>
                    {+data?.amt_excess}
                  </span>
                ) : (
                  +data?.amt_excess
                )}
              </h5></p>
              <p><p className='finalcalcuFs'>Amount Used For Payment:</p> <h5>{calculateTotalAmount()}</h5></p>
            </div >
          </>
          :
          <>
            <div className="finalcalculateiosxl44s" style={{ borderTop: "none" }}>
              <p>
                <p>Subtotal</p>{" "}
                <h5>{convertCurrencyWithSymbol(data?.subtotal, fetchCurrencyData, data?.currency, currencyList)}</h5>
              </p>
              <p>

                <p>Total Tax</p>{" "}

                <h5>

                  {convertCurrencyWithSymbol(
                    calculateTotalTaxAmount()?.toFixed(2), fetchCurrencyData, data?.currency, currencyList
                  )}

                  {/* {showAmountWithCurrencySymbol(data?.total_tax)} */}

                </h5>
              </p>

              <>
                {totalExpenseCharges?.map((val, index) => (
                  <p>
                    <p className="" key={index}>
                      {val?.account_name}
                    </p>{" "}
                    <h5>{convertCurrencyWithSymbol(val?.amount.toFixed(2), fetchCurrencyData, data?.currency, currencyList)}</h5>
                  </p>
                ))}
              </>
              <p>
                <p className="finalcalcuFs">Total</p>{" "}
                <h5 className="finalcalcuFs">
                  {convertCurrencyWithSymbol(parseFloat(data?.total).toFixed(2), fetchCurrencyData, data?.currency, currencyList)}
                </h5>
              </p>
            </div>
          </>}


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
