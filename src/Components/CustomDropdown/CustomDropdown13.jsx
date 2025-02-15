import React, { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import DropDownHelper from '../../Views/Helper/DropDownHelper';
import { GoPlus } from 'react-icons/go';
import CreateTaxRatePopup from '../../Views/Items/CreateTaxRatePopup';
import { fetchTexRates } from '../../Redux/Actions/globalActions';

const CustomDropdown13 = ({ options, value, onChange, name, type, defaultOption, extracssclassforscjkls, className2, types, tax_rate }) => {

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


  const [showPopup, setShowPopup] = useState(false);

  const refreshCategoryListData = () => {
    dispatch(fetchTexRates());
  };

  return (
    <>
      <div ref={dropdownRef} className={`customdropdownx12s86 ${extracssclassforscjkls}`} tabIndex="0" onKeyDown={handleKeyDown} style={className2 === "item3" ? { minWidth: "120px", background: "white" } : {}}
      >
        <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')} style={className2 === "item" ? { cursor: types === "Service" ? "not-allowed" : "default", } : className2 === "item4" ? { minWidth: "88px", background: "white", height: "29px" } : className2 === "item3" ? { marginRight: "8px" } : {}}>

          {tax_rate == 0 || tax_rate === null
            ? defaultOption
            : options?.find(account => account?.tax_percentge === value)?.tax_percentge || value}



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



            </div>
            <div className="lastbuttonsecofdropdown" style={{ padding: "0" }} onClick={() => setShowPopup(true)}>
              <p style={{ cursor: "pointer" }}>
                Add Taxes
              </p>
            </div>
          </div>
        )}


      </div>
      {showPopup && (
        <CreateTaxRatePopup
          setShowPopup={setShowPopup}
          refreshCategoryListData={refreshCategoryListData}
        />
      )}
    </>
  );
};

export default CustomDropdown13;