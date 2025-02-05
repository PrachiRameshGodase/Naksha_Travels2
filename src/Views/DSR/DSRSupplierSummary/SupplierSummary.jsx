import React, { useEffect, useMemo, useState } from "react";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import SearchBox from "../../Common/SearchBox/SearchBox";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatDate3 } from "../../Helper/DateFormat";
import { DSRSupplierSummaryListActions } from "../../../Redux/Actions/DSRActions";
import {
  currencySymbol,
  useDebounceSearch,
} from "../../Helper/HelperFunctions";
import useFetchApiData from "../../Helper/ComponentHelper/useFetchApiData";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { Toaster } from "react-hot-toast";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import { BsEye } from "react-icons/bs";
import HotelDetails from "./HotelDetails";
import FlightDetails from "./FlightDetails";
import InsuranceDetails from "./InsuranceDetails";
import AssistDetails from "./AssistDetails";
import CarHireDetails from "./CarHireDetals";
import VisaDetails from "./VisaDetails";
import OtherDetails from "./OtherDetails";
import { RxCross2 } from "react-icons/rx";
import { financialYear } from "../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const SupplierSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemPayloads = localStorage.getItem("salePayload");
  const params = new URLSearchParams(location.search);
  const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

  const DSRSupplierSummaryListData = useSelector(
    (state) => state?.dsrSupplierSummary
  );
  const DSRSupplierSummaryLists = DSRSupplierSummaryListData?.data?.data || [];
  const totalItems = DSRSupplierSummaryListData?.data?.count || 0;

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
      fy: financialYear(),
      noofrec: itemsPerPage,
      currentpage: currentPage,
      dsr_id: itemId,
      // ...(selectedSortBy !== "Normal" && {
      //   sort_by: selectedSortBy,
      //   sort_order: sortOrder,
      // }),
      // ...(status && {
      //   status: status == "expiry_date" ? 6 : status,
      //   ...(status == "expiry_date" && { expiry_date: 1 }),
      // }),
      ...(searchTermFromChild && { search: searchTermFromChild }),
      ...(clearFilter === false &&
      {
        //   ...(specificDate
        //     ? { custom_date: formatDate(new Date(specificDate)) }
        //     : dateRange[0]?.startDate &&
        //       dateRange[0]?.endDate && {
        //         from_date: formatDate(new Date(dateRange[0].startDate)),
        //         to_date: formatDate(new Date(dateRange[0].endDate)),
        //       }),
      }),
    }),
    [searchTrigger]
  );

  useFetchApiData(DSRSupplierSummaryListActions, payloadGenerator, [
    searchTrigger,
  ]);

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
    const areAllRowsSelected = DSRSupplierSummaryLists?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, DSRSupplierSummaryLists]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll ? [] : DSRSupplierSummaryLists?.map((row) => row.id)
    );
  };

  const [showPopup, setShowPopup] = useState(false);
  const [passHotelData, setPassengerHotelData] = useState("");
  const handleShowDetails = (item) => {
    setPassengerHotelData(item);
    setShowPopup((prev) => !prev);
  };
  const renderPopupComponent = (item) => {
    switch (item?.service_name) {
      case "hotel":
        return (
          <HotelDetails
            data={passHotelData}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        );
      case "assist":
        return (
          <AssistDetails
            serviceData={passHotelData}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        );
      case "insurance":
        return (
          <InsuranceDetails
            serviceData={passHotelData}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        );
      case "flight":
        return (
          <FlightDetails
            serviceData={passHotelData}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        );
      case "car_hire":
        return (
          <CarHireDetails
            serviceData={passHotelData}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        );
      case "visa":
        return (
          <VisaDetails
            serviceData={passHotelData}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        );
      case "others":
        return (
          <OtherDetails
            serviceData={passHotelData}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        );
      default:
        return null; // No component to render for unknown service_name
    }
  };
  return (
    <>
      <TopLoadbar />
      {/* {DSRListData?.loading && <MainScreenFreezeLoader />} */}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.warehouse_icon}
              {DSRSupplierSummaryLists?.dsr?.dsr_no} DSR Supplier Summary
            </h1>
            <p id="firsttagp">
              {/* {totalItems} Records */}
              <span
                className={`${DSRSupplierSummaryListData?.loading && "rotate_01"
                  }`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger((prev) => prev + 1)}
              >
                {otherIcons?.refresh_svg}
              </span>
            </p>
            <SearchBox
              placeholder="Search In Supplier Name"
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

            {/* <Link onClick={handleNewDsr} className="linkx1">
              New DSR <GoPlus />
            </Link> */}
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
            <Link
              to={`/dashboard/dsr-details?id=${itemId}`}
              className="linkx3"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Close"
              data-tooltip-place="bottom"
            >
              <RxCross2 />
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
                    DSR No
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.quotation_icon}
                    Transaction Date
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.quotation_icon}
                    Service Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.customer_svg}
                    Supplier Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6">
                    <p style={{ width: "152px" }}>
                      ({currencySymbol}) Supplier Amount
                    </p>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6_item">
                    <p style={{ width: "138px" }}>
                      ({currencySymbol}) Tax Amount
                    </p>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6_item">
                    <p style={{ width: "165px" }}>
                      ({currencySymbol}) Total Amount
                    </p>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6_item">
                    {otherIcons?.status_svg}
                    Actions
                  </div>
                </div>

                {DSRSupplierSummaryListData?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {DSRSupplierSummaryLists?.length >= 1 ? (
                      <>
                        {DSRSupplierSummaryLists?.map((item, index) => (
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
                                onChange={() => handleCheckboxChange(item?.id)}
                              />
                              <div className="checkmark"></div>
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs1">
                              {item?.dsr?.dsr_no || ""}
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs1">
                              {item?.dsr?.transaction_date
                                ? formatDate3(item?.dsr?.transaction_date) || ""
                                : ""}
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs1">
                              {item?.service_name
                                ? item.service_name
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                  )
                                : ""}
                            </div>

                            <div
                              className="table-cellx12 quotiosalinvlisxs4"
                              data-tooltip-content={item?.supplier_name}
                              data-tooltip-id="my-tooltip"
                              data-tooltip-place="bottom"
                              style={{ marginRight: "90px" }}
                            >
                              {item?.supplier_name || ""}
                            </div>

                            <div className="table-cellx12 quotiosalinvlisxs5_item">
                              <p style={{ width: "41%" }}>
                                {" "}
                                {item?.supplier_amount || ""}
                              </p>
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs5_item ">
                              <p style={{ width: "62%" }}>
                                {item?.tax_amount || ""}
                              </p>
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs5_item ">
                              <p style={{ width: "95%" }}>
                                {item?.total || ""}
                              </p>
                            </div>
                            <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd">
                              <span
                                style={{
                                  cursor: "pointer",
                                  color: "gray",
                                  fontSize: "20px",
                                  marginLeft: "32px",
                                }}
                                onClick={() => {
                                  handleShowDetails(item);
                                }}
                              >
                                <BsEye />
                              </span>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <NoDataFound />
                    )}

                    {/* <PaginationComponent
                      itemList={totalItems}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      setSearchCall={setSearchTrigger}
                    /> */}
                    {showPopup && renderPopupComponent(passHotelData)}
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

export default SupplierSummary;
