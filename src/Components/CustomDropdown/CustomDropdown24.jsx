import React, { useState, useRef, forwardRef, useEffect } from 'react';
import './customdropdown.scss';
import DropDownHelper from '../../Views/Helper/DropDownHelper';
import { RiSearch2Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { fetchGetCountries } from '../../Redux/Actions/globalActions';

const CustomDropdown24 = forwardRef((props, ref) => {
  let { options, value, onChange, name, type, setcusData, defaultOption, style, sd154w78s877 } = props;
  
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
    focusedOptionIndex,
  } = DropDownHelper(options, onChange, name, type, "", setcusData);

const dispatch=useDispatch()
  // Merge refs to handle both internal and external refs
  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  if (searchTerm) {
    options = searchTerm?.length === 0 ? options : options?.filter(option =>
      option?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }
  console.log("name",name)
  useEffect(() => {
    if(isOpen && (name=="citizenship" || name=="country_id" || name=="country")){
    dispatch(fetchGetCountries());
    }
  }, [dispatch,isOpen]);


  const fullName = options?.find((account) => account?.id == value);


  return (
    <div ref={combinedRef} tabIndex="0" className={`customdropdownx12s86 ${sd154w78s877}`} onKeyDown={handleKeyDown} style={style}>
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {value ? <>{fullName?.name}</> : defaultOption}
        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2852 0.751994C11.2852 0.751994 7.60274 5.75195 6.28516 5.75195C4.96749 5.75195 1.28516 0.751953 1.28516 0.751953" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                {option?.name}
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
});

export default CustomDropdown24;
