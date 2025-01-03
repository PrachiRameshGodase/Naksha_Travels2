import { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import { CreatePassengerOtherAction } from "../../../../Redux/Actions/passengerOthersActions";
import { SubmitButton2, SubmitButton6 } from "../../../Common/Pagination/SubmitButton";
import ImageUpload from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { ShowMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import "../CreateHotelPopup.scss";
import CalculationSection from "../../CalculationSection";
import { vendorsLists } from "../../../../Redux/Actions/listApisActions";
import useFetchApiData from "../../../Helper/ComponentHelper/useFetchApiData";

const CreateOtherPopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const vendorList = useSelector((state) => state?.vendorList);
  const createOther = useSelector((state) => state?.createPassengerOthers);

  const [cusData1, setcusData1] = useState(null);
  const [formData, setFormData] = useState({
    dsr_id: data?.id,
    passenger_id: passengerId,
    item_id: 0,
    item_name: "",
    quantity: null,
    price: null,
    supplier_id: "",
    supplier_name: "",
    //amount
    charges: null,
    hotel_price: null,
    discount: null,
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
      };
      dispatch(CreatePassengerOtherAction(sendData))
        .then((response) => {
          // if (response?.success === true) {
          setShowModal(false);
          // }
        })
        .catch((error) => {
          console.error("Error during dispatch:", error);
        });
    } catch (error) {
      console.error("Error updating other service:", error);
    }
  };
 // call item api on page load...
 const payloadGenerator = useMemo(() => () => ({ ...sendData, }),[]);
 useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
 // call item api on page load...

  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{isEdit ? "Update Other Service" : "Add Other Service"}</h5>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              <RxCross2 />
            </button>
          </div>

          <div className="modal-body">
            <form >
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
                          Item Details<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.item_name}
                            onChange={handleChange}
                            name="item_name"
                            placeholder="Enter Item Details"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>Quantity</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="quantity"
                              placeholder="Enter Quantity"
                              value={formData.quantity}
                              onChange={(e) => handleChange(e)}
                              type="number"
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>Price</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="price"
                              placeholder="Enter Price"
                              value={formData.price}
                              onChange={(e) => handleChange(e)}
                              type="number"
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
                        <CalculationSection
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Other"
                        />
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
               <SubmitButton6
                                          onClick={handleFormSubmit}
                                          cancel="dsr"
                                          createUpdate={createOther}
                                        />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOtherPopup;
