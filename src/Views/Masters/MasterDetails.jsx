import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddMaster from "./AddMaster";

const MasterDetails = ({ closePopup, list }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataChanging, setDataChanging] = useState(false);
  const [showAddPopup, setshowAddPopup] = useState(null);
  const [isEditIndividual, setIsEditIndividual] = useState(false)
  const masterList = useSelector((state) => state.masterList);
  const masterLists = masterList?.data?.filter(
    (val) => val.type == list.labelid
  );
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : masterLists?.map((row) => row.id));
  };
  const handleClickOnEdit = (id) => {
    const selectedList = masterLists?.find(
      (master) => master?.id === Number(id)
    );
    // setSelectedItem(selectedList);

    setshowAddPopup(selectedList);
    setIsEditIndividual(true)
  };
  return (
    <div id="formofcreateitems">
      <form action="">
        <div className="itemsformwrap itemformtyop02">
          <div id="forminside">
            <div className="secondx2 thirdx2extra">
              <div className="mainxpopups2">
                <div className="popup-content02">
                  <div className={``} style={{ width: "900px" }}>
                    <div
                      id="Anotherbox"
                      className="formsectionx"
                      style={{
                        height: "75px",
                        background: "white",

                        // position: "sticky",
                        // top: "0",
                        // zIndex: "10",
                      }}
                    >
                      <div id="leftareax12">
                        <h1 id="firstheading" className="headingofcreateforems">
                          Master Details {list?.label}
                        </h1>
                      </div>

                      <div id="buttonsdata">
                        <div
                          className="linkx3"
                          onClick={() => closePopup(false)}
                        >
                          <RxCross2 />
                        </div>
                      </div>
                    </div>
                    {/* <div className="bordersinglestroke"></div> */}
                    <div
                      id="mainsectioncsls"
                      className="commonmainqusalincetcsecion listsectionsgrheigh"
                    >
                      <div id="leftsidecontentxls">
                        <div id="item-listsforcontainer">
                          <div id="newtableofagtheme">
                            <div className="table-headerx12">
                             
                              <div className="table-cellx12 quotiosalinvlisxs1">
                                {otherIcons.warehouse_name_svg}
                                Label
                              </div>
                              <div className="table-cellx12 quotiosalinvlisxs2">
                                {otherIcons.quantity_svg}
                                Value
                              </div>
                              <div className="table-cellx12 quotiosalinvlisxs5 comment">
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
                                {masterLists?.map((master, index) => (
                                  <div
                                    className={`table-rowx12 ${
                                      selectedRows.includes(master.id)
                                        ? "selectedresult"
                                        : ""
                                    }`}
                                    key={index}
                                  >
                                   
                                    <div
                                      onClick={() => handleRowClicked(master)}
                                      className="table-cellx12 quotiosalinvlisxs1"
                                    >
                                      {master?.label}
                                    </div>
                                    <div
                                      onClick={() => handleRowClicked(master)}
                                      className="table-cellx12 quotiosalinvlisxs2"
                                    >
                                      {master?.value}
                                    </div>
                                    <div
                                      onClick={() => handleRowClicked(master)}
                                      className="table-cellx12 quotiosalinvlisxs4 commentss"
                                      data-tooltip-content={
                                        master?.note
                                      }
                                      data-tooltip-place="bottom"
                                      data-tooltip-id="my-tooltip"
                                    >
                                      <p>
                                        {" "}
                                        {master?.note
                                          ? master?.note?.length > 10
                                            ? master?.note?.substring(
                                                0,
                                                30
                                              ) + "..."
                                            : master?.note
                                          : ""}
                                      </p>
                                    </div>
                                    <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                                      <div style={{ display: "flex" }}>
                                        <div
                                          className="action-button"
                                          onClick={() =>
                                            handleClickOnEdit(master?.id)
                                          }
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {showAddPopup && (
        <AddMaster popupContent={{ setshowAddPopup, showAddPopup, isEditIndividual }} />
      )}
    </div>
  );
};

export default MasterDetails;
