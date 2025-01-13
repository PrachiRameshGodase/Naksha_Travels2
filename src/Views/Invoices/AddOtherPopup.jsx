import { useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import { ShowMasterData } from "../Helper/HelperFunctions";
import NumericInput from "../Helper/NumericInput";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import { CalculationSection2 } from "../DSR/CalculationSection";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";

const AddOtherPopup = ({ setShowModal, handleAddService }) => {

    const dropdownRef1 = useRef(null);
    const dispatch = useDispatch();

    const vendorList = useSelector((state) => state?.vendorList);
    const createOther = useSelector((state) => state?.createPassengerOthers);

    const [cusData1, setcusData1] = useState(null);
    const [formData, setFormData] = useState({
        item_id: 0,
        item_name: "",
        quantity: null,
        price: null,
        supplier_id: "",
        supplier_name: "",
        //amount
        // charges: null,
        gross_amount: 0,
        discount: 0.0,
        tax_percent: null,
        tax_amount: 0.0,
        total_amount: 0.0,
    });

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const sendData = {
            ...formData,
            guest_ids: formData?.guest_ids?.length === 0 ? null : formData?.guest_ids?.join(", ")
        };
        handleAddService("Other", sendData);
        setShowModal(false);
    };

    // call item api on page load...
    const payloadGenerator = useMemo(() => () => ({ ...sendData, }), []);
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
                        <form >
                            {/* Keep your form as it is */}
                            <div className="relateivdiv">
                                <div className="itemsformwrap"  style={{ paddingBottom: "0px" }}>
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
                                            </div>
                                        </div>

                                        <div className="f1wrapofcreqx1">
                                            <div className="secondtotalsections485s">                        <CalculationSection2
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
