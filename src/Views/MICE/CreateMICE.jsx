import React, { useEffect, useMemo, useRef, useState } from "react";
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
  MICECreateAction,
  MICEDetailsAction,
  PassengerAddAction,
  PassengerDeleteActions,
} from "../../Redux/Actions/MICEActions";
import { SubmitButton5 } from "../Common/Pagination/SubmitButton";
import { CurrencySelect2 } from "../Helper/ComponentHelper/CurrencySelect";
import TextAreaComponentWithTextLimit from "../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { preventZeroVal } from "../Helper/HelperFunctions";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import GenerateAutoId from "../Sales/Common/GenerateAutoId";
import DSRSummary from "./DSRSummary";
import PassengerCard from "./PassengerCard";
import { getCurrencyValue } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import { currencyRateListAction } from "../../Redux/Actions/manageCurrencyActions";
import { formatDate } from "../Helper/DateFormat";
import { confirIsCurrencyCreate } from "../Helper/ConfirmHelperFunction/ConfirmWithZeroAmount";

const CreateMICE = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);

  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const currency = getCurrencyValue();
  const currencyRateList = useSelector((state) => state?.currencyRateList);
  const currencyList = currencyRateList?.data?.data || []

  const cusList = useSelector((state) => state?.customerList);
  const createMICE = useSelector((state) => state?.createMICE);
  const addPassenger = useSelector((state) => state?.addPassenger);
  const deletePassenger = useSelector((state) => state?.deletePassenger);
  const MICEDetails = useSelector((state) => state?.MICEDetails);
  const MICEData = MICEDetails?.data?.data?.data || {};

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);

  const [formData, setFormData] = useState({
    mice_no: "",
    customer_id: "",
    customer_name: "",
    currency: currency,
    destination: "",
    mice_name: "",
    description: null,
    transaction_date: formatDate(new Date())
    
  });

  const [isData, setIsData] = useState();
  const [passengerData, setPassengerData] = useState({
    mice_id: "",
    customer_id: "",
    passenger_name: "",
  });

  const [errors, setErrors] = useState({
    customer_id: false,
  });

  const [showAllSequenceId, setShowAllSequenceId] = useState([]);
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
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
      mice_id: MICEData?.id,
      [name]: value,
    }));
  };

  useEffect(() => {
    const sendData = { active:1, status:1 };
    dispatch(customersList(sendData));
  }, [dispatch]);

  useEffect(() => {
    if (MICEData) {
      setFormData({
        ...formData,
        id: MICEData?.id,
        mice_no: MICEData?.mice_no,
        customer_id: MICEData?.customer_id,
        customer_name: MICEData?.customer?.display_name,
        destination: MICEData?.destination,
      });
    }
  }, [MICEData?.id]);

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

        dispatch(MICECreateAction(sendData))
          .then((response) => {
            if (response?.data?.data?.id) {
              // Store the ID in localStorage
              localStorage.setItem("miceId", response.data.data.id);
              setIsData(response.data.data);
              setDSRDisabled(true);
            }
          })
          .catch((err) => {
            console.error("Error creating MICE:", err);
          });
      } catch (error) {
        toast.error("Error update MICE:", error);
      }
    }
  };

  const handleFormSubmit2 = async (e) => {
    e.preventDefault();

    const isPassengerExists = MICEData?.passengers?.some(
      (passenger) => passenger.customer_id === passengerData.customer_id
    );

    if (!passengerData?.customer_id) {
      toast.error("Please Select Passenger");
      return;
    } else if (isPassengerExists) {
      toast.error("Passenger already added to the list.");
      return;
    } else {
      try {
        const sendData = {
          ...passengerData,
        };

        dispatch(PassengerAddAction(sendData, Navigate))
          .then((response) => {
            if (MICEData?.id) {
              const refreshData = {
                mice_id: MICEData?.id,
              };
              dispatch(MICEDetailsAction(refreshData));
            }
          })
          .catch((err) => console.log(err));
      } catch (error) {
        toast.error("Error update passenger:", error);
      }
    }
  };

  useEffect(() => {
    if (MICEData?.id || isData?.id) {
      const sendData = {
        mice_id: MICEData?.id || isData?.id,
      };
      dispatch(MICEDetailsAction(sendData));
      setDSRDisabled(true);
    }
  }, [MICEData?.id, isData?.id]);

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
          if (MICEData?.id) {
            const refreshData = {
              mice_id: MICEData?.id,
            };
            dispatch(MICEDetailsAction(refreshData));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleIconClick = () => {
    if (MICEData?.id) {
      const sendData = { mice_id: MICEData?.id };
      dispatch(MICEDetailsAction(sendData));
    }
    Navigate("/dashboard/mice");
  };

  // for fetch the currencies list of selected date
const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
  date: formData?.transaction_date,
}), [formData?.transaction_date]);

