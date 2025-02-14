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
  const customerGender = ShowMasterData("45");
  const memberRealtion = ShowMasterData("46");

  const [contactPersons, setContactPersons] = useState([
    {
      salutation: "",
      first_name: "",
      last_name: "",
      mobile_no: "",
      work_phone: "",
      email: "",
      designation: "",
      gender: "",
      relationship: "",
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
                gender: row?.gender,
                relationship: row?.relationship,
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
                gender: row?.gender,
                relationship: row?.relationship,
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
    const genderName = customerGender?.find((val) => val?.labelid == value);
    const relationName = memberRealtion?.find((val) => val?.labelid == value);

    updatedContactPersons[index] = {
      ...updatedContactPersons[index],
      ...(fieldName === "gender" && {
        gender: genderName?.label,
      }),
      ...(fieldName === "relationship" && {
        relationship: relationName?.label,
      }),
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
        gender: "",
        designation: "",
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
                  {otherIcons.title_svg}
                  <p>Contact Person {index + 1}</p>
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
                          }
                          e
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
                          {otherIcons.name_svg}
                          <input
                            autoComplete="off"
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
                          {otherIcons.name_svg}

                          <input
                            autoComplete="off"
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
                          {otherIcons.email_svg}
                          <input
                            autoComplete="off"
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
                          {otherIcons.mobile_no}
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
                    {/* <div className="form_commonblock">
                      <label>Gender</label>
                      <span>
                        {otherIcons.vendor_svg}
                        <CustomDropdown04
                          label="Gender Name"
                          options={customerGender}
                          value={person?.gender}
                          onChange={(e) =>
                            handleChange("gender", index, e.target.value)
                          }
                          name="gender"
                          defaultOption="Select Gender"
                          type="masters"
                        />
                      </span>
                    </div> */}
                  </div>
                  <div id="fcx3s1parent">
                    {" "}

                    {/* <div className="form_commonblock">
                      <label>Relationship</label>
                      <span>
                        {otherIcons.vendor_svg}
                        <CustomDropdown04
                          label="Relationship Name"
                          options={memberRealtion}
                          value={person?.relationship}
                          onChange={(e) =>
                            handleChange("relationship", index, e.target.value)
                          }
                          name="relationship"
                          defaultOption="Select Relationship"
                          type="masters"
                        />
                      </span>
                    </div> */}

                  </div>
                </div>

                <div className="breakerci"></div>
              </div>
            ))}
          </div>

          <button onClick={addContactPerson} className="addcust" type="button">
            Add New Contact
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
