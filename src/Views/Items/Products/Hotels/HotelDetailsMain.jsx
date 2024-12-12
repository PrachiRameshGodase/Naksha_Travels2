import React, { useEffect, useRef, useState } from 'react'
import HotelDetails from './HotelDetails'
import { RxCross2 } from 'react-icons/rx'
import MainScreenFreezeLoader from '../../../../Components/Loaders/MainScreenFreezeLoader'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { hotelDetailsAction } from '../../../../Redux/Actions/hotelActions'
import Loader02 from '../../../../Components/Loaders/Loader02'

const HotelDetailsMain = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const itemId = new URLSearchParams(location.search).get("id");
  
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
    const deletedItem = useSelector(state => state?.deleteItem);
    const [switchValue, setSwitchValue] = useState(""); // State for the switch button value
    const dropdownRef = useRef(null); // Ref to the dropdown element
    const status = useSelector(state => state?.status);
  
    const hotelDetails = useSelector(state => state?.hotelDetail);
    const hotelData = hotelDetails?.data?.data?.hotels || {};
  console.log("hotelDetails", hotelData)
    useEffect(() => {
      if (itemId) {
        const queryParams = {
          hotel_id: itemId,
          fy: localStorage.getItem('FinancialYear'),
        };
        dispatch(hotelDetailsAction(queryParams));
      }
    }, [dispatch, itemId]);
  
    useEffect(() => {
      setSwitchValue(hotelData?.active);
    }, [hotelData]);
  
    const handleSwitchChange = (e) => {
      const newValue = e.target.value;
      setSwitchValue(newValue);
      if (itemId) {
        const sendData = {
          item_id: itemId,
          active: newValue
        }
        dispatch(activeInActive(sendData))
          .then(() => {
            const toastMessage = newValue === '1' ? 'Item is now active' : 'Item is now inactive';
            toast.success(toastMessage);
          })
          .catch((error) => {
            toast.error('Failed to update item status');
            console.error('Error updating item status:', error);
            // Revert switch value if there's an error
            setSwitchValue((prevValue) => prevValue === '1' ? '0' : '1');
          });
      }
    };
  
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const handleEditItems = () => {
      const queryParams = new URLSearchParams();
      queryParams.set("id", itemId);
      queryParams.set("edit", true);
      navigate(`/dashboard/create-hotels?${queryParams.toString()}`);
    };
  return (
    <>
      {deletedItem?.loading && <MainScreenFreezeLoader />}
      {status?.loading && <MainScreenFreezeLoader />}
      {hotelDetails?.loading ? <Loader02/> :
        <div className='formsectionsgrheigh'>
          <div id="Anotherbox" className='formsectionx3'>
            <div id="leftareax12">
              <h1 id="firstheading">{hotelData?.hotel_name}</h1>
            </div>
            <div id="buttonsdata">
              <div className="switchbuttontext">
                <div className="switches-container">
                    <input type="radio" id="switchMonthly" name="switchPlan" value="0" checked={switchValue === "0"} onChange={handleSwitchChange} />
                    <input type="radio" id="switchYearly" name="switchPlan" className='newinput' value="1" checked={switchValue === "1"} onChange={handleSwitchChange} />
                    <label htmlFor="switchMonthly">Inactive</label>
                    <label htmlFor="switchYearly">Active</label>
                    <div className="switch-wrapper">
                      <div className="switch">
                        <div id='inactiveid'>Inactive</div>
                        <div>Active</div>
                      </div>
                    </div>
                  </div>
              </div>
              {/* <div className="separatorx21"></div> */}
              <div data-tooltip-content="Edit" data-tooltip-id="my-tooltip" data-tooltip-place="bottom"
               
                className="filtersorticos5wx2"
                onClick={handleEditItems}>
                {otherIcons.edit_svg}
                
              </div>
              {/* <div onClick={() => setShowDropdown(!showDropdown)} className="filtersorticos5wx2" ref={dropdownRef}>
            
                <img
                  data-tooltip-content="Menu" data-tooltip-id="my-tooltip" data-tooltip-place="bottom" src={newmenuicoslz} alt="" />
                {showDropdown && (
                  <div className="dropdownmenucustom">
                    <div className='dmncstomx1' onClick={handleDublicateItems}>
                        {otherIcons?.dublicate_svg}
                        Duplicate</div>
                    <div className="bordersinglestroke"></div>
                    <div className='dmncstomx1' onClick={deleteItemsHandler} style={{ cursor: "pointer" }}>
                      {otherIcons?.delete_svg}
                      Delete</div>
                  </div>
                )}
              </div> */}
              <Link className="linkx4" to={"/dashboard/hotels-services"}>
                <RxCross2 />
              </Link>
            </div>
          </div>
          <div id="item-details">
            <HotelDetails data={hotelData} />
          </div>
          <Toaster />
        </div>
      }
    </>
  )
}

export default HotelDetailsMain
