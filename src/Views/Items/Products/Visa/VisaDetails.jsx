import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader02 from "../../../../Components/Loaders/Loader02";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import {
  visadeleteActions,
  visaDetailsAction,
  visastatusActions,
} from "../../../../Redux/Actions/visaAction";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";

const VisaDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UrlId = new URLSearchParams(location.search).get("id");

  // Fetch data from Redux store
  const visaDetails = useSelector((state) => state?.visaDetails);
  const visaData = visaDetails?.data?.data?.data || {};
  const visaStatusUpdate = useSelector((state) => state?.visaStatus);
  const visaDeleteUpdate = useSelector((state) => state?.visaDelete);

  const [activeSection, setActiveSection] = useState("roomDetails");
  const [switchValue, setSwitchValue] = useState(visaData?.status); // State for the switch button value

  useEffect(() => {
    if (UrlId) {
      const queryParams = {
        visa_id: UrlId,
      };
      dispatch(visaDetailsAction(queryParams));
    }
  }, [dispatch, UrlId]);

  const handleEditItems = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);
    queryParams.set("edit", true);
    navigate(`/dashboard/create-visas?${queryParams.toString()}`);
  };
  const handleDeleteVisa = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this visa?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        visa_id: item?.id,
      };
      dispatch(visadeleteActions(sendData, navigate));
    }
  };

  useEffect(() => {
    // Ensure the state is synced with the API response on component mount/update
    setSwitchValue(visaData?.status);
  }, [visaData]);

  const handleStatusChange = async (event) => {
    const value = event.target.value; // Get the selected value
    // Confirmation modal
    const result = await Swal.fire({
      text: `Do you want to ${value == 0 ? "Inactive" : "Active"} this visa?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && UrlId) {
      setSwitchValue(value); // Update local state
      const sendData = {
        visa_id: UrlId,
        status: value,
      };
      dispatch(visastatusActions(sendData, navigate))
        .then(() => {
          navigate("/dashboard/visas-services");
        })
        .catch((error) => {
          toast.error("Failed to update visa status");
          console.error("Error updating visa status:", error);
          setSwitchValue((prevValue) => (prevValue == "1" ? "0" : "1"));
        });
    }
  };

  return (
    <>
     {(visaStatusUpdate?.loading || visaDeleteUpdate?.loading) && (
        <MainScreenFreezeLoader />
      )}
      {visaDetails?.loading ? (
        <Loader02 />
      ) : (
        <>
          <div id="Anotherbox" className="formsectionx3">
            <div id="leftareax12">
              <h1 className="" id="firstheading">
                {visaData?.visa_entry_name}
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
                  handleDeleteVisa(visaData);
                }}
              >
                {otherIcons.delete_svg}
              </div>
              <Link className="linkx4" to={`/dashboard/visas-services`}>
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
                Visa Details
              </div>
            </div>

            <div className="insidcontain">
              {activeSection === "roomDetails" && (
                <>
                  <div className="inidbx1">
                    <div className="inidbx1s1">
                      <div className="inidbs1x1a1">
                        {otherIcons?.information_svg}
                        Visa Details
                      </div>
                      <ul>
                        <li className="pendingfromfrontendx5">
                          <span>Visa Entry Type</span>
                          <h1>:</h1>
                          <p>{visaData?.visa_entry_name || "-"}</p>
                        </li>
                        <li className="pendingfrombackendx5">
                          <span>Visa Type</span>
                          <h1>:</h1>
                          <p>{visaData?.visa_type_name || "-"}</p>
                        </li>
                        <li>
                          <span>Country</span>
                          <h1>:</h1>
                          <p>{visaData?.country_name}</p>
                        </li>
                        <li className="pendingfrombackendx5">
                          <span>Days</span>
                          <h1>:</h1>
                          <p>{visaData?.days || "-"} </p>
                        </li>
                        <li>
                          <span>Price</span>
                          <h1>:</h1>
                          <p>{visaData?.price || "-"}</p>
                        </li>
                        <li>
                          <span>Status</span>
                          <h1>:</h1>
                          <p>
                            {" "}
                            {visaData?.status == "1"
                              ? "Active"
                              : visaData?.status == "0"
                              ? "Inactive"
                              : ""}
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
export default VisaDetails;
