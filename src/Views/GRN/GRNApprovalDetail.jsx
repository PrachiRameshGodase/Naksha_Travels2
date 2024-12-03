import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { otherIcons } from '../Helper/SVGIcons/ItemsIcons/Icons';
// import { purchaseOrderDelete, purchaseOrderDetails, purchaseOrderStatus } from '../../../Redux/Actions/purchaseOrderActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader02 from '../../Components/Loaders/Loader02';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';
import toast, { Toaster } from 'react-hot-toast';
import { formatDate, formatDate2, formatDate3, formatDate4, generatePDF } from '../Helper/DateFormat';

import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import useOutsideClick from '../Helper/PopupData';
import { purchasesDelete, purchasesDetails, purchasesStatus } from '../../Redux/Actions/purchasesActions';
import { GRNdeleteActions, GRNdetailsActions, GRNstatusActions } from '../../Redux/Actions/grnActions';
import ImagesCrou from '../../Components/ShowImageCarousel.jsx/ImagesCrou';
import { fetchMasterData } from '../../Redux/Actions/globalActions';
import { parseJSONofString, showAmountWithCurrencySymbol, ShowAutoGenerateId, showRateWithPercent } from '../Helper/HelperFunctions';
import { GrnItemsDetailTable } from '../Common/InsideSubModulesCommon/ItemDetailTable';
// import { GrnItemsDetailTable } from '../Items/ItemDetailTable';
import { MoreInformation } from '../Common/InsideSubModulesCommon/DetailInfo';
const GRNApprovalDetail = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownx1, setShowDropdownx1] = useState(false);
    const grnStatus = useSelector(state => state?.GRNstatus);
    const grnDelete = useSelector(state => state?.GRNdelete);
    const masterData = useSelector(state => state?.masterData?.masterData);


    const GRNdetails = useSelector(state => state?.GRNdetails);
    const GRNdetail = GRNdetails?.data?.bgrnill;

    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);


    useOutsideClick(dropdownRef2, () => setShowDropdown(false));
    useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));

    const [showImagesModal, setshowImagesModal] = useState(false);
    const [showComponent, setShowComponent] = useState(false);
    const [imagesVal, setImagesVal] = useState([]);

    const showAllImages = (val) => {
        setImagesVal(val);
        setshowImagesModal(true);
        setShowComponent(true);

    }


    const result = GRNdetail?.items?.map(({ po_qty, rate, gross_amount, final_amount, item_remark, tax_amount, tax_rate, item, discount, discount_type, unit_id }) => ({
        item_id: item?.id,
        quantity: po_qty,
        rate,
        gross_amount,
        final_amount,
        item_remark,
        tax_amount,
        tax_rate,
        discount,
        discount_type,
        unit_id
    }));
    const autoId = ShowAutoGenerateId("bill");

    // for create a copy of grn in bill when grn is approved successfully
    const billData = {
        purchase_type: "bills",
        bill_no: `${autoId.prefix}${autoId.delimiter}${(autoId.sequence_number)}`,//for bill id no correctly +1 
        transaction_date: GRNdetail?.transaction_date, // bill date
        currency: GRNdetail?.purchase_order?.currency || "USD",
        // expiry_date: "2024-04-21", 
        vendor_id: (+GRNdetail?.vendor?.id),
        fy: GRNdetail?.fy,
        warehouse_id: localStorage.getItem('selectedWarehouseId'),
        vendor_name: (GRNdetail?.vendor?.first_name || "") + (GRNdetail?.vendor?.last_name || ""),
        phone: GRNdetail?.vendor?.mobile_no,
        email: GRNdetail?.vendor?.email,
        terms_and_condition: GRNdetail?.terms_and_condition,
        vendor_note: GRNdetail?.vendor_note,
        subtotal: GRNdetail?.subtotal,
        discount: GRNdetail?.discount,
        shipping_charge: GRNdetail?.shipping_charge,
        adjustment_charge: GRNdetail?.adjustment_charge,
        total: GRNdetail?.total,
        reference_no: GRNdetail?.reference,
        place_of_supply: GRNdetail?.place_of_supply,
        // source_of_supply: GRNdetail?.,
        shipment_date: GRNdetail?.purchase_order?.shipment_date,
        order_no: GRNdetail?.purchase_order?.order_no,
        payment_terms: GRNdetail?.purchase_order?.payment_terms,
        customer_notes: GRNdetail?.vendor_note,
        upload_image: GRNdetail?.upload_image,
        status: 1,
        is_grn_convert: 1,
        items: result
    };
    // for create a copy of grn in bill when grn is approved successfully

    const UrlId = new URLSearchParams(location.search).get("id");
    const [callApi, setCallApi] = useState(false);

    const handleEditThing = (val) => {
        const queryParams = new URLSearchParams();
        queryParams.set("id", UrlId);
        if (val === "edit") {
            queryParams.set("edit", true);
            Navigate(`/dashboard/new-grn?${queryParams.toString()}`);
        } else if (val === "convert") {
            queryParams.set("convert", "grn_to_bill");
            Navigate(`/dashboard/create-bills?${queryParams.toString()}`);
        } else if (val === "duplicate") {
            queryParams.set("duplicate", true);
            Navigate(`/dashboard/new-grn?${queryParams.toString()}`);
        } else if (val === "approved") {
            dispatch(GRNstatusActions({ id: UrlId, status: 1 }, setCallApi, billData, autoId, parseJSONofString(GRNdetail?.tracking_details), Navigate));
        } else if (val === "declined") {
            dispatch(GRNstatusActions({ id: UrlId, status: 2 }, setCallApi));
        }
    };

    const changeStatus = (statusVal) => {
        try {
            const sendData = {
                id: UrlId
            }

            const billData = {

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
                dispatch(GRNdeleteActions(sendData, Navigate))
            }
            else {
                dispatch(GRNstatusActions(sendData, billData)).then(() => {
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
                id: UrlId,
            };
            dispatch(GRNdetailsActions(queryParams));
            dispatch(fetchMasterData());
        }
    }, [dispatch, UrlId, callApi]);


    // pdf & print
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const generatePDF = () => {
        const input = document.getElementById('quotation-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('quotation.pdf');
        });
    };
    // pdf & print



    return (
        <>
            {grnDelete?.loading && <MainScreenFreezeLoader />}
            {grnStatus?.loading && <MainScreenFreezeLoader />}
            {GRNdetails?.loading ? <Loader02 /> :
                <div ref={componentRef}>

                    <div id="Anotherbox" className='formsectionx1'>
                        <div id="leftareax12">
                            <h1 id="firstheading">{GRNdetail?.grn_no}</h1>
                        </div>
                        <div id="buttonsdata">

                            {GRNdetail?.status == 2 || GRNdetail?.status == 1 ? "" : <div className="mainx1 s1d2f14s2d542maix4ws" onClick={() => handleEditThing("approved")} >
                                <p>Approve</p>
                            </div>}


                            {GRNdetail?.status == 1 || GRNdetail?.status == 2 ? "" : <div className="mainx1 s1d2f14s2d542maix5ws" onClick={() => handleEditThing("declined")} >
                                <p>Decline</p>
                            </div>}

                            {/* {GRNdetail?.status == 1 || GRNdetail?.status == 2 ? "" :
                                <div className="mainx1" onClick={() => handleEditThing("edit")} data-tooltip-place='bottom' data-tooltip-id="my-tooltip" data-tooltip-content="Edit">
                                    <img src="/Icons/pen-clip.svg" alt="" />
                                    <p>Edit</p>
                                </div>
                            } */}
                            <div onClick={() => setShowDropdownx1(!showDropdownx1)} className="mainx1" ref={dropdownRef1}>
                                <p >PDF/Print</p>
                                {otherIcons?.arrow_svg}
                                {showDropdownx1 && (
                                    <div className="dropdownmenucustom">
                                        <div className='dmncstomx1 primarycolortext' onClick={() => generatePDF(GRNdetail?.items)}>
                                            {otherIcons?.pdf_svg}
                                            PDF</div>
                                        <div className='dmncstomx1 primarycolortext' onClick={handlePrint}>
                                            {otherIcons?.print_svg}
                                            Print</div>

                                    </div>
                                )}
                            </div>

                            <div className="sepc15s63x63"></div>

                            <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef2}>
                                <img src="/Icons/menu-dots-vertical.svg" alt="" data-tooltip-place='bottom' data-tooltip-id="my-tooltip" data-tooltip-content="More Options" />
                                {showDropdown && (
                                    <div className="dropdownmenucustom">

                                        <div className='dmncstomx1' onClick={() => handleEditThing("duplicate")}>
                                            {otherIcons?.duplicate_svg}
                                            Duplicate</div>

                                        <div className='dmncstomx1' style={{ cursor: "pointer" }} onClick={() => changeStatus("delete")}>
                                            {otherIcons?.delete_svg}
                                            Delete</div>
                                    </div>
                                )}
                            </div>
                            <Link to={"/dashboard/grn_approval"} className="linkx3" data-tooltip-place='bottom' data-tooltip-id="my-tooltip" data-tooltip-content="Close">
                                <RxCross2 />
                            </Link>
                        </div>
                    </div>
                    <div className="listsectionsgrheigh" id='quotation-content'>
                        {/* {GRNdetail?.status == 2 ? "" :
                            <>
                                <div className="commonquoatjkx54s">
                                    <div className="firstsecquoatjoks45">
                                        <div className="detailsbox4x15sfirp">
                                            <img src="https://cdn-icons-png.flaticon.com/512/9329/9329876.png" alt="" />
                                        </div>
                                        <div className="detailsbox4x15s">
                                            <h2>Complete Your GRN</h2>


                                            <p>You can create the bills and receives(in any sequence) with this order to complete your GRN.</p>
                                            <button onClick={() => handleEditThing("convert")}>
                                                Convert To Bill
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </>
                        } */}

                        <div className="commonquoatjkx55s" style={{ width: "91%" }}>
                            <div className="childommonquoatjkx55s" >

                                <div className=
                                    {
                                        GRNdetail?.status == 0 ? 'convertedClassName' : GRNdetail?.status == 1 ? 'approvedClassName' : GRNdetail?.status == 2 ? 'declinedClassName' : GRNdetail?.status == 3 ? 'sentClassName2' : GRNdetail?.status == 4 ? 'convertedClassName' : 'defaultClassName'
                                    }
                                >

                                    {GRNdetail?.status == "0" ? "Draft" : GRNdetail?.status == "1" ? "Approved" : GRNdetail?.status == "2" ? "Decline" : GRNdetail?.status == "3" ? "Pending" : ""
                                    }

                                </div>




                                <div className="detailsbox4x15s1">
                                    <div className="xhjksl45s">
                                        <svg width="24" height="23" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path d="M16.7582 0.894043L18.8566 4.51588L16.7582 8.13771H12.5615L10.4631 4.51588L12.5615 0.894043L16.7582 0.894043Z" /><path d="M6.29509 0.894043L13.5963 13.4842L11.4979 17.1061H7.30116L0 4.51588L2.09836 0.894043L6.29509 0.894043Z" /></svg>
                                        <p>GOODS RECEIVED NOTE</p>
                                    </div>
                                    <div className="xhjksl45s2">
                                        <h1>GRN</h1>
                                        <span><p>GRN No: </p> <h3>{GRNdetail?.grn_no}</h3></span>
                                        <span><p>Bill Date: </p> <h3>{formatDate3(GRNdetail?.transaction_date)}</h3></span>
                                    </div>
                                </div>
                                <br />
                                <GrnItemsDetailTable GRNdetail={GRNdetail} showAllImages={showAllImages} />


                            </div>
                        </div>
                        <MoreInformation sale={GRNdetail?.sale_person} note={GRNdetail?.vendor_note} tc={GRNdetail?.terms_and_condition} section="Vendor" />
                    </div>
                </div>}
            {showComponent && (
                <ImagesCrou
                    showModal={showImagesModal}
                    closeModal={setshowImagesModal}
                    images={imagesVal}
                />
            )}
            <Toaster />
        </>
    )
}

export default GRNApprovalDetail;