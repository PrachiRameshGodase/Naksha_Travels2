import React, { forwardRef, useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { customersList } from "../../Redux/Actions/customerActions";
import DropDownHelper from "../../Views/Helper/DropDownHelper";
import { sendData } from "../../Views/Helper/HelperFunctions";
import { TableViewSkeletonDropdown } from "../SkeletonLoder/TableViewSkeleton";
import "./customdropdown.scss";
import { RxCross2 } from "react-icons/rx";
import { otherIcons } from "../../Views/Helper/SVGIcons/ItemsIcons/Icons";
import toast from "react-hot-toast";

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
  const [storeData, setStoredData] = useState([]);

  const dispatch = useDispatch();

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  const handleSelect = (account) => {
    // Copy the current value
    const selectedItems = [...value];

    // Find if the account.id is already in the list
    const index = selectedItems.findIndex((item) => item === account?.id);

    if (index === -1) {
      // Add account.id to selectedItems
      selectedItems.push(account?.id);

      // Add account to storeData
      setStoredData((prevStoreData) => [
        ...prevStoreData,
        { id: account?.id, display_name: account?.display_name },
      ]);
    } else {
      // Remove account.id from selectedItems
      selectedItems.splice(index, 1);

      // Remove account from storeData
      setStoredData((prevStoreData) =>
        prevStoreData.filter((item) => item.id !== account?.id)
      );
    }

    // Call onChange with updated selectedItems
    onChange(selectedItems);

    // Reset search term
    setSearchTerm("");
  };

  const isSelected = (accountId) => value?.includes(accountId);

  useEffect(() => {
    const parsedPayload = JSON?.parse(itemPayloads);
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
  console.log("storeData", storeData);
  return (
    <div
      ref={combinedRef}
      tabIndex="0"
      className={`customdropdownx12s86 ${sd154w78s877}`}
      onKeyDown={handleKeyDown}
      style={style}
    >
      <textarea
        onClick={() => !disable && setIsOpen(!isOpen)}
        style={{
          cursor: disable ? "not-allowed" : "pointer",
          background: disable ? "#f0f0f0" : "",
          width: "268px",
          resize: "none",
          border: "1px solid rgb(236 239 241)",
          borderRadius: "5px",
        }}
        className={
          "dropdown-selected" + (value?.length > 0 ? " filledcolorIn" : "")
        }
        title={storeData.map((val) => val.display_name).join(", ")}
        value={
          storeData.length > 0
            ? storeData.map((val) => val.display_name).join(", ")
            : defaultOption
        }
        readOnly
      />

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
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ border: "none" }}>
                      {" "}
                      {option?.display_name || ""}
                    </span>
                    {isSelected(option?.id) ? (
                      <span style={{ fontSize: "2px", marginRight: "20px" }}>
                        {otherIcons.cross_svg}
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
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
    </div>
  );
});

export default CustomDropdown31;
export const CustomDropdown031 = forwardRef((props, ref) => {
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
    formData,
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
  const [storeData, setStoredData] = useState([]);

  const dispatch = useDispatch();

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  const handleSelect = (account) => {
    // Copy the current value
    const selectedItems = [...value];

    // Find if the account.id is already in the list
    const index = selectedItems.findIndex((item) => item === account?.id);

    if (index === -1) {
      if (selectedItems.length >= formData.max_occupancy || formData?.no_of_persons) {
        toast.error(
          `You cannot select more than ${formData.max_occupancy || formData.no_of_persons} guests.`
        );
        return;
      } else {
        // Add account.id to selectedItems
        selectedItems.push(account?.id);

        // Add account to storeData
        setStoredData((prevStoreData) => [
          ...prevStoreData,
          { id: account?.id, display_name: account?.display_name },
        ]);
      }
    } else {
      // Remove account.id from selectedItems
      selectedItems.splice(index, 1);

      // Remove account from storeData
      setStoredData((prevStoreData) =>
        prevStoreData.filter((item) => item.id !== account?.id)
      );
    }

    // Call onChange with updated selectedItems
    onChange(selectedItems);

    // Reset search term
    setSearchTerm("");
  };

  const isSelected = (accountId) => value?.includes(accountId);

  useEffect(() => {
    const parsedPayload = JSON?.parse(itemPayloads);
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
  useEffect(() => {
    // Reset storeData when hotel_id changes
    setStoredData([]);
    onChange([]); 
  }, [formData.hotel_id]);
  return (
    <div
      ref={combinedRef}
      tabIndex="0"
      className={`customdropdownx12s86 ${sd154w78s877}`}
      onKeyDown={handleKeyDown}
      style={style}
    >
      <textarea
        onClick={() => !disable && setIsOpen(!isOpen)}
        style={{
          cursor: disable ? "not-allowed" : "pointer",
          background: disable ? "#f0f0f0" : "",
          width: "268px",
          resize: "none",
          border: "1px solid rgb(236 239 241)",
          borderRadius: "5px",
        }}
        className={
          "dropdown-selected" + (value?.length > 0 ? " filledcolorIn" : "")
        }
        title={storeData.map((val) => val.display_name).join(", ")}
        value={
          storeData.length > 0
            ? storeData.map((val) => val.display_name).join(", ")
            : defaultOption
        }
        readOnly
      />

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
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ border: "none" }}>
                      {" "}
                      {option?.display_name || ""}
                    </span>
                    {isSelected(option?.id) ? (
                      <span style={{ fontSize: "2px", marginRight: "20px" }}>
                        {otherIcons.cross_svg}
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
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
    </div>
  );
});
