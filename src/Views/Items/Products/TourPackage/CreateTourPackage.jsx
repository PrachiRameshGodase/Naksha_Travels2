import React, { useEffect, useRef, useState } from "react";
import SubmitButton, {
  SubmitButton2,
} from "../../../Common/Pagination/SubmitButton";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import NumericInput from "../../../Helper/NumericInput";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import { ShowMasterData } from "../../../Helper/HelperFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetCities,
  fetchGetCountries,
  fetchGetStates,
} from "../../../../Redux/Actions/globalActions";
import { transport } from "../../../Helper/ComponentHelper/DropdownData";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { CreateTourPackageAction, tourPackageDetailsAction } from "../../../../Redux/Actions/tourPackage";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import { MultiImageUploadHelp } from "../../../Helper/ComponentHelper/ImageUpload";

const CreateTourPackage = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
  const tourPackageCreates = useSelector((state) => state?.createTourPackage);
  const tourPackageDetails = useSelector((state) => state?.tourPackageDetail);
  const tourPackageData = tourPackageDetails?.data?.data?.data || {};

  const hotelType = ShowMasterData("35");
  const meal = ShowMasterData("37");

  const [formData, setFormData] = useState({
    package_name: "",
    destination: "",
    days: "",
    hotel_type: "",
    meal_id: "",
    meal_name: "",
    price_per_person: "",
    description: "",
    upload_documents: [],
    discount: 0,
    is_transport: 0,
   
  });
  
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const hotelTypeName = hotelType?.find((val) => val?.labelid == value);
    const mealName = meal?.find((val) => val?.labelid == value);

    setFormData((prev) => ({
      ...prev,
      ...(name === "hotel_type" && {
        hotel_type: hotelTypeName?.label,
      }),
      ...(name === "meal_id" && {
        meal_name: mealName?.label,
      }),
      [name]: value,
    }));
  };
  useEffect(() => {
    if (itemId) {
      const queryParams = {
        tour_id: itemId,
        fy: localStorage.getItem("FinancialYear"),
      };
      dispatch(tourPackageDetailsAction(queryParams));
    }
  }, [dispatch, itemId]);
 
  useEffect(() => {
    if (itemId && isEdit && tourPackageData) {
      setFormData({
        ...formData,
        id: tourPackageData?.id,
        hotel_type: tourPackageData?.hotel_type,
        package_name: tourPackageData?.package_name,
        meal_id:tourPackageData?.meal_id,
        meal_name:tourPackageData?.meal_name,
        days: tourPackageData?.days,
        price_per_person: tourPackageData?.price_per_person,
        is_transport: tourPackageData?.is_transport,
        destination: tourPackageData?.destination,
        status: tourPackageData?.status,
        discount: tourPackageData?.discount,
        description: tourPackageData?.description,
        upload_documents: tourPackageData?.upload_documents
          ? JSON.parse(tourPackageData.upload_documents)
          : [],
      });
    }
  }, [itemId, isEdit, tourPackageData]);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = {
        ...formData,
        upload_documents: JSON.stringify(formData?.upload_documents),
      };
      dispatch(CreateTourPackageAction(sendData, Navigate));
    } catch (error) {
      toast.error("Error updating tour package:", error);
    }
  };

  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg || tourPackageCreates?.loading) && (
          <MainScreenFreezeLoader />
        )}
        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.hotel_svg}
                {isEdit ? "Update Tour Package" : "New Tour Package"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link to={"/dashboard/tour-package-services"} className="linkx3">
                <RxCross2 />
              </Link>
            </div>
          </div>

          <div id="formofcreateitems">
            <form onSubmit={handleFormSubmit}>
              <div className="relateivdiv">
                <div className="itemsformwrap">
                  <div className="f1wrapofcreq">
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          Package Name<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.package_name}
                            onChange={handleChange}
                            name="package_name"
                            placeholder="Enter Package Name"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Destination<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.destination}
                            onChange={handleChange}
                            name="destination"
                            placeholder="Enter Destination"
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
                      <div className="form_commonblock">
                        <label>
                          Hotel Type<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Hotel Type"
                            options={hotelType}
                            value={formData?.hotel_type}
                            onChange={handleChange}
                            name="hotel_type"
                            defaultOption="Select Hotel Type"
                            type="masters"
                          />
                        </span>

                        {/* {!isCustomerSelect && (
                            <p
                              className="error-message"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {otherIcons.error_svg}
                              Please Select Hotel Type
                            </p>
                          )} */}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Meal<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Meal"
                            options={meal}
                            value={formData?.meal_id}
                            onChange={handleChange}
                            name="meal_id"
                            defaultOption="Select Meal"
                            type="masters"
                          />
                        </span>

                        {/* {!isCustomerSelect && (
                            <p
                              className="error-message"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {otherIcons.error_svg}
                              Please Select Hotel Type
                            </p>
                          )} */}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Transport<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons?.home_brek_svg}
                            <CustomDropdown04
                              label="Transport"
                              options={transport}
                              value={formData?.is_transport}
                              onChange={handleChange}
                              name="is_transport"
                              defaultOption="Select Yes/No"
                              type="masters"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="f1wrapofcreqx1">
                        <div className="form_commonblock">
                          <label>Price Per Person</label>
                          <div id="inputx1">
                            <span>
                              {otherIcons.name_svg}
                              <NumericInput
                                name="price_per_person"
                                placeholder="Enter Price Per Person"
                                value={formData.price_per_person}
                                onChange={(e) => handleChange(e)}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div id="imgurlanddesc" className="calctotalsectionx2">
                        <MultiImageUploadHelp
                          formData={formData}
                          setFormData={setFormData}
                          setFreezLoadingImg={setFreezLoadingImg}
                          imgLoader={imgLoader}
                          setImgeLoader={setImgeLoader}
                        />
                      </div>
                      <div className="secondtotalsections485s">
                        <div className="textareaofcreatqsiform">
                          <label>Description</label>
                          <div className="show_no_of_text_limit_0121">
                            <TextAreaComponentWithTextLimit
                              formsValues={{ handleChange, formData }}
                              placeholder="Enter Description...."
                              name="description"
                              value={formData?.description}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <SubmitButton2
                  isEdit={isEdit}
                  itemId={itemId}
                  cancel="tour-package-services"
                />
              </div>
            </form>
          </div>
        </div>
        <Toaster reverseOrder={false} />
      </>
    </div>
  );
};

export default CreateTourPackage;
