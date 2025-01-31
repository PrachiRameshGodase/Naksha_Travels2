import { useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import { formatDate } from "../Helper/DateFormat";
import { ShowMasterData, ShowUserMasterData } from "../Helper/HelperFunctions";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import { CalculationSection2 } from "../DSR/CalculationSection";
import { customersList } from "../../Redux/Actions/customerActions";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import Swal from "sweetalert2";
import CustomDropdown29 from "../../Components/CustomDropdown/CustomDropdown29";
import { InsuranceListAction } from "../../Redux/Actions/InsuranceActions";

const AddInsurancePopup = ({ setShowModal, handleAddService, edit_data }) => {
  const { discount, discount_type, gross_amount, item_id, item_name, rate, tax_rate, service_data } = edit_data

  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();

  const insuranceListData = useSelector((state) => state?.insuranceList);
  const insuranceLists = insuranceListData?.data?.data || [];
  const cusList = useSelector((state) => state?.customerList);
  const vendorList = useSelector((state) => state?.vendorList);
 
  const [cusData, setcusData] = useState(null);
  const [cusData3, setcusData3] = useState(null);


  const [formData, setFormData] = useState({
    service_name: "Insurance",
    passenger_insurance_id: service_data?.passenger_insurance_id || "",  // Example for passenger insurance ID
    company_name: service_data?.company_name || "",                     // Example for insurance company name
    policy_no: service_data?.policy_no || null,                         // Example for policy number
    insurance_plan: service_data?.insurance_plan || null,               // Example for insurance plan
    expiry_date: service_data?.expiry_date || "",                       // Example for expiry date
    guest_ids: service_data?.guest_ids || "",                           // Example for guest IDs
    issue_date: service_data?.issue_date || "",                         // Example for issue date
    supplier_id: service_data?.supplier_id || "",                       // Example for supplier ID
    supplier_name: service_data?.supplier_name || "",                   // Example for supplier name

    // Amount fields
    gross_amount: gross_amount || 0,                                    // Gross amount if provided
    discount: 0.0,                                          // Default discount value
    tax_percent: tax_rate || null,                                      // Tax percent if provided
    tax_amount: 0.0,                                                    // Default tax amount
    total_amount: 0.0,                                                  // Default total amount
  });



  const [errors, setErrors] = useState({
    passenger_insurance_id: false,
    company_name: false,
    policy_no: false,
    insurance_plan: false,
    issue_date: false,
    expiry_date: false,

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
      passenger_insurance_id: formData?.passenger_insurance_id ? false : true,
      company_name: formData?.company_name ? false : true,

      policy_no: formData?.policy_no ? false : true,
      insurance_plan: formData?.insurance_plan ? false : true,
      issue_date: formData?.issue_date ? false : true,
      expiry_date: formData?.expiry_date ? false : true,

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
  useFetchApiData(InsuranceListAction, payloadGenerator, []); //call api common function

  // call item api on page load...

  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add Insurance Service</h5>
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
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Company Name<b className="color_red">*</b>
                        </label>
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
                            Please Fill Company Name
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
                    </div>

                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock ">
                        <label>Issue Date<b className="color_red">*</b></label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.issue_date}
                            onChange={(date) =>
                              handleDateChange(date, "issue_date")
                            }
                            name="issue_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                            maxDate={
                              formData?.expiry_date ? new Date(formData.expiry_date) : null
                            }
                          />
                        </span>
                        {errors?.issue_date && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Issue Date
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock ">
                        <label>Expiry Date<b className="color_red">*</b></label>
                        <span>
                          {otherIcons.date_svg}
                          <DatePicker
                            selected={formData?.expiry_date}
                            onChange={(date) =>
                              handleDateChange(date, "expiry_date")
                            }
                            name="expiry_date"
                            placeholderText="Enter Date"
                            dateFormat="dd-MM-yyyy"
                            autoComplete="off"
                            minDate={
                              formData?.issue_date ? new Date(formData.issue_date) : null
                            }
                          />
                        </span>
                        {errors?.expiry_date && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Expiry Date
                          </p>
                        )}
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

                      </div> */}
                      <div className="secondtotalsections485s" style={{ justifyContent: "flex-end" }}>
                        <CalculationSection2
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Insurance"
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

export default AddInsurancePopup;
