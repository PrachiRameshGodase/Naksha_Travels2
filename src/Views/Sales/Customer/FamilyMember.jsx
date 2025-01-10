import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown10 from "../../../Components/CustomDropdown/CustomDropdown10";
import CustomDropdown27 from "../../../Components/CustomDropdown/CustomDropdown27";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { customersList } from "../../../Redux/Actions/customerActions";
import  { SingleImageUploadDocument } from "../../Helper/ComponentHelper/ImageUpload";
import { ShowMasterData } from "../../Helper/HelperFunctions";
import ShowMastersValue from "../../Helper/ShowMastersValue";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";

const FamilyMember = ({
  switchCusData,
  customerData,
  userData,
  setUserData,
  updateUserData,
  setTick,
  tick,
}) => {
  const { isDuplicate, isEdit, user, customerDetails } = customerData;
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);
  const cusList = useSelector((state) => state?.customerList);
  const relationshipOptions = ShowMasterData("46");
  const foodTypeOptions = ShowMasterData("47");

  const [cusData, setcusData] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  // Handle changes to fields
  const handleChange = (fieldName, index, value) => {
    const updatedEmployeeDetails = [...employeeDetails];
    const foodTypeName = foodTypeOptions?.find(
      (val) => val?.labelid === value
    )?.label;
    const relationName = relationshipOptions?.find(
      (val) => val?.labelid === value
    )?.label;

    // Update specific fields
    updatedEmployeeDetails[index] = {
      ...updatedEmployeeDetails[index],
      ...(fieldName === "food_type" && { food_type: foodTypeName }),
      ...(fieldName === "relationship" && { relationship: relationName }),
      [fieldName]: value,
    };
    if (fieldName === "photo" && value) {
      updatedEmployeeDetails[index].photo = JSON.stringify(value);
    }
    setEmployeeDetails(updatedEmployeeDetails);
  };

  // Add a new customer to the table
  const addCustomer = (member_id) => {
    const selectedCustomer = cusList?.data?.user.find(
      (user) => user?.id === member_id
    );

    if (!selectedCustomer) return;

    // Check if the customer already exists in the table
    const exists = employeeDetails.some(
      (member) => member.member_id === selectedCustomer.id
    );

    if (!exists) {
      setEmployeeDetails((prev) => [
        ...prev,
        {
          member_id: selectedCustomer.id,
          relationship: "",
          food_type: "",
          photo: "",
        },
      ]);
    }
  };

  // Update userData when employeeDetails change
  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      family_members: employeeDetails?.map((detail) => ({
        ...detail,
        photo: detail.photo ? JSON.stringify(detail.photo) : "",
      })),
    }));
  }, [employeeDetails, setUserData]);

  const fetchCustomers = () => {
    const sendData = { customer_type: "Individual" };
    dispatch(customersList(sendData));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDeleteSelectedMember = (indexToDelete) => {
    setEmployeeDetails((prevDetails) =>
      prevDetails.filter((_, index) => index !== indexToDelete)
    );
  };

  useEffect(() => {
    if (customerDetails?.family_members && isEdit) {
      const familyDetails = customerDetails?.family_members || [];
      const familyDetail = familyDetails?.map((item) => ({
        member_id: item.id || "",
        food_type: item.food_type || "",
        relationship: item.relationship || null,
        photo: item?.photo ? JSON.parse(item?.photo) : "",
      }));

      setEmployeeDetails(familyDetail);

      setTick((prevTick) => ({
        ...prevTick,
        familyMemberTick: true,
      }));
    }
  }, [customerDetails?.family_members, isEdit, setTick]);

  useEffect(() => {
    if (isEdit) {
      updateUserData((prevData) => ({
        ...prevData,
        family_members: employeeDetails?.map((detail) => ({
          ...detail,
          photo: detail?.photo ? JSON.stringify(detail.photo) : "",
        })),
      }));
    }
  }, [employeeDetails]);
console.log('employeeDetails', employeeDetails)
  const renderMemberTable = () => {
    return (
      <table className="employee-table" style={{width:"91%"}}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Member Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Gender</th>
            <th style={{ minWidth: "100px" }}>Relationship</th>
            <th style={{ minWidth: "100px" }}>Food Type</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeDetails?.length > 0 ? (
            employeeDetails?.map((member, index) => {
              const selectedMember = cusList?.data?.user.find(
                (user) => user.id === member.member_id
              );
              const disabledRow = member?.member_id === customerDetails?.user?.relation_id;

              return (
                selectedMember && (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: disabledRow ? "#f2f2f2" : "#fff",
                      pointerEvents: disabledRow ? "none" : "auto",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{selectedMember.display_name}</td>
                    <td>{selectedMember.email}</td>
                    <td>{selectedMember.mobile_no}</td>
                    <td>
                      <ShowMastersValue type="45" id={selectedMember.gender} />
                    </td>
                    <td style={{ width: "40px" }}>
                      <CustomDropdown27
                        label="Relationship"
                        options={relationshipOptions}
                        value={member.relationship}
                        onChange={(e) =>
                          handleChange("relationship", index, e.target.value)
                        }
                        name="relationship"
                        defaultOption="Select Relationship"
                        type="masters"
                      />
                    </td>
                    <td style={{ width: "40px" }}>
                      <CustomDropdown27
                        label="Food Type"
                        options={foodTypeOptions}
                        value={member.food_type}
                        onChange={(e) =>
                          handleChange("food_type", index, e.target.value)
                        }
                        name="food_type"
                        defaultOption="Select Food Type"
                        type="masters"
                      />
                    </td>
                    <td style={{ width: "20px" }}>
                      <SingleImageUploadDocument
                        formData={member}
                        setFormData={setEmployeeDetails}
                        setFreezLoadingImg={setFreezLoadingImg}
                        imgLoader={imgLoader}
                        setImgeLoader={setImgeLoader}
                        index={index}
                      />
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          handleDeleteSelectedMember(index);
                        }}
                      >
                        {otherIcons.delete_svg}
                      </span>
                    </td>
                  </tr>
                )
              );
            })
          ) : (
            <tr>
              <td colSpan="9">
                <NoDataFound />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {freezLoadingImg && <MainScreenFreezeLoader />}
      {switchCusData === "Contact" && (
        <>
          <div id="secondx2_customer">
            <div id="main_forms_desigin_cus">
              <div id="imgurlanddesc" className="calctotalsectionx2">
                <div className="form_commonblock">
                  <label>
                    Member Name <b className="color_red">*</b>
                  </label>
                  <div id="sepcifixspanflex">
                    <span>
                      {otherIcons.name_svg}
                      <CustomDropdown10
                        autoComplete="off"
                        ref={dropdownRef1}
                        label="Customer Name"
                        options={cusList?.data?.user}
                        value="" // Reset value after selection
                        onChange={(e) => addCustomer(e.target.value)}
                        name="member_id"
                        defaultOption="Select Member"
                        setcusData={setcusData}
                        cusData={cusData}
                        type="vendor"
                        required
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {renderMemberTable()}
          </div>
        </>
      )}
    </div>
  );
};

export default FamilyMember;
