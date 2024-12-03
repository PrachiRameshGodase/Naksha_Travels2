
import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { quotationDelete, quotationStatus } from '../../../Redux/Actions/quotationActions';
import Loader02 from "../../../Components/Loaders/Loader02";
import { Toaster } from 'react-hot-toast';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { JournalDetails } from '../../../Redux/Actions/JournalAndAccount';
import toast from 'react-hot-toast';
import axios from 'axios';
import { showAmountWithCurrencySymbol } from '../../Helper/HelperFunctions';
import TableViewSkeleton from '../../../Components/SkeletonLoder/TableViewSkeleton';
import NoDataFound from '../../../Components/NoDataFound/NoDataFound';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const JournalDetailsSing = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownx1, setShowDropdownx1] = useState(false);
  const dropdownRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const journalDetail = useSelector(state => state?.journalDetail);
  const quoteStatus = useSelector(state => state?.quoteStatus);
  // const quoteDelete = useSelector(state => state?.quoteDelete);
  const quotation = journalDetail?.data?.data?.data;
  //   console.log("quotation", journalDetail)
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
      setShowDropdownx1(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const UrlId = new URLSearchParams(location.search).get("id");

  const handleEditThing = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);
    queryParams.set("edit", true);
    Navigate(`/dashboard/create-journal?${queryParams.toString()}`);
  };

  const [callApi, setCallApi] = useState(false);
  const changeStatus = (statusVal) => {
    try {
      const sendData = {
        id: UrlId
      }
      switch (statusVal) {
        case 'accepted':
          sendData.status = 1
          break;
        case 'decline':
          sendData.status = 2
          break;
        default:
      }

      if (statusVal === "delete") {
        dispatch(quotationDelete(sendData, Navigate));
      } else {
        dispatch(quotationStatus(sendData)).then(() => {
          setCallApi((preState) => !preState);
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (UrlId) {
      const queryParams = {
        journal_id: UrlId,
        fy: localStorage.getItem('FinancialYear'),
        warehouse_id: localStorage.getItem('selectedWarehouseId'),
      };
      dispatch(JournalDetails(queryParams));
    }
  }, [dispatch, UrlId, callApi]);

  const totalFinalAmount = quotation?.items?.reduce((acc, item) => acc + parseFloat(item?.final_amount), 0);


  const [loading, setLoading] = useState(false);


  const handleApproveJournal = async (journal_id) => {
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/journal/approved`, {
        journal_id
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required
        }
      });

      if (response.status !== 200) {
        throw new Error('Failed to approve journal');
      }

      // Handle success response as needed
      toast.success('Journal approved successfully');
    } catch (error) {
      console.error('Error approving journal:', error);
      toast.error(`Error approving journal: ${error.message}`);
    } finally {
      setLoading(false); // Hide loader
    }
  };
  return (
    <>
      {loading && <MainScreenFreezeLoader />}
      {quoteStatus?.loading && <MainScreenFreezeLoader />}
      {journalDetail?.loading ? <Loader02 /> :
        <>
          <div id="Anotherbox" className='formsectionx3'>
            <div id="leftareax12">
              <h1 id="firstheading">{quotation?.journal_no}</h1>
            </div>
            <div id="buttonsdata">

              <div className="mainx1" onClick={handleEditThing}>
                <img src="/Icons/pen-clip.svg" alt="" />
                <p>Edit</p>
              </div>

              <div onClick={() => setShowDropdownx1(!showDropdownx1)} className="mainx1" ref={dropdownRef}>
                <p>PDF/Print</p>
                {otherIcons?.arrow_svg}
                {showDropdownx1 && (
                  <div className="dropdownmenucustom">
                    <div className='dmncstomx1 primarycolortext' >
                      {otherIcons?.pdf_svg}
                      PDF</div>
                    <div className='dmncstomx1 primarycolortext' >
                      {otherIcons?.print_svg}
                      Print</div>

                  </div>
                )}
              </div>

              {quotation?.status == 1 ? (
                <div className="mainx1">
                  {otherIcons?.notes_svg}
                  <p>Published</p>
                </div>
              ) : (
                <div onClick={() => handleApproveJournal(UrlId)} className="mainx1">
                  {otherIcons?.notes_svg}
                  <p>Publish</p>
                </div>
              )}



              <div className="sepc15s63x63"></div>



              <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef}>
                <img src="/Icons/menu-dots-vertical.svg" alt="" />
                {showDropdown && (
                  <div className="dropdownmenucustom">

                    <div className='dmncstomx1' >
                      {otherIcons?.duplicate_svg}
                      Duplicate</div>
                    <div className='dmncstomx1' style={{ cursor: "pointer" }} onClick={() => changeStatus("delete")}>
                      {otherIcons?.delete_svg}
                      Delete</div>
                  </div>
                )}
              </div>







              <Link to={"/dashboard/quotation"} className="linkx3">
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
                    Account Journal Information
                  </div>

                  <ul style={{ width: "453px" }}>

                    <li>
                      <span>Journal Name</span>
                      <h1>:</h1>
                      <p>

                        {quotation?.journal_no || ""}

                      </p>
                    </li>
                    <li>
                      <span>Total Credit</span>
                      <h1>:</h1>
                      <p>
                        {quotation?.total_credit || ""}
                      </p>
                    </li>
                    <li>
                      <span>Total Debit</span>
                      <h1>:</h1>
                      <p>
                        {quotation?.total_debit || ""}
                      </p>
                    </li>

                    {/* <li>
                  <span>IFSC Code </span>
                  <h1>:</h1>
                  <p>  {quotation?.accounts?.ifsc || ""}</p>
                </li> */}

                    <li>
                      <span>Tax Code</span>
                      <h1>:</h1>
                      <p>  {quotation?.accounts?.tax_code || ""}</p>
                    </li>

                    {/* {console.log("formdata", JSON?.parse(quotation?.accounts?.upload_image))} */}
                    <li>
                      <span>Attachment</span>
                      <h1>:</h1>
                      {(quotation?.accounts?.upload_image?.length > 10) ?
                        <p className="file_att_21"
                          onClick={() => {
                            setShowPopup(true);
                            setPopupImageUrl((quotation?.accounts?.upload_image)); // Set the image URL for the popup
                          }}>  {otherIcons?.file_svg} File Attached</p>
                        :
                        <p className="file_att_21">
                          No File Attached</p>
                      }
                    </li>
                    <li>
                      <span>Notes</span>
                      <h1>:</h1>
                      <p> {(quotation?.accounts?.description)}</p>
                    </li>
                  </ul>
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
                      <p id="firsttagp">{quotation?.transactions?.length}</p>
                      <p id="firsttagp">Total</p>
                    </div>
                  </div>
                  <div className="table-headerx12">

                    {/* Recent Transactions */}
                    {quotation?.journal_entry?.map((val, index) => (
                      <div key={index} className={`table-cellx12 ${val?.className}`}>
                        {val?.svg}
                        {val?.name}
                      </div>
                    ))}
                  </div>

                  {quotation?.loading ? (
                    <TableViewSkeleton />
                  ) : (
                    <>
                      {quotation?.transactions?.length >= 0 ? (
                        quotation?.transactions?.map((quotation, index) => (
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

                    </>
                  )}
                </div>
              </div>
            </div>
            <Toaster />
          </div>
        </>}
      <Toaster />
    </>
  )
}

export default JournalDetailsSing
