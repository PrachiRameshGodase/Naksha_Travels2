import React, { useCallback, useEffect, useState } from "react";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { Link } from "react-router-dom";
import ResizeFL from "../../Components/ExtraButtons/ResizeFL";
import { GoPlus } from "react-icons/go";
import CreateMaster from "./CreateMaster";
import { useDispatch, useSelector } from "react-redux";
import { masterListAction } from "../../Redux/Actions/mastersAction";
import MasterDetails from "./MasterDetails";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import AddMaster from "./AddMaster";
import { useDebounceSearch } from "../Helper/HelperFunctions";
import SearchBox from "../Common/SearchBox/SearchBox";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import "./CreateMasters.scss"
import { BsEye } from "react-icons/bs";
import { financialYear } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const Masters = () => {
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

  const masterList = useSelector((state) => state.masterList);
  const masterLists = masterList?.data?.filter((val) => val.type == 0);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : masterLists?.map((row) => row.id));
  };

  const handleClickOnAdd = () => {
    setSelectedItem({});
    setShowPopup(true);
    setIsEdit(false);
  };

  const handleClickOnAddIndividual = (id) => {
    const selectedList = masterLists?.find(
      (master) => master?.id === Number(id)
    );
    setSelectedItem(selectedList);
    setshowAddPopup(selectedList);
  };
  const handleClickOnEdit = (id) => {
    const selectedList = masterLists?.find(
      (master) => master?.id === Number(id)
    );
    setSelectedItem(selectedList);
    setShowPopup(selectedList);
    setIsEdit(true);
  };

  const handleClickOnView = (id) => {
    const selectedList = masterLists?.find(
      (master) => master?.id === Number(id)
    );
    setViewList(selectedList);
    setShowViewPopup(true);
  };
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
  const fetchMasters = useCallback(async () => {
    try {
      const fy = financialYear();

      const sendData = {
        fy,
        ...(searchTermFromChild && { search: searchTermFromChild }),
      };

      dispatch(masterListAction(sendData));
      setDataChanging(false);
    } catch (error) {
      console.error("Error fetching masters:", error);
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
            <h1 id="firstheading">All System Masters</h1>
            <SearchBox
              placeholder="Search In System Masters"
              onSearch={onSearch}
              section={searchTrigger}
            />
          </div>

          <div id="buttonsdata">
            {/* <Link
              className="linkx1"
              onClick={handleClickOnAdd}
              data-tooltip-place="bottom"
              data-tooltip-content="New Master"
              data-tooltip-id="my-tooltip"
            >
              New Master <GoPlus />
            </Link> */}
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

                {masterList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {masterLists?.length > 0 ? (
                      masterLists?.map((master, index) => (
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

                          <div
                            className="table-cellx12 quotiosalinvlisxs6 "
                            style={{ marginRight: "10px" }}
                          >
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
          <AddMaster
            popupContent={{ setshowAddPopup, showAddPopup, setSearchTrigger }}
          />
        )}
        {showPopup && (
          <CreateMaster
            popupContent={{ setShowPopup, showPopup, isEdit, setSearchTrigger }}
          />
        )}
        {showViewPopup && (
          <MasterDetails closePopup={setShowViewPopup} list={viewList} />
        )}
      </div>
    </>
  );
};

export default Masters;
