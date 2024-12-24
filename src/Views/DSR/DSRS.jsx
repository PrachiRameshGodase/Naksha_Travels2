import React, { useCallback, useEffect, useState } from "react";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import { Toaster } from "react-hot-toast";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../Helper/DateFormat";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import SearchBox from "../Common/SearchBox/SearchBox";
import SortBy from "../Common/SortBy/SortBy";
import DatePicker from "../Common/DatePicker/DatePicker";
import FilterBy from "../Common/FilterBy/FilterBy";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import { useDebounceSearch } from "../Helper/HelperFunctions";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import ResizeFL from "../../Components/ExtraButtons/ResizeFL";
import ShowMastersValue from "../Helper/ShowMastersValue";

const DSRS = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemPayloads = localStorage.getItem("salePayload");
  const hotelListData = useSelector((state) => state?.hotelList);
  const hotelLists = hotelListData?.data?.hotels || [];
  const totalItems = hotelListData?.data?.total_hotels || 0;

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
        fy,
        noofrec: itemsPerPage,
        currentpage,
        ...(selectedSortBy !== "Normal" && {
          sort_by: selectedSortBy,
          sort_order: sortOrder,
        }),
        ...(status && {
          status: status == "expiry_date" ? 6 : status,
          ...(status == "expiry_date" && { expiry_date: 1 }),
        }),
        ...(searchTermFromChild && { search: searchTermFromChild }),
        ...(clearFilter === false && {
          ...(specificDate
            ? { custom_date: formatDate(new Date(specificDate)) }
            : dateRange[0]?.startDate &&
              dateRange[0]?.endDate && {
                from_date: formatDate(new Date(dateRange[0].startDate)),
                to_date: formatDate(new Date(dateRange[0].endDate)),
              }),
        }),
      };

    //   dispatch(hotelListAction(sendData));
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    // const parshPayload = parseJSONofString(itemPayloads);
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

  const handleRowClicked = (quotation) => {
    navigate(`/dashboard/dsr-details?id=${quotation.id}`);
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
    const areAllRowsSelected = hotelListData?.data?.quotations?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, hotelListData?.data?.quotations]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll ? [] : hotelListData?.data?.quotations?.map((row) => row.id)
    );
  };
  //logic for checkBox...

  return (
    <>
      <TopLoadbar />
      {hotelListData?.loading && <MainScreenFreezeLoader />}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.warehouse_icon}
              All DSRS
            </h1>
            <p id="firsttagp">{totalItems} Records</p>
            <SearchBox
              placeholder="Search In DSRS"
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

            <Link className="linkx1" to={"/dashboard/create-dsr"}>
              New DSR <GoPlus />
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
                  Customer Name
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.quotation_icon}
                  Company Name
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.customer_svg}
                   Currency
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.refrence_svg}
                    Email
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.refrence_svg}
                    Mobile No
                  </div>
                 
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Status
                  </div>
                </div>

                {hotelListData?.loading ? (
                  <TableViewSkeleton />
                ) : (
                //   <>
                //     {hotelLists?.length >= 1 ? (
                //       <>
                //         {hotelLists.map((item, index) => (
                //           <div
                //             className={`table-rowx12 ${
                //               selectedRows.includes(item?.id)
                //                 ? "selectedresult"
                //                 : ""
                //             }`}
                //             key={index}
                //           >
                //             <div
                //               className="table-cellx12 checkboxfx1"
                //               id="styl_for_check_box"
                //             >
                //               <input
                //                 checked={selectedRows.includes(item?.id)}
                //                 type="checkbox"
                //                 onChange={() => handleCheckboxChange(item?.id)}
                //               />
                //               <div className="checkmark"></div>
                //             </div>
                //             <div
                //               onClick={() => handleRowClicked(item)}
                //               className="table-cellx12 quotiosalinvlisxs1"
                //             >
                //                 ABC Enterprises
                //               {/* {item?.hotel_name || ""} */}
                //             </div>
                //             <div
                //               onClick={() => handleRowClicked(item)}
                //               className="table-cellx12 quotiosalinvlisxs1"
                //             >
                //               <ShowMastersValue
                //                 type="35"
                //                 id={item?.hotel_type}
                //               />
                //             </div>
                //             <div
                //               onClick={() => handleRowClicked(item)}
                //               className="table-cellx12 quotiosalinvlisxs3"
                //               data-tooltip-id="my-tooltip"
                //               data-tooltip-content={item?.address_line_1 || ""}
                //             >
                //               {item?.address_line_1?.split(" ").length > 20
                //                 ? item.address_line_1
                //                     .split(" ")
                //                     .slice(0, 20)
                //                     .join(" ") + "..."
                //                 : item?.address_line_1 || ""}
                //             </div>
                //             <div
                //               onClick={() => handleRowClicked(item)}
                //               className="table-cellx12 quotiosalinvlisxs4"
                //             >
                //               {item?.country?.name || ""}
                //             </div>
                            
                //             <div
                //               onClick={() => handleRowClicked(item)}
                //               className="table-cellx12 quotiosalinvlisxs4"
                //             >
                //               {item?.country?.name || ""}
                //             </div>
                //             <div
                //               onClick={() => handleRowClicked(quotation)}
                //               className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
                //             >
                //               <p
                //                 className={
                //                   item?.status == "1"
                //                     ? "open"
                //                     : item?.status == "0"
                //                     ? "declined"
                //                     : ""
                //                 }
                //               >
                //                 {item?.status == "1"
                //                   ? "Active"
                //                   : item?.status == "0"
                //                   ? "Inactive"
                //                   : ""}
                //               </p>
                //             </div>
                //           </div>
                //         ))}
                //       </>
                //     ) : (
                //       <NoDataFound />
                //     )}

                //     <PaginationComponent
                //       itemList={totalItems}
                //       currentPage={currentPage}
                //       setCurrentPage={setCurrentPage}
                //       itemsPerPage={itemsPerPage}
                //       setItemsPerPage={setItemsPerPage}
                //       setSearchCall={setSearchTrigger}
                //     />
                //   </>
                <><span onClick={()=>{handleRowClicked("1")}}>ABC Enterprises</span></>
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

export default DSRS;
