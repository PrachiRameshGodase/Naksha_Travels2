import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { Toaster, toast } from "react-hot-toast";

import { ManageCurrencyTable } from '../Common/InsideSubModulesCommon/ItemDetailTable';
import { formatDate } from '../Helper/DateFormat';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { otherIcons } from '../Helper/SVGIcons/ItemsIcons/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { currencyRateListAction } from '../../Redux/Actions/manageCurrencyActions';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';

const CurrencyList = () => {

  const currencyRateList = useSelector((state) => state?.currencyRateList);
  const currencyList = currencyRateList?.data?.data || []
  // console.log("currencyListcurrencyListcurrencyList", currencyList)

  const [selectedDate, setSelectedDate] = useState(); // Simplified state
  const dispatch = useDispatch(); // Initialize dispatch

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date state
    const payload = {
      date: formatDate(date),
    }
    // Dispatch the action with the selected date
    dispatch(currencyRateListAction(payload));
  };

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
                        onChange={handleDateChange} // Call handleDateChange when a date is selected
                        name="date"
                        dateFormat="dd-MM-yyyy"
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
