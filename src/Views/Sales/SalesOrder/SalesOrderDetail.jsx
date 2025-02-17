import React, { useMemo, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { saleOrderDelete, saleOrderDetails, saleOrderStatus } from '../../../Redux/Actions/saleOrderActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader02 from '../../../Components/Loaders/Loader02';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { Toaster } from 'react-hot-toast';
import { formatDate3 } from '../../Helper/DateFormat';

import useOutsideClick from '../../Helper/PopupData';
import ItemDetailTable from '../../Common/InsideSubModulesCommon/ItemDetailTable';
import { FromToDetails, MoreInformation, ShowAllStatus, ShowDropdownContent } from '../../Common/InsideSubModulesCommon/DetailInfo';
import PrintContent from '../../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent';
import { generatePDF } from '../../Helper/createPDF';
import useFetchApiData from '../../Helper/ComponentHelper/useFetchApiData';
import { UserMasterListAction } from '../../../Redux/Actions/userMasterActions';
import { confirIsCurrencyPDF } from '../../Helper/ConfirmHelperFunction/ConfirmWithZeroAmount';
import { getCurrencyValue } from '../../Helper/ComponentHelper/ManageStorage/localStorageUtils';
import { currencyRateListAction } from '../../../Redux/Actions/manageCurrencyActions';

const SalesOrderDetail = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownx1, setShowDropdownx1] = useState(false);
  const saleStatus = useSelector(state => state?.saleStatus);
  const saleDelete = useSelector(state => state?.saleDelete);
  const saleDetail = useSelector(state => state?.saleDetail);
  const sale = saleDetail?.data?.data?.salesOrder;
  // console.log("sale", sale)

  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);



  useOutsideClick(dropdownRef2, () => setShowDropdown(false));
  useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));



  const UrlId = new URLSearchParams(location.search).get("id");

  const handleEditThing = (val) => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);

    if (val === "edit") {
      queryParams.set("edit", true);
      Navigate(`/dashboard/create-sales-orders?${queryParams.toString()}`);
    } else if (val === "convert") {
      queryParams.set("convert", "saleToInvoice");
      Navigate(`/dashboard/create-invoice?${queryParams.toString()}`);
    }

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
        case 'sent':
          sendData.status = 6
          break;
        default:
      }

      if (statusVal === "delete") {
        dispatch(saleOrderDelete(sendData, Navigate)).then(() => {
          setCallApi((preState) => !preState);
        });
      } else {
        dispatch(saleOrderStatus(sendData)).then(() => {
          setCallApi((preState) => !preState);
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }


  const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
    id: UrlId,
  }), [callApi]);

  useFetchApiData(saleOrderDetails, payloadGenerator, [callApi]);


  // pdf & print
  const componentRef = useRef(null);
  const masterData = useSelector(state => state?.masterData?.masterData);
  const [loading, setLoading] = useState(false);


  // handle download pdf......
  const rateLoading = useSelector(state => state?.currencyRateList);
  const handleDownloadPDF = async () => {
    try {
      if (!sale?.transaction_date) return;

      // Fetch currency rates for the transaction date
      const res = await dispatch(currencyRateListAction({ date: sale?.transaction_date }));
      const fetchCurrencyData = res?.data?.find(val => val?.code === sale?.currency);

      // Ensure masterData & sale exist before proceeding
      if (!sale || !masterData) {
        dispatch(UserMasterListAction());
        alert("Data is still loading, please try again.");
        return;
      }

      const generatePDFWithData = (currencyData) => {
        const contentComponent = (
          <PrintContent
            data={sale}
            masterData={masterData}
            moduleId={sale?.quotation_id}
            section="Sale"
            fetchCurrencyData={currencyData}
          />
        );
        generatePDF(contentComponent, "Sale_Document.pdf", setLoading, 500);
      };

      if (fetchCurrencyData) {
        generatePDFWithData(fetchCurrencyData);
      } else if (sale?.currency === getCurrencyValue()) {
        generatePDFWithData(null); // No conversion needed
      } else {
        // Prompt user to create missing currency
        const res = await confirIsCurrencyPDF(sale?.currency);
        if (res) {
          Navigate(`/dashboard/manage-currency?date=${sale?.transaction_date}&currency=${sale?.currency}`);
        }
      }
    } catch (error) {
      console.error("Error fetching currency rates:", error);
    }
  };


  return (
    <>
      {(saleStatus?.loading || loading || rateLoading?.loading || saleDelete?.loading) && <MainScreenFreezeLoader />}

      {

        saleDetail.loading ? <Loader02 /> :

          <div ref={componentRef}>
            <div id="Anotherbox" className='formsectionx1'>
              <div id="leftareax12">
                <h1 id="firstheading">{sale?.sale_order_id}</h1>
              </div>

              <div id="buttonsdata">

                {
                  sale?.status == "0" &&
                  <div className="mainx1" onClick={() => handleEditThing("edit")}>
                    <img src="/Icons/pen-clip.svg" alt="" />
                    <p>Edit</p>
                  </div>
                }

                <div className="mainx1" onClick={handleDownloadPDF}>
                  <p style={{ cursor: 'pointer' }}>
                    PDF/Print
                  </p>
                </div>

                <div className="sepc15s63x63"></div>
                {sale?.status !== "1" &&
                  <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef2}>
                    <img src="/Icons/menu-dots-vertical.svg" alt="" data-tooltip-id="my-tooltip" data-tooltip-content="More Options" data-tooltip-place='bottom' />

                    {showDropdown && (
                      <ShowDropdownContent quotation={sale} changeStatus={changeStatus} />
                    )}

                  </div>
                }
                <Link to={"/dashboard/sales-orders"} className="linkx3" data-tooltip-id="my-tooltip" data-tooltip-content="Close" data-tooltip-place='bottom'>
                  <RxCross2 />
                </Link>
              </div>
            </div>
            <div className="listsectionsgrheigh" id='quotation-content'>
              {sale?.status == 1 &&
                <div className="commonquoatjkx54s">
                  <div className="firstsecquoatjoks45">
                    <div className="detailsbox4x15sfirp">
                      <img src="https://cdn-icons-png.flaticon.com/512/9329/9329876.png" alt="" />
                    </div>
                    <div className="detailsbox4x15s">
                      <h2>Fulfill the Sales Order</h2>
                      <p>You have the flexibility to generate packages, shipments, or invoices (in any order you prefer) to fulfill this sales order.</p>
                      <button onClick={() => handleEditThing("convert")}>
                        Convert To Invoice
                      </button>
                    </div>
                  </div>
                </div>
              }
              <div className="commonquoatjkx55s">
                <div className="childommonquoatjkx55s">
                  <ShowAllStatus quotation={sale} />

                  <div className="detailsbox4x15s1">
                    <div className="xhjksl45s">
                      <svg width="24" height="23" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path d="M16.7582 0.894043L18.8566 4.51588L16.7582 8.13771H12.5615L10.4631 4.51588L12.5615 0.894043L16.7582 0.894043Z" /><path d="M6.29509 0.894043L13.5963 13.4842L11.4979 17.1061H7.30116L0 4.51588L2.09836 0.894043L6.29509 0.894043Z" /></svg>
                      <p>Accounts</p>
                    </div>
                    <div className="xhjksl45s2">
                      <h1>Sales Order</h1>
                      <span><p>Sales Order:</p> <h3>{sale?.sale_order_id}</h3></span>
                      <span><p>Sales-Order Date:</p> <h3>{formatDate3(sale?.transaction_date)}</h3></span>
                    </div>
                  </div>

                  <FromToDetails quotation={sale?.customer} section="Sales Orders" />
                  <ItemDetailTable itemsData={sale} />

                </div>
              </div>

              <MoreInformation sale={sale?.sale_person} note={sale?.customer_note} tc={sale?.terms_and_condition} section="Customer" />

            </div>
          </div>}
      <Toaster />
    </>
  )
}

export default SalesOrderDetail;