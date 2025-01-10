import { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import { SubmitButton6} from "../Common/Pagination/SubmitButton";
import { ShowMasterData } from "../Helper/HelperFunctions";
import NumericInput from "../Helper/NumericInput";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import { customersList } from "../../Redux/Actions/customerActions";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import CalculationSection from "../DSR/CalculationSection";

const AddAssistPopup = ({ setShowModal, handleAddService }) => {
    
  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();

  const vendorList = useSelector((state) => state?.vendorList);
  const createAssist = useSelector((state) => state?.createPassengerAssist);

  const [cusData1, setcusData1] = useState(null);
  const [formData, setFormData] = useState({
    entry_type: "",
    airport_id: null,
    airport_name: "",
    meeting_type: null,
    no_of_persons: "",
    guest_ids: "",
    supplier_id: "",
    supplier_name: null,
    // Amount
    gross_amount: null,
    charges: null,
    discount: null,
    supplier_total: null,
    tax_percent: null,
    tax_amount: null,
    total_amount: null
  });

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
  };

  const handleFormSubmit = async (e) => {
        e.preventDefault();
        const sendData = {
            ...formData,
            guest_ids: formData?.guest_ids?.length === 0 ? null : formData?.guest_ids?.join(", ")
        };
        handleAddService("Assist",sendData);
        setShowModal(false);
    };

  // call item api on page load...
  const payloadGenerator = useMemo(() => () => ({ ...sendData, }),[]);
  useFetchApiData(customersList, payloadGenerator, []); //call api common function
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
  // call item api on page load...

  return (
    <div id="formofcreateitems">
    <div className="custom-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5>Add Assists Service</h5>
          <button className="close-button" onClick={() => setShowModal(false)}>
            <RxCross2 />
          </button>
        </div>

        <div className="modal-body">
          <form>
            {/* Keep your form as it is */}
            <div className="relateivdiv">
              <div className="itemsformwrap">
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
                    </div>
                    <div className="form_commonblock">
                      <label>
                        Meeting Type<b className="color_red">*</b>
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
                  </div>

                  <div className="f1wrapofcreqx1">
                    <div className="form_commonblock">
                      <label>No Of Persons</label>
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
                    <div className="secondtotalsections485s">
                      <CalculationSection
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
              cancel="dsr"
              createUpdate={createAssist}
            />
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddAssistPopup;
