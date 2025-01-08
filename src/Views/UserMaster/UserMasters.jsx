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
import { UserMasterListAction } from "../../Redux/Actions/userMasterActions";

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
  const userMasterList=userMasterData?.data?.filter((val) => val.type == 0);
  
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : userMasterData?.map((row) => row.id));
  };

  const handleClickOnAdd = () => {
    setSelectedItem({});
    setShowPopup(true);
    setIsEdit(false)
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

  const fetchMasters = useCallback(async () => {
    try {
      const fy = localStorage.getItem("FinancialYear");
      const sendData = {
        fy,
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
            <h1 id="firstheading">All Masters</h1>
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
                    {userMasterList?.map((master, index) => (
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
                          data-tooltip-content={master?.value_string}
                          data-tooltip-place="bottom"
                          data-tooltip-id="my-tooltip"
                        >
                          {master?.value_string
                            ? master.value_string.length > 10
                              ? master.value_string.substring(0, 30) + "..."
                              : master.value_string
                            : ""}
                        </div>

                        <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                          <div style={{ display: "flex" }}>
                            <div
                              className="action-button"
                              onClick={() => handleClickOnView(master?.id)}
                            >
                              <Link>View</Link>
                            </div>
                            <div
                              className="action-button"
                              onClick={() =>
                                handleClickOnAddIndividual(master?.id)
                              }
                            >
                              <Link>Add</Link>
                            </div>
                            <div
                              className="action-button"
                              onClick={() => handleClickOnEdit(master?.id)}
                            >
                              <Link>Edit</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {showAddPopup && (
          <AddUserMaster popupContent={{ setshowAddPopup, showAddPopup, setSearchTrigger }} />
        )}
        {showPopup && (
          <CreateUserMaster popupContent={{ setShowPopup, showPopup, isEdit, setSearchTrigger }} />
        )}
        {showViewPopup && (
          <UserMasterDetails closePopup={setShowViewPopup} list={viewList} />
        )}
      </div>
    </>
  );
};

export default UserMasters;
