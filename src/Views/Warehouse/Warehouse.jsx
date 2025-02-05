import React, { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import ResizeFL from "../../Components/ExtraButtons/ResizeFL";
import { warehouseViewAction } from "../../Redux/Actions/warehouseActions";
import SearchBox from "../Common/SearchBox/SearchBox";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import SortBy from "../Common/SortBy/SortBy";
import { warehouseSortByOptions } from "../Helper/SortByFilterContent/sortbyContent";
import FilterBy1 from "../Common/FilterBy/FilterBy1";
import { showDeparmentLabels, ShowMasterData, stringifyJSON, useDebounceSearch } from "../Helper/HelperFunctions";
import useFetchOnMount from "../Helper/ComponentHelper/useFetchOnMount";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { financialYear } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const Warehouse = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const itemPayloads = localStorage.getItem(("creditPayload"));

  const warehouseList = useSelector((state) => state?.warehouseView);
  const warehouseLists = warehouseList?.data?.warehouse;

  const masterData = useSelector((state) => state?.masterData?.masterData);
  const mainDeparmentVal = ShowMasterData("10");

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
          department: stringifyJSON(department),
        }),
        ...(warehouseType && { warehouse_type: warehouseType }),

        ...(searchTermFromChild && { search: searchTermFromChild }),
      };

      dispatch(warehouseViewAction(sendData));
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, [searchTrigger]);

  useFetchOnMount(fetchWarehouse); // Use the custom hook for call API





  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/warehouse_detail?id=${quotation.id}`);
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
              {otherIcons?.warehouse_icon}
              All Warehouses</h1>
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
            <SearchBox placeholder="Search In Warehouse" onSearch={onSearch} />
          </div>

          <div id="buttonsdata">
            <SortBy
              setSearchTrigger={setSearchTrigger}
              selectedSortBy={selectedSortBy}
              setSelectedSortBy={setSelectedSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortOptions={warehouseSortByOptions}
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
              section="Warehouse"
            />

            <Link
              className="linkx1"
              to={"/dashboard/create-warehouse"}
              data-tooltip-place="bottom"
              data-tooltip-content="New Bill"
              data-tooltip-id="my-tooltip"
            >
              New Warehouse <GoPlus />
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
                    {otherIcons.warehouse_name_svg}
                    Warehouse Name
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons.warehouse_type_svg}
                    Warehouse Type
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons.department_svg}
                    Department
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons.country_svg}
                    Country
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons.city_svg}
                    City
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
                            className="table-cellx12 quotiosalinvlisxs1"
                          >
                            {quotation?.name}
                          </div>
                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs1"
                          >
                            {quotation?.warehouse_type}
                          </div>

                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs2"
                          >
                            {showDeparmentLabels(
                              quotation?.department,
                              mainDeparmentVal
                            )}
                          </div>

                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs3"
                          >
                            {quotation?.country?.name || ""}
                          </div>
                          <div
                            onClick={() => handleRowClicked(quotation)}
                            className="table-cellx12 quotiosalinvlisxs4"
                          >
                            {quotation?.city?.name || ""}
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
                      ))
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

export default Warehouse;
