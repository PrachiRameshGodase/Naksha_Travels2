import React from 'react';
import ImageUploadLogic from './ImageUploadLogic';

const Compoent1 = () => {
  const { imageUrl, handleImageChange, handleUpload } = ImageUploadLogic();

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {imageUrl && <img src={imageUrl} alt="" height={500} width={500} />}


      {/* items test */}
      {/* Table Started */}

      <div className="itemsectionrows">
        <div className="tableheadertopsxs1">

          <p className="tablsxs1a1x3">
            Item<b className="color_red">*</b>
          </p>

          <p className="tablsxs1a2x3">
            Type<b className="color_red">*</b>
          </p>

          <p className="tablsxs1a3x3">
            Sales Price
          </p>

          <p className="tablsxs1a2x3">Quantity</p>

          <p className="tablsxs1a2x3" style={{ flexDirection: "row" }}>
            Unit<b className="color_red">*</b>
          </p>

          <p className="tablsxs1a6x3">Discount</p>

          <p className="tablsxs1a7x3" style={{ width: "7%" }}>
            Tax (%)<b className="color_red">*</b>
          </p>

          <p className="tablsxs1a8x3" style={{ marginLeft: "6%" }}>
            Amount
          </p>

        </div>

        {formData?.items?.map((item, index) => (
          <>
            <div className="table_item_border">
              <div
                key={index}
                className="tablerowtopsxs1 border_none"
                style={{ padding: "21px 5px", alignItems: "center" }}
              >
                {/* /////////////////////////////// */}
                <div className="tablsxs1a1x3">

                  {/* services select */}
                  <span key={index}>
                    {item?.items_data?.service_name === "Hotel" ? (
                      <span>
                        <span>
                          <b style={{ fontWeight: 500 }}>Hotel Name:</b> {item?.items_data?.hotel_name || "-"}{" "}
                        </span>
                        <span>
                          <b style={{ fontWeight: 500 }}>Room:</b> {item?.items_data?.room_no || "-"}{" "}
                        </span>
                        <span>
                          <b style={{ fontWeight: 500 }}>Meal:</b>{" "}
                          <ShowMastersValue type="37" id={item?.items_data?.meal_id || "-"} />
                        </span>
                      </span>
                    ) : item?.items_data?.service_name === "Assist" ? (
                      <span>
                        <span>
                          <b style={{ fontWeight: 500 }}>Airport:</b> {item?.items_data?.airport_name || "-"}{" "}
                        </span>
                        <span>
                          <b style={{ fontWeight: 500 }}>Meeting Type:</b> {item?.items_data?.meeting_type || "-"}{" "}
                        </span>
                        <span>
                          <b style={{ fontWeight: 500 }}>No Of Persons:</b> {item?.items_data?.no_of_persons || "-"}
                        </span>
                      </span>
                    ) : item?.items_data?.service_name === "Flight" ? (
                      <span>
                        {/* <span>
                            <b style={{ fontWeight: 500 }}>Travel Date:</b>{" "}
                            {formatDate3(item?.items_data?.travel_date) || "-"}{" "}
                          </span> */}
                        <span>
                          <b style={{ fontWeight: 500 }}>Airline Name:</b> {item?.items_data?.airline_name || "-"}{" "}
                        </span>
                        <span>
                          <b style={{ fontWeight: 500 }}>Ticket No:</b> {item?.items_data?.ticket_no + " " || "-"}{" "}
                        </span>
                        <span>
                          <b style={{ fontWeight: 500 }}>PRN No:</b> {item?.items_data?.prn_no || "-"}
                        </span>
                      </span>
                    ) : item?.items_data?.service_name === "Visa" ? (
                      <span>
                        <span>
                          <b style={{ fontWeight: 500 }}>Passport No:</b> {item?.items_data?.passport_no + " " || "-"}{" "}
                        </span>
                        <span>
                          <b style={{ fontWeight: 500 }}>Visa No:</b> {item?.items_data?.visa_no || "-"}{" "}
                        </span>
                        <span>
                          <b style={{ fontWeight: 500 }}>Visa Type:</b>{" "}
                          <ShowMastersValue type="40" id={item?.items_data?.visa_type_id || "-"} />
                        </span>
                      </span>
                    ) : (
                      ""
                    )}
                  </span>

                  {/* item select */}
                  {!item?.items_data?.service_name &&
                    <span>
                      <CustomDropdown26
                        options={options2 || []}
                        value={item?.item_id}
                        onChange={(event) =>
                          handleItemChange(
                            index,
                            event.target.name,
                            event.target.value
                          )
                        }
                        name="item_id"
                        type="select_item"
                        setItemData={setItemData}
                        index={index}
                        extracssclassforscjkls={extracssclassforscjkls}
                        itemData={item}
                        ref={dropdownRef2}
                      />
                    </span>
                  }
                </div>
                <div
                  className="tablsxs1a2x3"
                >
                  <span>
                    <CustomDropdown04
                      options={itemTypeList}
                      value={item?.type}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "type",
                          e.target.value,
                          e.target.option
                        )
                      }
                      name="type"
                      defaultOption="Type"
                      type="item_type"
                      extracssclassforscjkls="extracssclassforscjklsitem"
                      className2="item"
                    />
                  </span>
                </div>
                <div className="tablsxs1a2x3" style={{ marginRight: "2px" }}>
                  <NumericInput
                    value={item?.rate}
                    placeholder="0.00"
                    onChange={(e) => {
                      let newValue = e.target.value;
                      if (newValue < 0) newValue = 0;
                      if (!isNaN(newValue) && newValue >= 0) {
                        handleItemChange(index, "rate", newValue);
                      } else {
                        toast("Amount cannot be negative", {
                          icon: "👏",
                          style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                            fontSize: "14px",
                          },
                        });
                      }
                    }}
                  />
                </div>

                <div
                  data-tooltip-content={item?.type === "Service" ? "Quantity is not allowed for service select" : ""}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-place="bottom"
                  className="tablsxs1a4x3" style={{ marginRight: "2px" }}>
                  <NumericInput
                    value={item?.quantity}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue === "") {
                        handleItemChange(index, "quantity", 0); // or some other default value
                      } else {
                        const newValue = parseInt(inputValue, 10);
                        if (newValue === NaN) newValue = 0;
                        if (!isNaN(newValue) && newValue >= 1) {
                          handleItemChange(index, "quantity", newValue);
                        }
                      }
                    }}
                    style={{
                      width: "60%",
                      cursor: item?.type === "Service" ? "not-allowed" : "default",
                    }}
                    disabled={item?.type === "Service"} // Explicitly set the disabled attribute
                  />
                </div>

                <div
                  className="tablsxs1a2x3"
                >
                  <span>
                    <CustomDropdown04
                      options={unitList}
                      value={item?.unit_id}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "unit_id",
                          e.target.value,
                          e.target.option
                        )
                      }
                      name="unit_id"
                      defaultOption="Units"
                      type="masters"
                      extracssclassforscjkls="extracssclassforscjklsitem"
                      className2="item"
                      types={item?.type}
                    />
                  </span>
                </div>
                <div className="tablsxs1a6x3" >
                  <span>
                    <NumericInput
                      value={item?.discount}
                      onChange={(e) => {
                        let newValue = e.target.value;
                        if (newValue < 0) newValue = 0;
                        if (item?.discount_type == 2) {
                          newValue = Math.min(newValue, 100);
                          if (newValue === 100) {
                            // Use toast here if available
                            toast("Discount percentage cannot exceed 100%.", {
                              icon: "👏",
                              style: {
                                borderRadius: "10px",
                                background: "#333",
                                fontSize: "14px",
                                color: "#fff",
                              },
                            });
                          }
                        } else {
                          newValue = Math.min(
                            newValue,
                            item?.rate * item?.quantity +
                            (item?.rate * item?.tax_rate * item?.quantity) /
                            100
                          );
                          if (newValue > item?.rate * item?.quantity) {
                            toast(
                              "Discount amount cannot exceed the final amount.",
                              {
                                icon: "👏",
                                style: {
                                  borderRadius: "10px",
                                  background: "#333",
                                  fontSize: "14px",
                                  color: "#fff",
                                },
                              }
                            );
                          }
                        }
                        handleItemChange(index, "discount", newValue);
                      }}
                    />
                    <div
                      className="dropdownsdfofcus56s"
                      style={{ float: "left" }}
                      onClick={() => handleDropdownToggle(index)}
                    >
                      {item?.discount_type == 1
                        ? currencySymbole
                        : item?.discount_type == 2
                          ? "%"
                          : ""}
                      {openDropdownIndex === index && (
                        <div
                          className="dropdownmenucustomx1"
                          ref={dropdownRef}
                        >
                          <div
                            className="dmncstomx1"
                            onClick={() =>
                              handleItemChange(index, "discount_type", 1)
                            }
                          >
                            {currencySymbol}
                          </div>
                          <div
                            className="dmncstomx1"
                            onClick={() =>
                              handleItemChange(index, "discount_type", 2)
                            }
                          >
                            %
                          </div>
                        </div>
                      )}
                    </div>
                  </span>
                </div>
                {item?.item_id == "" || item?.item_name == "" ? (
                  <div
                    className="tablsxs1a7x3_rm"
                    id="ITEM_Selection7"
                    key={item.id || index}
                    style={{ marginRight: "20px" }}
                  >
                    <CustomDropdown13
                      options={tax_rate}
                      value={item?.tax_rate}
                      onChange={(e) =>
                        handleItemChange(index, "tax_rate", e.target.value)
                      }
                      name="tax_rate"
                      type="taxRate"
                      defaultOption="Taxes"
                      className2="items"
                    />
                  </div>
                ) : (
                  <div
                    className="tablsxs1a7x3_rm"
                    id="ITEM_Selection7"
                    style={{
                      marginRight: "20px",
                      cursor: "not-allowed"
                    }}
                    key={item.id || index}
                  >
                    {item?.tax_name === "Non-Taxable" ? <> {item?.tax_name} </>
                      :
                      item?.tax_rate != 0 ?
                        <>
                          <CustomDropdown13
                            options={tax_rate}
                            value={item?.tax_rate}
                            onChange={(e) =>
                              handleItemChange(index, "tax_rate", e.target.value)
                            }
                            name="tax_rate"
                            type="taxRate"
                            defaultOption="Taxes"
                            className2="items"
                            style={{ width: "100px" }}
                          />
                        </> : <>{item?.tax_name}</>
                    }
                  </div>
                )}
                <div
                  className="tablsxs1a8x3"
                  style={{ cursor: "not-allowed", marginTop: "10px" }}
                >
                  {item?.final_amount}
                </div>

                {formData?.items?.length > 1 ? (
                  <button
                    className="removeicoofitemrow"
                    type="button"
                    onClick={() => handleItemRemove(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleItemRemove(index);
                      }
                    }}
                  >
                    {" "}
                    <RxCross2 />{" "}
                  </button>
                ) : (
                  <button
                    className="removeicoofitemrow"
                    type="button"
                    onClick={() => handleItemReset(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleItemReset(index);
                      }
                    }}
                  >
                    {" "}
                    <SlReload />{" "}
                  </button>
                )}
              </div>

              {item?.hsn_code && (
                <div className="itemDetailsData_900">
                  <p className="item_type_00">{item?.type}</p>
                  <p>
                    HSN Code:{" "}
                    <span className="item_hsn_code_9">{item?.hsn_code}</span>
                  </p>
                </div>
              )}
            </div>

            <div style={{ display: "flex" }}>
              {/* Item Name Error */}
              <span
                className="error-message"
                style={{
                  width: "323px",
                  visibility: itemErrors[index]?.item_name
                    ? "visible"
                    : "hidden",
                }}
              >
                {itemErrors[index]?.item_name && (
                  <>
                    {otherIcons.error_svg} {itemErrors[index].item_name}
                  </>
                )}
              </span>

              {/* Rate Error */}
              <span
                className="error-message"
                style={{
                  width: "254px",
                  visibility: itemErrors[index]?.rate ? "visible" : "hidden",
                }}
              >
                {itemErrors[index]?.rate && (
                  <>
                    {otherIcons.error_svg} {itemErrors[index].rate}
                  </>
                )}
              </span>

              {/* Unit ID Error */}
              <span
                className="error-message"
                style={{
                  width: "253px",
                  visibility: itemErrors[index]?.unit_id
                    ? "visible"
                    : "hidden",
                }}
              >
                {itemErrors[index]?.unit_id && (
                  <>
                    {otherIcons.error_svg} {itemErrors[index].unit_id}
                  </>
                )}
              </span>

              {/* Tax Rate Error */}
              <span
                className="error-message"
                style={{
                  visibility: itemErrors[index]?.tax_rate
                    ? "visible"
                    : "hidden",
                }}
              >
                {itemErrors[index]?.tax_rate && (
                  <>
                    {otherIcons.error_svg} {itemErrors[index]?.tax_rate}
                  </>
                )}
              </span>
            </div>
          </>
        ))}
      </div>
      {/* Table End */}
      {/* items test */}
    </div>
  );
};

export default Compoent1;









