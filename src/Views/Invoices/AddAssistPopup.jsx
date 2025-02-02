import { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import {
  sendData,
  ShowMasterData,
  ShowUserMasterData,
} from "../Helper/HelperFunctions";
import NumericInput from "../Helper/NumericInput";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import { customersList } from "../../Redux/Actions/customerActions";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import { CalculationSection2 } from "../DSR/CalculationSection";
import Swal from "sweetalert2";
import { assistListAction } from "../../Redux/Actions/assistAction";
import { CustomDropdown0029 } from "../../Components/CustomDropdown/CustomDropdown29";

const AddAssistPopup = ({ setShowModal, handleAddService, edit_data }) => {
  const {
    discount,
    discount_type,
    gross_amount,
    item_id,
    item_name,
    rate,
    tax_rate,
    service_data,
  } = edit_data;

  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();

  const createAssist = useSelector((state) => state?.createPassengerAssist);
  const assistData = useSelector((state) => state?.assistList);
  const assistLists = assistData?.data?.data || [];
  const vendorList = useSelector((state) => state?.vendorList);


  const [cusData1, setcusData1] = useState(null);
  const [cusData2, setcusData2] = useState(null);
  const [cusData3, setcusData3] = useState(null);
  const [cusData4, setcusData4] = useState(null);


  const [formData, setFormData] = useState({
    service_name: "Assist",
    airport_id: service_data?.airport_id || null, // Example for airport ID
    airport_name: service_data?.airport_name || "", // Example for airport name
    meeting_type: service_data?.meeting_type || null, // Example for meeting type
    no_of_persons: service_data?.no_of_persons || "", // Example for the number of persons
    guest_ids: service_data?.guest_ids || "", // Example for guest IDs
    supplier_id: service_data?.supplier_id || "", // Example for supplier ID
    supplier_name: service_data?.supplier_name || null, // Example for supplier name

    // Amount fields
    gross_amount: gross_amount || 0, // Gross amount if provided
    discount: 0.0, // Default discount value
    tax_percent: tax_rate || null, // Tax percent if provided
    tax_amount: 0.0, // Default tax amount
    total_amount: 0.0, // Default total amount
  });

  const [errors, setErrors] = useState({
    airport_name: false,
    no_of_persons: false,
  });
  const entryType = ShowUserMasterData("50");

  const [storeEntry, setStoreEntry] = useState([]);
  const [storeVisaType, setStoreVisaType] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFields = { [name]: value };
    let selectedAssistData = null;
    if (name === "airport_name") {
      selectedAssistData = assistLists?.find((item) => item?.airport === value);
      if (selectedAssistData) {
        dispatch(
          assistListAction({ airport: selectedAssistData?.airport })
        ).then((res) => {
     
          setStoreEntry(res);
        });
        // Reset dependent fields when country changes
        setFormData((prev) => ({
          ...prev,
          airport_name: value,
          meeting_type: "",
          no_of_persons: "",
          gross_amount: "", 
        }));
      }
    } else if (name === "meeting_type") {
      if (!formData?.airport_name) {
        toast.error("Please select a airport first.");
        return;
      }
     
      selectedAssistData = assistLists?.find(
        (item) =>
          item?.meeting_type == value &&
          item?.airport === formData?.airport_name
      );

      if (selectedAssistData) {
        dispatch(
          assistListAction({
            airport: selectedAssistData?.airport,
            no_of_person: selectedAssistData?.no_of_person,
          })
        ).then((res) => {
          setStoreVisaType(res);
        });
        setFormData((prev) => ({
          ...prev,
          meeting_type: value,
          no_of_persons: "",
          gross_amount: "",
        }));
      }
    }  else if (name === "no_of_persons") {
      if (!formData?.airport_name) {
        toast.error("Please select a airport  first.");
        return;
      }
      if (!formData?.meeting_type) {
        toast.error("Please select a meeting type first.");
        return;
      }
      

      selectedAssistData = assistLists?.find(
        (item) =>
          item?.no_of_person == value &&
          item?.meeting_type == formData?.meeting_type &&
          item?.airport == formData?.airport_name
      );

      updatedFields = {
        ...updatedFields,
        airport_name: selectedAssistData?.airport || "",
        no_of_persons: selectedAssistData?.no_of_person || "",
        meeting_type: selectedAssistData?.meeting_type || "",
        gross_amount: selectedAssistData?.price || "",
      };
    }
    if (name === "supplier_id") {
      const selectedHotel = vendorList?.data?.user?.find((item) => item?.id == value);
      updatedFields = {
        ...updatedFields,
        supplier_name: selectedHotel?.display_name || "",
      };
    }
    // Update form state with the new data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...updatedFields,
    }));

    // Clear errors for the field
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };
  console.log("formData", formData)

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
                          <CustomDropdown0029
                            autoComplete="off"
                            ref={dropdownRef1}
                            label="Airport"
                            options={assistLists}
                            value={formData.airport_name}
                            onChange={handleChange}
                            name="airport_name"
                            defaultOption="Select Airport"
                            setcusData={setcusData1}
                            cusData={cusData1}
                            type="airportList2"
                            required
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
                      <div
                        className={`form_commonblock ${
                          formData?.airport_name ? "" : "disabledfield"
                        }`}
                        data-tooltip-content={
                          formData?.airport_name
                            ? ""
                            : "Please Select Airport First"
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                      >
                        <label>Meeting Type</label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <CustomDropdown0029
                            autoComplete="off"
                            ref={dropdownRef1}
                            label="Select Meeting type"
                            options={storeEntry}
                            value={formData.meeting_type}
                            onChange={handleChange}
                            name="meeting_type"
                            defaultOption="Select Meeting Type"
                            setcusData={setcusData2}
                            cusData={cusData2}
                            type="meetingType"
                            disabled={!formData?.airport_name}
                          />
                        </span>
                      </div>
                      <div
                        className={`form_commonblock ${
                          formData?.meeting_type ? "" : "disabledfield"
                        }`}
                        data-tooltip-content={
                          formData?.meeting_type
                            ? ""
                            : "Please Select Meeting type First"
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                      >
                        <label>
                          No Of Persons<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <CustomDropdown0029
                              autoComplete="off"
                              ref={dropdownRef1}
                              label="Select Persons"
                              options={storeVisaType}
                              value={formData?.no_of_persons}
                              onChange={handleChange}
                              name="no_of_persons"
                              defaultOption="Select Persons"
                              setcusData={setcusData4}
                              cusData={cusData4}
                              type="noOfPersons"
                              disabled={!formData?.meeting_type}
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
                              setcusData={setcusData3}
                              cusData={cusData3}
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
