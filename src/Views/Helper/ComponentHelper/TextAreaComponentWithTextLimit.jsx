// import React from 'react';

// const TextAreaComponentWithTextLimit = ({ formsValues: { handleChange }, placeholder, name, value }) => {
//     // Count the characters excluding spaces
//     const charCount = value ? value.replace(/\s/g, '').length : 0;

//     return (
//         <>
//             <textarea
//                 placeholder={placeholder}
//                 value={value || ""} // Handle undefined or null value
//                 onChange={handleChange}
//                 name={name}
//             />
//             <p>{charCount}/300</p>
//         </>
//     );
// };

// export default TextAreaComponentWithTextLimit;
import React from "react";

const TextAreaComponentWithTextLimit = ({
  formsValues: { handleChange },
  placeholder,
  name,
  value,
}) => {
  // Count the characters excluding spaces
  // const charCount = value ? value.replace(/\s/g, "").length : 0;
  const charCount = value ? value?.length : 0;

  const handleTextChange = (e) => {
    const inputWithoutSpaces = e.target.value;
    // const inputValue = e.target.value;
    // const inputWithoutSpaces = inputValue.replace(/\s/g, "");

    // Allow changes only if character count excluding spaces is <= 300
    if (inputWithoutSpaces.length <= 250) {
      handleChange(e); // Call the parent-provided handleChange function
    }
  };

  return (
    <>
      <textarea
        placeholder={placeholder}
        value={value || ""} // Handle undefined or null value
        onChange={handleTextChange}
        name={name}
      />
      <p>{charCount}/250</p>
    </>
  );
};

export default TextAreaComponentWithTextLimit;


export const TextAreaComponentWithTextLimitBank = ({
  formsValues: { handleChange },
  placeholder,
  name,
  value,
  index = null, // Add index for consistency with input field
}) => {
  const charCount = value ? value.length : 0;

  const handleTextChange = (e) => {
    const inputWithoutSpaces = e.target.value;

    if (inputWithoutSpaces.length <= 250) {
      handleChange(name, index, inputWithoutSpaces); // Match input field's handleChange pattern
    }
  };

  return (
    <>
      <textarea
        placeholder={placeholder}
        value={value || ""}
        onChange={handleTextChange}
        name={name}
      />
      <p>{charCount}/250</p>
    </>
  );
};

