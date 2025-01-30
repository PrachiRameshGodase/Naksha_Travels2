import React, { useState, useRef, forwardRef, useEffect, useMemo } from "react";
import "./customdropdown.scss";
import DropDownHelper from "../../Views/Helper/DropDownHelper";
import { RiSearch2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { TableViewSkeletonDropdown } from "../SkeletonLoder/TableViewSkeleton";
import { customersList } from "../../Redux/Actions/customerActions";
import { sendData } from "../../Views/Helper/HelperFunctions";
import { hotelListAction } from "../../Redux/Actions/hotelActions";
import useFetchApiData from "../../Views/Helper/ComponentHelper/useFetchApiData";
import { visaListAction } from "../../Redux/Actions/visaAction";

const CustomDropdown29 = forwardRef((props, ref) => {
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
  } = props;
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
  } = DropDownHelper(options, onChange, name, type, "", setcusData);

  const hotelList = useSelector((state) => state?.hotelList);
  const hotelPayloads = localStorage.getItem("hotelPayload");

  const dispatch = useDispatch();

  // Merge refs to handle both internal and external refs
  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  const fullName = options?.find((account) => account?.id == value);

  //prevent for again and again loding api when we are open dropdown
  useEffect(() => {
    const parshPayload = JSON?.parse(hotelPayloads);
    if (parshPayload?.search) {
      dispatch(
        hotelListAction({
          ...sendData,
        })
      );
    }
    setSearchTerm("");
  }, [isOpen]);

  // call item api on page load...
  const payloadGenerator = useMemo(
    () => () => ({
      //useMemo because  we ensure that this function only changes when [dependency] changes
      ...sendData,
    }),
    []
  );
  useFetchApiData(hotelListAction, payloadGenerator, []); //call api common function

  return (
    <div
      ref={combinedRef}
      tabIndex="0"
      className={`customdropdownx12s86 ${sd154w78s877}`}
      onKeyDown={handleKeyDown}
      style={style}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={"dropdown-selected" + (value ? " filledcolorIn" : "")}
      >
        {cusData
          ? cusData?.hotel_name
          : value
            ? fullName?.hotel_name
            : defaultOption}

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
            {hotelList?.loading ? (
              <>
                <TableViewSkeletonDropdown />
              </>
            ) : (
              <>
                {options?.map((option, index) => (
                  <div
                    key={option.id}
                    ref={(el) => (optionRefs.current[index] = el)}
                    onClick={() => handleSelect(option)}
                    className={
                      "dropdown-option" +
                      (option.id == value ? " selectedoption" : "") +
                      (index === focusedOptionIndex ? " focusedoption" : "")
                    }
                  >
                    {` ${option?.hotel_name || ""} `}
                  </div>
                ))}
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
          </div>
        </div>
      )}
    </div>
  );
});

export default CustomDropdown29;

export const CustomDropdown029 = forwardRef((props, ref) => {
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
  } = props;
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
  } = DropDownHelper(options, onChange, name, type, "", setcusData);

  const visaListData = useSelector((state) => state?.visaList);
  const hotelPayloads = localStorage.getItem("hotelPayload");

  const dispatch = useDispatch();

  // Merge refs to handle both internal and external refs
  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  const fullName = options?.find((account) => account?.country_name == value);

  //prevent for again and again loding api when we are open dropdown
  useEffect(() => {
    if (isOpen) {

      if (type === "countryList") {
        dispatch(visaListAction({ ...sendData }));
      }
      // else
      // if (type === "visa_entry_type") {
      //   const sendData2={country_name:cusData?.country_name}
      //   dispatch(visaListAction({sendData2, ...sendData }));
      // } 
      // else if(type === "visa_type_id") {
      //   const sendData2={country_name:cusData?.country_name, visa_entry_type:cusData?.visa_entry_type}
      //   dispatch(visaListAction({sendData2, ...sendData }));
      // }
    }
    // setSearchTerm("");
  }, [isOpen]);

  // call item api on page load...
  const payloadGenerator = useMemo(
    () => () => ({
      //useMemo because  we ensure that this function only changes when [dependency] changes
      ...sendData,
    }),
    []
  );

  // useFetchApiData(visaListAction, payloadGenerator, []);//call api common function
  const uniqueOptions = options?.reduce((acc, option) => {
    const key =
      type === "visa_entry_type"
        ? option?.visa_entry_name
        : type === "countryList"
          ? option?.country_name
          : type === "visa_type_id"
            ? option?.visa_type_id
            : type === "days" ? option?.days
              : "";

    if (
      key &&
      !acc.some(
        (item) =>
          (type === "visa_entry_type"
            ? item?.visa_entry_name
            : type === "countryList"
              ? item?.country_name
              : item?.visa_type_name) === key
      )
    ) {
      acc.push(option);
    }
    return acc;
  }, []);
  // console.log("options", options)
  return (
    <div
      ref={combinedRef}
      tabIndex="0"
      className={`customdropdownx12s86 ${sd154w78s877}`}
      onKeyDown={handleKeyDown}
      style={style}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={"dropdown-selected" + (value ? " filledcolorIn" : "")}
      >
        {type === "countryList"
          ? cusData
            ? cusData?.country_name
            : defaultOption
          : type === "visa_entry_type"
            ? cusData
              ? cusData?.visa_entry_name
              : defaultOption
            : type === "visa_type_id"
              ?
              cusData
                ? cusData?.visa_type_name
                : defaultOption
              : type === "days"
                ? cusData
                  ? cusData?.days
                  : defaultOption
                :
                ""}

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
            {visaListData?.loading ? (
              <>
                <TableViewSkeletonDropdown />
              </>
            ) : (
              <>
                {uniqueOptions?.map((option, index) => (
                  <div
                    key={option.id}
                    ref={(el) => (optionRefs.current[index] = el)}
                    onClick={() => handleSelect(option)}
                    className={
                      "dropdown-option" +
                      (type === "visa_entry_type" &&
                        option.visa_entry_type == value
                        ? " selectedoption"
                        : "") +
                      (type === "countryList" && option.country_name == value
                        ? " selectedoption"
                        : "") +
                      (type === "visa_type_id" && option.visa_type_name == value
                        ? " selectedoption"
                        : "") +
                      (type === "days" && option.days == value
                        ? " selectedoption"
                        : "") +
                      (index === focusedOptionIndex ? " focusedoption" : "")
                    }
                  >
                    {type === "countryList"
                      ? `${option?.country_name || ""}`
                      : type === "visa_entry_type"
                        ? `${option?.visa_entry_name || ""}`
                        : type === "visa_type_id"
                          ? `${option?.visa_type_name || ""}`
                          :
                          type === "days"
                            ? `${option?.days || ""}`
                            : ""}
                  </div>
                ))}
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
          </div>
        </div>
      )}
    </div>
  );
});
