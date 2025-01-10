import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader02 from "../../../Components/Loaders/Loader02";
import {
  activeInActive,
  itemDetails,
} from "../../../Redux/Actions/itemsActions";
import InsideItemDetailsBox from "../../Items/InsideItemDetailsBox";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import {
  customerStatus,
  customersView,
  deleteCustomer,
} from "../../../Redux/Actions/customerActions";
import InsideCusDetails from "./InsideCusDetails";
import toast, { Toaster } from "react-hot-toast";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import Swal from "sweetalert2";
import { showToast } from "../../Helper/ComponentHelper/toastConfigure";
const CustomerDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const Navigate = useNavigate();
  const itemId = new URLSearchParams(location.search).get("id");

  const [loading, setLoading] = useState(true);
  const [switchValue1, setSwitchValue1] = useState(""); // State for the switch button value
  const [switchValue, setSwitchValue] = useState(""); // State for the switch button value
  const customerDetail = useSelector(
    (state) => state?.viewCustomer?.data || {}
  );
  const cusDelete = useSelector((state) => state?.customerDelete);
  const cusStatus = useSelector((state) => state?.customerStatus || {});

  useEffect(() => {
    if (itemId) {
      const queryParams = {
        user_id: itemId,
        fy: localStorage.getItem("FinancialYear"),
      };
      dispatch(customersView(queryParams));
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    setLoading(!customerDetail); //loading to true if user is falsy (e.g., null, undefined, false)
  }, [customerDetail]);

  //active and inactive
  const handleSwitchChange = async (e) => {
    let confirmed = null;
    if (confirmed === null) {
      const result = await Swal.fire({
        // title: 'Are you sure?',
        text: `Do you want to ${
          switchValue == "1" ? "Inactive" : "Active"
        } this customer ?`,
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      confirmed = result.isConfirmed;
    }
    const newValue = e.target.value;

    if (confirmed && itemId) {
      setSwitchValue(newValue);
      const sendData = {
        user_id: itemId,
        active: newValue,
      };
      dispatch(customerStatus(sendData))
        .then(() => {
          const toastMessage =
            newValue == "1"
              ? "Customer Is Now Active"
              : "Customer Is Now Inactive";
          toast.success(toastMessage);
          Navigate("/dashboard/customers");
        })
        .catch((error) => {
          toast.error("Failed to update item status");
          console.error("Error updating item status:", error);
          // Revert switch value if there's an error
          setSwitchValue((prevValue) => (prevValue == "1" ? "0" : "1"));
        });
    }
  };
  //panding and Approval

  const handleSwitchChange1 = async (e) => {
    const newValue = e.target.value;
    console.log("newValue", newValue);

    if (newValue == 0) {
      showToast("Approved Customer cannot be converted to pending", "error");
      return;
    }
    let confirmed = null;
    if (confirmed === null) {
      const result = await Swal.fire({
        // title: 'Are you sure?',
        text: `Do you want to ${
          switchValue1 == "1" ? "Pending" : "Approve"
        } this customer ?`,
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      confirmed = result.isConfirmed;
    }

    if (confirmed && itemId) {
      setSwitchValue1(newValue);
      const sendData = {
        user_id: itemId,
        status: newValue,
      };
      dispatch(customerStatus(sendData))
        .then(() => {
          const toastMessage =
            newValue == "1"
              ? "Customer Is Now Approve"
              : "Customer Is Now Pending";
          toast.success(toastMessage);
          Navigate("/dashboard/customers");
        })
        .catch((error) => {
          toast.error("Failed to update item status");
          console.error("Error updating item status:", error);
          // Revert switch value if there's an error
          setSwitchValue1((prevValue) => (prevValue == "1" ? "0" : "1"));
        });
    }
  };

  useEffect(() => {
    setLoading(!customerDetail?.user);
    setSwitchValue(customerDetail?.user?.active);
    setSwitchValue1(customerDetail.user?.status);
  }, [customerDetail?.user]);
  //active and inactive

  // edit and duplicate
  const handleEditCustomers = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", itemId);
    queryParams.set("edit", true);
    Navigate(`/dashboard/create-customer?${queryParams.toString()}`);
  };
  const handleDuplicateCustomers = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", itemId);
    queryParams.set("duplicate", true);
    Navigate(`/dashboard/create-customer?${queryParams.toString()}`);
  };

  // handleDeleteQuotation
  const handleDeleteQuotation = () => {
    if (itemId) {
      dispatch(deleteCustomer({ user_id: itemId }, Navigate));
    }
  };


  return (
    <>
      {cusStatus?.loading && <MainScreenFreezeLoader />}
      {cusDelete?.loading && <MainScreenFreezeLoader />}
      {loading ? (
        <Loader02 />
      ) : (
        <>
          <div id="Anotherbox">
            <div id="leftareax12">
              <h1 className="" id="firstheading">
                {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
                {customerDetail?.user?.display_name || ""}
              </h1>
              {/* <p id="firsttagp">Item</p>
              <p id="firsttagp">1 SKU</p> */}
            </div>
            <div id="buttonsdata">
              <div className="switchbuttontext">
                <div className="switches-container">
                  <input
                    type="radio"
                    id="switchMonthly1"
                    name="switchPlan1"
                    value="0"
                    checked={switchValue1 == "0"}
                    onChange={handleSwitchChange1}
                  />
                  <input
                    type="radio"
                    id="switchYearly1"
                    name="switchPlan1"
                    className="newinput"
                    value="1"
                    checked={switchValue1 == "1"}
                    onChange={handleSwitchChange1}
                  />
                  <label htmlFor="switchMonthly1">Pending</label>
                  <label htmlFor="switchYearly1">Approve</label>

                  <div className="switch-wrapper">
                    <div className="switch">
                      <div id="inactiveid">Pending</div>
                      <div>Approve</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="separatorx21"></div>

              <div className="switchbuttontext">
                <div className="switches-container">
                  <input
                    type="radio"
                    id="switchMonthly"
                    name="switchPlan"
                    value="0"
                    checked={switchValue == "0"}
                    onChange={handleSwitchChange}
                  />
                  <input
                    type="radio"
                    id="switchYearly"
                    name="switchPlan"
                    className="newinput"
                    value="1"
                    checked={switchValue == "1"}
                    onChange={handleSwitchChange}
                  />
                  <label htmlFor="switchMonthly">Inactive</label>
                  <label htmlFor="switchYearly">Active</label>
                  <div className="switch-wrapper">
                    <div className="switch">
                      <div id="inactiveid">Inactive</div>
                      <div>Active</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="separatorx21"></div>
              <div className="mainx1" onClick={handleEditCustomers}>
                <img src="/Icons/pen-clip.svg" alt="" />
                <p>Edit</p>
              </div>
              {/* <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef}>
                <img src="/Icons/menu-dots-vertical.svg" alt="" data-tooltip-content="More Options" data-tooltip-place='bottom' data-tooltip-id='my-tooltip' />
                {showDropdown && (
                  <div className="dropdownmenucustom" >
                    <div className='dmncstomx1' onClick={handleDuplicateCustomers}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#888888"} fill={"none"}>
                        <path d="M16 2H12C9.17157 2 7.75736 2 6.87868 2.94627C6 3.89254 6 5.41554 6 8.46154V9.53846C6 12.5845 6 14.1075 6.87868 15.0537C7.75736 16 9.17157 16 12 16H16C18.8284 16 20.2426 16 21.1213 15.0537C22 14.1075 22 12.5845 22 9.53846V8.46154C22 5.41554 22 3.89254 21.1213 2.94627C20.2426 2 18.8284 2 16 2Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M18 16.6082C17.9879 18.9537 17.8914 20.2239 17.123 21.0525C16.2442 22 14.8298 22 12.0011 22H8.00065C5.17192 22 3.75755 22 2.87878 21.0525C2 20.1049 2 18.5799 2 15.5298V14.4515C2 11.4014 2 9.87638 2.87878 8.92885C3.52015 8.2373 4.44682 8.05047 6.00043 8" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                      Duplicate</div>
                    <div className="bordersinglestroke"></div>
                    <div className='dmncstomx1' onClick={handleDeleteQuotation}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ff0000"} fill={"none"}>
                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M9 11.7349H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M10.5 15.6543H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Delete</div>
                  </div>
                )}
              </div> */}
              <Link
                className="linkx4"
                to={"/dashboard/customers"}
                data-tooltip-content="Close"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
              >
                <RxCross2 />
              </Link>
            </div>
          </div>

          <div id="item-details" className="listsectionsgrheigh">
            <InsideCusDetails
              customerDetails={customerDetail?.user}
              employees={customerDetail?.employees}
              family_members={customerDetail?.family_members}
              type="customer"
              // stockDetails={stock_details}
            />
            <div className="height50"></div>
            <div className="height50"></div>
            <div className="height50"></div>
            <div className="height50"></div>
          </div>
        </>
      )}
      <Toaster />
    </>
  );
};

export default CustomerDetails;
