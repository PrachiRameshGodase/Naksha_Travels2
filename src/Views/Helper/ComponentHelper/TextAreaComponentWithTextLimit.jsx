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
  formsValues: { handleChange, formData },
  placeholder,
  name,
  value,
}) => {
  // Count the characters excluding spaces
  const charCount = value ? value.replace(/\s/g, "").length : 0;

  const handleTextChange = (e) => {
    const inputValue = e.target.value;
    const inputWithoutSpaces = inputValue.replace(/\s/g, "");

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
