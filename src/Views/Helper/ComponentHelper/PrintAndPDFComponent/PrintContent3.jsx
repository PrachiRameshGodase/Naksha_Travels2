// PdfTemplate.js
import React from "react";
import "./PdfTemplate.scss";
import { formatDate3, formatDate4 } from "../../DateFormat";
import nakshalogo from "../../../../assets/Naksha.png";
import { activeOrg, getCurrencySymbol } from "../ManageStorage/localStorageUtils";
import { convertCurrencyWithSymbol } from "../../CurrencyHelper/convertKESToUSD";
// import { useSelector } from "react-redux";

const PrintContent3 = ({ data, masterData, moduleId, fetchCurrencyData, sectionName, section }) => {
  console.log("section", section)
  const active_orgnization = activeOrg();

  const currencySymbol = getCurrencySymbol();

  const calculateTotalAmount = () => {
    const total = data?.entries?.reduce((total, entry) => {
      return parseFloat(total) + (parseFloat(entry?.amount) ? parseFloat(entry?.amount) : 0.0);
    }, 0.0);

    // Ensure it returns a number, not a string
    return total === 0 ? 0.0 : parseFloat(total?.toFixed(2));
  };

  return (
    <div id="pdf_print_container">
      <div
        className="top_section"
        style={{ marginLeft: "5px", justifyContent: "space-between" }}
      >
        <div className="contacts_321">
          <h1>{sectionName}</h1>
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
                </>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table started */}
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
                  <th className="table_column_item">{section ? "Invoice" : "Bill"} Number</th>
                  <th className="table_column_item item_text_end_01">{section ? "Invoice" : "Bill"} Amount</th>
                  <th className="table_column_item item_text_end_01">Amount Due</th>
                  <th className="table_column_item item_text_end_01">Payment</th>
                </tr>
              </thead>
              <tbody className="table_head_item_02" style={{ background: "white", textTransform: "capitalize" }}>

                {
                  data?.entries?.map((val, index) => (
                    <tr key={index} className="table_head_item_02_row">
                      <td className="table_column_item">{index + 1}</td>
                      <td className="table_column_item"> {section ? formatDate4(val?.invoice?.transaction_date) : formatDate4(val?.bill?.transaction_date) || ""} </td>
                      <td className="table_column_item">
                        {section ? val?.invoice_no : val?.bill_no}
                      </td>
                      <td className="table_column_item item_text_end_01">
                        {convertCurrencyWithSymbol((section ? val?.invoice?.total : val?.bill?.total), fetchCurrencyData)}
                      </td>
                      <td className="table_column_item item_text_end_01">
                        {convertCurrencyWithSymbol(val?.balance_amount, fetchCurrencyData)}
                      </td>
                      <td className="table_column_item item_text_end_01">
                        {convertCurrencyWithSymbol(val?.amount, fetchCurrencyData)}
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", padding: "20px 0" }}>
              There are no unpaid invoices associated with this customer.
            </p>
          )}

          <div className="finalcalculateiosxl44s">

            <p><p className="finalcalcuFs">Amount Paid: </p> <h5 className="finalcalcuFs">{convertCurrencyWithSymbol((section ? data?.debit : data?.credit), fetchCurrencyData)}</h5></p>

            <p><p className=''>Amount Used For Payment:</p> <h5> {convertCurrencyWithSymbol(calculateTotalAmount(), fetchCurrencyData)} </h5></p>

            <p><p>Amount In Execss:</p><h5>

              {+data?.amt_excess < 0 ? (
                <span style={{ color: "rgb(20, 17, 17)" }}>
                  {convertCurrencyWithSymbol(data?.amt_excess, fetchCurrencyData)}
                </span>
              ) : (
                convertCurrencyWithSymbol(data?.amt_excess, fetchCurrencyData)
              )}

            </h5></p>

          </div >

        </>
      </>
      {/* table end */}

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

export default PrintContent3;
