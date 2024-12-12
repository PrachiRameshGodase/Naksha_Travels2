import React, { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Loader02 from '../../../../Components/Loaders/Loader02';
import { OutsideClick } from '../../../Helper/ComponentHelper/OutsideClick';

import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';

import useOutsideClick from '../../../Helper/PopupData';

import { formatDate3 } from '../../../Helper/DateFormat';
import { hotelRoomDetailsAction } from '../../../../Redux/Actions/hotelActions';

const HotelServicesDetails = (list, loading) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UrlId = new URLSearchParams(location.search).get("id");

  const [activeSection, setActiveSection] = useState('basicDetails');
  const filterDropdownStatus = OutsideClick();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownx1, setShowDropdownx1] = useState(false);

  // Fetch data from Redux store
  const hotelRoomDetails = useSelector(state => state?.hotelRoomDetail);
  const hotelRoomData = hotelRoomDetails?.data?.data?.room ||{};

  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  useOutsideClick(dropdownRef2, () => setShowDropdown(false));
  useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));
console.log("hotelRoomDetails", hotelRoomDetails)
  useEffect(() => {
    if (UrlId) {
      const queryParams = {
        room_id: UrlId,
      };
      dispatch(hotelRoomDetailsAction(queryParams));
    }
  }, [dispatch, UrlId]);

  const handleEditItems = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);
    queryParams.set("edit", true);
    // navigate(`/dashboard/create_machinery?${queryParams.toString()}`);
  };

  // Initialize state based on the API response
  const [status, setStatus] = useState(hotelRoomData?.status);
  const [isOpen, setIsOpen] = useState(null);
  // status
  const statuses = [
    { name: 'Inactive', value: 0 },
    { name: 'Active', value: 1 },
    { name: 'Under Maintenance', value: 2 }
  ];

  const toggleStatus = (index) => {
    setIsOpen(isOpen === index ? null : index); // Toggle only the current dropdown
  };

  useEffect(() => {
    // Ensure the state is synced with the API response on component mount/update
    setStatus(hotelRoomData?.status);
  }, [hotelRoomData]);

  const handleStatusChange = async (value) => {
    filterDropdownStatus.handleToggle();
    setIsOpen(null);

    let confirmed = null;
    if (confirmed === null) {
      const result = await Swal.fire({
        // title: 'Are you sure?',
        text: `Do you want to ${value == 0 ? "Inactive" : value == 1 ? "Active" : "Under Maintenance"} this machine ?`,
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });
      confirmed = result.isConfirmed;
    }
    if (confirmed && UrlId) {
      setStatus(value); // Update local state to reflect the new status
      const sendData = {
        machinery_id: UrlId,
        status: value
      }
    //   dispatch(UpdateMachineryStatus(sendData, navigate));
    }
  };

  const attachments = JSON.parse(hotelRoomData?.attachment || '[]');

  return (
    <>
      {hotelRoomDetails?.loading ? <Loader02 /> :
        <>
          <div id="Anotherbox" className='formsectionx3'>
            <div id="leftareax12">
              <h1 className='' id="firstheading">
                {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
                {hotelRoomData?.room_number}
              </h1>
              {/* <p id="firsttagp">Item</p>
               <p id="firsttagp">1 SKU</p> */}
            </div>
            <div id="buttonsdata">
              <div className="switchbuttontext">
                {/* <div className="switches-container">
                  <input
                    type="radio"
                    id="switchInactive"
                    name="switchPlan"
                    value="0"  // Value for Inactive
                    checked={isActive === false}  // Check if the current status is Inactive
                    onChange={(e) => handleChangeStatus(e)}  // Update status on change
                  />
                  <input
                    type="radio"
                    id="switchActive"
                    name="switchPlan"
                    className="newinput"
                    value="1"  // Value for Active
                    checked={isActive === true}  // Check if the current status is Active
                    onChange={(e) => handleChangeStatus(e)}  // Update status on change
                  />
                  <label htmlFor="switchInactive">Inactive</label>
                  <label htmlFor="switchActive">Active</label>
                  <div className="switch-wrapper">
                    <div className="switch">
                      <div id='inactiveid'>Inactive</div>
                      <div>Active</div>
                    </div>
                  </div>
                </div> */}
                {/*  <div className="switches-container_s">
                  <div className="dropdown-container_s">
                    <select
                      value={isActive}
                      onChange={handleChangeStatus}
                      className="status-select_s" // Adding class for styling
                    >
                      <option value="inactive">Inactive</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>*/}
              
              </div>
              {/* <div className="separatorx21"></div> */}
              <div data-tooltip-content="Edit" data-tooltip-id="my-tooltip" data-tooltip-place="bottom"
                //  className="mainx1"
                className="filtersorticos5wx2"
                onClick={handleEditItems}
              >
                <img src="/Icons/pen-clip.svg" alt="" />
                {/* <p>Edit</p> */}
              </div>
              <Link className="linkx4" >
                <RxCross2 />
              </Link>
            </div>
          </div>
          <div id='itemsdetailsrowskl' className="secondinsidedatax15s">
            <div className="buttonscontainxs2">
              <div className={`divac12cs32 ${activeSection === 'basicDetails' ? 'activediv12cs' : ''}`}
                onClick={() => setActiveSection('basicDetails')} >
               Basic Details</div>
             
            </div>

            <div className="insidcontain">
              {activeSection === 'basicDetails' && (
                <>
                  <div className="inidbx1">
                    <div className="inidbx1s1">
                      <div className="inidbs1x1a1">
                        {otherIcons?.information_svg}
                        Basic Details
                      </div>
                      <ul>
                        <li className='pendingfromfrontendx5'><span>Room Name/Number</span><h1>:</h1><p>{hotelRoomData?.room_number ||"-"}</p></li>
                        <li className='pendingfrombackendx5'><span>Occupancy</span><h1>:</h1><p>{hotelRoomData?.occupancy_name ||"-"}</p></li>
                        <li><span>Max Occupancy</span><h1>:</h1><p>{hotelRoomData?.max_occupancy}</p></li>
                        <li className='pendingfrombackendx5'><span>Bed</span><h1>:</h1><p>{hotelRoomData?.bed_name ||"-"} </p></li>
                        <li><span>Meal</span><h1>:</h1><p>{hotelRoomData?.meal_name ||"-"}</p></li>
                        <li><span>Price</span><h1>:</h1><p>{hotelRoomData?.price ||"-"}</p></li>
                        <li><span>Status</span><h1>:</h1><p> {hotelRoomData?.availability_status == "1"
                              ? "Available"
                              : hotelRoomData?.availability_status == "0"
                                ? "Unavailable"
                                : ""}</p></li>
                        <li><span>Description</span><h1>:</h1><p>{hotelRoomData?.description ||"-"}</p></li>

                        {/* <li className='pendingfromfrontendx5'><span>Attachment</span><h1>:</h1><p><Attachment attachments={attachments}/></p></li> */}
                      </ul>
                    </div>
                  </div>

                
                </>
              )}
             
            </div>
          </div>
        </>
      }
      <Toaster />
    </>
  )
}
export default HotelServicesDetails