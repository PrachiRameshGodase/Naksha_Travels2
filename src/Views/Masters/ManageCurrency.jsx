import React, { useEffect, useState, useMemo } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { currencyRateCreateAction } from '../../Redux/Actions/manageCurrencyActions';
import { ManageCurrencyTable } from '../Common/InsideSubModulesCommon/ItemDetailTable';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';
import { SubmitButton2 } from '../Common/Pagination/SubmitButton';
import { formatDate, todayDate } from '../Helper/DateFormat';
import useNavigation from '../Helper/Navigation';

const ManageCurrency = () => {
    const dispatch = useDispatch();
    const getCurrency = useSelector((state) => state?.getCurrency);
    const currencyReateCreate = useSelector((state) => state?.currencyReateCreate);

    const { goBack } = useNavigation();
    // for redirect to previous page when we create currency from selected currency dropdown...


    // Memoizing search params to prevent re-creation on each render
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const dateParam = searchParams.get("date");
    const currencyParam = searchParams.get("currency");

    const allCurrency = currencyParam
        ? getCurrency?.data?.currency?.filter(val => val?.code === currencyParam)
        : getCurrency?.data?.currency;

    // Set initial selectedDate from URL param or default to today
    const [selectedDate, setSelectedDate] = useState(() => (dateParam ? dateParam : todayDate()));

    const [formData, setFormData] = useState([]);

    // Effect to populate formData when currencies are loaded
    useEffect(() => {
        if (allCurrency?.length > 0) {
            setFormData((prevFormData) => {
                // Check if formData is already correct, preventing unnecessary updates
                const isSameData = prevFormData.length === allCurrency.length &&
                    prevFormData.every((item, index) => item.currency_id === allCurrency[index].id);

                if (isSameData) return prevFormData; // Avoid redundant state updates

                return allCurrency.map(val => ({
                    currency_id: val.id,
                    currency_name: val.currency,
                    code: val.code,
                    country: val.country,
                    symbol: val.symbol,
                    date: formatDate(selectedDate), // Always use selectedDate
                    current_rate: 0,
                    exchange_rate: 0
                }));
            });
        }
    }, [allCurrency]); // Runs when currencies are updated

    // Effect to update date inside formData when selectedDate changes
    useEffect(() => {
        setFormData(prevFormData => prevFormData.map(item => ({
            ...item,
            date: selectedDate, // Update only the date field
        })));
    }, [selectedDate]); // Runs when selectedDate changes

    // Handle form submission



    const handleFormSubmit = (e) => {
        e.preventDefault();

        try {
            // Filter entries based on the rules
            const filteredEntries = formData.filter((entry) => {
                const hasCurrentRate = entry.current_rate !== 0 && entry.current_rate !== '';
                const hasExchangeRate = entry.exchange_rate !== 0 && entry.exchange_rate !== '';

                // Include the entry if:
                // 1. Only current_rate is filled, or
                // 2. Only exchange_rate is filled, or
                // 3. Both current_rate and exchange_rate are filled
                return hasCurrentRate || hasExchangeRate;
            });

            // Further filter out entries where both current_rate and exchange_rate are 0 or empty
            const finalEntries = filteredEntries.filter(
                (entry) => entry.current_rate !== 0 || entry.exchange_rate !== 0
            );

            // Validate if there are any valid entries
            if (finalEntries.length === 0) {
                toast.error('Please fill in either current rate or exchange rate for at least one entry.');
                return;
            }

            // console.log("finalEntries", finalEntries)
            // Create payload with the final filtered entries
            const payload = { currencies: finalEntries };
            console.log("payloadpayload", payload)
            // Dispatch the action
            // dispatch(currencyRateCreateAction(payload)).then((res) => {
            //     if (res?.data?.success === true && currencyParam && dateParam) {
            //         goBack();
            //     }
            // });
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
                        <h1 id="firstheading" >Manage Currency</h1>
                    </div>
                    {/* <div id="buttonsdata">
                        <Link to={"/dashboard/manage-currency"} className="linkx3">
                            <RxCross2 />
                        </Link>
                    </div> */}
                </div>

                <div id="formofcreateitems">
                    <form onSubmit={handleFormSubmit}>
                        <div className="relateivdiv">
                            <div className="itemsformwrap">
                                <div className="f1wrapofcreq">
                                    <div className="form_commonblock">
                                        <label >Date</label>
                                        <span>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(formatDate(date))}  // Updates selectedDate state
                                                name="date"
                                                dateFormat="yyyy-MM-dd"
                                                autoComplete="off"
                                            />
                                        </span>
                                    </div>
                                </div>

                                <div className={`${formData?.customer_id ? "f1wrpofcreqsx2" : "f1wrpofcreqsx2"}`}>
                                    <div className='itemsectionrows'>
                                        <ManageCurrencyTable formData={formData} setFormData={setFormData} section="create" />
                                    </div>
                                </div>
                            </div>

                            <SubmitButton2 isEdit={null} itemId={null} cancel="manage-currency" />
                        </div>
                    </form>
                </div >
            </div >
            <Toaster />
        </>
    );
};

export default ManageCurrency;
