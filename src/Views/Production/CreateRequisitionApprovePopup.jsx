import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { useDispatch, useSelector } from "react-redux";
import { stockItemAdjustment } from "../../Redux/Actions/itemsActions";
import { itemLists, accountLists } from "../../Redux/Actions/listApisActions";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import CustomDropdown03 from "../../Components/CustomDropdown/CustomDropdown03";
import { fetchMasterData } from "../../Redux/Actions/globalActions";
import { BsArrowRight, BsEye } from "react-icons/bs";
import { isPartiallyInViewport } from "../Helper/is_scroll_focus.jsx";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons.jsx";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import { getAccountTypes } from "../../Redux/Actions/accountsActions";
import ImageUpload, { MultiImageUploadHelp } from "../Helper/ComponentHelper/ImageUpload";
import {
    binViewAction,
    rackViewAction,
    warehouseViewAction,
    zoneViewAction,
} from "../../Redux/Actions/warehouseActions";
import { manufacturingCreateStockApprovalAction } from "../../Redux/Actions/manufacturingActions.js";
import { showToast } from "../Helper/ComponentHelper/toastConfigure.js";
import { formatDate } from "../Helper/DateFormat.jsx";

const CreateRequisitionApprovePopup = ({ closePopup, itemDetailData, setSearchTrigger }) => {
    const dispatch = useDispatch();
    const itemList = useSelector((state) => state?.itemList?.data?.item);
    const [freezLoadingImg, setFreezLoadingImg] = useState(false);
    const [imgLoader, setImgeLoader] = useState("");

    const Navigate = useNavigate();
    const warehouseView = useSelector((state) => state?.warehouseView);
    const createStockApproval = useSelector((state) => state?.createStockApproval);
    const warehouseViews = warehouseView?.data?.warehouse;

    const zoneView = useSelector((state) => state?.zoneView);
    const zoneViews = zoneView?.data?.data;

    const rackView = useSelector((state) => state?.rackView);
    const rackViews = rackView?.data?.data;

    const binView = useSelector((state) => state?.binView);
    const binViews = binView?.data?.data;

    const [formData, setFormData] = useState({
        transaction_date: new Date(),
        item_id: itemDetailData?.item_id,
        requestion_item_id: itemDetailData?.id,
        unit_id: itemDetailData?.item?.unit,
        remarks: "",
        warehouse_id: null,
        zone_id: null,
        rack_id: null,
        bin_id: null,
        quantity: null,
        upload_documents: []
    });

    const inputRefs = {
        dateRef: useRef(null),
        warehouseRef: useRef(null),
        quantityRef: useRef(null),
    };
    const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);

    // Add this function to check if all required fields are filled
    const checkRequiredFields = () => {
        const { item_id, unit_id, account_id, reason_type } = formData;
        return (
            item_id !== "" &&
            unit_id !== ""
        );
    };

    // Update the form data and check if all required fields are filled
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "warehouse_id") {
            dispatch(zoneViewAction({ warehouse_id: value }));
        } else if (name === "zone_id") {
            dispatch(rackViewAction({ zone_id: value }));
        } else if (name === "rack_id") {
            dispatch(binViewAction({ rack_id: value }));
        }

        setFormData({
            ...formData,
            [name]: value,
        });
        setRequiredFieldsFilled(checkRequiredFields());
    };

    useEffect(() => {
        setRequiredFieldsFilled(checkRequiredFields());
    }, [formData]);

    const submitButtonClass = requiredFieldsFilled ? "" : "disabled";

    useEffect(() => {
        dispatch(warehouseViewAction());
    }, [dispatch]);

    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const fieldValidations = [
            {
                name: 'transaction_date',
                ref: inputRefs.dateRef,
                isValid: !!formData.transaction_date,
            },

            {
                name: 'warehouse_id',
                ref: inputRefs.warehouseRef,
                isValid: !!formData.warehouse_id,
            },
            {
                name: 'quantity',
                ref: inputRefs.quantityRef,
                isValid: !!formData.quantity,
            },

        ];

        for (let field of fieldValidations) {

            if (!field.isValid && field.ref.current) {
                if (!isPartiallyInViewport(field.ref.current)) {
                    field.ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
                }
                field.ref.current.focus();
                return;
            }
        }
        setLoading(true)
        dispatch(manufacturingCreateStockApprovalAction({ ...formData, upload_documents: JSON.stringify(formData?.upload_documents), transaction_date: formatDate(formData?.transaction_date) }, setSearchTrigger)).then(() => {
            setLoading(false)
            closePopup(false);
        })

    };

    return (
        <>

            {(zoneView?.loading || rackView?.loading || freezLoadingImg || loading) && <MainScreenFreezeLoader />}

            <div className="formsectionsgrheigh">
                <TopLoadbar />

                <div id="Anotherbox" className="formsectionx1" style={{
                    height: "120px",
                    background: "white"
                }}>
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}> <div id="leftareax12">
                        <h1 id="firstheading">
                            {otherIcons?.stock_item_approve_svg}
                            Item Stock Approve
                        </h1>

                    </div>

                        <div id="" style={{ marginTop: "18px" }}>
                            <p style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ marginLeft: "12px" }}><b> Item Name :</b> <span>{itemDetailData?.item?.name || ""}</span></span>
                                <span style={{ marginLeft: "12px", marginTop: "5px" }}> <b >Order quantity : </b> <span>{itemDetailData?.quantity || ""}</span></span>
                            </p>
                        </div></div>


                    <div id="buttonsdata">
                        <Link onClick={() => closePopup(false)} className="linkx3">
                            <RxCross2 />
                        </Link>
                    </div>
                </div>

                {/* <div className="bordersinglestroke"></div> */}
                <div id="middlesection">
                    <div id="formofcreateitems">
                        <form onSubmit={handleSubmit}>
                            <div className="itemsformwrap itemformtyop02">
                                <div id="forminside">
                                    <div className="secondx2 thirdx2extra">
                                        <div className="form-group">
                                            <label>
                                                Date<b className="color_red">*</b>
                                            </label>
                                            <span>
                                                {otherIcons?.date_svg}
                                                <DatePicker
                                                    ref={inputRefs.dateRef}
                                                    selected={formData.transaction_date}
                                                    onChange={(date) =>
                                                        handleChange({
                                                            target: { name: "transaction_date", value: date },
                                                        })
                                                    }
                                                    className={
                                                        formData.transaction_date ? "filledcolorIn" : null
                                                    }
                                                    placeholderText="Enter Date"
                                                    dateFormat="dd-MM-yyy"
                                                />

                                            </span>
                                            {!formData.transaction_date && (
                                                <p className="error-message">
                                                    {otherIcons.error_svg}
                                                    Please select date
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label>
                                                Select Warehouse<b className="color_red">*</b>
                                            </label>
                                            <span>
                                                {otherIcons?.category_svg}
                                                <CustomDropdown03
                                                    ref={inputRefs.warehouseRef}
                                                    options={warehouseViews || []}
                                                    value={formData.warehouse_id}
                                                    onChange={handleChange}
                                                    name="warehouse_id"
                                                    defaultOption="Select Warehouse"
                                                    type="categories"
                                                />
                                            </span>
                                            {!formData.warehouse_id && (
                                                <p className="error-message">
                                                    {otherIcons.error_svg}
                                                    Please  select a warehouse
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Select Zone<b className="color_red">*</b>
                                            </label>
                                            <span>
                                                {otherIcons?.category_svg}
                                                <CustomDropdown03
                                                    options={zoneViews || []}
                                                    value={formData.zone_id}
                                                    onChange={handleChange}
                                                    name="zone_id"
                                                    defaultOption="Select Zone"
                                                    type="categories"
                                                />
                                            </span>

                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Select Rack<b className="color_red">*</b>
                                            </label>
                                            <span>
                                                {otherIcons?.category_svg}
                                                <CustomDropdown03
                                                    options={rackViews || []}
                                                    value={formData.rack_id}
                                                    onChange={handleChange}
                                                    name="rack_id"
                                                    defaultOption="Select Rack"
                                                    type="categories"
                                                />
                                            </span>

                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Select Bin<b className="color_red">*</b>
                                            </label>
                                            <span>
                                                {otherIcons?.category_svg}
                                                <CustomDropdown03
                                                    options={binViews || []}
                                                    value={formData.bin_id}
                                                    onChange={handleChange}
                                                    name="bin_id"
                                                    defaultOption="Select Bin"
                                                    type="categories"
                                                />
                                            </span>

                                        </div>



                                        <div className="form-group">
                                            <label>
                                                {" "}
                                                Quantity<b className="color_red">*</b>
                                            </label>
                                            <span>
                                                {otherIcons?.category_svg}

                                                <input
                                                    type="number"
                                                    ref={inputRefs.quantityRef}
                                                    className={formData.quantity ? "filledcolorIn" : null}
                                                    name="quantity"
                                                    placeholder="Enter quantity"
                                                    value={formData.quantity}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const newValue = inputValue === "" ? null : parseFloat(inputValue);
                                                        const maxQuantity = itemDetailData?.quantity || 0;

                                                        if (newValue > maxQuantity) {
                                                            showToast('Quantity cannot be greater than the order quantity', "error")
                                                            setFormData((prevFormData) => ({
                                                                ...prevFormData,
                                                                quantity: maxQuantity,
                                                            }));

                                                            return;
                                                        }

                                                        // Update the form data if the value is valid
                                                        setFormData((prevFormData) => ({
                                                            ...prevFormData,
                                                            quantity: newValue,
                                                        }));
                                                    }}
                                                />
                                            </span>
                                            {!formData.quantity && (
                                                <p className="error-message">
                                                    {otherIcons.error_svg}
                                                    Please enter quantity
                                                </p>
                                            )}
                                        </div>






                                        <div className="form-group">
                                            <label> Remarks</label>
                                            <textarea
                                                className={
                                                    "textareax1series" +
                                                    (formData.remarks ? " filledcolorIn" : "")
                                                }
                                                name="remarks"
                                                placeholder="Enter Remarks"
                                                value={formData.remarks}
                                                onChange={handleChange}
                                                rows="4"
                                            />
                                        </div>

                                        <div id="imgurlanddesc">
                                            <MultiImageUploadHelp
                                                formData={formData}
                                                setFormData={setFormData}
                                                setFreezLoadingImg={setFreezLoadingImg}
                                                imgLoader={imgLoader}
                                                setImgeLoader={setImgeLoader}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="actionbar" id='actionbarPop' style={{ zIndex: "0" }}>

                                <button
                                    className={`btn  ${submitButtonClass ? 'disabledbtn' : ''}`}
                                    id='herobtnskls'
                                    type="submit"
                                >
                                    <p>
                                        Submit
                                        <BsArrowRight />
                                    </p>
                                </button>

                                <button type="button" onClick={() => closePopup(false)}>
                                    <Link >Cancel</Link>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
                <Toaster />
            </div>
        </>
    );
};

export default CreateRequisitionApprovePopup;
