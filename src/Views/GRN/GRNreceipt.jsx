import React, { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import ResizeFL from "../../Components/ExtraButtons/ResizeFL";
import { GRNreceiptListActions } from "../../Redux/Actions/grnActions";
import { showAmountWithCurrencySymbol, useDebounceSearch, } from "../Helper/HelperFunctions";
import ShowMastersValue from "../Helper/ShowMastersValue";
import DatePicker from "../Common/DatePicker/DatePicker";
import SearchBox from "../Common/SearchBox/SearchBox";
import FilterBy from "../Common/FilterBy/FilterBy";
import SortBy from "../Common/SortBy/SortBy";
import { formatDate, formatDate3 } from "../Helper/DateFormat";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { GRNRecAreaSortOptions, } from "../Helper/SortByFilterContent/sortbyContent";
import useFetchOnMount from "../Helper/ComponentHelper/useFetchOnMount";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { getCurrencySymbol } from "../Helper/ComponentHelper/ManageLocalStorage/localStorageUtils";

const GRNreceipt = () => {
  const currencySymbol = getCurrencySymbol();//get currency symbol form active org. and local storage

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const grnList = useSelector((state) => state?.GRNreceptList);
  const grnLists = grnList?.data;
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
  const [sortOrder, setSortOrder] = useState(1);
  const [selectedSortBy, setSelectedSortBy] = useState("Normal");
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
      const fy = localStorage.getItem("FinancialYear");
      const currentpage = searchTermFromChild ? 1 : currentPage;

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
      dispatch(GRNreceiptListActions(sendData));
      setDataChanging(false);
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, [searchTrigger]);

  useFetchOnMount(fetchVendor); // Use the custom hook for call API


  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/grn_receipt_detail?id=${quotation.id}`);
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
    const areAllRowsSelected = grnLists?.grn_items?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, grnLists]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : grnLists?.grn_items?.map((row) => row.id));
  };
  //logic for checkBox...

  return (
    <>
      <TopLoadbar />
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons.all_grn_svg}
              GRN Receiving Area
            </h1>
            <p id="firsttagp">{grnLists?.count} Records
              <span
                className={`${grnList?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger(prev => prev + 1)}>
                {otherIcons?.refresh_svg}
              </span>

            </p>
            <SearchBox
              placeholder="Search In GRN Receiving Area"
              onSearch={onSearch}
            />
          </div>

          <div id="buttonsdata">
            <SortBy
              setSearchTrigger={setSearchTrigger}
              selectedSortBy={selectedSortBy}
              setSelectedSortBy={setSelectedSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortOptions={GRNRecAreaSortOptions}
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
            <ResizeFL />
          </div>
        </div>

        <div
          id="mainsectioncsls"
          className="commonmainqusalincetcsecion listsectionsgrheigh"
        >
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
                    {otherIcons.date_svg}
                    Date
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons.quotation_icon}
                    GRN NO
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons.customer_svg}
                    ITEM NAME
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons.quantity_svg}
                    GRN QTY
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs5">
                    {currencySymbol}{" "}
                    Final AMOUNT
                  </div>

                </div>

                {grnList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {grnLists?.grn_items?.length >= 1 ? (
                      <>
                        {grnLists?.grn_items?.map((quotation, index) => (
                          <div
                            className={`table-rowx12 ${selectedRows.includes(quotation.id)
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
                                checked={selectedRows.includes(quotation?.id)}
                                type="checkbox"
                                onChange={() => handleCheckboxChange(quotation?.id)}
                              />
                              <div className="checkmark"></div>
                            </div>
                            <div
                              onClick={() => handleRowClicked(quotation)}
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              {quotation.created_at
                                ? formatDate3(quotation.created_at)
                                : ""}
                            </div>

                            <div
                              onClick={() => handleRowClicked(quotation)}
                              className="table-cellx12 quotiosalinvlisxs2"
                            >
                              {quotation?.grn?.grn_no || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(quotation)}
                              className="table-cellx12 quotiosalinvlisxs3"
                            >
                              {quotation?.item?.name || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(quotation)}
                              className="table-cellx12 quotiosalinvlisxs5"
                            >
                              {quotation?.gr_qty || ""}{" "}
                              <ShowMastersValue type="2" id={quotation?.unit_id} />
                            </div>
                            <div
                              onClick={() => handleRowClicked(quotation)}
                              className="table-cellx12 quotiosalinvlisxs5_item"
                            >
                              <p style={{ paddingRight: "5px" }}>
                                {showAmountWithCurrencySymbol(
                                  quotation?.final_amount
                                )}
                              </p>
                            </div>

                            {/* <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">

                                                <p className={quotation?.status == "1" ? "open" : quotation?.status == "0" ? "draft" : quotation?.status == "2" ? "close" : quotation?.status == "3" ? "pending" : quotation?.status == "4" ? "overdue" : ""}>


                                                    {quotation?.status == "0" ? "Draft" : quotation?.status == "1" ? "Open" : quotation?.status == "2" ? "Close" : quotation?.status == "3" ? "Pending" : quotation?.status == "4" ? "Overdue" : ""
                                                    }
                                                </p>
                                            </div> */}
                          </div>
                        ))}
                      </>
                    ) : (
                      <NoDataFound />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <PaginationComponent
          itemList={grnLists?.count}
          setSearchCall={setSearchTrigger}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
        <Toaster />
      </div>
    </>
  );
};

export default GRNreceipt;