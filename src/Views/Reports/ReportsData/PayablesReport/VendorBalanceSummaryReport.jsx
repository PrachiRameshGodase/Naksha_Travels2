import React, { useEffect, useState } from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, formatDate3 } from '../../../Helper/DateFormat';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import ResizeFL from '../../../../Components/ExtraButtons/ResizeFL';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';
import LoadingText from '../../../../Components/Loaders/LoadingText';
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import DatePicker from '../../../Common/DatePicker/DatePicker';
import { vendorSummaryReportAction } from '../../../../Redux/Actions/ReportsActions/PayablesReportAction';
import CommonCustomerBlance from '../ReceivablesReport/CommonCustomerBlance';
import MainScreenFreezeLoader from '../../../../Components/Loaders/MainScreenFreezeLoader';
import ReportsPrintContent from '../../../Helper/ComponentHelper/PrintAndPDFComponent/ReportsModulPrintAndPDF/ReportsPrintContent';
import { generatePDF } from '../../../Helper/createPDF';


const VendorBalanceSummaryReport = () => {
    const dispatch = useDispatch();

    const reportData = useSelector(state => state?.vendorSummaryReport);
    const allData = reportData?.data?.data;

    const [searchTrigger, setSearchTrigger] = useState(0);

    //date range picker
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
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
    const fetchReports = () => {
        try {
            const sendData = {
                ...(clearFilter === false && {
                    ...(specificDate
                        ? {
                            startDate: formatDate(new Date(specificDate)),
                            endDate: formatDate(new Date(specificDate)),
                        }
                        : dateRange[0]?.startDate && dateRange[0]?.endDate && {
                            startDate: formatDate(new Date(dateRange[0].startDate)),
                            endDate: formatDate(new Date(dateRange[0].endDate)),
                        }),
                }),
            };

            dispatch(vendorSummaryReportAction(sendData));
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    }

    useEffect(() => {
        if (searchTrigger || !allData) {
            fetchReports();
        }
    }, [searchTrigger]);

    //print and pdf implementation
    const [loading, setLoading] = useState(false);
    const handleDownloadPDF = () => {
        if (!allData) {
            alert("Data is still loading, please try again.");
            return;
        }

        const contentComponent = (
            <ReportsPrintContent reportData={reportData} cusVenData={allData?.vendor} masterData="" moduleId={allData?.quotation_id} section="Vendor Balance Summary" />
        );

        generatePDF(contentComponent, "Vendor_Balance_Summary.pdf", setLoading, 500);
    }
    return (
        <>
            {(loading) && <MainScreenFreezeLoader />}

            <div className="maindivofreporstx5w633">
                <div className="reportbarinsx5w">
                    <h1>Vendor Balances</h1>

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
                        <div className="xw15sf5w5s6" onClick={() => handleDownloadPDF()}>{otherIcons?.print_svg}Print</div>
                        <div className="xw15sf5w5s6">{otherIcons?.export_svg}Export as PDF</div>
                        <Link className="crossicox45wsx2w3" to={"/dashboard/reports"}>
                            <RxCross2 />
                        </Link>
                    </div>

                </div>

                <div className="xklwefs5d456s">

                    <div className='xklwefs5d456s23'>

                        <div className="xjlokw5456w">
                            <p>Basis: Accrual</p>
                            <h4>
                                From  {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate3(reportData?.data?.startDate)}, To {formatDate3(reportData?.data?.endDate)}</>}
                            </h4>
                        </div>

                        <div className="ch2xjlokw5456w">
                            <ResizeFL section="reports" />
                        </div>

                    </div>

                    <div className="ch2xjlokw5456w1">
                        <div className="x45wx5w2"> <h4> Vendor Balances</h4></div>
                        <div className="x45wx5w1">{reportData?.data?.account_name}</div>
                        <div className='x45wx5w34'>
                            From  {reportData?.loading ? <>Date is  <LoadingText /> </> : <> {formatDate3(reportData?.data?.startDate)}, To {formatDate3(reportData?.data?.endDate)}</>}
                        </div>
                    </div>

                    <>
                        <CommonCustomerBlance reportData={reportData} section="vendor" />
                    </>

                </div>
            </div>
        </>
    )
}

export default VendorBalanceSummaryReport;
