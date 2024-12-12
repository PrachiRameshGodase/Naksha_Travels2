// import React, { useEffect, useRef, useState } from 'react'
// import { RxCross2 } from 'react-icons/rx'
// import { Link, useNavigate } from 'react-router-dom'
// import { otherIcons } from '../Helper/SVGIcons/ItemsIcons/Icons';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader02 from '../../Components/Loaders/Loader02';
// import { Toaster, toast } from 'react-hot-toast';
// import useOutsideClick from '../Helper/PopupData';
// import { MachineryDetails } from "../../Redux/Actions/listApisActions";
// import Swal from 'sweetalert2';
// import overviewIco from '../../assets/outlineIcons/othericons/overviewIco.svg';
// import stocktransactionIco from '../../assets/outlineIcons/othericons/stocktransactionIco.svg';
// import OperationList from './OperationList';
// import { UpdateMachineryStatus } from '../../Redux/Actions/machineryActions';


// import { OutsideClick } from "../Helper/ComponentHelper/OutsideClick";
// import ImagePreview from '../Common/ImagePreview/ImagePreview';
// import { formatDate3 } from '../Helper/DateTimeFormat';
// import Attachment from '../Common/ImagePreview/Attachment';

// const TourPackageDetails = (list, loading) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const UrlId = new URLSearchParams(location.search).get("id");

//   const [activeSection, setActiveSection] = useState('basicDetails');
//   const filterDropdownStatus = OutsideClick();

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showDropdownx1, setShowDropdownx1] = useState(false);

//   // Fetch data from Redux store
//   const machineryDetails = useSelector(state => state?.MachineryDetails);
//   const machineryData = machineryDetails?.data?.machine;

//   const dropdownRef1 = useRef(null);
//   const dropdownRef2 = useRef(null);

//   useOutsideClick(dropdownRef2, () => setShowDropdown(false));
//   useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));

//   useEffect(() => {
//     if (UrlId) {
//       const queryParams = {
//         id: UrlId,
//       };
//     //   dispatch(MachineryDetails(queryParams));
//     }
//   }, [dispatch, UrlId]);

//   const handleEditItems = () => {
//     const queryParams = new URLSearchParams();
//     queryParams.set("id", UrlId);
//     queryParams.set("edit", true);
//     // navigate(`/dashboard/create_machinery?${queryParams.toString()}`);
//   };

//   // Initialize state based on the API response
//   const [status, setStatus] = useState(machineryData?.status);
//   const [isOpen, setIsOpen] = useState(null);
//   // status
//   const statuses = [
//     { name: 'Inactive', value: 0 },
//     { name: 'Active', value: 1 },
//     { name: 'Under Maintenance', value: 2 }
//   ];

//   const toggleStatus = (index) => {
//     setIsOpen(isOpen === index ? null : index); // Toggle only the current dropdown
//   };

//   useEffect(() => {
//     // Ensure the state is synced with the API response on component mount/update
//     setStatus(machineryData?.status);
//   }, [machineryData]);

//   const handleStatusChange = async (value) => {
//     filterDropdownStatus.handleToggle();
//     setIsOpen(null);

//     let confirmed = null;
//     if (confirmed === null) {
//       const result = await Swal.fire({
//         // title: 'Are you sure?',
//         text: `Do you want to ${value == 0 ? "Inactive" : value == 1 ? "Active" : "Under Maintenance"} this machine ?`,
//         // icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes',
//         cancelButtonText: 'No',
//       });
//       confirmed = result.isConfirmed;
//     }
//     if (confirmed && UrlId) {
//       setStatus(value); // Update local state to reflect the new status
//       const sendData = {
//         machinery_id: UrlId,
//         status: value
//       }
//     //   dispatch(UpdateMachineryStatus(sendData, navigate));
//     }
//   };

//   const attachments = JSON.parse(machineryData?.attachment || '[]');

