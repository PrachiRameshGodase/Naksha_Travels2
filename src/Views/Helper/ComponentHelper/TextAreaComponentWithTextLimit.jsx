import React from 'react';

const TextAreaComponentWithTextLimit = ({ formsValues: { handleChange }, placeholder, name, value }) => {
    // Count the characters excluding spaces
    const charCount = value ? value.replace(/\s/g, '').length : 0;

    return (
        <>
            <textarea
                placeholder={placeholder}
                value={value || ""} // Handle undefined or null value
                onChange={handleChange}
                name={name}
            />
            <p>{charCount}/300</p>
        </>
    );
};

export default TextAreaComponentWithTextLimit;
