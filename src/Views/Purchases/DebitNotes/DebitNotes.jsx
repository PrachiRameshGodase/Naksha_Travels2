import React, { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { debitNoteLists } from "../../../Redux/Actions/listApisActions";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import { showAmountWithCurrencySymbol, useDebounceSearch } from "../../Helper/HelperFunctions";
import SearchBox from "../../Common/SearchBox/SearchBox";
import SortBy from "../../Common/SortBy/SortBy";
import FilterBy from "../../Common/FilterBy/FilterBy";
import DatePicker from "../../Common/DatePicker/DatePicker";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { formatDate } from "../../Helper/DateFormat";
import { creditNotesOptions, debitNotesFilterOptions } from "../../Helper/SortByFilterContent/filterContent";
import { debitNotesSortOptions } from "../../Helper/SortByFilterContent/sortbyContent";
import { ListComponent2 } from "../../Sales/Quotations/ListComponent";
import useFetchOnMount from "../../Helper/ComponentHelper/useFetchOnMount";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { financialYear } from "../../Helper/ComponentHelper/ManageStorage/localStorageUtils";


const DebitNotes = () => {
  const itemPayloads = localStorage.getItem(("debitPayload"));

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const qutList = useSelector(state => state?.debitNoteList);

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

      dispatch(debitNoteLists(sendData));
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, [searchTrigger]);

  useFetchOnMount(fetchVendor); // Use the custom hook for call API


  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/debit-note-detail?id=${quotation.id}`)
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
    const areAllRowsSelected = qutList?.data?.debit_notes?.every((row) => selectedRows.includes(row.id));
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, qutList?.data?.debit_notes]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : qutList?.data?.debit_notes?.map((row) => row.id));
  };


  return (
    <>
      <TopLoadbar />
      <div id="middlesection" >
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons.all_debit_notes_svg}
              All Debit Notes
            </h1>
            <p id="firsttagp">{qutList?.data?.count} Records
              <span
                className={`${qutList?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger(prev => prev + 1)}>
                {otherIcons?.refresh_svg}
              </span>

            </p>
            <SearchBox placeholder="Search In Debit Notes" onSearch={onSearch} />
          </div>

          <div id="buttonsdata">
            <SortBy
              setSearchTrigger={setSearchTrigger}
              selectedSortBy={selectedSortBy}
              setSelectedSortBy={setSelectedSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortOptions={debitNotesSortOptions}
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
              filterOptions={creditNotesOptions}
              resetPageIfNeeded={resetPageIfNeeded}
            />
            <Link className="linkx1" to={"/dashboard/create-debit-note"}>
              New Debit Note <GoPlus />
            </Link>
            <ResizeFL />
          </div>
        </div>

        <div id="mainsectioncsls" className="commonmainqusalincetcsecion">
          <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
              <div id="newtableofagtheme" className="listsectionsgrheigh">
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
                    {otherIcons.date_svg}
                    Date
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons.quotation_icon}
                    Debit Note
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons.customer_svg}
                    Vendor Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons.refrence_svg}
                    Bill Id
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs5">
                    <p style={{ display: "flex", alignItems: "center" }}>
                      {otherIcons?.doller_svg}
                      Amount
                    </p>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons.status_svg}
                    Status
                  </div>
                </div>

                {qutList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : <>
                  {qutList?.data?.debit_notes?.length >= 1 ?
                    <>
                      {qutList?.data?.debit_notes?.map((quotation, index) => (
                        <ListComponent2
                          key={index}
                          handleRowClicked={handleRowClicked}
                          quotation={quotation}
                          selectedRows={selectedRows}
                          handleCheckboxChange={handleCheckboxChange}
                          section="debit"
                        />
                      ))}

                    </> : (
                      <NoDataFound />
                    )}
                </>}
              </div>
              <PaginationComponent
                itemList={qutList?.data?.count}
                setSearchCall={setSearchTrigger}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage} />
            </div>
          </div>
        </div>
        <Toaster />
      </div >
    </>
  );
};

export default DebitNotes;