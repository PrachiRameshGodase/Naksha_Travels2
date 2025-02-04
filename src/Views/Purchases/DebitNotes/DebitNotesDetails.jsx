import React, { useEffect, useMemo, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { debitNotesDelete, debitNotesDetails, debitNotesStatus } from '../../../Redux/Actions/notesActions';
import Loader02 from '../../../Components/Loaders/Loader02';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { Toaster } from 'react-hot-toast';


import useOutsideClick from '../../Helper/PopupData';
import { formatDate3 } from '../../Helper/DateFormat';
import ItemDetailTable from '../../Common/InsideSubModulesCommon/ItemDetailTable';
import { MoreInformation, FromToDetailsPurchases } from '../../Common/InsideSubModulesCommon/DetailInfo';
import { generatePDF } from '../../Helper/createPDF';
import PrintContent from '../../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent';
import useFetchApiData from '../../Helper/ComponentHelper/useFetchApiData';

const DebitNotesDetails = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const componentRef = useRef(null);

    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownx1, setShowDropdownx1] = useState(false);
    const masterData = useSelector(state => state?.masterData?.masterData);

    const quoteStatus = useSelector(state => state?.debitNoteStatus);
    const debitDelete = useSelector(state => state?.debitNoteDelete);
    const debitDetails = useSelector(state => state?.debitNoteDetail);
    const debitDetail = debitDetails?.data?.data?.debit_note;
    // debitNoteDetail
    // debitNoteDelete



    const dropdownRef = useRef(null);
    const dropdownRef1 = useRef(null);
    useOutsideClick(dropdownRef, () => setShowDropdown(false));
    useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));



    const UrlId = new URLSearchParams(location.search).get("id");

    const handleEditThing = (val) => {
        const queryParams = new URLSearchParams();
        queryParams.set("id", UrlId);

        if (val === "edit") {
            queryParams.set("edit", true);
            Navigate(`/dashboard/create-debit-note?${queryParams.toString()}`);
        }
        else if (val === "duplicate") {
            queryParams.set("duplicate", true);
            Navigate(`/dashboard/create-debit-note?${queryParams.toString()}`);
        }

    };



    const [callApi, setCallApi] = useState(false);

    const changeStatus = (statusVal) => {
        try {
            const sendData = {
                id: UrlId,
            };
            switch (statusVal) {
                case "accepted":
                    sendData.status = 1;
                    break;
                case "decline":
                    sendData.status = 2;
                    break;
                default:
            }

            if (statusVal === "delete") {
                dispatch(debitNotesDelete(sendData, Navigate));
            } else {
                dispatch(debitNotesStatus(sendData)).then(() => {
                    setCallApi((preState) => !preState);
                });
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
        id: UrlId,
        fy: localStorage.getItem('FinancialYear'),
        warehouse_id: localStorage.getItem('selectedWarehouseId'),
    }), [callApi]);

    useFetchApiData(debitNotesDetails, payloadGenerator, [callApi]);

    // pdf & print
    const [loading, setLoading] = useState(false);


    const handleDownloadPDF = () => {
        if (!debitDetail || !masterData) {
            alert("Data is still loading, please try again.");
            return;
        }

        const contentComponent = (
            <PrintContent data={debitDetail} cusVenData={debitDetail?.vendor} masterData={masterData} moduleId={debitDetail?.debit_note_id} section="Debit Note" />
        );
        generatePDF(contentComponent, "Purchser_Order_Document.pdf", setLoading, 500);
    };

    return (
        <>
            {(quoteStatus?.loading || debitDelete?.loading || loading) && <MainScreenFreezeLoader />}

            {debitDetails?.loading ? <Loader02 /> :
                <div ref={componentRef}>

                    <div id="Anotherbox" className='formsectionx1'>
                        <div id="leftareax12">
                            <h1 id="firstheading">{debitDetail?.debit_note_id}</h1>
                        </div>
                        <div id="buttonsdata">



                            <div className="mainx1" onClick={() => handleEditThing("edit")}>
                                <img src="/Icons/pen-clip.svg" alt="" />
                                <p>Edit</p>
                            </div>
                            <div
                                onClick={() => setShowDropdownx1(!showDropdownx1)}
                                className="mainx1"
                                ref={dropdownRef1}
                            >
                                <p onClick={handleDownloadPDF} style={{ cursor: 'pointer' }}>
                                    PDF/Print
                                </p>
                            </div>


                            <div className="sepc15s63x63"></div>

                            <div
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="mainx2"
                                ref={dropdownRef}
                            >
                                <img src="/Icons/menu-dots-vertical.svg" alt="" />
                                {showDropdown && (
                                    <div className="dropdownmenucustom">
                                        {debitDetail?.status == "1" ? (
                                            // <div className='dmncstomx1' onClick={() => changeStatus("decline")}>
                                            //   {otherIcons?.cross_declined_svg}
                                            //   Mark as declined
                                            // </div>
                                            <></>
                                        ) : debitDetail?.status == "2" ? (
                                            <div
                                                className="dmncstomx1"
                                                onClick={() => changeStatus("accepted")}
                                            >
                                                {otherIcons?.check_accepted_svg}
                                                Mark as accepted
                                            </div>
                                        ) : (
                                            <>
                                                <div
                                                    className="dmncstomx1"
                                                    onClick={() => changeStatus("decline")}
                                                >
                                                    {otherIcons?.cross_declined_svg}
                                                    Mark as declined
                                                </div>
                                                <div
                                                    className="dmncstomx1"
                                                    onClick={() => changeStatus("accepted")}
                                                >
                                                    {otherIcons?.check_accepted_svg}
                                                    Mark as accepted
                                                </div>
                                            </>
                                        )}
                                        <div
                                            className="dmncstomx1"
                                            onClick={() => handleEditThing("duplicate")}
                                        >
                                            {otherIcons?.duplicate_svg}
                                            Duplicate
                                        </div>
                                        {/* <div className='dmncstomx1' >
        {otherIcons?.convert_svg}
        Convert</div> */}
                                        <div
                                            className="dmncstomx1"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => changeStatus("delete")}
                                        >
                                            {otherIcons?.delete_svg}
                                            Delete
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Link to={"/dashboard/debit-notes"} className="linkx3" data-tooltip-place='bottom' data-tooltip-id="my-tooltip" data-tooltip-content="Close">
                                <RxCross2 />
                            </Link>
                        </div>
                    </div>
                    <div className="listsectionsgrheigh" id='quotation-content'>


                        <div className="commonquoatjkx55s">
                            <div className="childommonquoatjkx55s">

                                <div className=
                                    {
                                        debitDetail?.status == 0 ? 'draftClassName' : debitDetail?.status == 1 ? 'approvedClassName' : debitDetail?.status == 2 ? 'declinedClassName' : debitDetail?.status == 3 ? 'sentClassName' : debitDetail?.status == 4 ? 'convertedClassName2' : 'defaultClassName'
                                    }

                                >
                                    {debitDetail?.status == "0" ? "Draft" : debitDetail?.status == "1" ? "Approved" : debitDetail?.status == "2" ? "Decline" : debitDetail?.status == "3" ? "Pending" : debitDetail?.status == "4" ? "Overdue" : ""
                                    }
                                </div>


                                <div className="detailsbox4x15s1">
                                    <div className="xhjksl45s">
                                        <svg width="24" height="23" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path d="M16.7582 0.894043L18.8566 4.51588L16.7582 8.13771H12.5615L10.4631 4.51588L12.5615 0.894043L16.7582 0.894043Z" /><path d="M6.29509 0.894043L13.5963 13.4842L11.4979 17.1061H7.30116L0 4.51588L2.09836 0.894043L6.29509 0.894043Z" /></svg>
                                        <p>Accounts</p>
                                    </div>
                                    <div className="xhjksl45s2">
                                        <h1>Debit Note</h1>
                                        <span><p>Debit Note No:</p> <h3>{debitDetail?.debitDetail_order_id}</h3></span>
                                        <span><p>Bill Date:</p> <h3>{formatDate3(debitDetail?.created_at)}</h3></span>
                                    </div>
                                </div>
                                <br />
                                <FromToDetailsPurchases quotation={debitDetail?.vendor} section="Debit Note" />
                                <ItemDetailTable itemsData={debitDetail} />

                            </div>
                        </div>
                        <MoreInformation sale={debitDetail?.sale_person} note={debitDetail?.vendor_note} tc={debitDetail?.terms_and_condition} section="Vendor" />
                    </div>
                </div>}
            <Toaster />
        </>
    )
}

export default DebitNotesDetails;