import React, { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { formatDate } from "../../Helper/DateFormat";
import {
  ShowMasterData,
  useDebounceSearch,
} from "../../Helper/HelperFunctions";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import Assist from "./Assist";
import CarHire from "./CarHire";
import CreateService from "./CreateService";
import Flights from "./Flights";
import Hotels from "./Hotels";
import Insurance from "./Insurance";
import TourPackage from "./TourPackage";
import Visa from "./Visa";

const ServicesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemPayloads = localStorage.getItem("salePayload");
  const hotelListData = useSelector((state) => state?.hotelList);
  const hotelLists = hotelListData?.data?.hotels || [];
  const totalItems = hotelListData?.data?.total_hotels || 0;

  const servicesList = ShowMasterData("48");
  
  const [switchCusData, setSwitchCusData] = useState("Hotels");

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

  const fetchHotels = useCallback(async () => {
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

      //   dispatch(hotelListAction(sendData));
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    // const parshPayload = parseJSONofString(itemPayloads);
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
    fetchHotels();
    // }
  }, [searchTrigger]);

  const handleRowClicked = (quotation) => {
    navigate(`/dashboard/dsr-details?id=${quotation.id}`);
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
    const areAllRowsSelected = hotelListData?.data?.quotations?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, hotelListData?.data?.quotations]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll ? [] : hotelListData?.data?.quotations?.map((row) => row.id)
    );
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

  return (
    <>
      <TopLoadbar />
      {hotelListData?.loading && <MainScreenFreezeLoader />}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {otherIcons?.warehouse_icon}
              All Services
            </h1>
            {/* <p id="firsttagp">{totalItems} Records</p> */}
            {/* <SearchBox
              placeholder="Search In DSRS"
              onSearch={onSearch}
              section={searchTrigger}
            /> */}
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
              New Service <GoPlus />
            </Link>
            <ResizeFL />
          </div>
        </div>

        <div className="ccfz1 formsectionx1 type-button2">
          {servicesList?.map((item, index) => (
            <div className="insideccfz1" key={index}>
              <button
                className={`type-button3  ${
                  switchCusData === `${item?.label || ""}` && "selectedbtnx2"
                }`}
                onClick={() => setSwitchCusData(`${item?.label || ""}`)}
              >
                {item?.label || ""}
              </button>
            </div>
          ))}
        </div>
        <div>
          
          {switchCusData == "Hotels" && <Hotels />}
          {switchCusData == "Flights" && <Flights />}
          {switchCusData == "Tour Package" && <TourPackage />}
          {switchCusData == "Visa" && <Visa />}
          {switchCusData == "Car Hire" && <CarHire />}
          {switchCusData == "Assist" && <Assist />}
          {switchCusData == "Insurance" && <Insurance />}
        </div>

        <Toaster />
        {showPopup && (
          <CreateService
            popupContent={{
              setshowAddPopup: setShowPopup,
              showAddPopup: showPopup,
              isEditIndividual: isEdit,
              selectedItem,

              setSearchTrigger,
            }}
          />
        )}
      </div>
    </>
  );
};

export default ServicesList;
