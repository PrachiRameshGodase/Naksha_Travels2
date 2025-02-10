import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { quotationLists } from "../../../Redux/Actions/listApisActions";
import { useSelector } from "react-redux";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import "./quoations.scss";
import ListComponent from "./ListComponent";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import { formatDate } from "../../Helper/DateFormat";
import SearchBox from "../../Common/SearchBox/SearchBox";
import DatePicker from "../../Common/DatePicker/DatePicker";
import SortBy from "../../Common/SortBy/SortBy";
import FilterBy from "../../Common/FilterBy/FilterBy";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { quotationFilterOptions } from "../../Helper/SortByFilterContent/filterContent";
import { quotationSortByOptions } from "../../Helper/SortByFilterContent/sortbyContent";
import { useDebounceSearch } from "../../Helper/HelperFunctions";
import useFetchApiData from "../../Helper/ComponentHelper/useFetchApiData";
import { getCurrencySymbol } from "../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const Quotations = () => {
  const Navigate = useNavigate();
  const qutList = useSelector((state) => state?.quoteList);
  const qutSend = useSelector((state) => state?.quoteSend);
  const currencySymbol = getCurrencySymbol();//get currency symbol form active org. and local storage
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

  //fetch all data
  const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
    fy: localStorage.getItem('FinancialYear'),
    noofrec: itemsPerPage,
    currentpage: currentPage,
    ...(selectedSortBy !== "Normal" && { sort_by: selectedSortBy, sort_order: sortOrder }),
    ...(status && {
      status: status == "expiry_date" ? 6 : status,
      ...(status == "expiry_date" && { expiry_date: 1 }),
    }),
    ...(searchTermFromChild && { search: searchTermFromChild }),
    ...(clearFilter === false && {
      ...(specificDate
        ? { custom_date: formatDate(new Date(specificDate)) }
        : dateRange[0]?.startDate && dateRange[0]?.endDate && {
          from_date: formatDate(new Date(dateRange[0].startDate)),
          to_date: formatDate(new Date(dateRange[0].endDate)),
        }),
    }),
  }), [searchTrigger, currentPage]);

  useFetchApiData(quotationLists, payloadGenerator, [searchTrigger, currentPage]);

  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/quotation-details?id=${quotation.id}`);
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
    const areAllRowsSelected = qutList?.data?.quotations?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, qutList?.data?.quotations]);


  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll ? [] : qutList?.data?.quotations?.map((row) => row.id)
    );
  };
  //logic for checkBox...

  // for refresh the api onclick
  // const refreshApiHelper = useRefreshApiHelper();
  return (
    <>
      <TopLoadbar />
      {qutSend?.loading && <MainScreenFreezeLoader />}
      <div id="middlesection">


        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.quotation_svg}
              All Quotations
            </h1>
            <p id="firsttagp">{qutList?.data?.total} Records
              <span
                className={`${qutList?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger(prev => prev + 1)}>
                {otherIcons?.refresh_svg}
              </span>

            </p>
            <SearchBox placeholder="Search In Quotation" onSearch={onSearch} section={searchTrigger} />
          </div>

          <div id="buttonsdata">
            <SortBy
              setSearchTrigger={setSearchTrigger}
              selectedSortBy={selectedSortBy}
              setSelectedSortBy={setSelectedSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortOptions={quotationSortByOptions}
              resetPageIfNeeded={resetPageIfNeeded}
            />

            <DatePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              setSpecificDate={setSpecificDate}
              setClearFilter={setClearFilter}
              setSearchTrigger={setSearchTrigger}
              searchTrigger={searchTrigger}
              resetPageIfNeeded={resetPageIfNeeded}
            />

            <FilterBy
              setStatus={setStatus}
              selectedSortBy={selectedSortBy2}
              setSearchTrigger={setSearchTrigger}
              setSelectedSortBy={setSelectedSortBy2}
              filterOptions={quotationFilterOptions}
              resetPageIfNeeded={resetPageIfNeeded}
            />

            <Link className="linkx1" to={"/dashboard/create-quotations"}>
              New Quotation <GoPlus />
            </Link>
            <ResizeFL />
          </div>
        </div >

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
                    {otherIcons?.date_svg}
                    Date
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Quotation
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.customer_svg}
                    Customer Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.refrence_svg}
                    Refrence No
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6_item">
                    <p>
                      ({currencySymbol}){" "}
                      Amount
                    </p>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Status
                  </div>
                </div>

                {qutList?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {qutList?.data?.quotations?.length >= 1 ? <>
                      {qutList?.data?.quotations?.map((quotation, index) => (
                        <ListComponent
                          key={index}
                          handleRowClicked={handleRowClicked}
                          quotation={quotation}
                          selectedRows={selectedRows}
                          handleCheckboxChange={handleCheckboxChange}
                          section="quotation"
                        />
                      ))}
                    </>
                      : (
                        <NoDataFound />
                      )}


                    <PaginationComponent
                      itemList={qutList?.data?.total}
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
      </div >
    </>
  );
};

export default Quotations;
