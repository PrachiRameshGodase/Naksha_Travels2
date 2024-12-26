import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../Components/CustomDropdown/CustomDropdown10";
import { SubmitButton2 } from "../../Common/Pagination/SubmitButton";
import ImageUpload from "../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { formatDate } from "../../Helper/DateFormat";
import { ShowMasterData } from "../../Helper/HelperFunctions";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import "./CreateHotelPopup.scss";
import NumericInput from "../../Helper/NumericInput";

const CreateCarHirePopup = ({ showModal, setShowModal }) => {
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
  const countryList = useSelector((state) => state?.countries?.countries);

  const [cusData, setcusData] = useState(null);
  console.log("cusData", cusData);
  const [cusData1, setcusData1] = useState(null);
  const [cusData3, setcusData3] = useState(null);
  const [cusData4, setcusData4] = useState(null);
  const [formData, setFormData] = useState({
    hotel_id: "",
    bed_id: "",
    meal_id: "",
    occupancy_id: "",
  });
  const [isCustomerSelect, setIsCustomerSelect] = useState(false);
  const [showAllSequenceId, setShowAllSequenceId] = useState([]);
  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  const entryType = ShowMasterData("50");
  const vehicleType = ShowMasterData("41");

  const visaentryType = ShowMasterData("39");

  const visatype = ShowMasterData("40");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const entryTypeName = entryType?.find((val) => val?.labelid == value);
    const visaEntryType = visaentryType?.find((val) => val?.labelid == value);
    const VechileType = vehicleType?.find((val) => val?.labelid == value);
    const visaType = visatype?.find((val) => val?.labelid == value);
    setFormData((prev) => ({
      ...prev,
      ...(name === "vechile_type" && {
        vechile_type: VechileType?.label,
      }),
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
          <h5>
            {isEdit ? "Update Car Hire Service" : "Add Car Hire Service"}
          </h5>
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
                          type="masters"
                        />
                      </span>
                    </div>
                    <div className="form_commonblock">
                      <label>
                        Vechile Type<b className="color_red">*</b>
                      </label>

                      <span id="">
                        {otherIcons.name_svg}
                        <CustomDropdown04
                          label="Vechile Type"
                          options={vehicleType}
                          value={formData?.type_of_vehicle}
                          onChange={handleChange}
                          name="type_of_vehicle"
                          defaultOption="Select Vechile Type"
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
                            name="select_days"
                            placeholder="Enter Days"
                            value={formData.select_days}
                            onChange={(e) => handleChange(e)}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="f1wrapofcreqx1">
                    <div className="form_commonblock">
                      <label>
                        Pickup Location<b className="color_red">*</b>
                      </label>
                      <span>
                        {otherIcons.placeofsupply_svg}
                        <input
                          value={formData.passport_no}
                          onChange={handleChange}
                          name="passport_no"
                          placeholder="Enter Pickup Location"
                        />
                      </span>
                    </div>
                    <div className="form_commonblock">
                      <label>
                        Drop Location<b className="color_red">*</b>
                      </label>
                      <span>
                        {otherIcons.placeofsupply_svg}
                        <input
                          value={formData.passport_no}
                          onChange={handleChange}
                          name="drop_location"
                          placeholder="Enter Drop Location"
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
                            value={formData.vendor_id}
                            onChange={handleChange}
                            name="vendor_id"
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
                            name="vendor_note"
                            value={
                              formData.vendor_note == 0
                                ? ""
                                : formData.vendor_note
                            }
                          />
                        </div>
                      </div>
                      <div className="calctotalsection">
                        <div className="calcuparentc">
                          <div id="tax-details">
                            <div className="clcsecx12s1">
                              <label>Car Hire Price:</label>
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

export default CreateCarHirePopup;
