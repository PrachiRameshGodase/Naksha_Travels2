import React, { useState, useEffect, useRef } from "react";
import TransactionCus from "../../Items/Insidealldetailscus/TransactionCus";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ShowMastersValue from "../../Helper/ShowMastersValue";
import { OverflowHideBOdy } from "../../../Utils/OverflowHideBOdy";
import {
  showDeparmentLabels,
  ShowMasterData,
} from "../../Helper/HelperFunctions";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { formatDate, formatDate3 } from "../../Helper/DateFormat";
import { Navigate, useNavigate } from "react-router-dom";
import AttachmentPreview from "../../Helper/AttachmentPreview";
const InsideCusDetails = ({
  customerDetails,
  employees,
  family_members,
  type,
}) => {
  const navigate=useNavigate()
  const displayValue = (value) => (value ? value : "NA");
  const [activeSection, setActiveSection] = useState("basicdetails");
  const mainDeparmentVal = ShowMasterData("10");
  console.log("customerDetails", customerDetails);
  const [isOpen, setIsOpen] = useState([true, true, false, false]);

  // Function to toggle the open/close status of an accordion item
  const toggleAccordion = (index) => {
    setIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Format the date using toLocaleDateString
  const dateObject = new Date(customerDetails?.created_at);
  const formattedDate = dateObject?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  // Format the date using toLocaleDateString

  // emoji mart
  const emojiContainerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiContainerRef.current &&
        !emojiContainerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const [note, setNote] = useState("");
  const addEmoji = (emoji) => {
    setNote((prevMessages) => prevMessages + emoji.native);
  };
  const getOrdinalIndicator = (index) => {
    const j = index % 10;
    const k = index % 100;
    if (j == 1 && k !== 11) {
      return "st";
    }
    if (j == 2 && k !== 12) {
      return "nd";
    }
    if (j == 3 && k !== 13) {
      return "rd";
    }
    return "th";
  };
  const uploadDocuments = customerDetails?.upload_documents
    ? JSON.parse(customerDetails?.upload_documents)
    : [];
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const popupRef = useRef(null);
  const showimagepopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    OverflowHideBOdy(true); // Set overflow hidden
    setShowPopup(true); // Show the popup
  };

  // close emoji mart
  let billingIndex = 0;
  let shippingIndex = 0;
  return (
    <div id="itemsdetailsrowskl">
      <div className="buttonscontainxs2">
        <div
          className={`divac12cs32 ${
            activeSection === "basicdetails" ? "activediv12cs" : ""
          }`}
          onClick={() => setActiveSection("basicdetails")}
        >
          Basic Details
        </div>
        <div
          className={`divac12cs32 ${
            activeSection === "transaction" ? "activediv12cs" : ""
          }`}
          onClick={() => setActiveSection("transaction")}
        >
          Transaction
        </div>
        {/* <div
          className={`divac12cs32 ${activeSection === 'notes' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('notes')}
        >
          Notes
        </div> */}
        {/* <div
          className={`divac12cs32 ${activeSection === 'mails' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('mails')}
        >
          Mails
        </div> */}
        <div
          className={`divac12cs32 ${
            activeSection === "statement" ? "activediv12cs" : ""
          }`}
          onClick={() => setActiveSection("statement")}
        >
          Statement
        </div>
      </div>

      <div className="insidcontain">
        {activeSection === "basicdetails" && (
          <>
            <div className="inidbcusx2">
              <div className="accordion-item">
                <div
                  className={`accordion-header ${
                    isOpen[0] ? "openedaccordina" : ""
                  }`}
                  onClick={() => toggleAccordion(0)}
                >
                  <p>
                    {otherIcons.basic_details_svg}
                    {type === "vendor"
                      ? "Vendor Basic Details"
                      : "Basic Details"}
                  </p>
                  <span className="svgico4x5s6">
                    {isOpen[0] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                <div
                  className={`accordion-content ${
                    isOpen[0] ? "openedaccordina" : ""
                  }`}
                >
                  <div className="cusdes1sec">
                    <div className="cusdes1secchild1">
                      <ul>
                        <li>
                          <span>Primary Contact</span>
                          <h1>:</h1>
                          <p>
                            {(customerDetails?.salutation || "") +
                              " " +
                              (customerDetails?.first_name || "") +
                              " " +
                              (customerDetails?.last_name || "")}
                          </p>
                        </li>
                        <li>
                          <span>Mobile Number</span>
                          <h1>:</h1>
                          <p>{customerDetails?.mobile_no || ""}</p>
                        </li>

                        <li>
                          <span>Email</span>
                          <h1>:</h1>
                          <p>{customerDetails?.email || ""}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="cusdes1secchild1">
                      <ul>
                        <li>
                          <span style={{ width: "180px" }}>
                            User Creation Date
                          </span>
                          <h1>:</h1>
                          <p>{formattedDate || ""}</p>
                        </li>

                        {type === "customer" && (
                          <li>
                            <span style={{ width: "180px" }}>
                              Customer Type
                            </span>
                            <h1>:</h1>
                            <p>{customerDetails?.customer_type || ""}</p>
                          </li>
                        )}

                        <li>
                          <span>Department</span>
                          <h1>:</h1>
                          <p>
                            {" "}
                            {showDeparmentLabels(
                              customerDetails?.department,
                              mainDeparmentVal
                            )}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <div
                  className={`accordion-header ${
                    isOpen[1] ? "openedaccordina" : ""
                  }`}
                  onClick={() => toggleAccordion(1)}
                >
                  <p>
                    {otherIcons.company_details_svg}
                    Company Details
                  </p>
                  <span className="svgico4x5s6">
                    {isOpen[1] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                <div
                  className={`accordion-content ${
                    isOpen[1] ? "openedaccordina" : ""
                  }`}
                >
                  <div className="cusdes1sec">
                    <div className="cusdes1secchild1">
                      <ul>
                        <li>
                          <span style={{ width: "182px" }}>Company Name</span>
                          <h1>:</h1>
                          <p>{customerDetails?.company_name || ""}</p>
                        </li>
                        <li>
                          <span style={{ width: "182px" }}>
                            Customer Display Name
                          </span>
                          <h1>:</h1>
                          <p>{customerDetails?.display_name || ""}</p>
                        </li>

                        <li>
                          <span style={{ width: "182px" }}>TIN</span>
                          <h1>:</h1>
                          <p>{customerDetails?.pan_no || ""}</p>
                        </li>
                        <li>
                          <span style={{ width: "182px" }}>
                            Business Legal Name
                          </span>
                          <h1>:</h1>
                          <p className="primarycolortext">
                            {customerDetails?.business_leagal_name || ""}
                          </p>
                        </li>

                        <li>
                          <span style={{ width: "182px" }}>VAT Number</span>
                          <h1>:</h1>
                          <p>{customerDetails?.gst_no || ""}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="cusdes1secchild1">
                      <ul>
                        <li>
                          <span style={{ width: "116px" }}>Work Phone</span>
                          <h1>:</h1>
                          <p>{customerDetails?.work_phone || ""}</p>
                        </li>

                        <li>
                          <span style={{ width: "116px" }}>Website</span>
                          <h1>:</h1>
                          <p className="primarycolortext">
                            {customerDetails?.website || ""}
                          </p>
                        </li>
                        <li>
                          <span style={{ width: "116px" }}>Registration</span>
                          <h1>:</h1>
                          <p>{customerDetails?.registration_type || ""}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {customerDetails?.customer_type == "Individual" ? (
                <div className="accordion-item">
                  <div
                    className={`accordion-header ${
                      isOpen[2] ? "openedaccordina" : ""
                    }`}
                    onClick={() => toggleAccordion(2)}
                  >
                    <p>
                      {otherIcons.contact_person_svg}
                      Family Members
                    </p>
                    <span className="svgico4x5s6">
                      {isOpen[2] ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </div>
                  <div
                    className={`accordion-content ${
                      isOpen[2] ? "openedaccordina" : ""
                    }`}
                  >
                    <div className="contents">
                      <div className="ProjectList">
                        <table style={{ width: "828px" }}>
                          <thead>
                            <tr>
                              <th>Sr No.</th>
                              <th>Member Name</th>

                              <th>Mobile Number</th>
                              <th>Email</th>
                              <th>Gender</th>
                              <th>Relationship</th>
                              <th>Food Type</th>
                              <th>Attachment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {family_members?.map((item, index) => (
                              <tr key={index}>
                               
                                <td>{index + 1 || "-"}</td>
                                <td style={{color:"#2626d3", cursor:"pointer"}} onClick={()=>{navigate(`/dashboard/customer-details?id=${item?.id}`)}}>{`${item?.first_name || "-"} ${
                                  item?.last_name || "-"
                                }`}</td>

                                <td>{item?.mobile_no || "-"}</td>

                                <td>{item?.email || "-"}</td>
                                <td>
                                  <ShowMastersValue
                                    type="45"
                                    id={item?.gender || "-"}
                                  />
                                </td>
                                <td>
                                  <ShowMastersValue
                                    type="46"
                                    id={item?.relationship || "-"}
                                  />
                                </td>
                                <td>
                                  <ShowMastersValue
                                    type="47"
                                    id={item?.food_type || "-"}
                                  />
                                </td>
                                <td>
                                <AttachmentPreview attachments={item?.photo ? JSON.parse(item?.photo) : {}}/>

                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="accordion-item">
                  <div
                    className={`accordion-header ${
                      isOpen[2] ? "openedaccordina" : ""
                    }`}
                    onClick={() => toggleAccordion(2)}
                  >
                    <p>
                      {otherIcons.contact_person_svg}
                      Employee details
                    </p>
                    <span className="svgico4x5s6">
                      {isOpen[2] ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </div>
                  <div
                    className={`accordion-content ${
                      isOpen[2] ? "openedaccordina" : ""
                    }`}
                  >
                    <div className="contents">
                      <div className="ProjectList">
                        <table style={{ width: "828px" }}>
                          <thead>
                            <tr>
                              <th>Sr No.</th>
                              <th>Member Name</th>
                              <th>Company Name</th>
                              <th>Mobile Number</th>
                              <th>Email</th>
                              <th>Gender</th>

                              <th>Food Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {employees?.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1 || "-"}</td>
                                <td>{`${item?.first_name || "-"} ${
                                  item?.last_name || "-"
                                }`}</td>
<td style={{color:"#2626d3"}}>{item?.company_name
|| "-"}</td>
                                <td>{item?.mobile_no || "-"}</td>

                                <td>{item?.email || "-"}</td>
                                <td>
                                  <ShowMastersValue
                                    type="45"
                                    id={item?.gender || "-"}
                                  />
                                </td>

                                <td>
                                  <ShowMastersValue
                                    type="47"
                                    id={item?.food_type || "-"}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="accordion-item">
                <div
                  className={`accordion-header ${
                    isOpen[3] ? "openedaccordina" : ""
                  }`}
                  onClick={() => toggleAccordion(3)}
                >
                  <p>
                    {otherIcons.company_details_svg}
                    Bank Details
                  </p>
                  <span className="svgico4x5s6">
                    {isOpen[3] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                {}
                <div
                  className={`accordion-content ${
                    isOpen[3] ? "openedaccordina" : ""
                  }`}
                >
                  <div>
                    {customerDetails?.bank_details?.map((val, index) => (
                      <div key={index}>
                        <h3>
                          {index + 1}
                          {getOrdinalIndicator(index + 1)} Bank Details
                        </h3>
                        <div className="cusdes1sec">
                          <div className="cusdes1secchild1">
                            <ul>
                              <li>
                                <span style={{ width: "182px" }}>
                                  Holder Name
                                </span>
                                <h1>:</h1>
                                <p>{val?.holder_name || ""}</p>
                              </li>
                              <li>
                                <span style={{ width: "182px" }}>
                                  Bank Name
                                </span>
                                <h1>:</h1>
                                <p>{val?.banks_name || ""}</p>
                              </li>

                              <li>
                                <span style={{ width: "182px" }}>
                                  Account Number
                                </span>
                                <h1>:</h1>
                                <p>{val?.account_no || ""}</p>
                              </li>
                              <li>
                                <span style={{ width: "182px" }}>
                                  IFSC Code
                                </span>
                                <h1>:</h1>
                                <p className="">{val?.ifsc_code || ""}</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <div
                  className={`accordion-header ${
                    isOpen[10] ? "openedaccordina" : ""
                  }`}
                  onClick={() => toggleAccordion(10)}
                >
                  <p>
                    {otherIcons.company_details_svg}
                    Payment Details
                  </p>
                  <span className="svgico4x5s6">
                    {isOpen[10] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                {}
                <div
                  className={`accordion-content ${
                    isOpen[10] ? "openedaccordina" : ""
                  }`}
                >
                  <div>
                    {customerDetails?.payment_details?.map((val, index) => (
                      <div key={index}>
                        <h3></h3>
                        <div className="cusdes1sec">
                          <div className="cusdes1secchild1">
                            <ul>
                              <li>
                                <span style={{ width: "374px" }}>
                                  Preferred Payment Method
                                </span>
                                <h1>:</h1>
                                <p>{val?.payment_method || ""}</p>
                              </li>
                              <li>
                                <span style={{ width: "374px" }}>
                                  Credit Limit
                                </span>
                                <h1>:</h1>
                                <p>{val?.credit_limit || ""}</p>
                              </li>

                              <li>
                                <span style={{ width: "374px" }}>
                                  Payment Terms
                                </span>
                                <h1>:</h1>
                                <ShowMastersValue
                                  type="8"
                                  id={val?.payment_terms || ""}
                                />
                                <p></p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <div
                  className={`accordion-header ${
                    isOpen[4] ? "openedaccordina" : ""
                  }`}
                  onClick={() => toggleAccordion(4)}
                >
                  <p>
                    {otherIcons.company_details_svg}
                    Remark
                  </p>
                  <span className="svgico4x5s6">
                    {isOpen[4] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                <div
                  className={`accordion-content ${
                    isOpen[4] ? "openedaccordina" : ""
                  }`}
                >
                  <div className="cusdes1sec">
                    <div className="">
                      <ul>
                        <p>{customerDetails?.remarks || ""}</p>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <div
                  className={`accordion-header ${
                    isOpen[5] ? "openedaccordina" : ""
                  }`}
                  onClick={() => toggleAccordion(5)}
                >
                  <p>
                    {otherIcons.company_details_svg}
                    Upload Images/Documents
                  </p>
                  <span className="svgico4x5s6">
                    {isOpen[5] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                <div
                  className={`accordion-content ${
                    isOpen[5] ? "openedaccordina" : ""
                  }`}
                >
                  <div className="cusdes1sec">
                    <div
                      className="uploaded-images-grid"
                      style={{ width: "calc(57% - -360px)" }}
                    >
                      {uploadDocuments?.map((doc, index) => {
                        const imageUrl = Object.values(doc)[0]; // Extract the URL
                        const imageName = doc.name || `Image ${index + 1}`; // Handle the name, if available
                        const truncatedName =
                          imageName.length > 20
                            ? imageName.slice(0, 17) + "..."
                            : imageName;
                        const fileExtension = imageName
                          .split(".")
                          .pop()
                          .toLowerCase();

                        const isIamge = ["jpg", "jpeg", "png", "gif"].includes(
                          fileExtension
                        );

                        // Function to return the appropriate icon or image
                        const renderFilePreview = () => {
                          if (isIamge) {
                            return (
                              <img
                                src={imageUrl}
                                alt={`Uploaded ${index + 1}`}
                                className="uploaded-image"
                                onClick={() => showimagepopup(imageUrl)}
                              />
                            );
                          } else if (fileExtension === "pdf") {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 32 32"
                              >
                                <path
                                  fill="#909090"
                                  d="m24.1 2.072l5.564 5.8v22.056H8.879V30h20.856V7.945z"
                                />
                                <path
                                  fill="#f4f4f4"
                                  d="M24.031 2H8.808v27.928h20.856V7.873z"
                                />
                                <path
                                  fill="#7a7b7c"
                                  d="M8.655 3.5h-6.39v6.827h20.1V3.5z"
                                />
                                <path
                                  fill="#dd2025"
                                  d="M22.472 10.211H2.395V3.379h20.077z"
                                />
                                <path
                                  fill="#464648"
                                  d="M9.052 4.534H7.745v4.8h1.028V7.715L9 7.728a2 2 0 0 0 .647-.117a1.4 1.4 0 0 0 .493-.291a1.2 1.2 0 0 0 .335-.454a2.1 2.1 0 0 0 .105-.908a2.2 2.2 0 0 0-.114-.644a1.17 1.17 0 0 0-.687-.65a2 2 0 0 0-.409-.104a2 2 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.193a.57.57 0 0 1 .459.181a.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.94.94 0 0 1-.524.114m3.671-2.306c-.111 0-.219.008-.295.011L12 4.538h-.78v4.8h.918a2.7 2.7 0 0 0 1.028-.175a1.7 1.7 0 0 0 .68-.491a1.9 1.9 0 0 0 .373-.749a3.7 3.7 0 0 0 .114-.949a4.4 4.4 0 0 0-.087-1.127a1.8 1.8 0 0 0-.4-.733a1.6 1.6 0 0 0-.535-.4a2.4 2.4 0 0 0-.549-.178a1.3 1.3 0 0 0-.228-.017m-.182 3.937h-.1V5.392h.013a1.06 1.06 0 0 1 .6.107a1.2 1.2 0 0 1 .324.4a1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a3 3 0 0 1-.033.513a1.8 1.8 0 0 1-.169.5a1.1 1.1 0 0 1-.363.36a.67.67 0 0 1-.416.106m5.08-3.915H15v4.8h1.028V7.434h1.3v-.892h-1.3V5.43h1.4v-.892"
                                />
                                <path
                                  fill="#dd2025"
                                  d="M21.781 20.255s3.188-.578 3.188.511s-1.975.646-3.188-.511m-2.357.083a7.5 7.5 0 0 0-1.473.489l.4-.9c.4-.9.815-2.127.815-2.127a14 14 0 0 0 1.658 2.252a13 13 0 0 0-1.4.288Zm-1.262-6.5c0-.949.307-1.208.546-1.208s.508.115.517.939a10.8 10.8 0 0 1-.517 2.434a4.4 4.4 0 0 1-.547-2.162Zm-4.649 10.516c-.978-.585 2.051-2.386 2.6-2.444c-.003.001-1.576 3.056-2.6 2.444M25.9 20.895c-.01-.1-.1-1.207-2.07-1.16a14 14 0 0 0-2.453.173a12.5 12.5 0 0 1-2.012-2.655a11.8 11.8 0 0 0 .623-3.1c-.029-1.2-.316-1.888-1.236-1.878s-1.054.815-.933 2.013a9.3 9.3 0 0 0 .665 2.338s-.425 1.323-.987 2.639s-.946 2.006-.946 2.006a9.6 9.6 0 0 0-2.725 1.4c-.824.767-1.159 1.356-.725 1.945c.374.508 1.683.623 2.853-.91a23 23 0 0 0 1.7-2.492s1.784-.489 2.339-.623s1.226-.24 1.226-.24s1.629 1.639 3.2 1.581s1.495-.939 1.485-1.035"
                                />
                                <path
                                  fill="#909090"
                                  d="M23.954 2.077V7.95h5.633z"
                                />
                                <path
                                  fill="#f4f4f4"
                                  d="M24.031 2v5.873h5.633z"
                                />
                                <path
                                  fill="#fff"
                                  d="M8.975 4.457H7.668v4.8H8.7V7.639l.228.013a2 2 0 0 0 .647-.117a1.4 1.4 0 0 0 .493-.291a1.2 1.2 0 0 0 .332-.454a2.1 2.1 0 0 0 .105-.908a2.2 2.2 0 0 0-.114-.644a1.17 1.17 0 0 0-.687-.65a2 2 0 0 0-.411-.105a2 2 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.194a.57.57 0 0 1 .459.181a.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.94.94 0 0 1-.524.114m3.67-2.306c-.111 0-.219.008-.295.011l-.235.006h-.78v4.8h.918a2.7 2.7 0 0 0 1.028-.175a1.7 1.7 0 0 0 .68-.491a1.9 1.9 0 0 0 .373-.749a3.7 3.7 0 0 0 .114-.949a4.4 4.4 0 0 0-.087-1.127a1.8 1.8 0 0 0-.4-.733a1.6 1.6 0 0 0-.535-.4a2.4 2.4 0 0 0-.549-.178a1.3 1.3 0 0 0-.228-.017m-.182 3.937h-.1V5.315h.013a1.06 1.06 0 0 1 .6.107a1.2 1.2 0 0 1 .324.4a1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a3 3 0 0 1-.033.513a1.8 1.8 0 0 1-.169.5a1.1 1.1 0 0 1-.363.36a.67.67 0 0 1-.416.106m5.077-3.915h-2.43v4.8h1.028V7.357h1.3v-.892h-1.3V5.353h1.4v-.892"
                                />
                              </svg>
                            );
                          } else if (["doc", "docx"].includes(fileExtension)) {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 32 32"
                              >
                                <defs>
                                  <linearGradient
                                    id="vscodeIconsFileTypeWord0"
                                    x1="4.494"
                                    x2="13.832"
                                    y1="-1712.086"
                                    y2="-1695.914"
                                    gradientTransform="translate(0 1720)"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop offset="0" stop-color="#2368c4" />
                                    <stop offset=".5" stop-color="#1a5dbe" />
                                    <stop offset="1" stop-color="#1146ac" />
                                  </linearGradient>
                                </defs>
                                <path
                                  fill="#41a5ee"
                                  d="M28.806 3H9.705a1.19 1.19 0 0 0-1.193 1.191V9.5l11.069 3.25L30 9.5V4.191A1.19 1.19 0 0 0 28.806 3"
                                />
                                <path
                                  fill="#2b7cd3"
                                  d="M30 9.5H8.512V16l11.069 1.95L30 16Z"
                                />
                                <path
                                  fill="#185abd"
                                  d="M8.512 16v6.5l10.418 1.3L30 22.5V16Z"
                                />
                                <path
                                  fill="#103f91"
                                  d="M9.705 29h19.1A1.19 1.19 0 0 0 30 27.809V22.5H8.512v5.309A1.19 1.19 0 0 0 9.705 29"
                                />
                                <path
                                  d="M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 0 0 1.194-1.191V9.391A1.2 1.2 0 0 0 16.434 8.2"
                                  opacity="0.1"
                                />
                                <path
                                  d="M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
                                  opacity="0.2"
                                />
                                <path
                                  d="M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
                                  opacity="0.2"
                                />
                                <path
                                  d="M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
                                  opacity="0.2"
                                />
                                <path
                                  fill="url(#vscodeIconsFileTypeWord0)"
                                  d="M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.19 1.19 0 0 1 2 21.959V10.041A1.19 1.19 0 0 1 3.194 8.85"
                                />
                                <path
                                  fill="#fff"
                                  d="M6.9 17.988q.035.276.046.481h.028q.015-.195.065-.47c.05-.275.062-.338.089-.465l1.255-5.407h1.624l1.3 5.326a8 8 0 0 1 .162 1h.022a8 8 0 0 1 .135-.975l1.039-5.358h1.477l-1.824 7.748h-1.727l-1.237-5.126q-.054-.222-.122-.578t-.084-.52h-.021q-.021.189-.084.561t-.1.552L7.78 19.871H6.024L4.19 12.127h1.5l1.131 5.418a5 5 0 0 1 .079.443"
                                />
                              </svg>
                            );
                          } else if (["xls", "xlsx"].includes(fileExtension)) {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 32 32"
                              >
                                <path
                                  fill="#20744a"
                                  fill-rule="evenodd"
                                  d="M28.781 4.405h-10.13V2.018L2 4.588v22.527l16.651 2.868v-3.538h10.13A1.16 1.16 0 0 0 30 25.349V5.5a1.16 1.16 0 0 0-1.219-1.095m.16 21.126H18.617l-.017-1.889h2.487v-2.2h-2.506l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2h10.411Z"
                                />
                                <path
                                  fill="#20744a"
                                  d="M22.487 7.439h4.323v2.2h-4.323zm0 3.501h4.323v2.2h-4.323zm0 3.501h4.323v2.2h-4.323zm0 3.501h4.323v2.2h-4.323zm0 3.501h4.323v2.2h-4.323z"
                                />
                                <path
                                  fill="#fff"
                                  fill-rule="evenodd"
                                  d="m6.347 10.673l2.146-.123l1.349 3.709l1.594-3.862l2.146-.123l-2.606 5.266l2.606 5.279l-2.269-.153l-1.532-4.024l-1.533 3.871l-2.085-.184l2.422-4.663z"
                                />
                              </svg>
                            );
                          } else if (fileExtension === "zip") {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#484842"
                                  d="M16 12v-2h2v2zm0 2h-2v-2h2zm0 2v-2h2v2zm-4.806-8l-2-2H4.615q-.269 0-.442.173T4 6.616v10.769q0 .269.173.442t.443.173H14v-2h2v2h3.385q.269 0 .442-.173t.173-.442v-8.77q0-.269-.173-.442T19.385 8H16v2h-2V8zM4.615 19q-.69 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h4.981l2 2h7.789q.69 0 1.153.463T21 8.616v8.769q0 .69-.462 1.153T19.385 19zM4 18V6z"
                                />
                              </svg>
                            );
                          } else {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 256 256"
                              >
                                <path
                                  fill="#484842"
                                  d="m210.83 85.17l-56-56A4 4 0 0 0 152 28H56a12 12 0 0 0-12 12v176a12 12 0 0 0 12 12h144a12 12 0 0 0 12-12V88a4 4 0 0 0-1.17-2.83M156 41.65L198.34 84H156ZM200 220H56a4 4 0 0 1-4-4V40a4 4 0 0 1 4-4h92v52a4 4 0 0 0 4 4h52v124a4 4 0 0 1-4 4"
                                />
                              </svg>
                            );
                          }
                        };

                        return (
                          <>
                            {isIamge ? (
                              <div className="image-container" key={index}>
                                <div className="image-item">
                                  {renderFilePreview()}
                                </div>
                                <div className="image-details">
                                  <div className="image-name" title={imageName}>
                                    {truncatedName}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className=""
                                key={index}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "calc(25% - 16px)",
                                  alignItems: "center",
                                }}
                              >
                                <div className="" style={{ marginTop: "2px" }}>
                                  {renderFilePreview()}
                                </div>
                                {/* <div className="image-details"> */}
                                <div
                                  className="image-name"
                                  style={{
                                    marginLeft: "10px",
                                    marginBottom: "4px",
                                  }}
                                  title={imageName}
                                >
                                  {truncatedName}
                                </div>

                                {/* </div> */}
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {showPopup && (
                  <div className="mainxpopups2" ref={popupRef}>
                    <div className="popup-content02">
                      <span
                        className="close-button02"
                        onClick={() => setShowPopup(false)}
                      >
                        <RxCross2 />
                      </span>
                      <img
                        src={selectedImage}
                        alt="Selected Image"
                        height={500}
                        width={500}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="accordion-item">
                <div
                  className={`accordion-header ${
                    isOpen[6] ? "openedaccordina" : ""
                  }`}
                  onClick={() => toggleAccordion(6)}
                >
                  <p>
                    {otherIcons.address_details_svg}
                    Address
                  </p>
                  <span className="svgico4x5s6">
                    {isOpen[6] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                <div
                  className={`accordion-content ${
                    isOpen[5] ? "openedaccordina" : ""
                  }`}
                >
                  <div>
                    {customerDetails?.address?.map((val, index) => (
                      <div key={index}>
                        {/* Billing Address */}
                        {val.is_billing == "1" && (
                          <div>
                            <h3>
                              {++billingIndex}
                              {getOrdinalIndicator(billingIndex)} Billing
                              Address
                            </h3>
                            <div className="cusdes1sec">
                              <div className="cusdes1secchild1">
                                <ul>
                                  <li>
                                    <span>Country</span>
                                    <h1>:</h1>
                                    <p>{val?.country?.name || ""}</p>
                                  </li>
                                  <li>
                                    <span>State</span>
                                    <h1>:</h1>
                                    <p>{val?.state?.name || ""}</p>
                                  </li>
                                  <li>
                                    <span>City</span>
                                    <h1>:</h1>
                                    <p>{val?.city?.name || ""}</p>
                                  </li>
                                  <li>
                                    <span>Address</span>
                                    <h1>:</h1>
                                    <p>
                                      {val?.street_1 || ""},{" "}
                                      {val?.street_2 || ""}
                                    </p>
                                  </li>
                                  <li>
                                    <span>Zip Code</span>
                                    <h1>:</h1>
                                    <p>{val?.zip_code || ""}</p>
                                  </li>
                                  <li>
                                    <span>Phone No.</span>
                                    <h1>:</h1>
                                    <p>{val?.phone_no || ""}</p>
                                  </li>
                                  <li>
                                    <span>Fax No.</span>
                                    <h1>:</h1>
                                    <p>{val?.fax_no || ""}</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <br />
                            <br />
                          </div>
                        )}

                        {/* Shipping Address */}
                        {val.is_shipping == "1" && (
                          <div>
                            <h3>
                              {++shippingIndex}
                              {getOrdinalIndicator(shippingIndex)} Shipping
                              Address
                            </h3>
                            <div className="cusdes1sec">
                              <div className="cusdes1secchild1">
                                <ul>
                                  <li>
                                    <span>Country</span>
                                    <h1>:</h1>
                                    <p>{val?.country?.name || ""}</p>
                                  </li>
                                  <li>
                                    <span>State</span>
                                    <h1>:</h1>
                                    <p>{val?.state?.name || ""}</p>
                                  </li>
                                  <li>
                                    <span>City</span>
                                    <h1>:</h1>
                                    <p>{val?.city?.name || ""}</p>
                                  </li>
                                  <li>
                                    <span>Address</span>
                                    <h1>:</h1>
                                    <p>
                                      {val?.street_1 || ""},{" "}
                                      {val?.street_2 || ""}
                                    </p>
                                  </li>
                                  <li>
                                    <span>Zip Code</span>
                                    <h1>:</h1>
                                    <p>{val?.zip_code || ""}</p>
                                  </li>
                                  <li>
                                    <span>Phone No.</span>
                                    <h1>:</h1>
                                    <p>{val?.phone_no || ""}</p>
                                  </li>
                                  <li>
                                    <span>Fax No.</span>
                                    <h1>:</h1>
                                    <p>{val?.fax_no || ""}</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <br />
                            <br />
                          </div>
                        )}
                      </div>
                    ))}
                    <div className=""></div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <div
                  className={`accordion-header ${
                    isOpen[7] ? "openedaccordina" : ""
                  }`}
                  onClick={() => toggleAccordion(7)}
                >
                  <p>
                    {otherIcons.company_details_svg}
                    Document
                  </p>
                  <span className="svgico4x5s6">
                    {isOpen[7] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                <div
                  className={`accordion-content ${
                    isOpen[7] ? "openedaccordina" : ""
                  }`}
                >
                  <div className="contents">
                    <div className="ProjectList">
                      <table style={{ width: "828px" }}>
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Document Name</th>
                            <th>Document No</th>
                            <th>Issue Date</th>
                            <th>Expiry Date</th>
                            <th>Attachment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerDetails?.documents?.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1 || "-"}</td>

                              <td>{item?.document_name || "-"}</td>
                              <td>{item?.document_no || "-"}</td>
                              <td>{formatDate3(item?.issue_date) || "-"}</td>
                              <td>{formatDate3(item?.expiry_date) || "-"}</td>
                              <td>
                                <AttachmentPreview attachments={item?.upload_documents ? JSON.parse(item?.upload_documents) : []}/>
                               </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <div
                  className={`accordion-header ${
                    isOpen[8] ? "openedaccordina" : ""
                  }`}
                  onClick={() => toggleAccordion(8)}
                >
                  <p>
                    {otherIcons.company_details_svg}
                    Vaccination Details
                  </p>
                  <span className="svgico4x5s6">
                    {isOpen[8] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                <div
                  className={`accordion-content ${
                    isOpen[8] ? "openedaccordina" : ""
                  }`}
                >
                  <div className="contents">
                    <div className="ProjectList">
                      <table style={{ width: "828px" }}>
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Vaccination Name</th>
                            <th>Attachment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerDetails?.vaccination_details?.map(
                            (item, index) => (
                              <tr key={index}>
                                <td>{index + 1 || "-"}</td>

                                <td>{item?.vaccination_name || "-"}</td>
                                <td>
                                <AttachmentPreview attachments={item?.upload_documents ? JSON.parse(item?.upload_documents) : []}/>
                               </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <div
                  className={`accordion-header ${
                    isOpen[9] ? "openedaccordina" : ""
                  }`}
                  onClick={() => toggleAccordion(9)}
                >
                  <p>
                    {otherIcons.company_details_svg}
                    Insurance Details
                  </p>
                  <span className="svgico4x5s6">
                    {isOpen[9] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>

                <div
                  className={`accordion-content ${
                    isOpen[9] ? "openedaccordina" : ""
                  }`}
                >
                  <div>
                    {customerDetails?.insurrance_details?.map((val, index) => (
                      <div key={index}>
                        <div className="cusdes1sec">
                          <div className="cusdes1secchild1">
                            <ul>
                              <li>
                                <span style={{ width: "180px" }}>
                                  Company Name
                                </span>
                                <h1>:</h1>
                                <p>{val?.company_name || ""}</p>
                              </li>
                              <li>
                                <span style={{ width: "180px" }}>
                                  Policy Number
                                </span>
                                <h1>:</h1>
                                <p>{val?.policy_no || ""}</p>
                              </li>

                              <li>
                                <span style={{ width: "180px" }}>
                                  Issue Date
                                </span>
                                <h1>:</h1>

                                <p>{formatDate3(val?.issue_date)}</p>
                              </li>
                            </ul>
                          </div>
                          <div className="cusdes1secchild1">
                            <ul>
                              {" "}
                              <li>
                                <span style={{ width: "180px" }}>
                                  Expiry Date
                                </span>
                                <h1>:</h1>

                                <p>{formatDate3(val?.expiry_date)}</p>
                              </li>
                              <li>
                                <span style={{ width: "180px" }}>
                                  Attachment
                                </span>
                                <h1>:</h1>
                                <p><AttachmentPreview attachments={val?.upload_documents ? JSON.parse(val?.upload_documents) : []}/></p>

                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/* transactions */}
        {activeSection === "transaction" && type === "customer" && (
          <TransactionCus type="customer" />
        )}

        {activeSection === "transaction" && type === "vendor" && (
          <TransactionCus type="vendor" />
        )}

        {/* transactions */}

        {activeSection === "mails" && (
          <>
            <div className="mailsseccus">
              <div className="mailschild01">
                <h1>System Mails</h1>
                <button
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="link email"
                >
                  link email account
                </button>
              </div>
              <div className="mailschild02">
                <div className="mailchz23sz01">
                  <div className="tablerow455x1 tabrinmailxs1">
                    <input type="checkbox" />
                  </div>
                  <div className="tablerow455x1 tabrinmailxs2">
                    <span>D</span>
                    <p>Danielsam22@gmail.com</p>
                  </div>
                  <div className="tablerow455x1 tabrinmailxs3">
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Laoreet pretium
                      reet pretium reet pretium reet pretium reet pretiumreet
                      pretium mattis in nisl. Sed turp.
                    </p>
                  </div>
                  <div className="tablerow455x1 tabrinmailxs4">
                    <span>
                      <p>16/04/2024</p> <p>04.25AM</p>
                    </span>
                  </div>
                </div>
                <div className="mailchz23sz01">
                  <div className="tablerow455x1 tabrinmailxs1">
                    <input type="checkbox" />
                  </div>
                  <div className="tablerow455x1 tabrinmailxs2">
                    <span>D</span>
                    <p>Danielsam22@gmail.com</p>
                  </div>
                  <div className="tablerow455x1 tabrinmailxs3">
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Laoreet pretium
                      reet pretium reet pretium reet pretium reet pretiumreet
                      pretium mattis in nisl. Sed turp.
                    </p>
                  </div>
                  <div className="tablerow455x1 tabrinmailxs4">
                    <span>
                      <p>16/04/2024</p> <p>04.25AM</p>
                    </span>
                  </div>
                </div>
                <div className="mailchz23sz01">
                  <div className="tablerow455x1 tabrinmailxs1">
                    <input type="checkbox" />
                  </div>
                  <div className="tablerow455x1 tabrinmailxs2">
                    <span>D</span>
                    <p>Danielsam22@gmail.com</p>
                  </div>
                  <div className="tablerow455x1 tabrinmailxs3">
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Laoreet pretium
                      reet pretium reet pretium reet pretium reet pretiumreet
                      pretium mattis in nisl. Sed turp.
                    </p>
                  </div>
                  <div className="tablerow455x1 tabrinmailxs4">
                    <span>
                      <p>16/04/2024</p> <p>04.25AM</p>
                    </span>
                  </div>
                </div>
                <div className="mailchz23sz01">
                  <div className="tablerow455x1 tabrinmailxs1">
                    <input type="checkbox" />
                  </div>
                  <div className="tablerow455x1 tabrinmailxs2">
                    <span>D</span>
                    <p>Danielsam22@gmail.com</p>
                  </div>
                  <div className="tablerow455x1 tabrinmailxs3">
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Laoreet pretium
                      reet pretium reet pretium reet pretium reet pretiumreet
                      pretium mattis in nisl. Sed turp.
                    </p>
                  </div>
                  <div className="tablerow455x1 tabrinmailxs4">
                    <span>
                      <p>16/04/2024</p> <p>04.25AM</p>
                    </span>
                  </div>
                </div>
                <div className="mailchz23sz01">
                  <div className="tablerow455x1 tabrinmailxs1">
                    <input type="checkbox" />
                  </div>
                  <div className="tablerow455x1 tabrinmailxs2">
                    <span>D</span>
                    <p>Danielsam22@gmail.com</p>
                  </div>
                  <div className="tablerow455x1 tabrinmailxs3">
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Laoreet pretium
                      reet pretium reet pretium reet pretium reet pretiumreet
                      pretium mattis in nisl. Sed turp.
                    </p>
                  </div>
                  <div className="tablerow455x1 tabrinmailxs4">
                    <span>
                      <p>16/04/2024</p> <p>04.25AM</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === "statement" && (
          <>
            {/* <div className="cusstatements">
              <div className="cusstatementschild1">
                <div className="child01fx546s">
                  <h2>Customer statement for Nadine Nikolaus </h2>
                  <p>From 2023-12-18T19:06:09.617Z To 2023-10-25T20:33:10.852Z</p>
                </div>
                <div className="child01fx546s2">
                  <button>Send email</button>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#434343"} fill={"none"}>
                    <path d="M7.35396 18C5.23084 18 4.16928 18 3.41349 17.5468C2.91953 17.2506 2.52158 16.8271 2.26475 16.3242C1.87179 15.5547 1.97742 14.5373 2.18868 12.5025C2.36503 10.8039 2.45321 9.95455 2.88684 9.33081C3.17153 8.92129 3.55659 8.58564 4.00797 8.35353C4.69548 8 5.58164 8 7.35396 8H16.646C18.4184 8 19.3045 8 19.992 8.35353C20.4434 8.58564 20.8285 8.92129 21.1132 9.33081C21.5468 9.95455 21.635 10.8039 21.8113 12.5025C22.0226 14.5373 22.1282 15.5547 21.7352 16.3242C21.4784 16.8271 21.0805 17.2506 20.5865 17.5468C19.8307 18 18.7692 18 16.646 18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M17 8V6C17 4.11438 17 3.17157 16.4142 2.58579C15.8284 2 14.8856 2 13 2H11C9.11438 2 8.17157 2 7.58579 2.58579C7 3.17157 7 4.11438 7 6V8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M13.9887 16L10.0113 16C9.32602 16 8.98337 16 8.69183 16.1089C8.30311 16.254 7.97026 16.536 7.7462 16.9099C7.57815 17.1904 7.49505 17.5511 7.32884 18.2724C7.06913 19.3995 6.93928 19.963 7.02759 20.4149C7.14535 21.0174 7.51237 21.5274 8.02252 21.7974C8.40513 22 8.94052 22 10.0113 22L13.9887 22C15.0595 22 15.5949 22 15.9775 21.7974C16.4876 21.5274 16.8547 21.0174 16.9724 20.4149C17.0607 19.963 16.9309 19.3995 16.6712 18.2724C16.505 17.5511 16.4218 17.1904 16.2538 16.9099C16.0297 16.536 15.6969 16.254 15.3082 16.1089C15.0166 16 14.674 16 13.9887 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M18 12H18.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#434343"} fill={"none"}>
                    <path d="M3.5 13V12.1963C3.5 9.22888 3.5 7.7452 3.96894 6.56021C4.72281 4.65518 6.31714 3.15252 8.33836 2.44198C9.59563 2 11.1698 2 14.3182 2C16.1172 2 17.0168 2 17.7352 2.25256C18.8902 2.65858 19.8012 3.51725 20.232 4.60583C20.5 5.28297 20.5 6.13079 20.5 7.82643V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.5 12C3.5 10.1591 4.99238 8.66667 6.83333 8.66667C7.49912 8.66667 8.28404 8.78333 8.93137 8.60988C9.50652 8.45576 9.95576 8.00652 10.1099 7.43136C10.2833 6.78404 10.1667 5.99912 10.1667 5.33333C10.1667 3.49238 11.6591 2 13.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.1816 16H19.0701C18.626 16 18.4039 16 18.2287 16.0761C17.6401 16.3319 17.6402 16.9287 17.6403 17.4779V17.5221C17.6402 18.0713 17.6401 18.6681 18.2287 18.9239C18.4039 19 18.626 19 19.0701 19C19.5143 19 19.7364 19 19.9115 19.0761C20.5002 19.3319 20.5001 19.9287 20.5 20.4779V20.5221C20.5001 21.0713 20.5002 21.6681 19.9115 21.9239C19.7364 22 19.5143 22 19.0701 22H17.8596M3.5 16L5.5 19M5.5 19L7.5 22M5.5 19L7.5 16M5.5 19L3.5 22M14 22H13C12.0572 22 11.5858 22 11.2929 21.7071C11 21.4142 11 20.9428 11 20V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#434343"} fill={"none"}>
                    <path d="M3.5 13V12.1963C3.5 9.22892 3.5 7.74523 3.96894 6.56024C4.72281 4.65521 6.31714 3.15255 8.33836 2.44201C9.59563 2.00003 11.1698 2.00003 14.3182 2.00003C16.1173 2.00003 17.0168 2.00003 17.7352 2.25259C18.8902 2.65861 19.8012 3.51728 20.232 4.60587C20.5 5.283 20.5 6.13082 20.5 7.82646V12.0142V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.5 12C3.5 10.1591 4.99238 8.66667 6.83333 8.66667C7.49912 8.66667 8.28404 8.78333 8.93137 8.60988C9.50652 8.45576 9.95576 8.00652 10.1099 7.43136C10.2833 6.78404 10.1667 5.99912 10.1667 5.33333C10.1667 3.49238 11.6591 2 13.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.5 22V19M3.5 19V17.2C3.5 16.6343 3.5 16.3515 3.67574 16.1757C3.85147 16 4.13431 16 4.7 16H5.5C6.32843 16 7 16.6716 7 17.5C7 18.3284 6.32843 19 5.5 19H3.5ZM20.5 16H19C18.0572 16 17.5858 16 17.2929 16.2929C17 16.5858 17 17.0572 17 18V19M17 22V19M17 19H19.5M14 19C14 20.6569 12.6569 22 11 22C10.6262 22 10.4392 22 10.3 21.9196C9.96665 21.7272 10 21.3376 10 21V17C10 16.6624 9.96665 16.2728 10.3 16.0804C10.4392 16 10.6262 16 11 16C12.6569 16 14 17.3431 14 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="cusstatementschild2">
                <div className="chjklss1s51">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#434343"} fill={"none"}>
                    <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  This Month
                </div>
                <div className="chjklss1s51">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#434343"} fill={"none"}>
                    <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Filter by
                </div>
              </div>


              <div className="cusstatementschild3">
                after api integration
              </div>
            </div> */}
            <h3>No Record Found</h3>
          </>
        )}

        {activeSection === "notes" && (
          <div className="inidbx3cus3">
            <div className="cusnotes">
              <div className="cusnoteschild01">Notes</div>
              <div className="cusnoteschild02">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={28}
                  height={28}
                  color={"#434343"}
                  fill={"none"}
                >
                  <path
                    d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <textarea
                  placeholder="Write Note"
                  name=""
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="cusnoteschild03">
                <div className="csuchild03child01">
                  <button>Add Notes</button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={28}
                    height={28}
                    color={"#434343"}
                    fill={"none"}
                  >
                    <path
                      d="M3.5 8.23077V5.46154C3.5 3.54978 5.067 2 7 2C8.933 2 10.5 3.54978 10.5 5.46154L10.5 9.26923C10.5 10.2251 9.7165 11 8.75 11C7.7835 11 7 10.2251 7 9.26923L7 5.46154"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12.5 2H12.7727C16.0339 2 17.6645 2 18.7969 2.79784C19.1214 3.02643 19.4094 3.29752 19.6523 3.60289C20.5 4.66867 20.5 6.20336 20.5 9.27273V11.8182C20.5 14.7814 20.5 16.2629 20.0311 17.4462C19.2772 19.3486 17.6829 20.8491 15.6616 21.5586C14.4044 22 12.8302 22 9.68182 22C7.88275 22 6.98322 22 6.26478 21.7478C5.10979 21.3424 4.19875 20.4849 3.76796 19.3979C3.5 18.7217 3.5 17.8751 3.5 16.1818V12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.5 12C20.5 13.8409 19.0076 15.3333 17.1667 15.3333C16.5009 15.3333 15.716 15.2167 15.0686 15.3901C14.4935 15.5442 14.0442 15.9935 13.8901 16.5686C13.7167 17.216 13.8333 18.0009 13.8333 18.6667C13.8333 20.5076 12.3409 22 10.5 22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={28}
                    height={28}
                    color={"#434343"}
                    fill={"none"}
                  >
                    <path
                      d="M13.5 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7H13.5M10.5 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 12H15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={28}
                    height={28}
                    color={"#434343"}
                    fill={"none"}
                  >
                    <path
                      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16 22C15.3805 19.7749 13.9345 17.7821 11.8765 16.3342C9.65761 14.7729 6.87163 13.9466 4.01569 14.0027C3.67658 14.0019 3.33776 14.0127 3 14.0351"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 18C14.7015 16.6733 16.5345 15.9928 18.3862 16.0001C19.4362 15.999 20.4812 16.2216 21.5 16.6617"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    className="idofrelateiv4cs"
                    onClick={toggleEmojiPicker}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={28}
                    height={28}
                    color={"#434343"}
                    fill={"none"}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.00897 9L8 9M16 9L15.991 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div id="showcontofemoji" ref={emojiContainerRef}>
                  {showEmojiPicker && (
                    <Picker
                      theme={"light"}
                      data={data}
                      onEmojiSelect={addEmoji}
                    />
                  )}
                </div>
                <div className="csuchild03child02">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={28}
                    height={28}
                    color={"#434343"}
                    fill={"none"}
                  >
                    <path
                      d="M19.5 5.5L19.0982 12.0062M4.5 5.5L5.10461 15.5248C5.25945 18.0922 5.33688 19.3759 5.97868 20.299C6.296 20.7554 6.7048 21.1407 7.17905 21.4302C7.85035 21.84 8.68108 21.9631 10 22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 15L13 21.9995M20 22L13 15.0005"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="notesdisplayxs15x1">
              <div className="notsid14x1s1">All Notes(5)</div>
              <div className="notsid4x1s2">
                <div className="notsid4x1s1child">
                  <div className="notsidz1sid1">
                    <div className="notx15sx1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={40}
                        height={40}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="bradpittstarsxfactor">
                        <h2>Brad Pitt X New Customer</h2>
                        <span>
                          <p>23/12/2024</p>
                          <p>11.45AM</p>
                        </span>
                      </span>
                    </div>

                    <div className="notx15sx2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={28}
                        height={28}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="noteschildx25s">
                    Lorem ipsum dolor sit amet consectetur. Lacus duis mauris
                    eget arcu eget nulla.Lorem ipsum dolor sit amet consectetur.
                    Lacus duis mauris eget arcu eget nulla.
                  </div>
                </div>
                <div className="notsid4x1s1child">
                  <div className="notsidz1sid1">
                    <div className="notx15sx1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={40}
                        height={40}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="bradpittstarsxfactor">
                        <h2>Brad Pitt X New Customer</h2>
                        <span>
                          <p>23/12/2024</p>
                          <p>11.45AM</p>
                        </span>
                      </span>
                    </div>

                    <div className="notx15sx2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={28}
                        height={28}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="noteschildx25s">
                    Lorem ipsum dolor sit amet consectetur. Lacus duis mauris
                    eget arcu eget nulla.Lorem ipsum dolor sit amet consectetur.
                    Lacus duis mauris eget arcu eget nulla.
                  </div>
                </div>
                <div className="notsid4x1s1child">
                  <div className="notsidz1sid1">
                    <div className="notx15sx1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={40}
                        height={40}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="bradpittstarsxfactor">
                        <h2>Brad Pitt X New Customer</h2>
                        <span>
                          <p>23/12/2024</p>
                          <p>11.45AM</p>
                        </span>
                      </span>
                    </div>

                    <div className="notx15sx2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={28}
                        height={28}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="noteschildx25s">
                    Lorem ipsum dolor sit amet consectetur. Lacus duis mauris
                    eget arcu eget nulla.Lorem ipsum dolor sit amet consectetur.
                    Lacus duis mauris eget arcu eget nulla.
                  </div>
                </div>
                <div className="notsid4x1s1child">
                  <div className="notsidz1sid1">
                    <div className="notx15sx1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={40}
                        height={40}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="bradpittstarsxfactor">
                        <h2>Brad Pitt X New Customer</h2>
                        <span>
                          <p>23/12/2024</p>
                          <p>11.45AM</p>
                        </span>
                      </span>
                    </div>

                    <div className="notx15sx2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={28}
                        height={28}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="noteschildx25s">
                    Lorem ipsum dolor sit amet consectetur. Lacus duis mauris
                    eget arcu eget nulla.Lorem ipsum dolor sit amet consectetur.
                    Lacus duis mauris eget arcu eget nulla.
                  </div>
                </div>
                <div className="notsid4x1s1child">
                  <div className="notsidz1sid1">
                    <div className="notx15sx1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={40}
                        height={40}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="bradpittstarsxfactor">
                        <h2>Brad Pitt X New Customer</h2>
                        <span>
                          <p>23/12/2024</p>
                          <p>11.45AM</p>
                        </span>
                      </span>
                    </div>

                    <div className="notx15sx2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={28}
                        height={28}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="noteschildx25s">
                    Lorem ipsum dolor sit amet consectetur. Lacus duis mauris
                    eget arcu eget nulla.Lorem ipsum dolor sit amet consectetur.
                    Lacus duis mauris eget arcu eget nulla.
                  </div>
                </div>
                <div className="notsid4x1s1child">
                  <div className="notsidz1sid1">
                    <div className="notx15sx1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={40}
                        height={40}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="bradpittstarsxfactor">
                        <h2>Brad Pitt X New Customer</h2>
                        <span>
                          <p>23/12/2024</p>
                          <p>11.45AM</p>
                        </span>
                      </span>
                    </div>

                    <div className="notx15sx2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={28}
                        height={28}
                        color={"#434343"}
                        fill={"none"}
                      >
                        <path
                          d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="noteschildx25s">
                    Lorem ipsum dolor sit amet consectetur. Lacus duis mauris
                    eget arcu eget nulla.Lorem ipsum dolor sit amet consectetur.
                    Lacus duis mauris eget arcu eget nulla.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {activeSection === 'notes' && (
          <div className="inidbx3">
            <div className="headtablerowindx1">
              <div className="table-headerx12">
                <div className="table-cellx12 thisfidbxx1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                    <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>Date</div>
                <div className="table-cellx12 thisfidbxx2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                    <path d="M8.37574 3C8.16183 3.07993 7.95146 3.16712 7.74492 3.26126M20.7177 16.3011C20.8199 16.0799 20.9141 15.8542 21 15.6245M18.4988 19.3647C18.6705 19.2044 18.8365 19.0381 18.9963 18.866M15.2689 21.3723C15.463 21.2991 15.6541 21.22 15.8421 21.1351M12.156 21.9939C11.9251 22.0019 11.6926 22.0019 11.4616 21.9939M7.78731 21.1404C7.96811 21.2217 8.15183 21.2978 8.33825 21.3683M4.67255 18.9208C4.80924 19.0657 4.95029 19.2064 5.0955 19.3428M2.6327 15.6645C2.70758 15.8622 2.78867 16.0569 2.87572 16.2483M2.00497 12.5053C1.99848 12.2972 1.9985 12.0878 2.00497 11.8794M2.62545 8.73714C2.69901 8.54165 2.77864 8.34913 2.8641 8.1598M4.65602 5.47923C4.80068 5.32514 4.95025 5.17573 5.1045 5.03124" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5M13.5 12H16M12 10.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M22 12C22 6.47715 17.5228 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Time</div>
                <div className="table-cellx12 thisfidbxx3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  DETAILS</div>
              </div>
              <div className='table-rowx12'>
                <div className="table-cellx12 thisfidbxx1">12/03/2024</div>
                <div className="table-cellx12 thisfidbxx2">2.15 AM</div>
                <div className="table-cellx12 thisfidbxx3">created by- <b>Mr.Arman</b> </div>
              </div>
              <div className='table-rowx12'>
                <div className="table-cellx12 thisfidbxx1">12/03/2024</div>
                <div className="table-cellx12 thisfidbxx2">2.15 AM</div>
                <div className="table-cellx12 thisfidbxx3">created by- <b>Mr.Arman</b> </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default InsideCusDetails;
