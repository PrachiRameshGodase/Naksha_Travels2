import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown13 from "../../Components/CustomDropdown/CustomDropdown13";
import { fetchTexRates } from "../../Redux/Actions/globalActions";
import ExpenseCharges from "../Helper/ComponentHelper/ExpenseCharges";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import NumericInput from "../Helper/NumericInput";

const CalculationSection = ({
  formData,
  setFormData,
  handleChange,
  section,
  errors,
  setErrors,
}) => {
  const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);
  const sumCharges = formData?.charges?.reduce(
    (sum, item) => sum + (item?.amount || 0),
    0
  );

  // Calculate fields based on formData
  const calculateFields = () => {
    const price = Number(formData?.gross_amount || 0);
    const remain = Number(formData?.retain || 0);
    const supplier_amount = price + sumCharges;
    const customer_amount = price + sumCharges + remain;

    const taxPercent = Number(formData?.tax_percent || 0);
    const supplier_tax = supplier_amount * (taxPercent / 100);
    const tax_amount = customer_amount * (taxPercent / 100);

    const supplier_total = supplier_amount + supplier_tax;
    const total_amount = customer_amount + tax_amount;
    return {
      tax_amount,
      supplier_total,
      supplier_amount,
      customer_amount,
      supplier_tax,
      total_amount,
    };
  };

  useEffect(() => {
    // Recalculate fields and update formData when dependencies change
    const {
      tax_amount,
      supplier_total,

      supplier_amount,
      customer_amount,
      supplier_tax,
      total_amount,
    } = calculateFields();
    setFormData((prevData) => ({
      ...prevData,
      tax_amount,
      supplier_total,
      supplier_amount,
      customer_amount,
      supplier_tax,
      total_amount,
    }));
  }, [
    formData.gross_amount,
    formData.tax_percent,
    setFormData,
    formData?.supplier_amount,
    formData?.customer_amount,
    formData.total_amount,
    formData?.supplier_tax,
    formData.charges,
    formData?.total_amount,
    formData?.retain,
  ]);

  const [openCharges, setOpenCharges] = useState(false);

  const openExpenseCharges = () => {
    setOpenCharges(!openCharges);
  };

  return (
    <div className="calctotalsection">
      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>
              {section} Price:<b className="color_red">*</b>
            </label>
            <input
              type="text"
              value={formData?.gross_amount || ""}
              onChange={(e) => handleChange(e)}
              placeholder="0.00"
              name="gross_amount"
              autoComplete="off"
              className="inputbox"
            />
          </div>
          {errors?.gross_amount && (
            <p
              className="error_message"
              style={{
                whiteSpace: "nowrap",
                // marginBottom: "0px important",
              }}
            >
              {otherIcons.error_svg}
              Please Fill {section} Price
            </p>
          )}
        </div>
      </div>

      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>
              <p className="edit_changes_021" onClick={openExpenseCharges}>
                Edit and add charges
                {openCharges
                  ? otherIcons?.down_arrow_svg
                  : otherIcons?.up_arrow_svg}
                {/* <span
                  style={{ marginTop: "10px" }}
                >
                  Use a positive amount to add charges. if use a negative amount (-amount) to reduce the invoice total.
                </span> */}
              </p>
            </label>
          </div>

          {openCharges && (
            <ExpenseCharges
              formValues={{ formData, setFormData, handleChange }}
            />
          )}
        </div>
      </div>
      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <div className="itemsectionrows" id="expense_charges_3223">
              <div
                className="tableheadertopsxs1"
                style={{ textTransform: "inherit" }}
              >
                <p className="tablsxs1a1x3"></p>
                <p className="tablsxs1a2x3">Supplier Price</p>
                <p className="tablsxs1a2x3">Customer Price</p>
              </div>

              <div className="tablerowtopsxs1">
                <div className="tablsxs1a1x3" style={{ fontSize: "12px" }}>
                  Amount
                </div>

                <div className="tablsxs1a2x3">
                  <NumericInput
                    value={formData?.supplier_amount || 0}
                  // onChange={handleChange}
                  />
                </div>
                <div className="tablsxs1a2x3">
                  <NumericInput
                    value={formData?.customer_amount || 0}
                  // onChange={handleChange}
                  />
                </div>
              </div>
              <div className="tablerowtopsxs1">
                <div className="tablsxs1a1x3" style={{ display: "flex" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Tax(%)
                  </span>
                  <div style={{ marginLeft: "20px", fontSize: "12px" }}>
                    <CustomDropdown13
                      options={tax_rate}
                      value={formData?.tax_percent || ""}
                      onChange={handleChange}
                      name="tax_percent"
                      type="taxRate"
                      defaultOption="Taxes"
                      extracssclassforscjkls="extracssclassforscjklsitem"
                      className2="item4"
                      tax_rate={formData?.tax_percent}
                    />
                  </div>
                </div>

                <div className="tablsxs1a2x3">
                  <NumericInput
                    value={formData?.supplier_tax || 0}
                  // onChange={handleChange}
                  />
                </div>
                <div className="tablsxs1a2x3">
                  <NumericInput
                    value={formData?.tax_amount || 0}
                  // onChange={handleChange}
                  />
                </div>
              </div>
              <div className="tablerowtopsxs1">
                <div className="tablsxs1a1x3" style={{ fontSize: "12px" }}>
                  Final Amount
                </div>

                <div className="tablsxs1a2x3">
                  <NumericInput
                    value={formData?.supplier_total || 0}
                  // onChange={handleChange}
                  />
                </div>
                <div className="tablsxs1a2x3">
                  <NumericInput
                    value={formData?.total_amount || 0}
                  // onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Retain:</label>
            <input
              type="text"
              value={formData?.retain}
              placeholder="0.00"
              onChange={handleChange}
              name="retain"
              className="inputbox"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationSection;

export const CalculationSection2 = ({
  formData,
  setFormData,
  handleChange,
  section,
}) => {
  const dispatch = useDispatch();
  const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);
  const sumCharges = formData?.charges?.reduce(
    (sum, item) => sum + (item?.amount || 0),
    0
  );

  // Calculate fields based on formData
  const calculateFields = () => {
    const price = Number(formData?.gross_amount || 0);
    const taxPercent = Number(formData?.tax_percent || 0);

    const tax_amount = Number((price * (taxPercent / 100)).toFixed(2));
    const total_amount = Number((price + tax_amount).toFixed(2));
    // console.log("total_amount", total_amount);
    return { tax_amount, total_amount };
  };

  useEffect(() => {
    // Recalculate fields and update formData when dependencies change
    const { tax_amount, total_amount } = calculateFields();
    setFormData((prevData) => ({
      ...prevData,
      tax_amount: tax_amount.toFixed(2),
      total_amount: total_amount.toFixed(2),
    }));
  }, [
    formData.gross_amount,
    formData.tax_percent,
    setFormData,
    // formData.total_amount,
  ]);

  const [openCharges, setOpenCharges] = useState(false);

  const openExpenseCharges = () => {
    setOpenCharges(!openCharges);
  };

  return (
    <div className="calctotalsection">
      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>{section} Price:</label>
            <input
              type="text"
              value={formData?.gross_amount || ""}
              onChange={(e) => handleChange(e)}
              placeholder="0.00"
              name="gross_amount"
              className="inputbox"
              style={{ width: "120px" }}
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {/* <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Supplier Service Charge:</label>
            <input
              type="text"
              value={formData?.charges}
              placeholder="0.00"
              onChange={(e) => handleChange(e)}
              name="charges"
            />
          </div>
        </div>
      </div> */}

      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label style={{ marginTop: "10px" }}>Tax %:</label>
            <CustomDropdown13
              options={tax_rate}
              value={formData?.tax_percent || ""}
              onChange={handleChange}
              name="tax_percent"
              type="taxRate"
              defaultOption="Taxes"
              className2="item3"
            />
            <input
              type="text"
              value={formData?.tax_amount || ""}
              placeholder="0.00"
              name="total_amount"
              className="inputbox"
              style={{ width: "120px" }}

            />
          </div>
        </div>
      </div>

      {/* <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Tax:</label>
            <input
              type="text"
              value={formData?.tax_amount || ""}
              placeholder="0.00"
              className="inputsfocalci465s"
              readOnly

            />
          </div>
        </div>
      </div> */}
      {/* <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>
              <p className="edit_changes_021" onClick={openExpenseCharges}>
                Edit and add charges
                <span title="Use a positive amount to add charges. if use a negative amount (-amount) to reduce the invoice total." style={{ marginTop: "10px" }}>
                  {otherIcons.question_svg}
                </span>
              </p>
            </label>
          </div>
          {openCharges && (
            <ExpenseCharges
              formValues={{ formData, setFormData, handleChange }}
            />
          )}
        </div>
      </div> */}

      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Invoice Total:</label>
            <input
              type="text"
              value={formData?.total_amount}
              placeholder="0.00"
              // onChange={(e) => handleChange(e)}
              name="total_amount"
              className="inputbox"
              style={{ width: "120px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
