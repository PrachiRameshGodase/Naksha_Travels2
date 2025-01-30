import React, { useState } from "react";
import {
  showAmountWithCurrencySymbol,
  showRateWithPercent,
} from "../../Helper/HelperFunctions";
import ShowMastersValue, { ShowUserMastersValue } from "../../Helper/ShowMastersValue";
import { MdArrowOutward } from "react-icons/md";
import toast from "react-hot-toast";
import {
  formatDate4,
  todayDate,
} from "../../Helper/DateFormat";
import NumericInput from "../../Helper/NumericInput";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { getCurrencySymbol } from "../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const ItemDetailTable = ({ itemsData, showChargesVal, section }) => {
  const [showCharges, setShowCharges] = useState(false);

  const calculateTotalTaxAmount = () => {
    return itemsData?.items?.reduce((total, entry) => {
      return total + (entry?.tax_amount ? parseFloat(entry?.tax_amount) : 0);
    }, 0);
  };

  const totalExpenseCharges = JSON?.parse(itemsData?.charges || "[]");
  // console.log("totalExpenseCharges", totalExpenseCharges);

  return (
    <>
      <table className="itemTable_01" id="modidy_table_form_details">
        <thead className="table_head_item_02">
          <tr className="table_head_item_02_row">
            <th className="table_column_item item_table_width_01" >#</th>
            <th className="table_column_item item_table_width_02">
              Item & Description
            </th>
            <th className="table_column_item">Type</th>
            <th className="table_column_item item_text_end_01">Rate</th>
            <th className="table_column_item">Qty</th>
            <th className="table_column_item">Tax Rate</th>
            <th className="table_column_item item_text_end_01 ">Amount</th>
          </tr>
        </thead>
        <tbody className="table_head_item_02" style={{ background: "white", textTransform: "capitalize" }}>
          {itemsData?.items?.map((val, index) => {
            // Safely parse the parsedServiceData field
            const parsedServiceData = val?.service_data
              ? JSON.parse(val.service_data)
              : {};
            return (
              <tr key={index} className="table_head_item_02_row">
                <td className="table_column_item">{index + 1}</td>
                <td className="table_column_item ">


                  <>
                    {
                      parsedServiceData?.service_name === "Hotels" ? (
                        <>
                          <div>
                            <b>Hotel Name:</b> {parsedServiceData?.hotel_name || "-"}
                          </div>
                          <div>
                            <b>Room:</b> {parsedServiceData?.room_no || "-"}
                          </div>
                          <div>
                            <b>Meal:</b>{" "}
                            <ShowMastersValue
                              type="37"
                              id={parsedServiceData?.meal_id || "-"}
                            />
                          </div>
                        </>
                      ) : parsedServiceData?.service_name === "Assist" ? (
                        <>
                          <div>
                            <b>Airport:</b> {parsedServiceData?.airport_name || "-"}
                          </div>
                          <div>
                            <b>Meeting Type:</b>{" "}
                            {parsedServiceData?.meeting_type || "-"}
                          </div>
                          <div>
                            <b>No Of Persons:</b>{" "}
                            {parsedServiceData?.no_of_persons || "-"}
                          </div>
                        </>
                      ) : parsedServiceData?.service_name === "Flights" ? (
                        <>
                          <div>
                            <b>Airline Name:</b>{" "}
                            {parsedServiceData?.airline_name || "-"}
                          </div>
                          <div>
                            <b>Ticket No:</b> {parsedServiceData?.ticket_no || "-"}
                          </div>
                          <div>
                            <b>PRN No:</b> {parsedServiceData?.prn_no || "-"}
                          </div>
                        </>
                      ) : parsedServiceData?.service_name === "Visa" ? (
                        <>
                          <div>
                            <b>Passport No:</b> {parsedServiceData?.passport_no || "-"}
                          </div>
                          <div>
                            <b>Visa No:</b> {parsedServiceData?.visa_no || "-"}
                          </div>
                          <div>
                            <b>Visa Type:</b>{" "}
                            <ShowUserMastersValue
                              type="40"
                              id={parsedServiceData?.visa_type_id || "-"}
                            />
                          </div>
                        </>
                      ) :
                        parsedServiceData?.service_name === "Car Hire" ? (
                          <>
                            <div>
                              <b>Vehicle Type:</b> <ShowUserMastersValue
                                type="41"
                                id={parsedServiceData?.vehicle_type_id || "-"}
                              />
                            </div>
                            <div>
                              <b>Pickup Location:</b> {parsedServiceData?.pickup_location || "-"}
                            </div>
                            <div>
                              <b>Drop Location:</b>{" "}

                              {parsedServiceData?.drop_location || "-"}

                            </div>
                          </>
                        ) :

                          parsedServiceData?.service_name === "Insurance" ? (
                            <>
                              <div>
                                <b>Company Name:</b>
                                {parsedServiceData?.company_name || "-"}

                              </div>
                              <div>
                                <b>Policy No:</b> {parsedServiceData?.policy_no || "-"}
                              </div>
                              <div>
                                <b>Insurance Plan:</b>{" "}

                                {parsedServiceData?.insurance_plan || "-"}

                              </div>
                            </>
                          ) :

                            parsedServiceData?.service_name === "Others" ? (
                              <>
                                <div>
                                  <b>Service Name:</b> {parsedServiceData?.service_name || "-"}
                                </div>

                                <div>
                                  <b>Item Name:</b>
                                  {parsedServiceData?.item_name || "-"}
                                </div>

                                <div>
                                  <b>Supplier Name:</b>{" "}

                                  {parsedServiceData?.supplier_name || "-"}

                                </div>
                              </>
                            )
                              :
                              <div>
                                {val?.item_name || val?.item?.name}
                              </div>
                    }

                  </>
                </td>
                <td className="table_column_item">{val?.item?.type || val?.type}</td>
                <td className="table_column_item item_text_end_01">
                  {showAmountWithCurrencySymbol(val?.rate)}
                </td>
                <td className="table_column_item">
                  {val?.quantity || ""}
                  {"  "}

                  {(val?.unit_id || val?.unit_id != 0) && (
                    <>
                      (<ShowMastersValue type="2" id={val?.unit_id} />)
                    </>
                  )}
                </td>
                <td className="table_column_item">
                  {showRateWithPercent(val?.tax_rate)}
                </td>
                <td className="table_column_item item_text_end_01">
                  {showAmountWithCurrencySymbol(val?.final_amount)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>


      <div className="finalcalculateiosxl44s">
        <p><p>Subtotal</p> <h5>{showAmountWithCurrencySymbol(itemsData?.subtotal)}</h5></p>
        <p><p>Total Tax</p> <h5>{showAmountWithCurrencySymbol(calculateTotalTaxAmount()?.toFixed(2))}</h5></p>

        {totalExpenseCharges?.[0]?.account_name && totalExpenseCharges?.[0]?.amount && <>
          <p onClick={() => setShowCharges(!showCharges)} style={{ cursor: "pointer", color: "#408dfb" }}><p>Charges{showCharges ? otherIcons?.down_arrow_svg : otherIcons?.up_arrow_svg} </p> </p>
        </>}

        {showCharges && <>
          {totalExpenseCharges?.map((val, index) => (
            <p><p className='' key={index}>{val?.account_name}</p> <h5>{showAmountWithCurrencySymbol(val?.amount)}</h5></p>
          ))}
        </>}

        <p><p className='finalcalcuFs'>Total</p> <h5 className='finalcalcuFs'>{showAmountWithCurrencySymbol((parseFloat(itemsData?.total)))}</h5></p>

        {section === "bill" ?
          <>
            <p><p>Payment Made</p> <h5>{showAmountWithCurrencySymbol(itemsData?.amount_paid)}</h5></p>
            <p><p>Amount In Excess</p> <h5>{showAmountWithCurrencySymbol(itemsData?.amt_excess)}</h5></p>
          </> :
          <>
          </>

        }
      </div >
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

  // console.log("GRNdetail", GRNdetail);

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
                {JSON?.parse(val?.upload_image)?.length > 1 ? (
                  <span
                    onClick={() => showAllImages(JSON?.parse(val?.upload_image))}
                  >
                    {JSON?.parse(val?.upload_image)?.length} Images{" "}
                    <MdArrowOutward />
                  </span>
                ) : (
                  `${JSON?.parse(val?.upload_image)?.length < 1
                    ? "No"
                    : JSON?.parse(val?.upload_image)?.length
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
                {JSON?.parse(val?.upload_image)?.length >= 1 ? (
                  <span
                    onClick={() => showAllImages(JSON?.parse(val?.upload_image))}
                  >
                    {JSON?.parse(val?.upload_image)?.length} Images{" "}
                    <MdArrowOutward />
                  </span>
                ) : (
                  `${JSON?.parse(val?.upload_image)?.length < 1
                    ? "No"
                    : JSON?.parse(val?.upload_image)?.length
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

  const currencySymbol = getCurrencySymbol();
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

            {payment?.entries?.map((val, index) => (

              <tr key={index} className="table_head_item_02_row">
                <td className="table_column_item">{index + 1}</td>
                <td className="table_column_item">{formatDate4(val?.invoice?.transaction_date) || ""}</td>
                <td className="table_column_item">
                  {val?.invoice?.invoice_id || ""}
                </td>
                <td className="table_column_item item_text_end_01">
                  {showAmountWithCurrencySymbol(val?.invoice?.total)}
                </td>
                <td className="table_column_item item_text_end_01">
                  {showAmountWithCurrencySymbol((+val?.invoice?.total) - (+val?.invoice?.amount_paid))}
                </td>
                <td className="table_column_item item_text_end_01">
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

      {/*  */}

      <div className="finalcalculateiosxl44s">
        <p><p>Amount Received: </p> <h5>{showAmountWithCurrencySymbol(payment?.debit)}</h5></p>
        <p><p>Amount In Blance:</p> <h5>
          ({currencySymbol}) {+payment?.amt_excess < 0 ? (
            <span style={{ color: "rgb(255, 46, 18)" }}>
              {+payment?.amt_excess}
            </span>
          ) : (
            +payment?.amt_excess
          )}
        </h5></p>
        <p><p className='finalcalcuFs'>Amount Used For Payment:</p> <h5>{calculateTotalAmount()}</h5></p>
      </div >

      {/*  */}


    </>
  );
};

export const PaymentRecTable = ({ formData, setFormData, paymentDetail }) => {
  const currencySymbol = getCurrencySymbol();
  return (

    <>
      <table className="itemTable_01" id="modidy_table_form_payment_rec_">

        <thead className="table_head_item_02">
          <tr className="table_head_item_02_row">
            <th className="table_column_item item_table_width_01" >#</th>
            <th className="table_column_item item_table_width_02">
              Date
            </th>
            <th className="table_column_item item_table_width_02">Invoice Number</th>
            <th className="table_column_item item_text_end_01 item_table_width_02">({currencySymbol}) Invoice Amount</th>
            <th className="table_column_item item_text_end_01 item_table_width_02">({currencySymbol}) Amount Due</th>
            <th className="table_column_item item_text_end_01">({currencySymbol}) Payment</th>
          </tr>
        </thead>

        {formData?.customer_id ?
          <>
            <tbody className="table_head_item_02" style={{ background: "white", textTransform: "capitalize" }}>
              {formData?.entries?.map((val, index) => (

                <tr key={index} className="table_head_item_02_row itemsectionrows">
                  <td className="table_column_item">{index + 1}</td>

                  <td className="table_column_item">{val?.date}</td>
                  <td className="table_column_item">{val?.invoice_no}</td>
                  <td className="table_column_item item_text_end_01">
                    {(val?.invoice_amount?.toFixed(2))}
                  </td>
                  <td className="table_column_item item_text_end_01">
                    {(val?.balance_amount?.toFixed(2))}
                  </td>
                  <td className="table_column_item item_text_end_01 tablsxs1a2">
                    <input
                      style={{ width: "50%", textAlign: "right" }}
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
                  </td>

                </tr>
              ))}
            </tbody>
          </> :
          <p style={{ textAlign: "center" }}>Please Select Customer</p>}

      </table>
    </>
  );
};


//for manage currency list / and create currencies prices...
export const ManageCurrencyTable = ({ formData, setFormData, section }) => {
  // console.log("formdataaaaaaaaaaaa", formData)

  const currencySymbol = getCurrencySymbol();
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
                  {/* {todayDate(val?.date)} */}
                  {val?.date instanceof Date ? val?.date.toLocaleDateString('en-CA') : val?.date}
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

  const totalExpenseCharges = JSON?.parse(itemsData?.charges);
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
