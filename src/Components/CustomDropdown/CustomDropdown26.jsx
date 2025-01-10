import React, { forwardRef, useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import DropDownHelper from "../../Views/Helper/DropDownHelper";
import { useSelector } from "react-redux";
import { TableViewSkeletonDropdown } from "../SkeletonLoder/TableViewSkeleton";
import { itemLists } from "../../Redux/Actions/listApisActions";
import { parseJSONofString } from "../../Views/Helper/HelperFunctions";

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
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={"dropdown-selected " + (value ? " filledcolorIn" : "")}
        style={{ width: "314px", top: "110%" }}
      >
        <textarea
          type="text"
          placeholder="Type To Add Or Search..."
          value={searchTerm || itemData?.item_name}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          style={{
            minWidth: "321px",
            height: "30px",
            margin: "10px -13px",
            height: "60px",
            border: "1px solid #ebdada",
            resize: "none",
          }}
          className="dropdown-search customdropdownx12s86 custom-scrollbar"
          autoFocus
          ref={inputRef}
        />
      </div>

      {isOpen && (
        <div
          className={`dropdown-options`}
          id={className}
          style={{ width: "101%" }}
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
