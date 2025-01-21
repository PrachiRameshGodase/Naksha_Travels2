import { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../../../Components/CustomDropdown/CustomDropdown10";
import { CreatePassengerOtherAction } from "../../../../Redux/Actions/passengerOthersActions";
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
import CalculationSection from "../../CalculationSection";
import { itemLists, vendorsLists } from "../../../../Redux/Actions/listApisActions";
import useFetchApiData from "../../../Helper/ComponentHelper/useFetchApiData";
import { CreatePassengerMOtherAction } from "../../../../Redux/Actions/passengerMOtherActions";
import CustomDropdown03 from "../../../../Components/CustomDropdown/CustomDropdown03";

const CreateOtherPopup = ({ showModal, setShowModal, data, passengerId }) => {
  const dropdownRef1 = useRef(null);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const vendorList = useSelector((state) => state?.vendorList);
  const createOther = useSelector((state) => state?.createPassengerMOther);
  const itemList = useSelector((state) => state?.itemList);
  const options2 = itemList?.data?.item;

  const [cusData1, setcusData1] = useState(null);
  const [cusData2, setcusData2] = useState(null);

  const [formData, setFormData] = useState({
    mice_id: data?.id,
    passenger_id: passengerId,
    item_id: "",
    item_name: "",
    quantity: null,
    price: null,
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
    item_id: false,
    quantity:false,
    price:false,
    gross_amount: false,
   
    // retain: false,
    total_amount: false,
  });
  const entryType = ShowMasterData("50");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFields = { [name]: value };
  
    if (name === "supplier_id") {
      const selectedSupplierName = vendorList?.data?.user?.find(
        (item) => item?.id == value
      );
      updatedFields.supplier_name = selectedSupplierName?.display_name || "";
    }
  
    if (name === "item_id") {
      const selectedItemName = options2?.find((item) => item?.id == value);
      updatedFields.item_name = selectedItemName?.name || "";
    }
    setFormData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let newErrors = {
      item_id: formData?.item_id ? false : true,
      quantity: formData?.price ? false : true,
      price: formData?.item_id ? false : true,
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
        charges: JSON.stringify(formData?.charges),
      };
      const refreshData = {
        mice_id: data?.id,
      };
      dispatch(CreatePassengerMOtherAction(sendData, setShowModal, refreshData))
       
    } catch (error) {
      console.error("Error updating other service:", error);
    }
    }
  };
  // call item api on page load...
  const payloadGenerator = useMemo(() => () => ({ ...sendData }), []);
  useFetchApiData(vendorsLists, payloadGenerator, []); 
  useFetchApiData(itemLists, payloadGenerator, []); 

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
                          Item Details<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <CustomDropdown03
                            options={options2 || []}
                            value={formData?.item_id}
                            name="item_id"
                            onChange={handleChange}
                            type="select_item"
                            setItemData={setcusData2}
                            defaultOption="Select Item"
                            index="0"
                            extracssclassforscjkls=""
                            itemData={cusData2}
                            ref={dropdownRef1}
                          />
                        </span>
                        {errors?.item_id && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Select Item
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>Quantity<b className="color_red">*</b></label>
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
                          {errors?.quantity && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Quantity
                          </p>
                        )}
                        </div>
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>Price<b className="color_red">*</b></label>
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
                          {errors?.price && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Price
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
                        <CalculationSection
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          section="Other"
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
                createUpdate={createOther}
                setShowModal={setShowModal}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOtherPopup;
