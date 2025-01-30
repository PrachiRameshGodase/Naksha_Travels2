import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { Toaster, toast } from "react-hot-toast";

import { ManageCurrencyTable } from '../Common/InsideSubModulesCommon/ItemDetailTable';
import { formatDate, formatDate3, todayDate } from '../Helper/DateFormat';
import { SubmitButton2 } from '../Common/Pagination/SubmitButton';
import { handleDropdownError } from '../Helper/HelperFunctions';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { otherIcons } from '../Helper/SVGIcons/ItemsIcons/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-bootstrap';
import { currencyRateCreateAction, currencyRateListAction } from '../../Redux/Actions/manageCurrencyActions';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';

const ManageCurrency = () => {

    const getCurrency = useSelector((state) => state?.getCurrency);

    const currencyReateCreate = useSelector((state) => state?.currencyReateCreate);

    const allCurrency = getCurrency?.data?.currency;
    const [selectedDate, setSelectedDate] = useState(new Date()); // Simplified state
    const dispatch = useDispatch();

    const [formData, setFormData] = useState([{
        id: 0,                   //use id on undate
        date: new Date(),      //todays date
        currency_id: 0,          //from the currency table  
        currency_name: "", //from the currency table  
        code: "",             //from the currency table  
        country: "",      //from the currency table  
        symbol: "",             //from the currency table  
        current_rate: 0,      //User Input
        exchange_rate: 0,
    }
    ]);  // formData is directly an array now



    useEffect(() => {
        if (allCurrency && allCurrency.length > 0) {
            const updatedCurrencies = allCurrency.map((val) => ({
                currency_id: val?.id,           // from the currency table  
                currency_name: val?.currency,   // from the currency table  
                code: val?.code,                // from the currency table  
                country: val?.country,          // from the currency table  
                symbol: val?.symbol,            // from the currency table  
                date: formatDate(new Date()),   // today's date
                current_rate: 0,               // Input field to be updated manually
                exchange_rate: 0               // Input field to be updated manually
            }));

            setFormData(updatedCurrencies);  // Directly set the array
        }
    }, [allCurrency]);

    // console.log("formdataaaaaaaaaa", formData)
    const handleFormSubmit = (e) => {
        e.preventDefault();

        try {
            const filteredEntries = formData.filter(
                (entry) => entry.current_rate != 0 || entry.exchange_rate != 0
            );
            const payload = {
                currencies: filteredEntries,
            };
            dispatch(currencyRateCreateAction(payload)).then((response) => {
            })

        } catch (error) {
            toast.error('Error updating quotation:', error);
        }
    };




    return (
        <>

            <TopLoadbar />
            {currencyReateCreate?.loading && <MainScreenFreezeLoader />}
            <div className='formsectionsgrheigh'>
                <div id="Anotherbox" className='formsectionx2'>
                    <div id="leftareax12">
                        <h1 id="firstheading">
                            {/* {otherIcons?.payment_rec_svg} */}
                            Manage Currency
                        </h1>
                    </div>
                    <div id="buttonsdata">
                        <Link to={"/dashboard/manage-currency"} className="linkx3">
                            <RxCross2 />
                        </Link>
                    </div>
                </div>

                <div id="formofcreateitems" >
                    <form onSubmit={handleFormSubmit}>
                        <div className="relateivdiv">
                            {/* <div className=""> */}
                            <div className="itemsformwrap">
                                <div className="f1wrapofcreq">
                                    <div className="form_commonblock">
                                        <label >Date</label>
                                        <span
                                        >
                                            {otherIcons.date_svg}
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(date)} // Directly update the state
                                                name="date"
                                                dateFormat="dd-MM-yyyy"
                                                autoComplete="off"
                                                disabled // Set dynamically or leave as needed
                                            />

                                        </span>
                                    </div>



                                </div>

                                <div className={`${formData?.customer_id ? "f1wrpofcreqsx2" : "f1wrpofcreqsx2"}`}>

                                    <div className='itemsectionrows'>
                                        <>
                                            <ManageCurrencyTable formData={formData} setFormData={setFormData} section="create" />
                                        </>
                                    </div>
                                </div>
                            </div>

                            <SubmitButton2 isEdit={null} itemId={null} cancel="manage-currency" />

                        </div>
                    </form>
                </div>
            </div >
            <Toaster />

        </>
    );
};


export default ManageCurrency
