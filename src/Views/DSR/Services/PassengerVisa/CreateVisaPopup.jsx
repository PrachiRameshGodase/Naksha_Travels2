import { useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import { customersList } from "../../../../Redux/Actions/customerActions";
import { vendorsLists } from "../../../../Redux/Actions/listApisActions";
import { CreatePassengerVisaAction } from "../../../../Redux/Actions/passengerVisaActions";
import { SubmitButton6 } from "../../../Common/Pagination/SubmitButton";
import ImageUpload from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import useFetchApiData from "../../../Helper/ComponentHelper/useFetchApiData";
import { formatDate } from "../../../Helper/DateFormat";
import { sendData, ShowMasterData, ShowUserMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CalculationSection from "../../CalculationSection";
import "../CreateHotelPopup.scss";
import CustomDropdown31 from "../../../../Components/CustomDropdown/CustomDropdown31";

const CreateVisaPopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);

  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
  const countryList = useSelector((state) => state?.countries?.countries);
  const createVisa = useSelector((state) => state?.createPassengerVisa);

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [cusData2, setcusData2] = useState(null);

  const [formData, setFormData] = useState({
    dsr_id: data?.id,
    passenger_id: passengerId,
    entry_type: "",
    passenger_visa_id: "",
    passport_no: "",
    dob: "",
    guest_ids: "",
    email: "",
    visa_no: "",
    visa_type_id: "",
    visa_entry_type: "",
    country_id: "",
    issue_date: "",
    expiry_date: "",
    days: "",
    supplier_id: "",
    supplier_name: null,

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

  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [errors, setErrors] = useState({
    passenger_visa_id: false,
    passport_no: false,
    dob: false,
    email: false,
    guest_ids: false,
    visa_type_id: false,
    visa_entry_type:false,
    country_id:false,
    issue_date:false,
    visa_no: false,
    expiry_date: false,
    days:false,
    guest_ids: false,
    supplier_id: false,
    gross_amount: false,

    // retain: false,
    total_amount: false,
  });

  const entryType = ShowUserMasterData("50");
  const visaentryType = ShowUserMasterData("39");
  const visatype = ShowUserMasterData("40");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedSupplierName = vendorList?.data?.user?.find(
      (item) => item?.id == formData?.supplier_id
    );
    setFormData((prev) => ({
      ...prev,
      supplier_name: selectedSupplierName?.display_name,
      [name]: value,
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

  const handleDateChange = (date, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: formatDate(date),
    }));
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      const issueDate = new Date(formData?.issue_date);
      const expiryDate = new Date(formData?.expiry_date);
      const selectedDate = new Date(date);
      
      if (name === "issue_date") {
        updatedErrors.issue_date = selectedDate < expiryDate;
        updatedErrors.issue_date =
          (formData?.issue_date && selectedDate > expiryDate) 
         
      }
      if (name === "expiry_date") {
        updatedErrors.expiry_date =
          selectedDate > issueDate
      }
      return updatedErrors;
    });
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));  
   
  };
  const handleFormSubmit = (e) => {
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
      supplier_id: formData?.supplier_id ? false : true,
      guest_ids: formData?.guest_ids ? false : true,
      gross_amount: formData?.gross_amount ? false : true,
      total_amount: formData?.total_amount ? false : true,
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
          guest_ids:
            formData?.guest_ids?.length === 0
              ? null
              : formData?.guest_ids?.join(", "),
          charges: JSON.stringify(formData?.charges),
        };
        const refreshData = {
          dsr_id: data?.id,
        };
        dispatch(
          CreatePassengerVisaAction(sendData, setShowModal, refreshData)
        );
      } catch (error) {
        console.error("Error updating visa:", error);
      }
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
            <h5>{isEdit ? "Update Visa Service" : "Add Visa Service"}</h5>
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
                          Passport No<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.passport_no}
                            onChange={handleChange}
                            name="passport_no"
                            placeholder="Enter Passport No"
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
                      <div className="form_commonblock ">
                        <label>Date Of Birth<b className="color_red">*</b></label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.dob}
                            onChange={(date) =>
                              handleDateChange(date, "dob")
                            }
                            name="dob"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                            minDate={new Date(new Date().getFullYear() - 50, 0, 1)} // Start 50 years in the past
                            maxDate={new Date(new Date().getFullYear() + 50, 11, 31)} // End 50 years in the future
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
                    </div>

                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>Email<b className="color_red">*</b></label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            placeholder="Enter Email"
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
                      <div className="form_commonblock">
                        <label>Visa Type<b className="color_red">*</b></label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Visa Type"
                            options={visatype}
                            value={formData?.visa_type_id}
                            onChange={handleChange}
                            name="visa_type_id"
                            defaultOption="Select Visa Type"
                            type="masters"
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
                    </div>
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>Visa Entry Type<b className="color_red">*</b></label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Visa Entry Type"
                            options={visaentryType}
                            value={formData?.visa_entry_type}
                            onChange={handleChange}
                            name="visa_entry_type"
                            defaultOption="Select Visa Entry Type"
                            type="masters"
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
                      <div className="form_commonblock">
                        <label>Days<b className="color_red">*</b></label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              type="number"
                              name="days"
                              placeholder="Enter Days"
                              value={formData.total_days}
                              onChange={(e) => handleChange(e)}
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
                        <label>Country / Region<b className="color_red">*</b></label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.country_svg}

                            <select
                              name="country_id"
                              value={formData.country_id}
                              onChange={(e) => handleChange(e, "country_id")}
                            >
                              <option value="">Select Country</option>
                              {countryList?.country?.map((country) => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
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
                        {/* {countryErr && <p className="error-message">
                                                            {otherIcons.error_svg}
                                                            Please select the country name</p>} */}
                      </div>

                      <div className="form_commonblock ">
                        <label>Issue Date<b className="color_red">*</b></label>
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
                        <label>Expiry Date<b className="color_red">*</b></label>
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
                      <div className="form_commonblock">
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
                    </div>
                    <div className="f1wrapofcreqx1">
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
                        <div className="secondtotalsections485s" style={{justifyContent:"flex-end"}}>
                        <CalculationSection
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Visa"
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
                createUpdate={createVisa}
                setShowModal={setShowModal}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVisaPopup;
