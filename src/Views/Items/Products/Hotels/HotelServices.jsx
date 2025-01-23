import React, { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ResizeFL from "../../../../Components/ExtraButtons/ResizeFL";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import NoDataFound from "../../../../Components/NoDataFound/NoDataFound";
import TableViewSkeleton from "../../../../Components/SkeletonLoder/TableViewSkeleton";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import { hotelRoomListAction } from "../../../../Redux/Actions/hotelActions";
import DatePicker from "../../../Common/DatePicker/DatePicker";
import PaginationComponent from "../../../Common/Pagination/PaginationComponent";
import SearchBox from "../../../Common/SearchBox/SearchBox";
import {
  useDebounceSearch,
} from "../../../Helper/HelperFunctions";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";


const HotelServices = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const itemPayloads = localStorage.getItem("salePayload");
  const hotelRoomListData = useSelector((state) => state?.hotelRoomList);
  const hotelRoomLists = hotelRoomListData?.data?.hotels || [];
  const totalItems = hotelRoomListData?.data?.count || 0;

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
      const fy = localStorage.getItem("FinancialYear");
      const currentpage = currentPage;

      const sendData = {
        hotel_id: data?.id
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



  return (
    <>
      <TopLoadbar />
      {hotelRoomListData?.loading && <MainScreenFreezeLoader />}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.warehouse_icon}
              All Room Services
            </h1>
            <p id="firsttagp">{totalItems} Records</p>
            <SearchBox
              placeholder="Search In Hotels"
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

            <DatePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              setSpecificDate={setSpecificDate}
              setClearFilter={setClearFilter}
              setSearchTrigger={setSearchTrigger}
              searchTrigger={searchTrigger}
              resetPageIfNeeded={resetPageIfNeeded}
            />

            {/* <FilterBy
              setStatus={setStatus}
              selectedSortBy={selectedSortBy2}
              setSearchTrigger={setSearchTrigger}
              setSelectedSortBy={setSelectedSortBy2}
              filterOptions=""
              resetPageIfNeeded={resetPageIfNeeded}
            /> */}

            <Link className="linkx1" to={`/dashboard/create-hotelservices?id=${data?.id}`}>
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
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.refrence_svg}
                    Meal
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {/* <p> */}
                    {otherIcons?.doller_svg}
                    Price
                    {/* </p> */}

                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                    {otherIcons?.status_svg}
                    Availability Status
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
                                onChange={() =>
                                  handleCheckboxChange(item?.id)
                                }
                              />
                              <div className="checkmark"></div>
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs1"
                            >

                              {item?.room_number || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              {item?.occupancy_name || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs2"
                            >
                              {item?.max_occupancy || ""}
                            </div>

                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs3"
                            >
                              {item?.bed_name || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs4"
                            >
                              {item?.meal_name || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs4"
                            >
                              {item?.price || ""}
                            </div>

                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
                            >
                              <p
                                className={
                                  item?.availability_status == "1"
                                    ? "open"
                                    : item?.availability_status == "0"
                                      ? "declined"
                                      : ""
                                }
                              >
                                {item?.availability_status == "1"
                                  ? "Available"
                                  : item?.availability_status == "0"
                                    ? "Unavailable"
                                    : ""}
                              </p>
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

        <Toaster />
      </div>
    </>
  );
};

export default HotelServices;
