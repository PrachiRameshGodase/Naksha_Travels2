import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader02 from "../../Components/Loaders/Loader02";
import { activeInActive, itemDetails } from "../../Redux/Actions/itemsActions";
import InsideItemDetailsBox from "./InsideItemDetailsBox";
import { RxCross2 } from 'react-icons/rx';
import toast, { Toaster } from 'react-hot-toast';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';
import { otherIcons } from '../Helper/SVGIcons/ItemsIcons/Icons';
import newmenuicoslz from '../../assets/outlineIcons/othericons/newmenuicoslz.svg';
import Swal from 'sweetalert2';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const itemId = new URLSearchParams(location.search).get("id");

  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const item_detail = useSelector(state => state?.itemDetail);
  const { item_details, preferred_vendor, purchase_account, sale_account } = useSelector(state => state?.itemDetail?.itemsDetail?.data || {});
  const warehouseData = useSelector(state => state?.itemDetail?.itemsDetail?.data || {});
  const deletedItem = useSelector(state => state?.deleteItem);
  const [switchValue, setSwitchValue] = useState(""); // State for the switch button value
  const dropdownRef = useRef(null); // Ref to the dropdown element
  const status = useSelector(state => state?.status);


  useEffect(() => {
    if (itemId) {
      const queryParams = {
        item_id: itemId,
        fy: localStorage.getItem('FinancialYear'),
        warehouse_id: localStorage.getItem('selectedWarehouseId'),
      };
      dispatch(itemDetails(queryParams));
    }
  }, [dispatch]);

  useEffect(() => {
    setSwitchValue(item_details?.active);
  }, [item_details]);

  const handleSwitchChange = async (e) => {

    let confirmed = null;
    if (confirmed === null) {
      const result = await Swal.fire({
        // title: 'Are you sure?',
        text: `Do you want to ${switchValue == "1" ? "Inactive" : "Active"} this item ?`,
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });
      confirmed = result.isConfirmed;
    }

    const newValue = e.target.value;
    if (confirmed && itemId) {
      setSwitchValue(newValue);
      const sendData = {
        item_id: itemId,
        active: newValue
      }
      dispatch(activeInActive(sendData))
        .then(() => {
          const toastMessage = newValue == '1' ? 'Item is now active' : 'Item is now inactive';
          toast.success(toastMessage);
        })
        .catch((error) => {
          toast.error('Failed to update item status');
          console.error('Error updating item status:', error);
          setSwitchValue((prevValue) => prevValue == '1' ? '0' : '1');
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
    navigate(`/dashboard/create-items?${queryParams.toString()}`);
  };

  const handleDuplicateItems = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", itemId);
    queryParams.set("duplicate", true);
    navigate(`/dashboard/create-items?${queryParams.toString()}`);
  };


  return (
    <>

      {deletedItem?.loading && <MainScreenFreezeLoader />}
      {status?.loading && <MainScreenFreezeLoader />}

      <Toaster />
      {
        item_detail?.loading ? <Loader02 /> :

          <>
            <div id="Anotherbox" className='formsectionx3'>

              <div id="leftareax12">
                <h1 className='' id="firstheading">
                  {item_details?.name}
                </h1>
              </div>

              <div id="buttonsdata">
                <div className="switchbuttontext">
                  <div className="switches-container">
                    <input type="radio" id="switchMonthly" name="switchPlan" value="0" checked={switchValue == "0"} onChange={handleSwitchChange} />
                    <input type="radio" id="switchYearly" name="switchPlan" className='newinput' value="1" checked={switchValue == "1"} onChange={handleSwitchChange} />
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

                <div data-tooltip-content="Edit" data-tooltip-id="my-tooltip" data-tooltip-place="bottom"
                  className="filtersorticos5wx2"
                  onClick={handleEditItems}>
                  <img src="/Icons/pen-clip.svg" alt="" />
                </div>
                <div onClick={() => setShowDropdown(!showDropdown)} className="filtersorticos5wx2" ref={dropdownRef}>
                  <img
                    data-tooltip-content="Menu" data-tooltip-id="my-tooltip" data-tooltip-place="bottom" src={newmenuicoslz} alt="" />
                  {showDropdown && (
                    <div className="dropdownmenucustom">
                      <div className='dmncstomx1' onClick={handleDuplicateItems}>
                        {otherIcons?.duplicate_svg}
                        Duplicate</div>
                      <div className="bordersinglestroke"></div>
                    </div>
                  )}
                </div>
                <Link className="linkx4" to={"/dashboard/manage-items"}>
                  <RxCross2 />
                </Link>
              </div>
            </div>

            <div id="item-details">
              <InsideItemDetailsBox itemDetails={item_details} preferred_vendor={preferred_vendor} warehouseData={warehouseData} />
            </div>

          </>
      }
    </>
  );
};

export default ItemDetails;
