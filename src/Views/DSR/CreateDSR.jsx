import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { customersList } from "../../Redux/Actions/customerActions";
import {
  DSRCreateAction,
  DSRDetailsAction,
  PassengerAddAction,
  PassengerDeleteActions,
} from "../../Redux/Actions/DSRActions";
import { SubmitButton5 } from "../Common/Pagination/SubmitButton";
import CurrencySelect, {
  CurrencySelect2,
} from "../Helper/ComponentHelper/CurrencySelect";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import GenerateAutoId from "../Sales/Common/GenerateAutoId";
import DSRSummary from "./DSRSummary";
import PassengerCard from "./PassengerCard";
import { getCurrencySymbol, getCurrencyValue } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const CreateDSR = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);

  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const currency = getCurrencyValue();
  const cusList = useSelector((state) => state?.customerList);
  const createDSR = useSelector((state) => state?.createDSR);
  const addPassenger = useSelector((state) => state?.addPassenger);
  const deletePassenger = useSelector((state) => state?.deletePassenger);
  const DSRDetails = useSelector((state) => state?.DSRDetails);
  const DSRData = DSRDetails?.data?.data?.data || {};

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);

  const [formData, setFormData] = useState({
    dsr_no: "",
    customer_id: "",
    customer_name: "",
    currency: currency,
  });

  const [isData, setIsData] = useState();
  const [passengerData, setPassengerData] = useState({
    dsr_id: itemId,
    customer_id: "",
    passenger_name: "",
  });
  const [errors, setErrors] = useState({
    customer_id: false,
  });
  const [showAllSequenceId, setShowAllSequenceId] = useState([]);
  const [freezLoadingImg] = useState(false);
  const [dsrDisabled, setDSRDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
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
      dsr_id: DSRData?.id,
      [name]: value,
    }));
  };

  useEffect(() => {
    const sendData = { customer_type: "Individual", status:1,active:1 };
    dispatch(customersList(sendData));
  }, [dispatch]);

  useEffect(() => {
    if (DSRData) {
      setFormData({
        ...formData,
        id: DSRData?.id,
        dsr_no: DSRData?.dsr_no,
        customer_id: DSRData?.customer_id,
        customer_name: DSRData?.customer?.display_name,
      });
    }
  }, [DSRData?.id, DSRData?.dsr_no]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      customer_id: formData?.customer_id ? false : true,
    };
    setErrors(newErrors);
    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
      return;
    } else {
      try {
        const sendData = {
          ...formData,
        };

        dispatch(DSRCreateAction(sendData, showAllSequenceId))
          .then(
            (response) => {
              // if(response?.success===true){
              setIsData(response?.data?.data);
              setDSRDisabled(true);
            }
            // }
          )
          .catch((err) => {
            console.error("Error creating DSR:", err);
          });
      } catch (error) {
        toast.error("Error update dsr:", error);
      }
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
            if (DSRData?.id) {
              const refreshData = {
                dsr_id: DSRData?.id,
              };
              dispatch(DSRDetailsAction(refreshData));
            }
          })
          .catch((err) => console.log(err));
      } catch (error) {
        toast.error("Error update passenger:", error);
      }
    }
  };
  useEffect(() => {
    if (DSRData?.id || isData?.id) {
      const sendData = {
        dsr_id: DSRData?.id || isData?.id,
      };
      dispatch(DSRDetailsAction(sendData));
      setDSRDisabled(true);
    }
  }, [DSRData?.id, isData?.id, dsrDisabled]);

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

  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg ||
          createDSR?.loading ||
          addPassenger?.loading ||
          deletePassenger?.loading ||
          DSRDetails?.loading) && <MainScreenFreezeLoader />}

        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.dsrCalender}
                {isEdit ? "Update DSR" : "New DSR"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link to="/dashboard/dsr" className="linkx3">
                <RxCross2 />
              </Link>
            </div>
          </div>

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
                    <div>
                      <div
                        className="f1wrapofcreqx1"
                        style={{ width: "868px" }}
                      >
                        <div className="form_commonblock">
                          <label>
                            DSR Number<b className="color_red">*</b>
                          </label>

                          <GenerateAutoId
                            formHandlers={{
                              setFormData,
                              handleChange,
                              setShowAllSequenceId,
                            }}
                            nameVal="dsr_no"
                            value={formData?.dsr_no}
                            module="dsr"
                            showField={DSRData?.id}
                            disable={dsrDisabled}
                            style={
                              dsrDisabled
                                ? {
                                  backgroundColor: "#f0f0f0",
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }
                                : {}
                            }
                          />
                        </div>

                        <div className="form_commonblock">
                          <label>
                            Customer Name<b className="color_red">*</b>
                          </label>
                          <div id="sepcifixspanflex">
                            <span id="">
                              {otherIcons.name_svg}
                              <CustomDropdown10
                                autoComplete="off"
                                ref={dropdownRef1}
                                label="Customer Name"
                                options={cusList?.data?.user}
                                value={formData?.customer_id}
                                onChange={handleChange}
                                name="customer_id"
                                defaultOption="Select Customer"
                                setcusData={setcusData}
                                cusData={cusData}
                                type="vendor"
                                required
                                disable={dsrDisabled}
                                style={
                                  dsrDisabled
                                    ? {
                                      backgroundColor: "#f0f0f0",
                                      pointerEvents: "none",
                                      cursor: "not-allowed",
                                    }
                                    : {}
                                }
                              />
                            </span>
                            {errors?.customer_id && (
                              <p
                                className="error_message"
                                style={{
                                  whiteSpace: "nowrap",
                                  marginBottom: "0px important",
                                }}
                              >
                                {otherIcons.error_svg}
                                Please Select Customer Name
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="f1wrapofcreqx1"
                        style={{ marginTop: "20px" }}
                      >
                        <div className="form_commonblock">
                          <CurrencySelect2
                            value={formData?.currency}
                            onChange={handleChange}
                            disable={dsrDisabled}
                            style={
                              dsrDisabled
                                ? {
                                  backgroundColor: "#f0f0f0",
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }
                                : {}
                            }
                          />
                        </div>
                      </div>

                      {dsrDisabled && (
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
                      )}

                      {dsrDisabled && (
                        <div>
                          <PassengerCard
                            passengers={DSRData}
                            onDelete={handleDeletePassenger}
                          />
                        </div>
                      )}
                    </div>

                    {dsrDisabled && (
                      <DSRSummary
                        passengers={DSRData?.passengers}
                        customerData={DSRData}
                      />
                    )}
                  </div>
                </div>
              </div>
              {
                !dsrDisabled && (
                  //  <div className="dsr_button_00z">
                  <SubmitButton5
                    isEdit=""
                    itemId=""
                    onClick={handleFormSubmit}
                    cancel="dsr"
                  />
                )
                // </div>
              }
              {/* <SubmitButton4 isEdit={isEdit} itemId={itemId} cancel="dsr" /> */}
            </form>
          </div>
        </div>

        <Toaster reverseOrder={false} />
      </>
    </div>
  );
};

export default CreateDSR;
