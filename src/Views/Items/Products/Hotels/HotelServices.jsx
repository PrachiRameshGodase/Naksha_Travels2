import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ResizeFL from "../../../../Components/ExtraButtons/ResizeFL";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import NoDataFound from "../../../../Components/NoDataFound/NoDataFound";
import TableViewSkeleton from "../../../../Components/SkeletonLoder/TableViewSkeleton";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import {
  hotelRoomDeleteActions,
  hotelRoomListAction,
  hotelRoomStatusActions,
} from "../../../../Redux/Actions/hotelActions";
import DatePicker from "../../../Common/DatePicker/DatePicker";
import PaginationComponent from "../../../Common/Pagination/PaginationComponent";
import SearchBox from "../../../Common/SearchBox/SearchBox";
import {
  currencySymbol,
  useDebounceSearch,
} from "../../../Helper/HelperFunctions";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import { BsEye } from "react-icons/bs";
import Swal from "sweetalert2";
import { MdArrowOutward } from "react-icons/md";
import HotelServicesDetails from "./HotelServicesDetails";
import CreateHotelService from "./CreateHotelService";
import { financialYear } from "../../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const HotelServices = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemPayloads = localStorage.getItem("salePayload");
  const hotelRoomListData = useSelector((state) => state?.hotelRoomList);
  const hotelRoomLists = hotelRoomListData?.data?.hotels || [];
  const totalItems = hotelRoomListData?.data?.count || 0;
  const hotelRoomStatusUpdate = useSelector((state) => state?.hotelRoomStatus);

  console.log("hotelRoomLists", hotelRoomLists)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTrigger, setSearchTrigger] = useState(0);

  // reset current page to 1 when any filters are applied
  const resetPageIfNeeded = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  // serch,filterS and sortby////////////////////////////////////

  // sortBy
  const [selectedSortBy, setSelectedSortBy] = useState("Normal");
  const [sortOrder, setSortOrder] = useState(1);
  //sortby

  //date range picker
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [specificDate, setSpecificDate] = useState(null);
  const [clearFilter, setClearFilter] = useState(true);
  //date range picker

  // filter
  const [selectedSortBy2, setSelectedSortBy2] = useState("Normal");
  const [status, setStatus] = useState("");
  // filter

  //Search/////////////////////////////////////////////////////////////
  const [searchTermFromChild, setSearchTermFromChild] = useState("");
  // Debounced function to trigger search
  const debouncedSearch = useDebounceSearch(() => {
    setSearchTrigger((prev) => prev + 1);
  }, 800);

  // Handle search term change from child component
  const onSearch = (term) => {
    setSearchTermFromChild(term);
    if (term.length > 0 || term === "") {
      debouncedSearch();
    }
  };
  //Search/////////////////////////////////////////////////////////////

  // serch,filterS and sortby////////////////////////////////////

  const fetchHotels = useCallback(async () => {
    try {
      const fy = financialYear();
      const currentpage = currentPage;

      const sendData = {
        hotel_id: data?.id,
        // fy,
        // noofrec: itemsPerPage,
        // currentpage,
        // ...(selectedSortBy !== "Normal" && {
        //   sort_by: selectedSortBy,
        //   sort_order: sortOrder,
        // }),
        // ...(status && {
        //   status: status == "expiry_date" ? 6 : status,
        //   ...(status == "expiry_date" && { expiry_date: 1 }),
        // }),
        // ...(searchTermFromChild && { search: searchTermFromChild }),
        // ...(clearFilter === false && {
        //   ...(specificDate
        //     ? { custom_date: formatDate(new Date(specificDate)) }
        //     : dateRange[0]?.startDate &&
        //       dateRange[0]?.endDate && {
        //         from_date: formatDate(new Date(dateRange[0].startDate)),
        //         to_date: formatDate(new Date(dateRange[0].endDate)),
        //       }),
        // }),
      };

      dispatch(hotelRoomListAction(sendData));
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    const parshPayload = JSON?.parse(itemPayloads);
    // if (
    //   searchTrigger ||
    //   parshPayload?.search ||
    //   parshPayload?.name ||
    //   parshPayload?.sort_by ||
    //   parshPayload?.status ||
    //   parshPayload?.custom_date ||
    //   parshPayload?.from_date ||
    //   parshPayload?.currentpage > 1
    // ) {
    fetchHotels();
    // }
  }, [searchTrigger]);

  const handleRowClicked = (room) => {
    navigate(`/dashboard/hotel-service-details?id=${room.id}`);
  };

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
    const areAllRowsSelected = hotelRoomListData?.data?.hotels?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, hotelRoomListData?.data?.hotels]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll ? [] : hotelRoomListData?.data?.hotels?.map((row) => row.id)
    );
  };
  //logic for checkBox...

  const [showPopup, setShowPopup] = useState(false);
  const [passHotelData, setPassengerHotelData] = useState("");

  const handleShowDetails = (item) => {

    setPassengerHotelData(item);
    setShowPopup((prev) => !prev);
  };

  const handleStatusChange = async (item) => {
    const newValue = item?.availability_status == "1" ? "0" : "1"; // Toggle status
    const actionText = newValue == "0" ? "Unavialable" : "Avialable";

    // Confirmation modal
    const result = await Swal.fire({
      text: `Do you want to make this room ${actionText}?`,

      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && item?.id) {
      const sendData = {
        room_id: item?.id,
        availability_status: newValue,
      };
      const sendData2 = {
        hotel_id: item?.hotel_id,
      };
      dispatch(hotelRoomStatusActions(sendData, sendData2))
        .then(() => { })
        .catch((error) => {
          toast.error("Failed to update room status");
          console.error("Error updating room status:", error);
        });
    }
  };
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
        hotel_id: item?.hotel_id,
      };
      const sendData2 = {
        hotel_id: item?.hotel_id,
      };
      dispatch(hotelRoomDeleteActions(sendData, sendData2));
    }
  };

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [passRoomData, setPassRoomData] = useState("");
  // console.log("passHotelData", passRoomData)

  const handleEditRoom = (item) => {
    setPassRoomData(item);
    setShowAddPopup((prev) => !prev);
  };
  return (
    <>
      <TopLoadbar />
      {hotelRoomListData?.loading ||
        (hotelRoomStatusUpdate?.loading && <MainScreenFreezeLoader />)}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.warehouse_icon}
              All Room Services
            </h1>
            <p id="firsttagp">
              {totalItems} Records{" "}
              <span
                className={`${hotelRoomListData?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger((prev) => prev + 1)}
              >
                {otherIcons?.refresh_svg}
              </span>
            </p>
            <SearchBox
              placeholder="Search In Rooms"
              onSearch={onSearch}
              section={searchTrigger}
            />
          </div>

          <div id="buttonsdata">
            {/* <SortBy
              setSearchTrigger={setSearchTrigger}
              selectedSortBy={selectedSortBy}
              setSelectedSortBy={setSelectedSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortOptions=""
              resetPageIfNeeded={resetPageIfNeeded}
            /> */}

            {/* <DatePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              setSpecificDate={setSpecificDate}
              setClearFilter={setClearFilter}
              setSearchTrigger={setSearchTrigger}
              searchTrigger={searchTrigger}
              resetPageIfNeeded={resetPageIfNeeded}
            /> */}

            {/* <FilterBy
              setStatus={setStatus}
              selectedSortBy={selectedSortBy2}
              setSearchTrigger={setSearchTrigger}
              setSelectedSortBy={setSelectedSortBy2}
              filterOptions=""
              resetPageIfNeeded={resetPageIfNeeded}
            /> */}

            <Link className="linkx1" onClick={() => setShowAddPopup(true)}>
              New Room <GoPlus />
            </Link>
            <ResizeFL />
          </div>
        </div>

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
                    Room Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.customer_svg}
                    Occupancy
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.customer_svg}
                    Max Occupancy
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.refrence_svg}
                    Bed
                  </div>
                  {/* <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.refrence_svg}
                    Meal
                  </div> */}
                  <div className="table-cellx12 quotiosalinvlisxs6_item">
                    <p>({currencySymbol}) Price</p>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                    {otherIcons?.status_svg}
                    Availability Status
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Actions
                  </div>
                </div>

                {hotelRoomListData?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {hotelRoomLists.length >= 1 ? (
                      <>
                        {hotelRoomLists.map((item, index) => (
                          <div
                            className={`table-rowx12 ${selectedRows.includes(item?.id)
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
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              {item?.room_number || ""}
                            </div>
                            <div
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              {item?.occupancy_name || ""}
                            </div>
                            <div
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs2"
                            >
                              {item?.max_occupancy || ""}
                            </div>

                            <div
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs3"
                            >
                              {item?.bed_name || ""}
                            </div>
                            {/* <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs4"
                            >
                              {item?.meal_name || ""}
                            </div> */}
                            <div
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs5_item"
                            >
                              <p style={{ width: "60%" }}>
                                {" "}
                                {item?.price || ""}
                              </p>
                            </div>

                            <div
                              onClick={() => {
                                handleStatusChange(item);
                              }}
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Clicking on the arrow will update the room status"
                              data-tooltip-place="bottom"
                              className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
                            >
                              <p
                                className={
                                  item?.availability_status == "1"
                                    ? "active1"
                                    : item?.availability_status == "0"
                                      ? "inactive1"
                                      : ""
                                }
                              >
                                {item?.availability_status == "1"
                                  ? "Available"
                                  : item?.availability_status == "0"
                                    ? "Unavailable"
                                    : ""}
                                <span>
                                  <MdArrowOutward />
                                </span>
                              </p>
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs6">
                              <span
                                onClick={() => {
                                  handleEditRoom(item);
                                }}
                              >
                                {otherIcons.edit_svg}
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
          <HotelServicesDetails
            data={passHotelData}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        )}

        {showAddPopup && (
          <CreateHotelService
            data={passRoomData}
            showPopup={showAddPopup}
            setShowPopup={setShowAddPopup}
          />
        )}

        <Toaster />
      </div>
    </>
  );
};

export default HotelServices;