//   return (
//     <>
//       {machineryDetails?.loading ? <Loader02 /> :
//         <>
//           <div id="Anotherbox" className='formsectionx3'>
//             <div id="leftareax12">
//               <h1 className='' id="firstheading">
//                 {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
//                 {machineryData?.machine_id}
//               </h1>
//               {/* <p id="firsttagp">Item</p>
//                <p id="firsttagp">1 SKU</p> */}
//             </div>
//             <div id="buttonsdata">
//               <div className="switchbuttontext">
//                 {/* <div className="switches-container">
//                   <input
//                     type="radio"
//                     id="switchInactive"
//                     name="switchPlan"
//                     value="0"  // Value for Inactive
//                     checked={isActive === false}  // Check if the current status is Inactive
//                     onChange={(e) => handleChangeStatus(e)}  // Update status on change
//                   />
//                   <input
//                     type="radio"
//                     id="switchActive"
//                     name="switchPlan"
//                     className="newinput"
//                     value="1"  // Value for Active
//                     checked={isActive === true}  // Check if the current status is Active
//                     onChange={(e) => handleChangeStatus(e)}  // Update status on change
//                   />
//                   <label htmlFor="switchInactive">Inactive</label>
//                   <label htmlFor="switchActive">Active</label>
//                   <div className="switch-wrapper">
//                     <div className="switch">
//                       <div id='inactiveid'>Inactive</div>
//                       <div>Active</div>
//                     </div>
//                   </div>
//                 </div> */}
//                 {/*  <div className="switches-container_s">
//                   <div className="dropdown-container_s">
//                     <select
//                       value={isActive}
//                       onChange={handleChangeStatus}
//                       className="status-select_s" // Adding class for styling
//                     >
//                       <option value="inactive">Inactive</option>
//                       <option value="active">Active</option>
//                       <option value="pending">Pending</option>
//                     </select>
//                   </div>
//                 </div>*/}
//                 <div className="status-dropdown">
//                   <div className="status-container">
//                     <div onClick={filterDropdownStatus?.handleToggle}
//                       ref={filterDropdownStatus?.buttonRef}>
//                       <div className={`status-display ${status == '1' ? 'active' : status == '0' ? 'inactive' : 'under-maintenance'}`}
//                         onClick={() => toggleStatus(index)}>
//                         <span className={`left_dot ${status == '1' ? 'active' : status == '0' ? 'inactive' : 'under-maintenance'}`}></span>
//                         <div>
//                           <div className="EmpS">
//                             {status == '1' ? 'Active' : status == '0' ? 'Inactive' : 'Under Maintenance'}
//                           </div>
//                           <div className="wdown">
//                             {filterDropdownStatus?.isOpen ?
//                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000" fill="none">
//                                 <path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                               </svg>
//                               :
//                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000" fill="none">
//                                 <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                               </svg>
//                             }
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {filterDropdownStatus?.isOpen && (
//                       <>
//                         {/* {isOpen === index && ( */}
//                         <div className="status-options" ref={filterDropdownStatus?.ref}>
//                           {statuses?.map((item, index) => (
//                             <div
//                               key={index}
//                               className="status-option"
//                               onClick={() => handleStatusChange(item?.value)}
//                             >
//                               {item?.name}
//                             </div>
//                           ))}
//                         </div>
//                         {/* )} */}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               {/* <div className="separatorx21"></div> */}
//               <div data-tooltip-content="Edit" data-tooltip-id="my-tooltip" data-tooltip-place="bottom"
//                 //  className="mainx1"
//                 className="filtersorticos5wx2"
//                 onClick={handleEditItems}
//               >
//                 <img src="/Icons/pen-clip.svg" alt="" />
//                 {/* <p>Edit</p> */}
//               </div>
//               <Link className="linkx4" to={"/dashboard/machinery"}>
//                 <RxCross2 />
//               </Link>
//             </div>
//           </div>
//           <div id='itemsdetailsrowskl' className="secondinsidedatax15s">
//             <div className="buttonscontainxs2">
//               <div className={`divac12cs32 ${activeSection === 'basicDetails' ? 'activediv12cs' : ''}`}
//                 onClick={() => setActiveSection('basicDetails')} >
//                 <img src={overviewIco} alt="" />Basic Details</div>
//               <div className={`divac12cs32 ${activeSection === 'operationList' ? 'activediv12cs' : ''}`}
//                 onClick={() => setActiveSection('operationList')} >
//                 <img src={stocktransactionIco} alt="" />Operation List</div>
//             </div>

//             <div className="insidcontain">
//               {activeSection === 'basicDetails' && (
//                 <>
//                   <div className="inidbx1">
//                     <div className="inidbx1s1">
//                       <div className="inidbs1x1a1">
//                         {otherIcons?.information_svg}
//                         Basic Details
//                       </div>
//                       <ul>
//                         <li className='pendingfromfrontendx5'><span>Workstation  Name</span><h1>:</h1><p>{machineryData?.workstation?.name}</p></li>
//                         <li className='pendingfrombackendx5'><span>Machine ID</span><h1>:</h1><p>{machineryData?.machine_id}</p></li>
//                         <li><span>Machine Name</span><h1>:</h1><p>{machineryData?.machine_name}</p></li>
//                         <li className='pendingfrombackendx5'><span>Running Time</span><h1>:</h1><p>{machineryData?.running_time} hr</p></li>
//                         <li><span>Model Number</span><h1>:</h1><p>{machineryData?.model_number}</p></li>
//                         <li><span>Manufacturer</span><h1>:</h1><p>{machineryData?.manufacturer}</p></li>
//                         <li><span>Purchase Date</span><h1>:</h1><p>{formatDate3(machineryData?.purchase_date)}</p></li>
//                         {/* <li className='pendingfromfrontendx5'><span>Attachment</span><h1>:</h1><p><Attachment attachments={attachments}/></p></li> */}
//                       </ul>
//                     </div>
//                   </div>

                
//                 </>
//               )}
//               {activeSection === 'operationList' && (
//                 <>
//                   <OperationList />
//                 </>
//               )}
//             </div>
//           </div>
//         </>
//       }
//       <Toaster />
//     </>
//   )
// }
// export default TourPackageDetails
import React from 'react'

const TourPackageDetails = () => {
  return (
    <div>
      
    </div>
  )
}

export default TourPackageDetails
