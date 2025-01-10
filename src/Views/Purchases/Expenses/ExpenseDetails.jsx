import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Loader02 from "../../../Components/Loaders/Loader02";
import { Toaster } from 'react-hot-toast';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import useOutsideClick from '../../Helper/PopupData';
import { useReactToPrint } from 'react-to-print';
import { deleteExpenses, expensesDetails, expensesStatus } from '../../../Redux/Actions/expenseActions';
import { InsideExpenseDetailsBox } from '../../Items/InsideItemDetailsBox';
import { ShowDropdownContent1 } from '../../Common/InsideSubModulesCommon/DetailInfo';

const ExpenseDetails = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownx1, setShowDropdownx1] = useState(false);
    const dropdownRef2 = useRef(null);


    const expenseDetails = useSelector(state => state?.expenseDetail);
    const expenseDetail = expenseDetails?.data?.expense;
    const quoteStatus = useSelector(state => state?.quoteStatus);
    const expenseDelete = useSelector(state => state?.expenseDelete);
    // const quotation = expenseDetails?.data?.data?.quotation;
    // console.log("expenseDetail", expenseDetail)
    const dropdownRef = useRef(null);
    const dropdownRef1 = useRef(null);

    useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));
    useOutsideClick(dropdownRef, () => setShowDropdown(false));
    useOutsideClick(dropdownRef2, () => setShowDropdown(false));

    const UrlId = new URLSearchParams(location.search).get("id");

    const handleEditThing = (val) => {
        const queryParams = new URLSearchParams();
        queryParams.set("id", UrlId);

        if (val === "quotationToSale") {
            queryParams.set("convert", "quotationToSale");
            Navigate(`/dashboard/create-sales-orders?${queryParams.toString()}`);

        } else if (val === "toInvoice") {
            queryParams.set("convert", "toInvoice");
            Navigate(`/dashboard/create-invoice?${queryParams.toString()}`);

        } else if (val === "edit") {
            queryParams.set("edit", true);
            Navigate(`/dashboard/create-expenses?${queryParams.toString()}`);
        } else if (val === "duplicate") {
            queryParams.set("duplicate", true);
            Navigate(`/dashboard/create-expenses?${queryParams.toString()}`);

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
                default:
            }


            if (statusVal === "delete") {
                dispatch(deleteExpenses(sendData, Navigate));
            } else {
                dispatch(expensesStatus(sendData)).then(() => {
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
                fy: localStorage.getItem('FinancialYear'),
                warehouse_id: localStorage.getItem('selectedWarehouseId'),
            };
            dispatch(expensesDetails(queryParams));
        }
    }, [dispatch, UrlId, callApi]);

    // const totalFinalAmount = quotation?.items?.reduce((acc, item) => acc + parseFloat(item?.final_amount), 0);

    // const generatePDF = () => {
    //     const input = document.getElementById('quotation-content');
    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, 'PNG', 0, 0);
    //         pdf.save('quotation.pdf');
    //     });
    // };

    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <>
            {quoteStatus?.loading && <MainScreenFreezeLoader />}
            {expenseDelete?.loading && <MainScreenFreezeLoader />}
            {expenseDetails?.loading ? <Loader02 /> :
                <div id='quotation-content' ref={componentRef} >
                    <div id="Anotherbox" className='formsectionx1'>
                        <div id="leftareax12">
                            <h1 id="firstheading">Expense Details</h1>
                        </div>
                        <div id="buttonsdata">

                            <div className="mainx1" onClick={() => handleEditThing("edit")}>
                                <img src="/Icons/pen-clip.svg" alt="" />
                                <p>Edit</p>
                            </div>

                            {/* <div onClick={() => setShowDropdownx1(!showDropdownx1)} className="mainx1" ref={dropdownRef1}>
                                <p>PDF/Print</p>
                                {otherIcons?.arrow_svg}
                                {showDropdownx1 && (
                                    <div className="dropdownmenucustom">
                                        <div className='dmncstomx1 primarycolortext' onClick={() => generatePDF(invoice?.items)}>
                                            {otherIcons?.pdf_svg}
                                            PDF</div>
                                        <div className='dmncstomx1 primarycolortext' onClick={handlePrint}>
                                            {otherIcons?.print_svg}
                                            Print</div>

                                    </div>
                                )}
                            </div> */}

                            <div className="sepc15s63x63"></div>
                            {expenseDetail?.status != "1" &&
                                <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef2}>
                                    <img src="/Icons/menu-dots-vertical.svg" alt="" data-tooltip-id="my-tooltip" data-tooltip-content="More Options" data-tooltip-place='bottom' />
                                    {showDropdown && (
                                        <ShowDropdownContent1 quotation={expenseDetail} changeStatus={changeStatus} />
                                    )}

                                </div>
                            }
                            <Link to={"/dashboard/expenses"} className="linkx3">
                                <RxCross2 />
                            </Link>
                        </div>

                    </div>

                    <div className="listsectionsgrheigh">

                        <div id="item-details">
                            <InsideExpenseDetailsBox itemDetails={expenseDetails?.data?.expense} />
                        </div>
                    </div>

                </div>}
            <Toaster />
        </>
    )
}

export default ExpenseDetails;
