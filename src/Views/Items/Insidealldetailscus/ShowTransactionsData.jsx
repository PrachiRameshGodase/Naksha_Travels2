import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import {
  creditNoteLists,
  invoiceLists,
  quotationLists,
  saleOrderLists,
  purchseOrdersLists,
  debitNoteLists,
} from "../../../Redux/Actions/listApisActions";
import {
  GRNlistActions,
  GRNreceiptListActions,
} from "../../../Redux/Actions/grnActions";
import { paymentRecList } from "../../../Redux/Actions/PaymentRecAction";
import { expenseLists } from "../../../Redux/Actions/expenseActions";
import { billLists } from "../../../Redux/Actions/billActions";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import { formatDate4, formatDate3 } from "../../Helper/DateFormat";
import { showAmountWithCurrencySymbol } from "../../Helper/HelperFunctions";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import {
  ShowStatusInList1,
  ShowStatusInList,
} from "../../Helper/ComponentHelper/ShowStatus";
import ShowMastersValue from "../../Helper/ShowMastersValue";
const ShowTransactionsData = ({ activeSection, type }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanging, setDataChanging] = useState(false);
  const [allListValue, setAllListValue] = useState([]);

  const quoteList = useSelector((state) => state?.quoteList);
  const saleList = useSelector((state) => state?.saleList);
  const paymentRec = useSelector((state) => state?.paymentRecList);
  const invoiceList = useSelector((state) => state?.invoiceList);
  const creditNoteList = useSelector((state) => state?.creditNoteList);

  const purchseList = useSelector((state) => state.purchseList);
  const GRNlist = useSelector((state) => state.GRNlist);
  const GRNreceptList = useSelector((state) => state.GRNreceptList);
  const billList = useSelector((state) => state.billList);
  const expenseList = useSelector((state) => state.expenseList);
  const debitNoteList = useSelector((state) => state.debitNoteList);
  const params = new URLSearchParams(location.search);
  const { id: itemId } = Object.fromEntries(params.entries());

  const handleDataChange = (newValue) => {
    setDataChanging(newValue);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection]);

  useEffect(() => {
    const sendData = {
      id: itemId,
      fy: localStorage.getItem("FinancialYear"),
      warehouse_id: localStorage.getItem("selectedWarehouseId"),
      currentpage: currentPage,
      noofrec: itemsPerPage,
    };

    if (itemId && activeSection) {
      if (type === "customer") {
        switch (activeSection) {
          case "q":
            dispatch(
              quotationLists(
                { ...sendData, customer_id: itemId },
                setAllListValue
              )
            );
            break;
          case "i":
            dispatch(
              invoiceLists(
                { ...sendData, customer_id: itemId },
                setAllListValue
              )
            );
            break;
          case "p":
            dispatch(
              paymentRecList(
                { ...sendData, customer_id: itemId, inout: 1 },
                setAllListValue
              )
            );
            break;
          case "s":
            dispatch(
              saleOrderLists(
                { ...sendData, customer_id: itemId },
                setAllListValue
              )
            );
            break;
          case "c":
            dispatch(
              creditNoteLists(
                { ...sendData, customer_id: itemId },
                setAllListValue
              )
            );
            break;
          default:
            break;
        }
      } else if (type === "vendor") {
        switch (activeSection) {
          case "po":
            dispatch(
              purchseOrdersLists(
                { ...sendData, vendor_id: itemId },
                setAllListValue
              )
            );
            break;
          case "grn":
            dispatch(
              GRNlistActions(
                { ...sendData, vendor_id: itemId },
                setAllListValue
              )
            );
            break;
          // case "grna":
          //   dispatch(
          //     GRNlistActions(
          //       { ...sendData, vendor_id: itemId },
          //       setAllListValue
          //     )
          //   );
          //   break;
          // case "grr":
          //   dispatch(
          //     GRNreceiptListActions(
          //       { ...sendData, vendor_id: itemId },
          //       setAllListValue
          //     )
          //   );
          //   break;
          case "bills":
            dispatch(
              billLists({ ...sendData, vendor_id: itemId }, setAllListValue)
            );
            break;
          case "pm":
            dispatch(
              paymentRecList(
                { ...sendData, vendor_id: itemId, inout: 1 },
                setAllListValue
              )
            );
            break;
          case "exp":
            dispatch(
              expenseLists({ ...sendData, vendor_id: itemId }, setAllListValue)
            );
            break;
          case "dn":
            dispatch(
              debitNoteLists(
                { ...sendData, vendor_id: itemId },
                setAllListValue
              )
            );
            break;
          default:
            dispatch(
              purchseOrdersLists(
                { ...sendData, vendor_id: itemId },
                setAllListValue
              )
            ); // Default to Purchase Orders
            break;
        }
      }

      setDataChanging(false);
    }
  }, [dispatch, activeSection, currentPage, itemId, type, itemsPerPage]);


  return (
    <>
      {quoteList?.loading ||
        saleList?.loading ||
        paymentRec?.loading ||
        invoiceList?.loading ||
        creditNoteList?.loading ||
        purchseList?.loading ||
        GRNlist?.loading ||
        GRNreceptList.loading ||
        billList.loading ||
        expenseList.loading ||
        debitNoteList.loading ? (
        <TableViewSkeleton />
      ) : (
        <>
          <div className="transcuslx454s">
            {activeSection === "q" && type === "customer" && (
              <>
                {" "}
                <h2>Quotations</h2>
                <p>{allListValue?.total} Records</p>
              </>
            )}
            {activeSection === "s" && type === "customer" && (
              <>
                {" "}
                <h2>Sales Orders</h2>
                <p>{allListValue?.count} Records</p>
              </>
            )}
            {activeSection === "i" && type === "customer" && (
              <>
                {" "}
                <h2>Invoices</h2>
                <p>{allListValue?.count} Records</p>
              </>
            )}
            {activeSection === "p" && type === "customer" && (
              <>
                {" "}
                <h2>Payments</h2>
                <p>{allListValue?.count} Records</p>
              </>
            )}
            {activeSection === "c" && type === "customer" && (
              <>
                {" "}
                <h2>Credit Note</h2>
                <p>{allListValue?.count} Records</p>
              </>
            )}

            {activeSection === "po" && type === "vendor" && (
              <>
                {" "}
                <h2> Purchase Order</h2>
                <p>{allListValue?.total} Records</p>
              </>
            )}
            {activeSection === "grn" && type === "vendor" && (
              <>
                {" "}
                <h2>GRN</h2>
                <p>{allListValue?.count} Records</p>
              </>
            )}

            {activeSection === "bills" && type === "vendor" && (
              <>
                {" "}
                <h2>Bills</h2>
                <p>{allListValue?.count} Records</p>
              </>
            )}
            {activeSection === "pm" && type === "vendor" && (
              <>
                {" "}
                <h2> Payment Made</h2>
                <p>{allListValue?.count} Records</p>
              </>
            )}
            {activeSection === "exp" && type === "vendor" && (
              <>
                {" "}
                <h2> Expenses</h2>
                <p>{allListValue?.count} Records</p>
              </>
            )}
            {activeSection === "dn" && type === "vendor" && (
              <>
                {" "}
                <h2> Debit Notes</h2>
                <p>{allListValue?.count} Records</p>
              </>
            )}
          </div>

          <div id="mainsectioncsls" className="commonmainqusalincetcsecion">
            <div id="leftsidecontentxls">
              <div id="item-listsforcontainer">
                <div id="newtableofagtheme">
                  <div className="table-headerx12">
                    <div className="table-cellx12 quotiosalinvlisxs1">
                      {otherIcons.date_svg}
                      Date
                    </div>
                    {!(activeSection === "exp") && (
                      <div className="table-cellx12 quotiosalinvlisxs2">
                        {otherIcons.quotation_icon}
                        {activeSection == "q"
                          ? "QUOTATION"
                          : activeSection == "s"
                            ? "SALE ORDER"
                            : activeSection == "i"
                              ? "INVOICE"
                              : activeSection == "p"
                                ? "PAYMENT"
                                : activeSection == "c"
                                  ? "CREDIT NOTE"
                                  : activeSection == "po"
                                    ? "PURCHASES ORDER"
                                    : activeSection == "grn"
                                      ? "GRN"
                                      : activeSection == "grna"
                                        ? "GRN APPROVAL"
                                        : activeSection == "grr"
                                          ? "GRN RECEIVING AREA"
                                          : activeSection == "bills"
                                            ? "BILLS"
                                            : activeSection == "pm"
                                              ? "PAYMENT MADE"
                                              : activeSection == "dn"
                                                ? "DEBIT NOTES"
                                                : ""}{" "}
                      </div>
                    )}
                    {activeSection === "exp" && (
                      <div className="table-cellx12 quotiosalinvlisxs2">
                        {otherIcons?.expense_account_svg}
                        EXPENSE ACCOUNT
                      </div>
                    )}

                    {!(
                      activeSection === "grn" ||
                      activeSection === "exp" ||
                      activeSection === "bill"
                    ) && (
                        <div className="table-cellx12 quotiosalinvlisxs3">
                          {otherIcons.refrence_svg}
                          REFERENCE NUMBER
                        </div>
                      )}
                    {activeSection === "bill" && (
                      <div className="table-cellx12 quotiosalinvlisxs3">
                        {otherIcons.quotation_icon}
                        BILL ID
                      </div>
                    )}
                    {activeSection === "grn" && (
                      <div className="table-cellx12 quotiosalinvlisxs3">
                        {otherIcons.quotation_icon}
                        PURCHASE ORDER
                      </div>
                    )}
                    {activeSection === "exp" && (
                      <div className="table-cellx12 quotiosalinvlisxs3">
                        {otherIcons?.expense_type_svg}
                        EXPENSE TYPE
                      </div>
                    )}
                    <div className="table-cellx12 quotiosalinvlisxs6_item">
                      <p>
                        {otherIcons.doller_svg}
                        AMOUNT
                      </p>
                    </div>

                    {!(
                      activeSection === "p" ||
                      activeSection === "pm" ||
                      activeSection === "exp"
                    ) && (
                        <div className="table-cellx12 quotiosalinvlisxs6">
                          {otherIcons.status_svg}
                          STATUS
                        </div>
                      )}
                    {(activeSection === "p" || activeSection === "pm") && (
                      <div className="table-cellx12 quotiosalinvlisxs6">
                        {otherIcons.status_svg}
                        MODE
                      </div>
                    )}
                    {activeSection === "exp" && (
                      <div className="table-cellx12 quotiosalinvlisxs6">
                        {otherIcons.paid_through}
                        PAID THROUGH
                      </div>
                    )}
                    {/* <div className="table-cellx12 transactoin6xs3">
                 {otherIcons.status_svg}
                  STATUS
                </div> */}
                  </div>

                  <>
                    {allListValue?.quotations?.length > 0 &&
                      allListValue?.quotations?.map((val) => (
                        <div className="table-rowx12" key={val?.id}>
                          {" "}
                          {/* Assuming val has an id or unique key */}
                          <div className="table-cellx12 quotiosalinvlisxs1">
                            {val.transaction_date
                              ? formatDate3(val.transaction_date)
                              : ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs2">
                            {val?.quotation_id}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs4">
                            {val?.reference_no == 0 ? "" : val?.reference_no}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs5_item">
                            <p>{showAmountWithCurrencySymbol(val?.total)}</p>
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd">
                            <ShowStatusInList quotation={val} />
                          </div>
                        </div>
                      ))}
                  </>
                  <>
                    {allListValue?.sale_orders?.length > 0 &&
                      allListValue?.sale_orders?.map((val) => (
                        <div className="table-rowx12" key={val?.id}>
                          {" "}
                          {/* Assuming val has an id or unique key */}
                          <div className="table-cellx12 quotiosalinvlisxs1">
                            {val.transaction_date
                              ? formatDate3(val.transaction_date)
                              : ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs2">
                            {val?.sale_order_id}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs4">
                            {val?.reference_no == 0 ? "" : val?.reference_no}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs5_item">
                            <p>{showAmountWithCurrencySymbol(val?.total)}</p>
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd">
                            <ShowStatusInList quotation={val} />
                          </div>
                        </div>
                      ))}
                  </>
                  <>
                    {allListValue?.invoice?.length > 0 &&
                      allListValue?.invoice?.map((val) => (
                        <div className="table-rowx12" key={val?.id}>
                          {" "}
                          {/* Assuming val has an id or unique key */}
                          <div className="table-cellx12 quotiosalinvlisxs1">
                            {val.transaction_date
                              ? formatDate3(val.transaction_date)
                              : ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs2">
                            {val?.invoice_id}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs4">
                            {val?.reference_no == 0 ? "" : val?.reference_no}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs5_item">
                            <p>{showAmountWithCurrencySymbol(val?.total)}</p>
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd">
                            <ShowStatusInList1 quotation={val} />
                          </div>
                        </div>
                      ))}
                  </>
                  <>
                    {allListValue?.payments?.length > 0 &&
                      allListValue?.payments?.map((val) => (
                        <div className="table-rowx12" key={val?.id}>
                          {" "}
                          {/* Assuming val has an id or unique key */}
                          <div className="table-cellx12 quotiosalinvlisxs1">
                            {val.transaction_date
                              ? formatDate3(val.transaction_date)
                              : ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs2">
                            {val?.payment_id}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs4">
                            {val?.reference == 0 ? "" : val?.reference}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs5_item">
                            <p>{showAmountWithCurrencySymbol(val?.debit)}</p>
                          </div>
                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd"
                          >
                            <ShowMastersValue type="9" id={val?.payment_mode} />
                          </div>
                        </div>
                      ))}
                  </>
                  <>
                    {allListValue?.creditnote?.length > 0 &&
                      allListValue?.creditnote?.map((val) => (
                        <div className="table-rowx12" key={val?.id}>
                          {" "}
                          {/* Assuming val has an id or unique key */}
                          <div className="table-cellx12 quotiosalinvlisxs1">
                            {val.transaction_date
                              ? formatDate3(val.transaction_date)
                              : ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs2">
                            {val?.credit_note_id}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs4">
                            {val?.reference_no == 0 ? "" : val?.reference_no}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs5_item">
                            <p>{showAmountWithCurrencySymbol(val?.total)}</p>
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd">
                            <p
                              className={
                                val?.status == "1"
                                  ? "approved"
                                  : val?.status == "2"
                                    ? "declined"
                                    : val?.status == "3"
                                      ? "sent"
                                      : val?.status == "0"
                                        ? "draft"
                                        : "declined"
                              }
                            >
                              {val?.status == "1"
                                ? "Approved"
                                : val?.status == "2"
                                  ? "Rejected"
                                  : val?.status == "3"
                                    ? "Sent"
                                    : val?.status == "0"
                                      ? "Draft"
                                      : val?.status == "4"
                                        ? "Expired"
                                        : ""}
                            </p>
                          </div>
                        </div>
                      ))}
                  </>

                  <>
                    {allListValue?.purchase_order?.length > 0 &&
                      allListValue?.purchase_order?.map((val) => (
                        <div className="table-rowx12" key={val?.id}>
                          {" "}
                          {/* Assuming val has an id or unique key */}
                          <div className="table-cellx12 quotiosalinvlisxs1">
                            {val.transaction_date
                              ? formatDate3(val.transaction_date)
                              : ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs2">
                            {val?.purchase_order_id}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs4">
                            {val?.reference_no == 0 ? "" : val?.reference_no}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs5_item">
                            <p>{showAmountWithCurrencySymbol(val?.total)}</p>
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd">
                            <p
                              className={
                                val?.status == "1"
                                  ? "approved"
                                  : val?.status == "6"
                                    ? "open"
                                    : val?.status == "0"
                                      ? "draft"
                                      : val?.status == "2"
                                        ? "declined"
                                        : val?.status == "3"
                                          ? "pending"
                                          : val?.status == "4"
                                            ? "overdue"
                                            : ""
                              }
                            >
                              <p>
                                {val?.status == "0"
                                  ? "Draft"
                                  : val?.status == "1"
                                    ? "Approved"
                                    : val?.status == "6"
                                      ? "Open"
                                      : val?.status == "2"
                                        ? "Declined"
                                        : val?.status == "3"
                                          ? "Transfer To GRN"
                                          : val?.status == "4"
                                            ? "Billed"
                                            : ""}
                              </p>
                            </p>
                          </div>
                        </div>
                      ))}
                  </>
                  <>
                    {allListValue?.grn?.length > 0 &&
                      allListValue?.grn?.map((val) => (
                        <div className="table-rowx12" key={val?.id}>
                          {" "}
                          {/* Assuming val has an id or unique key */}
                          <div className="table-cellx12 quotiosalinvlisxs1">
                            {val.transaction_date
                              ? formatDate3(val.transaction_date)
                              : ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs2">
                            {val?.grn_no}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs4">
                            {val.purchase_order?.purchase_order_id == 0
                              ? ""
                              : val.purchase_order?.purchase_order_id || ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs5_item">
                            <p>{showAmountWithCurrencySymbol(val?.total)}</p>
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                            <p
                              className={
                                val?.status == "1"
                                  ? "open"
                                  : val?.status == "0"
                                    ? "draft"
                                    : val?.status == "2"
                                      ? "close"
                                      : val?.status == "3"
                                        ? "pending"
                                        : val?.status == "4"
                                          ? "overdue"
                                          : ""
                              }
                            >
                              {val?.status == "0"
                                ? "Draft"
                                : val?.status == "1"
                                  ? "Billed"
                                  : val?.status == "2"
                                    ? "Close"
                                    : val?.status == "3"
                                      ? "Send For Approval"
                                      : val?.status == "4"
                                        ? "Overdue"
                                        : ""}
                            </p>
                          </div>
                        </div>
                      ))}
                  </>

                  <>
                    {allListValue?.bills?.length > 0 &&
                      allListValue?.bills?.map((val) => (
                        <div className="table-rowx12" key={val?.id}>
                          {" "}
                          {/* Assuming val has an id or unique key */}
                          <div className="table-cellx12 quotiosalinvlisxs1">
                            {val.transaction_date
                              ? formatDate3(val.transaction_date)
                              : ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs2">
                            {val?.bill_no}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs4">
                            {val?.reference_no == 0 ? "" : val?.reference_no}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs5_item">
                            <p>{showAmountWithCurrencySymbol(val?.total)}</p>
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                            <p
                              className={
                                val?.status == "1"
                                  ? "open"
                                  : val?.status == "0"
                                    ? "draft"
                                    : val?.status == "2"
                                      ? "declined"
                                      : val?.status == "3"
                                        ? "pending"
                                        : val?.status == "4"
                                          ? "overdue"
                                          : val?.status == "5"
                                            ? "open"
                                            : ""
                              }
                            >
                              {val?.status == "0"
                                ? "Draft"
                                : val?.status == "1"
                                  ? "Approved"
                                  : val?.status == "2"
                                    ? "Rejected"
                                    : val?.status == "3"
                                      ? "Pending"
                                      : val?.status == "4"
                                        ? "Overdue"
                                        : val?.status == "5"
                                          ? "Paid"
                                          : ""}
                            </p>
                          </div>
                        </div>
                      ))}
                  </>

                  <>
                    {allListValue?.expense?.length > 0 &&
                      allListValue?.expense?.map((val) => (
                        <div className="table-rowx12" key={val?.id}>
                          {" "}
                          {/* Assuming val has an id or unique key */}
                          <div className="table-cellx12 quotiosalinvlisxs1">
                            {val.created_at ? formatDate3(val.created_at) : ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs2">
                            {val?.expense_account?.account_name || ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs4">
                            {val?.expense_head?.expense_name || ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs5_item">
                            <p>{showAmountWithCurrencySymbol(val?.amount)}</p>
                          </div>
                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd"
                          >
                            {val?.paid_through?.account_name || ""}
                          </div>
                        </div>
                      ))}
                  </>
                  <>
                    {allListValue?.debit_notes?.length > 0 &&
                      allListValue?.debit_notes?.map((val) => (
                        <div className="table-rowx12" key={val?.id}>
                          {" "}
                          {/* Assuming val has an id or unique key */}
                          <div className="table-cellx12 quotiosalinvlisxs1">
                            {val.transaction_date
                              ? formatDate3(val.transaction_date)
                              : ""}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs2">
                            {val?.debit_note_id}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs4">
                            {val.bill?.bill_no}
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs5_item">
                            <p>{showAmountWithCurrencySymbol(val?.total)}</p>
                          </div>
                          <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                            <p
                              className={
                                val?.status == "1"
                                  ? "approved"
                                  : val?.status == "2"
                                    ? "declined"
                                    : val?.status == "3"
                                      ? "sent"
                                      : val?.status == "0"
                                        ? "draft"
                                        : "declined"
                              }
                            >
                              {val?.status == "1"
                                ? "Approved"
                                : val?.status == "2"
                                  ? "Rejected"
                                  : val?.status == "3"
                                    ? "Sent"
                                    : val?.status == "0"
                                      ? "Draft"
                                      : val?.status == "4"
                                        ? "Expired"
                                        : ""}
                            </p>
                          </div>
                        </div>
                      ))}
                  </>
                </div>
              </div>
            </div>
          </div>
          <PaginationComponent
            itemList={allListValue?.count || allListValue?.total}
            setDataChangingProp={handleDataChange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </>
      )}
    </>
  );
};

export default ShowTransactionsData;
