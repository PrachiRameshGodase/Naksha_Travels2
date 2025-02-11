import React, { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { useDispatch, useSelector } from "react-redux";
import Loader02 from "../../../Components/Loaders/Loader02";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import { Toaster } from "react-hot-toast";
import { formatDate3 } from "../../Helper/DateFormat";
import { billDeletes, billDetails } from "../../../Redux/Actions/billActions";
import useOutsideClick from "../../Helper/PopupData";
import ItemDetailTable from "../../Common/InsideSubModulesCommon/ItemDetailTable";
import { ShowDropdownContent } from "../../Common/InsideSubModulesCommon/DetailInfo";
import { MoreInformation } from "../../Common/InsideSubModulesCommon/DetailInfo";
import { FromToDetailsPurchases } from "../../Common/InsideSubModulesCommon/DetailInfo";
import useFetchApiData from "../../Helper/ComponentHelper/useFetchApiData";
import { generatePDF } from "../../Helper/createPDF";
import PrintContent from "../../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent";
import { confirIsCurrencyPDF } from "../../Helper/ConfirmHelperFunction/ConfirmWithZeroAmount";
import { UserMasterListAction } from "../../../Redux/Actions/userMasterActions";
import { currencyRateListAction } from "../../../Redux/Actions/manageCurrencyActions";
import { getCurrencyValue } from "../../Helper/ComponentHelper/ManageStorage/localStorageUtils";


const BillDetail = () => {

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const billDetail = useSelector((state) => state?.billDetail);
  const billStatus = useSelector((state) => state?.billStatuses);
  const billDelete = useSelector((state) => state?.billDelete);
  const bills = billDetail?.data?.bill;
  const masterData = useSelector(state => state?.masterData?.masterData);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownx1, setShowDropdownx1] = useState(false);
  const [showDropdownx2, setShowDropdownx2] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  useOutsideClick(dropdownRef2, () => setShowDropdown(false));
  useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));
  useOutsideClick(dropdownRef, () => setShowDropdownx2(false));

  const UrlId = new URLSearchParams(location.search).get("id");
  const [callApi, setCallApi] = useState(false);

  const handleEditThing = (val) => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);
    if (val === "edit") {
      queryParams.set(val, true);
      Navigate(`/dashboard/create-bills?${queryParams.toString()}`);
    } else if (val == "duplicate") {
      queryParams.set(val, true);
      Navigate(`/dashboard/create-bills?${queryParams.toString()}`);
    } else if (val === "bill_to_payment") {
      queryParams.set("convert", val);
      queryParams.set("bill_no", bills?.bill_no);
      Navigate(`/dashboard/create-payment-made?${queryParams.toString()}`);
    }
    else if (val === "bill_to_debit") {
      queryParams.set("convert", val);
      Navigate(`/dashboard/create-debit-note?${queryParams.toString()}`);
    }

  };
  const componentRef = useRef(null);

  const changeStatus = (statusVal) => {
    try {
      const sendData = {
        id: UrlId,
      };
      switch (statusVal) {
        case "accepted":
          sendData.status = 1;
          break;
        case "decline":
          sendData.status = 2;
          break;
        case "sent":
          sendData.status = 6;
          break;
        default:
      }

      if (statusVal === "delete") {
        dispatch(billDeletes(sendData, Navigate));
      } else {
        dispatch(billStatus(sendData, setCallApi))
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
    id: UrlId,
  }), [callApi]);
  useFetchApiData(billDetails, payloadGenerator, [callApi]);


  const [loading, setLoading] = useState(false);


  const rateLoading = useSelector(state => state?.currencyRateList);

  const handleDownloadPDF = async () => {
    try {
      if (!bills?.transaction_date) return;

      // Fetch currency rates for the transaction date
      const res = await dispatch(currencyRateListAction({ date: bills?.transaction_date }));
      const fetchCurrencyData = res?.data?.find(val => val?.code === bills?.currency);

      // Ensure masterData & quotation exist before proceeding
      if (!bills || !masterData) {
        dispatch(UserMasterListAction());
        alert("Data is still loading, please try again.");
        return;
      }

      const generatePDFWithData = (currencyData) => {
        const contentComponent = (
          <PrintContent
            data={bills}
            masterData={masterData}
            moduleId={bills?.bill_no}
            section="Bill"
            fetchCurrencyData={currencyData}
          />
        );
        generatePDF(contentComponent, "Bill_Document.pdf", setLoading, 500);
      };

      if (fetchCurrencyData) {
        generatePDFWithData(fetchCurrencyData);
      } else if (bills?.currency === getCurrencyValue()) {
        generatePDFWithData(null); // No conversion needed
      } else {
        // Prompt user to create missing currency
        const res = await confirIsCurrencyPDF(bills?.currency);
        if (res) {
          Navigate(`/dashboard/manage-currency?date=${bills?.transaction_date}&currency=${bills?.currency}`);
        }
      }
    } catch (error) {
      console.error("Error fetching currency rates:", error);
    }
  };

  return (
    <>
      {(billDelete?.loading || billStatus?.loading || loading || rateLoading?.loading) && <MainScreenFreezeLoader />}

      {billDetail?.loading ? (
        <Loader02 />
      ) : (
        <div ref={componentRef}>
          <Toaster />
          <div id="Anotherbox" className="formsectionx1">
            <div id="leftareax12">
              <h1 id="firstheading">{bills?.bill_no}</h1>
            </div>
            <div id="buttonsdata">

              {(bills?.status == 1 || bills?.status == 5) ? (
                ""
              ) : (
                <div className="mainx1" onClick={() => handleEditThing("edit")}>
                  <img src="/Icons/pen-clip.svg" alt="" />
                  <p>Edit</p>
                </div>
              )}
              <div
                onClick={() => setShowDropdownx1(!showDropdownx1)}
                className="mainx1"
                ref={dropdownRef1}
              >
                <p onClick={handleDownloadPDF} style={{ cursor: 'pointer' }}>
                  PDF/Print
                </p>
              </div>

              <div className="sepc15s63x63"></div>

              {bills?.status != "1" && (
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="mainx2"
                  ref={dropdownRef2}
                >
                  <img
                    src="/Icons/menu-dots-vertical.svg"
                    alt=""
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="More Options"
                    data-tooltip-place="bottom"
                  />
                  {showDropdown && (
                    <ShowDropdownContent
                      quotation={bills}
                      changeStatus={changeStatus}
                    />
                  )}
                </div>
              )}

              <Link
                to={"/dashboard/bills"}
                className="linkx3"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Close"
              >
                <RxCross2 />
              </Link>
            </div>
          </div>
          <div className="listsectionsgrheigh" id='quotation-content'>
            {bills?.status == 1 && <div className="commonquoatjkx54s">
              <div className="firstsecquoatjoks45">
                <div className="detailsbox4x15sfirp">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/9329/9329876.png"
                    alt=""
                  />
                </div>
                <div className="detailsbox4x15s">
                  <h2>Complete Your Payment</h2>
                  <p>
                    You can create the payment with this order to complete your
                    bill.
                  </p>
                  {/* <button onClick={() => handleEditThing("convert")}>
                    Create A Payment
                  </button> */}
                  <button onClick={() => setShowDropdownx2(!showDropdownx2)} ref={dropdownRef}>Convert {otherIcons?.arrow_svg}
                    {showDropdownx2 && (
                      <div className="dropdownmenucustom5sc51s">
                        <div
                          className="dmncstomx1 btextcolor"
                          onClick={() => handleEditThing("bill_to_payment")}
                        >
                          {otherIcons?.print_svg}
                          Make Payment
                        </div>
                        <div
                          className="dmncstomx1 btextcolor"
                          onClick={() =>
                            handleEditThing("bill_to_debit")
                          }
                        >
                          {otherIcons?.pdf_svg}
                          Create Debit Note
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>}


            <div className="commonquoatjkx55s" id="quotation-content">
              <div className="childommonquoatjkx55s">
                <div
                  className={
                    bills?.status == 0
                      ? "draftClassName"
                      : bills?.status == 1
                        ? "approvedClassName"
                        : bills?.status == 2
                          ? "declinedClassName"
                          : bills?.status == 3
                            ? "sentClassName"
                            : bills?.status == 6
                              ? "sentClassName3"
                              : bills?.status == 5
                                ? "paidClassName"
                                : "defaultClassName"
                  }
                >
                  {bills?.status == "0"
                    ? "Draft"
                    : bills?.status == "1"
                      ? "Aporoved"
                      : bills?.status == "2"
                        ? "Decline"
                        : bills?.status == "3"
                          ? "Pending"
                          : bills?.status == "6"
                            ? "Sent"
                            : bills?.status == "5"
                              ? "Paid"
                              : ""}
                </div>
                <div className="detailsbox4x15s1">
                  <div className="xhjksl45s">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 19 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.7582 0.894043L18.8566 4.51588L16.7582 8.13771H12.5615L10.4631 4.51588L12.5615 0.894043L16.7582 0.894043Z" />
                      <path d="M6.29509 0.894043L13.5963 13.4842L11.4979 17.1061H7.30116L0 4.51588L2.09836 0.894043L6.29509 0.894043Z" />
                    </svg>
                    <p>Accounts</p>
                  </div>
                  <div className="xhjksl45s2">
                    <h1>BILL</h1>
                    <span>
                      <p>Bill Number:</p> <h3>{bills?.bill_no}</h3>
                    </span>
                    <span>
                      <p>Bill Date:</p>{" "}
                      <h3> {formatDate3(bills?.transaction_date)}</h3>
                    </span>
                  </div>
                </div>

                <br />
                <FromToDetailsPurchases quotation={bills?.vendor} section="Bill" />
                <ItemDetailTable itemsData={bills} section="bill" />
              </div>
            </div>
            <MoreInformation
              sale={bills?.sale_person}
              note={bills?.vendor_note}
              tc={bills?.terms_and_condition}
              section="Vendor"
            />
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default BillDetail;
