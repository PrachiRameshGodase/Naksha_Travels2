import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { CustomDropdown006 } from "../../Components/CustomDropdown/CustomDropdown06";
import CustomDropdown22 from "../../Components/CustomDropdown/CustomDropdown22";
import TextAreaComponentWithTextLimit from "../Helper/ComponentHelper/TextAreaComponentWithTextLimit";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../Helper/DateFormat";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import ResizeFL from "../../Components/ExtraButtons/ResizeFL";
import { Toaster, toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { SubmitButton2 } from "../Common/Pagination/SubmitButton";
import { helpPriority } from "../Helper/ComponentHelper/DropdownData";
import CustomDropdown04 from "../../Components/CustomDropdown/CustomDropdown04";
import useOutsideClick from "../Helper/PopupData";
import { HelpCreateAction } from "../../Redux/Actions/helpAction";
import { Button } from "react-bootstrap";
import axiosInstance from '../../Configs/axiosInstance';
import ImageUpload, { MultiImageUpload, MultiImageUploadHelp } from "../Helper/ComponentHelper/ImageUpload";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import { ShowMasterData } from "../Helper/HelperFunctions";
const HelpCreate = () => {
  //   const masterData = useSelector((state) => state?.masterData?.masterData);
  const GRNcreates = useSelector((state) => state?.helpCreate);

  const issue = ShowMasterData("20");
  const module = ShowMasterData("21");

  const dropdownRef1 = useRef(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: formatDate(new Date()),
    issue_type_id: "",
    issue_type_name: "",
    module_id: "",
    module_name: "",
    page_url: "",
    priority: "",
    comments: null,
    upload_documents: [],
    id: 0,
  });

  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit, } = Object.fromEntries(params.entries());

  const [cusData, setcusData] = useState(null);
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;



    const issueTypeName = issue?.find((val) => val?.labelid == value)




    const moduleName = module?.find((val) => val?.labelid == value)


    setFormData({
      ...formData,
      ...(name === "issue_type_id" && { issue_type_name: issueTypeName?.label }),
      ...(name === "module_id" && { module_name: moduleName?.label }),
      [name]: value
    });

  };

  // console.log("formData", formData)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = {
        ...formData,
        is_accounts: 1,
        upload_documents: JSON.stringify(formData?.upload_documents)
      };
      dispatch(HelpCreateAction(sendData, Navigate));
    } catch (error) {
      toast.error("Error updating help:", error);
    }
  };




  useOutsideClick(dropdownRef, () => setOpenDropdownIndex(null));

  return (
    <>
      <Toaster />
      <TopLoadbar />
      {(freezLoadingImg || GRNcreates?.loading) && <MainScreenFreezeLoader />}
      <div className="formsectionsgrheigh">
        <div id="Anotherbox" className="formsectionx2">
          <div id="leftareax12">
            <h1 id="firstheading">


              {otherIcons?.help_svg2}
              New Help
            </h1>
            <br />
            <br />
            <br />
            <br />
          </div>

          <div id="buttonsdata">
            <Link to={"/dashboard/help"} className="linkx3">
              <RxCross2 />
            </Link>
          </div>
        </div>

        <div id="formofcreateitems">
          <form onSubmit={handleFormSubmit}>
            <div className="relateivdiv">
              {/* <div className=""> */}
              <div className="itemsformwrap">
                <div className="f1wrapofcreq">
                  <div className="f1wrapofcreqx1">
                    <div className="form_commonblock ">
                      <label className="color_red">Date</label>
                      <span>
                        {otherIcons.date_svg}
                        <DatePicker
                          selected={formData.date}
                          onChange={(date) =>
                            setFormData({
                              ...formData,
                              date: formatDate(date),
                            })
                          }
                          name="date"
                          placeholderText="Enter Date"
                          dateFormat="dd-MM-yyyy" // Add format prop
                        />
                      </span>
                    </div>
                    <div className="form_commonblock">
                      <label className="color_red">Issue Type<b className="color_red">*</b></label>

                      <span>
                        {otherIcons.vendor_svg}
                        <CustomDropdown04
                          label="Issue Type"
                          options={issue}
                          value={formData?.issue_type_id}
                          onChange={handleChange}
                          name="issue_type_id"
                          defaultOption="Select Issue Type"
                          type="masters"
                        />
                      </span>

                    </div>

                    <div className="form_commonblock">
                      <label>Page URL</label>
                      <span>
                        {otherIcons.placeofsupply_svg}
                        <input
                          value={formData.page_url}
                          onChange={handleChange}
                          name="page_url"
                          placeholder="Enter Page URL"
                        />
                      </span>
                    </div>

                    <div className="form_commonblock">
                      <label>Priority</label>
                      <div id="inputx1">
                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown04
                            ref={dropdownRef1}
                            options={helpPriority}
                            value={formData.priority}
                            onChange={handleChange}
                            name="priority"
                            defaultOption="Select Priority"
                            type="masters"
                            required
                          />
                        </span>
                      </div>
                    </div>

                    <div className="form_commonblock">
                      <div className="secondtotalsections485s sxfc546sdfr85234e">
                        <div className="textareaofcreatqsiform">
                          <label>Comment</label>
                          <div className="show_no_of_text_limit_0121">
                            <TextAreaComponentWithTextLimit
                              formsValues={{ handleChange, formData }}
                              placeholder="Enter the comments "
                              name="comments"
                              value={formData?.comments}
                            />
                          </div>
                        </div>
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


                </div>
              </div>

              <SubmitButton2
                // isEdit=""
                // itemId=""
                cancel="help"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HelpCreate;
