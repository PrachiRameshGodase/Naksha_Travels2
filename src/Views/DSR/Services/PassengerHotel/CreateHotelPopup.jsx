import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomDropdown02 from "../../../../Components/CustomDropdown/CustomDropdown02";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import CustomDropdown29 from "../../../../Components/CustomDropdown/CustomDropdown29";
import CustomDropdown31 from "../../../../Components/CustomDropdown/CustomDropdown31";
import { CreatePassengerHotelAction } from "../../../../Redux/Actions/passengerHotelActions";
import ImageUpload from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { formatDate } from "../../../Helper/DateFormat";
import { ShowMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import "../CreateHotelPopup.scss";

const CreateHotelPopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);

  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
  const hotelList = useSelector((state) => state?.hotelList?.data?.hotels || []);
  const hotelRoomListData = useSelector((state) => state?.hotelRoomList?.data?.hotels || []);

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [cusData3, setcusData3] = useState(null);
  const [cusData4, setcusData4] = useState(null);

  const [formData, setFormData] = useState({
    dsr_id: data?.id,
    passenger_id: passengerId,
    entry_type: "",
    hotel_id: "",
    hotel_name: "",
    room_id: "",
    occupancy_id: "",
    meal_id: "",
    bed: "",
    guest_ids: "",
    booking_date: "",
    check_in_date: "",
    chec_out_date: "",
    supplier_id: "",
    supplier_name: "",
    total_nights: "",
    confirmation_no: "",
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
  const occupancy = ShowMasterData("36");
  const meal = ShowMasterData("37");
  const bed = ShowMasterData("38");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const entryTypeName = entryType?.find((val) => val?.labelid == value);
    const selectedHotel = hotelList?.find(
      (item) => item?.id == formData?.hotel_id
    );
    const selectedSupplierName = vendorList?.data?.user?.find(
      (item) => item?.id == formData?.supplier_id
    );

    setFormData((prev) => ({
      ...prev,
      ...(name === "entry_type" && {
        entry_type: entryTypeName?.label,
      }),
      hotel_name: selectedHotel?.hotel_name,
      supplier_name:selectedSupplierName?.display_name,
      [name]: value,
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

    try {
      const sendData = {
        ...formData,
        guest_ids:
          formData?.guest_ids?.length === 0
            ? null
            : formData?.guest_ids?.join(", "),
      };
      dispatch(CreatePassengerHotelAction(sendData))
        .then((response) => {
          // if (response?.success === true) {
          setShowModal(false);
          // }
        })
        .catch((error) => {
          console.error("Error during dispatch:", error);
        });
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

 
  return (
    <div className="custom-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5>{isEdit ? "Update Hotel Service" : "Add Hotel Service"}</h5>
          <button className="close-button" onClick={() => setShowModal(false)}>
            <RxCross2 />
          </button>
        </div>

        <div className="modal-body">
          <form>
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
                        Hotel Name<b className="color_red">*</b>
                      </label>
                      <div id="sepcifixspanflex">
                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown29
                            autoComplete="off"
                            ref={dropdownRef1}
                            label="Hotel Name"
                            options={hotelList}
                            value={formData.hotel_id}
                            onChange={handleChange}
                            name="hotel_id"
                            defaultOption="Select Hotel"
                            setcusData={setcusData3}
                            cusData={cusData3}
                            type="vendor"
                            required
                          />
                        </span>
                      </div>
                    </div>
                    <div className="form_commonblock">
                      <label>
                        Room Number/Name<b className="color_red">*</b>
                      </label>
                      <span>
                        {otherIcons.placeofsupply_svg}
                        <CustomDropdown02
                          autoComplete="off"
                          ref={dropdownRef1}
                          label="Room Name"
                          options={hotelRoomListData}
                          value={formData.room_id}
                          onChange={handleChange}
                          name="room_id"
                          defaultOption="Select Room Number/Name"
                          setcusData={setcusData4}
                          cusData={cusData4}
                          type="vendor"
                          hotelID={formData.hotel_id}
                          required
                        />
                      </span>
                    </div>
                    <div className="form_commonblock">
                      <label>
                        Occupancy<b className="color_red">*</b>
                      </label>

                      <span id="">
                        {otherIcons.name_svg}
                        <CustomDropdown04
                          label="Occupancy"
                          options={occupancy}
                          value={formData?.occupancy_id}
                          onChange={handleChange}
                          name="occupancy_id"
                          defaultOption="Select Occupancy"
                          type="masters"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="f1wrapofcreqx1">
                    <div className="form_commonblock">
                      <label>
                        Meal Plan<b className="color_red">*</b>
                      </label>
                      <span id="">
                        {otherIcons.name_svg}
                        <CustomDropdown04
                          label="Meal"
                          options={meal}
                          value={formData?.meal_id}
                          onChange={handleChange}
                          name="meal_id"
                          defaultOption="Select Meal"
                          type="masters"
                        />
                      </span>
                    </div>
                    <div className="form_commonblock">
                      <label>
                        Bed<b className="color_red">*</b>
                      </label>
                      <span id="">
                        {otherIcons.name_svg}
                        <CustomDropdown04
                          label="Bed"
                          options={bed}
                          value={formData?.bed}
                          onChange={handleChange}
                          name="bed"
                          defaultOption="Select Bed"
                          type="masters"
                        />
                      </span>
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
                  </div>
                  <div className="f1wrapofcreqx1">
                    <div className="form_commonblock ">
                      <label>Booking Date</label>
                      <span>
                        {otherIcons.date_svg}
                        <DatePicker
                          selected={formData?.booking_date}
                          onChange={(date) =>
                            setFormData({
                              ...formData,
                              booking_date: formatDate(date),
                            })
                          }
                          name="booking_date"
                          placeholderText="Enter Date"
                          dateFormat="dd-MM-yyyy"
                          autoComplete="off"
                        />
                      </span>
                    </div>
                    <div className="form_commonblock ">
                      <label>Checkin Date</label>
                      <span>
                        {otherIcons.date_svg}
                        <DatePicker
                          selected={formData?.check_in_date}
                          onChange={(date) =>
                            setFormData({
                              ...formData,
                              check_in_date: formatDate(date),
                            })
                          }
                          name="check_in_date"
                          placeholderText="Enter Date"
                          dateFormat="dd-MM-yyyy"
                          autoComplete="off"
                        />
                      </span>
                    </div>
                    <div className="form_commonblock ">
                      <label>Checkout Date</label>
                      <span>
                        {otherIcons.date_svg}
                        <DatePicker
                          selected={formData?.chec_out_date}
                          onChange={(date) =>
                            setFormData({
                              ...formData,
                              chec_out_date: formatDate(date),
                            })
                          }
                          name="chec_out_date"
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
                    <div className="form_commonblock">
                      <label>Total Days</label>
                      <div id="inputx1">
                        <span>
                          {otherIcons.name_svg}
                          <NumericInput
                            type="number"
                            name="total_days"
                            placeholder="Enter Total Days"
                            value={formData.total_days}
                            onChange={(e) => handleChange(e)}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="form_commonblock">
                      <label>
                        Confirmation No<b className="color_red">*</b>
                      </label>
                      <span>
                        {otherIcons.placeofsupply_svg}
                        <input
                          value={formData.confirmation_no}
                          onChange={handleChange}
                          name="confirmation_no"
                          placeholder="Enter Confirmation No"
                        />
                      </span>
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
                      <div className="calctotalsection">
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
                              <label>Hotel Price:</label>
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
            {/* <SubmitButton2 isEdit="" itemId="" cancel="quotation" /> */}
            <div className="actionbarcommon">
              {isEdit && itemId ? (
                <>
                  <button className={`firstbtnc1`} type="submit">
                    Update
                  </button>
                </>
              ) : (
                <>
                  <button className={`firstbtnc1`} onClick={handleFormSubmit}>
                    Save
                  </button>
                </>
              )}

              <Link onClick={() => setShowModal(false)} className="firstbtnc2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateHotelPopup;