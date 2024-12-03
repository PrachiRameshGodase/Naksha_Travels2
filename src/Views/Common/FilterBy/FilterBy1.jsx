import React from "react";
import { OutsideClick } from "../../Helper/ComponentHelper/OutsideClick";
import FilterIco from "../../../assets/outlineIcons/othericons/FilterIco.svg";

const FilterBy1 = ({
  setSearchTrigger,
  resetPageIfNeeded,
  status,
  setStatus,
  warehouseType,
  setWarehouseType,
  department,
  setDepartment,
  setAllFilters,
  setSelectAllWarehouse,
  selectAllWarehouse,
  section,
}) => {
  const filterDropdown = OutsideClick();

  const handleApplyFilter = () => {

    const filterValues = {
      // is_vendor: selectAllCustomer ? 1 : "",
      status: status == "active" ? 1 : status == "inactive" ? 0 : "",
      warehouse_type: warehouseType,
      department: department?.length === 0 ? null : JSON?.stringify(department)
    };

    const filteredValues = Object.fromEntries(
      Object.entries(filterValues).filter(([_, value]) => value !== "")
    );

    const filterButton = document.getElementById("filterButton");
    if (
      filterValues.warehouse_type === "" &&
      filteredValues.department === "" &&
      filterValues.status == ""
    ) {
      filterButton.classList.remove("filter-applied");
    } else {
      filterButton.classList.add("filter-applied");
    }
    resetPageIfNeeded();
    setSearchTrigger((prev) => prev + 1);
    filterDropdown.handleToggle();
    setAllFilters(filteredValues);
  };

  const handleWarehouseChange = (checked) => {
    setSelectAllWarehouse(checked);
    if (checked) {
      setStatus("");
      setWarehouseType("");
      setDepartment("");
    }
    const filterButton1 = document.getElementById("filterButton");
    if (selectAllWarehouse) {
      filterButton1.classList.remove("filter-applied");
    } else {
      filterButton1.classList.remove("filter-applied");
    }
    resetPageIfNeeded();
    setSearchTrigger((prev) => prev + 1);
    filterDropdown.handleToggle();
  };

  const handleAllItemsChange1 = (checked, name, val) => {
    if (name === "normal") {
      setSelectAllWarehouse(checked);

      if (checked) {
        setWarehouseType("");
        setDepartment("")
        setStatus("");
      }
    } else if (name === "type" && val) {
      if (checked) {
        setWarehouseType(val);
        setSelectAllWarehouse(false);
      } else {
        setWarehouseType("");
      }
    } else if (name === "status" && val) {
      if (checked) {
        setStatus(val);
        setSelectAllWarehouse(false);
      } else {
        setStatus("");
      }
    } else if (name === "department" && val) {
      if (checked) {
        setDepartment((prev) => [...prev, val]); // Add selected department
        setSelectAllWarehouse(false);
      } else {
        setDepartment((prev) => prev.filter((d) => d !== val)); // Remove unselected department
      }
    }
  };

  return (
    <>
      {" "}
      <div className={`maincontainmiainx1`}>
        <div
          className="filtersorticos5w"
          id="filterButton"
          onClick={filterDropdown.handleToggle}
          ref={filterDropdown.buttonRef}
        >
          <img
            src={FilterIco}
            alt=""
            data-tooltip-content="Filter"
            data-tooltip-id="my-tooltip"
            data-tooltip-place="bottom"
          />
        </div>
        {filterDropdown?.isOpen && (
          <div className="" ref={filterDropdown.ref}>
            <div className="filter-container">
              <label
                className={
                  selectAllWarehouse ? "active-filter" : "labelfistc51s"
                }
              >
                <input
                  type="checkbox"
                  checked={selectAllWarehouse}
                  onChange={(e) => handleWarehouseChange(e.target.checked)}
                  hidden
                />
                All {section}
              </label>
              <div className="cusfilters12x2">
                <p className="custtypestext4s">Warehouse Type</p>
                <div
                  className={`cusbutonscjks54 
            
           `}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={warehouseType === "Regular"}
                      onChange={(e) =>
                        handleAllItemsChange1(
                          e.target.checked,
                          "type",
                          "Regular"
                        )
                      }
                    />
                    <span
                      className={`filter-button ${warehouseType === "Regular" ? "selected" : ""
                        }`}
                    >
                      Regular
                    </span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={warehouseType === "Silo"}
                      onChange={(e) =>
                        handleAllItemsChange1(e.target.checked, "type", "Silo")
                      }
                    />
                    <span
                      className={`filter-button ${warehouseType === "Silo" ? "selected" : ""
                        }`}
                    >
                      Silo
                    </span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={warehouseType === "Container"}
                      onChange={(e) =>
                        handleAllItemsChange1(
                          e.target.checked,
                          "type",
                          "Container"
                        )
                      }
                    />
                    <span
                      className={`filter-button ${warehouseType === "Container" ? "selected" : ""
                        }`}
                    >
                      Container
                    </span>
                  </label>
                </div>
              </div>
              <div className="cusfilters12x2">
                <p className="custtypestext4s">Department</p>
                <div
                  className={`cusbutonscjks54 
            
           `}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={department.includes("1")}
                      onChange={(e) =>
                        handleAllItemsChange1(
                          e.target.checked,
                          "department",
                          "1"
                        )
                      }
                    />
                    <span
                      className={`filter-button ${department.includes("1") ? "selected" : ""
                        }`}
                    >
                      Sale
                    </span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={department.includes("2")}
                      onChange={(e) =>
                        handleAllItemsChange1(
                          e.target.checked,
                          "department",
                          "2"
                        )
                      }
                    />
                    <span
                      className={`filter-button ${department.includes("2") ? "selected" : ""
                        }`}
                    >
                      Purchase
                    </span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={department.includes("3")}
                      onChange={(e) =>
                        handleAllItemsChange1(
                          e.target.checked,
                          "department",
                          "3"
                        )
                      }
                    />
                    <span
                      className={`filter-button ${department.includes("3") ? "selected" : ""
                        }`}
                    >
                      Account
                    </span>
                  </label>
                </div>
              </div>
              <div className={`cusfilters12x2`}>
                <p className="custtypestext4s">Status</p>
                <div className={`cusbutonscjks54`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={status == "1"}
                      onChange={(e) =>
                        handleAllItemsChange1(e.target.checked, "status", "1")
                      }
                    />
                    <span
                      className={`filter-button ${status == "1" ? "selected" : ""
                        }`}
                    >
                      Active
                    </span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={status == "0"}
                      onChange={(e) =>
                        handleAllItemsChange1(e.target.checked, "status", "0")
                      }
                    />
                    <span
                      className={`filter-button ${status == "inactive" ? "selected" : ""
                        }`}
                    >
                      Inactive
                    </span>
                  </label>
                </div>
              </div>

              <button
                className="buttonofapplyfilter"
                onClick={handleApplyFilter}
              >
                Apply Filter
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterBy1;
