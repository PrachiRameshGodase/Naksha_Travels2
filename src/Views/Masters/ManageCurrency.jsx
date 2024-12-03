import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { Toaster, toast } from "react-hot-toast";

import { ManageCurrencyTable } from '../Common/InsideSubModulesCommon/ItemDetailTable';
import { formatDate } from '../Helper/DateFormat';
import { SubmitButton2 } from '../Common/Pagination/SubmitButton';
import { handleDropdownError } from '../Helper/HelperFunctions';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { otherIcons } from '../Helper/SVGIcons/ItemsIcons/Icons';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-bootstrap';

const ManageCurrency = () => {

    const getCurrency = useSelector((state) => state?.getCurrency);
    const allCurrency = getCurrency?.data?.currency;

    const [formData, setFormData] = useState([]);  // formData is directly an array now

    useEffect(() => {
        if (allCurrency && allCurrency.length > 0) {
            const updatedCurrencies = allCurrency.map((val) => ({
                currency_id: val?.id,           // from the currency table  
                currency_name: val?.currency,   // from the currency table  
                code: val?.code,                // from the currency table  
                country: val?.country,          // from the currency table  
                symbol: val?.symbol,            // from the currency table  
                date: formatDate(new Date()),   // today's date
                current_rate: '',               // Input field to be updated manually
                exchange_rate: ''               // Input field to be updated manually
            }));

            setFormData(updatedCurrencies);  // Directly set the array
        }
    }, [allCurrency]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const buttonName = e.nativeEvent.submitter.name;

        if (handleDropdownError(isCustomerSelect, dropdownRef1)) return;
        if (handleDropdownError(isAmountSelect, dropdownRef2)) return;

        try {
            // Update balance_amount in each entry

        } catch (error) {
            toast.error('Error updating quotation:', error);
        }
    };


    // image upload from firebase


    return (
        <>

            <TopLoadbar />
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
                                        <span data-tooltip-content="Today Date" data-tooltip-place="bottom" data-tooltip-id="my-tooltip"
                                        >
                                            {otherIcons.date_svg}
                                            <DatePicker
                                                selected={new Date()}
                                                minDate={new Date()}
                                                maxDate={new Date()}
                                                dateFormat="yyy-MM-dd"
                                                disabled
                                            />

                                        </span>
                                    </div>



                                </div>


                                <div className={`${formData?.customer_id ? "f1wrpofcreqsx2" : "f1wrpofcreqsx2"}`}>
                                    <div className='itemsectionrows'>

                                        <>
                                            <ManageCurrencyTable formsData={{ formData, setFormData }} />
                                        </>


                                    </div>
                                </div>
                            </div>

                            <SubmitButton2 isEdit={null} itemId={null} cancel="manage-currency" />

                        </div>
                    </form>
                </div>
            </div >
            <Toaster
                position="bottom-right"
                reverseOrder={false} />

        </>
    );
};


export default ManageCurrency
