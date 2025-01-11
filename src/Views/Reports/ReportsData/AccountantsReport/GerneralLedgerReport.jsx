import React, { useEffect, useMemo, useState } from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { gernalLedgerAction } from '../../../../Redux/Actions/ReportsActions/AccountReportAction';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import { formatDate, formatDate3, formatDate4 } from '../../../Helper/DateFormat';
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import LoadingText from '../../../../Components/Loaders/LoadingText';
import ResizeFL from '../../../../Components/ExtraButtons/ResizeFL';
import DatePicker from '../../../Common/DatePicker/DatePicker';
import useFetchApiData from '../../../Helper/ComponentHelper/useFetchApiData';
import { generatePDF } from '../../../Helper/createPDF';
import MainScreenFreezeLoader from '../../../../Components/Loaders/MainScreenFreezeLoader';

const GerneralLedgerReport = () => {
    const reportData = useSelector(state => state?.gernalLedger);
    const allData = reportData?.data?.data;
    // console.log("first", allData)
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
    //fetch all data
    const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
        fy: localStorage.getItem('FinancialYear'),
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
    }), [searchTrigger]);

    useFetchApiData(gernalLedgerAction, payloadGenerator, [searchTrigger]);

    //print and pdf implementation
    const [loading, setLoading] = useState(false);

    const handleDownloadPDF = () => {
        if (!allData) {
            alert("Data is still loading, please try again.");
            return;
        }

        const contentComponent = (
            <ReportsPrintContent reportData={reportData} cusVenData={allData?.customer} masterData="" moduleId={allData?.quotation_id} section="General Ledger" />
        );

        generatePDF(contentComponent, "General_Ledger.pdf", setLoading, 500);
    };

    return (
        <>
            {(loading) && <MainScreenFreezeLoader />}

            <div className="maindivofreporstx5w633">
                <div className="reportbarinsx5w">
                    <h1>Gernal Ledger</h1>

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
                            {/* <p>Basis: Accrual</p> */}
                            From  {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate3(reportData?.data?.startDate)}, To {formatDate3(reportData?.data?.endDate)}</>}
                        </div>
                        <div className="ch2xjlokw5456w">
                            <ResizeFL section="reports" />
                        </div>
                    </div>

                    <div className="ch2xjlokw5456w1">
                        <div className="x45wx5w2"> <h3> Gernal Leadger</h3></div>
                        {/* <div className="x45wx5w3">{reportData?.data?.account_name}</div> */}
                        <div className='x45wx5w34'> From  {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate4(reportData?.data?.startDate)}, To {formatDate4(reportData?.data?.endDate)}</>}
                        </div>
                    </div>

                    <div className='account_report_888'>
                        <div className="ch2xjlokw5456wx321">
                            <div className="tex5w6x6ws xkwls2z1">Account</div>
                            <div className="tex5w6x6ws xkwls2z2">Account Code#</div>
                            <div className="tex5w6x6ws xkwls2z3">Account Types</div>


                            <div className="tex5w6x6ws xkwls2z4"> <p style={{
                                width: "100px",
                                textAlign: "right"
                            }}> Debit</p></div>

                            <div className="tex5w6x6ws xkwls2z9"><p style={{
                                width: "100px",
                                textAlign: "right"
                            }}> Credit</p></div>

                        </div>

                        {reportData?.loading ? <TableViewSkeleton /> :
                            <>
                                {
                                    allData?.length >= 1 ?
                                        <>
                                            {allData?.map((val, index) => (
                                                <div className="ch2xjlokw5456wx3211" key={index}>
                                                    {/* <div className="tex5w6x6ws xkwls2z1">{formatDate4(val?.transaction_date)}</div> */}
                                                    <div className="tex5w6x6ws xkwls2z1">{val?.account_name}</div>
                                                    <div className="tex5w6x6ws xkwls2z2">{val?.account_code}</div>
                                                    <div className="tex5w6x6ws xkwls2z3"> {val?.account_type}</div>
                                                    <div className="tex5w6x6ws xkwls2z4"><p style={{ width: "100px", textAlign: "right" }}> {showAmountWithCurrencySymbol(val?.debit)} </p></div>
                                                    <div className="tex5w6x6ws xkwls2z9"><p style={{ width: "100px", textAlign: "right" }}>{showAmountWithCurrencySymbol(val?.credit)}</p></div>
                                                </div>
                                            ))}

                                        </> :
                                        <>
                                            <NoDataFound />
                                        </>
                                }
                            </>

                        }


                    </div>

                </div>
            </div >
        </>
    )
}

export default GerneralLedgerReport;
