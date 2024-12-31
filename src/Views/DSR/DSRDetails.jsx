import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Loader02 from "../../Components/Loaders/Loader02";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import useOutsideClick from "../Helper/PopupData";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import {
  DSRDetailsAction,
  PassengerAddAction,
  PassengerDeleteActions,
} from "../../Redux/Actions/DSRActions";
import {
  ShowDropdownContent,
  TermsAndConditions
} from "../Common/InsideSubModulesCommon/DetailInfo";
import PrintContent from "../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent";
import { generatePDF } from "../Helper/createPDF";
import "./DSRDetails.scss";
import PassengerCard from "./PassengerCard";

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
  const cusList = useSelector((state) => state?.customerList);
  const DSRDetails = useSelector((state) => state?.DSRDetails);
  const DSRData = DSRDetails?.data?.data?.data || {};


  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const quoteDetail = useSelector((state) => state?.quoteDetail);
  const quoteStatus = useSelector((state) => state?.quoteStatus);
  const quoteDelete = useSelector((state) => state?.quoteDelete);
  const quotation = quoteDetail?.data?.data?.quotation;

  const [callApi, setCallApi] = useState(0);
  const [cusData1, setcusData1] = useState(null);

  useOutsideClick(dropdownRef2, () => setShowDropdown(false));
  useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));
  useOutsideClick(dropdownRef, () => setShowDropdownx2(false));

  const UrlId = new URLSearchParams(location.search).get("id");

  const [passengerData, setPassengerData] = useState({
    dsr_id: UrlId,
    customer_id: "",
    passenger_name: "",
  });

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
  const handleChange2 = (e) => {
    const { name, value } = e.target;

    const selectedCustomer = cusList?.data?.user?.find(
      (customer) => customer.id === value
    );

    setPassengerData((prev) => ({
      ...prev,
      customer_id: value,
      passenger_name: selectedCustomer?.display_name ?? "",
      dsr_id: UrlId,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (UrlId) {
      const queryParams = {
        dsr_id: UrlId,
      };
      dispatch(DSRDetailsAction(queryParams));
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

  const handleDeletePassenger = (id) => {
    const sendData = {
      passenger_id: id,
    };
    dispatch(PassengerDeleteActions(sendData))
      .then((response) => {
        if (UrlId) {
          const refreshData = {
            dsr_id: UrlId,
          };
          dispatch(DSRDetailsAction(refreshData));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const sendData = {
        ...passengerData,
      };

      dispatch(PassengerAddAction(sendData, Navigate))
        .then((response) => {
          if (UrlId) {
            const refreshData = {
              dsr_id: UrlId,
            };
            dispatch(DSRDetailsAction(refreshData));
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      toast.error("Error update passenger:", error);
    }
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
              <h1 id="firstheading">{DSRData?.dsr_no}</h1>
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
                  <div
                    style={{ marginLeft: "1px" }}
                    className="contentInformation1"
                  >
                    <h4>DSR Number</h4>
                    <h5>:</h5>
                    <p>{DSRData?.dsr_no || ""}</p>
                  </div>
                  <div className="contentInformation1">
                    <h4>Customer Name </h4>
                    <h5>:</h5>
                    <p>{DSRData?.customer?.display_name || ""}</p>
                  </div>
                  <div className="contentInformation1">
                    <h4>Customer Type</h4>
                    <h5>:</h5>
                    <p>{DSRData?.customer?.customer_type || ""}</p>
                  </div>
                  <div className="contentInformation1">
                    <h4>Email</h4>
                    <h5>:</h5>
                    <p>{DSRData?.customer?.email || ""}</p>
                  </div>

                  <div className="contentInformation1">
                    <h4>Mobile Number</h4>
                    <h5>:</h5>
                    <p>{DSRData?.customer?.mobile_no || ""}</p>
                  </div>
                  <div className="contentInformation1">
                    <h4>Company Name </h4>
                    <h5>:</h5>
                    <p>{DSRData?.customer?.company_name || ""}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-cards" style={{maxHeight:"800px"}}>
              <div
                className="card"
                style={{
                  maxHeight: "800px", 
                  overflowY: "auto",
                  border: "1px solid #ccc", 
                  borderRadius: "8px",
                }}
              >
                <div className="top_head">
                  <h3>
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
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 12L10.5 14.625M18 19L13.8 16.55M13.8 16.55L18 13.75M13.8 16.55L10.5 14.625M10.5 14.625L6 17.6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7ZM12 7V11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    Passengers
                  </h3>
                </div>
                <div className="f1wrapofcreqxy">
                  <div className="f1wrapofcreqx1" style={{ marginTop: "5px" }}>
                    <div
                      className="actionbarcommon2"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <div className="form_commonblock ">
                        <label>
                          Passengers<b className="color_red">*</b>
                        </label>
                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}
                            <CustomDropdown10
                              autoComplete="off"
                              ref={dropdownRef1}
                              label="Customer Name"
                              options={cusList?.data?.user}
                              value={passengerData.customer_id}
                              onChange={handleChange2}
                              name="customer_id"
                              defaultOption="Select Passenger"
                              setcusData={setcusData1}
                              cusData={cusData1}
                              type="vendor"
                              required
                            />
                          </span>
                        </div>
                      </div>
                      <button
                        className={`firstbtnc1 `}
                        onClick={handleFormSubmit2}
                      >
                        Add Passenger
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      // maxHeight: "300px",
                      // overflowY: "auto", 
                      marginBottom:"20px",
                      marginRight:"20px"
                    }}
                  >
                    <PassengerCard
                      passengers={DSRData}
                      onDelete={handleDeletePassenger}
                    />
                  </div>
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
