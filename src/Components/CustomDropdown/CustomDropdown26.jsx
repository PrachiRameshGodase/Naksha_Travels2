import React, { forwardRef, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { TableViewSkeletonDropdown } from '../SkeletonLoder/TableViewSkeleton';
import { RiSearch2Line } from 'react-icons/ri';

const CustomDropdown26= forwardRef((props, ref) => {
  const {
    options,
    value,
    onChange,
    placeholder = "Search or type...",
    name,
    setShowPopup,
  } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);
  };

  const handleOptionSelect = (option) => {
    onChange(option);
    setSearchTerm(option.name);
    setIsOpen(false);
  };

  const handleBlur = () => {
    // If the search term doesn't match an option, treat it as a custom value
    if (!options.some((opt) => opt.name === searchTerm)) {
      onChange({ id: null, name: searchTerm });
    }
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-dropdown" ref={dropdownRef} style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        className="dropdown-search-input"
        autoComplete="off"
        ref={ref}
      />
      {isOpen && (
        <div className="dropdown-options" style={{ position: 'absolute', top: '100%', zIndex: 10 }}>
          <RiSearch2Line id="newsvgsearchicox2" />
          {useSelector((state) => state?.itemList)?.loading ? (
            <TableViewSkeletonDropdown />
          ) : (
            <div className="dropdown-scroll">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    className="dropdown-option"
                  >
                    {option.name}
                  </div>
                ))
              ) : (
                <div className="dropdown-option centeraligntext">No options found</div>
              )}
            </div>
          )}
          <div className="add-new-button">
            <p style={{ cursor: 'pointer' }} onClick={() => setShowPopup(true)}>
              Add {name.replace('_id', '').replace(/_/g, ' ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

export default CustomDropdown26;
