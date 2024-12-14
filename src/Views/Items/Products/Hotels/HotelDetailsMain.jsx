import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader02 from "../../../../Components/Loaders/Loader02";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import {
  hotelDeleteActions,
  hotelDetailsAction,
  hotelStatusActions,
} from "../../../../Redux/Actions/hotelActions";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import HotelDetails from "./HotelDetails";
import Swal from "sweetalert2";

const HotelDetailsMain = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const itemId = new URLSearchParams(location.search).get("id");

  const hotelDetails = useSelector((state) => state?.hotelDetail);
  const hotelData = hotelDetails?.data?.data?.hotels || {};
  const hotelStatusUpdated = useSelector((state) => state?.hotelStatus);
  const hotelDeleted = useSelector((state) => state?.hotelDelete);

  const [switchValue, setSwitchValue] = useState(hotelData?.status); // State for the switch button value

  useEffect(() => {
    if (itemId) {
      const queryParams = {
        hotel_id: itemId,
        fy: localStorage.getItem("FinancialYear"),
      };
      dispatch(hotelDetailsAction(queryParams));
    }
  }, [dispatch, itemId]);

  const handleEditItems = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", itemId);
    queryParams.set("edit", true);
    navigate(`/dashboard/create-hotels?${queryParams.toString()}`);
  };

  const handleDeleteHotel = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this hotel?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        hotel_id: item?.id,
      };
      dispatch(hotelDeleteActions(sendData, navigate));
    }
  };

  useEffect(() => {
    // Ensure the state is synced with the API response on component mount/update
    setSwitchValue(hotelData?.status);
  }, [hotelData]);

  const handleStatusChange = async (event) => {
    const value = event.target.value; // Get the selected value
    // Confirmation modal
    const result = await Swal.fire({
      text: `Do you want to ${value == 0 ? "Inactive" : "Active"} this hotel?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && itemId) {
      setSwitchValue(value); // Update local state
      const sendData = {
        hotel_id: itemId,
        status: value,
      };
      dispatch(hotelStatusActions(sendData, navigate))
        .then(() => {
          navigate("/dashboard/hotels-services");
        })
        .catch((error) => {
          toast.error("Failed to update hotel status");
          console.error("Error updating hotel status:", error);
          setSwitchValue((prevValue) => (prevValue == "1" ? "0" : "1"));
        });
    }
  };

  return (
    <>
      {hotelDeleted?.loading && <MainScreenFreezeLoader />}
      {hotelStatusUpdated?.loading && <MainScreenFreezeLoader />}
      {hotelDetails?.loading ? (
        <Loader02 />
      ) : (
        <div className="formsectionsgrheigh">
          <div id="Anotherbox" className="formsectionx3">
            <div id="leftareax12">
              <h1 id="firstheading">{hotelData?.hotel_name}</h1>
            </div>
            <div id="buttonsdata">
              <div className="switchbuttontext">
                <div className="switches-container">
                  {/* Inactive Radio */}
                  <input
                    type="radio"
                    id="switchMonthly"
                    name="switchPlan"
                    value="0"
                    checked={switchValue == "0"} // Ensure string comparison
                    onChange={handleStatusChange}
                  />
                  <label htmlFor="switchMonthly">Inactive</label>

                  {/* Active Radio */}
                  <input
                    type="radio"
                    id="switchYearly"
                    name="switchPlan"
                    value="1"
                    checked={switchValue == "1"} // Ensure string comparison
                    onChange={handleStatusChange}
                    className="newinput"
                  />
                  <label htmlFor="switchYearly">Active</label>

                  <div className="switch-wrapper">
                    <div className="switch">
                      <div id="inactiveid">Inactive</div>
                      <div>Active</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="separatorx21"></div> */}
              <div
                data-tooltip-content="Edit"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
                className="filtersorticos5wx2"
                onClick={handleEditItems}
              >
                {otherIcons.edit_svg}
              </div>
              <div
                data-tooltip-content="Delete"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
                className="filtersorticos5wx2"
                onClick={() => {
                  handleDeleteHotel(hotelData);
                }}
              >
                {otherIcons.delete_svg}
              </div>
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
      )}
    </>
  );
};

export default HotelDetailsMain;
