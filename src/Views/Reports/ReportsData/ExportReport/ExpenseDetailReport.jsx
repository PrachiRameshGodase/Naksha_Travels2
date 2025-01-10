import React, { useEffect, useState } from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, formatDate3, formatDate4 } from '../../../Helper/DateFormat';
import ResizeFL from '../../../../Components/ExtraButtons/ResizeFL';
import DatePicker from '../../../Common/DatePicker/DatePicker';
import { expeseReportAction } from '../../../../Redux/Actions/ReportsActions/ExpenseReportAction';
import CommonExpense from './CommonExpense';
import MainScreenFreezeLoader from '../../../../Components/Loaders/MainScreenFreezeLoader';
import ReportsPrintContent from '../../../Helper/ComponentHelper/PrintAndPDFComponent/ReportsModulPrintAndPDF/ReportsPrintContent';
import { generatePDF } from '../../../Helper/createPDF';
import LoadingText from '../../../../Components/Loaders/LoadingText';

const ExpenseDetailReport = () => {

    const reportData = useSelector(state => state?.expenseReport);
    const allData = reportData?.data?.expense;
    const masterData = useSelector(state => state?.masterData?.masterData);

    const dispatch = useDispatch();
    const [searchTrigger, setSearchTrigger] = useState(0);

    //date range picker
    const [dateRange, setDateRange] = useState([
        {
            start_date: new Date(),
            end_date: new Date(),
            key: "selection",
        },
    ]);

    const [specificDate, setSpecificDate] = useState(null);
    const [clearFilter, setClearFilter] = useState(true);
    //date range picker


    // pagination....
    const [currentPage, setCurrentPage] = useState(1);
    const resetPageIfNeeded = () => {
        if (currentPage > 1) {
            setCurrentPage(1);
        }
    };

    //load all the api's of reports when this page is fully loaded
    useEffect(() => {
        const sendData = {
            ...(clearFilter === false && {
                ...(specificDate
                    ? {
                        start_date: formatDate(new Date(specificDate)),
                        end_date: formatDate(new Date(specificDate)),
                    }

                    : dateRange[0]?.start_date && dateRange[0]?.end_date && {
                        start_date: formatDate(new Date(dateRange[0].start_date)),
                        end_date: formatDate(new Date(dateRange[0].end_date)),
                    }),
            }),
            fy: 2024,
            start_date: "2024-10-01"
        };
        // if (searchTrigger || !allData) {
        dispatch(expeseReportAction(sendData));
        // }
    }, [dispatch, searchTrigger]);

    //print and pdf implementation
    const [loading, setLoading] = useState(false);
    const handleDownloadPDF = () => {
        if (!allData) {
            alert("Data is still loading, please try again.");
            return;
        }

        const contentComponent = (
            <ReportsPrintContent reportData={reportData} cusVenData={allData?.vendor} masterData={masterData} moduleId={allData?.quotation_id} section="Expense Detail" />
        );

        generatePDF(contentComponent, "Expense_Detail.pdf", setLoading, 500);
    }

    return (
        <>
            {(loading) && <MainScreenFreezeLoader />}

            <div className="maindivofreporstx5w633">
                <div className="reportbarinsx5w">
                    <h1>Expense Details</h1>

                    <div className="rightfiltex4w">
                        <DatePicker
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                            setSpecificDate={setSpecificDate}
                            setClearFilter={setClearFilter}
                            setSearchTrigger={setSearchTrigger}
                            searchTrigger={searchTrigger}
                            resetPageIfNeeded={resetPageIfNeeded}
                        />
                        <div className="xw15sf5w5s6" onClick={() => handleDownloadPDF()}>{otherIcons?.export_svg}Export as PDF</div>

                        <Link className="crossicox45wsx2w3" to={"/dashboard/reports"}>
                            <RxCross2 />
                        </Link>
                    </div>
                </div>

                <div className="xklwefs5d456s">
                    <div className='xklwefs5d456s23'>
                        <div className="xjlokw5456w">
                            <p>Basis: Accrual</p>
                            From {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate3(reportData?.data?.start_date)}, To {formatDate3(reportData?.data?.end_date)}</>}
                        </div>
                        <div className="ch2xjlokw5456w">
                            <ResizeFL section="reports" />
                        </div>
                    </div>

                    <div className="ch2xjlokw5456w1">
                        {/* <div className="x45wx5w3">Demo Org</div> */}
                        <div className="x45wx5w2"> <h3> Expense Details</h3></div>

                        <div className='x45wx5w34'> From  {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate3(reportData?.data?.start_date)}, To {formatDate4(reportData?.data?.end_date)}</>}
                        </div>

                    </div>
                    <CommonExpense reportData={reportData} masterData={masterData} />
                </div>
            </div >
        </>
    )
}

export default ExpenseDetailReport;
