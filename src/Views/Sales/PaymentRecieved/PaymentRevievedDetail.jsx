import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { useDispatch, useSelector } from 'react-redux';
import Loader02 from '../../../Components/Loaders/Loader02';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { Toaster } from 'react-hot-toast';
import { formatDate3 } from '../../Helper/DateFormat';
import { paymentRecDelete, paymentRecDetail, paymentRecStatus } from '../../../Redux/Actions/PaymentRecAction';
import { FromToDetails, MoreInformation, ShowAllStatus, ShowDropdownContent } from '../../Common/InsideSubModulesCommon/DetailInfo';

import useOutsideClick from '../../Helper/PopupData';
import { Payment_Receive_DetailTable } from '../../Common/InsideSubModulesCommon/ItemDetailTable';
import { generatePDF } from '../../Helper/createPDF';
import PrintContent from '../../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent';

const PaymentRevievedDetail = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [showDropdown, setShowDropdown] = useState(false);
    const paymentDetail = useSelector(state => state?.paymentRecDetail);
    const paymentDelete = useSelector(state => state?.paymentRecDelete);
    const paymentRecStatuss = useSelector(state => state?.paymentRecStatus);
    const payment = paymentDetail?.data?.data?.payment;

    const dropdownRef = useRef(null);
    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);

    useOutsideClick(dropdownRef, () => setShowDropdown(false));
    useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));
    useOutsideClick(dropdownRef2, () => setShowDropdown(false));

    const UrlId = new URLSearchParams(location.search).get("id");

    const handleEditThing = (val) => {
        const queryParams = new URLSearchParams();
        queryParams.set("id", UrlId);

        if (val === "edit") {
            queryParams.set(val, true);
            Navigate(`/dashboard/create-payment-rec?${queryParams.toString()}`);
        } else if (val == "duplicate") {
            queryParams.set(val, true);
            Navigate(`/dashboard/create-payment-rec?${queryParams.toString()}`);
        }

    };

    const [callApi, setCallApi] = useState(0);

    const changeStatus = (statusVal) => {
        // console.log("statusVal", statusVal);
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
                dispatch(paymentRecDelete(sendData, Navigate, "payment-recieved")).then(() => {
                    setCallApi((preState) => !preState);
                });
            } else {
                dispatch(paymentRecStatus(sendData))
                    .then(() => {
                        setCallApi((prev) => prev + 1);
                    })
                    .catch((error) => {
                        console.error("Error updating payment status:", error);
                    });
            }
        } catch (error) {
            console.log("error", error);
        }
    }


    useEffect(() => {
        if (UrlId) {
            const queryParams = {
                id: UrlId,
            };
            dispatch(paymentRecDetail(queryParams));
        }
    }, [dispatch, UrlId, callApi]);

    // pdf & print
    const componentRef = useRef(null);
    const masterData = useSelector(state => state?.masterData?.masterData);
    const [loading, setLoading] = useState(false);

    const handleDownloadPDF = () => {
        if (!payment || !masterData) {
            alert("Data is still loading, please try again.");
            return;
        }

        const contentComponent = (
            <PrintContent data={payment} cusVenData={payment?.customer} masterData={masterData} moduleId={payment?.payment_id} section="Payment Receive" />
        );

        generatePDF(contentComponent, "Payment_Receive_Document.pdf", setLoading, 500);
    };



    return (
        <>
            {(paymentDelete?.loading || paymentRecStatuss?.loading || loading) && <MainScreenFreezeLoader />}

            {paymentDetail?.loading ? <Loader02 /> :
                <div ref={componentRef} >
                    <Toaster />
                    <div id="Anotherbox" className='formsectionx1'>
                        <div id="leftareax12">
                            <h1 id="firstheading">{payment?.payment_id}</h1>
                        </div>
                        <div id="buttonsdata">

                            {/* {payment?.status == "1" ? "" :
                                <div className="mainx1" onClick={() => handleEditThing("edit")}>
                                    <img src="/Icons/pen-clip.svg" alt="" />
                                    <p>Edit</p>
                                </div>
                            } */}

                            <div className="mainx1">
                                <p onClick={handleDownloadPDF} style={{ cursor: 'pointer' }}>
                                    PDF/Print
                                </p>
                            </div>

                            <div className="sepc15s63x63"></div>

                            {payment?.status != "1" &&
                                <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef2}>
                                    <img src="/Icons/menu-dots-vertical.svg" alt="" data-tooltip-id="my-tooltip" data-tooltip-content="More Options" data-tooltip-place='bottom' />
                                    {showDropdown && (
                                        <ShowDropdownContent quotation={payment} changeStatus={changeStatus} />
                                    )}
                                </div>
                            }

                            <Link to={"/dashboard/payment-recieved"} className="linkx3">
                                <RxCross2 />
                            </Link>
                        </div>
                    </div>
                    <div className="listsectionsgrheigh">


                        <div className="commonquoatjkx55s">
                            <div className="childommonquoatjkx55s">

                                <div className="detailsbox4x15s1">
                                    <div className="xhjksl45s">
                                        <svg width="24" height="23" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path d="M16.7582 0.894043L18.8566 4.51588L16.7582 8.13771H12.5615L10.4631 4.51588L12.5615 0.894043L16.7582 0.894043Z" /><path d="M6.29509 0.894043L13.5963 13.4842L11.4979 17.1061H7.30116L0 4.51588L2.09836 0.894043L6.29509 0.894043Z" /></svg>
                                        <p>Accounts</p>
                                    </div>
                                    <div className="xhjksl45s2">
                                        <h1>Payment</h1>
                                        <span><p>Payment No:</p> <h3>{payment?.payment_id}</h3></span>
                                        <span><p>Payment Date:</p> <h3> {formatDate3(payment?.transaction_date)}</h3></span>
                                    </div>
                                </div>

                                {/* <div className="detailsbox4x15s2" id='quotation-content'>
                                    <div className="cjkls5xs1">
                                        <h1>Payment to:</h1>
                                        <h3>{payment?.to_acc?.account_name}</h3>

                                    </div>

                                </div> */}


                                <FromToDetails quotation={payment?.customer} section="Payment Receive" />
                                <Payment_Receive_DetailTable payment={payment} />

                                {/* <div className="finalcalculateiosxl44s">
                                    <span><p>Subtotal</p> <h5>{totalFinalAmount?.toFixed(2) || "00"}</h5></span>
                                    <span><p>Total</p> <h5>{totalFinalAmount?.toFixed(2) || "00"}</h5></span>
                                </div> */}
                            </div>
                        </div>
                        {/* <div className="lastseck4x5s565">
                            <h2>More information</h2>
                            <p>Sale person:    {payment?.sale_person || ""} </p>
                        </div> */}
                        <MoreInformation sale={payment?.sale_person || ""} note={payment?.customer_note} tc={payment?.terms_and_condition} section="Customer" />
                    </div>
                </div>}
        </>
    )
}

export default PaymentRevievedDetail;