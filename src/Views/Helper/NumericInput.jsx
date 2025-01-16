import React from 'react';

const NumericInput = ({ value, onChange, name, placeholder, ...rest }) => {
    return (
        <input
            autoComplete="off"
            type="text"
            value={value}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            inputMode="decimal" // Suggests a numeric keypad on mobile devices
            pattern="^-?\d*\.?\d*$" // Allows negative numbers and decimal points
            onInput={(e) => {
                const newValue = e.target.value;

                // Allow only numbers, empty values, a single negative sign at the start, or a decimal point
                if (newValue === '' || newValue === '-' || /^-?\d*\.?\d*$/.test(newValue)) {
                    onChange(e); // Call the onChange handler with the valid input
                } else {
                    e.target.value = value; // Revert to last valid value if input is invalid
                }
            }}
            {...rest}
            style={{ width: "100%" }}
        />



    );
};

export default NumericInput;
