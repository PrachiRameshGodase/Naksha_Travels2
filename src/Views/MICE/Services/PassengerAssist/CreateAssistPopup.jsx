import { useEffect, useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import { vendorsLists } from "../../../../Redux/Actions/listApisActions";
import { CreatePassengerMAssistAction } from "../../../../Redux/Actions/passengerMAssistActions";
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
import { customersView } from "../../../../Redux/Actions/customerActions";
import CustomDropdown31, { CustomDropdown031 } from "../../../../Components/CustomDropdown/CustomDropdown31";
import toast from "react-hot-toast";
import { CustomDropdown0029 } from "../../../../Components/CustomDropdown/CustomDropdown29";
import { assistListAction } from "../../../../Redux/Actions/assistAction";

const CreateAssistPopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const createAssist = useSelector((state) => state?.createPassengerAssist);
  const assistData = useSelector((state) => state?.assistList);
  const assistLists = assistData?.data?.data || [];

  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
  const [cusData2, setcusData2] = useState(null);
  const [cusData3, setcusData3] = useState(null);

  const [formData, setFormData] = useState({
    mice_id: data?.id,
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
    guest_ids: false,
    gross_amount: false,

    // retain: false,
    total_amount: false,
  });

  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  const [storeEntry, setStoreEntry] = useState([]);
  const [storeVisaType, setStoreVisaType] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("value", value);
    console.log("name", name);

    let updatedFields = { [name]: value };
    let selectedAssistData = null;
    if (name === "airport_name") {
      selectedAssistData = assistLists?.find((item) => item?.airport === value);
      console.log("selectedAssistData", selectedAssistData);
      if (selectedAssistData) {
        dispatch(
          assistListAction({ airport: selectedAssistData?.airport })
        ).then((res) => {
          console.log("res", res);
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
          item?.no_of_person === formData?.no_of_persons
      );
      if (selectedAssistData) {
        dispatch(
          assistListAction({
            airport_name: selectedAssistData?.airport,
            no_of_persons: selectedAssistData?.no_of_person,
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
        airport_name: selectedAssistData?.airport_name || "",
        no_of_persons: selectedAssistData?.no_of_person || "",
        meeting_type: selectedAssistData?.meeting_type || "",
        gross_amount: selectedAssistData?.price || "",
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
  const handleChange1 = (selectedItems, name) => {
    if (selectedItems.length > formData.no_of_persons) {
      toast.error(
        `You cannot select more than ${formData.max_occupancy} guests.`
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
      guest_ids: formData?.guest_ids ? false : true,
      airport_name: formData?.airport_name ? false : true,
      no_of_persons: formData?.no_of_persons ? false : true,
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
              : formData.guest_ids.join(", "),
          charges: JSON.stringify(formData?.charges),
        };
        const refreshData = {
          mice_id: data?.id,
        };
        dispatch(
          CreatePassengerMAssistAction(sendData, setShowModal, refreshData)
        );
      } catch (error) {
        toast.error("Unexpected error. Please refresh the page and try again.");
        console.error("Error updating assist:", error);
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
                            defaultOption="Select Country"
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
                      <div className="form_commonblock">
                        <label>
                          Family Member<b className="color_red">*</b>
                        </label>

                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}

                            <CustomDropdown031
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
                              Please Select Family Members
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
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
                      {/* <div className="form_commonblock">
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

                    </div> */}
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
