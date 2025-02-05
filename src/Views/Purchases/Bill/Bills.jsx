import React, { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import { billLists, billStatus } from "../../../Redux/Actions/billActions";
import { formatDate } from "../../Helper/DateFormat";
import { ListComponent3 } from "../../Sales/Quotations/ListComponent";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import DatePicker from "../../Common/DatePicker/DatePicker";
import SortBy from "../../Common/SortBy/SortBy";
import FilterBy from "../../Common/FilterBy/FilterBy";
import SearchBox from "../../Common/SearchBox/SearchBox";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { billFilterOptions } from "../../Helper/SortByFilterContent/filterContent";
import { billSortOptions } from "../../Helper/SortByFilterContent/sortbyContent";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { useDebounceSearch, } from "../../Helper/HelperFunctions";
import useFetchOnMount from "../../Helper/ComponentHelper/useFetchOnMount";
import { financialYear, getCurrencySymbol } from "../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const Quotations = () => {
  const currencySymbol = getCurrencySymbol();//get currency symbol form active org. and local storage

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const billList = useSelector(state => state?.billList);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanging, setDataChanging] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(0);

  // reset current page to 1 when any filters are applied
  const resetPageIfNeeded = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  // serch,filter and sortby////////////////////////////////////

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

  // serch,filter and sortby////////////////////////////////////
  const fetchVendor = useCallback(async () => {
    try {
      const fy = financialYear();
      const currentpage = currentPage;

      const sendData = {
        fy,
        noofrec: itemsPerPage,
        currentpage,
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
      };

      dispatch(billLists(sendData));
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, [searchTrigger]);

  useFetchOnMount(fetchVendor); // Use the custom hook for call API



  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/bill-details?id=${quotation.id}`)
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
    const areAllRowsSelected = billList.data?.bills?.every((row) => selectedRows.includes(row.id));
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, billList.data?.bills]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : billList.data?.bills?.map((row) => row.id));
  };
  //logic for checkBox...

  return (
    <>
      <TopLoadbar />
      <div id="middlesection" >
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons.all_bills_svg}
              All Bills
            </h1>
            <p id="firsttagp">{billList?.data?.count} Records
              <span
                className={`${billList?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger(prev => prev + 1)}>
                {otherIcons?.refresh_svg}
              </span>

            </p>
            <SearchBox placeholder="Search In Bills" onSearch={onSearch} />
          </div>

          <div id="buttonsdata">
            <SortBy
              setSearchTrigger={setSearchTrigger}
              selectedSortBy={selectedSortBy}
              setSelectedSortBy={setSelectedSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortOptions={billSortOptions}
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
              filterOptions={billFilterOptions}
              resetPageIfNeeded={resetPageIfNeeded}
            />
            <Link className="linkx1" to={"/dashboard/create-bills"} data-tooltip-place="bottom" data-tooltip-content="New Bill" data-tooltip-id="my-tooltip">
              New Bill <GoPlus />
            </Link>

            <ResizeFL />
          </div>
        </div>

        <div id="mainsectioncsls" className="commonmainqusalincetcsecion listsectionsgrheigh">
          <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
              <div id="newtableofagtheme">
                <div className="table-headerx12">
                  <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <div className="checkmark"></div>
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons.date_svg}
                    Date
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons.quotation_icon}
                    Bill Number
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons.customer_svg}
                    Vendor Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons.refrence_svg}
                    Refrence No
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6_item">
                    <p>
                      {currencySymbol}{" "}
                      Amount
                    </p>
                  </div>

                  {/* <div className="table-cellx12 quotiosalinvlisxs6_item">
                    <p>
                      {currencySymbol}{" "}
                      Amount Paid
                    </p>
                  </div> */}

                  <div className="table-cellx12 quotiosalinvlisxs6_item">
                    <p>
                      {currencySymbol}{" "}
                      Balance Due
                    </p>
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons.status_svg}
                    Status
                  </div>

                </div>

                {billList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) :
                  <>
                    {billList?.data?.bills?.length >= 1 ? <>
                      {billList.data?.bills?.map((quotation, index) => (
                        <ListComponent3 value="bills" key={index} handleRowClicked={handleRowClicked} quotation={quotation} selectedRows={selectedRows} handleCheckboxChange={handleCheckboxChange} />
                      ))}
                    </>
                      : (
                        <NoDataFound />
                      )}

                  </>}
              </div>
            </div>
          </div>
        </div>
        <PaginationComponent
          itemList={billList?.data?.count}
          setSearchCall={setSearchTrigger}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage} />
        <Toaster />
      </div >
    </>
  );
};

export default Quotations;
