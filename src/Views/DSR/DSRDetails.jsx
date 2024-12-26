import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  quotationDelete,
  quotationDetails,
  quotationStatus,
} from "../../Redux/Actions/quotationActions";
import Loader02 from "../../Components/Loaders/Loader02";
import { Toaster } from "react-hot-toast";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import { formatDate3 } from "../Helper/DateFormat";
import useOutsideClick from "../Helper/PopupData";
import { useReactToPrint } from "react-to-print";
import ItemDetailTable, {
  DSRDetailTable,
} from "../Common/InsideSubModulesCommon/ItemDetailTable";
// import MoreInformation from '../../Common/MoreInformation';

import {
  FromToDetails,
  MoreInformation,
  ShowAllStatus,
  ShowDropdownContent,
  TermsAndConditions,
} from "../Common/InsideSubModulesCommon/DetailInfo";
import PrintContent from "../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent";
import { generatePDF } from "../Helper/createPDF";
import "./DSRDetails.scss";

const DSRDetails = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownx1, setShowDropdownx1] = useState(false);
  const [showDropdownx2, setShowDropdownx2] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const masterData = useSelector((state) => state?.masterData?.masterData);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const quoteDetail = useSelector((state) => state?.quoteDetail);
  const quoteStatus = useSelector((state) => state?.quoteStatus);
  const quoteDelete = useSelector((state) => state?.quoteDelete);
  const quotation = quoteDetail?.data?.data?.quotation;

  const [callApi, setCallApi] = useState(0);

  // console.log("quoteDetail", quoteDetail)
  useOutsideClick(dropdownRef2, () => setShowDropdown(false));
  useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));
  useOutsideClick(dropdownRef, () => setShowDropdownx2(false));

  const UrlId = new URLSearchParams(location.search).get("id");

  const handleEditThing = (val) => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);

    if (val === "quotationToSale") {
      queryParams.set("convert", "quotationToSale");
      Navigate(`/dashboard/create-sales-orders?${queryParams.toString()}`);
    } else if (val === "quotationToInvoice") {
      queryParams.set("convert", val);
      Navigate(`/dashboard/create-invoice?${queryParams.toString()}`);
    } else if (val === "edit") {
      queryParams.set("edit", true);
      Navigate(`/dashboard/create-quotations?${queryParams.toString()}`);
    }
  };

  // const [callApi, setCallApi] = useState(false);
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
        // dispatch(quotationDelete(sendData, Navigate));
      } else {
        // dispatch(quotationStatus(sendData, setCallApi))
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (UrlId) {
      const queryParams = {
        id: UrlId,
        fy: localStorage.getItem("FinancialYear"),
        warehouse_id: localStorage.getItem("selectedWarehouseId"),
      };
      // dispatch(quotationDetails(queryParams));
    }
  }, [dispatch, UrlId, callApi]);

  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = () => {
    if (!quotation || !masterData) {
      alert("Data is still loading, please try again.");
      return;
    }

    const contentComponent = (
      <PrintContent
        data={quotation}
        cusVenData={quotation?.customer}
        masterData={masterData}
        moduleId={quotation?.quotation_id}
        section="Quotation"
      />
    );
    generatePDF(contentComponent, "Quotation_Document.pdf", setLoading, 500);
  };

  return (
    <>
      {(quoteStatus?.loading || quoteDelete?.loading || loading) && (
        <MainScreenFreezeLoader />
      )}
      {/* <PrintContent data={quotation} cusVenData={quotation?.customer} masterData={masterData} moduleId={quotation?.quotation_id} section="Quotation" /> */}

      {quoteDetail?.loading ? (
        <Loader02 />
      ) : (
        <div ref={componentRef}>
          <div id="Anotherbox" className="formsectionx1">
            <div id="leftareax12">
              <h1 id="firstheading">{quotation?.quotation_id}</h1>
            </div>
            <div id="buttonsdata">
              {quotation?.status !== "1" && quotation?.status !== "4" && (
                <div className="mainx1" onClick={() => handleEditThing("edit")}>
                  <img src="/Icons/pen-clip.svg" alt="" />
                  <p>Edit</p>
                </div>
              )}

              <div className="sepc15s63x63"></div>

              {quotation?.status !== "1" && (
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
                      quotation={quotation}
                      changeStatus={changeStatus}
                    />
                  )}
                </div>
              )}

              <Link
                to={"/dashboard/quotation"}
                className="linkx3"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Close"
                data-tooltip-place="bottom"
              >
                <RxCross2 />
              </Link>
            </div>
          </div>
          <div className="listsectionsgrheighx21s" id="quotation-content">
            {quotation?.status == 1 && (
              <div className="commonquoatjkx54s">
                <div className="firstsecquoatjoks45">
                  <div className="detailsbox4x15sfirp">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9329/9329876.png"
                      alt=""
                    />
                  </div>
                  <div className="detailsbox4x15s">
                    <h2>Convert and Sent the Quotation</h2>
                    <p>
                      Create an invoice or sales order for this estimate to
                      confirm the sale and bill your customer.
                    </p>
                    <button
                      onClick={() => setShowDropdownx2(!showDropdownx2)}
                      ref={dropdownRef}
                    >
                      Convert {otherIcons?.arrow_svg}
                      {showDropdownx2 && (
                        <div className="dropdownmenucustom5sc51s">
                          <div
                            className="dmncstomx1 btextcolor"
                            onClick={() => handleEditThing("quotationToSale")}
                          >
                            {otherIcons?.print_svg}
                            Convert To Sale Order
                          </div>
                          <div
                            className="dmncstomx1 btextcolor"
                            onClick={() =>
                              handleEditThing("quotationToInvoice")
                            }
                          >
                            {otherIcons?.pdf_svg}
                            Convert To Invoice
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="info-cards">
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#9b9b9b"
                        fill="none"
                      >
                        <path
                          d="M7 9.00183C4.82497 9.01495 3.64706 9.11944 2.87868 9.95185C2 10.9038 2 12.4358 2 15.4999C2 18.5641 2 20.0961 2.87868 21.048C3.75736 21.9999 5.17157 21.9999 8 21.9999H16C18.8284 21.9999 20.2426 21.9999 21.1213 21.048C22 20.0961 22 18.5641 22 15.4999C22 12.4358 22 10.9038 21.1213 9.95185C20.3529 9.11944 19.175 9.01495 17 9.00183"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 12L10.5 14.625M18 19L13.8 16.55M13.8 16.55L18 13.75M13.8 16.55L10.5 14.625M10.5 14.625L6 17.6"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7ZM12 7V11"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                    Customer Information
                  </h3>
                </div>
                <div className="contentInformation ">
                  <div style={{ marginLeft: "1px" }} className="contentInformation1">
                    <h4>DSR Number</h4>
                    <h5>:</h5>
                    <p>NDSR12345</p>
                  </div>

                  <div className="contentInformation1">
                    <h4>Customer Type</h4>
                    <h5>:</h5>
                    <p></p>
                  </div>
                  <div className="contentInformation1">
                    <h4>Email</h4>
                    <h5>:</h5>
                    <p></p>
                  </div>
                  <div className="contentInformation1">
                    <h4>Cusstomer Name </h4>
                    <h5>:</h5>
                    <p></p>
                  </div>
                  <div className="contentInformation1">
                    <h4>Mobile Number</h4>
                    <h5>:</h5>
                    <p></p>
                  </div>

                </div>
              </div>
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#9b9b9b"
                        fill="none"
                      >
                        <path
                          d="M7 9.00183C4.82497 9.01495 3.64706 9.11944 2.87868 9.95185C2 10.9038 2 12.4358 2 15.4999C2 18.5641 2 20.0961 2.87868 21.048C3.75736 21.9999 5.17157 21.9999 8 21.9999H16C18.8284 21.9999 20.2426 21.9999 21.1213 21.048C22 20.0961 22 18.5641 22 15.4999C22 12.4358 22 10.9038 21.1213 9.95185C20.3529 9.11944 19.175 9.01495 17 9.00183"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 12L10.5 14.625M18 19L13.8 16.55M13.8 16.55L18 13.75M13.8 16.55L10.5 14.625M10.5 14.625L6 17.6"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7ZM12 7V11"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                    Address
                  </h3>
                </div>

                <div id="DescriptionJOB">
                  <p className="paragra"></p>
                </div>
              </div>

            </div>
            <TermsAndConditions />
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default DSRDetails;
