import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import {
  assistDetailsAction,
  CreateAssistAction,
} from "../../../../Redux/Actions/assistAction";
import { SubmitButton2 } from "../../../Common/Pagination/SubmitButton";
import TextAreaComponentWithTextLimit from "../../../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { ShowMasterData, ShowUserMasterData } from "../../../Helper/HelperFunctions";
import NumericInput from "../../../Helper/NumericInput";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";

const CreateAssit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
  const assitCreates = useSelector((state) => state?.createAssist);
  const assistDetails = useSelector((state) => state?.assistDetails);
  const assitData = assistDetails?.data?.data?.data || {};

  const vehicleType = ShowUserMasterData("41");

  const [formData, setFormData] = useState({
    meeting_type: "",
    airport: "",
    no_of_person: "",
    price: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    meeting_type: false,
    airport: false,
    no_of_person: false,
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
        assist_id: itemId,
        fy: localStorage.getItem("FinancialYear"),
      };
      dispatch(assistDetailsAction(queryParams));
    }
  }, [dispatch, itemId]);
  useEffect(() => {
    if (itemId && isEdit && assitData) {
      setFormData({
        ...formData,
        id: assitData?.id,
        meeting_type: assitData?.meeting_type,
        airport: assitData?.airport,
        no_of_person: assitData?.no_of_person,
        price: assitData?.price,
        description: assitData?.description,
      });
    }
  }, [itemId, isEdit, assitData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      meeting_type: formData?.meeting_type ? false : true,
      price: formData?.price ? false : true,
      airport: formData?.airport ? false : true,
      no_of_person: formData?.no_of_person ? false : true,
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
        };
        dispatch(CreateAssistAction(sendData, navigate));
      } catch (error) {
        toast.error("Error updating hotel:", error);
      }
    }
  };
  return (
    <div>
      <>
        <TopLoadbar />
        {(freezLoadingImg || assitCreates?.loading) && (
          <MainScreenFreezeLoader />
        )}
        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx2">
            <div id="leftareax12">
              <h1 id="firstheading">
                {otherIcons?.hotel_svg}
                {isEdit ? "Update Assist" : "New Assist"}
              </h1>
            </div>
            <div id="buttonsdata">
              <Link to={"/dashboard/assists-services"} className="linkx3">
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
                          Meeting Type<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData?.meeting_type}
                            onChange={handleChange}
                            name="meeting_type"
                            placeholder="Enter Meeting Type"
                          />
                        </span>
                        {errors?.meeting_type && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Meeting Type
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          Airport<b className="color_red">*</b>
                        </label>

                        <span id="">
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData?.airport}
                            onChange={handleChange}
                            name="airport"
                            placeholder="Enter Airport"
                          />
                        </span>
                        {errors?.airport && (
                          <p
                            className="error_message"
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "0px important",
                            }}
                          >
                            {otherIcons.error_svg}
                            Please Fill Airport
                          </p>
                        )}
                      </div>
                      <div className="form_commonblock">
                        <label>
                          No Of Persons<b className="color_red">*</b>
                        </label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <NumericInput
                              name="no_of_person"
                              placeholder="Enter No Of Persons"
                              value={formData?.no_of_person}
                              onChange={(e) => handleChange(e)}
                            />
                          </span>
                          {errors?.no_of_person && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Fill No Of Persons
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="form_commonblock">
                        <label>
                          Price<b className="color_red">*</b>
                        </label>
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

                <SubmitButton2
                  isEdit={isEdit}
                  itemId={itemId}
                  cancel="assists-services"
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

export default CreateAssit;
