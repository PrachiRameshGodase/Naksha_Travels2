import React, { useState, useEffect, useRef, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { customersList } from "../../../Redux/Actions/customerActions";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import "../../Items/ManageItems.scss";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { exportItems, importItems } from "../../../Redux/Actions/itemsActions";

import FilterIco from "../../../assets/outlineIcons/othericons/FilterIco.svg";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import newmenuicoslz from "../../../assets/outlineIcons/othericons/newmenuicoslz.svg";
import { OutsideClick } from "../../Helper/ComponentHelper/OutsideClick";
import SearchBox from "../../Common/SearchBox/SearchBox";
import SortBy2 from "../../Common/SortBy/SortBy2";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import {
  currencySymbol,
  showAmountWithCurrencySymbol,
  useDebounceSearch,
} from "../../Helper/HelperFunctions";
import useFetchOnMount from "../../Helper/ComponentHelper/useFetchOnMount";
import { financialYear } from "../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const SalesOrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const cusList = useSelector((state) => state?.customerList);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // reset current page to 1 when any filters are applied
  const resetPageIfNeeded = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  // serch,filter and sortBy//////////////////////////////////////////////////////////

  // filter/
  const [selectAllCustomer, setSelectAllCustomer] = useState(true);
  const [customerType, setCustomerType] = useState("");
  const [active, setActive] = useState("");
  const [status, setStatus] = useState("");
  const [allFilters, setAllFilters] = useState("Normal");

  const handleApplyFilter = () => {
    const filterValues = {
      is_customer: selectAllCustomer ? 1 : "",
      active: active == "active" ? 1 : active == "inactive" ? 0 : "",
      status: status == "approval" ? 1 : status == "pending approval" ? 0 : "",
      customer_type: customerType,
    };

    const filteredValues = Object.fromEntries(
      Object.entries(filterValues).filter(([_, value]) => value !== "")
    );

    const filterButton = document.getElementById("filterButton");
    if (
      filterValues.customer_type === "" &&
      filterValues.is_customer == 1 &&
      filterValues.active == ""
    ) {
      filterButton.classList.remove("filter-applied");
    } else {
      filterButton.classList.add("filter-applied");
    }
    resetPageIfNeeded();
    setSearchTrigger((prev) => prev + 1);
    filterDropdown?.handleToggle();
    setAllFilters(filteredValues);
  };

  const handleAllCustomersChange = (checked) => {
    setSelectAllCustomer(true);
    if (checked) {
      setCustomerType("");
      setStatus("");
      setAllFilters({});
    }

    const filterButton1 = document.getElementById("filterButton");
    if (selectAllCustomer) {
      filterButton1.classList.remove("filter-applied");
    } else {
      filterButton1.classList.remove("filter-applied");
    }
    resetPageIfNeeded();
    setSearchTrigger((prev) => prev + 1);
    filterDropdown?.handleToggle();
  };
  //filter//

  // sortBy
  const [selectedSortBy, setSelectedSortBy] = useState("Normal");
  const [sortOrder, setSortOrder] = useState(1);
  // sortby//

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

  // serch,filter and sortBy//////////////////////////////////////////////////////////

  const fetchCustomers = useCallback(async () => {
    try {
      const fy = financialYear();
      const currentpage = currentPage;

      const sendData = {
        fy,
        noofrec: itemsPerPage,
        // active: 0,
        // active: 1,
        currentpage,
        ...(selectedSortBy !== "Normal" && {
          sort_by: selectedSortBy,
          sort_order: sortOrder,
        }),
        ...(active && {
          active: active,
        }),
        ...(status && {
          status: status,
        }),
        ...(allFilters && {
          customer_type: allFilters?.customer_type,
        }),

        ...(searchTermFromChild && { search: searchTermFromChild }),
      };

      dispatch(customersList(sendData));
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, [searchTrigger]);

  useFetchOnMount(fetchCustomers); // Use the custom hook for call API

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
    const areAllRowsSelected = cusList?.data?.user?.every((row) =>
      selectedRows.includes(row?.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, cusList?.data?.user]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : cusList?.data?.user.map((row) => row.id));
  };
  //logic for checkBox...

  //for import and export .xlsx file drag and dorp/////////////////////////////////

  //export data
  const handleFileExport = async () => {
    try {
      dispatch(exportItems()).finally(() => {
        toast.success("Customers exported successfully");
        moreDropdown?.handleToggle();
      });
    } catch (error) {
      toast.error("Error exporting Customers:", error);
      moreDropdown?.handleToggle();
    }
  };
  //export data

  const fileInputRef = useRef(null);

  const [showImportPopup, setShowImportPopup] = useState(false); // State variable for popup visibility

  const handleFileImport = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    dispatch(importItems(formData)).then(() => {
      setShowImportPopup(false);
      // Reset file input value after import operation is completed
      fileInputRef.current.value = ""; // Clearing file input value
      // Reset fileName state
      setFileName("");
    });
  };

  // for drag and drop files
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileImport(files[0]); // Pass the first dropped file to handleFileImport
      setFileName(files[0].name); // Set the file name
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileImport(files[0]); // Pass the first dropped file to handleFileImport
      setFileName(files[0].name); // Set the file name
    }
  };
  //for import and export .xlsx file drag and dorp/////////////////////////////////

  //DropDown for fitler, sortby and import/export

  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/customer-details?id=${quotation.id}`);
  };

  const handleAllItemsChange1 = (checked, name, val) => {
    if (name === "Normal") {
      setSelectAllCustomer(checked);
      if (checked) {
        setCustomerType("");
        setStatus("");
      }
    } else if (name === "type" && val) {
      if (checked) {
        setCustomerType(val);
        setSelectAllCustomer(false);
      } else {
        setCustomerType("");
      }
    } else if (name === "active" && val) {
      if (checked) {
        setActive(val);
        setSelectAllCustomer(false);
      } else {
        setActive("");
      }
    } else if (name === "status" && val) {
      if (checked) {
        setStatus(val);
        setSelectAllCustomer(false);
      } else {
        setStatus("");
      }
    }
  };

  const filterDropdown = OutsideClick();
  const moreDropdown = OutsideClick();

  return (
    <>
      <TopLoadbar />
      <div>
      <div id="middlesection">
      <div id="Anotherbox" className="formsectionx1">
        <div id="leftareax12">
          <h1 id="firstheading">
            <img src={"/assets/Icons/allcustomers.svg"} alt="" />
            All Customer
          </h1>

          <p id="firsttagp">
            {cusList?.data?.count} Records
            <span
              className={`${cusList?.loading && "rotate_01"}`}
              data-tooltip-content="Reload"
              data-tooltip-place="bottom"
              data-tooltip-id="my-tooltip"
              onClick={() => setSearchTrigger((prev) => prev + 1)}
            >
              {otherIcons?.refresh_svg}
            </span>
          </p>

          <SearchBox placeholder="Search In Customer" onSearch={onSearch} />
        </div>

        <div id="buttonsdata">
          <SortBy2
            setSearchTrigger={setSearchTrigger}
            selectedSortBy={selectedSortBy}
            setSelectedSortBy={setSelectedSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            section="Customer Name"
            sortById="display_name"
            resetPageIfNeeded={resetPageIfNeeded}
          />

          <div className={`maincontainmiainx1`}>
            <div
              className="filtersorticos5w"
              id="filterButton"
              onClick={filterDropdown?.handleToggle}
              ref={filterDropdown?.buttonRef}
            >
              <img
                src={FilterIco}
                alt=""
                data-tooltip-content="Filter"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
              />
            </div>
            {filterDropdown?.isOpen && (
              <div className="" ref={filterDropdown?.ref}>
                <div className="filter-container">
                  <label
                    className={
                      selectAllCustomer ? "active-filter" : "labelfistc51s"
                    }
                  >
                    <input
                      type="checkbox"
                      checked={selectAllCustomer}
                      onChange={(e) =>
                        handleAllCustomersChange(e.target.checked)
                      }
                      hidden
                    />
                    All Customers
                  </label>

                  <div className="cusfilters12x2">
                    <p className="custtypestext4s">Customer Type</p>
                    <div
                      className={`cusbutonscjks54
                        }`}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={customerType === "Business"}
                          onChange={(e) =>
                            handleAllItemsChange1(
                              e.target.checked,
                              "type",
                              "Business"
                            )
                          }
                        />
                        <span
                          className={`filter-button ${
                            customerType === "Business" ? "selected" : ""
                          }`}
                        >
                          Business
                        </span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={customerType === "Individual"}
                          onChange={(e) =>
                            handleAllItemsChange1(
                              e.target.checked,
                              "type",
                              "Individual"
                            )
                          }
                        />
                        <span
                          className={`filter-button ${
                            customerType === "Individual" ? "selected" : ""
                          }`}
                        >
                          Individual
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className={`cusfilters12x2`}>
                    <p className="custtypestext4s">Status</p>
                    <div
                      className={`cusbutonscjks54
                        }`}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={active == "1"}
                          onChange={(e) =>
                            handleAllItemsChange1(
                              e.target.checked,
                              "active",
                              "1"
                            )
                          }
                        />
                        <span
                          className={`filter-button ${
                            active == "1" ? "selected" : ""
                          }`}
                        >
                          Active
                        </span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={active == "0"}
                          onChange={(e) =>
                            handleAllItemsChange1(
                              e.target.checked,
                              "active",
                              "0"
                            )
                          }
                        />
                        <span
                          className={`filter-button ${
                            active == "0" ? "selected" : ""
                          }`}
                        >
                          Inactive
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className={`cusfilters12x2`}>
                    <p className="custtypestext4s">Approval</p>
                    <div
                      className={`cusbutonscjks54
                        }`}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={status == "1"}
                          onChange={(e) =>
                            handleAllItemsChange1(
                              e.target.checked,
                              "status",
                              "1"
                            )
                          }
                        />
                        <span
                          className={`filter-button ${
                            status == "1" ? "selected" : ""
                          }`}
                        >
                          Approved
                        </span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={status == "0"}
                          onChange={(e) =>
                            handleAllItemsChange1(
                              e.target.checked,
                              "status",
                              "0"
                            )
                          }
                        />
                        <span
                          className={`filter-button ${
                            status == "0" ? "selected" : ""
                          }`}
                        >
                          Pending Approval
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    className="buttonofapplyfilter"
                    onClick={handleApplyFilter}
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link className="linkx1" to={"/dashboard/create-customer"}>
            Create Customer <GoPlus />
          </Link>

          {/* More dropdown */}
          <div className="maincontainmiainx1">
            <div
              className="mainx2"
              onClick={moreDropdown?.handleToggle}
              ref={moreDropdown?.buttonRef}
            >
              <img
                src={newmenuicoslz}
                alt=""
                data-tooltip-content="More Options"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
              />
            </div>
            {moreDropdown?.isOpen && (
              <div className="dropdowncontentofx35" ref={moreDropdown?.ref}>
                <div
                  onClick={() => setShowImportPopup(true)}
                  className="dmncstomx1 xs2xs23"
                >
                  {otherIcons?.import_svg}
                  <div>Import Customers</div>
                </div>

                <div className="dmncstomx1 xs2xs23" onClick={handleFileExport}>
                  {otherIcons?.export_svg}
                  Export Customers
                </div>
              </div>
            )}
          </div>
          <ResizeFL />
        </div>
      </div>

     

          <div id="mainsectioncsls" className="commonmainqusalincetcsecion">
            <div id="leftsidecontentxls">
              <div id="item-listsforcontainer">
                <div id="newtableofagtheme">
                  <div className="table-headerx12">
                    <div
                      className="table-cellx12 checkboxfx1 "
                      id="styl_for_check_box"
                    >
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                      <div className="checkmark"></div>
                    </div>

                    <div className="table-cellx12 quotiosalinvlisxs1">{otherIcons.customer_svg} CUSTOMER NAME</div>

                    <div className="table-cellx12 quotiosalinvlisxs2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#5d369f"}
                        fill={"none"}
                        className=""
                      >
                        <path
                          d="M12 2H6C3.518 2 3 2.518 3 5V22H15V5C15 2.518 14.482 2 12 2Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 8H15V22H21V11C21 8.518 20.482 8 18 8Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 6L10 6M8 9L10 9M8 12L10 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.5 22V18C11.5 17.0572 11.5 16.5858 11.2071 16.2929C10.9142 16 10.4428 16 9.5 16H8.5C7.55719 16 7.08579 16 6.79289 16.2929C6.5 16.5858 6.5 17.0572 6.5 18V22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                      TYPE
                    </div>
                    <div className="table-cellx12 quotiosalinvlisxs3">
                      {otherIcons.quotation_icon}
                      COMPANY NAME
                    </div>

                    <div className="table-cellx12 quotiosalinvlisxs4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#5d369f"}
                        fill={"none"}
                        className=""
                      >
                        <path
                          d="M12 22L10 16H2L4 22H12ZM12 22H16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 13V12.5C12 10.6144 12 9.67157 11.4142 9.08579C10.8284 8.5 9.88562 8.5 8 8.5C6.11438 8.5 5.17157 8.5 4.58579 9.08579C4 9.67157 4 10.6144 4 12.5V13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 13C19 14.1046 18.1046 15 17 15C15.8954 15 15 14.1046 15 13C15 11.8954 15.8954 11 17 11C18.1046 11 19 11.8954 19 13Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M10 4C10 5.10457 9.10457 6 8 6C6.89543 6 6 5.10457 6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M14 17.5H20C21.1046 17.5 22 18.3954 22 19.5V20C22 21.1046 21.1046 22 20 22H19"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      EMAIL
                    </div>

                    <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons.mobile_svg}
                      WORK PHONE
                    </div>

                    <div className="table-cellx12  quotiosalinvlisxs6_item">
                      <p>({currencySymbol}) RECEIVABLES</p>
                    </div>

                    <div
                      className="table-cellx12 quotiosalinvlisxs6"
                     
                    >
                      {otherIcons?.status_svg}
                      Status
                    </div>
                  </div>

                  {cusList?.loading ? (
                    <TableViewSkeleton />
                  ) : (
                    <>
                      {cusList?.data?.user?.length >= 1 ? (
                        <>
                          {cusList?.data?.user?.map((quotation, index) => (
                            <div
                              className={`table-rowx12 ${
                                selectedRows.includes(quotation.id)
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
                                  onChange={() =>
                                    handleCheckboxChange(quotation.id)
                                  }
                                />
                                <div className="checkmark"></div>
                              </div>
                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs1"
                              >
                              
                                {quotation.display_name || ""}
                              </div>
                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs2"
                              >
                                {quotation.customer_type || ""}
                              </div>
                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs3"
                              >
                                {quotation.company_name || ""}
                              </div>
                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs4"
                              >
                                {quotation.email || ""}
                              </div>
                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs4"
                              >
                                {quotation.work_phone || ""}
                              </div>

                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs5_item"
                              >
                                <p style={{ width: "89%", }}>
                                  {(
                                    parseFloat(quotation?.balance)?.toFixed(2)
                                  )}
                                </p>
                              </div>

                              <div
                                onClick={() => handleRowClicked(quotation)}
                                className="table-cellx12 quotiosalinvlisxs6"
                              >
                                <div>
                                  {" "}
                                  <p
                                    className={
                                      quotation?.status == "1"
                                        ? "approved"
                                        : quotation?.status == "0"
                                        ? "draft"
                                        : quotation?.status == "7"
                                        ? "approved"
                                        : ""
                                    }
                                  >
                                    {quotation?.status == "0"
                                      ? "Pending"
                                      : quotation?.status == "1"
                                      ? "Approved"
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
                        itemList={cusList?.data?.count}
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

            {showImportPopup && (
              <div
                className={`mainxpopups1 ${isDragging ? "dragover" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <div className="popup-content">
                  <span
                    className="close-button"
                    onClick={() => setShowImportPopup(false)}
                  >
                    <RxCross2 />
                  </span>
                  <h2>Import Customers</h2>

                  <form onSubmit={handleFileImport}>
                    <div className="midpopusec12x">
                      <div className="cardofselcetimage5xs">
                        {otherIcons?.drop_file_svg}
                        <h1>
                          Drop your file here, or{" "}
                          <label onClick={openFileDialog}>browse</label>{" "}
                        </h1>
                        <input
                          id="browse"
                          type="file"
                          accept=".xlsx"
                          ref={fileInputRef}
                          onChange={handleFileInputChange}
                          hidden
                        />
                        <b>{fileName}</b>
                        <p>Supports: .xlsx</p>
                      </div>
                      <button type="submit" className="submitbuttons1">
                        <span>
                          <p>Import</p>
                          {otherIcons?.import_svg}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesOrderList;
