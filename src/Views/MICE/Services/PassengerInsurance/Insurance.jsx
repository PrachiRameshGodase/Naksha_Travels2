import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import NoDataFound from "../../../../Components/NoDataFound/NoDataFound";
import TableViewSkeleton from "../../../../Components/SkeletonLoder/TableViewSkeleton";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import { PassengerMHotelDetailsAction } from "../../../../Redux/Actions/passengerMHotelActions";
import { passengerMInsuranceDeleteReducer } from "../../../../Redux/Reducers/passengerMInsuranceReducers";
import PaginationComponent from "../../../Common/Pagination/PaginationComponent";
import { formatDate3 } from "../../../Helper/DateFormat";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import PassengerInsuranceDetails from "./PassengerInsuranceDetails";
import { PassengerMInsuranceDeleteActions } from "../../../../Redux/Actions/passengerMInsuranceActions";

const Insurances = ({ data, totalItems }) => {
  const dispatch = useDispatch();

  const itemId = new URLSearchParams(location.search).get("id");
  const passengerData = useSelector(
    (state) => state?.passengerDetail?.data?.data || {}
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTrigger, setSearchTrigger] = useState(0);

  //logic for checkBox...
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleCheckboxChange = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows?.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  useEffect(() => {
    const areAllRowsSelected = data?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, data]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : data?.map((row) => row.id));
  };
  //logic for checkBox...

  const handleDeleteInsurance = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this insurance?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        mice_insurance_id: item?.id,
      };
      dispatch(PassengerMInsuranceDeleteActions(sendData)).then((response) => {
        if (itemId) {
          const refreshData = {
            passenger_id: itemId,
          };
          dispatch(PassengerMHotelDetailsAction(refreshData));
        }
      });
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [passHotelData, setPassengerHotelData] = useState("");
  const handleShowDetails = (item) => {
    setPassengerHotelData(item);
    setShowPopup((prev) => !prev);
  };

  return (
    <>
      <TopLoadbar />
      {passengerData?.loading && <MainScreenFreezeLoader />}
      <div id="middlesection">
        <div id="mainsectioncsls" className="commonmainqusalincetcsecion">
          <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
              <div id="newtableofagtheme">
                <div className="table-headerx12">
                  <div
                    className="table-cellx12 checkboxfx1"
                    id="styl_for_check_box"
                  >
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <div className="checkmark"></div>
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Passenger Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Company Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Policy No
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Issue Date
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Expiry Date
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.refrence_svg}
                    Family Member
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.refrence_svg}
                   Total Amount
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Action
                  </div>
                </div>

                {passengerData?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {data?.length >= 1 ? (
                      <>
                        {data?.map((item, index) => (
                          <div
                            className={`table-rowx12 ${
                              selectedRows.includes(item?.id)
                                ? "selectedresult"
                                : ""
                            }`}
                            key={index}
                          >
                            <div
                              className="table-cellx12 checkboxfx1"
                              id="styl_for_check_box"
                            >
                              <input
                                checked={selectedRows.includes(item?.id)}
                                type="checkbox"
                                onChange={() => handleCheckboxChange(item?.id)}
                              />
                              <div className="checkmark"></div>
                            </div>
                            <div className="table-cellx12 x125cd01">
                              {item?.passenger?.display_name || ""}
                            </div>

                            <div className="table-cellx12 x125cd01">
                              {item?.company_name || ""}
                            </div>
                            <div className="table-cellx12 x125cd01">
                              {item?.policy_no || ""}
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd">
                              {formatDate3(item?.issue_date) || ""}
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd">
                              {formatDate3(item?.expiry_date) || ""}
                            </div>
                            <div
                              className="table-cellx12 quotiosalinvlisxs3"
                              title={item?.guests
                                ?.map((data) => data?.display_name)
                                .filter(Boolean)
                                .join(",  ")}
                            >
                              {item?.guests
                                ?.map((data) => data?.display_name)
                                .filter(Boolean)
                                .join(",  ")}
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd">
                              {item?.total_amount || ""}
                            </div>
                            <div
                              // onClick={() => handleRowClicked(quotation)}
                              className="table-cellx12 x125cd01"
                            >
                              <span
                                onClick={() => {
                                  handleDeleteInsurance(item);
                                }}
                              >
                                {otherIcons.delete_svg}
                              </span>
                              <span
                                style={{
                                  cursor: "pointer",
                                  color: "gray",
                                  fontSize: "20px",
                                  marginLeft: "10px",
                                }}
                                onClick={() => {
                                  handleShowDetails(item);
                                }}
                              >
                                <BsEye />
                              </span>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <NoDataFound />
                    )}

                    <PaginationComponent
                      itemList={totalItems}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      setSearchCall={setSearchTrigger}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <PassengerInsuranceDetails
            data={passHotelData}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        )}
        <Toaster />
      </div>
    </>
  );
};

export default Insurances;
