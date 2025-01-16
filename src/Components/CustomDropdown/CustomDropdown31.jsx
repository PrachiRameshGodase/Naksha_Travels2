import React, { forwardRef, useEffect } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { customersList } from "../../Redux/Actions/customerActions";
import DropDownHelper from "../../Views/Helper/DropDownHelper";
import {
  parseJSONofString,
  sendData,
} from "../../Views/Helper/HelperFunctions";
import { TableViewSkeletonDropdown } from "../SkeletonLoder/TableViewSkeleton";
import "./customdropdown.scss";
import { RxCross2 } from "react-icons/rx";

const CustomDropdown31 = forwardRef((props, ref) => {
  const {
    options,
    value,
    onChange,
    name,
    type,
    setcusData,
    cusData,
    defaultOption,
    style,
    sd154w78s877,
    disable,
  } = props;

  // Custom hook for managing dropdown functionality
  const {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    dropdownRef,
    inputRef,
    optionRefs,
    handleKeyDown,
    focusedOptionIndex,
  } = DropDownHelper(options, onChange, name, type, "", setcusData);

  const customList = useSelector((state) => state?.customerList);
  const itemPayloads = localStorage.getItem("customerPayload");

  const dispatch = useDispatch();

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  const handleSelect = (account) => {
    const selectedItems = [...value];
    const index = selectedItems?.findIndex((item) => item === account?.id);

    if (index === -1) {
      selectedItems.push(account?.id);
    } else {
      selectedItems.splice(index, 1);
    }

    onChange(selectedItems);
    setSearchTerm("");
  };

  const isSelected = (accountId) => value?.includes(accountId);

  useEffect(() => {
    const parsedPayload = parseJSONofString(itemPayloads);
    // Check if API call is necessary
    if (
      isOpen && // Ensure modal or component is open
      name === "guest_ids" &&
      (parsedPayload?.search || !customList?.data)
    ) {
      dispatch(customersList({ ...sendData }));
    }
    setSearchTerm("");
  }, []);



  const renderSelectedOptions = () => {
    // Ensure value is always an array
    const selectedValues = Array.isArray(value) ? value : [];

    return selectedValues.map(id => {
      const selectedCustomer = options?.find(account => account?.id == id);
      return (
        <div key={id} className={`selectedoption5465cds ${isOpen ? 'open' : ''}`}>
          {selectedCustomer?.display_name}
          <div className="remove-option" onClick={() => handleSelect(selectedCustomer)}><RxCross2 /></div>
        </div>
      );
    });
  };


  return (
    <div
      ref={combinedRef}
      tabIndex="0"
      className={`customdropdownx12s86 ${sd154w78s877}`}
      onKeyDown={handleKeyDown}
      style={style}
    >
      <div
        onClick={() => !disable && setIsOpen(!isOpen)}
        style={{
          cursor: disable ? "not-allowed" : "pointer",
          background: disable ? "#f0f0f0" : "",
        }}
        className={
          "dropdown-selected" + (value?.length > 0 ? " filledcolorIn" : "")
        }
      >
        {defaultOption}
        <svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2852 0.751994C11.2852 0.751994 7.60274 5.75195 6.28516 5.75195C4.96749 5.75195 1.28516 0.751953 1.28516 0.751953"
            stroke="#797979"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="dropdown-options">
          <RiSearch2Line id="newsvgsearchicox2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dropdown-search"
            autoFocus
            ref={inputRef}
            required
          />

          <div className="dropdownoptoscroll">
            {customList?.loading ? (
              <TableViewSkeletonDropdown />
            ) : (
              options?.map((option, index) => (
                <div
                  key={option.id}
                  ref={(el) => (optionRefs.current[index] = el)}
                  onClick={() => handleSelect(option)}
                  className={
                    "dropdown-option" +
                    (isSelected(option?.id) ? " selectedoption" : "") +
                    (index === focusedOptionIndex ? " focusedoption" : "")
                  }
                >

                  {option?.display_name || ""}
                </div>
              ))
            )}
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
          </div>
        </div>
      )}
      <div id='absoluteofvalselcc' style={{ flexDirection: "row" }}>
        {renderSelectedOptions()}
      </div>
    </div>
  );
});

export default CustomDropdown31;
