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
import { sendData, ShowMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CalculationSection from "../../CalculationSection";
import "../CreateHotelPopup.scss";

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
    charges: null,
    gross_amount: null,
    discount: null,
    tax_percent: null,
    tax_amount: null,
    retain: null,
    total_amount: null,
    note: null,
    upload_image: null,
  });

  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

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
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const sendData = {
        ...formData,
        guest_ids:
          formData?.guest_ids?.length === 0
            ? null
            : formData?.guest_ids?.join(", "),
      };
      dispatch(CreatePassengerVisaAction(sendData))
        .then((response) => {
          // if (response?.success === true) {
          setShowModal(false);
          // }
        })
        .catch((error) => {
          console.error("Error during dispatch:", error);
        });
    } catch (error) {
      console.error("Error updating visa:", error);
    }
  };

  // call item api on page load...
  const payloadGenerator = useMemo(() => () => ({  ...sendData, }),[]);
  useFetchApiData(customersList, payloadGenerator, []); //call api common function
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function

  
  return (
    <div id="formofcreateitems">
    <div className="custom-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5>{isEdit ? "Update Visa Service" : "Add Visa Service"}</h5>
          <button className="close-button" onClick={() => setShowModal(false)}>
            <RxCross2 />
          </button>
        </div>

        <div className="modal-body">
          <form >
            
            <div className="relateivdiv">
              <div className="itemsformwrap">
                <div className="f1wrapofcreq">
                  <div className="f1wrapofcreqx1">
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
                  </div>

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
                      <CalculationSection
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Visa"
                        />
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
                </div>
              </div>
            </div>
             <SubmitButton6
                            onClick={handleFormSubmit}
                            cancel="dsr"
                            createUpdate={createVisa}
                          />
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateVisaPopup;
