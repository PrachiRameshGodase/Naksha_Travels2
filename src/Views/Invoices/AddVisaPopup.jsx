import { useMemo, useRef, useState } from "react";
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
import { sendData, ShowMasterData } from "../Helper/HelperFunctions";
import NumericInput from "../Helper/NumericInput";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import CalculationSection, {
  CalculationSection2,
} from "../DSR/CalculationSection";

const AddVisaPopup = ({ setShowModal, handleAddService }) => {
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);

  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
  const countryList = useSelector((state) => state?.countries?.countries);
  const createVisa = useSelector((state) => state?.createPassengerVisa);

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [formData, setFormData] = useState({
    service_name: "Visa",
    // entry_type: "",
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
    // charges: null,
    gross_amount: 0,
    discount: 0.0,
    tax_percent: null,
    tax_amount: 0.0,
    total_amount: 0.0,
  });

  const [errors, setErrors] = useState({visa_no: false});

  const entryType = ShowMasterData("50");
  const visaentryType = ShowMasterData("39");
  const visatype = ShowMasterData("40");

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      visa_no: formData?.visa_no ? false : true,
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
        guest_ids: formData?.guest_ids?.length === 0 ? null : formData?.guest_ids?.join(", ")};
      handleAddService("Visa", sendData);
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
                      </div>
                      <div className="form_commonblock ">
                        <label>Date Of Birth</label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.dob}
                            onChange={(date) =>
                              setFormData({
                                ...formData,
                                dob: formatDate(date),
                              })
                            }
                            name="dob"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                          />
                        </span>
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
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
                          />
                        </span>
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
                        <label>
                          Visa Type<b className="color_red">*</b>
                        </label>

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
                      </div>
                    </div>
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          Visa Entry Type<b className="color_red">*</b>
                        </label>

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
                      </div>
                      <div className="form_commonblock">
                        <label>Days</label>
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
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>Country / Region</label>
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
                        </div>
                        {/* {countryErr && <p className="error-message">
                                                            {otherIcons.error_svg}
                                                            Please select the country name</p>} */}
                      </div>
                      <div className="form_commonblock ">
                        <label>Issue Date</label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.issue_date}
                            onChange={(date) =>
                              setFormData({
                                ...formData,
                                issue_date: formatDate(date),
                              })
                            }
                            name="issue_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock ">
                        <label>Expiry Date</label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.expiry_date}
                            onChange={(date) =>
                              setFormData({
                                ...formData,
                                expiry_date: formatDate(date),
                              })
                            }
                            name="expiry_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
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

                        {/* <DeleveryAddress onSendData={handleChildData} formdatas={{ formData, setFormData }} /> */}
                      </div>
                    </div>
                    <div className="f1wrapofcreqx1">
                      <div className="secondtotalsections485s" style={{ justifyContent: "flex-end" }}>
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
