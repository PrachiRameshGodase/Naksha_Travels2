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
    service_name

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

  return (
    <div
      tabIndex="0"
      ref={combinedRef}
      className={`customdropdownx12s86 ${extracssclassforscjkls}`}
      onKeyDown={handleKeyDown}
      style={{ position: className ? "static" : "relative" }}
    >

      {
        service_name === "Hotel" ? (
          <>
            <div>
              <b>Hotel Name:</b> {itemData?.hotel_name || "-"}
            </div>
            <div>
              <b>Room:</b> {itemData?.room_no || "-"}
            </div>
            <div>
              <b>Meal:</b>{" "}
              <ShowMastersValue
                type="37"
                id={itemData?.meal_id || "-"}
              />
            </div>
          </>
        ) : itemData?.service_name === "Assist" ? (
          <>
            <div>
              <b>Airport:</b> {itemData?.airport_name || "-"}
            </div>
            <div>
              <b>Meeting Type:</b>{" "}
              {itemData?.meeting_type || "-"}
            </div>
            <div>
              <b>No Of Persons:</b>{" "}
              {itemData?.no_of_persons || "-"}
            </div>
          </>
        ) : itemData?.service_name === "Flight" ? (
          <>
            <div>
              <b>Airline Name:</b>{" "}
              {itemData?.airline_name || "-"}
            </div>
            <div>
              <b>Ticket No:</b> {itemData?.ticket_no || "-"}
            </div>
            <div>
              <b>PRN No:</b> {itemData?.prn_no || "-"}
            </div>
          </>
        ) : itemData?.service_name === "Visa" ? (
          <>
            <div>
              <b>Passport No:</b> {itemData?.passport_no || "-"}
            </div>
            <div>
              <b>Visa No:</b> {itemData?.visa_no || "-"}
            </div>
            <div>
              <b>Visa Type:</b>{" "}
              <ShowUserMastersValue
                type="40"
                id={itemData?.visa_type_id || "-"}
              />
            </div>
          </>
        ) :
          itemData?.service_name === "CarHire" ? (
            <>
              <div>
                <b>Vehicle Type:</b> <ShowUserMastersValue
                  type="41"
                  id={itemData?.vehicle_type_id || "-"}
                />
              </div>
              <div>
                <b>Pickup Location:</b> {itemData?.pickup_location || "-"}
              </div>
              <div>
                <b>Drop Location:</b>{" "}

                {itemData?.drop_location || "-"}

              </div>
            </>
          ) :

            itemData?.service_name === "Insurance" ? (
              <>
                <div>
                  <b>Company Name:</b>
                  {itemData?.company_name || "-"}

                </div>
                <div>
                  <b>Policy No:</b> {itemData?.policy_no || "-"}
                </div>
                <div>
                  <b>Insurance Plan:</b>{" "}

                  {itemData?.insurance_plan || "-"}

                </div>
              </>
            ) :

              <div
                onClick={() => setIsOpen(!isOpen)}
                className={"dropdown-select" + (value ? " filledcolorIn" : "")}
              // style={{ width: "314px", top: "110%" }}
              >
                <textarea
                  type="text"
                  placeholder="Type To Add Or Search..."
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