useFetchApiData(currencyRateListAction, payloadGenerator, [formData?.transaction_date]);

const checkIsCurrencyCreated = async () => {
    let confirmed = null;

    const checkIsCurrencyCreated = currencyList?.find(val => val?.code === formData?.currency);
 
    if (checkIsCurrencyCreated) {
        toast.success(`Current Rate is ${checkIsCurrencyCreated?.current_rate} ${checkIsCurrencyCreated?.current_rate} and Exchange rate is ${checkIsCurrencyCreated?.exchange_rate}`)
    } else {
        confirmed = await confirIsCurrencyCreate();
        if (confirmed) {
            const queryParams = new URLSearchParams();
            queryParams.set("date", formData?.transaction_date);
            queryParams.set("currency", formData?.currency);
            Navigate(`/dashboard/manage-currency?${queryParams.toString()}`);
        }


    }
}

// Using useRef to store the previous value of formData.currency because this useEffect not call on load
const prevCurrency = useRef(formData?.currency);

useEffect(() => {
    // Only call checkIsCurrencyCreated when formData?.currency changes and is different from the previous value
    if (formData?.currency !== prevCurrency.current) {
        checkIsCurrencyCreated();

        // Update the ref to the new currency
        prevCurrency.current = formData?.currency;
    }
}, [formData?.currency]); // Dependency on formData.currency

useEffect(() => {
  const miceId = localStorage.getItem("miceId");
  if (miceId) {
    const refreshData = {
      mice_id: miceId,
    };
    dispatch(MICEDetailsAction(refreshData));
  }
}, [dispatch]);
  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg ||
          createMICE?.loading ||
          addPassenger?.loading ||
          deletePassenger?.loading ||
          MICEDetails?.loading) && <MainScreenFreezeLoader />}

        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.dsrCalender}
                {isEdit ? "Update MICE" : "New MICE"}
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
                      // width: "868px",
                      height: "800px",
                      overflowY: "auto",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "868px" }}>
                      <div
                        className="f1wrapofcreqx1"
                        style={{ width: "868px" }}
                      >
                        <div className="form_commonblock">
                          <label>
                            MICE Number<b className="color_red">*</b>
                          </label>

                          <GenerateAutoId
                            formHandlers={{
                              setFormData,
                              handleChange,
                              setShowAllSequenceId,
                            }}
                            nameVal="mice_no"
                            value={formData?.mice_no}
                            module="mice"
                            showField={MICEData?.id}
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
                          <label>MICE Name</label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.quotation_icon}
                              <input
                                autoComplete="off"
                                type="text"
                                name="mice_name"
                                placeholder="MICE Name"
                                value={formData?.mice_name}
                                onChange={(e) => handleChange(e)}
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
                        <div className="form_commonblock">
                          <label>Destination</label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.quotation_icon}
                              <input
                                autoComplete="off"
                                type="text"
                                name="destination"
                                placeholder="Destination"
                                value={formData?.destination}
                                onChange={(e) => handleChange(e)}
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
                        <div className="secondtotalsections485s ">
                          <div className="textareaofcreatqsiform">
                            <label>Description</label>
                            <div className="show_no_of_text_limit_0121">
                              <TextAreaComponentWithTextLimit
                                formsValues={{ handleChange, formData }}
                                placeholder="Description..."
                                name="description"
                                value={preventZeroVal(formData?.description)}
                              />
                            </div>
                          </div>
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
                            passengers={MICEData}
                            onDelete={handleDeletePassenger}
                          />
                        </div>
                      )}
                    </div>

                    {dsrDisabled && (
                      <DSRSummary
                        passengers={MICEData?.passengers}
                        customerData={MICEData}
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
                    cancel="mice"
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

export default CreateMICE;
