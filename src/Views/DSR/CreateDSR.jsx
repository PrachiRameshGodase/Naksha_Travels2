import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import {
  SubmitButton5,
} from "../Common/Pagination/SubmitButton";
import CurrencySelect from "../Helper/ComponentHelper/CurrencySelect";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import GenerateAutoId from "../Sales/Common/GenerateAutoId";
import DSRSummary from "./DSRSummary";
import PassengerCard from "./PassengerCard";

const CreateDSR = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);

  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const cusList = useSelector((state) => state?.customerList);
  const createDSR = useSelector((state) => state?.createDSR);
  const DSRDetails = useSelector((state) => state?.DSRDetails);
  const DSRData = DSRDetails?.data?.data?.data || {};


  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);

  const [formData, setFormData] = useState({
    dsr_no: "",
    customer_id: "",
    customer_name: "",
    currency: "",
  });
  const [isData, setIsData] = useState();
  const [passengerData, setPassengerData] = useState({
    dsr_id: itemId,
    customer_id: "",
    passenger_name: "",
  });

  const [showAllSequenceId, setShowAllSequenceId] = useState([]);

  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [dsrDisabled, setDSRDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
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
      dsr_id: isData?.id,
      [name]: value,
    }));
  };
  useEffect(() => {
    const sendData = { customer_type: "Individual" };

    dispatch(customersList(sendData));
  }, [dispatch]);

  useEffect(() => {
    if (itemId && DSRData) {
      setFormData({
        ...formData,
        id: DSRData?.id,
        dsr_no: DSRData?.dsr_no,
        customer_id: DSRData?.customer_id,
        customer_name: DSRData?.customer?.display_name,
      });
    }
  }, [itemId, DSRData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = {
        ...formData,
      };

      dispatch(DSRCreateAction(sendData))
        .then((response) => {
          setIsData(response?.data?.data);
          setDSRDisabled(true);
        })
        .catch((err) => {
          console.error("Error creating DSR:", err);
        });
    } catch (error) {
      toast.error("Error update dsr:", error);
    }
  };

  const handleFormSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const sendData = {
        ...passengerData,
      };

      dispatch(PassengerAddAction(sendData, Navigate))
        .then((response) => {
          if (isData?.id) {
            const refreshData = {
              dsr_id: isData?.id,
            };
            dispatch(DSRDetailsAction(refreshData));
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      toast.error("Error update passenger:", error);
    }
  };
  useEffect(() => {
    if (isData?.id) {
      const sendData = {
        dsr_id: isData?.id,
      };
      dispatch(DSRDetailsAction(sendData));
    }
  }, [isData?.id]);

  const handleDeletePassenger = (id) => {
    const sendData = {
      passenger_id: id,
    };
    dispatch(PassengerDeleteActions(sendData))
      .then((response) => {
        if (isData?.id) {
          const refreshData = {
            dsr_id: isData?.id,
          };
          dispatch(DSRDetailsAction(refreshData));
        }
      })
      .catch((err) => console.log(err));
  };
  const handleIconClick = () => {
    if (isData?.id) {
      const sendData = { dsr_id: isData?.id };
      dispatch(DSRDetailsAction(sendData));
    }
    Navigate("/dashboard/dsr");
  }
  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg || createDSR?.loading) && <MainScreenFreezeLoader />}
        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.dsrCalender}
                {isEdit ? "Update DSR" : "New DSR"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link onClick={handleIconClick} className="linkx3">
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
                      <div className="f1wrapofcreqx1" style={{ width: "868px" }}>
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
                            showField={isEdit}
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
                                value={formData.customer_id}
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
                          </div>
                        </div>
                      </div>
                      <div
                        className="f1wrapofcreqx1"
                        style={{ marginTop: "20px" }}
                      >
                        <div className="form_commonblock">
                          <CurrencySelect
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

                      <div className="dsr_button_00z">
                        <SubmitButton5
                          isEdit=""
                          itemId=""
                          onClick={handleFormSubmit}
                        />
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

                      {dsrDisabled && <div>
                        <PassengerCard
                          passengers={DSRData}
                          onDelete={handleDeletePassenger}
                        />
                      </div>}
                    </div>

                    {dsrDisabled && <DSRSummary
                      passengers={DSRData?.passengers}
                      customerData={DSRData}
                    />}
                  </div>
                </div>
              </div>
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
