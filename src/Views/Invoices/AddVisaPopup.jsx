import { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import { customersList } from "../../Redux/Actions/customerActions";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import { formatDate } from "../Helper/DateFormat";
import {
  sendData,
  ShowMasterData,
  ShowUserMasterData,
} from "../Helper/HelperFunctions";
import NumericInput from "../Helper/NumericInput";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import CalculationSection, {
  CalculationSection2,
} from "../DSR/CalculationSection";
import Swal from "sweetalert2";
import { CustomDropdown029 } from "../../Components/CustomDropdown/CustomDropdown29";
import { visaListAction } from "../../Redux/Actions/visaAction";

const AddVisaPopup = ({ setShowModal, handleAddService, edit_data }) => {
  const {
    discount,
    discount_type,
    gross_amount,
    item_id,
    item_name,
    rate,
    tax_rate,
    service_data,
  } = edit_data;

  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);

  const cusList = useSelector((state) => state?.customerList);
  const visaListData = useSelector((state) => state?.visaList?.data?.data);
  const createVisa = useSelector((state) => state?.createPassengerVisa);
  const vendorList = useSelector((state) => state?.vendorList);

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [cusData2, setcusData2] = useState(null);
  const [cusData3, setcusData3] = useState(null);
  const [cusData4, setcusData4] = useState(null);
  const [cusData5, setcusData5] = useState(null);

  const [formData, setFormData] = useState({
    service_name: "Visa",
    passenger_visa_id: service_data?.passenger_visa_id || "", // Example for passenger_visa_id
    passport_no: service_data?.passport_no || "", // Example for passport_no
    dob: service_data?.dob || "", // Example for date of birth
    guest_ids: "", // Example for guest_ids
    email: service_data?.email || "", // Example for email
    visa_no: service_data?.visa_no || "", // Example for visa_no
    visa_type_id: service_data?.visa_type_id || "", // Example for visa_type_id
    visa_entry_type: service_data?.visa_entry_type || "", // Example for visa_entry_type
    country_id: service_data?.country_id || "", // Example for country_id
    issue_date: service_data?.issue_date || "", // Example for issue_date
    expiry_date: service_data?.expiry_date || "", // Example for expiry_date
    days: service_data?.days || "", // Example for days
    supplier_id: service_data?.supplier_id || "", // Example for supplier_id
    supplier_name: service_data?.supplier_name || "", // Example for supplier_name

    // Amount fields
    gross_amount: gross_amount || 0, // Gross amount if provided
    discount: 0.0, // Discount default to 0.0
    tax_percent: tax_rate || null, // Tax rate if provided or null
    tax_amount: 0.0, // Default tax amount
    total_amount: 0.0, // Default total amount
  });

  const [errors, setErrors] = useState({
    passenger_visa_id: false,
    passport_no: false,
    dob: false,
    email: false,
    guest_ids: false,
    visa_type_id: false,
    visa_entry_type: false,
    country_id: false,
    issue_date: false,
    visa_no: false,
    expiry_date: false,
    days: false,
  });

  const [storeEntry, setStoreEntry] = useState([]);
  const [storeVisaType, setStoreVisaType] = useState([]);

  useEffect(() => {
    if (service_data?.country_id) {
      dispatch(visaListAction({ country_id: service_data?.country_id })).then(
        (res) => {
          setStoreEntry(res);
        }
      );
    }
  }, [service_data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFields = { [name]: value };
    let selectedVisaData = null;
    if (name === "country_id") {
      selectedVisaData = visaListData?.find(
        (item) => item?.country_id === value
      );
      if (selectedVisaData) {
        dispatch(
          visaListAction({ country_id: selectedVisaData?.country_id })
        ).then((res) => {
          setStoreEntry(res);
        });
        // Reset dependent fields when country changes
        setFormData((prev) => ({
          ...prev,
          country_id: value,
          visa_entry_type: "",
          visa_type_id: "",
          days: "",
          gross_amount: "",
        }));
      }
    } else if (name === "visa_entry_type") {
      if (!formData?.country_id) {
        toast.error("Please select a country first.");
        return;
      }
      selectedVisaData = visaListData?.find(
        (item) =>
          item?.visa_entry_type == value &&
          item?.country_id === formData?.country_id
      );
      if (selectedVisaData) {
        dispatch(
          visaListAction({
            country_id: selectedVisaData?.country_id,
            visa_entry_type: selectedVisaData?.visa_entry_type,
          })
        ).then((res) => {
          setStoreVisaType(res);
        });
        setFormData((prev) => ({
          ...prev,
          visa_entry_type: value,
          visa_type_id: "",
          days: "",
          gross_amount: "",
        }));
      }
    } else if (name === "visa_type_id") {
      if (!formData?.country_id) {
        toast.error("Please select a country first.");
        return;
      }
      if (!formData?.visa_entry_type) {
        toast.error("Please select a visa entry type first.");
        return;
      }
      selectedVisaData = visaListData?.find(
        (item) =>
          item?.visa_type_id == value &&
          item?.visa_entry_type == formData?.visa_entry_type &&
          item?.country_id === formData?.country_id
      );
      if (selectedVisaData) {
        dispatch(
          visaListAction({
            country_id: selectedVisaData?.country_id,
            visa_entry_type: selectedVisaData?.visa_entry_type,
            visa_type_id: selectedVisaData?.visa_type_id,
          })
        );
        setFormData((prev) => ({
          ...prev,
          visa_type_id: value,
          days: "",
          gross_amount: "",
        }));
      }
    } else if (name === "days") {
      if (!formData?.country_id) {
        toast.error("Please select a country first.");
        return;
      }
      if (!formData?.visa_entry_type) {
        toast.error("Please select a visa entry type first.");
        return;
      }
      if (!formData?.visa_type_id) {
        toast.error("Please select a visa type first.");
        return;
      }

      selectedVisaData = visaListData?.find(
        (item) =>
          item?.days == value &&
          item?.visa_type_id == formData?.visa_type_id &&
          item?.visa_entry_type == formData?.visa_entry_type &&
          item?.country_id === formData?.country_id
      );

      updatedFields = {
        ...updatedFields,
        country_id: selectedVisaData?.country_id || "",
        visa_entry_type: selectedVisaData?.visa_entry_type || "",
        visa_type_id: selectedVisaData?.visa_type_id || "",
        days: selectedVisaData?.days || "",
        gross_amount: selectedVisaData?.price || "",
      };
    }
    if (name === "supplier_id") {
      const selectedHotel = vendorList?.data?.user?.find(
        (item) => item?.id == value
      );
      updatedFields = {
        ...updatedFields,
        supplier_name: selectedHotel?.display_name || "",
      };
    }
    // Update form state with the new data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...updatedFields,
    }));

    // Clear errors for the field
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
      passenger_visa_id: formData?.passenger_visa_id ? false : true,
      passport_no: formData?.passport_no ? false : true,
      dob: formData?.dob ? false : true,
      email: formData?.email ? false : true,
      visa_type_id: formData?.visa_type_id ? false : true,
      visa_entry_type: formData?.visa_entry_type ? false : true,
      country_id: formData?.country_id ? false : true,
      issue_date: formData?.issue_date ? false : true,
      expiry_date: formData?.expiry_date ? false : true,
      visa_no: formData?.visa_no ? false : true,
      days: formData?.days ? false : true,
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

  // call item api on page load...
  const payloadGenerator = useMemo(() => () => ({ ...sendData }), []);
  useFetchApiData(customersList, payloadGenerator, []); //call api common function
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function

  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add Visa Service</h5>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              <RxCross2 />
            </button>
          </div>

          <div className="modal-body">
            <form>
              <div className="relateivdiv">
                <div className="itemsformwrap" style={{ paddingBottom: "0px" }}>
                  <div className="f1wrapofcreq">
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          Passenger<b className="color_red">*</b>
                        </label>

                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}
                            <CustomDropdown10
                              autoComplete="off"
                              ref={dropdownRef1}
                              label="Customer Name"
                              options={cusList?.data?.user}
                              value={formData.passenger_visa_id}
                              onChange={handleChange}
                              name="passenger_visa_id"
                              defaultOption="Select Passenger"
                              setcusData={setcusData}
                              cusData={cusData}
                              type="vendor"
                              required
                            />
                          </span>
                          {errors?.passenger_visa_id && (
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
                        <label>
                          Country / Region<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.country_svg}
                            <CustomDropdown029
                              autoComplete="off"
                              ref={dropdownRef1}
                              label="Country"
                              options={visaListData}
                              value={formData.country_id}
                              onChange={handleChange}
                              name="country_id"
                              defaultOption="Select Country"
                              setcusData={setcusData1}
                              cusData={cusData1}
                              type="countryList"
                              required
                            />
                          </span>
                          {errors?.country_id && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Country
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        className={`form_commonblock ${
                          formData?.country_id ? "" : "disabledfield"
                        }`}
                        data-tooltip-content={
                          formData?.country_id
                            ? ""
                            : "Please Select Country First"
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                      >
                        <label>
                          Visa Entry Type<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}

                          <CustomDropdown029
                            autoComplete="off"
                            ref={dropdownRef1}
                            label="Select Visa Entry Type"
                            options={storeEntry}
                            value={formData.visa_entry_type}
                            onChange={handleChange}
                            name="visa_entry_type"
                            defaultOption="Select Visa Entry Type"
                            setcusData={setcusData2}
                            cusData={cusData2}
                            type="visa_entry_type"
                            disabled={!formData?.country_id}
                          />
                        </span>
                        {errors?.visa_entry_type && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Visa Entry Type
                          </p>
                        )}
                      </div>
                      <div
                        className={`form_commonblock ${
                          formData?.visa_entry_type ? "" : "disabledfield"
                        }`}
                        data-tooltip-content={
                          formData?.visa_entry_type
                            ? ""
                            : "Please Select Visa Entry Type First"
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                      >
                        <label>
                          Visa Type<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown029
                            autoComplete="off"
                            ref={dropdownRef1}
                            label="Select Visa Type"
                            options={storeVisaType}
                            value={formData?.visa_type_id}
                            onChange={handleChange}
                            name="visa_type_id"
                            defaultOption="Select Visa Type"
                            setcusData={setcusData3}
                            cusData={cusData3}
                            type="visa_type_id"
                            disabled={!formData?.visa_entry_type}
                          />
                        </span>
                        {errors?.visa_type_id && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Visa Type
                          </p>
                        )}
                      </div>
                      <div
                        className={`form_commonblock ${
                          formData?.visa_type_id ? "" : "disabledfield"
                        }`}
                        data-tooltip-content={
                          formData?.visa_type_id
                            ? ""
                            : "Please Select Visa Type First"
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                      >
                        <label>
                          Days<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <CustomDropdown029
                              autoComplete="off"
                              ref={dropdownRef1}
                              label="Days"
                              options={visaListData}
                              value={formData?.days}
                              onChange={handleChange}
                              name="days"
                              defaultOption="Select Days"
                              setcusData={setcusData4}
                              cusData={cusData4}
                              type="days"
                              disabled={!formData?.visa_type_id}
                            />
                          </span>
                          {errors?.days && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Days
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="form_commonblock">
                        <label>
                          Passport No<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.passport_no}
                            onChange={handleChange}
                            name="passport_no"
                            placeholder="Enter Passport No"
                            autoComplete="off"
                          />
                        </span>
                        {errors?.passport_no && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Passport No
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock ">
                        <label>
                          Date Of Birth<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.dob}
                            onChange={(date) => handleDateChange(date, "dob")}
                            name="dob"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                            minDate={
                              new Date(new Date().getFullYear() - 50, 0, 1)
                            } // Start 50 years in the past
                            maxDate={
                              new Date(new Date().getFullYear() + 50, 11, 31)
                            } // End 50 years in the future
                            showYearDropdown // Enables the year dropdown
                            scrollableYearDropdown // Allows scrolling in the year dropdown
                            yearDropdownItemNumber={101}
                          />
                        </span>
                        {errors?.dob && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Date
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Email<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                          />
                        </span>
                        {errors?.email && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Email
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Visa No<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.visa_no}
                            onChange={handleChange}
                            name="visa_no"
                            placeholder="Enter Visa No"
                            autoComplete="off"
                          />
                        </span>
                        {errors?.visa_no && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Visa No
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock ">
                        <label>
                          Issue Date<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.issue_date}
                            onChange={(date) =>
                              handleDateChange(date, "issue_date")
                            }
                            name="issue_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                            minDate={
                              new Date(new Date().getFullYear() - 50, 0, 1)
                            } // Minimum date: 50 years ago
                            maxDate={
                              formData?.expiry_date
                                ? new Date(formData.expiry_date) // Max date: Expiry Date (if set)
                                : new Date(
                                    new Date().getFullYear() + 50,
                                    11,
                                    31
                                  ) // Default max date: 50 years in the future
                            }
                            showYearDropdown // Enables the year dropdown
                            scrollableYearDropdown // Allows scrolling in the year dropdown
                            yearDropdownItemNumber={101}
                          />
                        </span>
                        {errors?.issue_date && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Issue Date
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock ">
                        <label>
                          Expiry Date<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.expiry_date}
                            onChange={(date) =>
                              handleDateChange(date, "expiry_date")
                            }
                            name="expiry_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                            minDate={
                              formData?.issue_date
                                ? new Date(formData.issue_date) // Min date: Issue Date (if set)
                                : new Date(new Date().getFullYear() - 50, 0, 1) // Default min date: 50 years ago
                            }
                            maxDate={
                              new Date(new Date().getFullYear() + 50, 11, 31)
                            } // Max date: 50 years in the future
                            showYearDropdown // Enables the year dropdown
                            scrollableYearDropdown // Allows scrolling in the year dropdown
                            yearDropdownItemNumber={101}
                          />
                        </span>
                        {errors?.expiry_date && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Expiry Date
                          </p>
                        )}
                      </div>
                      {/* <div className="form_commonblock">
                        <label>
                          Guest Name<b className="color_red">*</b>
                        </label>

                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}

                            <CustomDropdown31
                              ref={dropdownRef1}
                              label="Select Guest"
                              options={cusList?.data?.user}
                              value={formData.guest_ids}
                              onChange={(selectedItems) =>
                                handleChange1(selectedItems, "guest_ids")
                              }
                              name="guest_ids"
                              defaultOption="Select Guest"
                              setcusData={setcusData2}
                              cusData={cusData2}
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
                              Please Select Guest
                            </p>
                          )}
                        </div>
                      </div> */}
                      <div className="form_commonblock">
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
                              setcusData={setcusData5}
                              cusData={cusData5}
                              type="vendor"
                              required
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="secondtotalsections485s"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <CalculationSection2
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                        section="Visa"
                      />
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

export default AddVisaPopup;
