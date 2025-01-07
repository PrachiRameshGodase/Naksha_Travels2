import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NoDataFound from "../../../../Components/NoDataFound/NoDataFound";
import TableViewSkeleton from "../../../../Components/SkeletonLoder/TableViewSkeleton";
import TopLoadbar from "../../../../Components/Toploadbar/TopLoadbar";
import PaginationComponent from "../../../Common/Pagination/PaginationComponent";
import ShowMastersValue from "../../../Helper/ShowMastersValue";
import { otherIcons } from "../../../Helper/SVGIcons/ItemsIcons/Icons";
import { BsEye } from "react-icons/bs";
import { PassengerMHotelDetailsAction } from "../../../../Redux/Actions/passengerMHotelActions";
import { PassengerMVisaDeleteActions } from "../../../../Redux/Actions/passengerMVisaActions";
import PassengerVisaDetails from "./PassengerVisaDetails";

const Visas = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemId = new URLSearchParams(location.search).get("id");

  const passengerData = useSelector((state) => state?.passengerDetail);
  const totalItems = passengerData?.data?.total_hotels || 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleRowClicked = (quotation) => {
    navigate(`/dashboard/visas-details?id=${quotation.id}`);
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
    const areAllRowsSelected = data?.every((row) =>
      selectedRows.includes(row.id)
    );
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, data]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : data?.map((row) => row.id));
  };
  //logic for checkBox...
  const handleDeleteVisa = async (item) => {
    const result = await Swal.fire({
      text: "Are you sure you want to delete this visa?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const sendData = {
        mice_visa_id: item?.id,
      };
      dispatch(PassengerMVisaDeleteActions(sendData)).then((response) => {
        if (itemId) {
          const refreshData = {
            passenger_id: itemId,
          };
          dispatch(PassengerMHotelDetailsAction(refreshData));
        }
      });
    }
  };
  const [showPopup, setShowPopup] = useState(false);
  const [passHotelData, setPassengerHotelData] = useState("");
  const handleShowDetails = (item) => {
    setPassengerHotelData(item);
    setShowPopup((prev) => !prev);
  };
  return (
    <>
      <TopLoadbar />
      {/* {passengerData?.loading && <MainScreenFreezeLoader />} */}
      <div id="middlesection">
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
                    Passenger Name
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    {otherIcons?.quotation_icon}
                    Passport No
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs3">
                    {otherIcons?.refrence_svg}
                    Email
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.refrence_svg}
                    Visa Type
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.refrence_svg}
                    Visa No
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs4">
                    {otherIcons?.refrence_svg}
                    Country
                  </div>

                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons?.status_svg}
                    Status
                  </div>
                </div>

                {passengerData?.loading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {data?.length >= 1 ? (
                      <>
                        {data?.map((item, index) => (
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
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs1"
                            >
                              {item?.visa_passenger?.display_name || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs2"
                            >
                              {item?.passport_no || ""}
                            </div>

                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs2"
                            >
                              {item?.email || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs3"
                            >
                              <ShowMastersValue
                                type="40"
                                id={item?.visa_type_id || ""}
                              />
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs4"
                            >
                              {item?.visa_no || ""}
                            </div>
                            <div
                              onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs4"
                            >
                              {item?.country?.name || ""}
                            </div>

                            <div
                              // onClick={() => handleRowClicked(item)}
                              className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 s25x85werse5d4rfsd"
                            >
                              <span
                                style={{ cursor: "pointer", color: "red" }}
                                onClick={() => handleDeleteVisa(item)}
                              >
                                {otherIcons.delete_svg}
                              </span>
                              <span
                                style={{
                                  cursor: "pointer",
                                  color: "gray",
                                  fontSize: "20px",
                                  marginLeft: "10px",
                                }}
                                onClick={() => {
                                  handleShowDetails(item);
                                }}
                              >
                                <BsEye />
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
        <Toaster />
        {showPopup && (
          <PassengerVisaDetails
            data={passHotelData}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        )}
      </div>
    </>
  );
};

export default Visas;
