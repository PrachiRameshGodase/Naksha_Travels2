import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import DropDownHelper from '../../Views/Helper/DropDownHelper';
import { TableViewSkeletonDropdown } from '../SkeletonLoder/TableViewSkeleton';
import { useSelector } from 'react-redux';

const CustomDropdown18 = forwardRef((props, ref) => {
  const { options, value, onChange, name, defaultOption, sd154w78s877, type, bill_id } = props

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

  const billList = useSelector(state => state?.billList);

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };


  return (
    <div ref={combinedRef} tabIndex="0" className="customdropdownx12s86" onKeyDown={handleKeyDown}>
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {/* {value ? options?.find(account => account?.id == value)?.bill_no : defaultOption} */}

        {bill_id ? bill_id : value ? options?.find(account => account?.id == value)?.bill_no : defaultOption}
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
            {(billList?.loading) ? <>
              <TableViewSkeletonDropdown />
            </> : <>
              {options?.map((option, index) => (
                <div key={option.id}
                  onClick={() => handleSelect(option)}

                  className={"dropdown-option" +
                    (option.labelid == value ? " selectedoption" : "") +
                    (index === focusedOptionIndex ? " focusedoption" : "")}>
                  {option.bill_no ? option?.bill_no : ""}

                </div>

              ))}
              {options?.length == 0 &&
                <>
                  <div className="notdatafound02">
                    <iframe src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json" frameBorder="0"></iframe>
                  </div>
                  <div className="dropdown-option centeraligntext">No Bill found for this Vendor</div>
                </>
              }
            </>}
          </div>
        </div >
      )}
    </div >
  );
});

export default CustomDropdown18;
