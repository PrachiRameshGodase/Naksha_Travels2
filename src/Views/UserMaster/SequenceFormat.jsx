import React, { useCallback, useEffect, useState } from "react";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import { autoGenerateIdList } from "../../Redux/Actions/globalActions";
import { returnUniformModuleName } from "../Helper/ReturnUniformModuleName";
import GenerateIdPopup from "../Home/GenerateIdPopup";

const SequenceFormat = () => {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [dataChanging, setDataChanging] = useState(false);
  const [generateId, setGenerateId] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(0)


  const masterList = useSelector((state) => state.masterList);
  const masterLists = masterList?.data?.filter((val) => val.type == 0);

  const [autoData, setAutoData] = useState({ prefix: null, delimiter: null, sequence_number: null, sequence_type: 1, module: null, id: null });

  const sequenceList = useSelector(state => state?.autoIdList);
  const mainSqList = sequenceList?.data?.sequence;

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : masterLists?.map((row) => row.id));
  };


  const handleClickOnEdit = (data) => {
    const { prefix, delimiter, sequence_number, module, id, sequence_type } = data || {};

    if (prefix !== autoData.prefix || delimiter !== autoData.delimiter || sequence_number !== autoData.sequence_number || module !== autoData.module || id !== autoData.id) {
      setAutoData({ prefix, delimiter, sequence_number, module, id, sequence_type });
    }
    setGenerateId(true);
  };


  const fetchMasters = useCallback(async () => {
    try {
      dispatch(autoGenerateIdList());
      setDataChanging(false);
    } catch (error) {
      console.error("Error fetching quotations:", error);
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
            <h1 id="firstheading">All Sequence Formats</h1>
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
                    Module Name
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons.warehouse_name_svg}
                    Prefix
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons.quantity_svg}
                    Previous Number
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    {otherIcons.quantity_svg}
                    Next Sequence No.
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs5 ">
                    {otherIcons.notes_svg}
                    <p>Full Sequence Format</p>
                  </div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                    {otherIcons.status_svg}
                    Actions
                  </div>
                </div>

                {sequenceList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {mainSqList?.map((master, index) => (
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
                          {returnUniformModuleName(master?.module)}
                        </div>
                        <div
                          onClick={() => handleRowClicked(master)}
                          className="table-cellx12 quotiosalinvlisxs1"
                        >
                          {master?.prefix}
                        </div>
                        <div
                          onClick={() => handleRowClicked(master)}
                          className="table-cellx12 quotiosalinvlisxs1"
                        >
                          <p>{master?.padded_digits}</p>
                        </div>
                        <div
                          onClick={() => handleRowClicked(master)}
                          className="table-cellx12 quotiosalinvlisxs1"
                        >
                          <p>{master?.sequence_number}</p>
                        </div>

                        <div
                          onClick={() => handleRowClicked(master)}
                          className="table-cellx12 quotiosalinvlisxs5 "
                          data-tooltip-content={master?.value_string}
                          data-tooltip-place="bottom"
                          data-tooltip-id="my-tooltip"
                        >
                          {master?.prefix + master?.delimiter + master?.sequence_number}
                        </div>

                        <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                          <div style={{ display: "flex" }}>
                            <div
                              className="action-button"
                              onClick={() => handleClickOnEdit(master)}
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

        {generateId && (
          <GenerateIdPopup
            formdatas={{ autoData, setAutoData, setGenerateId, setSearchTrigger }}
          />
        )}

      </div>
    </>
  );
};

export default SequenceFormat;
