import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown13 from "../../Components/CustomDropdown/CustomDropdown13";
import { fetchTexRates } from "../../Redux/Actions/globalActions";

const CalculationSection = ({ formData, setFormData, handleChange, section }) => {
  const dispatch = useDispatch();
  const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);

  // Calculate fields based on formData
  const calculateFields = () => {
    const price = Number(formData?.gross_amount || 0);
    const taxPercent = Number(formData?.tax_percent || 0);

    const supplierServiceCharge = price * 0.1; // 10% of subtotal
    const tax_amount = price * (taxPercent / 100);
    const retain = price - supplierServiceCharge;
    const total_amount = price + tax_amount;

    return { supplierServiceCharge, tax_amount, retain, total_amount };
  };

  useEffect(() => {
    // Recalculate fields and update formData when dependencies change
    const { tax_amount, total_amount, retain } = calculateFields();
    setFormData((prevData) => ({
      ...prevData,
      tax_amount,
      total_amount,
      retain,
    }));
  }, [formData.gross_amount, formData.tax_percent, setFormData]);

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
            />
          </div>
        </div>
      </div>

      <div className="calcuparentc">
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
      </div>

      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Tax %:</label>
            <CustomDropdown13
              options={tax_rate}
              value={formData?.tax_percent || ""}
              onChange={handleChange}
              name="tax_percent"
              type="taxRate"
              defaultOption="Taxes"
              className2="item3"
            />
          </div>
        </div>
      </div>

      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Tax:</label>
            <input
              type="text"
              value={formData?.tax_amount?.toFixed(2) || ""}
              placeholder="0.00"
              className="inputsfocalci465s"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Retain:</label>
            <input
              type="text"
              value={formData?.retain?.toFixed(2) || ""}
              placeholder="0.00"
              className="inputsfocalci465s"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="clcsecx12s2">
        <label>Total :</label>
        <input
          type="text"
          value={formData?.total_amount?.toFixed(2) || ""}
          placeholder="0.00"
          readOnly
        />
      </div>
    </div>
  );
};

export default CalculationSection;

export const CalculationSection2 = ({ formData, setFormData, handleChange, section }) => {
  const dispatch = useDispatch();
  const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);

  // Calculate fields based on formData
  const calculateFields = () => {
    const price = Number(formData?.gross_amount || 0);
    const taxPercent = Number(formData?.tax_percent || 0);

    const supplierServiceCharge = price * 0.1; // 10% of subtotal
    const tax_amount = price * (taxPercent / 100);
    const retain = price - supplierServiceCharge;
    const total_amount = price + tax_amount;

    return { supplierServiceCharge, tax_amount, retain, total_amount };
  };

  useEffect(() => {
    // Recalculate fields and update formData when dependencies change
    const { tax_amount, total_amount, retain } = calculateFields();
    setFormData((prevData) => ({
      ...prevData,
      tax_amount,
      total_amount,
      retain,
    }));
  }, [formData.gross_amount, formData.tax_percent, setFormData]);

  return (
    <div className="calctotalsection">
      
      {/* <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Fare Charge:</label>
            <input
              type="text"
              value={formData?.charges || ""}
              onChange={(e) => handleChange(e)}
              placeholder="0.00"
              name="charges"
            />
          </div>
        </div>
      </div> */}
    

      <div className="calcuparentc">
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
      </div>

      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Tax %:</label>
            <CustomDropdown13
              options={tax_rate}
              value={formData?.tax_percent || ""}
              onChange={handleChange}
              name="tax_percent"
              type="taxRate"
              defaultOption="Taxes"
              className2="item3"
            />
          </div>
        </div>
      </div>

      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Tax:</label>
            <input
              type="text"
              value={formData?.tax_amount?.toFixed(2) || ""}
              placeholder="0.00"
              className="inputsfocalci465s"
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Supplier Total:</label>
            <input
              type="text"
              value={formData?.supplier_total || ""}
              onChange={(e) => handleChange(e)}
              placeholder="0.00"
              name="supplier_total"
            />
          </div>
        </div>
      </div>
      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Retain:</label>
            <input
              type="text"
              value={formData?.retain?.toFixed(2) || ""}
              placeholder="0.00"
              className="inputsfocalci465s"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="clcsecx12s2">
        <label>Total :</label>
        <input
          type="text"
          value={formData?.total_amount?.toFixed(2) || ""}
          placeholder="0.00"
          readOnly
        />
      </div>
    </div>
  );
};