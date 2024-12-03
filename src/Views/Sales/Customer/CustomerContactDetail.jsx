import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import NumericInput from "../../Helper/NumericInput";
import { ShowMasterData } from "../../Helper/HelperFunctions";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";

const CustomerContactDetail = ({
  setUserData,
  switchCusData,
  customerData,
  setContactTick,
  updateUserData,
}) => {
  const { isDuplicate, isEdit, user } = customerData;
  const salutation = ShowMasterData("4");

  const [contactPersons, setContactPersons] = useState([
    {
      salutation: "",
      first_name: "",
      last_name: "",
      mobile_no: "",
      work_phone: "",
      email: "",
      designation: "",
    },
  ]);

  useEffect(() => {
    if ((user?.id && isEdit) || (user?.id && isDuplicate)) {
      if (user?.contact_person?.length >= 1) {
        setContactPersons((prevContact) =>
          user?.contact_person?.map((row) => {
            const existingRow = prevContact?.find((r) => r?.id === row?.id);
            if (existingRow) {
              // Update the existing row with new values
              return {
                ...existingRow,
                first_name: row?.first_name,
                last_name: row?.last_name,
                email: row?.email,
                mobile_no: row?.mobile_no,
                salutation: row?.salutation,
                work_phone: row?.work_phone,
                designation: row?.designation,
                id: row?.id,
              };
            } else {
              // Add a new row if it doesn't exist
              return {
                first_name: row?.first_name,
                last_name: row?.last_name,
                email: row?.email,
                mobile_no: row?.mobile_no,
                salutation: row?.salutation,
                work_phone: row?.work_phone,
                designation: row?.designation,
                id: row?.id,
              };
            }
          })
        );
      }
    }
  }, [user?.contact_person]);

  useEffect(() => {
    updateUserData({
      contact_persons: contactPersons,
    });
  }, [contactPersons]);

  const handleChange = (fieldName, index, value) => {
    const updatedContactPersons = [...contactPersons];
    updatedContactPersons[index] = {
      ...updatedContactPersons[index],
      [fieldName]: value,
    };
    setContactPersons(updatedContactPersons);
    setUserData((prevUserData) => ({
      ...prevUserData,
      contact_persons: updatedContactPersons,
    }));
    updateUserData({ contact_persons: updatedContactPersons });
  };

  const addContactPerson = () => {
    setContactPersons((prevContactPersons) => [
      ...prevContactPersons,
      {
        salutation: "",
        first_name: "",
        last_name: "",
        mobile_no: "",
        work_phone: "",
        email: "",
        designation:""
      },
    ]);
  };

  //return true for set tick mark if all required fields are filled
  const setTickBasicDetails = () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(contactPersons[0]?.email);
    const isBasicDetailsFilled =
      contactPersons[0]?.first_name !== "" &&
      // contactPersons[0]?.last_name !== "" &&
      contactPersons[0]?.email !== "" &&
      isEmailValid;
    setContactTick(isBasicDetailsFilled);
    return isBasicDetailsFilled;
  };
  useEffect(() => {
    setTickBasicDetails();
  }, [contactPersons]);

  // Handle errors for country, city, and state fields
  // const handlePersonError = !(
  //   contactPersons[0]?.first_name 
  // );
  const isEmailValid = /\S+@\S+\.\S+/.test(contactPersons[0]?.email);
  const handleEmailError = contactPersons[0]?.email === "" || !isEmailValid;

  const deleteContactPerson = (index) => {
    const updatedContactPersons = contactPersons?.filter((_, i) => i !== index);
    setContactPersons(updatedContactPersons);
    setUserData((prevUserData) => ({
      ...prevUserData,
      contact_persons: updatedContactPersons,
    }));
    updateUserData({ contact_persons: updatedContactPersons });
  };

  return (
    <>
      {switchCusData === "Contact" ? (
        <div id="secondx2_customer">
          <div id="main_forms_desigin_cus">
            {contactPersons?.map((person, index) => (
              <div className="x1parenchild54" key={index}>
                <div className="iconheading">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"#525252"}
                    fill={"none"}
                  >
                    <rect
                      x="4"
                      y="2"
                      width="17.5"
                      height="20"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10.59 13.7408C9.96125 14.162 8.31261 15.0221 9.31674 16.0983C9.80725 16.624 10.3536 17 11.0404 17H14.9596C15.6464 17 16.1928 16.624 16.6833 16.0983C17.6874 15.0221 16.0388 14.162 15.41 13.7408C13.9355 12.7531 12.0645 12.7531 10.59 13.7408Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 9C15 10.1046 14.1046 11 13 11C11.8954 11 11 10.1046 11 9C11 7.89543 11.8954 7 13 7C14.1046 7 15 7.89543 15 9Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5 6L2.5 6M5 12L2.5 12M5 18H2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Contact Persons {index + 1}</p>
                  {index >= 1 && (
                    <AiOutlineDelete
                      onClick={() => deleteContactPerson(index)}
                      className="deletecust"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
                <div className="insidesectiony1">
                  <div id="fcx3s1parent">
                    <div className="form_commonblock">
                      <label>Salutation</label>
                      <span>
                        <CustomDropdown04
                          options={salutation}
                          value={person.salutation}
                          onChange={(e) =>
                            handleChange("salutation", index, e.target.value)
                          } e
                          name="salutation"
                          defaultOption="Select Salutation"
                          type="masters_salutation"
                          extracssclassforscjkls="extracssclassforscjklsContact"
                        />
                      </span>
                    </div>

                    <div className="form_commonblock">
                      <label className="">First Name</label>
                      <div id="inputx1">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            color={"#525252"}
                            fill={"none"}
                          >
                            <path
                              d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 9L11 9M8 13L11 13"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 22L22 22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <input
                             autoComplete='off'
                            value={person.first_name}
                            onChange={(e) =>
                              handleChange("first_name", index, e.target.value)
                            }
                            placeholder="First Name"
                            name="first_name"
                          />
                        </span>
                      </div>
                    </div>

                    <div className="form_commonblock">
                      <label className="">Last Name</label>
                      <div id="inputx1">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            color={"#525252"}
                            fill={"none"}
                          >
                            <path
                              d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 9L11 9M8 13L11 13"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 22L22 22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <input
                            autoComplete='off'
                            value={person.last_name}
                            onChange={(e) =>
                              handleChange("last_name", index, e.target.value)
                            }
                            placeholder="Last Name"
                            name="last_name"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* {handlePersonError && (
                    <p className="error-message">
                      {otherIcons.error_svg}
                      Please Fill Person Details.
                    </p>
                  )} */}

                  <div id="fcx3s1parent">
                    <div className="form_commonblock">
                      <label>Email</label>
                      <div id="inputx1">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            color={"#525252"}
                            fill={"none"}
                          >
                            <path
                              d="M7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 17H10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 13C19.5434 11.7725 15.9734 11 12 11C8.02658 11 4.45659 11.7725 2 13"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19 11.5L17.9425 4.71245C17.7268 3.3282 16.2232 2.57812 15.0093 3.24919L14.3943 3.58915C12.9019 4.41412 11.0981 4.41412 9.60574 3.58915L8.99074 3.24919C7.77676 2.57812 6.27318 3.3282 6.05751 4.71246L5 11.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <input
                          autoComplete='off'
                            type="email"
                            value={person.email}
                            onChange={(e) =>
                              handleChange("email", index, e.target.value)
                            }
                            placeholder="Email"
                            name="email"
                          />
                        </span>
                      </div>
                      {/* {handleEmailError && (
                        <p className="error-message">
                          {otherIcons.error_svg}
                          Please Fill Person Email.
                        </p>
                      )} */}
                    </div>

                    <div className="form_commonblock">
                      <label className="">Mobile Number</label>
                      <div id="inputx1">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            color={"#525252"}
                            fill={"none"}
                          >
                            <path
                              d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 9L11 9M8 13L11 13"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 22L22 22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <NumericInput
                            value={person.mobile_no}
                            onChange={(e) =>
                              handleChange("mobile_no", index, e.target.value)
                            }
                            placeholder="Enter Mobile Number"
                            name="mobile_no"
                          />
                        </span>
                      </div>
                    </div>

                    <div className="form_commonblock">
                      <label className="">Work Number</label>
                      <div id="inputx1">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            color={"#525252"}
                            fill={"none"}
                          >
                            <path
                              d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 9L11 9M8 13L11 13"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 22L22 22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <NumericInput
                            value={person.work_phone}
                            onChange={(e) =>
                              handleChange("work_phone", index, e.target.value)
                            }
                            placeholder="Enter Work Phone"
                            name="work_phone"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form_commonblock">
                  <label className="">Designation</label>
                  <div id="inputx1">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#525252"}
                        fill={"none"}
                      >
                        <path
                          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <input
                        autoComplete='off'
                        style={{ width: "100%" }}
                        type="text"
                        name=" designation"
                        value={person. designation}
                        onChange={(e) => handleChange("designation", index, e.target.value)}
                        placeholder="Enter Designation"
                      />
                    </span>
                  </div>
                </div>
                <div className="breakerci"></div>
              </div>


            ))}
          </div>



          <button onClick={addContactPerson} className="addcust" type="button">
            Add Contact Person
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M12 4V20M20 12H4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomerContactDetail;
