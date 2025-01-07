import { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import {
  SubmitButton2,
  SubmitButton6,
} from "../../../Common/Pagination/SubmitButton";
import ImageUpload from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { sendData, ShowMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import "../CreateHotelPopup.scss";
import { CreatePassengerCarHireAction } from "../../../../Redux/Actions/passengerCarHireActions";
import CalculationSection from "../../CalculationSection";
import { customersList } from "../../../../Redux/Actions/customerActions";
import { vendorsLists } from "../../../../Redux/Actions/listApisActions";
import useFetchApiData from "../../../Helper/ComponentHelper/useFetchApiData";

const CreateCarHirePopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const vendorList = useSelector((state) => state?.vendorList);
  const createCarHire = useSelector((state) => state?.createPassengerCarHire);

  const [cusData1, setcusData1] = useState(null);
  const [formData, setFormData] = useState({
    dsr_id: data?.id,
    passenger_id: passengerId,
    entry_type: "",
    vehicle_type_id: "",
    days: "",
    pickup_location: null,
    drop_location: null,
    guest_ids: "",
    supplier_id: 1,
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
  const [imgLoader, setImgeLoader] = useState("");
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);

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
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const sendData = {
        ...formData,
        guest_ids:
          formData?.guest_ids?.length === 0
            ? null
            : formData?.guest_ids?.join(", "),
            charges: JSON.stringify(formData?.charges)
      };
      dispatch(CreatePassengerCarHireAction(sendData))
        .then((response) => {
          // if (response?.success === true) {
          setShowModal(false);
          // }
        })
        .catch((error) => {
          console.error("Error during dispatch:", error);
        });
    } catch (error) {
      console.error("Error updating car hire:", error);
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
                              setcusData={setcusData1}
                              cusData={cusData1}
                              type="vendor"
                              required
                            />
                          </span>
                        </div>

                        {/* <DeleveryAddress onSendData={handleChildData} formdatas={{ formData, setFormData }} /> */}
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
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
                        <CalculationSection
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
                cancel="dsr"
                createUpdate={createCarHire}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCarHirePopup;
