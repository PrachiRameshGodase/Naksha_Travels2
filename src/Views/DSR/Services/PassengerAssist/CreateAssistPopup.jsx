import { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import { customersList } from "../../../../Redux/Actions/customerActions";
import { vendorsLists } from "../../../../Redux/Actions/listApisActions";
import { CreatePassengerAssistAction } from "../../../../Redux/Actions/passengerAssistActions";
import { SubmitButton6 } from "../../../Common/Pagination/SubmitButton";
import ImageUpload from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import useFetchApiData from "../../../Helper/ComponentHelper/useFetchApiData";
import {
  sendData,
  ShowMasterData,
  ShowUserMasterData,
} from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CalculationSection from "../../CalculationSection";
import "../CreateHotelPopup.scss";
import Swal from "sweetalert2";
import {
  CustomDropdown0029,
  CustomDropdown029,
} from "../../../../Components/CustomDropdown/CustomDropdown29";
import { assistListAction } from "../../../../Redux/Actions/assistAction";
import { CustomDropdown031 } from "../../../../Components/CustomDropdown/CustomDropdown31";

const CreateAssistPopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const createAssist = useSelector((state) => state?.createPassengerAssist);
  const assistData = useSelector((state) => state?.assistList);
  const assistLists = assistData?.data?.data || [];
  const vendorList = useSelector((state) => state?.vendorList);
  const cusList = useSelector((state) => state?.customerList);

  const [cusData1, setcusData1] = useState(null);
  const [cusData2, setcusData2] = useState(null);
  const [cusData3, setcusData3] = useState(null);
  const [cusData4, setcusData4] = useState(null);
  const [cusData5, setcusData5] = useState(null);

  const [formData, setFormData] = useState({
    dsr_id: data?.id,
    passenger_id: passengerId,
    entry_type: "",
    airport_id: null,
    airport_name: "",
    meeting_type: null,
    no_of_persons: "",
    guest_ids: "",
    supplier_id: "",
    supplier_name: null,
    // Amount
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
    airport_name: false,
    no_of_persons: false,
    gross_amount: false,
    total_amount: false,
    supplier_id: false,
  });

  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
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
          supplier_id: "",
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
          supplier_id: "",
        }));
      }
    } else if (name === "no_of_persons") {
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
        supplier_id: selectedAssistData?.supplier_id || "",
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
    // Update form state with the new data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...updatedFields,
    }));

    // Clear errors for the field
    setErrors((prevData) => ({
      ...prevData,
      ...(name === "no_of_persons" && {
        gross_amount: false,
      }),
      [name]: false,
    }));
  };
  const handleChange1 = (selectedItems, name) => {
    if (selectedItems.length > formData.no_of_persons) {
      toast.error(
        `You cannot select more than ${formData.no_of_persons} guests.`
      );
      return;
    } else {
      setFormData({
        ...formData,
        guest_ids: selectedItems,
      });
      setErrors((prevData) => ({
        ...prevData,
        [name]: false,
      }));
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      airport_name: formData?.airport_name ? false : true,
      no_of_persons: formData?.no_of_persons ? false : true,
      gross_amount: formData?.gross_amount ? false : true,
      total_amount: formData?.total_amount ? false : true,
      supplier_id: formData?.supplier_id ? false : true,
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
          dsr_id: data?.id,
        };
        dispatch(
          CreatePassengerAssistAction(sendData, setShowModal, refreshData)
        ).catch((error) => {
          console.error("Error during dispatch:", error);
        });
      } catch (error) {
        console.error("Error updating assist:", error);
      }
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
            <h5>{isEdit ? "Update Assists Service" : "Add Assists Service"}</h5>
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
                              setcusData={setcusData3}
                              cusData={cusData3}
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
                        <label>Guest</label>

                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}

                            <CustomDropdown031
                              ref={dropdownRef1}
                              label="Select Guest"
                              options={cusList?.data?.user}
                              value={formData.guest_ids}
                              onChange={(selectedItems) =>
                                handleChange1(selectedItems, "guest_ids")
                              }
                              name="guest_ids"
                              defaultOption="Select Guest "
                              setcusData={setcusData5}
                              cusData={cusData5}
                              type="vendor"
                              formData={formData}
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
                              setcusData={setcusData4}
                              cusData={cusData4}
                              type="vendor"
                              required
                            />
                          </span>
                          {errors?.supplier_id && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Supplier
                            </p>
                          )}
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
                      </div>
                      <div
                        className="secondtotalsections485s"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <CalculationSection
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Assist"
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
                createUpdate={createAssist}
                setShowModal={setShowModal}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssistPopup;
