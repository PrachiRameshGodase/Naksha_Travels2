import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown13 from "../../Components/CustomDropdown/CustomDropdown13";
import { fetchTexRates } from "../../Redux/Actions/globalActions";

const CalculationSection = ({ formData, handleChange, section }) => {
  const dispatch = useDispatch();
  const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);

  

  const calculateFields = () => {
    const hotelPrice = Number(formData?.hotel_price || 0);
    const taxPercent = Number(formData?.tax_percent || 0);

    const supplierServiceCharge = hotelPrice * 0.1; // 10% of subtotal
    const tax = hotelPrice * (taxPercent / 100);
    const retain = hotelPrice - supplierServiceCharge;
    const total_amount
    = hotelPrice + tax;

    return {
      supplierServiceCharge,
      tax,
      retain,
      total_amount
,
    };
  };

  const { supplierServiceCharge, tax, retain, total_amount
  } = calculateFields();

  return (
    <div className="calctotalsection">
      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Supplier Service Charge:</label>
            <input
              type="text"
              value={formData?.charges || ""}
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
            <label>{section} Price:</label>
            <input
              type="text"
              value={formData?.hotel_price || ""}
              onChange={(e) => handleChange(e)}
              placeholder="0.00"
              name="hotel_price"
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
              value={tax.toFixed(2)}
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
              value={retain.toFixed(2)}
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
          value={total_amount
            .toFixed(2)}
          placeholder="0.00"
          readOnly
        />
      </div>
    </div>
  );
};

export default CalculationSection;
