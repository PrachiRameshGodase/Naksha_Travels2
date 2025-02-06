import React, { forwardRef } from 'react';
import DropDownHelper from '../../Views/Helper/DropDownHelper';
import { RiSearch2Line } from 'react-icons/ri';

const CustomDropdown04 = forwardRef((props, ref) => {
  let { options, value, onChange, name, type, defaultOption, extracssclassforscjkls, className2, item_data, disabled, dropdownStyle } = props;
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
  } = DropDownHelper(options, onChange, name, type);

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  if (searchTerm) {
    options = searchTerm?.length === 0 ? options : options?.filter(option =>
      option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }

  return (
    <div
      data-tooltip-content={(item_data?.type === "Service" && name === "unit_id") ? "Unit is not changed for service type select" : ((item_data?.type !== "" && name == "type" && (item_data?.item_id || item_data?.is_service == 1))) ? "Selected type is not changed" : disabled ? "According to room it is getting" : ""}
      data-tooltip-id="my-tooltip"
      data-tooltip-place="bottom"
      // show tool tip of related message if any type is selected or unit is service selected in item select module

      ref={combinedRef} tabIndex="0" className={`customdropdownx12s86 ${extracssclassforscjkls}`} onKeyDown={handleKeyDown}>
      <div
        onClick={(item_data?.type === "Service" && name === "unit_id") || ((item_data?.type !== "" && name == "type" && (item_data?.item_id || item_data?.is_service == 1))) ? undefined : () => setIsOpen(!isOpen)}

        //  disable onclick only when open dropdown. where type is selected or unit is service selected in item select module

        className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}
        style={{ cursor: ((item_data?.type === "Service" && name === "unit_id") || ((item_data?.type !== "" && name === "type" && item_data?.item_id)) || (disabled)) ? "not-allowed" : "pointer" }}>
        {/* show cursor not allowed if any type is selected or unit is service selected in item select module*/}

        {(type === "masters_salutation" || type === "masters2" || type === "item_type") ?
          <>
            {value ? options?.find(account => account?.label == value)?.label : defaultOption}
          </>
          :
          <>
            {value ? options?.find(account => account?.labelid == value)?.label : defaultOption}

          </>}

        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2852 0.751994C11.2852 0.751994 7.60274 5.75195 6.28516 5.75195C4.96749 5.75195 1.28516 0.751953 1.28516 0.751953" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </div>

      {isOpen && (
        <div className="dropdown-options"
        >
          <RiSearch2Line id="newsvgsearchicox2" />
          <input
            autoComplete='off'
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dropdown-search"
            ref={inputRef}
            disabled={disabled}
          />
          <div className="dropdownoptoscroll">
            {options?.map((option, index) => (
              <div
                key={option.labelid}
                ref={(el) => (optionRefs.current[index] = el)}
                onClick={() => handleSelect(option)}
                className={
                  "dropdown-option" +
                  (option.labelid === value ? " selectedoption" : "") +
                  (index === focusedOptionIndex ? " focusedoption" : "")
                }

              >
                {option.label}
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

export default CustomDropdown04;


export const CustomDropdown004 = forwardRef((props, ref) => {
  let { options, value, onChange, name, type, defaultOption, extracssclassforscjkls, item_data, disabled, tax_rate } = props;
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
  } = DropDownHelper(options, onChange, name, type);

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  if (searchTerm) {
    options = searchTerm?.length === 0 ? options : options?.filter(option =>
      option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }

  // console.log("item_data", item_data);
  // console.log("type", name)

  return (
    <div


      data-tooltip-content={(item_data == "1" ? "Tax has already been applied to purchases." : "")}
      data-tooltip-id="my-tooltip"
      data-tooltip-place="bottom"
      // show tool tip of related message if any type is selected or unit is service selected in item select module

      ref={combinedRef} tabIndex="0" className={`customdropdownx12s86 ${extracssclassforscjkls}`} onKeyDown={handleKeyDown}>
      <div
        onClick={item_data == "1" ? undefined : () => setIsOpen(!isOpen)}

        //  disable onclick only when open dropdown. where type is selected or unit is service selected in item select module

        className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}
        style={{ cursor: item_data == "1" ? "not-allowed" : "pointer" }}>
        {/* show cursor not allowed if any type is selected or unit is service selected in item select module*/}

        {tax_rate == 0 || tax_rate === null
          ? defaultOption
          : options?.find(account => account?.tax_percentge === value)?.tax_percentge || value}


        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2852 0.751994C11.2852 0.751994 7.60274 5.75195 6.28516 5.75195C4.96749 5.75195 1.28516 0.751953 1.28516 0.751953" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </div>

      {isOpen && !disabled && (
        <div className="dropdown-options"
        >
          <RiSearch2Line id="newsvgsearchicox2" />
          <input
            autoComplete='off'
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dropdown-search"
            ref={inputRef}
            disabled={disabled}
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
});

