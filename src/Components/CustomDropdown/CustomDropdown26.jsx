import React, { forwardRef, useEffect, useRef } from "react";
import { GoPlus } from "react-icons/go";
import DropDownHelper from "../../Views/Helper/DropDownHelper";
import { useSelector } from "react-redux";
import { TableViewSkeletonDropdown } from "../SkeletonLoder/TableViewSkeleton";

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

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  // Handle outside click to close dropdown and set input value
  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
  //       setIsOpen(false); // Close the dropdown
  //       if (searchTerm && searchTerm.trim()) {
  //         setItemData((prev) => ({ ...prev, item_name: searchTerm })); // Set typed value
  //       }
  //     }
  //   };

  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => document.removeEventListener("mousedown", handleOutsideClick);
  // }, [searchTerm, setIsOpen, setItemData]);

  // Filter options based on the search term
  // const filteredOptions = options.filter((option) =>
  //   option?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  // );

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
        className={"dropdown-selected customdropdownx12s86" + (value ? " filledcolorIn" : "")}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value); // Update the search term
            onChange({
              target: { name: "item_name", value: e.target.value },
            }); 
          }}
          // onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
          className="dropdown-search customdropdownx12s86"
          autoFocus
          ref={inputRef}
        />
      </div>
      {isOpen && (
        <div className={`dropdown-options`} id={className}>
          {itemList?.loading || categoryLists?.loading ? (
            <TableViewSkeletonDropdown />
          ) : (
            <>
              <div className="dropdownoptoscroll">
                {options?.map((option, index) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      handleSelect(option);
                      setSearchTerm(option.name); // Update input box with selected option
                      onChange({
                        target: { name: "item_id", value: option.id, option },
                      }); 
                    }}
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
