import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import {
  hotelRoomDeleteActions,
  hotelRoomDetailsAction,
  hotelRoomStatusActions,
} from "../../../../Redux/Actions/hotelActions";
import Attachment from "../../../Helper/Attachment";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";

const HotelServicesDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UrlId = new URLSearchParams(location.search).get("id");

  // Fetch data from Redux store
  const hotelRoomDetails = useSelector((state) => state?.hotelRoomDetail);
  const hotelRoomData = hotelRoomDetails?.data?.data?.room || {};
  const hotelRoomStatusUpdate = useSelector((state) => state?.hotelRoomStatus);

  const [activeSection, setActiveSection] = useState("roomDetails");
  const [switchValue, setSwitchValue] = useState(
    hotelRoomData?.availability_status
  ); // State for the switch button value

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
    navigate(`/dashboard/create-hotelservices?${queryParams.toString()}`);
  };

  useEffect(() => {
    // Ensure the state is synced with the API response on component mount/update
    setSwitchValue(hotelRoomData?.status);
  }, [hotelRoomData]);

  const handleDeleteRoom = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this room?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        room_id: item?.id,
      };
      dispatch(hotelRoomDeleteActions(sendData, navigate));
    }
  };

  useEffect(() => {
    // Ensure the state is synced with the API response on component mount/update
    setSwitchValue(hotelRoomData?.availability_status);
  }, [hotelRoomData]);

  const handleStatusChange = async (event) => {
    const value = event.target.value; // Get the selected value
    // Confirmation modal
    const result = await Swal.fire({
      text: `Do you want to ${
        value == 0 ? "Unavialable" : "Available"
      } this assist?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && UrlId) {
      setSwitchValue(value); // Update local state
      const sendData = {
        room_id: UrlId,
        availability_status: value,
      };
      dispatch(hotelRoomStatusActions(sendData, navigate))
        .then(() => {
          navigate(`/dashboard/hotel-details?id=${UrlId}`);
        })
        .catch((error) => {
          toast.error("Failed to update room status");
          console.error("Error updating room status:", error);
          setSwitchValue((prevValue) => (prevValue == "1" ? "0" : "1"));
        });
    }
  };

  const attachments = JSON.parse(hotelRoomData?.upload_documents || "[]");

  return (
    <>
      {hotelRoomStatusUpdate?.loading && <MainScreenFreezeLoader />}

      {hotelRoomDetails?.loading ? (
        <Loader02 />
      ) : (
        <>
          <div id="Anotherbox" className="formsectionx3">
            <div id="leftareax12">
              <h1 className="" id="firstheading">
                {hotelRoomData?.room_number}
              </h1>
            </div>
            <div id="buttonsdata">
              <div className="switchbuttontext">
                <div className="switches-container" style={{ width: "160px" }}>
                  {/* Inactive Radio */}
                  <input
                    type="radio"
                    id="switchMonthly"
                    name="switchPlan"
                    value="0"
                    checked={switchValue == "0"} // Ensure string comparison
                    onChange={handleStatusChange}
                  />
                  <label htmlFor="switchMonthly">Unavailable</label>

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
                  <label htmlFor="switchYearly">Available</label>

                  <div className="switch-wrapper">
                    <div className="switch">
                      <div id="inactiveid">Unavailable</div>
                      <div>Available</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-tooltip-content="Edit"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
                className="filtersorticos5wx2"
                onClick={handleEditItems}
              >
                <img src="/Icons/pen-clip.svg" alt="" />
              </div>
              {/* <div
                data-tooltip-content="Delete"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
                className="filtersorticos5wx2"
                onClick={() => {
                  handleDeleteRoom(hotelRoomData);
                }}
              >
                {otherIcons.delete_svg}
              </div> */}
              <Link
                className="linkx4"
                to={`/dashboard/hotel-details?id=${hotelRoomData?.hotel_id}`}
              >
                <RxCross2 />
              </Link>
            </div>
          </div>
          <div id="itemsdetailsrowskl" className="secondinsidedatax15s">
            <div className="buttonscontainxs2">
              <div
                className={`divac12cs32 ${
                  activeSection === "roomDetails" ? "activediv12cs" : ""
                }`}
                onClick={() => setActiveSection("roomDetails")}
              >
                Room Details
              </div>
            </div>

            <div className="insidcontain">
              {activeSection === "roomDetails" && (
                <>
                  <div className="inidbx1">
                    <div className="inidbx1s1">
                      <div className="inidbs1x1a1">
                        {otherIcons?.information_svg}
                        Room Details
                      </div>
                      <ul>
                        <li className="pendingfromfrontendx5">
                          <span>Room Name/Number</span>
                          <h1>:</h1>
                          <p>{hotelRoomData?.room_number || "-"}</p>
                        </li>
                        <li className="pendingfrombackendx5">
                          <span>Occupancy</span>
                          <h1>:</h1>
                          <p>{hotelRoomData?.occupancy_name || "-"}</p>
                        </li>
                        <li>
                          <span>Max Occupancy</span>
                          <h1>:</h1>
                          <p>{hotelRoomData?.max_occupancy}</p>
                        </li>
                        <li className="pendingfrombackendx5">
                          <span>Bed</span>
                          <h1>:</h1>
                          <p>{hotelRoomData?.bed_name || "-"} </p>
                        </li>
                        <li>
                          <span>Meal</span>
                          <h1>:</h1>
                          <p>{hotelRoomData?.meal_name || "-"}</p>
                        </li>
                        <li>
                          <span>Price</span>
                          <h1>:</h1>
                          <p>{hotelRoomData?.price || "-"}</p>
                        </li>
                        <li>
                          <span>Status</span>
                          <h1>:</h1>
                          <p>
                            {" "}
                            {hotelRoomData?.availability_status == "1"
                              ? "Available"
                              : hotelRoomData?.availability_status == "0"
                              ? "Unavailable"
                              : ""}
                          </p>
                        </li>
                        <li>
                          <span>Description</span>
                          <h1>:</h1>
                          <p>{hotelRoomData?.description || "-"}</p>
                        </li>

                        <li className="pendingfromfrontendx5">
                          <span>Attachment</span>
                          <h1>:</h1>
                          <p>
                            <Attachment attachments={attachments} />
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <Toaster />
    </>
  );
};
export default HotelServicesDetails;
