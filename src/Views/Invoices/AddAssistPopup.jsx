import { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import { sendData, ShowMasterData, ShowUserMasterData } from "../Helper/HelperFunctions";
import NumericInput from "../Helper/NumericInput";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import { customersList } from "../../Redux/Actions/customerActions";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import { CalculationSection2 } from "../DSR/CalculationSection";
import Swal from "sweetalert2";

const AddAssistPopup = ({ setShowModal, handleAddService, edit_data }) => {
  const { discount, discount_type, gross_amount, item_id, item_name, rate, tax_rate, service_data } = edit_data

  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();

  const vendorList = useSelector((state) => state?.vendorList);
  const createAssist = useSelector((state) => state?.createPassengerAssist);

  const [cusData1, setcusData1] = useState(null);
  const [formData, setFormData] = useState({
    service_name: "Assist",
    airport_id: service_data?.airport_id || null,           // Example for airport ID
    airport_name: service_data?.airport_name || "",         // Example for airport name
    meeting_type: service_data?.meeting_type || null,       // Example for meeting type
    no_of_persons: service_data?.no_of_persons || "",       // Example for the number of persons
    guest_ids: service_data?.guest_ids || "",               // Example for guest IDs
    supplier_id: service_data?.supplier_id || "",           // Example for supplier ID
    supplier_name: service_data?.supplier_name || null,     // Example for supplier name

    // Amount fields
    gross_amount: gross_amount || 0,                        // Gross amount if provided
    discount: 0.0,                              // Default discount value
    tax_percent: tax_rate || null,                          // Tax percent if provided
    tax_amount: 0.0,                                        // Default tax amount
    total_amount: 0.0,                                      // Default total amount
  });

  const [errors, setErrors] = useState({
    airport_name: false,
    no_of_persons: false,
  });
  const entryType = ShowUserMasterData("50");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedSupplierName = vendorList?.data?.user?.find(
      (item) => item?.id == formData?.supplier_id
    );
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      supplier_name: selectedSupplierName?.display_name,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      airport_name: formData?.airport_name ? false : true,
      no_of_persons: formData?.no_of_persons ? false : true,

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
            <h5>Add Assists Service</h5>
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
                          Airport<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.airport_name}
                            onChange={handleChange}
                            name="airport_name"
                            placeholder="Enter Airport Location"
                          />
                        </span>
                        {errors?.airport_name && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Airport
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Meeting Type
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.meeting_type}
                            onChange={handleChange}
                            name="meeting_type"
                            placeholder="Enter Meeting Type"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>No Of Persons<b className="color_red">*</b></label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="no_of_persons"
                              placeholder="Enter No Of Persons"
                              value={formData.no_of_persons}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                          {errors?.no_of_persons && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill No Of Persons
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">

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
                      <div
                        className="secondtotalsections485s"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <CalculationSection2
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Assist"
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

export default AddAssistPopup;
