import React, { forwardRef, useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import DropDownHelper from "../../Views/Helper/DropDownHelper";
import { useSelector } from "react-redux";
import { TableViewSkeletonDropdown } from "../SkeletonLoder/TableViewSkeleton";
import { } from "../../Views/Helper/HelperFunctions";
import ShowMastersValue, { ShowUserMastersValue } from "../../Views/Helper/ShowMastersValue";
// import { ShowUserMastersValue } from "../ShowMastersValue";


const CustomDropdown26 = forwardRef((props, ref) => {

  const {
    options,
    value,
    setShowPopup,
    onChange,
    name,
    type,
    setItemData,
    defaultOption,
    extracssclassforscjkls,
    className,
    itemData,
    service_data
  } = props;

  const nextFocusRef = useRef(null);

  const {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    dropdownRef,
    inputRef,
    optionRefs,
    handleKeyDown,
    handleSelect,
    focusedOptionIndex,
  } = DropDownHelper(options, onChange, name, type, setItemData, nextFocusRef);



  const itemList = useSelector((state) => state?.itemList);
  const categoryLists = useSelector((state) => state?.categoryList);
  const [isValueSelected, setIsValueSelected] = useState(false);

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  // Handle change in search input
  const handleInputChange = (e) => {
    if (!isValueSelected) {
      setSearchTerm(e.target.value);
      onChange({
        target: { name: "item_name", value: e.target.value },
      });
    }
  };

  // Handle selecting an option from the dropdown
  const handleOptionSelect = (option) => {
    handleSelect(option);
    setSearchTerm(option.name);
    setIsValueSelected(false); // Mark as value selected

    onChange({
      target: { name: "item_id", value: option.id, option },
    });
  };

  const handleInputBlur = () => {
    // Check if the entered value is in the itemList, if not, allow it to be edited
    if (options && !options.some((option) => option.name === searchTerm)) {
      setIsValueSelected(false);
    }
  };


  useEffect(() => {
    if (itemData?.item_name) {
      setSearchTerm(itemData.item_name);
    } else {
      setSearchTerm("");
    }
  }, [itemData?.item_name]);


  // console.log("service_data in dropdown", service_data)

  return (
    <div
      // tabIndex="0"
      ref={combinedRef}
      className={`customdropdownx12s86 ${extracssclassforscjkls}`}
      onKeyDown={handleKeyDown}
      style={{ position: className ? "static" : "relative" }}
    >
      <>
        {
          service_data?.service_name === "Hotels" ? (
            <>
              <div>
                <b>Service Name:</b> {service_data?.service_name || "-"}
              </div>
              <div>
                <b>Hotel Name:</b> {service_data?.hotel_name || "-"}
              </div>
              <div>
                <b>Room:</b> {service_data?.room_no || "-"}
              </div>
              <div>
                <b>Meal:</b>{" "}
                <ShowMastersValue
                  type="37"
                  id={service_data?.meal_id || "-"}
                />
              </div>
            </>
          ) : service_data?.service_name === "Assist" ? (
            <>
              <div>
                <b>Service Name:</b> {service_data?.service_name || "-"}
              </div>
              <div>
                <b>Airport:</b> {service_data?.airport_name || "-"}
              </div>
              <div>
                <b>Meeting Type:</b>{" "}
                {service_data?.meeting_type || "-"}
              </div>
              <div>
                <b>No Of Persons:</b>{" "}
                {service_data?.no_of_persons || "-"}
              </div>
            </>
          ) : service_data?.service_name === "Flights" ? (
            <>
              <div>
                <b>Service Name:</b> {service_data?.service_name || "-"}
              </div>
              <div>
                <b>Airline Name:</b>{" "}
                {service_data?.airline_name || "-"}
              </div>
              <div>
                <b>Ticket No:</b> {service_data?.ticket_no || "-"}
              </div>
              <div>
                <b>PRN No:</b> {service_data?.prn_no || "-"}
              </div>
            </>
          ) : service_data?.service_name === "Visa" ? (
            <>
              <div>
                <b>Service Name:</b> {service_data?.service_name || "-"}
              </div>
              <div>
                <b>Passport No:</b> {service_data?.passport_no || "-"}
              </div>
              <div>
                <b>Visa No:</b> {service_data?.visa_no || "-"}
              </div>
              <div>
                <b>Visa Type:</b>{" "}
                <ShowUserMastersValue
                  type="40"
                  id={service_data?.visa_type_id || "-"}
                />
              </div>
            </>
          ) :
            service_data?.service_name === "Car Hire" ? (
              <>
                <div>
                  <b>Service Name:</b> {service_data?.service_name || "-"}
                </div>
                <div>
                  <b>Vehicle Type:</b> <ShowUserMastersValue
                    type="41"
                    id={service_data?.vehicle_type_id || "-"}
                  />
                </div>
                <div>
                  <b>Pickup Location:</b> {service_data?.pickup_location || "-"}
                </div>
                <div>
                  <b>Drop Location:</b>{" "}

                  {service_data?.drop_location || "-"}

                </div>
              </>
            ) :

              service_data?.service_name === "Insurance" ? (
                <>
                  <div>
                    <b>Service Name:</b> {service_data?.service_name || "-"}
                  </div>
                  <div>
                    <b>Company Name:</b>
                    {service_data?.company_name || "-"}

                  </div>
                  <div>
                    <b>Policy No:</b> {service_data?.policy_no || "-"}
                  </div>
                  <div>
                    <b>Insurance Plan:</b>{" "}

                    {service_data?.insurance_plan || "-"}

                  </div>
                </>
              ) :

                service_data?.service_name === "Others" ? (
                  <>
                   
                    <div>
                      <b>Service Name:</b> {service_data?.service_name || "-"}
                    </div>

                    <div>
                      <b>Item Name:</b>
                      {service_data?.item_name || "-"}
                    </div>

                    <div>
                      <b>Supplier Name:</b>{" "}

                      {service_data?.supplier_name || "-"}

                    </div>
                  </>
                )
                  :
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={"dropdown-select" + (value ? " filledcolorIn" : "")}
                  >
                    <textarea
                      type="text"
                      placeholder="Type or Select the Item"
                      value={searchTerm || itemData?.item_name}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      style={{
                        width: "100%",
                        border: "none",
                        resize: "none",
                      }}
                      className="dropdown-search customdropdownx12s86 custom-scrollbar"
                      autoFocus
                      ref={inputRef}
                    />
                  </div>
        }

      </>
      {isOpen && (<div
        className={`dropdown-options`}
        id={className}
        style={{ width: "101%", zIndex: "999" }}

      >
        {itemList?.loading || categoryLists?.loading ? (
          <TableViewSkeletonDropdown />
        ) : (
          <>
            <div className="dropdownoptoscroll">
              {options?.map((option, index) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  ref={(el) => (optionRefs.current[index] = el)}
                  className={
                    "dropdown-option" +
                    (option.id == value ? " selectedoption" : "") +
                    (index === focusedOptionIndex ? " focusedoption" : "") +
                    (option.active == 0 ? " inactive-category" : "")
                  }
                  {...(option.active == 0
                    ? {
                      "data-tooltip-content":
                        "To select this option, activate it; it's currently inactive.",
                      "data-tooltip-id": "my-tooltip",
                      "data-tooltip-place": "right",
                    }
                    : {})}
                >
                  {option?.name}
                  {option?.category?.name ? ` / ${option.category.name}` : ""}
                  {option?.sub_category?.name
                    ? ` / ${option.sub_category.name}`
                    : ""}
                </div>
              ))}
            </div>

            {options?.length === 0 && (
              <>
                <div className="notdatafound02">
                  <iframe
                    src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json"
                    frameBorder="0"
                  ></iframe>
                </div>
                <div className="dropdown-option centeraligntext">
                  No options found
                </div>
              </>
            )}
          </>
        )}

        <div className="lastbuttonsecofdropdown">
          <p style={{ cursor: "pointer" }} onClick={() => setShowPopup(true)}>
            Add Item
            <GoPlus />
          </p>
        </div>
      </div>
      )}
    </div>
  );
});

export default CustomDropdown26;
