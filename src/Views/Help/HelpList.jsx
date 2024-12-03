import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import ResizeFL from "../../Components/ExtraButtons/ResizeFL";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { helplistActions } from "../../Redux/Actions/helpAction";
import { formatDate3 } from "../Helper/DateFormat";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import { MdArrowOutward } from "react-icons/md";
import ImagesCrou from "../../Components/ShowImageCarousel.jsx/ImagesCrou";
import UpdateStatusPopup from "./UpdateStatusPopup";
import { activeOrg_details } from "../Helper/HelperFunctions";
const HelpList = () => {
  const dispatch = useDispatch();
  const grnList = useSelector((state) => state?.helpList);
  const grnLists = grnList?.data?.help_center;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanging, setDataChanging] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const getLocalStorageData = localStorage?.getItem("UserData");
  const userData = JSON.parse(getLocalStorageData);
  // console.log("userData", userData?.is_admin);

  const fetchQuotations = useCallback(async () => {
    try {
      const fy = localStorage.getItem("FinancialYear");
      const currentpage = currentPage;

      const sendData = {
        fy,
        noofrec: itemsPerPage,
        is_accounts: 1,
        currentpage,
      };

      dispatch(helplistActions(sendData));
      setDataChanging(false);
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    fetchQuotations();
  }, [searchTrigger]);

  const [showImagesModal, setshowImagesModal] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [imagesVal, setImagesVal] = useState([]);

  const showAllImages = (val) => {
    setImagesVal(val);
    setshowImagesModal(true);
    setShowComponent(true);
  };
  const [showPopup1, setShowPopup1] = useState(false);
  const [statusValue, setstatusValue] = useState(false);

  const handleUpdateStatus = (id) => {
    console.log("id", id);
    setstatusValue(id);
    setShowPopup1(true);
  };
  return (
    <div>
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {/* <img
                src={"/assets/Icons/help.svg"}
                alt=""
                style={{ width: "26px" }}
              /> */}
              {otherIcons?.help_svg2}
              All Helps
            </h1>
            <p id="firsttagp">{grnList?.data?.count} Records</p>

            {/* <SearchBox placeholder="Search In Quotation" onSearch={onSearch} /> */}
          </div>

          <div id="buttonsdata">
            {/* <SortBy
              setSearchTrigger={setSearchTrigger}
              selectedSortBy={selectedSortBy}
              setSelectedSortBy={setSelectedSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortOptions={quotationSortByOptions}
              resetPageIfNeeded={resetPageIfNeeded}
            /> */}

            {/* <DatePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              setSpecificDate={setSpecificDate}
              setClearFilter={setClearFilter}
              setSearchTrigger={setSearchTrigger}
              resetPageIfNeeded={resetPageIfNeeded}
            /> */}

            {/* <FilterBy
              setStatus={setStatus}
              selectedSortBy={selectedSortBy2}
              setSearchTrigger={setSearchTrigger}
              setSelectedSortBy={setSelectedSortBy2}
              filterOptions={quotationFilterOptions}
              resetPageIfNeeded={resetPageIfNeeded}
            /> */}

            <Link
              className="linkx1"
              to={"/dashboard/create-help"}
              data-tooltip-place="bottom"
              data-tooltip-content="New Bill"
              data-tooltip-id="my-tooltip"
            >
              New Help <GoPlus />
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
                    <input type="checkbox" />
                    <div className="checkmark"></div>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons?.date_svg}
                    Date
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Issue Type
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.customer_svg}
                    Page Url
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.refrence_svg}
                    Priority
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs5 comment">
                    <p>
                      Comment
                    </p>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Update Status
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.file_svg}
                    Attachment
                  </div>
                </div>
                {grnList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {grnLists?.map((quotation, index) => (
                      <div
                        className={`table-rowx12 
                           `}
                        key={index}
                        id="help_table_row_x12"
                      >
                        <div
                          className="table-cellx12 checkboxfx1"
                          id="styl_for_check_box"
                        >
                          <input
                            // checked={selectedRows.includes(quotation.id)}
                            type="checkbox"
                            onChange={() => handleCheckboxChange(quotation.id)}
                          />
                          <div className="checkmark"></div>
                        </div>
                        <div
                          //   onClick={() => handleRowClicked(quotation)}
                          className="table-cellx12 quotiosalinvlisxs1"
                        >
                          {quotation.created_at
                            ? formatDate3(quotation.created_at)
                            : ""}
                        </div>
                        <div
                          //   onClick={() => handleRowClicked(quotation)}
                          className="table-cellx12 quotiosalinvlisxs2"
                        >
                          {quotation?.issue_type_name || ""}
                        </div>

                        <div
                          className="table-cellx12 quotiosalinvlisxs3"
                          data-tooltip-content={quotation?.page_url} data-tooltip-place="bottom" data-tooltip-id="my-tooltip"
                        >
                          <Link style={{ color: '#0000EE' }} to={quotation?.page_url}>{quotation?.page_url || ""}</Link>
                        </div>

                        <div className="table-cellx12 quotiosalinvlisxs4">
                          {quotation?.priority || ""}
                        </div>

                        <div className="table-cellx12 quotiosalinvlisxs5 commentss" data-tooltip-content={quotation?.comments} data-tooltip-place="bottom" data-tooltip-id="my-tooltip">
                          {quotation?.comments || ""}
                        </div>

                        <div className="table-cellx12 quotiosalinvlisxs5 help_pointer" onClick={() => handleUpdateStatus(quotation.id)}>
                          <p
                            className={
                              quotation.status == "1"
                                ? "declined"
                                : quotation.status == "2"
                                  ? "draft"
                                  : quotation.status == "3"
                                    ? "approved"
                                    : ""
                            }
                          >
                            {quotation.status == "1"
                              ? "Pending"
                              : quotation.status == "2"
                                ? "In Progress"
                                : quotation.status == "3"
                                  ? "Resolved"
                                  : ""}{" "}
                            {userData?.is_admin === true && (
                              <MdArrowOutward

                              />
                            )}
                          </p>
                        </div>
                        <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 help_pointer">
                          {JSON.parse(quotation?.upload_documents)?.length >=
                            1 ? (
                            <span
                              onClick={() =>
                                showAllImages(
                                  JSON.parse(quotation?.upload_documents)
                                )
                              }
                            >
                              {JSON.parse(quotation?.upload_documents)?.length}{" "}
                              Images <MdArrowOutward />
                            </span>
                          ) : (
                            `${JSON.parse(quotation?.upload_documents)?.length <
                              1
                              ? "No"
                              : JSON.parse(quotation?.upload_documents)
                                ?.length
                            } Image`
                          )}
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
          itemList={grnList?.data?.count}
          setSearchCall={setSearchTrigger}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
        {showPopup1 && (
          <UpdateStatusPopup
            setShowPopup={setShowPopup1}
            statusValue={statusValue}
            setSearchTrigger={setSearchTrigger}
          />
        )}

        {showComponent && (
          <ImagesCrou
            showModal={showImagesModal}
            closeModal={setshowImagesModal}
            images={imagesVal?.map((image) => image?.url)}
          />
        )}
        {/* <Toaster /> */}
      </div>
    </div>
  );
};

export default HelpList;
