import React, { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { quotationLists } from "../../Redux/Actions/listApisActions";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
// import "./quoations.scss";
import ListComponent from "../Sales/Quotations/ListComponent";
import ResizeFL from "../../Components/ExtraButtons/ResizeFL";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import { formatDate, formatDate3, todayDate } from "../Helper/DateFormat";
import SearchBox from "../Common/SearchBox/SearchBox";
import DatePicker from "../Common/DatePicker/DatePicker";
import SortBy from "../Common/SortBy/SortBy";
import FilterBy from "../Common/FilterBy/FilterBy";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { quotationFilterOptions } from "../Helper/SortByFilterContent/filterContent";
import { quotationSortByOptions } from "../Helper/SortByFilterContent/sortbyContent";
import {
  materialRequisitionsList,
  requisitionApprovalListAction,
} from "../../Redux/Actions/manufacturingActions";
import CreateRequisitionApprovePopup from "./CreateRequisitionApprovePopup";
import { financialYear } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const RequisitionApproval = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const requisitionList = useSelector(
    (state) => state?.requisitionApprovalList
  );
  const requisitionLists = requisitionList?.data?.data?.material_request_item;
  // const qutSend = useSelector((state) => state?.quoteSend);

  const [showPopup, setShowPopup] = useState(false);
  const [itemDetailData, setitemDetailData] = useState([]);

  const handleApproveStock = (val) => {
    setShowPopup(true);
    setitemDetailData(val);
    setitemDetailData(val);
  };

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

  //serch
  const [searchTermFromChild, setSearchTermFromChild] = useState("");
  const onSearch = (term) => {
    resetPageIfNeeded();
    setSearchTrigger((prev) => prev + 1);
    setSearchTermFromChild(term); // Update parent state with search term from child
  };
  //Search

  // serch,filterS and sortby////////////////////////////////////

  const fetchQuotations = useCallback(async () => {
    try {
      const fy = financialYear();
      const currentpage = currentPage;

      const sendData = {
        fy,
        noofrec: itemsPerPage,
        currentpage,
      };

      dispatch(requisitionApprovalListAction(sendData));
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    fetchQuotations();
  }, [searchTrigger]);

  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/requisition-details?id=${quotation.id}`);
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
    const areAllRowsSelected = requisitionLists?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, requisitionLists]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : requisitionLists?.map((row) => row.id));
  };
  //logic for checkBox...

  return (
    <>
      <TopLoadbar />
      {/* {qutSend?.loading && <MainScreenFreezeLoader />} */}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {/* <img
                                src={"/assets/Icons/allquotation.jpeg"}
                                alt=""
                                style={{ width: "26px" }}
                            /> */}
              {otherIcons?.material_requisition_svg}
              All Material Requisitions
            </h1>
            <p id="firsttagp">{requisitionList?.data?.data?.count} Records</p>

            <SearchBox
              placeholder="Search In Requisitions"
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
              sortOptions={quotationSortByOptions}
              resetPageIfNeeded={resetPageIfNeeded}
            />

            <DatePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              setSpecificDate={setSpecificDate}
              setClearFilter={setClearFilter}
              setSearchTrigger={setSearchTrigger}
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
                    Requisition No.
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.quotation_icon}
                    Warehouse
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.customer_svg}
                    Item Name
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.customer_svg}
                    Order qty
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.customer_svg}
                    Appro. qty
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Status
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Actions
                  </div>
                </div>

                {requisitionList?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {requisitionLists?.length >= 1 ? (
                      <>
                        {requisitionLists?.map((quotation, index) => (
                          <>
                            <div
                              className={`table-rowx12 ${selectedRows.includes(quotation.id)
                                ? "selectedresult"
                                : ""
                                }`}
                              id="help_table_row_x12"
                            >
                              <div
                                className="table-cellx12 checkboxfx1"
                                id="styl_for_check_box"
                              >
                                <input
                                  checked={selectedRows.includes(quotation.id)}
                                  type="checkbox"
                                // onChange={() => handleCheckboxChange(quotation.id)}
                                />
                                <div className="checkmark"></div>
                              </div>
                              <div className="table-cellx12 quotiosalinvlisxs1">
                                {quotation.created_at
                                  ? formatDate3(quotation.created_at)
                                  : ""}
                              </div>

                              <div className="table-cellx12 quotiosalinvlisxs2">
                                {quotation?.material_request?.requestion_id ||
                                  ""}
                              </div>
                              <div className="table-cellx12 quotiosalinvlisxs3">
                                {quotation?.material_request?.warehouse_name ||
                                  ""}
                              </div>

                              <div className="table-cellx12 quotiosalinvlisxs5">
                                {quotation?.item?.name || ""}
                              </div>
                              <div className="table-cellx12 quotiosalinvlisxs5">
                                {quotation?.quantity || "0"}
                              </div>
                              <div className="table-cellx12 quotiosalinvlisxs5">
                                {quotation?.approved_qty || "0"}
                              </div>

                              <div className="table-cellx12 quotiosalinvlisxs6 ">
                                <div>
                                  <p
                                    className={
                                      quotation?.status == "Completed"
                                        ? "approved"
                                        : quotation?.status == "2"
                                          ? "declined"
                                          : quotation?.status == "6"
                                            ? "sent"
                                            : quotation?.status == "0"
                                              ? "draft"
                                              : quotation?.status == "7"
                                                ? "approved"
                                                : quotation?.status == "8"
                                                  ? "approved"
                                                  : "declined"
                                    }
                                  >
                                    {quotation.status || ""}
                                  </p>
                                </div>
                              </div>

                              <div className="table-cellx12 quotiosalinvlisxs5"                                   // style={{ cursor: quotation.quantity === quotation.approved_qty ? 'not-allowed' : 'pointer' }}
                                style={{ cursor: quotation.quantity === quotation.approved_qty ? 'not-allowed' : 'pointer' }}
                              >
                                <p
                                  className={`sfdjklsd1xs2w3 ${quotation.quantity ===
                                    quotation.approved_qty
                                    ? "disabledfield"
                                    : ""
                                    }`}
                                  onClick={() => {
                                    if (
                                      quotation.quantity !==
                                      quotation.approved_qty
                                    ) {
                                      handleApproveStock(quotation);
                                    }
                                  }}
                                >
                                  <span className="nodatainrow">
                                    <GoPlus /> Approve Stock
                                  </span>
                                </p>
                              </div>
                            </div>
                          </>
                        ))}
                      </>
                    ) : (
                      <NoDataFound />
                    )}

                    <PaginationComponent
                      itemList={requisitionList?.data?.data?.count}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      setSearchCall={setSearchTrigger}
                    />
                  </>
                )}
              </div>

              {showPopup === true ? (
                <div className="mainxpopups2">
                  <div className="popup-content02">
                    <CreateRequisitionApprovePopup
                      closePopup={setShowPopup}
                      itemDetailData={itemDetailData}
                      setSearchTrigger={setSearchTrigger}
                    // itemDetails={itemDetails}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default RequisitionApproval;
