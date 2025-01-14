import { useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import { formatDate } from "../Helper/DateFormat";
import { ShowMasterData } from "../Helper/HelperFunctions";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import "../DSR/Services/CreateHotelPopup.scss";
import { CalculationSection2 } from "../DSR/CalculationSection";
import { customersList } from "../../Redux/Actions/customerActions";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";

const AddInsurancePopup = ({ setShowModal, handleAddService }) => {

    const dropdownRef1 = useRef(null);
    const dispatch = useDispatch();

    const cusList = useSelector((state) => state?.customerList);
    const vendorList = useSelector((state) => state?.vendorList);
    const createInsurance = useSelector((state) => state?.createPassengerInsurance);


    const [cusData, setcusData] = useState(null);
    const [cusData1, setcusData1] = useState(null);
    const [formData, setFormData] = useState({
        // entry_type: "",
        passenger_insurance_id: "",
        company_name: "",
        policy_no: null,
        insurance_plan: null,
        expiry_date: "",
        guest_ids: "",
        issue_date: "",
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
        handleAddService("Insurance", sendData);
        setShowModal(false);
    };

    // call item api on page load...
    const payloadGenerator = useMemo(() => () => ({ ...sendData, }), []);
    useFetchApiData(customersList, payloadGenerator, []); //call api common function
    useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
    // call item api on page load...

    return (
        <div id="formofcreateitems">
            <div className="custom-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>
                            Add Insurance Service
                        </h5>
                        <button className="close-button" onClick={() => setShowModal(false)}>
                            <RxCross2 />
                        </button>
                    </div>

                    <div className="modal-body">
                        <form>
                            {/* Keep your form as it is */}
                            <div className="relateivdiv">
                                <div className="itemsformwrap"  style={{ paddingBottom: "0px" }}>
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
                                                </div>
                                            </div>
                                            <div className="form_commonblock">
                                                <label>
                                                    Company Name<b className="color_red">*</b>
                                                </label>
                                                <span>
                                                    {otherIcons.placeofsupply_svg}
                                                    <input
                                                        value={formData.company_name}
                                                        onChange={handleChange}
                                                        name="company_name"
                                                        placeholder="Enter Company Name"
                                                    />
                                                </span>
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
                                            </div>
                                        </div>

                                        <div className="f1wrapofcreqx1">
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
                                                    />
                                                </span>
                                            </div>
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
                                                    />
                                                </span>
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
                                            </div>
                                        </div>
                                        <div className="f1wrapofcreqx1">
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
                                            <div className="secondtotalsections485s">
                                                <CalculationSection2 formData={formData} setFormData={setFormData} handleChange={handleChange} section='Insurance' />
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
