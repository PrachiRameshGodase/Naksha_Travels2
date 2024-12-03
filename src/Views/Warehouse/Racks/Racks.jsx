import React, { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import { rackViewAction } from "../../../Redux/Actions/warehouseActions";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import SearchBox from "../../Common/SearchBox/SearchBox";
import SortBy from "../../Common/SortBy/SortBy";
import FilterBy1 from "../../Common/FilterBy/FilterBy1";
import { rackSortByOptions } from "../../Helper/SortByFilterContent/sortbyContent";
import { showDeparmentLabels, useDebounceSearch } from "../../Helper/HelperFunctions";


const Racks = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();

  const warehouseList = useSelector((state) => state?.rackView);
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
  const fetchQuotations = useCallback(async () => {
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
          is_active: status,
        }),
        ...(department && {
          department: department,
        }),
        ...(warehouseType && { warehouse_type: warehouseType }),

        ...(searchTermFromChild && { search: searchTermFromChild }),
      };

      dispatch(rackViewAction(sendData));
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    if (searchTrigger) {
      fetchQuotations();
    }
  }, [searchTrigger]);


  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/racks_detail?id=${quotation.id}`);
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
              All Racks
            </h1>
            <p id="firsttagp">{warehouseList?.data?.count} Records</p>
            <SearchBox placeholder="Search In Rack" onSearch={onSearch} />
          </div>

          <div id="buttonsdata">
            <SortBy
              setSearchTrigger={setSearchTrigger}
              selectedSortBy={selectedSortBy}
              setSelectedSortBy={setSelectedSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortOptions={rackSortByOptions}
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
              section="Rack"
            />
            <Link
              className="linkx1"
              to={"/dashboard/create-racks"}
              data-tooltip-place="bottom"
              data-tooltip-content="New Bill"
              data-tooltip-id="my-tooltip"
            >
              New Rack <GoPlus />
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
                    {otherIcons.rack_name_svg}
                    Rack Name
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons.warehouse_name_svg}
                    Warehouse
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
                    {otherIcons.zone_name_svg}
                    Zone
                  </div>

                  {/* <div className="table-cellx12 quotiosalinvlisxs4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5d369f"} fill={"none"}>
                                            <path d="M16.3083 4.38394C15.7173 4.38394 15.4217 4.38394 15.1525 4.28405C15.1151 4.27017 15.0783 4.25491 15.042 4.23828C14.781 4.11855 14.5721 3.90959 14.1541 3.49167C13.1922 2.52977 12.7113 2.04882 12.1195 2.00447C12.04 1.99851 11.96 1.99851 11.8805 2.00447C11.2887 2.04882 10.8077 2.52977 9.84585 3.49166C9.42793 3.90959 9.21897 4.11855 8.95797 4.23828C8.92172 4.25491 8.88486 4.27017 8.84747 4.28405C8.57825 4.38394 8.28273 4.38394 7.69171 4.38394H7.58269C6.07478 4.38394 5.32083 4.38394 4.85239 4.85239C4.38394 5.32083 4.38394 6.07478 4.38394 7.58269V7.69171C4.38394 8.28273 4.38394 8.57825 4.28405 8.84747C4.27017 8.88486 4.25491 8.92172 4.23828 8.95797C4.11855 9.21897 3.90959 9.42793 3.49166 9.84585C2.52977 10.8077 2.04882 11.2887 2.00447 11.8805C1.99851 11.96 1.99851 12.04 2.00447 12.1195C2.04882 12.7113 2.52977 13.1922 3.49166 14.1541C3.90959 14.5721 4.11855 14.781 4.23828 15.042C4.25491 15.0783 4.27017 15.1151 4.28405 15.1525C4.38394 15.4217 4.38394 15.7173 4.38394 16.3083V16.4173C4.38394 17.9252 4.38394 18.6792 4.85239 19.1476C5.32083 19.6161 6.07478 19.6161 7.58269 19.6161H7.69171C8.28273 19.6161 8.57825 19.6161 8.84747 19.7159C8.88486 19.7298 8.92172 19.7451 8.95797 19.7617C9.21897 19.8815 9.42793 20.0904 9.84585 20.5083C10.8077 21.4702 11.2887 21.9512 11.8805 21.9955C11.96 22.0015 12.04 22.0015 12.1195 21.9955C12.7113 21.9512 13.1922 21.4702 14.1541 20.5083C14.5721 20.0904 14.781 19.8815 15.042 19.7617C15.0783 19.7451 15.1151 19.7298 15.1525 19.7159C15.4217 19.6161 15.7173 19.6161 16.3083 19.6161H16.4173C17.9252 19.6161 18.6792 19.6161 19.1476 19.1476C19.6161 18.6792 19.6161 17.9252 19.6161 16.4173V16.3083C19.6161 15.7173 19.6161 15.4217 19.7159 15.1525C19.7298 15.1151 19.7451 15.0783 19.7617 15.042C19.8815 14.781 20.0904 14.5721 20.5083 14.1541C21.4702 13.1922 21.9512 12.7113 21.9955 12.1195C22.0015 12.04 22.0015 11.96 21.9955 11.8805C21.9512 11.2887 21.4702 10.8077 20.5083 9.84585C20.0904 9.42793 19.8815 9.21897 19.7617 8.95797C19.7451 8.92172 19.7298 8.88486 19.7159 8.84747C19.6161 8.57825 19.6161 8.28273 19.6161 7.69171V7.58269C19.6161 6.07478 19.6161 5.32083 19.1476 4.85239C18.6792 4.38394 17.9252 4.38394 16.4173 4.38394H16.3083Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M8.5 16.5C9.19863 15.2923 10.5044 14.4797 12 14.4797C13.4956 14.4797 14.8014 15.2923 15.5 16.5M14 10C14 11.1046 13.1046 12 12 12C10.8955 12 10 11.1046 10 10C10 8.89544 10.8955 8.00001 12 8.00001C13.1046 8.00001 14 8.89544 14 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        Capacity</div> */}

                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons.status_svg}
                    STATUS
                  </div>
                </div>

                {warehouseList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {warehouseLists?.map((quotation, index) => (
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
                          {quotation?.name || ""}
                        </div>
                        <div
                          onClick={() => handleRowClicked(quotation)}
                          className="table-cellx12 quotiosalinvlisxs2"
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

                        <div
                          onClick={() => handleRowClicked(quotation)}
                          className="table-cellx12 quotiosalinvlisxs3"
                        >
                          {quotation?.zone?.name}
                        </div>
                        {/* <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs4">
                                                {quotation?.capacity || ""}
                                            </div> */}

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
                    ))}
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

export default Racks;
