import { RxCross2 } from "react-icons/rx";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import GenerateAutoId from "../../Sales/Common/GenerateAutoId";
import DatePicker from "react-datepicker";
import CustomDropdown10 from "../../../Components/CustomDropdown/CustomDropdown10";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";
import CurrencySelect from "../../Helper/ComponentHelper/CurrencySelect";
import TextAreaComponentWithTextLimit from "../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import ImageUpload from "../../Helper/ComponentHelper/ImageUpload";
import SubmitButton, {
  SubmitButton2,
} from "../../Common/Pagination/SubmitButton";
import { currencySymbol, ShowMasterData } from "../../Helper/HelperFunctions";
import "./CreateHotelPopup.scss";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { formatDate } from "../../Helper/DateFormat";
import NumericInput from "../../Helper/NumericInput";
import CustomDropdown29 from "../../../Components/CustomDropdown/CustomDropdown29";
import CustomDropdown02 from "../../../Components/CustomDropdown/CustomDropdown02";
import CustomDropdown31 from "../../../Components/CustomDropdown/CustomDropdown31";

const CreateVisaPopup = ({ showModal, setShowModal,  data, passengerId}) => {
  const dropdownRef1 = useRef(null);
  
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
  const countryList = useSelector((state) => state?.countries?.countries);

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [formData, setFormData] = useState({
    dsr_id: data?.id,
    passenger_id: passengerId,
    entry_type: "",
    passenger_visa_id:"",
    passport_no:"",     
    dob:"",
    guest_ids:"",
    email:"",
    visa_no:"",
    visa_type_id:"",
    visa_entry_type:"",
    country_id:"",
    issue_date:"",
    expiry_date:"",
    days:"",
    supplier_id:"",
    supplier_name:null,    

     //amount
     charges: null,
     hotel_price: null,
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
    const entryTypeName = entryType?.find((val) => val?.labelid == value);
    const visaEntryType = visaentryType?.find((val) => val?.labelid == value);

    const visaType = visatype?.find((val) => val?.labelid == value);
    setFormData((prev) => ({
      ...prev,
      ...(name === "entry_type" && {
        entry_type: entryTypeName?.label,
      }),
      ...(name === "visa_entry_type" && {
        visa_entry_name: visaEntryType?.label,
      }),
      ...(name === "visa_type_id" && {
        visa_type_name: visaType?.label,
      }),
      [name]: value,
    }));
  };

  const handleChange1 = (selectedItems) => {
    setFormData({
      ...formData,
      guest_ids: selectedItems, // Update selected items array
    });
  };
  const handleDateChange = (date, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
      ...(name === "expiry_date" && { payment_terms: 5 }),
      ...(name === "transaction_date" &&
        prev.payment_terms !== 5 && {
          expiry_date: calculateExpiryDate(new Date(date), prev.payment_terms),
        }),
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  if (!showModal) return null;
  console.log("formData", formData);
  return (
    <div className="custom-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5>{isEdit ? "Update Visa Service" : "Add Visa Service"}</h5>
          <button className="close-button" onClick={() => setShowModal(false)}>
            <RxCross2 />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleFormSubmit}>
            {/* Keep your form as it is */}
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

                    <div className="secondtotalsections485s">
                      <div className="textareaofcreatqsiform">
                        <label>Note</label>
                        <div className="show_no_of_text_limit_0121">
                          <TextAreaComponentWithTextLimit
                            formsValues={{ handleChange, formData }}
                            placeholder="Note..."
                            name="note"
                            value={
                              formData.note == 0
                                ? ""
                                : formData.note
                            }
                          />
                        </div>
                      </div>
                      <div className="calctotalsection">
                      <div className="calcuparentc">
                          <div id="tax-details">
                            <div className="clcsecx12s1">
                              <label>Visa Price:</label>
                              <input
                                type="text"
                                value={formData?.subtotal}
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="calcuparentc">
                          <div id="tax-details">
                            <div className="clcsecx12s1">
                              <label>Supplier Service Charge:</label>
                              <input
                                type="text"
                                value={formData?.subtotal}
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                        </div>
                       
                        <div className="calcuparentc">
                          <div id="tax-details">
                            <div className="clcsecx12s1">
                              <label>Tax:</label>
                              <input
                                type="text"
                                value={formData.tax_amount}
                                placeholder="0.00"
                                // className="inputsfocalci465s"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="calcuparentc">
                          <div id="tax-details">
                            <div className="clcsecx12s1">
                              <label>Retain:</label>
                              <input
                                type="text"
                                value={formData.tax_amount}
                                placeholder="0.00"
                                className="inputsfocalci465s"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="clcsecx12s2">
                          <label>Invoice Total :</label>
                          <input
                            type="text"
                            value={formData?.total}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
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
            <SubmitButton2 isEdit={isEdit} itemId={itemId} cancel="quotation" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVisaPopup;
