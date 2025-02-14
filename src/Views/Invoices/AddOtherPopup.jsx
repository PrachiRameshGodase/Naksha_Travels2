import { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import { ShowMasterData, ShowUserMasterData } from "../Helper/HelperFunctions";
import NumericInput from "../Helper/NumericInput";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import { CalculationSection2 } from "../DSR/CalculationSection";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import CustomDropdown03 from "../../Components/CustomDropdown/CustomDropdown03";
import Swal from "sweetalert2";

const AddOtherPopup = ({ setShowModal, handleAddService, edit_data, section }) => {
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
  const vendorList = useSelector((state) => state?.vendorList);
  const itemList = useSelector((state) => state?.itemList);
  const options2 = itemList?.data?.item;

  const [cusData1, setcusData1] = useState(null);
  const [cusData2, setcusData2] = useState(null);

  const [formData, setFormData] = useState({
    service_name: "Others",
    item_id: service_data?.item_id || 0, // Example for item ID
    item_name: service_data?.item_name || "", // Example for item name
    quantity: service_data?.quantity || null, // Example for quantity
    price: service_data?.price || 0, // Example for price
    supplier_id: service_data?.supplier_id || "", // Example for supplier ID
    supplier_name: service_data?.supplier_name || "", // Example for supplier name

    // Amount fields
    gross_amount: gross_amount || 0, // Gross amount if provided
    discount: 0.0, // Default discount value
    tax_percent: tax_rate || null, // Tax percent if provided
    tax_amount: 0.0, // Default tax amount
    total_amount: 0.0, // Default total amount
  });

  const [errors, setErrors] = useState({
    item_id: false,
    quantity: false,
    // price: false,
  });

  const entryType = ShowUserMasterData("50");

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
      updatedFields.gross_amount = selectedItemName?.price;
    }
    setFormData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
      ...(name === "item_id" && {
        gross_amount: false,
      }),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      item_id: formData?.item_id ? false : true,
      quantity: formData?.quantity ? false : true,
      // price: formData?.item_id ? false : true,
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
  useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
  // call item api on page load...

  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add Other Service</h5>
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
                        <label>
                          Quantity<b className="color_red">*</b>
                        </label>
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
                      {/* <div className="form_commonblock">
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
                      </div> */}
                      {section != "sales" && <div className="form_commonblock">
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
                      </div>}
                    </div>

                    <div className="f1wrapofcreqx1">
                      <div
                        className="secondtotalsections485s"
                        style={{ justifyContent: "flex-end" }}
                      >
                        {" "}
                        <CalculationSection2
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

export default AddOtherPopup;
