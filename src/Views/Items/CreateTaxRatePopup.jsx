import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories } from '../../Redux/Actions/categoriesActions';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '../Helper/PopupData';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';
import NumericInput from '../Helper/NumericInput';
import { FiPercent } from "react-icons/fi";
import { createTaxRateAction } from '../../Redux/Actions/globalActions';


const CreateTaxRatePopup = ({ categoryData, setClickTrigger, setShowPopup, refreshCategoryListData, parent_id }) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(state => state?.crateTaxRate);

    const [formData, setFormData] = useState({
        tax_percentage: "",
    });
    const popupRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useOutsideClick(popupRef, () => setShowPopup(false));

    const handleSubmitTaxRate = async () => {
        try {
            dispatch(createTaxRateAction(formData));
            setShowPopup(true);
            // refreshCategoryListData()

        } catch (error) {
        }
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !formData?.name == "") {
            event.preventDefault(); // Prevent the default action for Enter key
            handleSubmitTaxRate();
        }
    };

    return (
        <>
            <Toaster />
            {data?.loading && <MainScreenFreezeLoader />}
            <div className="mainxpopups1" ref={popupRef} onKeyDown={handleKeyDown} tabIndex="0">
                <div className="popup-content">
                    <span className="close-button" onClick={() => setShowPopup(false)}><RxCross2 /></span>
                    <h2>Add Tax Percentage</h2>
                    <div className="midpopusec12x">
                        <div className="form_commonblock">
                            <label>Enter tax percent(%)</label>
                            <span>
                                <FiPercent />

                                <NumericInput name="tax_percentage" placeholder='Enter tax percent' autoFocus="on" value={formData.tax_percentage} onChange={handleChange} autocomplete="off" />
                            </span>
                        </div>
                        <div tabIndex="0" className={`submitbuttons1  ${!formData?.tax_percentage ? "disabledfield" : ""}`} onClick={() => handleSubmitTaxRate()}>
                            <span>
                                <p>{categoryData?.id ? (data?.loading === true ? "Updating" : "Update") : (data?.loading === true ? "Submitting" : "Submit")}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                                    <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateTaxRatePopup;