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
import { sendData, ShowMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import CalculationSection from "../../CalculationSection";
import "../CreateHotelPopup.scss";
import { customersView } from "../../../../Redux/Actions/customerActions";
import CustomDropdown31 from "../../../../Components/CustomDropdown/CustomDropdown31";
import toast from "react-hot-toast";

const CreateAssistPopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const customerDetail = useSelector((state) => state?.viewCustomer);
  const customerData = customerDetail?.data || {};
  const vendorList = useSelector((state) => state?.vendorList);
  const createAssist = useSelector((state) => state?.createPassengerMAssist);
  
  const [cusData, setcusData] = useState(null);
  const [cusData1, setcusData1] = useState(null);
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
    no_of_persons:false,
    guest_ids:false,
    gross_amount: false,
 
    // retain: false,
    total_amount: false,
  });

  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

  const entryType = ShowMasterData("50");

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
      dispatch(CreatePassengerMAssistAction(sendData, setShowModal, refreshData))
       
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
  const payloadGenerator = useMemo(() => () => ({ ...sendData, }),[]);
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
  // call item api on page load...

  return (
    <div id="formofcreateitems">
    <div className="custom-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5>{isEdit ? "Update Assists Service" : "Add Assists Service"}</h5>
          <button className="close-button" onClick={() => setShowModal(false)}>
            <RxCross2 />
          </button>
        </div>

        <div className="modal-body">
          <form>
            {/* Keep your form as it is */}
            <div className="relateivdiv">
              <div className="itemsformwrap"  style={{paddingBottom:"0px"}}>
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
                            Please Select Family Members
                          </p>
                        )}
                          </div>
                        </div>
                  </div>

                  <div className="f1wrapofcreqx1">
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
                      </div>

                      <div className="secondtotalsections485s" style={{justifyContent:"flex-end"}}>

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
