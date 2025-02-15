import React, { useCallback, useEffect, useState } from "react";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { Link } from "react-router-dom";
import ResizeFL from "../../Components/ExtraButtons/ResizeFL";
import { GoPlus } from "react-icons/go";
import CreateUserMaster from "./CreateUserMaster";
import { useDispatch, useSelector } from "react-redux";

import { masterListAction } from "../../Redux/Actions/mastersAction";

import UserMasterDetails from "./UserMasterDetails";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import AddUserMaster from "./AddUserMaster";

import {
  userMasterDeleteActions,
  UserMasterListAction,
} from "../../Redux/Actions/userMasterActions";

import SearchBox from "../Common/SearchBox/SearchBox";
import { useDebounceSearch } from "../Helper/HelperFunctions";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import Swal from "sweetalert2";
import { BsEye } from "react-icons/bs";
import "./CreateMasters.scss"
import { financialYear } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const UserMasters = () => {

  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(0);

  const [dataChanging, setDataChanging] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [viewList, setViewList] = useState([]);
  const [showAddPopup, setshowAddPopup] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const userMasterData = useSelector((state) => state?.userMasterList);
  const userMasterList = userMasterData?.data?.filter((val) => val.type == 0);

  const [filteredMasterData, setFilteredMasterData] = useState(userMasterList);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : userMasterData?.map((row) => row.id));
  };

  const handleClickOnAdd = () => {
    setSelectedItem({});
    setShowPopup(true);
    setIsEdit(false);
  };

  const handleClickOnAddIndividual = (id) => {
    const selectedList = userMasterList?.find(
      (master) => master?.id === Number(id)
    );
    setSelectedItem(selectedList);
    setshowAddPopup(selectedList);
  };
  const handleClickOnEdit = (id) => {
    const selectedList = userMasterList?.find(
      (master) => master?.id === Number(id)
    );
    setSelectedItem(selectedList);
    setShowPopup(selectedList);
    setIsEdit(true);
  };

  const handleClickOnView = (id) => {
    const selectedList = userMasterList?.find(
      (master) => master?.id === Number(id)
    );
    setViewList(selectedList);
    setShowViewPopup(true);
  };

  const handleDeleteUserMaster = async (item) => {
    console.log("item", item);
    const result = await Swal.fire({
      text: "Are you sure you want to delete this user master?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result?.isConfirmed) {
      const sendData = {
        id: item?.id,
      };
      dispatch(userMasterDeleteActions(sendData))
        .then((response) => {
          dispatch(UserMasterListAction());
        })
        .catch((err) => console.log(err));
    }
  };
  //Search/////////////////////////////////////////////////////////////
  const [searchTermFromChild, setSearchTermFromChild] = useState("");
  // Debounced function to trigger search
  const debouncedSearch = useDebounceSearch(() => {
    setSearchTrigger((prev) => prev + 1);
  }, 800);

  // Handle search term change from child component
  const onSearch = (term) => {
    setSearchTermFromChild(term); // Update search term
    // console.log("term", term)

    if (term.length === 0) {
      // If search term is empty, reset the list
      setFilteredMasterData(userMasterList);
      return;
    }

    // Filter userMasterList based on the search term
    const filteredSearch = userMasterList?.filter((val) =>
      Object.values(val) // Convert object values to an array
        .join(" ") // Join them into a string
        .toLowerCase() // Convert to lowercase
        .includes(term.toLowerCase()) // Check if term is included
    );

    setFilteredMasterData(filteredSearch); // Set the filtered list

    // debouncedSearch(); // Execute debounced search if necessary
  };

  //Search/////////////////////////////////////////////////////////////

  const fetchMasters = useCallback(async () => {
    try {
      const fy = financialYear();
      const sendData = {
        fy,
        ...(searchTermFromChild && { search: searchTermFromChild }),
      };

      dispatch(UserMasterListAction(sendData));
      setDataChanging(false);
    } catch (error) {
      console.error("Error fetching user masters:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    fetchMasters();
  }, [searchTrigger]);

  return (
    <>
      <TopLoadbar />
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">All User Masters</h1>
            <SearchBox
              placeholder="Search In User Masters"
              onSearch={onSearch}
              section={searchTrigger}
            />
          </div>

          <div id="buttonsdata">
            <Link
              className="linkx1"
              onClick={handleClickOnAdd}
              data-tooltip-place="bottom"
              data-tooltip-content="New Master"
              data-tooltip-id="my-tooltip"
            >
              New Master <GoPlus />
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
                    {otherIcons.warehouse_name_svg}
                    Label
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons.warehouse_name_svg}
                    Label Id
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons.quantity_svg}
                    Value
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs5 ">
                    {otherIcons.notes_svg}
                    <p>Comment</p>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons.status_svg}
                    Actions
                  </div>
                </div>

                {userMasterData?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {(filteredMasterData || userMasterList)?.length > 0 ? (
                      (filteredMasterData || userMasterList)?.map((master, index) => (
                        <div
                          className={`table-rowx12 ${selectedRows.includes(master.id)
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
                              checked={selectedRows.includes(master.id)}
                              type="checkbox"
                              onChange={() => handleCheckboxChange(master.id)}
                            />
                            <div className="checkmark"></div>
                          </div>
                          <div
                            onClick={() => handleRowClicked(master)}
                            className="table-cellx12 quotiosalinvlisxs1"
                          >
                            {master?.label}
                          </div>
                          <div
                            onClick={() => handleRowClicked(master)}
                            className="table-cellx12 quotiosalinvlisxs1"
                          >
                            {master?.labelid}
                          </div>
                          <div
                            onClick={() => handleRowClicked(master)}
                            className="table-cellx12 quotiosalinvlisxs1"
                          >
                            <p>{master?.value}</p>
                          </div>

                          <div
                            onClick={() => handleRowClicked(master)}
                            className="table-cellx12 quotiosalinvlisxs5 "
                            data-tooltip-content={master?.note}
                            data-tooltip-place="bottom"
                            data-tooltip-id="my-tooltip"
                          >
                            {master?.note
                              ? master.note.length > 10
                                ? master.note.substring(0, 30) + "..."
                                : master.note
                              : ""}
                          </div>

                          <div className="table-cellx12 quotiosalinvlisxs6 " style={{ marginRight: "10px" }}>
                            <div className="actionxxs">
                              <span
                                onClick={() => handleClickOnView(master?.id)}
                              >
                                <BsEye />
                              </span>
                              <span
                                onClick={() =>
                                  handleClickOnAddIndividual(master?.id)
                                }
                              >
                                <GoPlus />
                              </span>
                              <span
                                onClick={() => handleClickOnEdit(master?.id)}
                              >
                                {otherIcons.edit_svg}
                              </span>
                              <span
                                onClick={() => handleDeleteUserMaster(master)}
                              >
                                {otherIcons.delete_svg}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <NoDataFound />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {showAddPopup && (
          <AddUserMaster
            popupContent={{ setshowAddPopup, showAddPopup, setSearchTrigger }}
          />
        )}
        {showPopup && (
          <CreateUserMaster
            popupContent={{ setShowPopup, showPopup, isEdit, setSearchTrigger }}
          />
        )}
        {showViewPopup && (
          <UserMasterDetails closePopup={setShowViewPopup} list={viewList} />
        )}
      </div>
    </>
  );
};

export default UserMasters;
