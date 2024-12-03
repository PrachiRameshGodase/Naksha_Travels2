import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import DropDownHelper from '../../Views/Helper/DropDownHelper';

const CustomDropdown18 = forwardRef((props, ref) => {
  const { options, value, onChange, name, defaultOption, type } = props

  const {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    dropdownRef,
    inputRef,
    optionRefs,
    filteredOptions,
    handleKeyDown,
    handleSelect,
    focusedOptionIndex
  } = DropDownHelper(options, onChange, name, type);

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  return (
    <div ref={combinedRef} tabIndex="0" className="customdropdownx12s86" onKeyDown={handleKeyDown}>
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {value ? options?.find(account => account?.id == value)?.bill_no : defaultOption}
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
          />
          <div className="dropdownoptoscroll">
            {options?.map((option, index) => (
              <div key={option.id}
                onClick={() => handleSelect(option)}

                className={"dropdown-option" +
                  (option.labelid == value ? " selectedoption" : "") +
                  (index === focusedOptionIndex ? " focusedoption" : "")}>
                {option.bill_no ? option?.bill_no : ""}

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default CustomDropdown18;
