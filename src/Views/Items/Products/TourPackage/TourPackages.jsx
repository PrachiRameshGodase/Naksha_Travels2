import React, { useCallback, useEffect, useState } from "react";
import PaginationComponent from "../../../Common/Pagination/PaginationComponent";
import { Toaster } from "react-hot-toast";
import NoDataFound from "../../../../Components/NoDataFound/NoDataFound";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../Helper/DateFormat";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import MainScreenFreezeLoader from "../../../../Components/Loaders/MainScreenFreezeLoader";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import SearchBox from "../../../Common/SearchBox/SearchBox";
import SortBy from "../../../Common/SortBy/SortBy";
import DatePicker from "../../../Common/DatePicker/DatePicker";
import FilterBy from "../../../Common/FilterBy/FilterBy";
import TableViewSkeleton from "../../../../Components/SkeletonLoder/TableViewSkeleton";
import {
  currencySymbol,
  useDebounceSearch,
} from "../../../Helper/HelperFunctions";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import ResizeFL from "../../../../Components/ExtraButtons/ResizeFL";
import { tourPackageListAction } from "../../../../Redux/Actions/tourPackageActions";
import ShowMastersValue from "../../../Helper/ShowMastersValue";

const TourPackages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemPayloads = localStorage.getItem("salePayload");

  const tourPackageListData = useSelector((state) => state?.tourPackageList);
  const tourPackageLists = tourPackageListData?.data?.data || [];
  const totalItems = tourPackageListData?.data?.count || 0;

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

  const fetchTourPackages = useCallback(async () => {
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

      dispatch(tourPackageListAction(sendData));
    } catch (error) {
      console.error("Error fetching tour package:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    const parshPayload = JSON?.parse(itemPayloads);
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
    fetchTourPackages();
    // }
  }, [searchTrigger]);

  const handleRowClicked = (quotation) => {
    navigate(`/dashboard/tour-package-details?id=${quotation.id}`);
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
    const areAllRowsSelected = tourPackageListData?.data?.data?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, tourPackageListData?.data?.data]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll ? [] : tourPackageListData?.data?.data?.map((row) => row.id)
    );
  };
  //logic for checkBox...

  return (
    <>
      <TopLoadbar />
      {tourPackageListData?.loading && <MainScreenFreezeLoader />}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.warehouse_icon}
              All Tour Packages
            </h1>
            <p id="firsttagp">
              {totalItems} Records
              <span
                className={`${tourPackageListData?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger((prev) => prev + 1)}
              >
                {otherIcons?.refresh_svg}
              </span>
            </p>
            <SearchBox
              placeholder="Search In Tour Packages"
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

            <Link className="linkx1" to={"/dashboard/create-tour-package"}>
              New Tour Package <GoPlus />
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
                    Package Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.customer_svg}
                    Destination
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Hotel Type
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.refrence_svg}
                    Days
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6_item">
                    {/* {otherIcons?.refrence_svg} */}
                    <p>
                      {/* {otherIcons?.doller_svg} */}
                      {currencySymbol}{" "}
                      Price
                    </p>
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Status
                  </div>
                </div>

                {tourPackageListData?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {tourPackageLists?.length >= 1 ? (
                      <>
                        {tourPackageLists?.map((item, index) => (
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
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              {item?.package_name || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              {item?.destination || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs3"
                            >
                              {" "}
                              <ShowMastersValue
                                type="35"
                                id={item?.hotel_type}
                              />
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs4"
                              style={{marginLeft:"10px"}}
                            >
                              {item?.days || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs5_item"
                            >
                              <p style={{width:"46%"}}>{item?.price_per_person || ""}</p>
                              
                            </div>

                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd"
                            >
                              <div>
                                {" "}
                                <p
                                  className={
                                    item?.status == "1"
                                      ? "open"
                                      : item?.status == "0"
                                        ? "declined"
                                        : ""
                                  }
                                >
                                  {item?.status == "1"
                                    ? "Active"
                                    : item?.status == "0"
                                      ? "Inactive"
                                      : ""}
                                </p>
                              </div>
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

export default TourPackages;
