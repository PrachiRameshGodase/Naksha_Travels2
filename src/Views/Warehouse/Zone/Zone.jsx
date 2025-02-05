import React, { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import { zoneViewAction } from "../../../Redux/Actions/warehouseActions";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import SearchBox from "../../Common/SearchBox/SearchBox";
import SortBy from "../../Common/SortBy/SortBy";
import { zoneSortByOptions } from "../../Helper/SortByFilterContent/sortbyContent";
import FilterBy1 from "../../Common/FilterBy/FilterBy1";
import { showDeparmentLabels, useDebounceSearch } from "../../Helper/HelperFunctions";
import useFetchOnMount from "../../Helper/ComponentHelper/useFetchOnMount";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { financialYear } from "../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const Zone = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();

  const warehouseList = useSelector((state) => state?.zoneView);
  const warehouseLists = warehouseList?.data?.data;

  const masterData = useSelector((state) => state?.masterData?.masterData);
  const mainDeparmentVal = masterData?.filter((val) => val?.type == "10");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanging, setDataChanging] = useState(false);



  const params = new URLSearchParams(location.search);
  const { id: warehouseId } = Object.fromEntries(params.entries());

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

  // filter
  const [selectAllWarehouse, setSelectAllWarehouse] = useState(false);
  const [status, setStatus] = useState("");
  const [allFilters, setAllFilters] = useState({});
  const [warehouseType, setWarehouseType] = useState("");
  const [department, setDepartment] = useState("");
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

  const fetchWarehouse = useCallback(async () => {
    try {
      const fy = financialYear();
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
          is_active: status,
        }),
        ...(department && {
          department: department,
        }),
        ...(warehouseType && { warehouse_type: warehouseType }),

        ...(searchTermFromChild && { search: searchTermFromChild }),
      };

      dispatch(zoneViewAction(sendData));
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, [searchTrigger]);

  useFetchOnMount(fetchWarehouse); // Use the custom hook for call API


  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/zone_detail?id=${quotation.id}`);
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
    const areAllRowsSelected = warehouseLists?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, warehouseLists]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : warehouseLists?.map((row) => row.id));
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
              {/* <svg id="fi_12311714" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m11.5 30c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm0-3c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5z" fill="#00e676"></path><path d="m25.5 30c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm0-3c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5z" fill="#00e676"></path><path d="m28 26h-18.13c-.74 0-1.42-.4-1.76-1.06-.35-.65-.31-1.44.1-2.05l.96-1.44c.73-1.1 2.4 0 1.66 1.11l-.96 1.45h18.13c1.32 0 1.32 2 0 2z" fill="#004d40"></path><path d="m6.11 11.45-.72-1.45h-2.39c-1.32 0-1.32-2 0-2h3c.38 0 .73.21.89.55l1 2c.59 1.18-1.2 2.08-1.79.89z" fill="#004d40"></path><path d="m28.95 9-22 1c-.64.03-1.09.64-.92 1.26l3 11c.12.44.52.74.96.74h.06l16-1c.43-.03.79-.32.9-.73l3-11c.18-.64-.32-1.28-1.01-1.26z" fill="#00e676"></path><circle cx="18" cy="10" fill="#004d40" r="8"></circle><path d="m16.29 12.71-2-2c-.94-.94.48-2.35 1.41-1.41l1.29 1.29 3.29-3.29c.94-.94 2.35.48 1.41 1.41l-4 4c-.39.39-1.02.39-1.41 0z" fill="#00e676"></path></svg> */}
              All Zones
            </h1>
            <p id="firsttagp">{warehouseList?.data?.count} Records
              <span
                className={`${warehouseList?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger(prev => prev + 1)}>
                {otherIcons?.refresh_svg}
              </span>
            </p>
            <SearchBox placeholder="Search In Zone" onSearch={onSearch} />
          </div>

          <div id="buttonsdata">
            <SortBy
              setSearchTrigger={setSearchTrigger}
              selectedSortBy={selectedSortBy}
              setSelectedSortBy={setSelectedSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortOptions={zoneSortByOptions}
              resetPageIfNeeded={resetPageIfNeeded}
            />
            <FilterBy1
              setSelectAllWarehouse={setSelectAllWarehouse}
              selectAllWarehouse={selectAllWarehouse}
              warehouseType={warehouseType}
              setWarehouseType={setWarehouseType}
              setAllFilters={setAllFilters}
              department={department}
              setDepartment={setDepartment}
              status={status}
              setStatus={setStatus}
              setSearchTrigger={setSearchTrigger}
              resetPageIfNeeded={resetPageIfNeeded}
              section="Zones"
            />

            <Link
              className="linkx1"
              to={"/dashboard/create-zone"}
              data-tooltip-place="bottom"
              data-tooltip-content="New Bill"
              data-tooltip-id="my-tooltip"
            >
              New Zone <GoPlus />
            </Link>

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
                    {otherIcons.zone_name_svg}
                    Zone Name
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons.warehouse_name_svg}
                    Warehouse
                  </div>
                  {/* 
                                    <div className="table-cellx12 quotiosalinvlisxs3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5d369f"} fill={"none"}>
                                            <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                        Capacity</div> */}

                  <div
                    className="table-cellx12 quotiosalinvlisxs1"
                    style={{ padding: "8.5px" }}
                  >
                    {otherIcons.warehouse_type_svg}
                    Warehouse Type
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons.department_svg}
                    Department
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons.refrence_svg}
                    No Of Racks
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs5">
                    {otherIcons.refrence_svg}
                    No Of Aisle
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons.status_svg}
                    Level
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons.status_svg}
                    STATUS
                  </div>
                </div>

                {warehouseList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {warehouseLists?.length >= 1 ? (
                      warehouseLists?.map((quotation, index) => (
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
                              checked={selectedRows.includes(quotation.id)}
                              type="checkbox"
                              onChange={() => handleCheckboxChange(quotation.id)}
                            />
                            <div className="checkmark"></div>
                          </div>
                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs2"
                          >
                            {quotation?.name || ""}
                          </div>
                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs1"
                          >
                            {quotation.warehouse?.name}
                          </div>
                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs1"
                          >
                            {quotation?.warehouse?.warehouse_type}
                          </div>

                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs2"
                          >
                            {showDeparmentLabels(
                              quotation?.warehouse?.department,
                              mainDeparmentVal
                            )}
                          </div>
                          {/* <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs3">
                                                {quotation?.capacity}

                                            </div> */}
                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs5"
                          >
                            {quotation?.no_of_racks || ""}
                          </div>
                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs4"
                          >
                            {quotation?.no_of_aisle || ""}
                          </div>
                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
                          >
                            {quotation?.level || ""}
                          </div>

                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
                          >
                            <p
                              className={
                                quotation?.is_active == "1"
                                  ? "open"
                                  : quotation?.is_active == "0"
                                    ? "declined"
                                    : ""
                              }
                            >
                              {quotation?.is_active == "0"
                                ? "Inactive"
                                : quotation?.is_active == "1"
                                  ? "Active"
                                  : ""}
                            </p>
                          </div>
                        </div>
                      ))) : (
                      <NoDataFound />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <PaginationComponent
          itemList={warehouseList?.data?.count}
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

export default Zone;
