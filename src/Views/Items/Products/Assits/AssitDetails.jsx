import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader02 from "../../../../Components/Loaders/Loader02";
import {
  assistdeleteActions,
  assistDetailsAction,
  assiststatusActions,
} from "../../../../Redux/Actions/assistAction";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";

const AssitDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UrlId = new URLSearchParams(location.search).get("id");

  // Fetch data from Redux store
  const assistRoomDetails = useSelector((state) => state?.assistDetails);
  const assistData = assistRoomDetails?.data?.data?.data || {};
  const assistStatusUpdate = useSelector((state) => state?.assistStatus);
  const assistDeleteUpdate = useSelector((state) => state?.assistDelete);

  const [switchValue, setSwitchValue] = useState(assistData?.status); // State for the switch button value
  const [activeSection, setActiveSection] = useState("roomDetails");

  useEffect(() => {
    if (UrlId) {
      const queryParams = {
        assist_id: UrlId,
      };
      dispatch(assistDetailsAction(queryParams));
    }
  }, [dispatch, UrlId]);

  const handleEditItems = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);
    queryParams.set("edit", true);
    navigate(`/dashboard/create-assists?${queryParams.toString()}`);
  };

  const handleDeleteAsssist = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this assist?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        assist_id: item?.id,
      };
      dispatch(assistdeleteActions(sendData, navigate));
    }
  };

  useEffect(() => {
    // Ensure the state is synced with the API response on component mount/update
    setSwitchValue(assistData?.status);
  }, [assistData]);

  const handleStatusChange = async (event) => {
    const value = event.target.value; // Get the selected value
   // Confirmation modal
    const result = await Swal.fire({
      text: `Do you want to ${value == 0 ? "Inactive" : "Active"} this assist?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && UrlId) {
      setSwitchValue(value); // Update local state
      const sendData = {
        assist_id: UrlId,
        status: value,
      };
      dispatch(assiststatusActions(sendData, navigate))
        .then(() => {
          navigate("/dashboard/assists-services");
        })
        .catch((error) => {
          toast.error("Failed to update assist status");
          console.error("Error updating assist status:", error);
          setSwitchValue((prevValue) => (prevValue == "1" ? "0" : "1"));
        });
    }
  };
  return (
    <>
    {(assistStatusUpdate?.loading || assistDeleteUpdate?.loading) && (
        <MainScreenFreezeLoader />
      )}
      {assistRoomDetails?.loading ? (
        <Loader02 />
      ) : (
        <>
          <div id="Anotherbox" className="formsectionx3">
            <div id="leftareax12">
              <h1 className="" id="firstheading">
                {assistData?.meeting_type || ""}
              </h1>
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
                <img src="/Icons/pen-clip.svg" alt="" />
              </div>
              <div
                data-tooltip-content="Delete"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
                className="filtersorticos5wx2"
                onClick={() => {
                  handleDeleteAsssist(assistData);
                }}
              >
                {otherIcons.delete_svg}
              </div>
              <Link className="linkx4" to={`/dashboard/assists-services`}>
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
                Assist Details
              </div>
            </div>

            <div className="insidcontain">
              {activeSection === "roomDetails" && (
                <>
                  <div className="inidbx1">
                    <div className="inidbx1s1">
                      <div className="inidbs1x1a1">
                        {otherIcons?.information_svg}
                        Assist Details
                      </div>
                      <ul>
                        <li>
                          <span>Meeting Type</span>
                          <h1>:</h1>
                          <p>{assistData?.meeting_type || "-"}</p>
                        </li>
                        <li className="pendingfrombackendx5">
                          <span>Airport</span>
                          <h1>:</h1>
                          <p>{assistData?.airport || "-"} </p>
                        </li>

                        <li>
                          <span>No of Persons</span>
                          <h1>:</h1>
                          <p>{assistData?.no_of_person || "-"}</p>
                        </li>
                        <li>
                          <span>Price</span>
                          <h1>:</h1>
                          <p>{assistData?.price || "-"}</p>
                        </li>
                        <li>
                          <span>Status</span>
                          <h1>:</h1>
                          <p>
                            {" "}
                            {assistData?.status == "1"
                              ? "Active"
                              : assistData?.status == "0"
                              ? "Inactive"
                              : ""}
                          </p>
                        </li>
                        <li>
                          <span>Description</span>
                          <h1>:</h1>
                          <p>{assistData?.description || "-"}</p>
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
export default AssitDetails;
