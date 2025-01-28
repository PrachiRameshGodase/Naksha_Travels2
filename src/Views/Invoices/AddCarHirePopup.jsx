import { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import { ShowMasterData, ShowUserMasterData } from "../Helper/HelperFunctions";
import NumericInput from "../Helper/NumericInput";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import { CalculationSection2 } from "../DSR/CalculationSection";
import { customersList } from "../../Redux/Actions/customerActions";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import Swal from "sweetalert2";

const AddCarHirePopup = ({ setShowModal, handleAddService, edit_data }) => {
  const { discount, discount_type, gross_amount, item_id, item_name, rate, tax_rate, service_data } = edit_data

  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();

  const vendorList = useSelector((state) => state?.vendorList);
  const createCarHire = useSelector((state) => state?.createPassengerCarHire);

  const [cusData1, setcusData1] = useState(null);

  const [formData, setFormData] = useState({
    service_name: "Car Hire",
    vehicle_type_id: service_data?.vehicle_type_id || "",        // Example for vehicle type ID
    days: service_data?.days || "",                             // Example for number of days
    pickup_location: service_data?.pickup_location || null,     // Example for pickup location
    drop_location: service_data?.drop_location || null,         // Example for drop-off location
    guest_ids: service_data?.guest_ids || "",                   // Example for guest IDs
    supplier_id: service_data?.supplier_id || "",               // Example for supplier ID
    supplier_name: service_data?.supplier_name || null,         // Example for supplier name

    // Amount fields
    gross_amount: gross_amount || 0,                            // Gross amount if provided
    discount: 0.0,                                  // Default discount value
    tax_percent: tax_rate || null,                              // Tax percent if provided
    tax_amount: 0.0,                                            // Default tax amount
    total_amount: 0.0,                                          // Default total amount
  });


  const [errors, setErrors] = useState({
    vehicle_type_id: false,
    pickup_location: false,
    drop_location: false,

    // retain: false,
  });
  const entryType = ShowUserMasterData("50");
  const vehicleType = ShowUserMasterData("41");

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
      vehicle_type_id: formData?.vehicle_type_id ? false : true,
      pickup_location: formData?.pickup_location ? false : true,
      drop_location: formData?.drop_location ? false : true,
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
  // call item api on page load...

  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add Car Hire Service</h5>
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
                    </div>

                    <div className="f1wrapofcreqx1">
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
                          Supplier
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
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
                      <div className="secondtotalsections485s" style={{ justifyContent: "flex-end" }}>
                        <CalculationSection2
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Carhire"
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

export default AddCarHirePopup;
