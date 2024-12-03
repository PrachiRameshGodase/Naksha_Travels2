import React, { useEffect, useRef, useState } from 'react'
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar'
import { Link, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { accountTableIcons, accountTransactionsTable } from '../../Helper/SVGIcons/ItemsIcons/ItemsTableIcons';
import { accountDelete, accountDetail, accountStatus } from '../../../Redux/Actions/accountsActions';
import { useDispatch, useSelector } from 'react-redux';
import NoDataFound from '../../../Components/NoDataFound/NoDataFound';
import TableViewSkeleton from '../../../Components/SkeletonLoder/TableViewSkeleton';
import { formatDate } from '../../Helper/DateFormat'
import newmenuicoslz from '../../../assets/outlineIcons/othericons/newmenuicoslz.svg';
import useOutsideClick from '../../Helper/PopupData';
import toast, { Toaster } from 'react-hot-toast';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { showAmountWithCurrencySymbol } from '../../Helper/HelperFunctions';

const AccountDetails = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const itemId = new URLSearchParams(location.search).get("id");
  const getAccountVal = JSON.parse(localStorage.getItem("editAccount"));

  const accDetails = useSelector((state) => state?.accountDetails);
  const accountStatues = useSelector((state) => state?.accountStatus);


  const [switchValue, setSwitchValue] = useState(getAccountVal?.accounts.status);
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const dropdownRef = useRef(null); // Ref to the dropdown element

  const [popupImageUrl, setPopupImageUrl] = useState(""); // State to store the image URL
  const [showPopup, setShowPopup] = useState(""); // State to store the image URL
  const popupRef = useRef();

  const handleSwitchChange = (e) => {
    const newValue = e.target.value;
    setSwitchValue(newValue);
    if (itemId) {
      const sendData = {
        id: itemId,
        status: newValue
      }
      dispatch(accountStatus(sendData))
        .then(() => {
          const toastMessage = newValue == '1' ? 'Item is now active' : 'Item is now inactive';
          toast.success(toastMessage);
        })
        .catch((error) => {
          toast.error('Failed to update item status');
          console.error('Error updating item status:', error);
          // Revert switch value if there's an error
          setSwitchValue((prevValue) => prevValue == '1' ? '0' : '1');
        });
    }
  };

  const deleteItemsHandler = () => {
    if (itemId) {
      dispatch(accountDelete({ id: itemId }, Navigate));
    }
  }

  useOutsideClick(dropdownRef, () => setShowDropdown(false))

  const handleEditItems = () => {

    const sendData = {
      fy: localStorage.getItem("FinancialYear"), id: itemId
    }
    dispatch(accountDetail(sendData, Navigate));
  };

  return (
    <>

      <TopLoadbar />
      {(accDetails?.loading || accountStatues?.loading) && < MainScreenFreezeLoader />}
      <div id="Anotherbox">
        <div id="leftareax12">
          <h1 className='' id="firstheading">
            {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
            {getAccountVal?.accounts?.account_name}
          </h1>
          {/* <p id="firsttagp">{accDetailsList?.total}</p> */}
        </div>
        <div id="buttonsdata">
          <div className="switchbuttontext">
            <div className="switches-container">
              <input type="radio" id="switchMonthly" name="switchPlan" value="0" checked={switchValue == "0"} onChange={handleSwitchChange} />
              <input type="radio" id="switchYearly" name="switchPlan" className='newinput' value="1" checked={switchValue == "1"} onChange={handleSwitchChange} />
              <label htmlFor="switchMonthly">Inactive</label>
              <label htmlFor="switchYearly">Active</label>
              <div className="switch-wrapper">
                <div className="switch">
                  <div id='inactiveid'>Inactive</div>
                  <div>Active</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="separatorx21"></div> */}
          <div
            //  className="mainx1"
            className="filtersorticos5wx2"
            onClick={handleEditItems}>
            <img src="/Icons/pen-clip.svg" alt="" />
            {/* <p>Edit</p> */}
          </div>
          <div onClick={() => setShowDropdown(!showDropdown)} className="filtersorticos5wx2" ref={dropdownRef}>
            {/* <img src="/Icons/menu-dots-vertical.svg" alt="" /> */}
            <img src={newmenuicoslz} alt="" />
            {showDropdown && (
              <div className="dropdownmenucustom">

                <div className="bordersinglestroke"></div>
                <div className='dmncstomx1' onClick={deleteItemsHandler} style={{ cursor: "pointer" }}>
                  {otherIcons?.delete_svg}
                  Delete</div>
              </div>
            )}
          </div>
          <Link className="linkx4" to={"/dashboard/account-chart"}>
            <RxCross2 />
          </Link>
        </div>
      </div>

      <div id="itemsdetailsrowskl">
        <div className="insidcontain">

          <div className="inidbx1">
            <div className="inidbx1s1">
              <div className="inidbs1x1a1">
                {otherIcons?.information_svg}
                Account Information
              </div>

              <ul style={{ width: "453px" }}>

                <li>
                  <span>Account Name</span>
                  <h1>:</h1>
                  <p>

                    {getAccountVal?.accounts?.account_name || ""}

                  </p>
                </li>
                <li>
                  <span>Account Number</span>
                  <h1>:</h1>
                  <p>

                    {getAccountVal?.accounts?.account_no || ""}

                  </p>
                </li>
                <li>
                  <span>Account Type</span>
                  <h1>:</h1>
                  <p>  {getAccountVal?.accounts?.account_type || ""}</p>
                </li>

                {/* <li>
                  <span>IFSC Code </span>
                  <h1>:</h1>
                  <p>  {getAccountVal?.accounts?.ifsc || ""}</p>
                </li> */}

                <li>
                  <span>Tax Code</span>
                  <h1>:</h1>
                  <p>  {getAccountVal?.accounts?.tax_code || ""}</p>
                </li>

                {/* {console.log("formdata", JSON?.parse(getAccountVal?.accounts?.upload_image))} */}
                <li>
                  <span>Attachment</span>
                  <h1>:</h1>
                  {(getAccountVal?.accounts?.upload_image?.length > 10) ?
                    <p className="file_att_21"
                      onClick={() => {
                        setShowPopup(true);
                        setPopupImageUrl((getAccountVal?.accounts?.upload_image)); // Set the image URL for the popup
                      }}>  {otherIcons?.file_svg} File Attached</p>
                    :
                    <p className="file_att_21">
                      No File Attached</p>
                  }
                </li>
                <li>
                  <span>Notes</span>
                  <h1>:</h1>
                  <p> {(getAccountVal?.accounts?.description)}</p>
                </li>
              </ul>
            </div>

            <div id="coninsd2x3s" >
              <div className="inidbx1s2 inidbx1s2x21s5" sjtyle={{ width: "400px", height: "300px" }}>
                <div className="inidbs1x1a1">
                  <span style={{ zoom: "2" }}> {otherIcons?.doller_svg}</span>
                  Closing Blance
                </div>
                <p className='accountx3'>{accDetails?.data?.closing_balance} <br />
                  {accDetails?.data?.closing_balance == 0 ? "" : accDetails?.data?.closing_balance < 1 ? "Debit" : "Credit"}
                </p>


              </div>
            </div>
          </div>

        </div >
      </div >

      {showPopup && (
        <div className="mainxpopups2" ref={popupRef}>
          <div className="popup-content02">
            <span
              className="close-button02"
              onClick={() => setShowPopup(false)}
            >
              <RxCross2 />
            </span>
            <img
              src={popupImageUrl}
              name="popup_image"
              alt="Popup Image"
              height={500}
              width={500}
            />
          </div>
        </div>
      )
      }
      <div id="mainsectioncsls" className="listsectionsgrheigh">
        <div id="leftsidecontentxls">

          <div id="item-listsforcontainer">

            <div id="newtableofagtheme">
              <div id="Anotherbox">
                <div id="leftareax12">
                  Recent Transactions
                  <p id="firsttagp">{getAccountVal?.transactions?.length}</p>
                  <p id="firsttagp">Total</p>
                </div>
              </div>
              <div className="table-headerx12">

                {/* Recent Transactions */}
                {accountTransactionsTable?.map((val, index) => (
                  <div key={index} className={`table-cellx12 ${val?.className}`}>
                    {val?.svg}
                    {val?.name}
                  </div>
                ))}
              </div>

              {getAccountVal?.loading ? (
                <TableViewSkeleton />
              ) : (
                <>
                  {getAccountVal?.transactions?.length >= 0 ? (
                    getAccountVal?.transactions?.map((quotation, index) => (
                      <div
                        className={`table-rowx12 `}
                        key={index}
                      >

                        <div className="table-cellx12" style={{ width: "267px" }}>
                          {(formatDate(quotation?.transaction_date)) || ""}
                        </div>
                        <div className="table-cellx12" style={{ width: "20%" }}>
                          {quotation?.notes || ""}
                        </div>
                        <div className="table-cellx12" style={{ width: "16%" }}>
                          {quotation?.entity_type || ""}
                        </div>
                        <div className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565 x566sd54w2sxw" style={{
                          textAlign: "right",
                          width: "139px"
                        }}>

                          {showAmountWithCurrencySymbol(quotation?.debit)}


                        </div>
                        <div className="table-cellx12" style={{
                          textAlign: "right",
                          width: "270px"
                        }}>
                          {showAmountWithCurrencySymbol(quotation?.credit)}
                        </div>

                      </div>
                    ))

                  ) : (
                    <NoDataFound />
                  )}
                  <Link to={`/dashboard/account-transactions-report?id=${itemId}`} className="morex43z">
                    Show More Details
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <Toaster />
      </div>

    </>
  )
}

export default AccountDetails
