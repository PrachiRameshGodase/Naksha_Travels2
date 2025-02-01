import React, { useCallback, useEffect, useMemo, useState } from "react";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import { Toaster } from "react-hot-toast";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, generatePDF } from "../Helper/DateFormat";
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
import { clearDsrState, DSRListActions } from "../../Redux/Actions/DSRActions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import PrintContent from "../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent";
import PrintContent2 from "../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent2";

const DSRS = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemPayloads = localStorage.getItem("salePayload");
  const DSRListData = useSelector((state) => state?.DSRList);
  const DSRLists = DSRListData?.data?.data || [];
  const totalItems = DSRListData?.data?.count || 0;

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

  //fetch all data
  const payloadGenerator = useMemo(
    () => () => ({
      //useMemo because  we ensure that this function only changes when [dependency] changes
      fy: localStorage.getItem("FinancialYear"),
      noofrec: itemsPerPage,
      currentpage: currentPage,
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
    }),
    [searchTrigger]
  );

  useFetchApiData(DSRListActions, payloadGenerator, [searchTrigger]);

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
    const areAllRowsSelected = DSRLists?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, DSRLists]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : DSRLists?.map((row) => row.id));
  };
  //logic for checkBox...

  const handleNewDsr = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    localStorage.setItem("dsrId", "");
    navigate("/dashboard/create-dsr");
    dispatch(clearDsrState());
  };
  const [loading, setLoading] = useState(false);

 
  return (
    <>
      <TopLoadbar />
      {/* {DSRListData?.loading && <MainScreenFreezeLoader />} */}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.warehouse_icon}
              All DSRS
            </h1>
            <p id="firsttagp">
              {totalItems} Records
              <span
                className={`${DSRListData?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger((prev) => prev + 1)}
              >
                {otherIcons?.refresh_svg}
              </span>
            </p>
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

            <Link onClick={handleNewDsr} className="linkx1">
              New DSR <GoPlus />
            </Link>
            {/* <div
              onClick={() => {
                navigate("/dashboard/create-dsr");
                dispatch(clearDsrState());
              }}
              className="linkx1"
              style={{ cursor: "pointer" }}
            >
              New DSR <GoPlus />
            </div> */}
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
                    DSR No
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.quotation_icon}
                    Customer Type
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.quotation_icon}
                    Customer Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.customer_svg}
                    Currency
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Status
                  </div>
                 
                </div>

                {DSRListData?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {DSRLists?.length >= 1 ? (
                      <>
                        {DSRLists?.map((item, index) => (
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
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              {item?.dsr_no || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              {item?.customer?.customer_type || ""}
                            </div>

                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs4"
                            >
                              {item?.customer?.display_name || ""}
                            </div>

                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs4"
                            >
                              {item?.currency || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(quotation)}
                              className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
                            >
                              <p
                                className={
                                  item?.is_invoiced == "0"
                                    ? "draft"
                                    : item?.is_invoiced == "1"
                                    ? "invoiced"
                                    : ""
                                }
                              >
                                {item?.is_invoiced == "1"
                                  ? "Invoiced"
                                  : item?.is_invoiced == "0"
                                  ? "Not Invoiced"
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

export default DSRS;
