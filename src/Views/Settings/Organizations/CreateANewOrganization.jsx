import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import CircleLoader from '../../../Components/Loaders/CircleLoader';
import SuccessMessage from '../../../Components/Succesmessages/SuccessMessage';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import Topbar from '../../../Components/NavigationBars/Topbar';
import './organizations.scss'
import CustomDropdown24 from '../../../Components/CustomDropdown/CustomDropdown24';

import NumericInput from '../../Helper/NumericInput';
import { fetchCurrencies, fetchGetCities, fetchGetCountries, fetchGetStates } from '../../../Redux/Actions/globalActions';
import { useDispatch, useSelector } from 'react-redux';
import CurrencySelect from '../../Helper/ComponentHelper/CurrencySelect';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { createUpdateOrgAction } from '../../../Redux/Actions/OrgnizationActions';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';
import ImageUpload from '../../Helper/ComponentHelper/ImageUpload';

const taxTypes = [
  {
    id: 1,
    type: "GST",
    labelid: "1",
    label: "GST",
    value: "0",
  },
  {
    id: 2,
    type: "VAT",
    labelid: "2",
    label: "VAT",
    value: "0",
  },
];

const CreateANewOrganization = () => {
  const createUpdateOrg = useSelector(state => state?.createUpdateOrg);

  const countries = useSelector(state => state?.countries);
  const countriess = countries?.countries?.country

  const states = useSelector(state => state?.states);
  const statess = states?.state?.country

  const cities = useSelector(state => state?.cities);
  const orgnizationList = useSelector(state => state?.orgnizationList);
  const orgMainList = orgnizationList?.data?.organisations;
  const citiess = cities?.city?.country;
  const [loading, setLoading] = useState(false);
  const [freezLoadingImg, setFreezLoadingImg] = useState(false);
  const [imgLoader, setImgeLoader] = useState("");

  const params = new URLSearchParams(location.search);
  const { id: orgId } = Object.fromEntries(params.entries());

  const getCurrency = useSelector((state) => state?.getCurrency?.data);

  const [formData, setFormData] = useState({
    user_id: "",
    id: "",
    name: "",
    email: "",
    mobile_no: null,
    gst: "",
    company_type: "Individual",
    currency: "",
    symbol: "",
    language: "",
    country_id: null,
    state_id: null,
    city_id: null,
    street1: "",
    street2: "",
    zipcode: "",
    tax_type: 1, // 1 for GST, 2 for VAT
    company_logo: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Complete, setStep1Complete] = useState(false); // Track completion status of Step 1

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "country_id") {
      const countryId = value;
      dispatch(fetchGetStates({ country_id: countryId }));
    } else if (name === "state_id") {
      const stateId = value;
      dispatch(fetchGetCities({ state_id: stateId }));
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createUpdateOrgAction(formData, navigate, setSuccessMessage))
    } catch (error) {
      console.error('Error creating/updating organization:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    if (orgId && orgMainList) {
      const showCurrentActiveOrg = orgMainList?.find(val => val?.organisation_id === orgId)
      setFormData({
        ...formData,
        user_id: showCurrentActiveOrg?.user_id,
        id: showCurrentActiveOrg?.id,
        name: showCurrentActiveOrg?.name,
        email: showCurrentActiveOrg?.email,
        mobile_no: showCurrentActiveOrg?.mobile_no,
        gst: showCurrentActiveOrg?.gst,
        company_type: showCurrentActiveOrg?.company_type,
        currency: showCurrentActiveOrg?.currency,
        symbol: showCurrentActiveOrg?.symbol,
        language: showCurrentActiveOrg?.language,
        country_id: showCurrentActiveOrg?.country_id,
        state_id: showCurrentActiveOrg?.state_id,
        city_id: showCurrentActiveOrg?.city_id,
        street1: showCurrentActiveOrg?.street1,
        street2: showCurrentActiveOrg?.street2,
        zipcode: showCurrentActiveOrg?.zipcode,
        tax_type: showCurrentActiveOrg?.tax_type, // 1 for GST, 2 for VAT
        company_logo: showCurrentActiveOrg?.company_logo
      })

      if (showCurrentActiveOrg?.country_id) {
        dispatch(fetchGetStates({ country_id: showCurrentActiveOrg?.country_id }));
        dispatch(fetchGetCities({ state_id: showCurrentActiveOrg?.state_id }));
      }

      if (showCurrentActiveOrg?.company_logo) {
        setImgeLoader("success");
      }
    }
    if (!orgMainList) {
      // dispatch(orgListAction());
    }
    if (!countriess || !getCurrency) {
      dispatch(fetchGetCountries());
      dispatch(fetchCurrencies());
    }
  }, [orgId, orgMainList]);
  // console.log("formdata", formData)


  const getCurrencySymbol = getCurrency?.currency
  console.log("getCurrencySymbol", getCurrencySymbol)
  return (
    <>
      <TopLoadbar />
      <Topbar />
      {(states?.loading || cities?.loading || freezLoadingImg || createUpdateOrg?.loading) && <MainScreenFreezeLoader />}

      {successMessage ? (
        <SuccessMessage valueofmessage={successMessage} />
      ) : (
        <div id="settingcomponent">
          <div id="saearchboxsgak">
            <div id="searchbartopset">
              <h2>Organizations</h2>
              <div id="sljcpsnalinolc">
                <Link className='firstidclsas2s5' to={"/settings"}>Settings</Link>
                <p>/</p>
                <Link className='firstidclsas2s5' to={"/settings"}>Organizations</Link>
                <p>/</p>
                <Link to={""}>  {orgId ? "Update Orgnization" : "Create Organization"} </Link>
              </div>
            </div>
            <Link id="backtojomeoslskcjkls" to={"/dashboard/home"}><IoIosArrowBack /> Back to Home</Link>
          </div>

          <div id="formofcreateupdateorg">
            <form onSubmit={handleSubmit}>
              {currentStep == 1 && (
                <div id="forminside" style={{ display: "grid", padding: 0, gridTemplateColumns: "repeat(3,1fr)", backgroundColor: "rgb(255,255,255)" }}>
                  <div className='form_commonblock'>
                    <label>Name:</label>
                    <span>
                      {otherIcons?.name_svg}
                      <input style={{ border: "1px solid rgb(208,215,222)", width: "100%" }} type="text" placeholder='Name' name="name" value={formData.name} onChange={handleChange} required />
                    </span>
                  </div>

                  <div className="form_commonblock">
                    <label>Email</label>
                    <span>
                      {otherIcons?.email_svg}
                      <input
                        autoComplete='off'
                        type="email"
                        name="email"
                        placeholder={`Enter Email`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </span>
                  </div>

                  <div className="form_commonblock">
                    <label>Phone Number</label>
                    <div id="inputx1">
                      <span>
                        {otherIcons?.mobile_svg}
                        <NumericInput
                          name="mobile_no"
                          placeholder="Enter Phone Number"
                          value={formData.mobile_no}
                          onChange={handleChange}
                        />
                      </span>
                    </div>
                  </div>

                  <div className='form_commonblock'>
                    <label>GST</label>
                    <span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#525252"}
                        fill={"none"}
                      >
                        <path
                          d="M2 8.56907C2 7.37289 2.48238 6.63982 3.48063 6.08428L7.58987 3.79744C9.7431 2.59915 10.8197 2 12 2C13.1803 2 14.2569 2.59915 16.4101 3.79744L20.5194 6.08428C21.5176 6.63982 22 7.3729 22 8.56907C22 8.89343 22 9.05561 21.9646 9.18894C21.7785 9.88945 21.1437 10 20.5307 10H3.46928C2.85627 10 2.22152 9.88944 2.03542 9.18894C2 9.05561 2 8.89343 2 8.56907Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M4 10V18.5M8 10V18.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M11 18.5H5C3.34315 18.5 2 19.8431 2 21.5C2 21.7761 2.22386 22 2.5 22H11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M21.5 14.5L14.5 21.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="15.25"
                          cy="15.25"
                          r="0.75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="20.75"
                          cy="20.75"
                          r="0.75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>

                      <input style={{ border: "1px solid rgb(208,215,222)", width: "100%" }} type="text" placeholder='GST' name="gst" value={formData.gst} onChange={handleChange} required />

                    </span>
                  </div>

                  <div className='form_commonblock'>
                    <label>Company Type</label>
                    <span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#525252"}
                        fill={"none"}
                      >
                        <path
                          d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 9L11 9M8 13L11 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 22L22 22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <select style={{ border: "1px solid rgb(208,215,222)", width: "100%" }} name="company_type" value={formData.company_type} onChange={handleChange} >

                        <option value="Individual">Individual</option>
                        <option value="Business">Business</option>

                      </select>
                    </span>

                  </div>

                  <div className="form_commonblock">
                    <CurrencySelect
                      value={formData?.currency}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form_commonblock">
                    <label>Symbol</label>
                    <span >
                      {otherIcons.currency_icon}
                      <select name="symbol" value={formData.symbol} onChange={handleChange}>
                        {
                          getCurrencySymbol?.map((val, index) => (
                            <option value={val?.symbol} key={index}>{val?.symbol}</option>
                          ))
                        }
                        {/* <option value="$">$</option>
                        <option value="%">%</option>
                        <option value="#">#</option> */}
                      </select>
                    </span>
                  </div>
                  {/* #formofcreateitems form .form-group */}

                  <div id="formofcreateitems" className='calctotalsectionx2'>
                    <form action="">
                      <div id="imgurlanddesc">
                        <ImageUpload
                          formData={formData}
                          setFormData={setFormData}
                          setFreezLoadingImg={setFreezLoadingImg}
                          imgLoader={imgLoader}
                          setImgeLoader={setImgeLoader}
                          component="org"
                        />
                      </div>
                    </form>
                  </div>
                  {/* <div className='form_commonblock'>
                    <label>Symbol</label>
                    <span style={{ background: "white", border: "1px solid rgb(208,215,222)" }} >

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#525252"}
                        fill={"none"}
                      >
                        <path
                          d="M4.5 10.2653V6H19.5V10.2653C19.5 13.4401 19.5 15.0275 18.5237 16.0137C17.5474 17 15.976 17 12.8333 17H11.1667C8.02397 17 6.45262 17 5.47631 16.0137C4.5 15.0275 4.5 13.4401 4.5 10.2653Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.5 6L5.22115 4.46154C5.78045 3.26838 6.06009 2.6718 6.62692 2.3359C7.19375 2 7.92084 2 9.375 2H14.625C16.0792 2 16.8062 2 17.3731 2.3359C17.9399 2.6718 18.2196 3.26838 18.7788 4.46154L19.5 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.5 9H13.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M4 22H12M20 22H12M12 22V19.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <select name="symbol" value={setFormData.symbol} onChange={handleChange}>
                        <option value="$">$</option>
                        <option value="%">%</option>
                        <option value="#">#</option>
                      </select>

                    </span>
                  </div> */}

                  <div className='form_commonblock'>
                    <label>Language:</label>

                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                        <path d="M7.35396 18C5.23084 18 4.16928 18 3.41349 17.5468C2.91953 17.2506 2.52158 16.8271 2.26475 16.3242C1.87179 15.5547 1.97742 14.5373 2.18868 12.5025C2.36503 10.8039 2.45321 9.95455 2.88684 9.33081C3.17153 8.92129 3.55659 8.58564 4.00797 8.35353C4.69548 8 5.58164 8 7.35396 8H16.646C18.4184 8 19.3045 8 19.992 8.35353C20.4434 8.58564 20.8285 8.92129 21.1132 9.33081C21.5468 9.95455 21.635 10.8039 21.8113 12.5025C22.0226 14.5373 22.1282 15.5547 21.7352 16.3242C21.4784 16.8271 21.0805 17.2506 20.5865 17.5468C19.8307 18 18.7692 18 16.646 18" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M17 8V6C17 4.11438 17 3.17157 16.4142 2.58579C15.8284 2 14.8856 2 13 2H11C9.11438 2 8.17157 2 7.58579 2.58579C7 3.17157 7 4.11438 7 6V8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M13.9887 16L10.0113 16C9.32602 16 8.98337 16 8.69183 16.1089C8.30311 16.254 7.97026 16.536 7.7462 16.9099C7.57815 17.1904 7.49505 17.5511 7.32884 18.2724C7.06913 19.3995 6.93928 19.963 7.02759 20.4149C7.14535 21.0174 7.51237 21.5274 8.02252 21.7974C8.40513 22 8.94052 22 10.0113 22L13.9887 22C15.0595 22 15.5949 22 15.9775 21.7974C16.4876 21.5274 16.8547 21.0174 16.9724 20.4149C17.0607 19.963 16.9309 19.3995 16.6712 18.2724C16.505 17.5511 16.4218 17.1904 16.2538 16.9099C16.0297 16.536 15.6969 16.254 15.3082 16.1089C15.0166 16 14.674 16 13.9887 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M18 12H18.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <input style={{ border: "1px solid rgb(208,215,222)", width: "100%" }} type="text" placeholder='Language' name="language" value={formData.language} onChange={handleChange} />
                    </span>

                  </div>


                  <div className="form_commonblock">
                    <label >Country</label>
                    <span >
                      {otherIcons?.country_flag_svg}
                      <CustomDropdown24
                        label="Select vendor"
                        options={countriess}
                        value={formData?.country_id}
                        onChange={handleChange}
                        name="country_id"
                        defaultOption="Select Country Name"
                        type="countries"
                      />
                    </span>
                  </div>

                  <div className="form_commonblock">
                    <label >Provence</label>
                    <span >
                      {otherIcons?.country_flag_svg}
                      <CustomDropdown24
                        label="Select vendor"
                        options={statess}
                        value={formData?.state_id}
                        onChange={handleChange}
                        name="state_id"
                        defaultOption="Select State Name"
                        type="countries"
                      />
                    </span>
                  </div>
                  <div className="form_commonblock">
                    <label >City</label>
                    <span >
                      {otherIcons?.country_flag_svg}
                      <CustomDropdown24
                        label="Select vendor"
                        options={citiess}
                        value={formData?.city_id}
                        onChange={handleChange}
                        name="city_id"
                        defaultOption="Select City Name"
                        type="countries"
                      />
                    </span>
                  </div>

                  <div className="form_commonblock">
                    <label>Tax Type</label>
                    <span>
                      {otherIcons?.tag_svg}
                      <CustomDropdown04
                        label="Registation name"
                        options={taxTypes}
                        value={formData?.tax_type}
                        onChange={handleChange}
                        name="tax_type"
                        defaultOption="Select Tax Types"
                        type="masters"
                      />
                    </span>
                  </div>

                  <div className="form_commonblock">
                    <label>Street 1</label>
                    <div id="inputx1">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                          <path d="M3.25195 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16.252 3V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9.75195 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9.75195 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9.75195 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M19.6124 13.4393L20.3067 14.1317C20.8941 14.7175 20.8941 15.6672 20.3067 16.253L16.6692 19.9487C16.3831 20.234 16.0171 20.4264 15.6193 20.5005L13.3649 20.9885C13.009 21.0656 12.692 20.7504 12.7683 20.3952L13.2481 18.1599C13.3224 17.7632 13.5153 17.3982 13.8015 17.1129L17.4852 13.4393C18.0726 12.8536 19.025 12.8536 19.6124 13.4393Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                          autoComplete='off'
                          type="text"
                          name="street1"
                          placeholder="Street 1"
                          value={formData.street1}
                          onChange={handleChange}
                        />
                      </span>
                    </div>
                  </div>


                  <div className="form_commonblock">
                    <label>Street 2</label>
                    <div id="inputx1">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                          <path d="M3.25195 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16.252 3V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9.75195 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9.75195 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9.75195 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M19.6124 13.4393L20.3067 14.1317C20.8941 14.7175 20.8941 15.6672 20.3067 16.253L16.6692 19.9487C16.3831 20.234 16.0171 20.4264 15.6193 20.5005L13.3649 20.9885C13.009 21.0656 12.692 20.7504 12.7683 20.3952L13.2481 18.1599C13.3224 17.7632 13.5153 17.3982 13.8015 17.1129L17.4852 13.4393C18.0726 12.8536 19.025 12.8536 19.6124 13.4393Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <input
                          autoComplete='off'
                          type="text"
                          name="street2"
                          placeholder="Street 2"
                          value={formData.street2}
                          onChange={handleChange}

                        />
                      </span>
                    </div>
                  </div>
                  {/* <div className='forg-group'>
                    <label>Zipcode:</label>
                    <input style={{border:"1px solid rgb(208,215,222)"}} type="number" placeholder='Zipcode' name="zipcode" value={formData.zipcode} onChange={handleChange} required />
                  </div> */}
                  <div className="form_commonblock">
                    <label>Zip Code</label>
                    <div id="inputx1">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                          <path d="M3.5 13V12.1963C3.5 9.22889 3.5 7.7452 3.96894 6.56021C4.72281 4.65518 6.31714 3.15252 8.33836 2.44198C9.59563 2 11.1698 2 14.3182 2C16.1173 2 17.0168 2 17.7352 2.25256C18.8902 2.65858 19.8012 3.51725 20.232 4.60584C20.5 5.28297 20.5 6.13079 20.5 7.82643V12.0142V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M3.5 12C3.5 10.1591 4.99238 8.66667 6.83333 8.66667C7.49912 8.66667 8.28404 8.78333 8.93137 8.60988C9.50652 8.45576 9.95576 8.00652 10.1099 7.43136C10.2833 6.78404 10.1667 5.99912 10.1667 5.33333C10.1667 3.49238 11.6591 2 13.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M3.5 16H6.9C7.14721 16 7.28833 16.2822 7.14 16.48L3.72 21.04C3.42334 21.4355 3.70557 22 4.2 22H7.5M10.5 16H12.25M12.25 16H14M12.25 16V21.6787M10.5 22H14M17 22V16H18.8618C19.5675 16 20.2977 16.3516 20.4492 17.0408C20.5128 17.33 20.5109 17.6038 20.4488 17.8923C20.2936 18.6138 19.5392 19 18.8012 19H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <NumericInput
                          name="zipcode"
                          placeholder="Enter Zip Code"
                          value={formData.zipcode}
                          onChange={handleChange}
                        />
                      </span>
                    </div>
                  </div>

                </div>
              )}
              {currentStep == 2 && (
                <div id="forminside">
                  <div className='forg-group'>
                    <label>Emai</label>
                    <input type="email" placeholder='Email' name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className='forg-group'>
                    <label>Mobile No:</label>
                    <input type="number" placeholder='Mobile Number' name="mobile_no" value={formData.mobile_no} onChange={handleChange} required />
                  </div>
                  <div className='forg-group'>
                    <label>Currency:</label>
                    <input type="text" placeholder='Currency' name="currency" value={formData.currency} onChange={handleChange} required />
                  </div>
                  <div className='forg-group'>
                    <label>Language:</label>
                    <input type="text" placeholder='Language' name="language" value={formData.language} onChange={handleChange} required />
                  </div>
                  <div className='forg-group'>
                    <label>Logo:</label>
                    <input type="file" accept="image/*" name="logo" value={formData.logo} onChange={handleChange} />
                  </div>
                </div>
              )}
              <div className="buttons-container">
                {currentStep !== 1 && (
                  <button type="button" onClick={prevStep}>Back</button>
                )}
                {currentStep !== 2 && step1Complete && ( // Only show the Next button if Step 1 is complete
                  <button type="button" onClick={nextStep}>Next</button>
                )}
                {currentStep == 2 && (
                  <button id='herobtnskls' className={loading ? 'btnsubmission' : ''} type="submit" disabled={loading}>
                    {loading ? <CircleLoader /> : <p>Submit</p>}
                  </button>
                )}
                <button> {orgId ? "Update Orgnization" : "Create Organisation"}</button>
              </div>

            </form>
          </div>

          <div id="randomheight"></div>
        </div>

      )}
      <Toaster />
    </>
  );
};

export default CreateANewOrganization;
