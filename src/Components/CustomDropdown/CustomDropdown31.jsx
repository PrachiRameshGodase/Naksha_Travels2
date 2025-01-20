import React, { forwardRef, useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { customersList } from "../../Redux/Actions/customerActions";
import DropDownHelper from "../../Views/Helper/DropDownHelper";
import {
  parseJSONofString,
  sendData,
} from "../../Views/Helper/HelperFunctions";
import { TableViewSkeletonDropdown } from "../SkeletonLoder/TableViewSkeleton";
import "./customdropdown.scss";
import { RxCross2 } from "react-icons/rx";
import { otherIcons } from "../../Views/Helper/SVGIcons/ItemsIcons/Icons";

const CustomDropdown31 = forwardRef((props, ref) => {
  const {
    options,
    value,
    onChange,
    name,
    type,
    setcusData,
    cusData,
    defaultOption,
    style,
    sd154w78s877,
    disable,
  } = props;

  // Custom hook for managing dropdown functionality
  const {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    dropdownRef,
    inputRef,
    optionRefs,
    handleKeyDown,
    focusedOptionIndex,
  } = DropDownHelper(options, onChange, name, type, "", setcusData);

  const customList = useSelector((state) => state?.customerList);
  const itemPayloads = localStorage.getItem("customerPayload");
  const [storeData, setStoredData] = useState([]);

  const dispatch = useDispatch();

  const combinedRef = (node) => {
    dropdownRef.current = node;
    if (ref) ref.current = node;
  };

  const handleSelect = (account) => {
    // Copy the current value
    const selectedItems = [...value];

    // Find if the account.id is already in the list
    const index = selectedItems.findIndex((item) => item === account?.id);

    if (index === -1) {
      // Add account.id to selectedItems
      selectedItems.push(account?.id);

      // Add account to storeData
      setStoredData((prevStoreData) => [
        ...prevStoreData,
        { id: account?.id, display_name: account?.display_name },
      ]);
    } else {
      // Remove account.id from selectedItems
      selectedItems.splice(index, 1);

      // Remove account from storeData
      setStoredData((prevStoreData) =>
        prevStoreData.filter((item) => item.id !== account?.id)
      );
    }

    // Call onChange with updated selectedItems
    onChange(selectedItems);

    // Reset search term
    setSearchTerm("");
  };

  const isSelected = (accountId) => value?.includes(accountId);

  useEffect(() => {
    const parsedPayload = parseJSONofString(itemPayloads);
    // Check if API call is necessary
    if (
      isOpen && // Ensure modal or component is open
      name === "guest_ids" &&
      (parsedPayload?.search || !customList?.data)
    ) {
      dispatch(customersList({ ...sendData }));
    }
    setSearchTerm("");
  }, []);

  return (
    <div
      ref={combinedRef}
      tabIndex="0"
      className={`customdropdownx12s86 ${sd154w78s877}`}
      onKeyDown={handleKeyDown}
      style={style}
    >
      <textarea
        onClick={() => !disable && setIsOpen(!isOpen)}
        style={{
          cursor: disable ? "not-allowed" : "pointer",
          background: disable ? "#f0f0f0" : "",
          width: "268px",
          resize: "none",
          border: "1px solid rgb(236 239 241)",
          borderRadius: "5px",
        }}
        className={
          "dropdown-selected" + (value?.length > 0 ? " filledcolorIn" : "")
        }
        title={storeData.map((val) => val.display_name).join(", ")}
        value={
          storeData.length > 0
            ? storeData.map((val) => val.display_name).join(", ")
            : defaultOption
        }
        readOnly
      />

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
            {customList?.loading ? (
              <TableViewSkeletonDropdown />
            ) : (
              options?.map((option, index) => (
                <div
                  key={option.id}
                  ref={(el) => (optionRefs.current[index] = el)}
                  onClick={() => handleSelect(option)}
                  className={
                    "dropdown-option" +
                    (isSelected(option?.id) ? " selectedoption" : "") +
                    (index === focusedOptionIndex ? " focusedoption" : "")
                  }
                >
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ border: "none" }}>
                      {" "}
                      {option?.display_name || ""}
                    </span>
                    {isSelected(option?.id) ? (
                      <span style={{ fontSize: "2px", marginRight: "20px" }}>
                        {otherIcons.cross_icon}
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              ))
            )}
            {options?.length === 0 && (
              <>
                <div className="notdatafound02">
                  <iframe
                    src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json"
                    frameBorder="0"
                  ></iframe>
                </div>
                <div className="dropdown-option centeraligntext">
                  No options found
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default CustomDropdown31;
// import React, { forwardRef, useEffect, useState } from "react";
// import { RiSearch2Line } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { customersList } from "../../Redux/Actions/customerActions";
// import DropDownHelper from "../../Views/Helper/DropDownHelper";
// import {
//   parseJSONofString,
//   sendData,
// } from "../../Views/Helper/HelperFunctions";
// import { TableViewSkeletonDropdown } from "../SkeletonLoder/TableViewSkeleton";
// import "./customdropdown.scss";
// import { RxCross2 } from "react-icons/rx";
// import { otherIcons } from "../../Views/Helper/SVGIcons/ItemsIcons/Icons";

// const CustomDropdown31 = forwardRef((props, ref) => {
//   const {
//     options,
//     value,
//     onChange,
//     name,
//     type,
//     setcusData,
//     cusData,
//     defaultOption,
//     style,
//     sd154w78s877,
//     disable,
//   } = props;

//   // Custom hook for managing dropdown functionality
//   const {
//     isOpen,
//     setIsOpen,
//     searchTerm,
//     setSearchTerm,
//     dropdownRef,
//     inputRef,
//     optionRefs,
//     handleKeyDown,
//     focusedOptionIndex,
//   } = DropDownHelper(options, onChange, name, type, "", setcusData);

//   const customList = useSelector((state) => state?.customerList);
//   const itemPayloads = localStorage.getItem("customerPayload");
//   const [storeData, setStoredData] = useState([]);

//   const dispatch = useDispatch();

//   const combinedRef = (node) => {
//     dropdownRef.current = node;
//     if (ref) ref.current = node;
//   };

//   const handleSelect = (account) => {
//     // Copy the current value
//     const selectedItems = [...value];

//     // Find if the account.id is already in the list
//     const index = selectedItems.findIndex((item) => item === account?.id);

//     if (index === -1) {
//       // Add account.id to selectedItems
//       selectedItems.push(account?.id);

//       // Add account to storeData
//       setStoredData((prevStoreData) => [
//         ...prevStoreData,
//         { id: account?.id, display_name: account?.display_name },
//       ]);
//     } else {
//       // Remove account.id from selectedItems
//       selectedItems.splice(index, 1);

//       // Remove account from storeData
//       setStoredData((prevStoreData) =>
//         prevStoreData.filter((item) => item.id !== account?.id)
//       );
//     }

//     // Call onChange with updated selectedItems
//     onChange(selectedItems);

//     // Reset search term
//     setSearchTerm("");
//   };

//   const handleCrossClick = (accountId) => {
//     // Remove the accountId from selected items
//     const updatedSelectedItems = value.filter((id) => id !== accountId);
//     onChange(updatedSelectedItems); // Update the parent component with the new selection

//     // Remove the account from storeData
//     setStoredData((prevStoreData) =>
//       prevStoreData.filter((item) => item.id !== accountId)
//     );
//   };

//   const isSelected = (accountId) => value?.includes(accountId);

//   useEffect(() => {
//     const parsedPayload = parseJSONofString(itemPayloads);
//     // Check if API call is necessary
//     if (
//       isOpen && // Ensure modal or component is open
//       name === "guest_ids" &&
//       (parsedPayload?.search || !customList?.data)
//     ) {
//       dispatch(customersList({ ...sendData }));
//     }
//     setSearchTerm("");
//   }, []);

//   return (
//     <div
//       ref={combinedRef}
//       tabIndex="0"
//       className={`customdropdownx12s86 ${sd154w78s877}`}
//       onKeyDown={handleKeyDown}
//       style={style}
//     >
//       <div
//         onClick={() => !disable && setIsOpen(!isOpen)}
//         style={{
//           cursor: disable ? "not-allowed" : "pointer",
//           background: disable ? "#f0f0f0" : "",
//           width: "268px",
//           resize: "none",
//           border: "1px solid rgb(236 239 241)",
//           borderRadius: "5px",
//           padding: "8px",
//           minHeight: "36px",
//           display: "flex",
//           flexWrap: "wrap",
//           alignItems: "center",
//           paddingLeft:"38px",
//           overflowY:"auto"
//         }}
//         className={
//           "dropdown-selected" + (value?.length > 0 ? " filledcolorIn" : "")
//         }
//         title={storeData.map((val) => val.display_name).join(", ")}
//       >
//         {storeData.length > 0
//           ? storeData.map((val) => (
//               <span
//                 key={val.id}
//                 style={{
//                   margin: "4px",
//                   padding: "4px 8px",
//                   backgroundColor: "rgb(207 202 202 / 25%)",
//                   borderRadius: "16px",
//                   display: "flex",
//                   alignItems: "center",
                  
//                 }}
//               >
//                 {val.display_name}
//                 <span
//                   style={{
//                     cursor: "pointer",
//                     marginLeft: "8px",
//                     fontSize: "12px",
//                   }}
//                   onClick={() => handleCrossClick(val.id)}
//                 >
//                   {otherIcons.cross_icon}
//                 </span>
//               </span>
//             ))
//           : defaultOption}
//       </div>

//       {isOpen && (
//         <div className="dropdown-options">
//           <RiSearch2Line id="newsvgsearchicox2" />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="dropdown-search"
//             autoFocus
//             ref={inputRef}
//             required
//           />

//           <div className="dropdownoptoscroll">
//             {customList?.loading ? (
//               <TableViewSkeletonDropdown />
//             ) : (
//               options?.map((option, index) => (
//                 <div
//                   key={option.id}
//                   ref={(el) => (optionRefs.current[index] = el)}
//                   onClick={() => handleSelect(option)}
//                   className={
//                     "dropdown-option" +
//                     (isSelected(option?.id) ? " selectedoption" : "") +
//                     (index === focusedOptionIndex ? " focusedoption" : "")
//                   }
                  
//                 >
//                   <p style={{ display: "flex", justifyContent: "space-between" }}>
//                     <span style={{ border: "none" }}>
//                       {option?.display_name || ""}
//                     </span>
                    
//                   </p>
//                 </div>
//               ))
//             )}
//             {options?.length === 0 && (
//               <>
//                 <div className="notdatafound02">
//                   <iframe
//                     src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json"
//                     frameBorder="0"
//                   ></iframe>
//                 </div>
//                 <div className="dropdown-option centeraligntext">
//                   No options found
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// });

// export default CustomDropdown31;
