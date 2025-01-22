import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import {
  tourPackagedeleteActions,
  tourPackageDetailsAction,
  tourPackagestatusActions,
} from "../../../../Redux/Actions/tourPackageActions";
import Attachment, { AttachmentPreview2 } from "../../../Helper/Attachment";
import ShowMastersValue from "../../../Helper/ShowMastersValue";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import Itinerary from "./Itinerary";

const TourPackageDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UrlId = new URLSearchParams(location.search).get("id");

  // Fetch data from Redux store
  const tourPackageDetails = useSelector((state) => state?.tourPackageDetail);
  const tourPackageData = tourPackageDetails?.data?.data?.data || {};
  const tourPackageStatusUpdate = useSelector(
    (state) => state?.tourPackageStatus
  );
  const tourPackageDeleteUpdate = useSelector(
    (state) => state?.tourPackageDelete
  );

  const [activeSection, setActiveSection] = useState("roomDetails");
  const [switchValue, setSwitchValue] = useState(tourPackageData?.status); // State for the switch button value

  useEffect(() => {
    if (UrlId) {
      const queryParams = {
        tour_id: UrlId,
      };
      dispatch(tourPackageDetailsAction(queryParams));
    }
  }, [dispatch, UrlId]);

  const handleEditItems = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);
    queryParams.set("edit", true);
    navigate(`/dashboard/create-tour-package?${queryParams.toString()}`);
  };

  const handleDeleteTourPackage = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this tour package?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        tour_id: item?.id,
      };
      dispatch(tourPackagedeleteActions(sendData, navigate));
    }
  };

  useEffect(() => {
    // Ensure the state is synced with the API response on component mount/update
    setSwitchValue(tourPackageData?.status);
  }, [tourPackageData]);

  const handleStatusChange = async (event) => {
    const value = event.target.value; // Get the selected value
    // Confirmation modal
    const result = await Swal.fire({
      text: `Do you want to ${value == 0 ? "Inactive" : "Active"
        } this tour package?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && UrlId) {
      setSwitchValue(value); // Update local state
      const sendData = {
        tour_id: UrlId,
        status: value,
      };
      dispatch(tourPackagestatusActions(sendData, navigate))
        .then(() => {
          navigate("/dashboard/tour-package-services");
        })
        .catch((error) => {
          toast.error("Failed to update tour package status");
          console.error("Error updating tour package status:", error);
          setSwitchValue((prevValue) => (prevValue == "1" ? "0" : "1"));
        });
    }
  };

  const attachments = JSON?.parse(tourPackageData?.upload_documents || "[]");

  return (
    <>
      {(tourPackageStatusUpdate?.loading ||
        tourPackageDeleteUpdate?.loading) && <MainScreenFreezeLoader />}
      {tourPackageDetails?.loading ? (
        <Loader02 />
      ) : (
        <>
          <div id="Anotherbox" className="formsectionx3">
            <div id="leftareax12">
              <h1 className="" id="firstheading">
                {tourPackageData?.package_name}
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
              <div
                data-tooltip-content="Edit"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
                //  className="mainx1"
                className="filtersorticos5wx2"
                onClick={handleEditItems}
              >
                <img src="/Icons/pen-clip.svg" alt="" />
                {/* <p>Edit</p> */}
              </div>
              <div
                data-tooltip-content="Delete"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
                className="filtersorticos5wx2"
                onClick={() => {
                  handleDeleteTourPackage(tourPackageData);
                }}
              >
                {otherIcons.delete_svg}
              </div>
              <Link className="linkx4" to={`/dashboard/tour-package-services`}>
                <RxCross2 />
              </Link>
            </div>
          </div>
          <div id="itemsdetailsrowskl" className="secondinsidedatax15s">
            <div className="buttonscontainxs2">
              <div
                className={`divac12cs32 ${activeSection === "roomDetails" ? "activediv12cs" : ""
                  }`}
                onClick={() => setActiveSection("roomDetails")}
              >
                Tour Package Details
              </div>
              <div
                className={`divac12cs32 ${activeSection === "itinerary" ? "activediv12cs" : ""
                  }`}
                onClick={() => setActiveSection("itinerary")}
              >
                Itinerary List
              </div>
            </div>

            <div className="insidcontain">
              {activeSection === "roomDetails" && (
                <>
                  <div className="inidbx1">
                    <div className="inidbx1s1">
                      <div className="inidbs1x1a1">
                        {otherIcons?.information_svg}
                        Tour Package Details
                      </div>
                      <ul>
                        <li className="pendingfromfrontendx5">
                          <span>Package Name</span>
                          <h1>:</h1>
                          <p>{tourPackageData?.package_name || "-"}</p>
                        </li>

                        <li>
                          <span>Destination</span>
                          <h1>:</h1>
                          <p>{tourPackageData?.destination || "-"}</p>
                        </li>
                        <li className="pendingfrombackendx5">
                          <span>Hotel Type</span>
                          <h1>:</h1>
                          <p>
                            <ShowMastersValue
                              type="35"
                              id={tourPackageData?.hotel_type}
                            />
                          </p>
                        </li>
                        <li className="pendingfrombackendx5">
                          <span>Days</span>
                          <h1>:</h1>
                          <p>{tourPackageData?.days || "-"} </p>
                        </li>
                        <li>
                          <span>Price</span>
                          <h1>:</h1>
                          <p>{tourPackageData?.price_per_person || "-"}</p>
                        </li>
                        <li>
                          <span>Meal</span>
                          <h1>:</h1>
                          <p>{tourPackageData?.meal_name || "-"}</p>
                        </li>
                        <li>
                          <span>Transport</span>
                          <h1>:</h1>
                          <p>
                            {tourPackageData?.is_transport == "1"
                              ? "Yes"
                              : "No" || "-"}
                          </p>
                        </li>

                        <li>
                          <span>Status</span>
                          <h1>:</h1>
                          <p>
                            {" "}
                            {tourPackageData?.status == "1"
                              ? "Active"
                              : tourPackageData?.status == "1"
                                ? "Inactive"
                                : ""}
                          </p>
                        </li>
                        <li>
                          <span>Description</span>
                          <h1>:</h1>
                          <p>{tourPackageData?.description || "-"}</p>
                        </li>

                        <li className="pendingfromfrontendx5">
                          <span>Attachment</span>
                          <h1>:</h1>
                          <p>
                            <AttachmentPreview2 attachments={attachments} />
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "itinerary" && (
                <div className="insidx23s2302">
                  <Itinerary data={tourPackageData} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <Toaster />
    </>
  );
};
export default TourPackageDetails;
