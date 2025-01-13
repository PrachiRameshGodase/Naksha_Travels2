import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NoDataFound from "../../../../Components/NoDataFound/NoDataFound";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import { PassengerMFlightDeleteActions } from "../../../../Redux/Actions/passengerMFlightActions";
import { PassengerMHotelDetailsAction } from "../../../../Redux/Actions/passengerMHotelActions";
import PaginationComponent from "../../../Common/Pagination/PaginationComponent";
import { formatDate3 } from "../../../Helper/DateFormat";
import ShowMastersValue from "../../../Helper/ShowMastersValue";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import PassengerFlightDetails from "./PassengerFlightDetails.";

const Flights = ({ data, totalItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemId = new URLSearchParams(location.search).get("id");
  const passengerData = useSelector((state) => state?.passengerDetail?.data?.data || {});
 
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

  const handleDeleteFlight = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this flight?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        mice_flight_id: item?.id,
      };
      dispatch(PassengerMFlightDeleteActions(sendData)).then((response) => {
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
      {/* {passengerData?.loading && <Loader02 />} */}
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

                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.quotation_icon}
                    Travel Date
                  </div>

                  {/* <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.status_svg}
                    Travel Type
                  </div> */}

                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.status_svg}
                    Airline Name
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.status_svg}
                    Family Member
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.status_svg}
                    GDS Portal
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.status_svg}
                    Ticket No
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.status_svg}
                    PRN No
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs5">
                    {otherIcons?.status_svg}
                    Route
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Actions
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
                            <div
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              {formatDate3(item?.travel_date) || ""}
                            </div>
                            {/* <div
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              <ShowMastersValue
                                type="51"
                                id={item?.travel_type_id}
                              />
                            </div> */}
                             <div
                              className="table-cellx12 quotiosalinvlisxs2"
                            >
                              {item?.airline_name || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs2"
                              title={item?.guests?.map((data) => data?.display_name)
                                .filter(Boolean)
                                .join(",  ")}
                            >
                              {item?.guests
                                ?.map((data) => data?.display_name)
                                .filter(Boolean)
                                .join(",  ")}
                            </div>
                           
                            <div
                              className="table-cellx12 quotiosalinvlisxs2"
                            >
                              {item?.gds_portal || ""}
                            </div>
                            <div
                              className="table-cellx12 quotiosalinvlisxs3"
                            >
                              {item?.ticket_no || ""}
                            </div>
                            <div
                              className="table-cellx12 quotiosalinvlisxs3"
                            >
                              {item?.prn_no || ""}
                            </div>
                            <div
                              className="table-cellx12 quotiosalinvlisxs4"
                            >
                              {item?.route || ""}
                            </div>

                            <div
                              className="table-cellx12 quotiosalinvlisxs6"
                            >
                              <span
                                onClick={() => {
                                  handleDeleteFlight(item);
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
          <PassengerFlightDetails
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

export default Flights;
