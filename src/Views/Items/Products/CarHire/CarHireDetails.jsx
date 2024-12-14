import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import {
  carHiredeleteActions,
  carHireDetailsAction,
  carHirestatusActions,
} from "../../../../Redux/Actions/carHireActions";
import ShowMastersValue from "../../../Helper/ShowMastersValue";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";

const CarHireDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UrlId = new URLSearchParams(location.search).get("id");

  // Fetch data from Redux store
  const carHireDetails = useSelector((state) => state?.carHireDetails);
  const carHireData = carHireDetails?.data?.data?.data || {};
  const carHireStatusUpdate = useSelector((state) => state?.carHireStatus);
  const carHireDeleteUpdate = useSelector((state) => state?.carHireDelete);

  const [activeSection, setActiveSection] = useState("roomDetails");
  const [switchValue, setSwitchValue] = useState(carHireData?.status); // State for the switch button value

  useEffect(() => {
    if (UrlId) {
      const queryParams = {
        car_hire_id: UrlId,
      };
      dispatch(carHireDetailsAction(queryParams));
    }
  }, [dispatch, UrlId]);

  const handleEditItems = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);
    queryParams.set("edit", true);
    navigate(`/dashboard/create-car-hire?${queryParams.toString()}`);
  };

  const handleDeleteCarHire = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this car hire?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        car_hire_id: item?.id,
      };
      dispatch(carHiredeleteActions(sendData, navigate));
    }
  };

  useEffect(() => {
    // Ensure the state is synced with the API response on component mount/update
    setSwitchValue(carHireData?.status);
  }, [carHireData]);

  const handleStatusChange = async (event) => {
    const value = event.target.value; // Get the selected value
    console.log("Selected Value:", value);
    // Confirmation modal
    const result = await Swal.fire({
      text: `Do you want to ${value == 0 ? "Inactive" : "Active"} this car hire?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && UrlId) {
      setSwitchValue(value); // Update local state
      const sendData = {
        car_hire_id: UrlId,
        status: value,
      };
      dispatch(carHirestatusActions(sendData, navigate))
        .then(() => {
          navigate("/dashboard/car-hire-services");
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
    {(carHireStatusUpdate?.loading || carHireDeleteUpdate?.loading) && (
        <MainScreenFreezeLoader />
      )}
      {carHireDetails?.loading ? (
        <Loader02 />
      ) : (
        <>
          <div id="Anotherbox" className="formsectionx3">
            <div id="leftareax12">
              <h1 className="" id="firstheading">
                <ShowMastersValue type="41" id={carHireData?.type_of_vehicle} />
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
                  handleDeleteCarHire(carHireData);
                }}
              >
                {otherIcons.delete_svg}
              </div>
              <Link className="linkx4" to={`/dashboard/car-hire-services`}>
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
                Car Hire Details
              </div>
            </div>

            <div className="insidcontain">
              {activeSection === "roomDetails" && (
                <>
                  <div className="inidbx1">
                    <div className="inidbx1s1">
                      <div className="inidbs1x1a1">
                        {otherIcons?.information_svg}
                        Car Hire Details
                      </div>
                      <ul>
                        <li>
                          <span>Vechile Type</span>
                          <h1>:</h1>
                          <p>
                            <ShowMastersValue
                              type="41"
                              id={carHireData?.type_of_vehicle}
                            />
                          </p>
                        </li>
                        <li className="pendingfrombackendx5">
                          <span>Day</span>
                          <h1>:</h1>
                          <p>{carHireData?.select_days || "-"} </p>
                        </li>
                        <li>
                          <span>Price</span>
                          <h1>:</h1>
                          <p>{carHireData?.price || "-"}</p>
                        </li>
                        <li>
                          <span>Status</span>
                          <h1>:</h1>
                          <p>
                            {" "}
                            {carHireData?.status == "1"
                              ? "Active"
                              : carHireData?.status == "0"
                              ? "Inactive"
                              : ""}
                          </p>
                        </li>
                        <li>
                          <span>Description</span>
                          <h1>:</h1>
                          <p>{carHireData?.description || "-"}</p>
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
export default CarHireDetails;
