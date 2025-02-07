import React, { useCallback, useEffect, useState } from "react";
import PaginationComponent from "../../../Common/Pagination/PaginationComponent";
import toast, { Toaster } from "react-hot-toast";
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
import { useDebounceSearch } from "../../../Helper/HelperFunctions";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import ResizeFL from "../../../../Components/ExtraButtons/ResizeFL";
import CreateInsurance from "./CreateInsurance";
import Swal from "sweetalert2";
import {
  InsurancedeleteActions,
  InsuranceListAction,
  InsurancestatusActions,
} from "../../../../Redux/Actions/InsuranceActions";
import { MdArrowOutward } from "react-icons/md";
import { financialYear } from "../../../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const Insurances = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemPayloads = localStorage.getItem("salePayload");

  const insuranceListData = useSelector((state) => state?.insuranceList);
  const insuranceLists = insuranceListData?.data?.data || [];
  const totalItems = insuranceListData?.data?.count || 0;
  const insuranceStatusUpdate = useSelector((state) => state?.insuranceStatus);
  const insuranceDeleteUpdate = useSelector((state) => state?.insuranceDelete);

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

  const fetchInsurances = useCallback(async () => {
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

      dispatch(InsuranceListAction(sendData));
    } catch (error) {
      console.error("Error fetching insurance:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    // const parshPayload = JSON?.parse(itemPayloads);
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
    fetchInsurances();
    // }
  }, [searchTrigger]);

  const handleRowClicked = (quotation) => {
    navigate(`/dashboard/hotel-details?id=${quotation.id}`);
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
    const areAllRowsSelected = insuranceLists?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, insuranceLists]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : insuranceLists?.map((row) => row.id));
  };
  //logic for checkBox...

  const [selectedItem, setSelectedItem] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleClickOnAdd = () => {
    setSelectedItem({});
    setShowPopup(true);
    setIsEdit(false);
  };

  const handleEditInsurance = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
    setIsEdit(true);
  };

  const handleDeleteInsurance = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this insurance?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        insurance_id: item?.id,
      };
      dispatch(InsurancedeleteActions(sendData, navigate));
    }
  };
  const handleStatusChange = async (item) => {
    const newValue = item?.status == "1" ? "0" : "1"; // Toggle status
    const actionText = newValue == "0" ? "Inactive" : "Active";

    // Confirmation modal
    const result = await Swal.fire({
      text: `Do you want to make this insurance ${actionText}?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && item?.id) {
      const sendData = {
        insurance_id: item?.id,
        status: newValue,
      };
      dispatch(InsurancestatusActions(sendData, navigate))
        .then(() => {
          // navigate(`/dashboard/hotel-details?id=${roomId}`);
        })
        .catch((error) => {
          toast.error("Failed to update insurance status");
          console.error("Error updating insurance status:", error);
        });
    }
  };
  return (
    <>
      <TopLoadbar />
      {(insuranceListData?.loading ||
        insuranceStatusUpdate?.loading ||
        insuranceDeleteUpdate?.loading) && <MainScreenFreezeLoader />}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.warehouse_icon}
              All Insurances
            </h1>
            <p id="firsttagp">
              {totalItems} Records
              <span
                className={`${insuranceListData?.loading && "rotate_01"}`}
                data-tooltip-content="Reload"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                onClick={() => setSearchTrigger((prev) => prev + 1)}
              >
                {otherIcons?.refresh_svg}
              </span>
            </p>
            <SearchBox
              placeholder="Search In Insurances"
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

            <Link className="linkx1" onClick={handleClickOnAdd}>
              New Insurance <GoPlus />
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

                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Company Name
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Status
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Action
                  </div>
                </div>

                {insuranceListData?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {insuranceLists?.length >= 1 ? (
                      <>
                        {insuranceLists?.map((item, index) => (
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
                              // onClick={() => handleRowClicked(quotation)}
                              className="table-cellx12 x125cd01"
                            >
                              {item?.company_name || ""}
                            </div>

                            <div
                              onClick={() => {
                                handleStatusChange(item);
                              }}
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Clicking on the arrow will update the insurance status"
                              data-tooltip-place="bottom"
                              className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd"
                            >
                              <div>
                                {" "}
                                <p
                                  className={
                                    item?.status == "1"
                                      ? "active1"
                                      : item?.status == "0"
                                        ? "inactive1"
                                        : ""
                                  }
                                >
                                  {item?.status == "0"
                                    ? "Inactive"
                                    : item?.status == "1"
                                      ? "Active"
                                      : ""}
                                  <span>
                                    <MdArrowOutward />
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div
                              // onClick={() => handleRowClicked(quotation)}
                              className="table-cellx12 x125cd01"
                            >
                              <span
                                onClick={() => {
                                  handleEditInsurance(item);
                                }}
                              >
                                {" "}
                                {otherIcons.edit_svg}
                              </span>
                              <span
                                style={{ marginLeft: "20px" }}
                                onClick={() => {
                                  handleDeleteInsurance(item);
                                }}
                              >
                                {otherIcons.delete_svg}
                              </span>
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
        {showPopup && (
          <CreateInsurance
            popupContent={{
              setshowAddPopup: setShowPopup,
              showAddPopup: showPopup,
              isEditIndividual: isEdit,
              selectedItem,
              setSearchTrigger,
            }}
          />
        )}
        <Toaster />
      </div>
    </>
  );
};

export default Insurances;
