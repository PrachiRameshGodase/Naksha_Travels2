import { useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import CustomDropdown31 from "../../Components/CustomDropdown/CustomDropdown31";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import { formatDate } from "../Helper/DateFormat";
import { sendData, ShowMasterData } from "../Helper/HelperFunctions";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import { CalculationSection2 } from "../DSR/CalculationSection";
import { customersList } from "../../Redux/Actions/customerActions";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";

const AddFlightPopup = ({ setShowModal, handleAddService }) => {
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);

  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
  const createFlight = useSelector((state) => state?.createPassengerFlight);

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [formData, setFormData] = useState({
    service_name: "Flight",
    // entry_type: "",
    travel_date: "",
    travel_type_id: "",
    airline_name: "",
    guest_ids: "",
    gds_portal: "",
    destination_code: "",
    ticket_no: "",
    prn_no: "",
    route: "",
    supplier_id: "",
    supplier_name: "",
    //amount
    // charges: null,
    gross_amount: 0,
    discount: 0.0,
    tax_percent: null,
    tax_amount: 0.0,
    total_amount: 0.0,
  });
  const [errors, setErrors] = useState({
    airline_name: false,
  });
  const entryType = ShowMasterData("50");
  const travelType = ShowMasterData("51");
  const destinationCode = ShowMasterData("52");
  const GDSPortal = ShowMasterData("53");
  const flightRoute = ShowMasterData("54");


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

  const handleChange1 = (selectedItems) => {
    setFormData({
      ...formData,
      guest_ids: selectedItems, // Update selected items array
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      airline_name: formData?.airline_name ? false : true,
    };
    setErrors(newErrors);
    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
      return;
    } else {
      const sendData = {
        ...formData,
        guest_ids:
          formData?.guest_ids?.length === 0
            ? null
            : formData?.guest_ids?.join(", "),
      };
      handleAddService("Flight", sendData);
      setShowModal(false);
    }
  };

  // call item api on page load...
  const payloadGenerator = useMemo(() => () => ({ ...sendData }), []);
  useFetchApiData(customersList, payloadGenerator, []); //call api common function
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
  // call item api on page load...

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
                        <label>Travel Date</label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.travel_date}
                            onChange={(date) =>
                              setFormData({
                                ...formData,
                                travel_date: formatDate(date),
                              })
                            }
                            name="travel_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Travel Type<b className="color_red">*</b>
                        </label>
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
                          <input
                            value={formData.airline_name}
                            onChange={handleChange}
                            name="airline_name"
                            placeholder="Enter Airline Name"
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
                              label="Select Guest"
                              options={cusList?.data?.user}
                              value={formData.guest_ids}
                              onChange={handleChange1}
                              name="guest_ids"
                              defaultOption="Select Guest"
                              setcusData={setcusData}
                              cusData={cusData}
                              type="vendor"
                              required
                            />
                          </span>
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          GDS Portal<b className="color_red">*</b>
                        </label>
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
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Route<b className="color_red">*</b>
                        </label>
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
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Supplier<b className="color_red">*</b>
                        </label>
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
                      </div>

                      <div className="secondtotalsections485s" style={{ justifyContent: "flex-end" }}>
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
