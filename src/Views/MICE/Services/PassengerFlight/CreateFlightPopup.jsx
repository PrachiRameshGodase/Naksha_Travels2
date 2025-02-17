import { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import CustomDropdown31 from "../../../../Components/CustomDropdown/CustomDropdown31";
import {
  customersList,
  customersView,
} from "../../../../Redux/Actions/customerActions";
import { vendorsLists } from "../../../../Redux/Actions/listApisActions";
import { CreatePassengerMFlightAction } from "../../../../Redux/Actions/passengerMFlightActions";
import { SubmitButton6 } from "../../../Common/Pagination/SubmitButton";
import ImageUpload from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import useFetchApiData from "../../../Helper/ComponentHelper/useFetchApiData";
import { formatDate } from "../../../Helper/DateFormat";
import {
  sendData,
  ShowMasterData,
  ShowUserMasterData,
} from "../../../Helper/HelperFunctions";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CalculationSection from "../../CalculationSection";
import "../CreateHotelPopup.scss";
import { CustomDropdown003 } from "../../../../Components/CustomDropdown/CustomDropdown03";
import { flightListAction } from "../../../../Redux/Actions/flightActions";
import Swal from "sweetalert2";
import { financialYear } from "../../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const CreateFlightPopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);

  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const customerDetail = useSelector((state) => state?.viewCustomer);
  const customerData = customerDetail?.data || {};
  const vendorList = useSelector((state) => state?.vendorList);
  const createFlight = useSelector((state) => state?.createPassengerMFlight);
  const flightListData = useSelector((state) => state?.flightList);

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [cusData2, setcusData2] = useState(null);
  const [formData, setFormData] = useState({
    mice_id: data?.id,
    passenger_id: passengerId,
    entry_type: "",
    travel_date: "",
    travel_type_id: "",
    airline_name: "",
    guest_ids: "",
    booking_date: formatDate(new Date()),
    gds_portal: "",
    ticket_no: "",
    destination_code: "",
    prn_no: "",
    route: "",
    supplier_id: "",
    supplier_name: "",
    air_line_code: "",
    //amount
    charges: [{ amount: null, account_id: null }],
    gross_amount: 0,
    discount: 0.0,
    tax_percent: null,
    tax_amount: 0.0,
    retain: null,
    supplier_amount: 0.0,
    supplier_tax: 0.0,
    customer_amount: 0.0,
    supplier_total: 0.0,
    total_amount: null,
    note: null,
    upload_image: null,
  });
  const [errors, setErrors] = useState({
    travel_date: false,
    booking_date: false,
    airline_name: false,
    air_line_code: false,
    destination_code: false,
    guest_ids: false,
    gross_amount: false,
    supplier_id: false,
    tax_amount: false,
    tax_percent: false,
    // retain: false,
    total_amount: false,
  });
  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  const entryType = ShowUserMasterData("50");
  const travelType = ShowUserMasterData("51");
  const destinationCode = ShowUserMasterData("52");
  const GDSPortal = ShowUserMasterData("53");
  const flightRoute = ShowUserMasterData("54");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFields = { [name]: value };
    if (name === "airline_name") {
      const selectedRoom = flightListData?.data?.data?.find(
        (flight) => flight?.flight_name == value
      );
      updatedFields = {
        ...updatedFields,
        airline_name: selectedRoom?.flight_name || "",
      };
    }
    if (name === "supplier_id") {
      const selectedVendor = vendorList?.data?.user?.find((item) => item?.id == value);
      updatedFields = {
        ...updatedFields,
        supplier_name: selectedVendor?.display_name || "",
      };
    }
    setFormData((prev) => ({
      ...prev,
      ...updatedFields,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      ...updatedFields,
      ...(name === "airline_name" && {
        airline_name: false, // Clear error for occupancy when room changes
        // air_line_code: false, // Clear error for meal when room changes
        // destination_code: false, // Clear error for bed
      }),
      [name]: false,
    }));
  };

  const handleChange1 = (selectedItems, name) => {
    setFormData({
      ...formData,
      guest_ids: selectedItems, // Update selected items array
    });
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };
  const handleDateChange = (date, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: formatDate(date),
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      airline_name: formData?.airline_name ? false : true,
      air_line_code: formData?.air_line_code ? false : true,
      destination_code: formData?.destination_code ? false : true,
      booking_date: formData?.booking_date ? false : true,
      travel_date: formData?.travel_date ? false : true,
      guest_ids: formData?.guest_ids ? false : true,
      gross_amount: formData?.gross_amount ? false : true,
      supplier_id: formData?.supplier_id ? false : true,

      total_amount: formData?.total_amount ? false : true,
    };
    setErrors(newErrors);
    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
      await Swal.fire({
        text: "Please fill all the required fields.",
        confirmButtonText: "OK",
      });
      return;
    } else {
      try {
        const sendData = {
          ...formData,
          guest_ids:
            formData?.guest_ids?.length === 0
              ? null
              : formData?.guest_ids?.join(", "),
          charges: JSON.stringify(formData?.charges),
        };
        const refreshData = {
          mice_id: data?.id,
        };
        dispatch(
          CreatePassengerMFlightAction(sendData, setShowModal, refreshData)
        );
      } catch (error) {
        console.error("Error updating flight:", error);
      }
    }
  };
  useEffect(() => {
    // if (flightListData?.data) {
    const queryParams = {};
    dispatch(flightListAction(queryParams));
    // }
  }, [dispatch]);
  useEffect(() => {
    if (data?.customer_id) {
      const queryParams = {
        user_id: data?.customer_id,
        fy: financialYear(),
      };
      dispatch(customersView(queryParams));
    }
  }, [dispatch, data?.customer_id]);
  // call item api on page load...
  const payloadGenerator = useMemo(() => () => ({ ...sendData }), []);
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function

  // call item api on page load...
  const isDisabled = formData?.airline_name;
  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{isEdit ? "Update Flight Service" : "Add Flight Service"}</h5>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              <RxCross2 />
            </button>
          </div>

          <div className="modal-body">
            <form>
              {/* Keep your form as it is */}
              <div className="relateivdiv">
                <div className="itemsformwrap" style={{ paddingBottom: "0px" }}>
                  <div className="f1wrapofcreq">
                    {/* <div className="f1wrapofcreqx1">
                    <div className="form_commonblock">
                      <label>
                        Entry Type<b className="color_red">*</b>
                      </label>

                      <span id="">
                        {otherIcons.name_svg}
                        <CustomDropdown04
                          label="Entry Type"
                          options={entryType}
                          value={formData?.entry_type}
                          onChange={handleChange}
                          name="entry_type"
                          defaultOption="Select Entry Type"
                          type="masters2"
                        />
                      </span>
                    </div>
                  </div> */}

                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          Booking Date<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.booking_date}
                            onChange={(date) =>
                              handleDateChange(date, "booking_date")
                            }
                            name="booking_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                            maxDate={
                              formData?.travel_date
                                ? new Date(formData.travel_date)
                                : null
                            }
                          />
                        </span>
                        {errors?.booking_date && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Booking Date
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Travel Date<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.travel_date}
                            onChange={(date) =>
                              handleDateChange(date, "travel_date")
                            }
                            name="travel_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                            minDate={
                              formData?.booking_date
                                ? new Date(formData.booking_date)
                                : null
                            }
                          />
                        </span>
                        {errors?.travel_date && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Travel Date
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>Travel Type</label>
                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="travel_type"
                            options={travelType}
                            value={formData?.travel_type_id}
                            onChange={handleChange}
                            name="travel_type_id"
                            defaultOption="Select Travel Type"
                            type="masters"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          Airline Name<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <CustomDropdown003
                            options={flightListData?.data?.data}
                            value={formData?.airline_name}
                            name="airline_name"
                            onChange={handleChange}
                            type="select_item2"
                            setItemData={setcusData2}
                            defaultOption="Select Airline Name"
                            index="0"
                            extracssclassforscjkls=""
                            itemData={cusData2}
                            ref={dropdownRef1}
                          />
                        </span>
                        {errors?.airline_name && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Airline
                          </p>
                        )}
                      </div>
                      <div

                        className="form_commonblock"
                      >
                        <label>
                          Airline Code<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <input
                              value={formData.air_line_code}
                              onChange={handleChange}
                              name="air_line_code"
                              placeholder="Enter Airline Code"
                              autoComplete="off"
                            />
                          </span>
                          {errors?.air_line_code && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Airline Code
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Destination Code<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Destination Code"
                            options={destinationCode}
                            value={formData?.destination_code}
                            onChange={handleChange}
                            name="destination_code"
                            defaultOption="Select Destination Code"
                            type="masters2"
                          // disabled={isDisabled}
                          />
                        </span>
                        {errors?.destination_code && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Destination
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          Family Member<b className="color_red">*</b>
                        </label>

                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}

                            <CustomDropdown31
                              ref={dropdownRef1}
                              label="Select Family Member"
                              options={customerData?.family_members}
                              value={formData.guest_ids}
                              onChange={(selectedItems) =>
                                handleChange1(selectedItems, "guest_ids")
                              }
                              name="guest_ids"
                              defaultOption="Select Family Member"
                              setcusData={setcusData}
                              cusData={cusData}
                              type="vendor"
                              required
                            />
                          </span>
                          {errors?.guest_ids && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Family Member
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>GDS Portal</label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <CustomDropdown04
                            label="GDS Portal"
                            options={GDSPortal}
                            value={formData?.gds_portal}
                            onChange={handleChange}
                            name="gds_portal"
                            defaultOption="Select GDS Portal"
                            type="masters2"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label> Ticket No</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <input
                              value={formData.ticket_no}
                              onChange={handleChange}
                              name="ticket_no"
                              placeholder="Enter Ticket Number"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>PRN No</label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.prn_no}
                            onChange={handleChange}
                            name="prn_no"
                            placeholder="Enter PRN No"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>Route</label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <CustomDropdown04
                            label="Route"
                            options={flightRoute}
                            value={formData?.route}
                            onChange={handleChange}
                            name="route"
                            defaultOption="Select Route"
                            type="masters2"
                          />
                        </span>
                      </div>

                      <div className="form_commonblock">
                        <label>Supplier<b className="color_red">*</b></label>
                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}

                            <CustomDropdown10
                              ref={dropdownRef1}
                              label="Select Supplier"
                              options={vendorList?.data?.user}
                              value={formData.supplier_id}
                              onChange={handleChange}
                              name="supplier_id"
                              defaultOption="Select Supplier"
                              setcusData={setcusData1}
                              cusData={cusData1}
                              type="vendor"
                              required
                            />
                          </span>
                          {errors?.supplier_id && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Supplier
                            </p>
                          )}
                        </div>

                        {/* <DeleveryAddress onSendData={handleChildData} formdatas={{ formData, setFormData }} /> */}
                      </div>

                      <div id="imgurlanddesc" className="calctotalsectionx2">
                        <ImageUpload
                          formData={formData}
                          setFormData={setFormData}
                          setFreezLoadingImg={setFreezLoadingImg}
                          imgLoader={imgLoader}
                          setImgeLoader={setImgeLoader}
                          component="purchase"
                        />
                      </div>

                      <div className="secondtotalsections485s">
                        <div className="textareaofcreatqsiform">
                          <label>Note</label>
                          <div className="show_no_of_text_limit_0121">
                            <TextAreaComponentWithTextLimit
                              formsValues={{ handleChange, formData }}
                              placeholder="Note..."
                              name="note"
                              value={formData.note == 0 ? "" : formData.note}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="secondtotalsections485s"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <CalculationSection
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Fare"
                          errors={errors}
                          setErrors={setErrors}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SubmitButton6
                onClick={handleFormSubmit}
                createUpdate={createFlight}
                setShowModal={setShowModal}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFlightPopup;
