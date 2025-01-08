import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { customersList } from "../../Redux/Actions/customerActions";
import { SubmitButton5 } from "../Common/Pagination/SubmitButton";
import CurrencySelect from "../Helper/ComponentHelper/CurrencySelect";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import GenerateAutoId from "../Sales/Common/GenerateAutoId";
import DSRSummary from "./DSRSummary";
import PassengerCard from "./PassengerCard";
import Swal from "sweetalert2";
import Loader02 from "../../Components/Loaders/Loader02";
import TextAreaComponentWithTextLimit from "../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { preventZeroVal } from "../Helper/HelperFunctions";
import { MICECreateAction, MICEDetailsAction, PassengerAddAction, PassengerDeleteActions } from "../../Redux/Actions/MICEActions";

const CreateMICE = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);

  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

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
    currency: "",
    destination:"",
    mice_name:"",
    description:null,
  });

  const [isData, setIsData] = useState();
  const [passengerData, setPassengerData] = useState({
    mice_id:"",
    customer_id: "",
    passenger_name: "",
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
    const sendData = { customer_type: "Individual" };
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
        destination: MICEData?.destination
      });
    }
  }, [MICEData?.id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = {
        ...formData,
      };

      dispatch(MICECreateAction(sendData))
        .then((response) => {
          console.log("response?.data?.data", response?.data?.data)
          setIsData(response?.data?.data);
          setDSRDisabled(true);
        })
        .catch((err) => {
          console.error("Error creating MICE:", err);
        });
    } catch (error) {
      toast.error("Error update MICE:", error);
    }
  };

  const handleFormSubmit2 = async (e) => {
    e.preventDefault();
    const isPassengerExists = MICEData?.passengers?.some(
      (passenger) => passenger.customer_id === passengerData.customer_id
    );

    if (isPassengerExists) {
      toast.error("Passenger already added to the list.");
      return; // Prevent further execution
    }
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

  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg ||
          createMICE?.loading ||
          addPassenger?.loading ||
          deletePassenger?.loading ||MICEDetails?.loading) && <MainScreenFreezeLoader />}
        
        
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
                              formHandlers={{ setFormData,handleChange,setShowAllSequenceId,}}
                              nameVal="mice_no"
                              value={formData?.mice_no}
                              module="mice"
                              showField={MICEData?.id}
                              disable={dsrDisabled}
                              style={dsrDisabled? {backgroundColor: "#f0f0f0",pointerEvents: "none", cursor: "not-allowed",}: {}}
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
