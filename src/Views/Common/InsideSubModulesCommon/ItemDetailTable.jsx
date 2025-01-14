import React, { useState } from "react";
import {
  currencySymbol,
  parseJSONofString,
  showAmountWithCurrencySymbol,
  showAmountWithCurrencySymbolWithPoints,
  showRateWithPercent,
} from "../../Helper/HelperFunctions";
import ShowMastersValue from "../../Helper/ShowMastersValue";
import { MdArrowOutward } from "react-icons/md";
import toast from "react-hot-toast";
import {
  formatDate,
  formatDate2,
  formatDate3,
  formatDate4,
  todayDate,
} from "../../Helper/DateFormat";
import NumericInput from "../../Helper/NumericInput";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

const ItemDetailTable = ({ itemsData, showChargesVal, section }) => {
  const [showCharges, setShowCharges] = useState(false);
  const calculateTotalTaxAmount = () => {
    return itemsData?.items?.reduce((total, entry) => {
      return total + (entry?.tax_amount ? parseFloat(entry?.tax_amount) : 0);
    }, 0);
  };

  const totalExpenseCharges = parseJSONofString(itemsData?.charges);
  // console.log("totalExpenseCharges", totalExpenseCharges);

  return (
    <>
      <table id="tablex15s56s31s1">
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
          {itemsData?.items?.map((val, index) => (
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
                    (<ShowMastersValue type="2" id={val?.unit_id} />)
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
          <h5>{showAmountWithCurrencySymbol(itemsData?.subtotal)}</h5>
        </span>
        <span>
          <p>Total Tax</p>{" "}
          <h5>{showAmountWithCurrencySymbol(calculateTotalTaxAmount())}</h5>
        </span>
        {/* <span><p>Shipping Charge</p> <h5>{showAmountWithCurrencySymbol(itemsData?.shipping_charge)}</h5></span>
                <span><p>Adjustment Charge</p> <h5>{showAmountWithCurrencySymbol(itemsData?.adjustment_charge)}</h5></span> */}

        {showChargesVal && totalExpenseCharges?.length >= 1 && (
          <>
            <span
              onClick={() => setShowCharges(!showCharges)}
              style={{ cursor: "pointer", color: "#408dfb" }}
            >
              <p>Charges</p>{" "}
            </span>
          </>
        )}

        {showCharges && (
          <>
            {totalExpenseCharges?.map((val) => (
              <span>
                <p>{val?.account_name}</p>{" "}
                <h5>{showAmountWithCurrencySymbol(val?.amount)}</h5>
              </span>
            ))}
          </>
        )}
        {/* <span><p>Total</p> <h5>{showAmountWithCurrencySymbol(((+itemsData?.subtotal) + (+itemsData?.shipping_charge) + (+ itemsData?.adjustment_charge) + calculateTotalTaxAmount()))}</h5></span> */}
        <span>
          <p>Total</p> <h5>{showAmountWithCurrencySymbol(itemsData?.total)}</h5>
        </span>

        {section === "bill" ? (
          <>
            <span>
              <p>Payment Made</p>{" "}
              <h5>{showAmountWithCurrencySymbol(itemsData?.amount_paid)}</h5>
            </span>
            <span>
              <p>Amount In Excess</p>{" "}
              <h5>{showAmountWithCurrencySymbol(itemsData?.amt_excess)}</h5>
            </span>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ItemDetailTable;

export const GrnItemsDetailTable = ({ GRNdetail, showAllImages }) => {
  const [showCharges, setShowCharges] = useState(false);

  const calculateTotalTaxAmount = () => {
    return GRNdetail?.items?.reduce((total, entry) => {
      return total + (entry?.tax_amount ? parseFloat(entry?.tax_amount) : 0);
    }, 0);
  };
  const totalExpenseCharges = GRNdetail?.charges;

  console.log("GRNdetail", GRNdetail);

  return (
    <>
      <table id="tablex15s56s31s1">
        <thead className="thaedaksx433">
          <tr>
            <th className="sfdjklsd1xs2w1">#</th>
            <th className="sfdjklsd1xs2w2" style={{ width: "12%" }}>
              Item & Description
            </th>
            <th className="sfdjklsd1xs2w4 sfdjklsd1xs2wgrate">Rate</th>
            {GRNdetail?.purchase_order && (
              <th className="sfdjklsd1xs2w3">PO QTY</th>
            )}
            <th className="sfdjklsd1xs2w3">GRN Qty</th>
            <th className="sfdjklsd1xs2w3">Unit</th>
            <th
              className="sfdjklsd1xs2w3 sfdjklsd1xs2wgrate"
              style={{ width: "12%" }}
            >
              Charges Weight
            </th>
            <th className="sfdjklsd1xs2w3">Tax Rate</th>
            <th className="sfdjklsd1xs2w3">Custom Duty</th>
            <th className="sfdjklsd1xs2w5 sfdjklsd1xs2wfrate">Final Amount</th>
            <th className="sfdjklsd1xs2w5" style={{ textAlign: "right" }}>
              Attachments
            </th>
          </tr>
        </thead>
        <tbody>
          {GRNdetail?.items?.map((val, index) => (
            <tr className="rowsxs15aksx433" key={index}>
              <td className="sfdjklsd1xs2w1">{index + 1}</td>
              <td className="sfdjklsd1xs2w2" style={{ width: "120px" }}>
                {val?.item?.name || ""}
              </td>
              <td className="sfdjklsd1xs2w4 sfdjklsd1xs2wgrate">
                {showAmountWithCurrencySymbol(val?.rate)}
              </td>
              {GRNdetail?.purchase_order && (
                <td className="sfdjklsd1xs2w3">{val?.po_qty || ""}</td>
              )}
              <td className="sfdjklsd1xs2w3">{val?.gr_qty || ""}</td>
              <td className="sfdjklsd1xs2w3">
                <ShowMastersValue type="2" id={val?.unit_id} />
              </td>
              <td className="sfdjklsd1xs2w3 sfdjklsd1xs2wgrate">
                {showAmountWithCurrencySymbol(val?.charges_weight)}
              </td>
              <td className="sfdjklsd1xs2w3">
                {showRateWithPercent(val?.tax_rate)}
              </td>
              <td className="sfdjklsd1xs2w3">
                {showRateWithPercent(val?.custom_duty)}
              </td>
              <td
                className="sfdjklsd1xs2w5"
                style={{ width: "10%", paddingRight: "2%", textAlign: "right" }}
              >
                {showAmountWithCurrencySymbol(val?.final_amount)}
              </td>

              <td className="sfdjklsd1xs2w4" style={{ textAlign: "right" }}>
                {JSON.parse(val?.upload_image)?.length > 1 ? (
                  <span
                    onClick={() => showAllImages(JSON.parse(val?.upload_image))}
                  >
                    {JSON.parse(val?.upload_image)?.length} Images{" "}
                    <MdArrowOutward />
                  </span>
                ) : (
                  `${JSON.parse(val?.upload_image)?.length < 1
                    ? "No"
                    : JSON.parse(val?.upload_image)?.length
                  } Image`
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <table id="tablex15s56s31s1">
        <thead className="thaedaksx433">
          <tr>
            <th className="sfdjklsd1xs2w1" style={{ padding: "10px 8px" }}>
              #
            </th>
            <th className="sfdjklsd1xs2w2" style={{ width: "22%" }}>
              Account Name
            </th>
            <th className="sfdjklsd1xs2w2" style={{ width: "20%" }}>
              Vendor Name
            </th>
            <th
              className="sfdjklsd1xs2w4"
              style={{ width: "10%", paddingRight: "2%", textAlign: "right" }}
            >
              Amount
            </th>
            <th className="sfdjklsd1xs2w3" style={{ paddingLeft: "145px" }}>
              Remark
            </th>
            <th className="sfdjklsd1xs2w3" style={{ textAlign: "right" }}>
              Attachments
            </th>
          </tr>
        </thead>
        <tbody>
          {GRNdetail?.charges?.map((val, index) => (
            <tr className="rowsxs15aksx433" key={index}>
              <td className="sfdjklsd1xs2w1">{index + 1}</td>
              <td className="sfdjklsd1xs2w2" style={{ width: "22%" }}>
                {val?.account?.account_name || ""}
              </td>
              <td className="sfdjklsd1xs2w2" style={{ width: "20%" }}>
                {val?.vendor?.display_name || ""}
              </td>
              <td
                className="sfdjklsd1xs2w4"
                style={{ width: "10%", paddingRight: "2%", textAlign: "right" }}
              >
                {showAmountWithCurrencySymbol(val?.amount)}
              </td>
              <td className="sfdjklsd1xs2w3" style={{ paddingLeft: "145px" }}>
                {val?.remarks || ""}
              </td>
              <td className="sfdjklsd1xs2w4" style={{ textAlign: "right" }}>
                {JSON.parse(val?.upload_image)?.length >= 1 ? (
                  <span
                    onClick={() => showAllImages(JSON.parse(val?.upload_image))}
                  >
                    {JSON.parse(val?.upload_image)?.length} Images{" "}
                    <MdArrowOutward />
                  </span>
                ) : (
                  `${JSON.parse(val?.upload_image)?.length < 1
                    ? "No"
                    : JSON.parse(val?.upload_image)?.length
                  } Image`
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="finalcalculateiosxl44s">
        <span>
          <p>Subtotal</p>{" "}
          <h5>{showAmountWithCurrencySymbol(GRNdetail?.subtotal)}</h5>
        </span>
        <span
          onClick={() => setShowCharges(!showCharges)}
          style={{ cursor: "pointer", color: "#408dfb" }}
        >
          <p>Charges</p>{" "}
        </span>
        {showCharges && (
          <>
            {totalExpenseCharges?.map((val) => (
              <span>
                <p>{val?.account?.account_name}</p>{" "}
                <h5>{showAmountWithCurrencySymbol(val?.amount)}</h5>
              </span>
            ))}
          </>
        )}
        <span>
          <p>Total Tax</p>{" "}
          <h5>{showAmountWithCurrencySymbol(calculateTotalTaxAmount())}</h5>
        </span>

        <span>
          <p>Total GRN Charge</p>{" "}
          <h5>{showAmountWithCurrencySymbol(GRNdetail?.total_grn_charges)}</h5>
        </span>
        <span>
          <p>Total</p> <h5>{showAmountWithCurrencySymbol(GRNdetail?.total)}</h5>
        </span>
      </div>
    </>
  );
};

export const PaymentMadeDetailTable = ({ payment }) => {
  return (
    <>
      <table id="tablex15s56s31s1">
        <thead className="thaedaksx433">
          <tr>
            <th className="sfdjklsd1xs2w1">#</th>
            <th className="sfdjklsd1xs2w2" style={{ width: "25%" }}>
              Bill Number
            </th>
            <th className="sfdjklsd1xs2w3" style={{ width: "10%" }}>
              Bill Date
            </th>
            <th className="sfdjklsd1xs2w4" style={{ textAlign: "right" }}>
              Amount Paid
            </th>
            <th className="sfdjklsd1xs2w4" style={{ textAlign: "right" }}>
              Bill Amount
            </th>
            {/* <th className='sfdjklsd1xs2w4' style={{ textAlign: "right" }}>Amount Due</th> */}
          </tr>
        </thead>
        <tbody>
          {payment?.entries?.map((val, index) => (
            <tr className="rowsxs15aksx433" key={index}>
              <td className="sfdjklsd1xs2w1">{index + 1}</td>
              <td className="sfdjklsd1xs2w2">{val?.bill?.bill_no || ""}</td>
              <td className="sfdjklsd1xs2w3">
                {formatDate4(val?.bill?.transaction_date)}
              </td>
              <td className="sfdjklsd1xs2w4" style={{ textAlign: "right" }}>
                {showAmountWithCurrencySymbol(val?.bill?.amount_paid)}
              </td>
              <td className="sfdjklsd1xs2w4" style={{ textAlign: "right" }}>
                {showAmountWithCurrencySymbol(val?.bill?.total) || ""}
              </td>
              {/* <td className='sfdjklsd1xs2w4' style={{ textAlign: "right" }}>{showAmountWithCurrencySymbol(((+val?.bill?.total) - (+val?.bill?.amount_paid))?.toFixed(2))}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="finalcalculateiosxl44s">
        <span>
          <p>Amount In Balance</p>{" "}
          <h5>{showAmountWithCurrencySymbol(payment?.amt_excess)}</h5>
        </span>
        <span>
          <p>Amount to be Paid</p>{" "}
          <h5>{showAmountWithCurrencySymbol(payment?.credit)}</h5>
        </span>
      </div>
    </>
  );
};

export const Payment_Receive_DetailTable = ({ payment }) => {
  const calculateTotalAmount = () => {
    const total = payment?.entries?.reduce((total, entry) => {
      return +total + (entry.amount ? parseFloat(entry.amount) : 0.0);
    }, 0.0);

    // Return "0.00" as a string if the total is 0, otherwise return the total formatted to 2 decimal places
    return +total == 0 ? "0.00" : (+total).toFixed(2);
  };
  return (
    <>
      {payment?.entries?.length >= 1 ? (
        <table id="tablex15s56s31s1">
          <thead className="thaedaksx433">
            <tr>
              <th className="sfdjklsd1xs2w1" style={{ width: "7%" }}>
                #
              </th>
              <th className="sfdjklsd1xs2w2" style={{ width: "15%" }}>
                Date
              </th>
              <th className="sfdjklsd1xs2w3" style={{ width: "22%" }}>
                Invoice Number
              </th>
              <th className="sfdjklsd1xs2w4"> Invoice Amount</th>
              <th className="sfdjklsd1xs2w4">Amount Due</th>
              <th
                className="sfdjklsd1xs2w4"
                style={{ textAlign: "right", paddingRight: "16px" }}
              >
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {payment?.entries?.map((val, index) => (
              <tr className="rowsxs15aksx433" key={index}>
                <td className="sfdjklsd1xs2w1">{index + 1}</td>
                <td className="sfdjklsd1xs2w2">
                  {formatDate4(val?.invoice?.transaction_date) || ""}
                </td>
                <td className="sfdjklsd1xs2w3">
                  {val?.invoice?.invoice_id || ""}
                </td>
                <td
                  className="sfdjklsd1xs2w4 sfdjklsd1xs2wrate"
                  style={{ width: "250px" }}
                >
                  {showAmountWithCurrencySymbol(val?.invoice?.total)}
                </td>
                <td className="sfdjklsd1xs2w4">
                  <p style={{ width: "41%", textAlign: "right" }}>
                    {showAmountWithCurrencySymbol(
                      +val?.invoice?.total - +val?.invoice?.amount_paid
                    )}
                  </p>
                </td>
                <td
                  className="sfdjklsd1xs2w4 sfdjklsd1xs2wamount sfdjklsd1xs2wrate"
                  style={{ width: "11%" }}
                >
                  {showAmountWithCurrencySymbol(val?.amount)}
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

      <div className="finalcalculateiosxl44s">
        <span>
          <p>Amount Received: ({currencySymbol})</p> <h5>{payment?.debit}</h5>
        </span>
        <span>
          <p>Amount In Blance: ({currencySymbol})</p>
          <h5>
            {+payment?.amt_excess < 0 ? (
              <span style={{ color: "rgb(255, 46, 18)" }}>
                {+payment?.amt_excess}
              </span>
            ) : (
              +payment?.amt_excess
            )}
          </h5>
        </span>
        <span>
          <p>Amount Used For Payment: ({currencySymbol})</p>{" "}
          <h5>{calculateTotalAmount()}</h5>
        </span>
      </div>
    </>
  );
};

export const PaymentRecTable = ({ formData, setFormData, paymentDetail }) => {
  return (
    <>
      <table id="tablex15s56s31s1">
        <thead className="thaedaksx433">
          <tr>
            <div style={{ marginLeft: "10px" }}>
              {" "}
              <th className="sfdjklsd1xs2w1" style={{ width: "9%" }}>
                #
              </th>
            </div>
            <th
              className="sfdjklsd1xs2w4"
              style={{ width: "16%", paddingLeft: "40px" }}
            >
              Date
            </th>
            <div style={{ marginLeft: "80px", width: "100%" }}>
              <th className="sfdjklsd1xs2w4" style={{ width: "100%" }}>
                Invoice Number
              </th>{" "}
            </div>
            <th
              className="sfdjklsd1xs2w4"
              style={{ width: "20%", textAlign: "right", paddingLeft: "100px" }}
            >
              Invoice Amount
            </th>
            <div style={{ marginLeft: "150px", width: "50%" }}>
              {" "}
              <th
                className="sfdjklsd1xs2w4 "
                style={{ width: "100%", textAlign: "right" }}
              >
                Amount Due
              </th>
            </div>
            <th
              className="sfdjklsd1xs2w4"
              style={{ textAlign: "right", padding: "15px 40px" }}
            >
              Payment
            </th>
          </tr>
        </thead>
        {formData?.customer_id ? (
          <>
            <tbody>
              {formData?.entries?.map((val, index) => (
                <tr key={index} className="rowsxs15aksx433">
                  <div style={{ marginLeft: "10px" }}>
                    <td className="sfdjklsd1xs2w1">{index + 1}</td>
                  </div>
                  <td
                    className="sfdjklsd1xs2w2"
                    style={{ paddingLeft: "40px" }}
                  >
                    {val?.date}
                  </td>
                  <div style={{ marginLeft: "80px" }}>
                    <td className="sfdjklsd1xs2w2">{val?.invoice_no}</td>
                  </div>
                  <td className="sfdjklsd1xs2w4" style={{ textAlign: "right" }}>
                    {showAmountWithCurrencySymbol(
                      val?.invoice_amount?.toFixed(2)
                    )}
                  </td>
                  <td className="sfdjklsd1xs2w3" style={{ textAlign: "right" }}>
                    {showAmountWithCurrencySymbol(
                      val?.balance_amount?.toFixed(2)
                    )}
                  </td>
                  <td className="sfdjklsd1xs2w3">
                    <div
                      className="tablsxs1a4"
                      style={{ textAlign: "right", marginRight: "0px" }}
                    >
                      <div className="tablsxs1a2">
                        <input
                          style={{ width: "40%", textAlign: "center" }}
                          type="number"
                          value={val.amount !== null ? val.amount : ""}
                          placeholder="0.00"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const newValue =
                              inputValue === "" ? null : parseFloat(inputValue);

                            // Convert debit and balance_amount to numbers for comparison
                            const formDebit = Number(formData?.debit) || 0;
                            const balanceAmount =
                              Number(val?.balance_amount) || 0;

                            // Condition 1: formData.debit is empty
                            if (formData?.debit === "") {
                              toast("Please set the amount", {
                                icon: "👏",
                                style: {
                                  borderRadius: "10px",
                                  background: "#333",
                                  color: "#fff",
                                  fontSize: "14px",
                                },
                              });
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                entries: prevFormData?.entries?.map(
                                  (entry, i) =>
                                    i === index
                                      ? { ...entry, amount: 0 }
                                      : entry
                                ),
                              }));
                            }
                            // Condition 2: inputValue exceeds balance amount
                            else if (newValue > balanceAmount) {
                              toast(
                                "The amount entered here is more than the amount due",
                                {
                                  icon: "👏",
                                  style: {
                                    borderRadius: "10px",
                                    background: "#333",
                                    color: "#fff",
                                    fontSize: "14px",
                                  },
                                }
                              );
                            }
                            // Condition 3: inputValue exceeds formData.debit
                            else if (newValue > formDebit) {
                              toast(
                                "The amount entered here is more than the amount paid by the customer",
                                {
                                  icon: "👏",
                                  style: {
                                    borderRadius: "10px",
                                    background: "#333",
                                    color: "#fff",
                                    fontSize: "14px",
                                  },
                                }
                              );
                            }

                            // Condition 4: inputValue is valid
                            else {
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                entries: prevFormData?.entries?.map(
                                  (entry, i) =>
                                    i === index
                                      ? { ...entry, amount: newValue }
                                      : entry
                                ),
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <p style={{ textAlign: "center" }}>Please Select Vendor</p>
        )}
      </table>
    </>
  );
};


//for manage currency list / and create currencies prices...
export const ManageCurrencyTable = ({ formData, setFormData, section }) => {
  // console.log("formdataaaaaaaaaaaa", formData)
  return (
    <>
      {formData?.length >= 1 ? <>

        <table id="tablex15s56s31s1_currency">
          <thead className="thaedaksx433">
            <tr>
              <div className="table-margin-left">
                <th className='sfdjklsd1xs2w1 column-width-9'></th>
              </div>
              <th className='sfdjklsd1xs2w4 column-width-16 padding-left-40'>Date</th>
              <div className="table-margin-left-80">
                <th className='sfdjklsd1xs2w4 full-width'>Currency Name</th>
              </div>
              <th className='sfdjklsd1xs2w4 column-width-20 text-right padding-left-100'>Currency Code</th>
              <div className="table-margin-left-150">
                <th className='sfdjklsd1xs2w4 full-width text-right'>Countries</th>
              </div>
              <th className='sfdjklsd1xs2w4 text-right padding-15-40'>Currency Symbol</th>

              <th className='sfdjklsd1xs2w4 text-right padding-15-40'>Current Rate {currencySymbol}</th>
              <th className='sfdjklsd1xs2w4 text-right padding-15-40'>Exchange Rate {currencySymbol}</th>
            </tr>
          </thead>
          <tbody>
            {formData?.map((val, index) => (
              <tr key={index} className="rowsxs15aksx433">
                <td className="sfdjklsd1xs2w4 text-right"></td>
                <td className="sfdjklsd1xs2w4 text-right">
                  {todayDate(val?.date)}
                </td>

                <td className="sfdjklsd1xs2w4 text-right">{val?.currency_name}</td>
                <td className="sfdjklsd1xs2w4 text-right">
                  {(val?.code)}
                </td>
                <td className="sfdjklsd1xs2w3 text-right">
                  {(val?.country)}
                </td>
                <td className="sfdjklsd1xs2w3 text-right">
                  {(val?.symbol)}
                </td>
                {/* {section === "create" && <> */}
                <td className="sfdjklsd1xs2w3">
                  <div className="tablsxs1a4 text-right">
                    <div className="tablsxs1a2" style={{ width: "78%" }}>
                      <NumericInput
                        style={{ textAlign: "right" }}
                        value={val.current_rate || ''}
                        placeholder="0.00"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          setFormData((prevFormData) => {
                            const updatedFormData = [...prevFormData];
                            updatedFormData[index] = {
                              ...updatedFormData[index],
                              current_rate: inputValue,
                            };
                            return updatedFormData;
                          });
                        }}
                        disabled={section === "list" ? true : false}
                      />
                    </div>
                  </div>
                </td>
                <td className="sfdjklsd1xs2w3">
                  <div className="tablsxs1a4 text-right">
                    <div className="tablsxs1a2" style={{ width: "87%" }}>
                      <NumericInput
                        style={{ textAlign: "right" }}
                        className="input-width-40 text-center"
                        value={val.exchange_rate || ''}
                        placeholder="0.00"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          setFormData((prevFormData) => {
                            const updatedFormData = [...prevFormData];
                            updatedFormData[index] = {
                              ...updatedFormData[index],
                              exchange_rate: inputValue,
                            };
                            return updatedFormData;
                          });
                        }}
                        disabled={section === "list" ? true : false}

                      />
                    </div>
                  </div>
                </td>
                {/* </>} */}
              </tr>
            ))}
          </tbody>

        </table>
      </> : <p style={{ textAlign: "center" }}>Currencies are not found</p>}
    </>
  );
};

export const DSRDetailTable = ({ itemsData, showChargesVal, section }) => {
  const [showCharges, setShowCharges] = useState(false);
  const calculateTotalTaxAmount = () => {
    return itemsData?.items?.reduce((total, entry) => {
      return total + (entry?.tax_amount ? parseFloat(entry?.tax_amount) : 0);
    }, 0);
  };

  const totalExpenseCharges = parseJSONofString(itemsData?.charges);
  // console.log("totalExpenseCharges", totalExpenseCharges);

  return (
    <>
      <table id="tablex15s56s31s1">
        <thead className="thaedaksx433">
          <tr>
            <th className="sfdjklsd1xs2w1">No</th>
            <th className="sfdjklsd1xs2w2" style={{ width: "12%" }}>
              User ID
            </th>
            <th className="sfdjklsd1xs2w4 sfdjklsd1xs2wrate">Passenger Name</th>
            <th className="sfdjklsd1xs2w3 sfdjklsd1xs2w3qty">Email</th>
            <th className="sfdjklsd1xs2w3 sfdjklsd1xs2w3Width">Mobile No</th>
            <th className="sfdjklsd1xs2w5 sfdjklsd1xs2wamount ">
              {" "}
              Services
            </th>
            <th className="sfdjklsd1xs2w5 sfdjklsd1xs2wamount ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {itemsData?.items?.map((val, index) => ( */}
          <tr className="rowsxs15aksx433">
            {/* <td className="sfdjklsd1xs2w1">{index + 1}</td>
              <td className="sfdjklsd1xs2w2">{val?.item?.name || ""}</td>
              <td className="sfdjklsd1xs2w4 sfdjklsd1xs2wrate">
                {showAmountWithCurrencySymbol(val?.rate)}
              </td>
              <td className="sfdjklsd1xs2w3 sfdjklsd1xs2w3qty">
                {val?.quantity || ""}
                {"  "}
                {val?.unit_id && (
                  <>
                    (<ShowMastersValue type="2" id={val?.unit_id} />)
                  </>
                )}
              </td>
              <td className="sfdjklsd1xs2w3">
                <ShowMastersValue type="2" id={val?.unit_id} />
              </td> */}
            <td className="sfdjklsd1xs2w3" id="buttonsdata">
              <Link className="linkx1" to={"/dashboard/serviceslist"}>
                Services <GoPlus />
              </Link>
            </td>
            {/* <td className="sfdjklsd1xs2w5 sfdjklsd1xs2wamount">
                {showAmountWithCurrencySymbol(val?.final_amount)}
              </td> */}
          </tr>
          {/* ))} */}
        </tbody>
      </table>
    </>
  );
};
