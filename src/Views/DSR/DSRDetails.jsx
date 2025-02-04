import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";

import {
  DSRDeleteActions,
  DSRDetailsAction,
  DSRStatusActions,
  PassengerAddAction,
  PassengerDeleteActions,
} from "../../Redux/Actions/DSRActions";

import "./DSRDetails.scss";
import PassengerCard from "./PassengerCard";
import Swal from "sweetalert2";
import DSRSummary from "./DSRSummary";
import { generatePDF } from "../Helper/createPDF";
import PrintContent2 from "../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent2";
import { customersList } from "../../Redux/Actions/customerActions";
import { getCurrencyValue } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";
import { currencyRateListAction } from "../../Redux/Actions/manageCurrencyActions";
import { confirIsCurrencyPDF } from "../Helper/ConfirmHelperFunction/ConfirmWithZeroAmount";

const DSRDetails = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const dropdownRef1 = useRef(null);
  const UrlId = new URLSearchParams(location.search).get("id");

  const userMasterData = useSelector((state) => state?.userMasterList?.data);
  const cusList = useSelector((state) => state?.customerList);
  const DSRDetails = useSelector((state) => state?.DSRDetails);
  const DSRData = DSRDetails?.data?.data?.data || {};
  const addPassenger = useSelector((state) => state?.addPassenger);
  const deletePassenger = useSelector((state) => state?.deletePassenger);
  const deleteDSR = useSelector((state) => state?.DSRDelete);
  const statusChangeDSR = useSelector((state) => state?.DSRStatus);
  const currencyList1 = useSelector((state) => state?.getCurrency);
  const currencyList = currencyList1?.data?.currency || []
  
  const [cusData1, setcusData1] = useState(null);
  const [passengerData, setPassengerData] = useState({
    dsr_id: UrlId,
    customer_id: "",
    passenger_name: "",
  });

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

  const handleDeletePassenger = async (id) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this passenger?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        passenger_id: id,
      };
      dispatch(PassengerDeleteActions(sendData))
        .then((response) => {
          if (DSRData?.id) {
            const refreshData = {
              dsr_id: DSRData?.id,
            };
            dispatch(DSRDetailsAction(refreshData));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleFormSubmit2 = async (e) => {
    e.preventDefault();
    const isPassengerExists = DSRData?.passengers?.some(
      (passenger) => passenger.customer_id === passengerData.customer_id
    );
    if (!passengerData?.customer_id) {
      toast.error("Please Select Passenger");
      return;
    } else if (isPassengerExists) {
      toast.error("Passenger already added to the list.");
      return; // Prevent further execution
    } else {
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
              setcusData1(null);
            }
          })
          .catch((err) => console.log(err));
      } catch (error) {
        toast.error("Error update passenger:", error);
      }
    }
  };

  const handleDeleteDSR = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this dsr?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        dsr_id: item?.id,
      };
      dispatch(DSRDeleteActions(sendData, Navigate));
    }
  };

  const handleChangeDSRStatus = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to convert to invoice?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        dsr_id: item?.id,
      };
      dispatch(DSRStatusActions(sendData, Navigate));
    }
  };

  useEffect(() => {
    if (UrlId) {
      const queryParams = {
        dsr_id: UrlId,
      };
      dispatch(DSRDetailsAction(queryParams));
    }
  }, [dispatch, UrlId]);

  const [loading, setLoading] = useState(false);
    const getCurrency = getCurrencyValue();
  
  const handleDownloadPDF =async () => {
      try {

      if (DSRData?.transaction_date) {

        //////////// check if the org currency have exchange rate or not ///////////////////

        // Fetch currency rates with date
        const res = await dispatch(currencyRateListAction({ date: DSRData?.transaction_date }));

        if (res?.success === true) {
          // Find the fetchCurrencyData of active organization currency with specific date
          const fetchCurrencyData = res?.data?.find(val => val?.code === getCurrency);
          // console.log("fetchCurrencyData", fetchCurrencyData)

          // create and show the pdf of converted currency on the exchange rate....
          if (!DSRData || !userMasterData) {
            alert("Data is still loading, please try again.");
            return;
          }
          const contentComponent = (
              <PrintContent2
                data={DSRData}
                userMasterData={userMasterData}
                cusVenData=""
                moduleId="DSR No"
                section="DSR"
                fetchCurrencyData={fetchCurrencyData} currencyList={currencyList}
              />
            );
            generatePDF(contentComponent, "DSR_Document.pdf", setLoading, 500);
           
          
        } else {
          // Ask user if they want to create currency exchange rate
          const confirmed = await confirIsCurrencyPDF(getCurrency);

          if (confirmed) {
            const queryParams = new URLSearchParams();
            queryParams.set("date", DSRData?.transaction_date);
            queryParams.set("currency", getCurrency);//send active org currency 
            Navigate(`/dashboard/manage-currency?${queryParams.toString()}`);
          } else {
            return;
          }
          //////////// check if the org currency have exchange rate or not ///////////////////

        }
      }

    } catch (error) {
      console.error("Error fetching currency rates:", error);
    }
  };
  const isDisabled = DSRData?.is_invoiced == "1";
  useEffect(() => {
    const sendData = { status: 1, active: 1 };
    dispatch(customersList(sendData));
  }, [dispatch]);
  return (
    <>
      {/* <PrintContent2
        data={DSRData}
        userMasterData={userMasterData}
        cusVenData=""
        moduleId="DSR No"
        section="DSR"
      /> */}
      {(addPassenger?.loading ||
        deletePassenger?.loading ||
        statusChangeDSR?.loading ||
        deleteDSR?.loading ||
        DSRDetails?.loading ||
        loading) && <MainScreenFreezeLoader />}
      {/* {DSRDetails?.loading ? (
        <Loader02 />
      ) : ( */}
      <div>
        <div id="Anotherbox" className="formsectionx1">
          <div id="leftareax12">
            <h1 id="firstheading">{DSRData?.dsr_no}</h1>
          </div>
          <div id="buttonsdata">
            <div
              onClick={() => {
                handleChangeDSRStatus(DSRData);
              }}
              // className="mainx1"
              // className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
            >
              <p
                className={
                  DSRData?.is_invoiced == "0"
                    ? "draft"
                    : DSRData?.is_invoiced == "1"
                    ? "invoiced2"
                    : ""
                }
                style={{
                  cursor: "pointer",
                  padding: "5px 12px",
                  width: "160px",
                }}
              >
                {DSRData?.is_invoiced == "0"
                  ? "Convert To Invoice"
                  : "Invoiced"}
              </p>
            </div>
            <div className="mainx1">
                <p onClick={()=>Navigate(`/dashboard/dsr-supplier-summary?id=${DSRData?.id}`)} style={{ cursor: "pointer" }}>
                  Supplier Summary
                </p>
              </div>
            
            {DSRData?.is_invoiced == "1" && (
              <div className="mainx1">
                <p onClick={handleDownloadPDF} style={{ cursor: "pointer" }}>
                  PDF/Print
                </p>
              </div>
            )}
            {DSRData?.is_invoiced == "0" && (
              <div
                data-tooltip-content="Delete"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
                className="filtersorticos5wx2"
                onClick={() => {
                  handleDeleteDSR(DSRData);
                }}
              >
                {otherIcons.delete_svg}
              </div>
            )}
            <Link
              to={"/dashboard/dsr"}
              className="linkx3"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Close"
              data-tooltip-place="bottom"
            >
              <RxCross2 />
            </Link>
          </div>
        </div>
        <div className="formsectionsgrheigh">
          <div id="formofcreateitems">
            <form>
              <div className="relateivdiv">
                <div className="itemsformwrap">
                  <div
                    className="f1wrapofcreq"
                    style={{
                      height: "800px",
                      overflowY: "auto",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "852px" }}>
                      <div
                        className="f1wrapofcreqx1"
                        style={{ marginTop: "5px" }}
                      >
                        <div className="actionbarcommon2">
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
                                  disabled={isDisabled}
                                />
                              </span>
                            </div>
                          </div>
                          <button
                            data-tooltip-content={
                              isDisabled
                                ? "Not able to click. It is invoiced."
                                : ""
                            }
                            data-tooltip-id="my-tooltip"
                            data-tooltip-place="bottom"
                            style={{
                              cursor: isDisabled ? "not-allowed" : "pointer",
                            }}
                            className={`firstbtnc1 `}
                            onClick={handleFormSubmit2}
                          >
                            Add Passenger
                          </button>
                        </div>
                      </div>

                      <div>
                        <PassengerCard
                          passengers={DSRData}
                          onDelete={handleDeletePassenger}
                          disabled={isDisabled}
                        />
                      </div>
                    </div>

                    <DSRSummary
                      passengers={DSRData?.passengers}
                      customerData={DSRData}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
      <Toaster />
    </>
  );
};

export default DSRDetails;
