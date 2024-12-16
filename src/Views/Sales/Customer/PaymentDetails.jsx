import React, { useState } from "react";
import NumericInput from "../../Helper/NumericInput";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { ShowMasterData } from "../../Helper/HelperFunctions";
import CustomDropdown04 from "../../../Components/CustomDropdown/CustomDropdown04";

const PaymentDetails = ({
  setUserData,
  switchCusData,
  customerData,
  tick,
  setTick,
  updateUserData,
}) => {
  const { isDuplicate, isEdit, user } = customerData;
  const paymentTerms = ShowMasterData("8");

  const [paymentDetails, setPaymentDetails] = useState({
    payment_method: "",
    payment_terms: "",
    credit_limit: 0,
  });
  console.log("paymentDetails", paymentDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const paymentTermsName = paymentTerms?.find((val) => val?.labelid == value);

    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      ...(name === "payment_terms" && {
        payment_terms: paymentTermsName?.label,
      }),
      [name]: value,
    }));
  };
  return (
    <div>
      <div>
        {switchCusData === "Payment Details" ? (
          <div id="secondx2_customer">
            <div id="main_forms_desigin_cus"></div>
            <div className="insidesectiony1">
              <div id="fcx3s1parent">
                <div className="form_commonblock">
                  <label>
                    Preferred Payment Method<b className="color_red">*</b>
                  </label>
                  <span>
                    {otherIcons.placeofsupply_svg}
                    <input
                      value={paymentDetails.payment_method}
                      onChange={handleChange}
                      name="payment_method"
                      placeholder="Enter Payment Method"
                    />
                  </span>
                </div>
                <div className="form_commonblock">
                  <label>Credit Limit</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.zip_code_svg}
                      <NumericInput
                        name="credit_limit"
                        placeholder="Enter Credit Limit"
                        value={paymentDetails.credit_limit}
                        onChange={handleChange}
                      />
                    </span>
                  </div>
                </div>

                <div className="form_commonblock">
                  <label>Payemnt Terms</label>
                  <span>
                    {otherIcons.vendor_svg}
                    <CustomDropdown04
                      label="Reason Name"
                      options={paymentTerms}
                      value={paymentDetails?.payment_terms}
                      onChange={handleChange}
                      name="payment_terms"
                      defaultOption="Enter Payment Terms"
                      type="masters"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
