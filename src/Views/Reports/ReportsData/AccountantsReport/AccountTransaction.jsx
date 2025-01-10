import React, { useEffect, useState } from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { accountTransactionAction } from '../../../../Redux/Actions/ReportsActions/AccountReportAction';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import { formatDate, formatDate3, formatDate4 } from '../../../Helper/DateFormat';
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import ShowMastersValue from '../../../Helper/ShowMastersValue';
import LoadingText from '../../../../Components/Loaders/LoadingText';
import ResizeFL from '../../../../Components/ExtraButtons/ResizeFL';
import DatePicker from '../../../Common/DatePicker/DatePicker';
import CommonAccountTransaction from './CommonAccountTransaction';
import MainScreenFreezeLoader from '../../../../Components/Loaders/MainScreenFreezeLoader';
import ReportsPrintContent from '../../../Helper/ComponentHelper/PrintAndPDFComponent/ReportsModulPrintAndPDF/ReportsPrintContent';
import { generatePDF } from '../../../Helper/createPDF';

const AccountTransaction = () => {
    const reportData = useSelector(state => state?.accTran);
    const allData = reportData?.data?.data;
    const accTranId = new URLSearchParams(location.search).get("id");
    const masterData = useSelector(state => state?.masterData?.masterData);


    const dispatch = useDispatch();
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
    useEffect(() => {
        const sendData = {
            ...(clearFilter === false && {
                ...(specificDate
                    ? {
                        start_date: formatDate(new Date(specificDate)),
                        end_date: formatDate(new Date(specificDate)),
                    }
                    : dateRange[0]?.startDate && dateRange[0]?.endDate && {
                        start_date: formatDate(new Date(dateRange[0].startDate)),
                        end_date: formatDate(new Date(dateRange[0].endDate)),
                    }),
            }),
        };
        if (accTranId) {
            dispatch(accountTransactionAction({ account_id: accTranId, ...sendData }));
        }
    }, [dispatch, accTranId, searchTrigger]);

    //print and pdf implementation
    const [loading, setLoading] = useState(false);
    const handleDownloadPDF = () => {
        if (!allData) {
            alert("Data is still loading, please try again.");
            return;
        }
        const contentComponent = (
            <ReportsPrintContent reportData={reportData} cusVenData={allData?.vendor} masterData={masterData} moduleId={allData?.quotation_id} section="Account Transaction" />
        );
        generatePDF(contentComponent, "Account_Transaction.pdf", setLoading, 500);
    }

    return (
        <>
            {(loading) && <MainScreenFreezeLoader />}

            {/* <ReportsPrintContent reportData={reportData} cusVenData={allData?.vendor} masterData={masterData} moduleId={allData?.quotation_id} section="Account Transaction" /> */}

            <div className="maindivofreporstx5w633">
                <div className="reportbarinsx5w">
                    <h1>Account Transactions</h1>

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
                        <Link className="crossicox45wsx2w3" to={"/dashboard/reports"}>
                            <RxCross2 />
                        </Link>

                    </div>
                </div>

                <div className="xklwefs5d456s">
                    <div className='xklwefs5d456s23'>
                        <div className="xjlokw5456w">
                            <p>Basis: Accrual</p>
                            From  {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate3(reportData?.data?.start_date)}, To {formatDate3(reportData?.data?.end_date)}</>}
                        </div>
                        <div className="ch2xjlokw5456w">
                            <ResizeFL section="reports" />
                        </div>
                    </div>

                    <div className="ch2xjlokw5456w1">
                        <div className="x45wx5w2"> <h3> Account Transactions</h3></div>
                        <div className="x45wx5w3">{reportData?.data?.account_name}</div>
                        <div className='x45wx5w34'> From  {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate4(reportData?.data?.start_date)}, To {formatDate4(reportData?.data?.end_date)}</>}
                        </div>
                    </div>
                    <CommonAccountTransaction reportData={reportData} masterData={masterData} />


                </div>
            </div >
        </>
    )
}

export default AccountTransaction;
