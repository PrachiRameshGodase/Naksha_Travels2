import React, { useEffect, useRef, useState } from "react";
import CustomDropdown10 from "../../../Components/CustomDropdown/CustomDropdown10";
import { useDispatch, useSelector } from "react-redux";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { customersList } from "../../../Redux/Actions/customerActions";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";
import { ShowMasterData } from "../../Helper/HelperFunctions";
import ShowMastersValue from "../../Helper/ShowMastersValue";
import CustomDropdown27 from "../../../Components/CustomDropdown/CustomDropdown27";
import { SingleImageUploadDocument } from "../../Helper/ComponentHelper/ImageUpload";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";

const EmployeeDetails = ({
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

    setEmployeeDetails(updatedEmployeeDetails);
  };

  // Add a new customer to the table
  const addCustomer = (employee_id) => {
    const selectedCustomer = cusList?.data?.user.find(
      (user) => user?.id === employee_id
    );

    if (!selectedCustomer) return;

    // Check if the customer already exists in the table
    const exists = employeeDetails.some(
      (member) => member.employee_id === selectedCustomer.id
    );

    if (!exists) {
      setEmployeeDetails((prev) => [
        ...prev,
        {
          employee_id: selectedCustomer.id,

          food_type: "",
        },
      ]);
    }
  };

  // Update userData when employeeDetails change
  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      employees: employeeDetails.map((detail) => ({
        ...detail,
      })),
    }));
  }, [employeeDetails, setUserData]);

  // Fetch customer list
  const fetchCustomers = () => {
    const sendData = { customer_type: "Individual",status:1, active:1 };
    dispatch(customersList(sendData));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  // Function to delete a selected member
  const handleDeleteSelectedMember = (indexToDelete) => {
    setEmployeeDetails((prevDetails) =>
      prevDetails.filter((_, index) => index !== indexToDelete)
    );
  };

  
  useEffect(() => {
    if (customerDetails?.employees && isEdit) {
      const employeeDetails = customerDetails?.employees || [];
      const employeeDetail = employeeDetails?.map((item) => ({
        employee_id: item.id || "",
        food_type: item.food_type || "",
      }));

      setEmployeeDetails(employeeDetail); // Update state with the transformed array

      setTick((prevTick) => ({
        ...prevTick,
        employeeTick: true,
      }));
    }
  }, [customerDetails?.employees, isEdit, setTick]);

  useEffect(() => {
    if (isEdit) {
      updateUserData((prevData) => ({
        ...prevData,
        employees: employeeDetails?.map((detail) => ({
          ...detail,
        })),
      })); // Only call updateUserData when editing
    }
  }, [employeeDetails]);
  // Render the member table
  const renderMemberTable = () => {
    return (
      <table className="employee-table" style={{width:"90%"}}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Member Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Gender</th>

            <th style={{ minWidth: "100px" }}>Food Type</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeDetails?.length >= 1 ? (
            employeeDetails?.map((member, index) => {
              const selectedMember = cusList?.data?.user.find(
                (user) => user.id === member.employee_id
              );

              return (
                selectedMember && (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{selectedMember.display_name}</td>
                    <td>{selectedMember.email}</td>
                    <td>{selectedMember.mobile_no}</td>
                    <td>
                      <ShowMastersValue type="45" id={selectedMember.gender} />
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
       
      {switchCusData === "Employee Details" && (
        <>
          <div id="secondx2_customer">
            <div id="main_forms_desigin_cus">
              <div id="imgurlanddesc" className="calctotalsectionx2">
                <div className="form_commonblock">
                  <label>
                    Employee Name <b className="color_red">*</b>
                  </label>
                  <div id="sepcifixspanflex">
                    <span>
                      {otherIcons.name_svg}
                      <CustomDropdown10
                        autoComplete="off"
                        ref={dropdownRef1}
                        label="Employee Name"
                        options={cusList?.data?.user}
                        value="" // Reset value after selection
                        onChange={(e) => addCustomer(e.target.value)}
                        name="employee_id"
                        defaultOption="Select Employee"
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

export default EmployeeDetails;
