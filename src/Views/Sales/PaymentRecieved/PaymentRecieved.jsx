import React, { useState, useEffect, useRef, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import { showAmountWithCurrencySymbol, useDebounceSearch } from "../../Helper/HelperFunctions";
import { formatDate } from "../../Helper/DateFormat";
import DatePicker from "../../Common/DatePicker/DatePicker";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import SortBy from "../../Common/SortBy/SortBy";
import SearchBox from "../../Common/SearchBox/SearchBox";
import FilterBy from "../../Common/FilterBy/FilterBy";
import { paymentRecList } from "../../../Redux/Actions/PaymentRecAction";
import ShowMastersValue from "../../Helper/ShowMastersValue";
import { paymentReceiveSortByOptions } from "../../Helper/SortByFilterContent/sortbyContent";
import {
  paymentRecOptions,
} from "../../Helper/SortByFilterContent/filterContent";
import { formatDate3 } from "../../Helper/DateFormat";
import useFetchOnMount from "../../Helper/ComponentHelper/useFetchOnMount";
import { getCurrencySymbol } from "../../Helper/ComponentHelper/ManageLocalStorage/localStorageUtils";

const PaymentRecieved = () => {

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const currencySymbol = getCurrencySymbol();//get currency symbol form active org. and local storage

  const qutList = useSelector((state) => state?.paymentRecList);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
  const [clearFilter, setClearFilter] = useState(null);

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

  const fetchQuotations = useCallback(async () => {
    try {
      const fy = localStorage.getItem("FinancialYear");
      const currentpage = currentPage;

      const sendData = {
        fy,
        noofrec: itemsPerPage,
        inout: 1,
        currentpage,
        ...(selectedSortBy !== "Normal" && {
          sort_by: selectedSortBy,
          sort_order: sortOrder,
        }),
        ...(status && { payment_mode: status }),
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

      dispatch(paymentRecList(sendData));
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, [searchTrigger]);

  useFetchOnMount(fetchQuotations); // Use the custom hook for call API


  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/payment-recieved-detail?id=${quotation.id}`);
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
    const areAllRowsSelected = qutList?.data?.payments?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, qutList?.data?.payments]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll ? [] : qutList?.data?.payments?.map((row) => row.id)
    );
  };
  //logic for checkBox...

  return (
    <>
      <TopLoadbar />
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {/* <img src={"/assets/Icons/allcustomers.svg"} alt="" /> */}
              {otherIcons.all_payment_rec_svg}
              All Payment Recieved
            </h1>
            <p id="firsttagp">{qutList?.data?.data?.count} Records
              <span
                className={`${qutList?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger(prev => prev + 1)}>
                {otherIcons?.refresh_svg}
              </span>

            </p>
            <SearchBox
              placeholder="Search In Payment Recevied Number"
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
              sortOptions={paymentReceiveSortByOptions}
              resetPageIfNeeded={resetPageIfNeeded}
            />

            <DatePicker
              setDateRange={setDateRange}
              setSpecificDate={setSpecificDate}
              setClearFilter={setClearFilter}
              setSearchTrigger={setSearchTrigger}
              // searchTrigger={searchTrigger}
              resetPageIfNeeded={resetPageIfNeeded}
            />

            <FilterBy
              setStatus={setStatus}
              selectedSortBy={selectedSortBy2}
              setSearchTrigger={setSearchTrigger}
              setSelectedSortBy={setSelectedSortBy2}
              filterOptions={paymentRecOptions}
              resetPageIfNeeded={resetPageIfNeeded}
            />

            <Link className="linkx1" to={"/dashboard/create-payment-rec"}>
              New Payment <GoPlus />
            </Link>

            <ResizeFL />
          </div>
        </div>

        <div id="mainsectioncsls"
          className="commonmainqusalincetcsecion">
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
                    Payment NO
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons.customer_svg}
                    Customer Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons.refrence_svg}
                    Refrence No
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons.quotation_icon}
                    Invoice No
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs5">Mode</div>

                  <div className="table-cellx12 quotiosalinvlisxs6_item">
                    <p>
                      {currencySymbol}{" "}
                      Amount
                    </p>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs5">
                    {otherIcons.status_svg}
                    Status
                  </div>
                </div>

                {qutList?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {qutList?.data?.data?.payments?.length >= 1 ? (
                      <>
                        {qutList?.data?.data?.payments?.map(
                          (quotation, index) => (
                            <div
                              className={`table-rowx12 ${selectedRows?.includes(quotation?.id)
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
                                  checked={selectedRows?.includes(
                                    quotation?.id
                                  )}
                                  type="checkbox"
                                  onChange={() =>
                                    handleCheckboxChange(quotation?.id)
                                  }
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
                                {quotation?.payment_id || ""}
                              </div>
                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs3"
                              >
                                {quotation?.customer?.display_name || ""}
                              </div>

                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs5"
                              >
                                {quotation?.reference == 0
                                  ? ""
                                  : quotation?.reference}
                              </div>

                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs5"
                                data-tooltip-content={quotation?.entries.map(
                                  (entry) => entry?.invoice_no
                                )}
                                data-tooltip-place="bottom"
                                data-tooltip-id="my-tooltip"
                              >
                                {quotation?.entries
                                  .map((entry) => entry?.invoice_no)
                                  .filter((no) => no)
                                  .join(", ")}
                              </div>
                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs5"
                              >
                                <ShowMastersValue
                                  type="9"
                                  id={quotation?.payment_mode}
                                />
                              </div>

                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs5_item"
                              >
                                <p
                                  style={{ paddingRight: "20px", width: "74%" }}
                                >
                                  {" "}
                                  {showAmountWithCurrencySymbol(
                                    quotation?.debit
                                  ) || ""}
                                </p>
                              </div>
                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
                              >
                                <p
                                  className={
                                    quotation?.status == "1"
                                      ? "open"
                                      : quotation?.status == "0"
                                        ? "draft"
                                        : quotation?.status == "2"
                                          ? "close"
                                          : quotation?.status == "3"
                                            ? "pending"
                                            : quotation?.status == "4"
                                              ? "overdue"
                                              : ""
                                  }
                                >
                                  {quotation?.status == "0"
                                    ? "Draft"
                                    : quotation?.status == "1"
                                      ? "Approved"
                                      : quotation?.status == "2"
                                        ? "Close"
                                        : quotation?.status == "3"
                                          ? "Pending"
                                          : quotation?.status == "4"
                                            ? "Overdue"
                                            : ""}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </>
                    ) : (
                      <NoDataFound />
                    )}
                    <PaginationComponent
                      itemList={qutList?.data?.data?.count}
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

export default PaymentRecieved;
