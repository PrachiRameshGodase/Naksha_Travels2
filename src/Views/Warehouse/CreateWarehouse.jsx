import React, { useEffect, useState, useRef } from 'react';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import DisableEnterSubmitForm from '../Helper/DisableKeys/DisableEnterSubmitForm';
import { useDispatch, useSelector } from 'react-redux';
import { customersList } from '../../Redux/Actions/customerActions';
import CustomDropdown10 from '../../Components/CustomDropdown/CustomDropdown10';
import { accountLists, itemLists, vendorsLists } from '../../Redux/Actions/listApisActions';
import DatePicker from "react-datepicker";

import { otherIcons } from '../Helper/SVGIcons/ItemsIcons/Icons';
import { GoPlus } from 'react-icons/go';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';
import { expenseHeadLists, fetchCurrencies, fetchGetCities, fetchGetCountries, fetchGetStates, fetchMasterData } from '../../Redux/Actions/globalActions';
import toast, { Toaster } from 'react-hot-toast';
import Loader02 from '../../Components/Loaders/Loader02';
import CustomeDropdown2 from '../../Components/CustomDropdown/CustomeDropdown2';
import { createExpenses, expensesDetails } from '../../Redux/Actions/expenseActions';
import { formatDate, todayDate } from '../Helper/DateFormat';
import NumericInput from '../Helper/NumericInput';
import CustomDropdown15 from '../../Components/CustomDropdown/CustomDropdown15';
import { getAccountTypes } from '../../Redux/Actions/accountsActions';
import ImageUpload from '../Helper/ComponentHelper/ImageUpload';

import { warehouse_type, warehouse_for, warehouse_department } from '../Helper/ComponentHelper/DropdownData';
import CustomDropdown04 from '../../Components/CustomDropdown/CustomDropdown04';
import { warehouseCreateAction, warehouseDetailAction } from '../../Redux/Actions/warehouseActions';
import CustomDropdown06, { CustomDropdown006 } from '../../Components/CustomDropdown/CustomDropdown06';
import CustomDropdown24 from '../../Components/CustomDropdown/CustomDropdown24';
import { SubmitButton2 } from '../Common/Pagination/SubmitButton';
import { ShowMasterData } from '../Helper/HelperFunctions';


