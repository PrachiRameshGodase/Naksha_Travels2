import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomDropdown04 from "../../../../Components/CustomDropdown/CustomDropdown04";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import {
  fetchGetCountries
} from "../../../../Redux/Actions/globalActions";
import {
  CreateHotelRoomAction,
  hotelRoomDetailsAction
} from "../../../../Redux/Actions/hotelActions";
import {
  SubmitButton2,
} from "../../../Common/Pagination/SubmitButton";
import { MultiImageUploadHelp } from "../../../Helper/ComponentHelper/ImageUpload";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { ShowMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";

const CreateHotelService = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
  const hotelRoomCreates = useSelector((state) => state?.createHotelRoom);
  const hotelRoomDetails = useSelector((state) => state?.hotelRoomDetail);
  const hotelRoomData = hotelRoomDetails?.data?.data?.room || {};

  const hotelType = ShowMasterData("35");
  const occupancy = ShowMasterData("36");
  const bed = ShowMasterData("38");
  const meal = ShowMasterData("37");

  const [formData, setFormData] = useState({
    hotel_id: itemId,
    room_type: 0,
    room_number: "",
    occupancy_id: 0,
    occupancy_name: null,
    bed_id: 0,
    bed_name: null,
    meal_id: 0,
    meal_name: null,
    max_occupancy: null,
    amenities: null,
    availability_status: 1,
    description: null,
    price: null,
    upload_documents: [],
  });
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const hotelTypeName = hotelType?.find((val) => val?.labelid == value);
    const occupancyName = occupancy?.find((val) => val?.labelid == value);
    const bedName = bed?.find((val) => val?.labelid == value);
    const mealName = meal?.find((val) => val?.labelid == value);

    setFormData((prev) => ({
      ...prev,
      ...(name === "hotel_type" && {
        hotel_type_name: hotelTypeName?.label,
      }),
      ...(name === "occupancy_id" && {
        occupancy_name: occupancyName?.label,
      }),
      ...(name === "bed_id" && {
        bed_name: bedName?.label,
      }),
      ...(name === "meal_id" && {
        meal_name: mealName?.label,
      }),
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchGetCountries());
  }, [dispatch]);

  useEffect(() => {
    if (itemId) {
      const queryParams = {
        room_id: itemId,
      };
      dispatch(hotelRoomDetailsAction(queryParams));
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    if (itemId && isEdit && hotelRoomData) {
      setFormData({
        ...formData,
        id: hotelRoomData?.id,
        room_type: hotelRoomData?.room_type,
        room_number: hotelRoomData?.room_number,
        occupancy_id: hotelRoomData?.occupancy_id,
        occupancy_name: hotelRoomData?.occupancy_name,
        bed_id: hotelRoomData?.bed_id,
        bed_name: hotelRoomData?.bed_name,
        meal_id: hotelRoomData?.meal_id,
        meal_name: hotelRoomData?.meal_name,
        max_occupancy: hotelRoomData?.max_occupancy,
        amenities: hotelRoomData?.amenities,
        price: hotelRoomData?.price,
        availability_status: hotelRoomData?.availability_status,
        description: hotelRoomData?.description,
        upload_documents: hotelRoomData?.upload_documents
          ? JSON.parse(hotelRoomData.upload_documents)
          : [],
      });
    }
  }, [itemId, isEdit, hotelRoomData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = {
        ...formData,
        upload_documents: JSON.stringify(formData?.upload_documents),
      };
      dispatch(CreateHotelRoomAction(sendData, Navigate, itemId));
    } catch (error) {
      toast.error("Error updating hotel room:", error);
    }
  };

  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg || hotelRoomCreates?.loading) && (
          <MainScreenFreezeLoader />
        )}
        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.hotel_svg}
                {isEdit ? "Update Room" : "New Room"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link to={"/dashboard/hotels-services"} className="linkx3">
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
                          Room Number/Name<b className="color_red">*</b>
                        </label>
                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.room_number}
                            onChange={handleChange}
                            name="room_number"
                            placeholder="Enter Room Name"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Occupancy<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Occupancy"
                            options={occupancy}
                            value={formData?.occupancy_id}
                            onChange={handleChange}
                            name="occupancy_id"
                            defaultOption="Select Occupancy"
                            type="masters"
                          />
                        </span>
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Bed<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            label="Bed"
                            options={bed}
                            value={formData?.bed_id}
                            onChange={handleChange}
                            name="bed_id"
                            defaultOption="Select Bed"
                            type="masters"
                          />
                        </span>
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
                      </div>

                      <div className="form_commonblock">
                        <label>Max Occupancy Of Persons</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="max_occupancy"
                              placeholder="Enter Max Occupancy"
                              value={formData.max_occupancy}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="form_commonblock">
                        <label>Amenities</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <input
                              value={formData.amenities}
                              onChange={handleChange}
                              name="amenities"
                              placeholder="Enter Amenities"
                            />
                          </span>
                        </div>
                      </div>
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
                            />
                          </span>
                        </div>
                      </div>
                      <div className="f1wrapofcreqx1">
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
                </div>

                <SubmitButton2
                  isEdit={isEdit}
                  itemId={itemId}
                  cancel="create-hotelservices"
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

export default CreateHotelService;
