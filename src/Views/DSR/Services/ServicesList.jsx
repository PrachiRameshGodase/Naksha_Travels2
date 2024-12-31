import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { PassengerHotelDetailsAction } from "../../../Redux/Actions/passengerHotelActions";
import {
  ShowMasterData,
  useDebounceSearch,
} from "../../Helper/HelperFunctions";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import Assist from "./Assist";
import CarHire from "./CarHire";
import CreateService from "./CreateService";
import Flights from "./PassengerFlight/Flights";
import Hotels from "./PassengerHotel/Hotels";
import Insurance from "./Insurance";
import TourPackage from "./TourPackage";
import Visa from "./PassengerVisa/Visa";

const ServicesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemId = new URLSearchParams(location.search).get("id");

  const hotelListData = useSelector((state) => state?.hotelList);
  const passengerData = useSelector(
    (state) => state?.passengerDetail?.data?.data || {}
  );
  const totalHotels = passengerData?.dsr_hotel.length || "";
  const totalVisas = passengerData?.dsr_visa.length || "";
  const totalFlights = passengerData?.dsr_flight.length || "";
  console.log("totalHotels", totalHotels);

  // const servicesList = ShowMasterData("48");

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

  useEffect(() => {
    if (itemId) {
      const sendData = {
        passenger_id: itemId,
      };
      dispatch(PassengerHotelDetailsAction(sendData));
    }
  }, [itemId]);

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
  const servicesList = [
    { label: "Hotels", total: totalHotels },
    { label: "Flights", total: totalFlights },
    { label: "Visa", total: totalVisas },
    { label: "Car Hire", total: "" }, 
    { label: "Assist", total: "" }, 
    { label: "Insurance", total: "" }, 
    { label: "Others", total: "" }, 
  ];

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

            {/* <Link className="linkx1" onClick={handleClickOnAdd}>
              New Service <GoPlus />
            </Link> */}
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
                {item?.label || ""}  {item?.total||""}
              </button>
            </div>
          ))}
        </div>
        <div>
          {switchCusData == "Hotels" && (
            <Hotels data={passengerData?.dsr_hotel} />
          )}
          {switchCusData == "Flights" && (
            <Flights data={passengerData?.dsr_flight} />
          )}
          {switchCusData == "Tour Package" && <TourPackage />}
          {switchCusData == "Visa" && <Visa data={passengerData?.dsr_visa} />}
          {switchCusData == "Car Hire" && <CarHire />}
          {switchCusData == "Assist" && <Assist />}
          {switchCusData == "Insurance" && <Insurance />}
        </div>

        <Toaster />
      </div>
    </>
  );
};

export default ServicesList;
