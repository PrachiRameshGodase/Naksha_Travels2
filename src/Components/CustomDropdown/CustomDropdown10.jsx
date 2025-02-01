import React, { forwardRef, useEffect } from 'react';
import './customdropdown.scss';
import DropDownHelper from '../../Views/Helper/DropDownHelper';
import { RiSearch2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { TableViewSkeletonDropdown } from '../SkeletonLoder/TableViewSkeleton';
import { customersList } from '../../Redux/Actions/customerActions';
import { sendData } from '../../Views/Helper/HelperFunctions';
import { vendorsLists } from '../../Redux/Actions/listApisActions';

const CustomDropdown10 = forwardRef((props, ref) => {
  const { options, value, onChange, name, type, setcusData, cusData, defaultOption, style, sd154w78s877, disabled } = props;

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

  const customList = useSelector(state => state?.customerList);
  const vendorList = useSelector(state => state?.vendorList);
  // payload's of list of vendor and customer fetch from localStorage.
  const itemPayloads = localStorage.getItem(("customerPayload"));
  const itemPayloads1 = localStorage.getItem(("vendorPayload"));

  const dispatch = useDispatch();

  // Merge refs to handle both internal and external refs
  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  const fullName = options?.find(account => account?.id == value);

  useEffect(() => {
    const parsedPayload = JSON?.parse(itemPayloads);
    const parsedPayload1 = JSON?.parse(itemPayloads1);
    // Check if API call is necessary
    if (
      isOpen && // Ensure modal or component is open
      name === "customer_id" &&
      (parsedPayload?.search || !parsedPayload?.status == 1 || !customList?.data)
    ) {
      dispatch(customersList({ ...sendData }));
    }

    if (
      isOpen && // Ensure modal or component is open
      name === "vendor_id" &&
      (parsedPayload1?.search || !parsedPayload1?.status == 1 || !vendorList?.data)
    ) {
      dispatch(vendorsLists({ ...sendData }));
    }
    if (
      isOpen && // Ensure modal or component is open
      name === "passenger_visa_id" &&
      (parsedPayload?.search || !parsedPayload?.status == 1 || !customList?.data)
    ) {
      dispatch(customersList({ ...sendData }));
    }
    if (
      isOpen && // Ensure modal or component is open
      name === "passenger_insurance_id" &&
      (parsedPayload?.search || !parsedPayload?.status == 1 || !customList?.data)
    ) {
      dispatch(customersList({ ...sendData }));
    }

    setSearchTerm("");
  }, [isOpen, dispatch]);


  return (
    <div data-tooltip-content={disabled ? "Unable to select the dropdown at the moment." : ""}
      data-tooltip-id="my-tooltip"
      data-tooltip-place="bottom" ref={combinedRef} tabIndex="0" className={`customdropdownx12s86 ${sd154w78s877}`} onKeyDown={handleKeyDown} style={style}>
      <div onClick={!disabled ? () => setIsOpen(!isOpen) : ""} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')} style={{ cursor: disabled ? "not-allowed" : "pointer" }}>

        {cusData ? cusData?.display_name : value ? fullName?.display_name : defaultOption}

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
            {(customList?.loading || vendorList?.loading) ? <>
              <TableViewSkeletonDropdown />
            </> : <>
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
                  {` ${option?.display_name || ""} `}
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
            </>}
          </div>
        </div>
      )}
    </div>
  );
});

export default CustomDropdown10;


