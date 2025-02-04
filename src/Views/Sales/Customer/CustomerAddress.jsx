import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetCountries,
  fetchGetStates,
  fetchGetCities,
} from "../../../Redux/Actions/globalActions";
import { AiOutlineDelete } from "react-icons/ai";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import NumericInput from "../../Helper/NumericInput";

const CustomerAddress = ({
  updateUserData,
  switchCusData,
  customerData,
  tick,
  setTick,
}) => {
  const dispatch = useDispatch();
  const { isDuplicate, isEdit, user } = customerData;

  const countryList = useSelector((state) => state?.countries?.countries);
  const states = useSelector((state) => state?.states?.state);
  const statesLoader = useSelector((state) => state?.states?.loading);
  const cities = useSelector((state) => state?.cities?.city);
  const citiesLoader = useSelector((state) => state?.cities?.loading);

  const [countryErr, setCountryErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [stateErr, setStateErr] = useState(false);

  const [addresses, setAddresses] = useState([
    {
      country_id: "",
      street_1: "",
      street_2: "",
      state_id: "",
      city_id: "684",
      zip_code: "",
      address_type: "",
      is_billing: 0,
      is_shipping: 1,
      phone_no: "",
      fax_no: "",
      // id: 1
    },
  ]);

  useEffect(() => {
    updateUserData({ addresses: addresses });
  }, [addresses]);


  useEffect(() => {
    if ((user?.id && isEdit) || (user?.id && isDuplicate)) {
      if (user?.address?.length >= 1) {
        setAddresses((prevAddress) =>
          user?.address?.map((row) => {
            const existingRow = prevAddress?.find((r) => r?.id === row?.id);
            if (existingRow) {
              return {
                ...existingRow,
                country_id: row?.country_id,
                street_1: row?.street_1,
                street_2: row?.street_2,
                state_id: row?.state_id,
                city_id: row?.city_id,
                zip_code: row?.zip_code == "0" ? "" : row?.zip_code,
                address_type: row?.address_type,
                is_billing: +row?.is_billing,
                is_shipping: +row?.is_shipping,
                phone_no: row?.phone_no,
                fax_no: row?.fax_no,
                id: row?.id,
              };
            } else {
              // Add a new row if it doesn't exist
              return {
                id: row?.id,
                country_id: row?.country_id,
                street_1: row?.street_1,
                street_2: row?.street_2,
                state_id: row?.state_id,
                city_id: row?.city_id,
                zip_code: row?.zip_code == "0" ? "" : row?.zip_code,
                address_type: row?.address_type,
                is_billing: row?.is_billing,
                is_shipping: row?.is_shipping,
                phone_no: row?.phone_no,
                fax_no: row?.fax_no,
              };
            }
          })
        );

        if (
          user?.address &&
          user.address.length >= 1 &&
          user.address[0]?.country_id &&
          user.address[0]?.city_id &&
          user.address[0]?.state_id
        ) {
          dispatch(fetchGetStates({ country_id: user.address[0]?.country_id }));
          dispatch(fetchGetCities({ state_id: user.address[0]?.state_id }));
          setTick({
            ...tick,
            addressTick: true,
            basicTick: true,
          });
        } else {
          setCountryErr(true);
          setCityErr(true);
          setStateErr(true);
        }
      }
    }
  }, [user]);
  //for edit/duplicate autofill

  //for add new address row
  const addNewAddress = () => {
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        country_id: "", // Empty default values for a new address
        street_1: "",
        street_2: "",
        state_id: "",
        city_id: "",
        zip_code: "",
        address_type: "",
        is_billing: 0,
        is_shipping: 0,
        phone_no: "",
        fax_no: "",
      },
    ]);
  };
  //for add new address row

  const handleChange = (e, index, fieldType, type) => {
    const { name, value, checked } = e.target;
    const updatedAddresses = [...addresses];

    let address = { ...updatedAddresses[index] }; // Copy the address object
    if (fieldType === "country_id") {
      const countryId = value;
      updatedAddresses[index] = {
        ...address,
        [name]: value,
        state_id: "", // Reset state_id when country changes
        city_id: "", // Reset city_id when country changes
      };
      setAddresses(updatedAddresses);

      dispatch(fetchGetStates({ country_id: countryId }));
    } else if (name === "state_id") {
      // Handle state selection
      const stateId = value;
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        [name]: value,
        city_id: "", // Reset city_id when state changes
      };
      setAddresses(updatedAddresses);
      // Fetch cities based on the selected state
      dispatch(fetchGetCities({ state_id: stateId }));
    } else {
      if (fieldType === "address_type") {
        if (type === "Shipping") {
          address.is_shipping = checked ? 1 : 0;
        } else if (type === "Billing") {
          address.is_billing = checked ? 1 : 0;
        }
        if (address.is_shipping == 0 && address.is_billing == 0) {
          deleteAddress(index);
          return;
        }
      } else {
        address = {
          ...address,
          [name]: value,
        };
      }
      updatedAddresses[index] = address;
      setAddresses(updatedAddresses);
    }
    updateUserData({ addresses: updatedAddresses });
  };

  //return true for set tick mark if all required fields are filled
  const setTickBasicDetails = () => {
    const isBasicDetailsFilled =
      addresses[0]?.country_id !== "" &&
      addresses[0]?.city_id !== "" &&
      addresses[0]?.state_id !== "";

    setTick({
      ...tick,
      addressTick: isBasicDetailsFilled,
    });

    return isBasicDetailsFilled;
  };

  useEffect(() => {
    setTickBasicDetails();
    setCountryErr(!addresses[0]?.country_id);
    setCityErr(!addresses[0]?.city_id);
    setStateErr(!addresses[0]?.state_id);
  }, [addresses]);

  useEffect(() => {
    dispatch(fetchGetCountries());
  }, [dispatch]);

  const deleteAddress = (index) => {
    const updatedAddresses = addresses?.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    updateUserData({ addresses: updatedAddresses });
  };

  return (
    <>
      {statesLoader && <MainScreenFreezeLoader />}
      {citiesLoader && <MainScreenFreezeLoader />}
      {switchCusData === "Address" ? (
        <div id="secondx2_customer">
          {addresses?.map((address, index) => (
            <div id="main_forms_desigin_cus" key={index}>
              <div className="xs4545253445we">
                <div className="iconheading">
                  {otherIcons.main_address_icon}
                  <p>Address {index + 1}</p>
                </div>
                {index >= 1 && (
                  <AiOutlineDelete
                    onClick={() => deleteAddress(index)}
                    className="deletecust"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              <div className="checkboxcontainer5s">
                <div className="checkboxcontainer5s">
                  <label>
                    <input
                      type="checkbox"
                      name="is_shipping"
                      checked={address.is_shipping == 1}
                      onChange={(e) =>
                        handleChange(e, index, "address_type", "Shipping")
                      }
                    />
                    Shipping Address
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="is_billing"
                      checked={address.is_billing == 1}
                      onChange={(e) =>
                        handleChange(e, index, "address_type", "Billing")
                      }
                    />
                    Billing Address
                  </label>
                </div>
              </div>

              <div id="fcx3s1parent">
                <div className="form_commonblock">
                  <label>Country / Region</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.country_svg}

                      <select
                        name="country_id"
                        value={address.country_id}
                        onChange={(e) => handleChange(e, index, "country_id")}
                      // required
                      >
                        <option value="">Select Country</option>
                        {countryList?.country?.map((country, index) => (
                          <option key={index} value={country?.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                  {/* {countryErr && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please select the country name</p>} */}
                </div>

                <div
                  data-tooltip-content={
                    address.country_id ? "" : "Please Select Country"
                  }
                  data-tooltip-id="my-tooltip"
                  data-tooltip-place="bottom"
                  style={{
                    cursor: address.country_id ? "pointer" : "not-allowed",
                  }}
                  className={`form_commonblock ${address.country_id ? "" : "disabledfield"
                    }`}
                >
                  <label>Province</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.country_svg}

                      <select
                        name="state_id"
                        value={address.state_id}
                        onChange={(e) => handleChange(e, index)}
                      // required
                      >
                        <option value="">Select State</option>
                        {states?.country?.map((state, index) => (
                          <option key={index} value={state?.id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                  {/* {stateErr && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please select the Province name</p>} */}
                </div>

                <div
                  data-tooltip-content={
                    address.state_id
                      ? ""
                      : "Please Select State"
                  }
                  data-tooltip-id="my-tooltip"
                  data-tooltip-place="bottom"
                  style={{
                    cursor:
                      address.state_id
                        ? "pointer"
                        : "not-allowed",
                  }}
                  className={`form_commonblock ${address.state_id
                    ? ""
                    : "disabledfield"
                    }`}
                >
                  <label>City</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.country_svg}
                      <select
                        name="city_id"
                        value={address.city_id}
                        onChange={(e) => handleChange(e, index)}
                      // required
                      >
                        <option value="">Select City</option>
                        {cities?.country?.map((city, index) => (
                          <option key={index} value={city?.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                  {/* {cityErr && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please select the city name</p>} */}
                </div>
              </div>

              <div id="fcx3s1parent">
                <div className="form_commonblock">
                  <label>Street 1</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.street1_svg}
                      <input
                        autoComplete="off"
                        type="text"
                        name="street_1"
                        placeholder="Street 1"
                        value={address.street_1}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </span>
                  </div>
                </div>

                <div className="form_commonblock">
                  <label>Street 2</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.street1_svg}
                      <input
                        autoComplete="off"
                        type="text"
                        name="street_2"
                        placeholder="Street 2"
                        value={address.street_2}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </span>
                  </div>
                </div>

                <div className="form_commonblock">
                  <label>Zip Code</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.zip_svg}
                      <NumericInput
                        name="zip_code"
                        placeholder="Enter Zip Code"
                        value={address.zip_code}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div id="fcx3s1parent">
                <div className="form_commonblock">
                  <label>Phone Number</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.mobile_svg}
                      <NumericInput
                        name="phone_no"
                        placeholder="Enter Phone Number"
                        value={address.phone_no}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </span>
                  </div>
                </div>

                <div className="form_commonblock">
                  <label>Fax Number</label>
                  <div id="inputx1">
                    <span>
                      {otherIcons.mobile_svg}
                      <input
                        autoComplete="off"
                        type="text"
                        name="fax_no"
                        placeholder="Enter Fax Number"
                        value={address.fax_no}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="breakerci"></div>
            </div>
          ))}
          <button className="addcust" type="button" onClick={addNewAddress}>
            Add Address{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M12 4V20M20 12H4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomerAddress;
