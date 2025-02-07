import React, { useEffect, useMemo, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { Toaster } from "react-hot-toast";

import { ManageCurrencyTable } from '../Common/InsideSubModulesCommon/ItemDetailTable';
import { formatDate } from '../Helper/DateFormat';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { otherIcons } from '../Helper/SVGIcons/ItemsIcons/Icons';
import { useSelector } from 'react-redux';
import { currencyRateListAction } from '../../Redux/Actions/manageCurrencyActions';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';
import useFetchApiData from '../Helper/ComponentHelper/useFetchApiData';

const CurrencyList = () => {

  const currencyRateList = useSelector((state) => state?.currencyRateList);
  const currencyList = currencyRateList?.data?.data || []

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date())); // Simplified state

  // for fetch the today's currencies list on page load
  const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
    date: selectedDate,
  }), [selectedDate]);
  useFetchApiData(currencyRateListAction, payloadGenerator, [selectedDate]);


  // console.log("selectedDateselectedDate", selectedDate)

  return (
    <>
      <TopLoadbar />
      {currencyRateList?.loading && <MainScreenFreezeLoader />}
      <div className='formsectionsgrheigh'>
        <div id="Anotherbox" className='formsectionx2'>
          <div id="leftareax12">
            <h1 id="firstheading">
              {/* {otherIcons?.payment_rec_svg} */}
              Currency List
            </h1>
          </div>
          <div id="buttonsdata">
            <Link to={"/dashboard/manage-currency"} className="linkx3">
              <RxCross2 />
            </Link>
          </div>
        </div>

        <div id="formofcreateitems" >
          <form>
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
                        onChange={(date) => setSelectedDate(formatDate(date))} // Call handleDateChange when a date is selected
                        name="date"
                        dateFormat="yyyy-MM-dd"
                        autoComplete="off"
                        maxDate={new Date()}
                        placeholderText="Select Date to Display Currencies"
                        calendarPlacement="bottom" // Open the calendar at the bottom

                      />

                    </span>
                  </div>



                </div>

                <div className={`f1wrpofcreqsx2`}>

                  <div className='itemsectionrows'>
                    <>
                      <ManageCurrencyTable formData={currencyList} setFormData={[]} section="list" />
                    </>
                  </div>
                </div>
              </div>

              {/* <SubmitButton2 isEdit={null} itemId={null} cancel="manage-currency" /> */}

            </div>
          </form>
        </div>
      </div >
      <Toaster />

    </>
  );
};


export default CurrencyList
