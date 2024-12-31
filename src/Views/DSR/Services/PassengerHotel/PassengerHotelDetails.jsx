import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import Attachment, { Attachment2 } from "../../../Helper/Attachment";
import { formatDate3 } from "../../../Helper/DateFormat";
import ShowMastersValue from "../../../Helper/ShowMastersValue";
import {
  PassengerHotelDeleteActions,
  PassengerHotelDetailsAction,
} from "../../../../Redux/Actions/passengerHotelActions";
import { RxCross2 } from "react-icons/rx";

const PassengerHotelDetails = ({ data, showPopup, setShowPopup }) => {
  console.log("setShowPopup", setShowPopup)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemId = new URLSearchParams(location.search).get("id");

  const [activeSection, setActiveSection] = useState("roomDetails");

  const handleDeleteHotel = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this hotel?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        dsr_hotel_id: item?.id,
      };
      dispatch(PassengerHotelDeleteActions(sendData)).then((response) => {
        if (itemId) {
          const refreshData = {
            passenger_id: itemId,
          };
          dispatch(PassengerHotelDetailsAction(refreshData));
        }
      });
    }
  };

  const attachments = data?.upload_image || "";

  return (
    <>
      {data?.loading ? (
        <Loader02 />
      ) : (
        <>
          <div className="custom-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{data?.hotel_name}</h5>
                <button
                  className="close-button"
                  onClick={() => setShowPopup(false)}
                >
                  <RxCross2 />
                </button>
              </div>
              <div className="modal-body">
                <div id="itemsdetailsrowskl" className="secondinsidedatax15s">
                  <div className="insidcontain">
                    {activeSection === "roomDetails" && (
                      <>
                        <div className="inidbx1">
                          <div
                            className="inidbx1s1"
                            style={{ width: "1000px", background: "#f6f8fa" }}
                          >
                            <div
                              className="inidbs1x1a1"
                              style={{
                                background: "hsl(205deg 14.51% 91.94%)",
                              }}
                            >
                              {otherIcons?.information_svg}
                              Hotel Details
                            </div>
                            <ul>
                              <li className="pendingfromfrontendx5">
                                <span>Entry Type</span>
                                <h1>:</h1>
                                <p>{data?.entry_type || "-"}</p>
                              </li>
                              <li className="pendingfromfrontendx5">
                                <span>Hotel Name</span>
                                <h1>:</h1>
                                <p>{data?.hotel_name || "-"}</p>
                              </li>

                              <li>
                                <span>Room Name/No</span>
                                <h1>:</h1>
                                <p>{data?.room_id || "-"}</p>
                              </li>
                              <li>
                                <span>Bed</span>
                                <h1>:</h1>
                                <p>
                                  <ShowMastersValue
                                    type="38"
                                    id={data?.bed || ""}
                                  />
                                </p>
                              </li>
                              <li className="pendingfrombackendx5">
                                <span>Occupancy</span>
                                <h1>:</h1>
                                <p>
                                  <ShowMastersValue
                                    type="36"
                                    id={data?.occupancy_id}
                                  />
                                </p>
                              </li>
                              <li className="pendingfrombackendx5">
                                <span>Meal</span>
                                <h1>:</h1>
                                <p>
                                  <ShowMastersValue
                                    type="37"
                                    id={data?.meal_id || ""}
                                  />{" "}
                                </p>
                              </li>

                              <li>
                                <span>Guest</span>
                                <h1>:</h1>
                                <p>
                                
                                  {data?.guests
                                    ?.map((item) => item?.display_name)
                                    .filter(Boolean)
                                    .join(", ")}
                                </p>
                              </li>
                              <li>
                                <span>Booking Date</span>
                                <h1>:</h1>
                                <p>{formatDate3(data?.booking_date) || ""}</p>
                              </li>
                              <li>
                                <span>CheckIn Date</span>
                                <h1>:</h1>
                                <p>{formatDate3(data?.check_in_date) || ""}</p>
                              </li>
                              <li>
                                <span>CheckOut Date</span>
                                <h1>:</h1>
                                <p>{formatDate3(data?.check_out_date) || ""}</p>
                              </li>
                              <li>
                                <span>Supplier Name</span>
                                <h1>:</h1>
                                <p>{data?.supplier_name || ""}</p>
                              </li>
                              <li>
                                <span>Notes</span>
                                <h1>:</h1>
                                <p>{data?.note || ""}</p>
                              </li>

                              <li className="pendingfromfrontendx5">
                                <span>Attachment</span>
                                <h1>:</h1>
                                <p>
                                  <Attachment2 attachments={attachments} />
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Toaster />
    </>
  );
};
export default PassengerHotelDetails;
