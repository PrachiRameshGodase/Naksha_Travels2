import { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import {
  customersList,
  customersView,
} from "../../../../Redux/Actions/customerActions";
import { vendorsLists } from "../../../../Redux/Actions/listApisActions";
import { CreatePassengerMInsuranceAction } from "../../../../Redux/Actions/passengerMInsuranceActions";
import { SubmitButton6 } from "../../../Common/Pagination/SubmitButton";
import ImageUpload from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import useFetchApiData from "../../../Helper/ComponentHelper/useFetchApiData";
import { formatDate } from "../../../Helper/DateFormat";
import {
  sendData,
  ShowMasterData,
  ShowUserMasterData,
} from "../../../Helper/HelperFunctions";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CalculationSection from "../../CalculationSection";
import "../CreateHotelPopup.scss";
import CustomDropdown31 from "../../../../Components/CustomDropdown/CustomDropdown31";
import Swal from "sweetalert2";
import { InsuranceListAction } from "../../../../Redux/Actions/InsuranceActions";
import CustomDropdown29 from "../../../../Components/CustomDropdown/CustomDropdown29";
import { financialYear } from "../../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const CreateInsurancePopup = ({
  showModal,
  setShowModal,
  data,
  passengerId,
}) => {
  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const insuranceListData = useSelector((state) => state?.insuranceList);
  const insuranceLists = insuranceListData?.data?.data || [];
  const customerDetail = useSelector((state) => state?.viewCustomer);
  const customerData = customerDetail?.data || {};
  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
  const createInsurance = useSelector(
    (state) => state?.createPassengerMInsurance
  );

  const [cusData1, setcusData1] = useState(null);
  const [cusData3, setcusData3] = useState(null);
  const [cusData2, setcusData2] = useState(null);

  const [formData, setFormData] = useState({
    mice_id: data?.id,
    passenger_id: passengerId,
    entry_type: "",
    passenger_insurance_id: 0,
    company_name: "",
    policy_no: null,
    insurance_plan: null,
    expiry_date: "",
    guest_ids: "",
    issue_date: "",
    supplier_id: "",
    supplier_name: "",
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
  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [errors, setErrors] = useState({
    // passenger_insurance_id: false,
    guest_ids: false,
    policy_no: false,
    insurance_plan: false,
    gross_amount: false,
    tax_amount: false,
    tax_percent: false,
    company_name: false,
    supplier_id: false,
    total_amount: false,
  });

  const entryType = ShowUserMasterData("50");

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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      // passenger_insurance_id: formData?.passenger_insurance_id ? false : true,
      guest_ids: formData?.guest_ids ? false : true,
      policy_no: formData?.policy_no ? false : true,
      insurance_plan: formData?.insurance_plan ? false : true,
      gross_amount: formData?.gross_amount ? false : true,
      supplier_id: formData?.supplier_id ? false : true,

      company_name: formData?.company_name ? false : true,
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
          CreatePassengerMInsuranceAction(sendData, setShowModal, refreshData)
        );
      } catch (error) {
        console.error("Error updating insurance:", error);
      }
    }
  };

  useEffect(() => {
    if (data?.customer_id) {
      const queryParams = {
        user_id: data?.customer_id,
        fy: financialYear(),
      };
      dispatch(customersView(queryParams));
    }
  }, [dispatch, data?.customer_id]);
  // call item api on page load...
  const payloadGenerator = useMemo(() => () => ({ ...sendData }), []);
  useFetchApiData(customersList, payloadGenerator, []); //call api common function
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
  useFetchApiData(InsuranceListAction, payloadGenerator, []); //call api common function

  // call item api on page load...

  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>
              {isEdit ? "Update Insurance Service" : "Add Insurance Service"}
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
                      {/* <div className="form_commonblock">
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
                              value={formData.passenger_insurance_id}
                              onChange={handleChange}
                              name="passenger_insurance_id"
                              defaultOption="Select Passenger"
                              setcusData={setcusData}
                              cusData={cusData}
                              type="vendor"
                              required
                            />
                          </span>
                          {errors?.passenger_insurance_id && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Passenger
                            </p>
                          )}
                        </div>
                      </div> */}
                      <div className="form_commonblock">
                        <label>Company Name<b className="color_red">*</b></label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <CustomDropdown29
                            autoComplete="off"
                            ref={dropdownRef1}
                            label="Company Name"
                            options={insuranceLists}
                            value={formData.company_name}
                            onChange={handleChange}
                            name="company_name"
                            defaultOption="Select Comapnay Name"
                            setcusData={setcusData3}
                            cusData={cusData3}
                            type="companyList"
                            required
                          />
                        </span>
                        {errors?.company_name && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Company
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Policy No<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.policy_no}
                            onChange={handleChange}
                            name="policy_no"
                            placeholder="Enter Policy No"
                          />
                        </span>
                        {errors?.policy_no && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Policy No
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock ">
                        <label>Issue Date</label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.issue_date}
                            onChange={(date) =>
                              setFormData({
                                ...formData,
                                issue_date: formatDate(date),
                              })
                            }
                            name="issue_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                            minDate={
                              new Date(new Date().getFullYear() - 50, 0, 1)
                            } // Minimum date: 50 years ago
                            maxDate={
                              formData?.expiry_date
                                ? new Date(formData.expiry_date) // Max date: Expiry Date (if set)
                                : new Date(
                                  new Date().getFullYear() + 50,
                                  11,
                                  31
                                ) // Default max date: 50 years in the future
                            }
                            showYearDropdown // Enables the year dropdown
                            scrollableYearDropdown // Allows scrolling in the year dropdown
                            yearDropdownItemNumber={101}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">

                      <div className="form_commonblock ">
                        <label>Expiry Date</label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.expiry_date}
                            onChange={(date) =>
                              setFormData({
                                ...formData,
                                expiry_date: formatDate(date),
                              })
                            }
                            name="expiry_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                            minDate={
                              formData?.issue_date
                                ? new Date(formData.issue_date) // Min date: Issue Date (if set)
                                : new Date(new Date().getFullYear() - 50, 0, 1) // Default min date: 50 years ago
                            }
                            maxDate={
                              new Date(new Date().getFullYear() + 50, 11, 31)
                            } // Max date: 50 years in the future
                            showYearDropdown // Enables the year dropdown
                            scrollableYearDropdown // Allows scrolling in the year dropdown
                            yearDropdownItemNumber={101}
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
                              setcusData={setcusData2}
                              cusData={cusData2}
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
                              Please Select Family Member
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Insurance Plan<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.insurance_plan}
                            onChange={handleChange}
                            name="insurance_plan"
                            placeholder="Enter Insurance Plan"
                          />
                        </span>
                        {errors?.insurance_plan && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Insurance Plan
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="f1wrapofcreqx1">

                      <div className="form_commonblock">
                        <label>Supplier<b className="color_red">*</b></label>
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
                          section="Insurance"
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
                createUpdate={createInsurance}
                setShowModal={setShowModal}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInsurancePopup;
