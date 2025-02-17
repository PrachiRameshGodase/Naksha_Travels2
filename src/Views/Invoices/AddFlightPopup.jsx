import { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CustomDropdown003 } from "../../Components/CustomDropdown/CustomDropdown03";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import CustomDropdown31 from "../../Components/CustomDropdown/CustomDropdown31";
import { customersList } from "../../Redux/Actions/customerActions";
import { flightListAction } from "../../Redux/Actions/flightActions";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import { CalculationSection2 } from "../DSR/CalculationSection";
import "../DSR/Services/CreateHotelPopup.scss";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import { formatDate } from "../Helper/DateFormat";
import {sendData,ShowUserMasterData} from "../Helper/HelperFunctions";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";

const AddFlightPopup = ({ setShowModal, handleAddService, edit_data, section }) => {
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);
  const { discount, discount_type, gross_amount, item_id, item_name, rate, tax_rate, service_data } = edit_data

  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
  const createFlight = useSelector((state) => state?.createPassengerFlight);
  const flightListData = useSelector((state) => state?.flightList);

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [cusData2, setcusData2] = useState(null);

  const toArry = service_data?.guest_ids?.split(",")?.map(Number);
  const [formData, setFormData] = useState({
    service_name: "Flights",
    travel_date: service_data?.travel_date || "",  // Example for travel_date
    booking_date: formatDate(new Date()),  // Current date
    travel_type_id: service_data?.travel_type_id || "",  // Example for travel_type_id
    airline_name: service_data?.airline_name || "",  // Example for airline_name
    air_line_code: service_data?.air_line_code || "",  // Example for air_line_code
    guest_ids: toArry || "",  // Example for guest_ids
    gds_portal: service_data?.gds_portal || "",  // Example for gds_portal
    destination_code: service_data?.destination_code || "",  // Example for destination_code
    ticket_no: service_data?.ticket_no || "",  // Example for ticket_no
    prn_no: service_data?.prn_no || "",  // Example for prn_no
    route: service_data?.route || "",  // Example for route
    supplier_id: service_data?.supplier_id || "",  // Example for supplier_id
    supplier_name: service_data?.supplier_name || "",  // Example for supplier_name
    gross_amount: gross_amount || 0,  // Use `gross_amount` if passed or default to 0
    discount: discount || 0.0,  // Default value for discount
    tax_percent: tax_rate || null,  // Use `tax_rate` or default to null
    tax_amount: 0.0,  // Default value for tax_amount
    total_amount: 0.0,  // Default value for total_amount
  });
 
 const [errors, setErrors] = useState({
    travel_date: false,
    booking_date: false,
    airline_name: false,
    air_line_code: false,
    destination_code: false,
    ticket_no: false,
    prn_no: false,
    guest_ids: false,
  });
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
        // air_line_code: selectedRoom?.air_line_code || "",
        // destination_code: selectedRoom?.destination_code || "",
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      airline_name: formData?.airline_name ? false : true,
      air_line_code: formData?.air_line_code ? false : true,
      destination_code: formData?.destination_code ? false : true,
      booking_date: formData?.booking_date ? false : true,
      travel_date: formData?.travel_date ? false : true,
      ticket_no: formData?.ticket_no ? false : true,
      prn_no: formData?.prn_no ? false : true,
      guest_ids: formData?.guest_ids ? false : true,
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
      const sendData = {
        ...formData,
        guest_ids:
          formData?.guest_ids?.length === 0
            ? null
            : formData?.guest_ids?.join(", "),
      };
      handleAddService(sendData);
      setShowModal(false);
    }
  };
  useEffect(() => {
    // if (flightListData?.data) {
    const queryParams = {};
    dispatch(flightListAction(queryParams));
    // }
  }, [dispatch]);

  // call item api on page load...
  const payloadGenerator = useMemo(() => () => ({ ...sendData }), []);
  useFetchApiData(customersList, payloadGenerator, []); //call api common function
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
  // call item api on page load...
  const isDisabled = formData?.airline_name;
  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add Flight Service</h5>
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
                            minDate={formData.booking_date}

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
                            Please Fill Airline Name
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
                          Passenger<b className="color_red">*</b>
                        </label>
                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}
                            <CustomDropdown31
                              ref={dropdownRef1}
                              label="Select Passenger"
                              options={cusList?.data?.user}
                              value={formData.guest_ids}
                              onChange={(selectedItems) =>
                                handleChange1(selectedItems, "guest_ids")
                              }
                              name="guest_ids"
                              defaultOption="Select Passenger"
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
                              Please Select Passenger
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
                        <label>
                          {" "}
                          Ticket No<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <input
                              value={formData.ticket_no}
                              onChange={handleChange}
                              name="ticket_no"
                              placeholder="Enter Ticket Number"
                              autoComplete="off"
                            />
                          </span>
                          {errors?.ticket_no && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Ticket No
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          PRN No<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.prn_no}
                            onChange={handleChange}
                            name="prn_no"
                            placeholder="Enter PRN No"
                            autoComplete="off"
                          />
                        </span>
                        {errors?.prn_no && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill PRN No
                          </p>
                        )}
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

                     {section !="sales" && <div className="form_commonblock">
                        <label>Supplier</label>
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
                        </div>
                      </div>}

                      <div
                        className="secondtotalsections485s"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <CalculationSection2
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Flight"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SubmitButton6
                onClick={handleFormSubmit}
                createUpdate=""
                setShowModal={setShowModal}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFlightPopup;
