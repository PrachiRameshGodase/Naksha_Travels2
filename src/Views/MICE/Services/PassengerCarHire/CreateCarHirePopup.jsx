import { useMemo, useRef, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import { customersList } from "../../../../Redux/Actions/customerActions";
import { vendorsLists } from "../../../../Redux/Actions/listApisActions";
import { CreatePassengerMCarHireAction } from "../../../../Redux/Actions/passengerMCarHireActions";
import { SubmitButton6 } from "../../../Common/Pagination/SubmitButton";
import ImageUpload from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import useFetchApiData from "../../../Helper/ComponentHelper/useFetchApiData";
import { sendData, ShowMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CalculationSection from "../../CalculationSection";
import "../CreateHotelPopup.scss";
import CustomDropdown31 from "../../../../Components/CustomDropdown/CustomDropdown31";
import {customersView} from "../../../../Redux/Actions/customerActions";

const CreateCarHirePopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const vendorList = useSelector((state) => state?.vendorList);
  const createCarHire = useSelector((state) => state?.createPassengerMCarHire);
  const customerDetail = useSelector((state) => state?.viewCustomer);
  const customerData = customerDetail?.data || {};

  const [cusData1, setcusData1] = useState(null);
  const [formData, setFormData] = useState({
    mice_id: data?.id,
    passenger_id: passengerId,
    entry_type: "",
    vehicle_type_id: "",
    days: "",
    pickup_location: null,
    drop_location: null,
    guest_ids: "",
    supplier_id: "",
    supplier_name: null,
    // Amount
    gross_amount: null,
    charges: [{amount:null, account_id:null}],
    discount: null,
    supplier_total: null,
    tax_percent: null,
    tax_amount: null,
    retain: null,
    total_amount: null,
    note: null,
    upload_image: null,
  });
  const [errors, setErrors] = useState({
    vehicle_type_id: false,
     pickup_location:false,
    drop_location:false,
    guest_ids: false,
    gross_amount: false,
    
    retain: false,
    total_amount: false,
  });
  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [cusData, setcusData] = useState(null);

  const entryType = ShowMasterData("50");
  const vehicleType = ShowMasterData("41");

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
      guest_ids: selectedItems,
    });
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let newErrors = {
      vehicle_type_id: formData?.vehicle_type_id ? false : true,
      pickup_location: formData?.pickup_location ? false : true,
      drop_location: formData?.drop_location ? false : true,
      guest_ids: formData?.guest_ids ? false : true,
      gross_amount: formData?.gross_amount ? false : true,
    
      retain: formData?.retain ? false : true,
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
            charges: JSON.stringify(formData?.charges)
      };
      const refreshData = {
        mice_id: data?.id,
      };
      dispatch(CreatePassengerMCarHireAction(sendData,setShowModal, refreshData))
        
    } catch (error) {
      console.error("Error updating car hire:", error);
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
  useFetchApiData(customersList, payloadGenerator, []); //call api common function
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
  // call item api on page load...

  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>
              {isEdit ? "Update Car Hire Service" : "Add Car Hire Service"}
            </h5>
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
                    <div className="f1wrapofcreqx1">
                      {/* <div className="form_commonblock">
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
                      </div> */}
                      <div className="form_commonblock">
                        <label>
                          Vechile Type<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Vechile Type"
                            options={vehicleType}
                            value={formData?.vehicle_type_id}
                            onChange={handleChange}
                            name="vehicle_type_id"
                            defaultOption="Select Vechile Type"
                            type="masters"
                          />
                        </span>
                        {errors?.vehicle_type_id && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Vechile Type
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>Days</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="days"
                              placeholder="Enter Days"
                              value={formData.days}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Pickup Location<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.pickup_location}
                            onChange={handleChange}
                            name="pickup_location"
                            placeholder="Enter Pickup Location"
                          />
                        </span>
                        {errors?.pickup_location && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Pickup Location
                            </p>
                          )}
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
                     
                      <div className="form_commonblock">
                        <label>
                          Drop Location<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.drop_location}
                            onChange={handleChange}
                            name="drop_location"
                            placeholder="Enter Drop Location"
                          />
                        </span>
                        {errors?.drop_location && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Drop Location
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
                        <label>
                          Supplier
                        </label>
                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}

                            <CustomDropdown10
                              ref={dropdownRef1}
                              label="Select Supplier"
                              options={vendorList?.data?.user}
                              value={formData?.supplier_id}
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
                        <CalculationSection
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Carhire"
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
                createUpdate={createCarHire}
                setShowModal={setShowModal}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCarHirePopup;
