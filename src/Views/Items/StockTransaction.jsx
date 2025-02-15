import React, { useCallback, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import DatePicker from "../Common/DatePicker/DatePicker";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import SearchBox from "../Common/SearchBox/SearchBox";
import { useDebounceSearch } from "../Helper/HelperFunctions";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { stockTransactionAction } from "../../Redux/Actions/itemsActions";
import { formatDate, formatDate3 } from "../Helper/DateFormat";
import ShowMastersValue from "../Helper/ShowMastersValue";
import { RxCross2 } from "react-icons/rx";
import { financialYear } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const StockTransaction = ({ itemDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemPayloads = localStorage.getItem("salePayload");
  const itemStockeducer = useSelector((state) => state?.itemStock);
  const stockDetails = itemStockeducer?.data?.stock_details;
  const totalItems = stockDetails?.count || 0;

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

  const fetchStockTransaction = useCallback(async () => {
    try {
      const fy = financialYear();
      const currentpage = currentPage;

      const sendData = {
        item_id: itemDetails?.id,

        fy,
        noofrec: itemsPerPage,
        currentpage,
        // ...(selectedSortBy !== "Normal" && {
        //   sort_by: selectedSortBy,
        //   sort_order: sortOrder,
        // }),
        // ...(status && {
        //   status: status == "expiry_date" ? 6 : status,
        //   ...(status == "expiry_date" && { expiry_date: 1 }),
        // }),
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

      dispatch(stockTransactionAction(sendData));
    } catch (error) {
      console.error("Error fetching stock transaction:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    const parshPayload = JSON?.parse(itemPayloads);
    if (
      searchTrigger ||
      parshPayload?.search ||
      parshPayload?.name ||
      parshPayload?.sort_by ||
      parshPayload?.status ||
      parshPayload?.custom_date ||
      parshPayload?.from_date ||
      parshPayload?.currentpage > 1
    ) {
      fetchStockTransaction();
    }
  }, [searchTrigger]);

  //   const handleRowClicked = (room) => {
  //     navigate(`/dashboard/hotel-service-details?id=${room.id}`);
  //   };

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
    const areAllRowsSelected = stockDetails?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, stockDetails]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : stockDetails?.map((row) => row.id));
  };
  //logic for checkBox...
  const [popupImageUrl, setPopupImageUrl] = useState(""); // State to store the image URL
  const [showPopup, setShowPopup] = useState(""); // State to store the image URL
  const popupRef = useRef();
  return (
    <>
      <TopLoadbar />
      {itemStockeducer?.loading && <MainScreenFreezeLoader />}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.warehouse_icon}
              All Stock Transaction
            </h1>
            <p id="firsttagp">
              {" "}
              <span
                className={`${itemStockeducer?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger((prev) => prev + 1)}
              >
                {otherIcons?.refresh_svg}
              </span>
            </p>
            <SearchBox
              placeholder="Search In Stock Transaction"
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

            {/* <Link className="linkx1" to={`/dashboard/create-hotelservices?id=${data?.id}`}>
              New Room <GoPlus />
            </Link> */}
            {/* <ResizeFL /> */}
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
                    Date
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.customer_svg}
                    TRANSACTION TYPE
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.customer_svg}
                    IN/OUT
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.refrence_svg}
                    QTY
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.refrence_svg}
                    REASON
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {/* <p> */}
                    {otherIcons?.status_svg}
                    DESCRIPTION
                    {/* </p> */}
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                    {otherIcons?.status_svg}
                    WAREHOUSE
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                    {otherIcons?.status_svg}
                    ATTACHMENT
                  </div>
                </div>

                {itemStockeducer?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {stockDetails?.length >= 1 ? (
                      <>
                        {stockDetails?.map((item, index) => (
                          <div
                            className={`table-rowx12 ${selectedRows.includes(item?.id)
                              ? "selectedresult"
                              : ""
                              }`}
                            style={{
                              display: "flex"
                              ,
                              borderBottom: "1px dashed #d0d7de",
                              background: "#ffffff",
                              cursor: "pointer"
                            }}
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
                            <div className="table-cellx12 quotiosalinvlisxs1">
                              {item?.transaction_date
                                ? formatDate3(item?.transaction_date)
                                : "" || ""}
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs1">
                              <ShowMastersValue
                                type="11"
                                id={item?.transaction_type}
                              />
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs1">
                              {item?.inout == "1" ? "IN" : "Out" || ""}
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs2">
                              {item?.quantity || ""}
                            </div>

                            <div className="table-cellx12 quotiosalinvlisxs3">
                              <ShowMastersValue
                                type="7"
                                id={
                                  item?.reason_type == "0"
                                    ? null
                                    : item?.reason_type
                                }
                              />
                            </div>
                            <div
                              className="table-cellx12 quotiosalinvlisxs4"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content={item?.description}
                            >
                              {item?.description
                                ? item.description.split(" ").length > 15
                                  ? `${item.description
                                    .split(" ")
                                    .slice(0, 15)
                                    .join(" ")}...`
                                  : item.description
                                : ""}
                            </div>
                            <div
                              className="table-cellx12 quotiosalinvlisxs4"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content={item?.warehouse?.name}
                            >
                              {item?.warehouse ? (
                                <>
                                  {`${item?.warehouse?.name?.slice(
                                    0,
                                    10
                                  )}...` || ""}
                                </>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                              {item?.image_url ? (
                                <div
                                  onClick={() => {
                                    setShowPopup(true);
                                    setPopupImageUrl(item?.image_url); // Set the image URL for the popup
                                  }}
                                >
                                  {otherIcons?.file_svg} File Attached
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <NoDataFound />
                    )}
                    {showPopup && (
                      <div className="mainxpopups2" ref={popupRef}>
                        <div className="popup-content02">
                          <span
                            className="close-button02"
                            onClick={() => setShowPopup(false)}
                          >
                            <RxCross2 />
                          </span>
                          <img
                            src={popupImageUrl}
                            name="popup_image"
                            alt="Popup Image"
                            height={500}
                            width={500}
                          />
                        </div>
                      </div>
                    )}
                    {/* <PaginationComponent
                      itemList={totalItems}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      setSearchCall={setSearchTrigger}
                    /> */}
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

export default StockTransaction;
