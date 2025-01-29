import { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown02 from "../../../../Components/CustomDropdown/CustomDropdown02";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import CustomDropdown29 from "../../../../Components/CustomDropdown/CustomDropdown29";
import CustomDropdown31 from "../../../../Components/CustomDropdown/CustomDropdown31";
import { customersView } from "../../../../Redux/Actions/customerActions";
import { hotelRoomListAction } from "../../../../Redux/Actions/hotelActions";
import { vendorsLists } from "../../../../Redux/Actions/listApisActions";
import { CreatePassengerMHotelAction } from "../../../../Redux/Actions/passengerMHotelActions";
import { SubmitButton6 } from "../../../Common/Pagination/SubmitButton";
import ImageUpload from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import useFetchApiData from "../../../Helper/ComponentHelper/useFetchApiData";
import { formatDate } from "../../../Helper/DateFormat";
import {
  preventZeroVal,
  sendData,
  ShowMasterData,
  ShowUserMasterData,
} from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CalculationSection from "../../CalculationSection";
import "../CreateHotelPopup.scss";
import Swal from "sweetalert2";

const CreateHotelPopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const customerDetail = useSelector((state) => state?.viewCustomer);
  const customerData = customerDetail?.data || {};
  const vendorList = useSelector((state) => state?.vendorList);
  const hotelList = useSelector(
    (state) => state?.hotelList?.data?.hotels || []
  );
  const hotelRoomListData = useSelector(
    (state) => state?.hotelRoomList?.data?.hotels || []
  );
  const createHotel = useSelector((state) => state?.createPassengerMHotel);

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [cusData3, setcusData3] = useState(null);
  const [cusData4, setcusData4] = useState(null);

  const [formData, setFormData] = useState({
    mice_id: data?.id,
    passenger_id: passengerId,
    entry_type: "",
    hotel_id: "",
    hotel_name: "",
    room_id: "",
    occupancy_id: "",
    meal_id: "",
    bed: "",
    guest_ids: "",
    booking_date: formatDate(new Date()),
    check_in_date: "",
    check_out_date: "",
    supplier_id: "",
    supplier_name: "",
    total_nights: "",
    confirmation_no: "",
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
  const [errors, setErrors] = useState({
    hotel_id: false,
    room_id: false,
    occupancy_id: false,
    meal_id: false,
    bed: false,
    guest_ids: false,
    booking_date: false,
    check_out_date: false,
    check_in_date: false,
    gross_amount: false,

    // retain: false,
    total_amount: false,
  });

  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  const entryType = ShowUserMasterData("50");
  const occupancy = ShowUserMasterData("36");
  const meal = ShowUserMasterData("37");
  const bed = ShowUserMasterData("38");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFields = { [name]: value };

    if (name === "hotel_id") {
      const selectedHotel = hotelList?.find((item) => item?.id == value);
      dispatch(hotelRoomListAction({ hotel_id: selectedHotel?.id }));
      updatedFields = {
        ...updatedFields,
        hotel_name: selectedHotel?.hotel_name || "",
      };
    }
    if (name === "room_id") {
      const selectedRoom = hotelRoomListData?.find((room) => room?.id == value);
      updatedFields = {
        ...updatedFields,
        room_name: selectedRoom?.room_name || "",
        occupancy_id: selectedRoom?.occupancy_id || "",
        meal_id: selectedRoom?.meal_id || "",
        bed: selectedRoom?.bed_id || "",
        gross_amount:selectedRoom?.price
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

    setFormData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    setErrors((prevData) => ({
      ...prevData,
      ...updatedFields,
      ...(name === "room_id" && {
        occupancy_id: false,
        meal_id: false, 
        bed: false, 
        gross_amount:false
      }),
      [name]: false,
    }));
  };

  const handleChange1 = (selectedItems, name) => {
    setFormData({
      ...formData,
      guest_ids: selectedItems,
    });
    
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
      hotel_id: formData?.hotel_id ? false : true,
      room_id: formData?.room_id ? false : true,
      occupancy_id: formData?.occupancy_id ? false : true,
      meal_id: formData?.meal_id ? false : true,
      bed: formData?.bed ? false : true,
      guest_ids: formData?.guest_ids ? false : true,
      booking_date: formData?.booking_date ? false : true,
      check_out_date: formData?.check_out_date ? false : true,
      check_in_date: formData?.check_in_date ? false : true,
      gross_amount: formData?.gross_amount ? false : true,

      // retain: formData?.retain ? false : true,
      total_amount: formData?.total_amount ? false : true,
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
          mice_id: data?.id,
        };
        dispatch(
          CreatePassengerMHotelAction(sendData, setShowModal, refreshData)
        );
      } catch (error) {
        console.error("Error updating hotel:", error);
      }
    }
  };

  useEffect(() => {
    if (data?.customer_id) {
      const queryParams = {
        user_id: data?.customer_id,
        fy: localStorage.getItem("FinancialYear"),
      };
      dispatch(customersView(queryParams));
    }
  }, [dispatch, data?.customer_id]);

  // call item api on page load...
  const payloadGenerator = useMemo(() => () => ({ ...sendData }), []);
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
  // call item api on page load...
  const isDisabled = formData.room_id;
  const isDisabled2 = formData.hotel_id;
  return (
    <>
      <div id="formofcreateitems">
        <div className="custom-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{isEdit ? "Update Hotel Service" : "Add Hotel Service"}</h5>
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
                  <div
                    className="itemsformwrap"
                    style={{ paddingBottom: "0px" }}
                  >
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
                                type="hotalList"
                                required
                              />
                            </span>
                            {errors?.hotel_id && (
                              <p
                                className="error_message"
                                style={{
                                  whiteSpace: "nowrap",
                                  marginBottom: "0px important",
                                }}
                              >
                                {otherIcons.error_svg}
                                Please Select Hotel Name
                              </p>
                            )}
                          </div>
                        </div>
                        <div
                          className={`form_commonblock ${
                            formData?.hotel_id ? "" : "disabledfield"
                          }`}
                          data-tooltip-content={formData?.hotel_id ? "" : "Please Select Hotel First"}
                          data-tooltip-id="my-tooltip"
                           data-tooltip-place="bottom"
                        >
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
                              disabled={isDisabled2}
                            />
                          </span>
                          {errors?.room_id && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Room
                            </p>
                          )}
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
                              disabled={isDisabled}
                            />
                          </span>
                          {errors?.occupancy_id && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Occupancy
                            </p>
                          )}
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
                              disabled={isDisabled}
                            />
                          </span>
                          {errors?.meal_id && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Meal
                            </p>
                          )}
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
                              disabled={isDisabled}
                            />
                          </span>
                          {errors?.bed && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Bed
                            </p>
                          )}
                        </div>
                        <div className="form_commonblock">
                          <label>
                            Family Member<b className="color_red">*</b>
                          </label>

                          <div id="sepcifixspanflex">
                            <span id="">
                              {otherIcons.name_svg}

                              <CustomDropdown31
                                ref={dropdownRef1}
                                label="Select Family Member"
                                options={customerData?.family_members}
                                value={formData.guest_ids}
                                onChange={(selectedItems) =>
                                  handleChange1(selectedItems, "guest_ids")
                                }
                                name="guest_ids"
                                defaultOption="Select Family Member"
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
                              minDate={
                                formData?.check_in_date ? new Date(formData.check_in_date) : null
                              }
                              maxDate={
                                formData?.check_out_date ? new Date(formData.check_out_date) : null
                            }
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
                        <div className="form_commonblock ">
                          <label>
                            Checkin Date<b className="color_red">*</b>
                          </label>
                          <span>
                            {otherIcons.date_svg}
                            <DatePicker
                              selected={formData?.check_in_date}
                              onChange={(date) =>
                                handleDateChange(date, "check_in_date")
                              }
                              name="check_in_date"
                              placeholderText="Enter Date"
                              dateFormat="dd-MM-yyyy"
                              autoComplete="off"
                              minDate={
                                formData?.booking_date
                                  ? new Date(formData.booking_date)
                                  : null
                              } 
                              maxDate={
                                formData?.check_out_date
                                  ? new Date(formData.check_out_date)
                                  : null
                              }
                            />
                          </span>
                          {errors?.check_in_date && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Check In Date
                            </p>
                          )}
                        </div>
                        <div className="form_commonblock ">
                          <label>
                            Checkout Date<b className="color_red">*</b>
                          </label>
                          <span>
                            {otherIcons.date_svg}
                            <DatePicker
                              selected={formData?.check_out_date}
                              onChange={(date) =>
                                handleDateChange(date, "check_out_date")
                              }
                              name="check_out_date"
                              placeholderText="Enter Date"
                              dateFormat="dd-MM-yyyy"
                              autoComplete="off"
                              minDate={
                                formData?.check_in_date
                                  ? new Date(formData.check_in_date)
                                  : formData?.booking_date
                                  ? new Date(formData.booking_date)
                                  : null
                              }
                            />
                          </span>
                          {errors?.check_out_date && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Check Out Date
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="f1wrapofcreqx1">
                        {/* <div className="form_commonblock">
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

                          {/* <DeleveryAddress onSendData={handleChildData} formdatas={{ formData, setFormData }} /> */}
                        {/* </div>  */}
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
                        <div className="secondtotalsections485s ">
                          <div className="textareaofcreatqsiform">
                            <label>Note</label>
                            <div className="show_no_of_text_limit_0121">
                              <TextAreaComponentWithTextLimit
                                formsValues={{ handleChange, formData }}
                                placeholder="Note..."
                                name="note"
                                value={preventZeroVal(formData?.note)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="secondtotalsections485s"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <CalculationSection
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Hotel"
                          errors={errors}
                          setErrors={setErrors}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <SubmitButton6
                  onClick={handleFormSubmit}
                  createUpdate={createHotel}
                  setShowModal={setShowModal}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateHotelPopup;
