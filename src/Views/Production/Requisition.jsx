import React, { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { quotationLists } from "../../Redux/Actions/listApisActions";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
// import "./quoations.scss";
import ListComponent from "../Sales/Quotations/ListComponent";
import ResizeFL from "../../Components/ExtraButtons/ResizeFL";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import { formatDate, formatDate3, todayDate } from "../Helper/DateFormat";
import SearchBox from "../Common/SearchBox/SearchBox";
import DatePicker from "../Common/DatePicker/DatePicker";
import SortBy from "../Common/SortBy/SortBy";
import FilterBy from "../Common/FilterBy/FilterBy";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { quotationFilterOptions } from "../Helper/SortByFilterContent/filterContent";
import { quotationSortByOptions } from "../Helper/SortByFilterContent/sortbyContent";
import { materialRequisitionsList } from "../../Redux/Actions/manufacturingActions";
import { useDebounceSearch } from "../Helper/HelperFunctions";
import { financialYear } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const Requisition = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const requisitionList = useSelector((state) => state?.requisitionList);
    const requisitionLists = requisitionList?.data?.data?.requisition;
    const qutSend = useSelector((state) => state?.quoteSend);

    // console.log("requisitionList", requisitionList);

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

    const fetchQuotations = useCallback(async () => {
        try {
            const fy = financialYear();
            const currentpage = currentPage;

            const sendData = {
                fy,
                noofrec: itemsPerPage,
                currentpage,
            };

            dispatch(materialRequisitionsList(sendData));
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
        Navigate(`/dashboard/requisition-details?id=${quotation.id}`);
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
        const areAllRowsSelected = requisitionLists?.every((row) =>
            selectedRows.includes(row.id)
        );
        setSelectAll(areAllRowsSelected);
    }, [selectedRows, requisitionLists]);

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        setSelectedRows(
            selectAll ? [] : requisitionLists?.map((row) => row.id)
        );
    };
    //logic for checkBox...

    return (
        <>
            <TopLoadbar />
            {qutSend?.loading && <MainScreenFreezeLoader />}
            <div id="middlesection">
                <div id="Anotherbox">
                    <div id="leftareax12">
                        <h1 id="firstheading">
                            {/* <img
                                src={"/assets/Icons/allquotation.jpeg"}
                                alt=""
                                style={{ width: "26px" }}
                            /> */}
                            {otherIcons?.material_requisition_svg}

                            All Material Requisitions
                        </h1>
                        <p id="firsttagp">{requisitionList?.data?.data?.count} Records</p>

                        <SearchBox placeholder="Search In Requisitions" onSearch={onSearch} />

                    </div>

                    <div id="buttonsdata">
                        <SortBy
                            setSearchTrigger={setSearchTrigger}
                            selectedSortBy={selectedSortBy}
                            setSelectedSortBy={setSelectedSortBy}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            sortOptions={quotationSortByOptions}
                            resetPageIfNeeded={resetPageIfNeeded}
                        />

                        <DatePicker
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                            setSpecificDate={setSpecificDate}
                            setClearFilter={setClearFilter}
                            setSearchTrigger={setSearchTrigger}
                            searchTrigger={searchTrigger}
                            resetPageIfNeeded={resetPageIfNeeded}
                        />

                        <FilterBy
                            setStatus={setStatus}
                            selectedSortBy={selectedSortBy2}
                            setSearchTrigger={setSearchTrigger}
                            setSelectedSortBy={setSelectedSortBy2}
                            filterOptions={quotationFilterOptions}
                            resetPageIfNeeded={resetPageIfNeeded}
                        />
                        <ResizeFL />
                    </div>
                </div >

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
                                        {otherIcons?.date_svg}
                                        Date
                                    </div>
                                    <div className="table-cellx12 quotiosalinvlisxs2">
                                        {otherIcons?.quotation_icon}
                                        Requisition Number
                                    </div>
                                    <div className="table-cellx12 quotiosalinvlisxs3">
                                        {otherIcons?.quotation_icon}
                                        Warehouse
                                    </div>

                                    <div className="table-cellx12 quotiosalinvlisxs4">
                                        {otherIcons?.customer_svg}
                                        Item Name
                                    </div>

                                    <div className="table-cellx12 quotiosalinvlisxs5">
                                        {otherIcons?.refrence_svg}
                                        Purchase Person
                                    </div>

                                    <div className="table-cellx12 quotiosalinvlisxs6">
                                        {otherIcons?.status_svg}
                                        Status
                                    </div>
                                </div>

                                {requisitionList?.loading ? (
                                    <TableViewSkeleton />
                                ) : (
                                    <>
                                        {requisitionLists?.length >= 1 ? <>
                                            {requisitionLists?.map((quotation, index) => (
                                                <>

                                                    <div
                                                        className={`table-rowx12 ${selectedRows.includes(quotation.id)
                                                            ? "selectedresult"
                                                            : ""
                                                            }`}
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
                                                            {quotation.created_at
                                                                ? formatDate3(quotation.created_at)
                                                                : ""}
                                                        </div>

                                                        <div
                                                            onClick={() => handleRowClicked(quotation)}
                                                            className="table-cellx12 quotiosalinvlisxs2"
                                                        >
                                                            {quotation?.requestion_id || ""}

                                                        </div>
                                                        <div
                                                            onClick={() => handleRowClicked(quotation)}
                                                            className="table-cellx12 quotiosalinvlisxs3"
                                                        >
                                                            {quotation?.warehouse_name || ""}

                                                        </div>

                                                        <div
                                                            onClick={() => handleRowClicked(quotation)}
                                                            className="table-cellx12 quotiosalinvlisxs4"
                                                        >
                                                            {quotation?.entry_by?.name || ""}
                                                        </div>
                                                        <div
                                                            onClick={() => handleRowClicked(quotation)}
                                                            className="table-cellx12 quotiosalinvlisxs5"
                                                        >
                                                            {quotation.item_name || ""}
                                                        </div>

                                                        <div
                                                            onClick={() => handleRowClicked(quotation)}
                                                            className="table-cellx12 quotiosalinvlisxs6 "
                                                        >

                                                            <div>
                                                                <p className={quotation?.status == "1" ? "approved" : quotation?.status == "2" ? "declined" : quotation?.status == "6" ? "sent" : quotation?.status == "0" ? "draft" : quotation?.status == "7" ? "approved" : quotation?.status == "8" ? "approved" : "declined"} >

                                                                    {quotation.status || ""}


                                                                </p>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </>
                                            ))}
                                        </>
                                            : (
                                                <NoDataFound />
                                            )}

                                        <PaginationComponent
                                            itemList={requisitionList?.data?.data?.count}
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
            </div >
        </>
    );
};

export default Requisition;
