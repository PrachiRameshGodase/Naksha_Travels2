import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoCheckbox } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTexRates,
} from "../../Redux/Actions/globalActions";
import { addItems, itemDetails } from "../../Redux/Actions/itemsActions";
import {
  accountLists,
  categoryList,
  customFieldsLists,
  vendorsLists,
} from "../../Redux/Actions/listApisActions";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { RxCross2 } from "react-icons/rx";
import "react-datepicker/dist/react-datepicker.css";

import CustomDropdown03 from "../../Components/CustomDropdown/CustomDropdown03";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import { MdCheck } from "react-icons/md";
import CustomDropdown06 from "../../Components/CustomDropdown/CustomDropdown06";

import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import CustomDropdown13 from "../../Components/CustomDropdown/CustomDropdown13.jsx";
import CreateCategoryPopup from "./CreateCategoryPopup.jsx";
// import CreateCategory from './CreateCategory.jsx';
import {
  // useUnsavedChangesWarning,
  formatDate,
} from "../Helper/DateFormat.jsx";
import CustomDropdown15 from "../../Components/CustomDropdown/CustomDropdown15.jsx";
import { getAccountTypes } from "../../Redux/Actions/accountsActions.js";
import NumericInput from "../Helper/NumericInput.jsx";
import Loader02 from "../../Components/Loaders/Loader02.jsx";
import ImageUpload from "../Helper/ComponentHelper/ImageUpload.jsx";
import { handleDropdownError, ShowMasterData } from "../Helper/HelperFunctions";
import { SubmitButton2 } from "../Common/Pagination/SubmitButton.jsx";
import ShowMastersValue from "../Helper/ShowMastersValue.jsx";

