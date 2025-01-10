import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ResizeFL from "../../../Components/ExtraButtons/ResizeFL";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { PassengerHotelDetailsAction } from "../../../Redux/Actions/passengerHotelActions";
import { useDebounceSearch } from "../../Helper/HelperFunctions";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import Insurance from "./PassengerInsurance/Insurance";
import Assist from "./PassengerAssist/Assist";
import CarHire from "./PassengerCarHire/CarHire";
import Flights from "./PassengerFlight/Flights";
import Hotels from "./PassengerHotel/Hotels";
import Visa from "./PassengerVisa/Visa";
import Others from "./PassengerOthers/Others";
import { RxCross2 } from "react-icons/rx";
import { PassengerMHotelDetailsAction } from "../../../Redux/Actions/passengerMHotelActions";

const FamilyServicesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemId = new URLSearchParams(location.search).get("id");

  const hotelListData = useSelector((state) => state?.hotelList);
  const passengerData = useSelector(
    (state) => state?.passengerMDetail?.data?.data || {}
  );
 
  const totalHotels = passengerData?.mice_hotel?.length || "";
  const totalVisas = passengerData?.mice_visa?.length || "";
  const totalFlights = passengerData?.mice_flight?.length || "";
  const totalCarHires = passengerData?.mice_car_hire?.length || "";
  const totalAssist = passengerData?.mice_assist?.length || "";
  const totalInsurance = passengerData?.mice_insurance?.length || "";
  const totalOthers = passengerData?.mice_others?.length || "";

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
      dispatch(PassengerMHotelDetailsAction(sendData));
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
    { label: "Car Hire", total: totalCarHires },
    { label: "Assist", total: totalAssist },
    { label: "Insurance", total: totalInsurance },
    { label: "Others", total: totalOthers },
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
            {/* <p id="firsttagp">DSR No.{DSR}</p> */}
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
            {/* <ResizeFL /> */}
            {/* <Link
              to={`/dashboard/dsr-details?id=${itemId}`}
              className="linkx3"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Close"
              data-tooltip-place="bottom"
            >
              <RxCross2 /> */}
            {/* </Link> */}
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
                {item?.label || ""} {item?.total || ""}
              </button>
            </div>
          ))}
        </div>
        <div>
          {switchCusData == "Hotels" && (
            <Hotels data={passengerData?.mice_hotel} totalItems={totalHotels} />
          )}
          {switchCusData == "Flights" && (
            <Flights
              data={passengerData?.mice_flight}
              totalItems={totalFlights}
            />
          )}
          {switchCusData == "Others" && (
            <Others data={passengerData?.mice_others} totalItems={totalOthers} />
          )}
          {switchCusData == "Visa" && (
            <Visa data={passengerData?.mice_visa} totalItems={totalVisas} />
          )}
          {switchCusData == "Car Hire" && (
            <CarHire
              data={passengerData?.mice_car_hire}
              totalItems={totalCarHires}
            />
          )}
          {switchCusData == "Assist" && (
            <Assist data={passengerData?.mice_assist} totalItems={totalAssist} />
          )}
          {switchCusData == "Insurance" && (
            <Insurance
              data={passengerData?.mice_insurance}
              totalItems={totalInsurance}
            />
          )}
        </div>

        <Toaster />
      </div>
    </>
  );
};

export default FamilyServicesList;
