import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import {
  carHireDetailsAction,
  CreateCarHireAction,
} from "../../../../Redux/Actions/carHireActions";
import { SubmitButton2 } from "../../../Common/Pagination/SubmitButton";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { ShowMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";

const CreateCarHires = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
  const carHireCreates = useSelector((state) => state?.createCarHire);
  const careHirelDetails = useSelector((state) => state?.carHireDetails);
  const carHireData = careHirelDetails?.data?.data?.data || {};

  const vehicleType = ShowMasterData("41");

  const [formData, setFormData] = useState({
    type_of_vehicle: "",
    select_days: "",
    price: null,
    description: "",
  });
  const [errors, setErrors] = useState({
    type_of_vehicle: false,
    select_days: false,
    price: false,
  });
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };

  useEffect(() => {
    if (itemId) {
      const queryParams = {
        car_hire_id: itemId,
        fy: localStorage.getItem("FinancialYear"),
      };
      dispatch(carHireDetailsAction(queryParams));
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    if (itemId && isEdit && carHireData) {
      setFormData({
        ...formData,
        id: carHireData?.id,
        type_of_vehicle: carHireData?.type_of_vehicle,
        select_days: carHireData?.select_days,
        price: carHireData?.price,
        description: carHireData?.description,
      });
    }
  }, [itemId, isEdit, carHireData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      type_of_vehicle: formData?.type_of_vehicle ? false : true,
      select_days: formData?.select_days ? false : true,
      price: formData?.price ? false : true,
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
          upload_documents: JSON.stringify(formData?.upload_documents),
        };
        dispatch(CreateCarHireAction(sendData, navigate));
      } catch (error) {
        toast.error("Error updating car hire:", error);
      }
    }
  };

  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg || carHireCreates?.loading) && (
          <MainScreenFreezeLoader />
        )}
        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.hotel_svg}
                {isEdit ? "Update Car Hire" : "New Car Hire"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link to={"/dashboard/car-hire-services"} className="linkx3">
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
                          Vechile Type<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Vechile Type"
                            options={vehicleType}
                            value={formData?.type_of_vehicle}
                            onChange={handleChange}
                            name="type_of_vehicle"
                            defaultOption="Select Vechile Type"
                            type="masters"
                          />
                        </span>
                        {errors?.type_of_vehicle && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Type Of Vehicle
                            </p>
                          )}
                      </div>

                      <div className="form_commonblock">
                        <label>Days<b className="color_red">*</b></label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="select_days"
                              placeholder="Enter Days"
                              value={formData.select_days}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                          {errors?.select_days && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill Days
                            </p>
                          )}
                        </div>
                      </div>

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
                  cancel="car-hire-services"
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

export default CreateCarHires;