const CreateAndUpdateItem = () => {
  const Navigate = useNavigate();
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const {
    id: itemId,
    edit: isEdit,
    duplicate: isDuplicate,
  } = Object.fromEntries(params.entries());
  const masterData = useSelector((state) => state?.masterData?.masterData);
  const vendorList = useSelector((state) => state?.vendorList?.data);
  const itemCreatedData = useSelector((state) => state?.addItemsReducer);

  const showTypeOfItems = ShowMasterData("5");

  const catList = useSelector((state) => state?.categoryList);
  const itemListState = useSelector((state) => state?.accountList);
  const accountList = itemListState?.data?.accounts || [];
  const customLists = useSelector((state) => state?.customList?.data?.custom_field) || [];
  const item_detail = useSelector((state) => state?.itemDetail);
  const item_details = item_detail?.itemsDetail?.data?.item_details;
  const tax_rates = useSelector((state) => state?.getTaxRate?.data?.data);
  const [customFieldValues, setCustomFieldValues] = useState({});

  const allUnit = ShowMasterData("2")

  const [formData, setFormData] = useState({
    name: "",
    type: "Product",
    category_id: "",
    parent_id: "",
    sale_description: "",
    purchase_description: "",
    description: "",
    sku: "",
    sub_category_id: "",
    price: "",
    unit: "",
    tax_rate: "",
    hsn_code: "",
    opening_stock: 0,
    purchase_price: "",
    tax_preference: "",
    preferred_vendor: [],
    exemption_reason: "",
    tag_ids: "",
    as_on_date: "",
    image_url: null,
    sale_acc_id: 53,
    purchase_acc_id: 30,
    is_purchase: "1",
    is_sale: "1",
    custom_fields: [],
  });

  useEffect(() => {
    dispatch(accountLists({ fy: localStorage.getItem("FinancialYear") }));
    dispatch(vendorsLists({ status: 1, active: 1 }));
    dispatch(categoryList());
  }, [dispatch]);

  const [clickTrigger, setClickTrigger] = useState(false);


  const refreshCategoryListData = () => {
    dispatch(categoryList()).then(() => {
      setClickTrigger((prevTrigger) => !prevTrigger);
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle setting form data
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };

      // Specific updates based on field changes
      if (name === "opening_stock" && value === "") {
        updatedFormData.opening_stock = 0;
      }

      if (name === "name" && value?.trim() !== "") {
        setIsNameFilled(true);
      } else if (name === "name" && value?.trim() !== "") {
        setIsNameFilled(true);
      }

      if (name === "sku" && value?.trim() !== "") {
        setIsSKUFilled(true);
      } else if (name === "sku" && value?.trim() !== "") {
        setIsSKUFilled(true);
      }

      if (name === "unit" && value !== "") {
        setIsUnitSelected(true);
      } else if (name === "unit" && value !== "") {
        setIsUnitSelected(true);
      }

      if (name === "tax_preference" && value !== "") {
        setIsTaxPreferenceFilled(true);
        if (value == "2") {
          updatedFormData.tax_rate = ""; // Reset tax_rate
        }
      }

      if (name === "opening_stock") {
        if (value >= 1 && prevFormData?.as_on_date === "") {
          setAsOfDateSelected(true);
        } else if (value == 0) {
          setAsOfDateSelected(false);
        }
      }

      if (name === "") {
        if (value >= 1 && prevFormData?.as_on_date === "") {
          setAsOfDateSelected(true);
        } else if (value == 0) {
          setAsOfDateSelected(false);
        }
      }

      return updatedFormData;
    });
  };

  useEffect(() => {

    if (formData?.type === "Service") {
      setIsSKUFilled(true);
    } else if (formData?.type === "Product" && formData?.sku?.trim() === "") {
      setIsSKUFilled(false);
    }
  }, [formData]);

  const handleChange1 = (selectedItems) => {
    setFormData({
      ...formData,
      preferred_vendor: selectedItems, // Update selected items array
    });
  };

  // image upload from firebase
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const [isUnitSelected, setIsUnitSelected] = useState(false);
  const [asOfDateSelected, setAsOfDateSelected] = useState(false);
  const [isNameFilled, setIsNameFilled] = useState(false);
  const [isSKUFilled, setIsSKUFilled] = useState(false);
  const [isTaxPreferenceFilled, setIsTaxPreferenceFilled] = useState(false);

  const nameRef = useRef(null);
  const skuRef = useRef(null);
  const unitRef = useRef(null);
  const taxPreRef = useRef(null);

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Check each dropdown and handle errors
    if (handleDropdownError(isNameFilled, nameRef)) return;
    if (handleDropdownError(isSKUFilled, skuRef)) return;
    if (handleDropdownError(isUnitSelected, unitRef)) return;
    if (handleDropdownError(isTaxPreferenceFilled, taxPreRef)) return;

    const customFieldsArray = customLists.map((customField) => ({
      id: customField.id, // Include the field ID
      field_name: customField.field_name,
      value: customFieldValues[customField.field_name] || "", // Use the value from customFieldValues
    }));

    // Construct customFieldsString from customFieldsArray
    const customFieldsString = JSON.stringify(customFieldsArray);

    // Update the formData with the custom_fields string
    setFormData({
      ...formData,
      custom_fields: customFieldsString,
    });

    const sendData = {
      // warehouse_id: localStorage.getItem("selectedWarehouseId"),
      fy: localStorage.getItem("FinancialYear"),
      as_on_date: formData?.as_on_date && formatDate(formData?.as_on_date),
      preferred_vendor:
        formData?.preferred_vendor?.length === 0
          ? null
          : JSON?.stringify(formData?.preferred_vendor),
    };

    if (itemId && isEdit) {
      dispatch(
        addItems({ ...formData, ...sendData, id: itemId }, Navigate, "edit")
      );
    } else if (itemId && isDuplicate) {
      dispatch(
        addItems({ ...formData, id: 0, ...sendData }, Navigate, "duplicate")
      );
    } else {
      dispatch(addItems({ ...formData, id: 0, ...sendData }, Navigate));
    }
  };

  useEffect(() => {
    // dispatch(fetchMasterData());
    dispatch(customFieldsLists({ module_id: 1 }));
    dispatch(fetchTexRates());
    dispatch(getAccountTypes());
  }, [dispatch]);

  const [isChecked, setIsChecked] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  // Function to handle checkbox clicks
  const handleCheckboxClick = (checkboxName) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName],
    }));

    // Check which checkbox was clicked and update form data accordingly
    if (checkboxName === "checkbox1" && !isChecked.checkbox1) {
      setFormData((prevData) => ({
        ...prevData,
        price: "",
        sale_acc_id: "",
        sale_description: "",
        is_sale: "0",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        is_sale: "1",
      }));
    }
    if (checkboxName === "checkbox2" && !isChecked.checkbox2) {
      setFormData((prevData) => ({
        ...prevData,
        purchase_price: "",
        purchase_acc_id: "",
        purchase_description: "",
        preferred_vendor: [],
        is_purchase: "0",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        is_sale: "1",
      }));
    }
  };
  useEffect(() => {
    // Update is_sale and is_purchase fields based on checkbox values
    setFormData((prevData) => ({
      ...prevData,
      is_sale: isChecked.checkbox1 ? "0" : "1",
      is_purchase: isChecked.checkbox2 ? "0" : "1",
    }));
  }, [isChecked]);

  useEffect(() => {
    if (
      (item_details && itemId && isEdit) ||
      (itemId && isDuplicate && item_details)
    ) {
      if (item_details?.is_sale == "1") {
        setIsChecked((prevState) => ({
          ...prevState,
          checkbox1: false,
        }));
      } else {
        setIsChecked((prevState) => ({
          ...prevState,
          checkbox1: true,
        }));
      }

      if (item_details?.is_purchase == "1") {
        setIsChecked((prevState) => ({
          ...prevState,
          checkbox2: false,
        }));
      } else {
        setIsChecked((prevState) => ({
          ...prevState,
          checkbox2: true,
        }));
      }
    }
  }, [item_details, isEdit, isDuplicate]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  // Handle change in the category dropdown
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    // Find the category object that matches the selected value
    const selectedCategory = catList?.data?.data?.find(
      (category) => category.id === parseInt(value)
    );
    // Extract subcategories if a category is found
    const subCategories = selectedCategory ? selectedCategory.sub_category : [];
    setSelectedCategory(value);
    setSubcategories(subCategories);
    setFormData({
      ...formData,
      category_id: value,
    });
  };

  // Define the handleSubcategoryChange function
  const handleSubcategoryChange = (event) => {
    const value = event.target.value;
    // Update the formData with the selected subcategory
    setFormData({ ...formData, sub_category_id: value });
  };

  useEffect(() => {
    if ((itemId && isEdit) || (itemId && isDuplicate)) {
      const queryParams = {
        item_id: itemId,
        fy: localStorage.getItem("FinancialYear"),
        warehouse_id: localStorage.getItem("selectedWarehouseId"),
      };
      dispatch(itemDetails(queryParams));
    }
  }, [dispatch, itemId, isEdit]);

  useEffect(() => {
    if (
      (item_details && itemId && isEdit) ||
      (itemId && isDuplicate && item_details)
    ) {
      const trimmedJson = item_details?.preferred_vendor?.trim();
      const jsonString = trimmedJson?.slice(1, -1);
      const jsonArray = jsonString
        ?.split(",")
        ?.map((item) => parseInt(item?.trim(), 10));
      const filteredArray = jsonArray?.filter((item) => !isNaN(item));

      setFormData({
        ...formData,
        name: item_details?.name,
        type: item_details?.type,
        category_id: +item_details.category_id,
        sub_category_id: +item_details?.sub_category_id,
        parent_id: +item_details?.parent_id,
        sale_description: item_details?.sale_description,
        purchase_description: item_details?.purchase_description,
        description: item_details?.description,
        sku: item_details?.sku,
        price: item_details?.price,
        unit: item_details?.unit,
        tax_rate: !item_details?.tax_rate
          ? "0"
          : parseInt(item_details?.tax_rate, 10).toString(),
        hsn_code: item_details?.hsn_code,
        opening_stock: +item_details?.opening_stock,
        purchase_price: item_details?.purchase_price,
        tax_preference: item_details?.tax_preference,
        preferred_vendor: !filteredArray ? [] : filteredArray,
        exemption_reason: item_details?.exemption_reason,
        tag_ids: item_details?.tag_ids,
        as_on_date: item_details?.as_on_date,
        image_url: item_details?.image_url,
        sale_acc_id: +item_details?.sale_acc_id,
        purchase_acc_id: +item_details?.purchase_acc_id,
        is_purchase: item_details?.is_purchase,
        is_sale: item_details?.is_sale,
        custom_fields: item_details?.custom_fields,
      });

      if (item_details.unit) {
        setIsUnitSelected(true);
      }
      if (item_details.tax_preference) {
        setIsTaxPreferenceFilled(true);
      }

      if (item_details?.sku) {
        setIsSKUFilled(true);
      }

      if (item_details?.image_url) {
        setImgeLoader("success");
      }
      if (item_details?.name) {
        setIsNameFilled(true);
      }
    }
  }, [item_details, itemId, isEdit, isDuplicate]);

  useEffect(() => {
    if (formData.category_id !== undefined && formData.category_id !== null) {
      handleCategoryChange({ target: { value: formData.category_id } });
    }
  }, [formData.category_id, clickTrigger]);


  useEffect(() => {
    if (
      (item_details && itemId && isEdit) ||
      (itemId && isDuplicate && item_details)
    ) {
      if (item_details?.custom_fields) {
        const customFieldsArray = JSON.parse(item_details.custom_fields);
        setCustomFieldValues(customFieldsArray);
      }
    }
  }, [item_details, isEdit, isDuplicate]);

  // const confirmNavigation = useUnsavedChangesWarning(isDirty);

  //event function to check un-check to press space button

  const handleKeyDown = (e, checkboxId) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent the default action (scrolling the page)
      handleCheckboxClick(checkboxId);
    } else if (e.key === "Enter") {
      handleSubmit();
    }
  };
  //event function to check un-check to press space button

  // useEffect(() => {
  //     alert("hiiii")
  // }, [location])

  //

  const inputRef = useRef(null);

  // Button click handler
  const handleClickInputFocus = () => {
    // Input field pe focus karein
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  //

  return (
    <>
      {freezLoadingImg && <MainScreenFreezeLoader />}
      {itemCreatedData?.loading && <MainScreenFreezeLoader />}

      {item_detail?.loading ? (
        <Loader02 />
      ) : (
        <>
          <div
            className={`formsectionsgrheigh`}
            style={{ height: "fit-content" }}
          >
            {/* <Tooltip id="my-tooltip" className="extraclassoftooltip" /> */}
            <TopLoadbar />
            <div id="Anotherbox" className="formsectionx1 formsectionx2">
              <div id="leftareax12">
                <h1 id="firstheading" className="headingofcreateforems">
                  {otherIcons.new_item_svg}
                  {itemId && isDuplicate ? (
                    "Duplicate Items"
                  ) : (
                    <>{itemId && isEdit ? "Update Item" : "New Item"}</>
                  )}
                </h1>
              </div>

              <div id="buttonsdata">
                <Link to={"/dashboard/manage-items"} className="linkx3">
                  <RxCross2 />
                </Link>
              </div>
            </div>

            {/* <div className="bordersinglestroke"></div> */}
            <div id="middlesection ">
              <div id="formofcreateitems">
                <form onSubmit={handleSubmit}>
                  <div className={`itemsformwrap`}>
                    <div id="forminside">
                      <div className={`form-groupx1`}>
                        <label>Type:</label>
                        <span>
                          {!masterData ? (
                            <div className="skelloadtypesce">
                              <p></p>
                              <p></p>
                            </div>
                          ) : (
                            masterData?.map((type) => {
                              if (type?.type == "5") {
                                return (
                                  <span
                                    key={type?.labelid}
                                    onClick={handleClickInputFocus}
                                    id="handleClickInputFocus"
                                  >
                                    <button
                                      type="button"
                                      key={type?.labelid}
                                      className={`type-button ${formData.type == type?.label
                                        ? "selectedbtn"
                                        : ""
                                        }`}
                                      onClick={() =>
                                        setFormData({
                                          ...formData,
                                          type: type?.label,
                                        })
                                      }
                                    >
                                      {type?.label === "Raw"
                                        ? "Raw Material"
                                        : type?.label}
                                      {formData.type == type?.label && (
                                        <MdCheck />
                                      )}
                                    </button>
                                  </span>
                                );
                              } else {
                                return null;
                              }
                            })
                          )}
                        </span>
                      </div>

                      <div className="secondx2">
                        <div className="secondx2">
                          <div className="form-group">
                            <label>Name <b className="color_red">*</b></label>
                            <span>
                              {otherIcons.name_svg}
                              <input
                                ref={nameRef}
                                className={
                                  formData.name ? "filledcolorIn" : null
                                }
                                // required
                                type="text"
                                placeholder="Enter Item Name"
                                name="name"
                                value={formData.name}
                                autoFocus
                                onChange={handleChange}
                                autocomplete="off"
                              />
                            </span>

                            {!isNameFilled && (
                              <p className="error-message">
                                {otherIcons.error_svg}
                                Please Enter The Name
                              </p>
                            )}
                          </div>

                          <div className="form-group">
                            <label>Category</label>

                            <span>
                              {" "}
                              {otherIcons.category_svg}
                              <CustomDropdown03
                                label="Category"
                                options={
                                  catList?.data?.data?.filter(
                                    (cat) => cat.parent_id == "0"
                                  ) || []
                                }
                                value={formData.category_id}
                                onChange={handleCategoryChange}
                                name="category_id"
                                defaultOption="Select Category"
                                setShowPopup={setShowPopup1}
                                type="categories"
                              />
                            </span>
                          </div>

                          {showPopup1 && (
                            <CreateCategoryPopup
                              setShowPopup={setShowPopup1}
                              refreshCategoryListData={refreshCategoryListData}
                            />
                          )}

                          <div className={`form-group`}>
                            <label>Sub Category</label>
                            <span
                              className={`${selectedCategory ? "" : "disabledfield"
                                }`}
                            >
                              {otherIcons.category_svg}
                              <CustomDropdown03
                                label="Sub Category"
                                options={subcategories}
                                value={formData.sub_category_id}
                                onChange={handleSubcategoryChange}
                                name="sub_category_id"
                                defaultOption="Select Sub Category"
                                setShowPopup={setShowPopup2}
                                type="sub_categories"
                              />
                            </span>
                          </div>

                          {showPopup2 && (
                            <CreateCategoryPopup
                              setShowPopup={setShowPopup2}
                              refreshCategoryListData={refreshCategoryListData}
                              parent_id={formData.category_id}
                            />
                          )}

                          <div className="form-group">
                            <label>SKU <b className="color_red">*</b></label>
                            <span>
                              {otherIcons.sku_svg}
                              <input
                                className={
                                  formData.sku ? "filledcolorIn" : null
                                }
                                type="text"
                                name="sku"
                                ref={skuRef}
                                placeholder="Enter SKU"
                                value={formData.sku}
                                onChange={handleChange}
                                autocomplete="off"
                              />
                            </span>

                            {!isSKUFilled && (
                              <p className="error-message">
                                {otherIcons.error_svg}
                                Please Enter SKU
                              </p>
                            )}
                          </div>

                          <div className="form-group">
                            <label>Unit <b className="color_red">*</b></label>
                            <span>
                              {otherIcons.unit_svg}
                              <CustomDropdown04
                                label="Unit Name"
                                options={allUnit}
                                value={formData.unit}
                                onChange={handleChange}
                                name="unit"
                                defaultOption="Select Units"
                                type="masters"
                                ref={unitRef}
                              />
                            </span>
                            {!isUnitSelected && (
                              <p className="error-message">
                                {otherIcons.error_svg}
                                Please Select a Unit
                              </p>
                            )}
                          </div>

                          <div className="form-group">
                            <label>HSN Code</label>
                            <span>
                              {otherIcons.hsn_svg}

                              <NumericInput
                                name="hsn_code"
                                placeholder="Enter HSN Code"
                                value={formData.hsn_code}
                                className={
                                  formData.hsn_code ? "filledcolorIn" : null
                                }
                                onChange={handleChange}
                                enterKeyHint="hsn code"
                              />
                            </span>
                          </div>

                          {/* <div className="form-group">
                                                        <label>Opening Stock:</label>
                                                        <span>
                                                            {otherIcons.open_stock_svg}


                                                            <NumericInput
                                                                name="opening_stock"
                                                                placeholder="Enter Stock Quantity"
                                                                value={formData.opening_stock}
                                                                className={formData.opening_stock ? 'filledcolorIn' : null}
                                                                onChange={handleChange}
                                                            />
                                                        </span>

                                                    </div> */}

                          {/* <div className="form-group">
                                                        <label>As Of Date</label>
                                                        <span>{otherIcons.date_svg}
                                                            <DatePicker
                                                                selected={formData.as_on_date ? new Date(formData.as_on_date) : null}
                                                                onChange={date => {
                                                                    setFormData({ ...formData, as_on_date: formatDate(date) });
                                                                    setAsOfDateSelected(false);
                                                                }}
                                                                placeholderText="Select Date"
                                                                className="filledcolorIn"
                                                            />
                                                        </span>
                                                        {asOfDateSelected === true ? <p className="error-message">
                                                            {otherIcons.error_svg}
                                                            Please Select As Of Date</p> : ""}
                                                    </div> */}

                          <div id="imgurlanddesc">
                            <ImageUpload
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

                    <div id="thirdsec123s">
                      <div id="extrafieldx56s">
                        <div className="form-group">
                          <label>Tag ID's</label>
                          <span>
                            {otherIcons.tag_svg}
                            <input
                              className={
                                formData.tag_ids ? "filledcolorIn" : null
                              }
                              type="text"
                              name="tag_ids"
                              placeholder="Enter Tag ID"
                              value={formData.tag_ids}
                              onChange={handleChange}
                              autocomplete="off"
                            />
                          </span>
                        </div>
                        <div className="form-group">
                          <label>
                            Tax Preference<b className="color_red">*</b>
                          </label>
                          <span>
                            {otherIcons.tax}
                            <CustomDropdown04
                              ref={taxPreRef}
                              label="Tax Preference"
                              options={masterData?.filter(
                                (type) => type.type == 6
                              )}
                              value={formData.tax_preference}
                              onChange={handleChange}
                              name="tax_preference"
                              defaultOption="Select Tax Preference"
                              type="masters"
                            />
                          </span>
                          {!isTaxPreferenceFilled && (
                            <p className="error-message">
                              {otherIcons.error_svg}
                              Please Select Tax Preference
                            </p>
                          )}
                        </div>
                        {formData?.tax_preference && (
                          <div id="">
                            <span className="newspanx21s">
                              {formData?.tax_preference == "1" && (
                                <div className="form-group">
                                  <label>Tax Rate (%)</label>
                                  <span>
                                    {otherIcons.tax}
                                    <CustomDropdown13
                                      label="Tax Rate"
                                      options={tax_rates}
                                      value={formData.tax_rate}
                                      onChange={handleChange}
                                      name="tax_rate"
                                      defaultOption="Select Tax Rate"
                                      type="taxRate"
                                    />
                                  </span>
                                </div>
                              )}

                              {formData?.tax_preference == "2" && (
                                <div className="form-group">
                                  <label>
                                    Exemption Reason{" "}
                                    <b className="color_red">*</b>
                                  </label>
                                  <span>
                                    {/* <IoPricetagOutline /> */}
                                    {otherIcons.resion_svg}

                                    <input
                                      required
                                      className={
                                        formData.exemption_reason
                                          ? "filledcolorIn"
                                          : null
                                      }
                                      type="text"
                                      name="exemption_reason"
                                      placeholder="Enter Exemption Reason"
                                      value={formData.exemption_reason}
                                      onChange={handleChange}
                                      autocomplete="off"
                                    />
                                  </span>
                                </div>
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="secondsecx15">
                      <div id="dataofsalesprices">
                        <div className="x1inssalx5">
                          <p className="xkls5663">
                            <IoCheckbox
                              className={`checkboxeffecgtparent ${isChecked.checkbox1 ? "checkboxeffects" : ""
                                }`}
                              onClick={() => handleCheckboxClick("checkbox1")}
                              tabIndex="0"
                              onKeyDown={(e) => handleKeyDown(e, "checkbox1")}
                            />
                            Sales Information
                          </p>
                          <span
                            className={`newspanx21s ${isChecked?.checkbox1 && "disabledfield"
                              }`}
                          >
                            <div className="form-group">
                              <label>Sales Price</label>
                              <span>
                                {otherIcons.sale_price_svg}
                                <NumericInput
                                  name="price"
                                  placeholder="Enter Sales Price"
                                  value={formData.price}
                                  className={
                                    formData.price ? "filledcolorIn" : null
                                  }
                                  onChange={handleChange}
                                />
                              </span>
                            </div>
                            <div className="form-group">
                              <label>Sales Account </label>
                              <span className="">
                                {otherIcons.sale_account_svg}

                                <CustomDropdown15
                                  label="Sales Account"
                                  options={accountList}
                                  value={formData?.sale_acc_id}
                                  onChange={handleChange}
                                  name="sale_acc_id"
                                  defaultOption="Select Sales Account"
                                  type="account"
                                />
                              </span>
                            </div>
                          </span>
                          <div
                            className={`form-group ${isChecked?.checkbox1 && "disabledfield"
                              }`}
                          >
                            <label>Sale Description</label>
                            <textarea
                              className={
                                formData.sale_description
                                  ? "filledcolorIn"
                                  : null
                              }
                              name="sale_description"
                              placeholder="Enter Sale Description"
                              value={formData.sale_description}
                              onChange={handleChange}
                              rows="4"
                            />
                          </div>
                        </div>

                        <div className="breakerci"></div>

                        <div className="x2inssalx5">
                          <p className="xkls5663">
                            <IoCheckbox
                              className={`checkboxeffecgtparent ${isChecked.checkbox2 ? "checkboxeffects" : ""
                                }`}
                              onClick={() => handleCheckboxClick("checkbox2")}
                              tabIndex="0"
                              onKeyDown={(e) => handleKeyDown(e, "checkbox2")}
                            />
                            Purchase Information
                          </p>
                          <span
                            className={`newspanx21s ${isChecked?.checkbox2 && "disabledfield"
                              }`}
                          >
                            <div className="form-group">
                              <label>Purchase Price
                                {/* (Excluded Tax) */}
                              </label>
                              <span>
                                {/* <IoPricetagOutline /> */}
                                {otherIcons.purchase_price_svg}
                                <NumericInput
                                  name="purchase_price"
                                  placeholder="Enter Purchase Price"
                                  value={formData.purchase_price}
                                  className={
                                    formData.purchase_price
                                      ? "filledcolorIn"
                                      : null
                                  }
                                  onChange={handleChange}
                                />
                              </span>
                            </div>
                            <div className="form-group">
                              <label>Purchase Account</label>
                              <span className="">
                                {/* <IoPricetagOutline /> */}
                                {otherIcons.purchase_price_svg}

                                <CustomDropdown15
                                  label="Purchase Account"
                                  options={accountList}
                                  value={formData.purchase_acc_id}
                                  onChange={handleChange}
                                  name="purchase_acc_id"
                                  defaultOption="Select Purchase Account"
                                  isDisabled={isChecked?.checkbox2}
                                />
                              </span>
                            </div>
                            <div className="form-group">
                              <label>Preferred Vendor</label>
                              <span>
                                {/* <IoPricetagOutline /> */}
                                {otherIcons.vendor_svg}
                                <CustomDropdown06
                                  label="Preferred Vendor"
                                  options={vendorList?.user || []}
                                  value={formData?.preferred_vendor}
                                  onChange={handleChange1}
                                  name="preferred_vendor"
                                  defaultOption="Select Preferred Vendor"
                                  isDisabled={isChecked?.checkbox2}
                                />
                              </span>
                            </div>
                          </span>
                          <div
                            className={`form-group ${isChecked?.checkbox2 && "disabledfield"
                              }`}
                          >
                            <label>Purchase Description</label>
                            <textarea
                              className={
                                formData.purchase_description
                                  ? "filledcolorIn"
                                  : null
                              }
                              name="purchase_description"
                              placeholder="Enter Purchase Description"
                              value={formData.purchase_description}
                              onChange={handleChange}
                              rows="4"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="thirdsec123s">
                      <div className={`form_commonblock`}>
                        <label>Remarks</label>
                        <textarea
                          className={
                            "textareacustomcbs" +
                            (formData.description ? " filledcolorIn" : "")
                          }
                          name="description"
                          placeholder="Enter Remarks"
                          value={formData.description}
                          onChange={handleChange}
                          rows="4"
                        />
                      </div>
                    </div>

                    {/* <div id="thirdsec123s">
                      <div className="customfieldsegment">
                        <p className="xkls5666">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={20}
                            height={20}
                            color={"#434343"}
                            fill={"none"}
                          >
                            <path
                              d="M16.5 19.8571V21M16.5 19.8571C15.4878 19.8571 14.5961 19.3521 14.073 18.5852M16.5 19.8571C17.5122 19.8571 18.4039 19.3521 18.927 18.5852M16.5 14.1429C17.5123 14.1429 18.4041 14.648 18.9271 15.415M16.5 14.1429C15.4877 14.1429 14.5959 14.648 14.0729 15.415M16.5 14.1429V13M20 14.7143L18.9271 15.415M13.0004 19.2857L14.073 18.5852M13 14.7143L14.0729 15.415M19.9996 19.2857L18.927 18.5852M18.9271 15.415C19.2364 15.8685 19.4167 16.4136 19.4167 17C19.4167 17.5864 19.2363 18.1316 18.927 18.5852M14.0729 15.415C13.7636 15.8685 13.5833 16.4136 13.5833 17C13.5833 17.5864 13.7637 18.1316 14.073 18.5852"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M4 3H20"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M4 9H20"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M4 15H9"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </p>
                        <span className="customfieldsecionall">
                          {customLists.map((customField, index) => (
                            <div key={`${customField.field_name}-${index}`} className="customform_commonblock">
                              <label>{customField.label}</label>
                              {customField.field_type === 'text' && (
                                <input
                                  type="text"
                                  placeholder={`Enter ${customField.label}`}
                                  value={customFieldValues[customField.field_name] || ''}
                                  onChange={e => handleCustomFieldChange(e, customField.field_name)}
                                  className={"form-control" + (customFieldValues[customField.field_name] ? ' filledcolorIn' : '')}
                                />
                              )}
                              {customField.field_type === 'text area' && (
                                <textarea
                                  className={"form-control" + (customFieldValues[customField.field_name] ? ' filledcolorIn' : '')}
                                  placeholder={`Enter ${customField.label}`}
                                  value={customFieldValues[customField.field_name] || ''}
                                  onChange={e => handleCustomFieldChange(e, customField.field_name)}
                                />
                              )}
                              {customField.field_type === 'dropdown' && (
                                <select
                                  className={"form-control" + (customFieldValues[customField.field_name] ? ' filledcolorIn' : '')}
                                  value={customFieldValues[customField.field_name] || ''}
                                  onChange={e => handleCustomFieldChange(e, customField.field_name)}
                                >
                                  <option value="">Select {customField.label}</option>
                                  {JSON.parse(customField.dropdown_value).map(option => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                          ))}

                          {customLists.map((customField, index) => (
                            <div
                              key={`${customField.field_name}-${index}`}
                              className="customform_commonblock"
                            >
                              <label>{customField.label}</label>
                              {customField.field_type === "text" && (
                                <input
                                  type="text"
                                  placeholder={`Enter ${customField.label}`}
                                  value={
                                    customFieldValues[customField.field_name] ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleCustomFieldChange(
                                      e,
                                      customField.field_name
                                    )
                                  }
                                  className={
                                    "form-control" +
                                    (customFieldValues[customField.field_name]
                                      ? " filledcolorIn"
                                      : "")
                                  }
                                />
                              )}
                              {customField.field_type === "text area" && (
                                <textarea
                                  className={
                                    "form-control" +
                                    (customFieldValues[customField.field_name]
                                      ? " filledcolorIn"
                                      : "")
                                  }
                                  placeholder={`Enter ${customField.label}`}
                                  value={
                                    customFieldValues[customField.field_name] ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleCustomFieldChange(
                                      e,
                                      customField.field_name
                                    )
                                  }
                                />
                              )}
                              {customField.field_type === "dropdown" && (
                                <select
                                  className={
                                    "form-control" +
                                    (customFieldValues[customField.field_name]
                                      ? " filledcolorIn"
                                      : "")
                                  }
                                  value={
                                    customFieldValues[customField.field_name] ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleCustomFieldChange(
                                      e,
                                      customField.field_name
                                    )
                                  }
                                >
                                  <option value="">
                                    Select {customField.label}
                                  </option>
                                  {JSON.parse(customField.dropdown_value).map(
                                    (option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    )
                                  )}
                                </select>
                              )}
                            </div>
                          ))}
                        </span>
                      </div>
                    </div> */}
                  </div>
                  {/* itemId, edit: isEdit */}
                  <SubmitButton2 isEdit={isEdit} itemId={itemId} cancel="manage-items" />
                </form>
              </div>
            </div>

            <Toaster />
          </div>
        </>
      )}
    </>
  );
};

export default CreateAndUpdateItem;