const CreateWarehouse = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const countries = useSelector(state => state?.countries);
    const countriess = countries?.countries?.country

    const states = useSelector(state => state?.states);
    const statess = states?.state?.country
    // console.log("statess", statess)

    const cities = useSelector(state => state?.cities);
    const citiess = cities?.city?.country


    const warehouseCreate = useSelector(state => state?.warehouseCreate);
    const warehouseCreates = warehouseCreate?.data

    const warehouseDetails = useSelector(state => state?.warehouseDetail);
    const warehouseDetail = warehouseDetails?.data?.data;

    const params = new URLSearchParams(location.search);
    const { id: itemId, edit: isEdit, convert, dublicate: isDublicate } = Object.fromEntries(params.entries());
    const showdeparment = ShowMasterData("10");
    const showWarehouseType = ShowMasterData("22");

    


    const [formData, setFormData] = useState({
        name: "",
        // branch_name: "",
        warehouse_type: "",
        capacity: "",
        department: "",
        description: "",
        warehouse_for: "",
        address: "",
        city: "",
        country: "",
        state: "",
        id: 0
    }
    );

    // console.log("itemId && isEdit && billDetail", itemId, isEdit, billDetail)

    useEffect(() => {
        if ((itemId && isEdit && warehouseDetail) || (itemId && isDublicate && warehouseDetail) || itemId && (convert === "saleToInvoice")) {
            const depArray = JSON.parse(warehouseDetail?.department || "[]");
            setFormData({
                id: isEdit ? itemId : 0,
                name: (warehouseDetail?.name),
                warehouse_type: warehouseDetail?.warehouse_type,
                department: !depArray ? [] : depArray,
                warehouse_for: warehouseDetail?.warehouse_for,
                address: (warehouseDetail?.address),
                country: (warehouseDetail?.country?.id),
                state: (warehouseDetail?.state?.id),
                city: warehouseDetail?.city?.id,
            });

            if (warehouseDetail?.country?.id) {
                dispatch(fetchGetStates({ country_id: warehouseDetail?.country?.id }));
                dispatch(fetchGetCities({ state_id: warehouseDetail?.state?.id }));
            }

        }
    }, [itemId, isEdit, convert, warehouseDetail, isDublicate]);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "country") {
            const countryId = value;
            dispatch(fetchGetStates({ country_id: countryId }));
        } else if (name === "state") {
            const stateId = value;
            dispatch(fetchGetCities({ state_id: stateId }));
        }


        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleChange1 = (selectedItems) => {
        setFormData({
            ...formData,
            department: selectedItems, // Update selected items array
        });
    };
    // console.log("formdata", formData)
    // const handleChange2 = (e) => {
    //     const { name, value } = e.target;
    //     let newValue = value;
    //     setFormData({
    //         ...formData,
    //         department: selectedItems, // Update selected items array
    //     });
    // };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const sendData = {
                ...formData,
                department: formData?.department?.length === 0 ? null : JSON?.stringify(formData?.department)
            };
            dispatch(warehouseCreateAction(sendData, Navigate, isEdit));
        } catch (error) {
            toast.error('Error updating warehouse:', error);
        }
    };

    useEffect(() => {
        if (!warehouseDetail && itemId) {
            dispatch(warehouseDetailAction({ warehouse_id: itemId }));
        }
    }, [dispatch]);


    return (
        <>
            <Toaster />
            <TopLoadbar />

            {(states?.loading || cities?.loading || warehouseCreate?.loading) && <MainScreenFreezeLoader />}

            <div className='formsectionsgrheigh'>
                <div id="Anotherbox" className='formsectionx2'>

                    <div id="leftareax12">
                        <h1 id="firstheading">
                            {otherIcons?.warehouse_icon}
                            New Warehouse
                        </h1><br /><br /><br /><br />
                    </div>

                    <div id="buttonsdata">
                        <Link to={"/dashboard/warehouse"} className="linkx3">
                            <RxCross2 />
                        </Link>
                    </div>
                </div>

                <div id="formofcreateitems" >
                    <DisableEnterSubmitForm onSubmit={handleFormSubmit}>
                        <div className="relateivdiv">
                            {/* <div className=""> */}
                            <div className="itemsformwrap">
                                <div className="f1wrapofcreq" style={{ paddingBottom: "31vh" }}>



                                    <div className="f1wrapofcreqx1">

                                        <div className="form_commonblock ">
                                            <label className='color_red'>Warehouse Type</label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <CustomDropdown04
                                                    options={showWarehouseType}
                                                    value={formData.warehouse_type}
                                                    onChange={handleChange}
                                                    name="warehouse_type"
                                                    defaultOption="Select Regular/Container/Silo"
                                                    type="masters"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="f1wrapofcreqx1">
                                        <div className="form_commonblock">
                                            <label className='color_red'>Warehouse Name</label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <input
                                                    type="text" required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    name='name'
                                                    placeholder='Enter Warehouse Name'
                                                    autoFocus
                                                />
                                            </span>
                                        </div>


                                        <div className="form_commonblock">
                                            <label>Departmants</label>
                                            <span>
                                                {otherIcons.vendor_svg}
                                                <CustomDropdown006
                                                    options={showdeparment}
                                                    value={formData?.department}
                                                    onChange={handleChange1}
                                                    name="department"
                                                    defaultOption="Select Departments"
                                                />
                                            </span>
                                        </div>



                                        <div className="form_commonblock">
                                            <label>Warehouse For</label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <CustomDropdown04
                                                    options={warehouse_for}
                                                    value={formData?.warehouse_for}
                                                    onChange={handleChange}
                                                    name="warehouse_for"
                                                    defaultOption="Select Production/Non Production"
                                                    type="masters"
                                                />
                                            </span>
                                        </div>
                                        <div className="form_commonblock">
                                            <label >Address</label>
                                            <span>
                                                {otherIcons.placeofsupply_svg}
                                                <input
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    name="address"
                                                    placeholder="Enter Address"
                                                />
                                            </span>
                                        </div>
                                        <div className="form_commonblock">
                                            <label >Country</label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <CustomDropdown24
                                                    label="Select vendor"
                                                    options={countriess}
                                                    value={formData?.country}
                                                    onChange={handleChange}
                                                    name="country"
                                                    defaultOption="Select Country Name"
                                                    type="countries"
                                                />
                                            </span>

                                        </div>
                                        <div className="form_commonblock">
                                            <label >Provence</label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <CustomDropdown24
                                                    label="Select vendor"
                                                    options={statess}
                                                    value={formData?.state}
                                                    onChange={handleChange}
                                                    name="state"
                                                    defaultOption="Select State Name"
                                                    type="countries"
                                                />
                                            </span>
                                        </div>
                                        <div className="form_commonblock">
                                            <label >City</label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <CustomDropdown24
                                                    label="Select vendor"
                                                    options={citiess}
                                                    value={formData?.city}
                                                    onChange={handleChange}
                                                    name="city"
                                                    defaultOption="Select City Name"
                                                    type="countries"
                                                />
                                            </span>
                                        </div>
                                        <div className="form_commonblock">
                                            <label >Description</label>
                                            <span>
                                                {otherIcons.placeofsupply_svg}
                                                <input
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    name="description"
                                                    placeholder="Enter Descriptions"
                                                />
                                            </span>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <SubmitButton2 isEdit={isEdit} itemId={itemId} cancel="warehouse" />

                        </div>
                    </DisableEnterSubmitForm>
                </div >
            </div >
        </>
        // }
        // </>
    );
};

export default CreateWarehouse;