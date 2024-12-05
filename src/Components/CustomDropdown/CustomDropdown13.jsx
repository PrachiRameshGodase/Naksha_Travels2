import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropDownHelper from '../../Views/Helper/DropDownHelper';
import { RiSearch2Line } from 'react-icons/ri';

const CustomDropdown13 = ({ options, value, onChange, name, type, defaultOption, extracssclassforscjkls ,className2}) => {

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
    focusedOptionIndex
  } = DropDownHelper(options, onChange, name, type);



  // const handleSelect = (option) => {
  //   onChange({ target: { name, value: option?.tax_percentge } });  // using `labelid` as the value
  //   setIsOpen(false);
  //   setSearchTerm(''); // Reset search term on select
  // };

  // if (type === "taxRate") {
  //   options = searchTerm?.length === 0 ? options : options?.filter(option =>
  //     option?.tax_percentge?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  //   );
  // }


  return (
    <div ref={dropdownRef} className={`customdropdownx12s86 ${extracssclassforscjkls}`} tabIndex="0" onKeyDown={handleKeyDown} style={className2 === "items" ? { minWidth: "10%", border:"1px solid #d0d7de", borderRadius:"5px" } : {}}>
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}  style={{paddingLeft:"13px"}}>
        {value ? options?.find(account => account?.tax_percentge == value)?.tax_percentge : defaultOption}
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
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dropdown-search"
            autoFocus
            ref={inputRef}
          />
          <div className="dropdownoptoscroll">
            {options?.map((option, index) => (
              <div key={option.id}
                onClick={() => handleSelect(option)}
                ref={(el) => (optionRefs.current[index] = el)}
                className={
                  "dropdown-option" +
                  (option.tax_percentge == value ? " selectedoption" : "") +
                  (index === focusedOptionIndex ? " focusedoption" : "")
                }
              >
                {option.tax_percentge}
              </div>
            ))}
            {options?.length === 0 &&
              <>
                <div className="notdatafound02">
                  <iframe src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json" frameBorder="0"></iframe>
                </div>
                <div className="dropdown-option centeraligntext">No options found</div>
              </>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown13;