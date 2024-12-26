import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { customersList } from "../../Redux/Actions/customerActions";
import SubmitButton, {
  SubmitButton2,
  SubmitButton4,
  SubmitButton5,
} from "../Common/Pagination/SubmitButton";
import CurrencySelect from "../Helper/ComponentHelper/CurrencySelect";
import NumericInput from "../Helper/NumericInput";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import PassengerCard from "./PassengerCard";
import DSRSummary from "./DSRSummary";
import GenerateAutoId from "../Sales/Common/GenerateAutoId";
import { DSRCreateAction } from "../../Redux/Actions/DSRActions";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";

const CreateDSR = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
  const cusList = useSelector((state) => state?.customerList);
  const createDSR = useSelector((state) => state?.createDSR)

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const [formData, setFormData] = useState({
    dsr_no: "",
    customer_id: "",
    currency: "",
    // passenger_email: "",
    // passenger_mobile_no: "",
    // mobile_no: "",
    // email: "",
    // company_name: "",
    // passenger_id: "",
    // address: "",
    // customer_type: "",
    // address: null,
  });
  const [showAllSequenceId, setShowAllSequenceId] = useState([]);

  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");
  const [passengers, setPassengers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "customer_id") {
      const selectedCustomer = cusList?.data?.user?.find(
        (customer) => customer.id === value
      );

      setFormData((prev) => ({
        ...prev,
        customer_id: value,
        company_name: selectedCustomer?.company_name ?? "",
        customer_type: selectedCustomer?.customer_type ?? "",
        email: selectedCustomer?.email || "",
        mobile_no: selectedCustomer?.mobile_no ?? "",
        address: selectedCustomer?.address ?? "",
        [name]: value,
      }));
    } else if (name === "passenger_id") {
      const selectedCustomer = cusList?.data?.user?.find(
        (customer) => customer.id === value
      );

      setFormData((prev) => ({
        ...prev,
        passenger_id: value,
        passenger_email: selectedCustomer?.email ?? "",

        passenger_mobile_no: selectedCustomer?.mobile_no ?? "",
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const sendData = { customer_type: "Individual" };

    dispatch(customersList(sendData));
  }, [dispatch]);

  // useEffect(() => {
  //   if (itemId && isEdit && hotelData) {
  //     setFormData({
  //       ...formData,
  //       id: hotelData?.id,
  //       hotel_type: hotelData?.hotel_type,
  //       hotel_name: hotelData?.hotel_name,
  //       address_line_1: hotelData?.address_line_1,
  //       address_line_2: hotelData?.address_line_2,
  //       country_id: hotelData?.country_id,
  //       state_id: hotelData?.state_id,
  //       city_id: hotelData?.city_id,
  //       pin_code: hotelData?.pin_code,
  //       status: hotelData?.status,
  //       ratings: hotelData?.ratings,
  //       upload_documents: hotelData?.upload_documents
  //         ? JSON.parse(hotelData.upload_documents)
  //         : [],
  //     });
  //   }
  // }, [itemId, isEdit, hotelData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = {
        ...formData,
      };
      setIsDisabled(true);
      dispatch(DSRCreateAction(sendData, showAllSequenceId));
      setIsDisabled(false)
    } catch (error) {
      toast.error("Error update dsr:", error);
    }
  };
  const handleAddPassenger = () => {
    // Find the selected passenger from the list to add their details
    const selectedPassenger = cusList?.data?.user?.find(
      (customer) => customer.id === formData.passenger_id
    );

    setPassengers((prev) => [
      ...prev,
      {
        id: formData.passenger_id,
        name: selectedPassenger?.company_name,
        email: formData.passenger_email,
        mobile: formData.passenger_mobile_no,
      },
    ]);

    // Reset passenger-related fields after adding
    setFormData((prev) => ({
      ...prev,
      passenger_id: "",
      passenger_email: "",
      passenger_mobile_no: "",
    }));
  };

  const handleDeletePassenger = (id) => {
    setPassengers((prev) => prev.filter((passenger) => passenger.id !== id));
  };
  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg || createDSR?.loading) && (
          <MainScreenFreezeLoader />
        )}
        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.dsrCalender}
                {isEdit ? "Update DSR" : "New DSR"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link to={"/dashboard/dsr"} className="linkx3">
                <RxCross2 />
              </Link>
            </div>
          </div>

          <div id="formofcreateitems">
            <form onSubmit={handleFormSubmit}>
              <div className="relateivdiv">
                <div className="itemsformwrap">
                  <div
                    className="f1wrapofcreq"
                    style={{ height: "800px", overflowY: "auto", flexDirection: "row", justifyContent: "space-between" }}
                  >
                    <div>
                      <div className="f1wrapofcreqx1" >
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
                            nameVal="dsr_id"
                            value={formData?.dsr_id}
                            module="dsr"
                            showField={isEdit}
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
                              />
                            </span>
                          </div>
                        </div>

                      </div>
                      <div className="f1wrapofcreqx1" style={{ marginTop: "20px" }}>
                        <div className="form_commonblock">
                          <CurrencySelect
                            value={formData?.currency}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="f1wrapofcreqx1" style={{ marginTop: "5px" }}>
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
                                  value={formData.passenger_id}
                                  onChange={handleChange}
                                  name="passenger_id"
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
                            onClick={handleAddPassenger}
                          >
                            Add Passenger
                          </button>
                        </div>
                      </div>

                      <div>
                        <PassengerCard
                          passengers={passengers}
                          onDelete={handleDeletePassenger}
                        />
                      </div>
                    </div>


                    {/* DSR summery */}
                    <DSRSummary passengers={passengers} customerData={formData} />

                  </div>

                </div>



              </div>
              <SubmitButton4 isEdit={isEdit} itemId={itemId} cancel="dsr" />
            </form>
          </div>
        </div>
        <Toaster reverseOrder={false} />
      </>
    </div >
  );
};

export default CreateDSR;
