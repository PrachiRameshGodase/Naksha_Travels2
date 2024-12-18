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
import {
  parseJSONofString,
  useDebounceSearch,
} from "../../../Helper/HelperFunctions";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import ResizeFL from "../../../../Components/ExtraButtons/ResizeFL";

import {
  flightdeleteActions,
  flightListAction,
  flightstatusActions,
} from "../../../../Redux/Actions/flightActions";
import Swal from "sweetalert2";
import { MdArrowOutward } from "react-icons/md";
import CreateItinerary from "./CreateItinerary";
import {
  itinerarydeleteActions,
  itineraryListAction,
  itinerarystatusActions,
} from "../../../../Redux/Actions/tourPackageActions";
import Attachment from "../../../Helper/Attachment";

const Itinerary = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemPayloads = localStorage.getItem("salePayload");

  const itinaeraryListData = useSelector((state) => state?.itineraryList);
  const itineraryLists = itinaeraryListData?.data?.data || [];
  const totalItems = itinaeraryListData?.data?.count || 0;
  const itineraryStatusUpdate = useSelector((state) => state?.itineraryStatus);
  console.log("itineraryLists", itinaeraryListData);

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

  const handleRowClicked = (quotation) => {
    navigate(`/dashboard/flight-details?id=${quotation.id}`);
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
    const areAllRowsSelected = itineraryLists?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, itineraryLists]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : itineraryLists?.map((row) => row.id));
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
  const handleDeleteItinerary = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this itinerary?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        itinerary_id: item?.id,
      };
      const sendData2={
        tour_package_id: data?.id,
      }
      dispatch(itinerarydeleteActions(sendData, sendData2));
    }
  };
  const handleEditItinerary = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
    setIsEdit(true);
  };

  const handleStatusChange = async (item) => {
    const newValue = item?.status == "1" ? "0" : "1"; // Toggle status
    const actionText = newValue == "0" ? "Inactive" : "Active";

    // Confirmation modal
    const result = await Swal.fire({
      text: `Do you want to make this itinerary ${actionText}?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && item?.id) {
      const sendData = {
        itinerary_id: item?.id,
        status: newValue,
      };
      const sendData2={
        tour_package_id: data?.id,
      }
      dispatch(itinerarystatusActions(sendData, sendData2))
        .then(() => {
          // navigate(`/dashboard/tour-package-details?id=${item?.id}`);
        })
        .catch((error) => {
          toast.error("Failed to update itinerary status");
          console.error("Error updating itinerary status:", error);
        });
    }
  };
  useEffect(() => {
    const sendData = {
      tour_package_id: data?.id,
    };
    dispatch(itineraryListAction(sendData));
  }, [data?.id]);
  return (
    <>
      <TopLoadbar />
      {(itineraryStatusUpdate?.loading || itinaeraryListData?.loading) && (
        <MainScreenFreezeLoader />
      )}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.warehouse_icon}
              All Itinerary
            </h1>
            <p id="firsttagp">{totalItems} Records</p>
            <SearchBox
              placeholder="Search In Itinerary"
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
              New Itinerary <GoPlus />
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
                    Day
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Day Plan
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Description
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Uploaded Document
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

                {itinaeraryListData?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {itineraryLists?.length >= 1 ? (
                      <>
                        {itineraryLists?.map((item, index) => (
                          <div
                            className={`table-rowx12 ${
                              selectedRows.includes(item?.id)
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
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 x125cd01"
                            >
                              {item?.day || ""}
                            </div>
                            <div
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 x125cd01"
                            >
                              {item?.day_plan || ""}
                            </div>
                            <div
                              title={item?.description || ""}
                              style={{ cursor: "pointer" }}
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 x125cd01"
                            >
                              {item?.description || ""}
                            </div>
                            <div
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 x125cd01"
                            >
                              <Attachment
                                attachments={JSON.parse(
                                  item?.upload_documents || "[]"
                                )}
                              />
                            </div>
                            <div
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd"
                            >
                              <p
                                className={
                                  item?.status == "1"
                                    ? "approved"
                                    : item?.status == "0"
                                    ? "draft"
                                    : ""
                                }
                              >
                                {item?.status == "0"
                                  ? "Inactive"
                                  : item?.status == "1"
                                  ? "Active"
                                  : ""}
                                <span
                                  onClick={() => {
                                    handleStatusChange(item);
                                  }}
                                >
                                  <MdArrowOutward />
                                </span>
                              </p>
                            </div>

                            <div
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 x125cd01"
                            >
                              <span
                                onClick={() => {
                                  handleEditItinerary(item);
                                }}
                              >
                                {otherIcons.edit_svg}
                              </span>
                              <span
                                style={{ marginLeft: "20px" }}
                                onClick={() => {
                                  handleDeleteItinerary(item);
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
          <CreateItinerary
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

export default Itinerary;
