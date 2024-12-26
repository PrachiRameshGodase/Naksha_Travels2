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

const CreateFlightPopup = ({ showModal, setShowModal }) => {
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
  const hotelList = useSelector(
    (state) => state?.hotelList?.data?.hotels || []
  );
  const hotelRoomListData = useSelector(
    (state) => state?.hotelRoomList?.data?.hotels || []
  );

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
  const occupancy = ShowMasterData("36");
  const travelType = ShowMasterData("51");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const entryTypeName = entryType?.find((val) => val?.labelid == value);
    const travelTypeName = travelType?.find((val) => val?.labelid == value);
    setFormData((prev) => ({
      ...prev,
      ...(name === "entry_type" && {
        entry_type: entryTypeName?.label,
      }),
      ...(name === "travel_type" && {
        travel_type: travelTypeName?.label,
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
          <h5>{isEdit ? "Update Flight Service" : "Add Flight Service"}</h5>
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
                  </div>

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
                          value={formData?.travel_type}
                          onChange={handleChange}
                          name="travel_type"
                          defaultOption="Select Travel Type"
                          type="masters"
                        />
                      </span>
                    </div>
                    <div className="form_commonblock">
                      <label>
                        AirLine Name<b className="color_red">*</b>
                      </label>
                      <span>
                        {otherIcons.placeofsupply_svg}
                        <input
                          value={formData.airLine_name}
                          onChange={handleChange}
                          name="airLine_name"
                          placeholder="Enter Airline Name"
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
                            value={formData.customer_id}
                            onChange={handleChange}
                            name="customer_id"
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
                        GDS Portal<b className="color_red">*</b>
                      </label>
                      <span>
                        {otherIcons.placeofsupply_svg}
                        <input
                          value={formData.GDS_portal}
                          onChange={handleChange}
                          name="GDS_portal"
                          placeholder="Enter GDS Portal"
                        />
                      </span>
                    </div>
                    <div className="form_commonblock">
                      <label> Ticket No</label>
                      <div id="inputx1">
                        <span>
                          {otherIcons.name_svg}
                          <NumericInput
                            type="number"
                            name="ticket_number"
                            placeholder="Enter Ticket Number"
                            value={formData.ticket_number}
                            onChange={(e) => handleChange(e)}
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
                          value={formData.PRN_no}
                          onChange={handleChange}
                          name="PRN_no"
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
                        <input
                          value={formData.route}
                          onChange={handleChange}
                          name="GDS_portal"
                          placeholder="Enter GDS Portal"
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
                              <label>Fare Charge:</label>
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
                              <label>IPP:</label>
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
                              <label>Supplier Service Charge:</label>
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
                              <label>Supplier Total:</label>
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
                              <label>Invoice Amount:</label>
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

export default CreateFlightPopup;
