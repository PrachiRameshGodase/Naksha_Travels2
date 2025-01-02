import React from "react";
import CustomDropdown13 from "../../Components/CustomDropdown/CustomDropdown13";
import { useDispatch, useSelector } from "react-redux";
import { useWillChange } from "framer-motion";
import { useEffect } from "react";
import { fetchTexRates } from "../../Redux/Actions/globalActions";

const CalculationSection = ({ formData, section }) => {
  const dispatch = useDispatch();
  const tax_rate = useSelector((state) => state?.getTaxRate?.data?.data);
 
  useEffect(() => {
    // const sendData={}
    dispatch(fetchTexRates());
  }, []);

  return (
    <div className="calctotalsection">
      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Supplier Service Charge:</label>
            <input type="text" value={formData?.subtotal} placeholder="0.00" />
          </div>
        </div>
      </div>
      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>{section} Price:</label>
            <input type="text" value={formData.tax_amount} placeholder="0.00" />
          </div>
        </div>
      </div>
      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Tax:</label>
            <input type="text" value={formData.tax_amount} placeholder="0.00" />
          </div>
        </div>
      </div>
      <div className="calcuparentc">
        <div id="tax-details">
          <div className="clcsecx12s1">
            <label>Tax %:</label>
            <CustomDropdown13
              options={tax_rate}
              value={formData?.tax_rate}
              //   onChange={(e) =>
              //     handleItemChange(index, "tax_rate", e.target.value)
              //   }
              name="tax_rate"
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
            <label>Retain:</label>
            <input
              type="text"
              value={formData.tax_amount}
              placeholder="0.00"
              className="inputsfocalci465s"
            />
          </div>
        </div>
      </div>
      <div className="clcsecx12s2">
        <label>Invoice Total :</label>
        <input type="text" value={formData?.total} placeholder="0.00" />
      </div>
    </div>
  );
};

export default CalculationSection;
