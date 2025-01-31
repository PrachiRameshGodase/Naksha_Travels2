import React, { forwardRef } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import DropDownHelper from '../../Views/Helper/DropDownHelper';
import { useSelector } from 'react-redux';
import { TableViewSkeletonDropdown } from '../SkeletonLoder/TableViewSkeleton';

const CustomDropdown17 = forwardRef((props, ref) => {

  let { options, value, onChange, name, defaultOption, sd154w78s877, type, invoice_id } = props;
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

  const invoiceList = useSelector((state) => state?.invoiceList);
  //for static search bill list


  if (searchTerm) options = searchTerm?.length === 0 ? options : options?.filter(option =>
    option?.invoice_id?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  // console.log("value", value)
  // console.log("options", invoice_id)

  return (
    <div ref={combinedRef} tabIndex="0" className={`customdropdownx12s86 ${sd154w78s877}`} onKeyDown={handleKeyDown}  >
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>

        {invoice_id ? invoice_id : value ? options?.find(account => account?.id == value)?.invoice_id : defaultOption}
      </div>
      {isOpen && (
        <div className="dropdown-options">
          <RiSearch2Line id="newsvgsearchicox2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
            className="dropdown-search"
          />
          <div className="dropdownoptoscroll">
            {(invoiceList?.loading) ? <>
              <TableViewSkeletonDropdown />
            </> : <>
              {options?.map((option, index) => (
                <div key={option.id}
                  ref={(el) => (optionRefs.current[index] = el)}
                  onClick={() => handleSelect(option)}
                  className={"dropdown-option" +
                    (option.labelid == value ? " selectedoption" : "") +
                    (index === focusedOptionIndex ? " focusedoption" : "")}>
                  {option.invoice_id ? option?.invoice_id : ""}
                </div>
              ))}

              {options?.length == 0 &&
                <>
                  <div className="notdatafound02">
                    <iframe src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json" frameBorder="0"></iframe>
                  </div>
                  <div className="dropdown-option centeraligntext">No Invoice found for this Customer</div>
                </>
              }
            </>}
          </div>
        </div>
      )}
    </div>
  );
});

export default CustomDropdown17;
