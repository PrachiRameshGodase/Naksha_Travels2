import React, { useEffect, useMemo, useState } from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, formatDate3 } from '../../../Helper/DateFormat';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import ResizeFL from '../../../../Components/ExtraButtons/ResizeFL';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';
import { saleByCustomerAction } from '../../../../Redux/Actions/ReportsActions/SaleReportsAction';
import LoadingText from '../../../../Components/Loaders/LoadingText';
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import DatePicker from '../../../Common/DatePicker/DatePicker';
import { generatePDF } from '../../../Helper/createPDF';
import ReportsPrintContent from '../../../Helper/ComponentHelper/PrintAndPDFComponent/ReportsModulPrintAndPDF/ReportsPrintContent';
import MainScreenFreezeLoader from '../../../../Components/Loaders/MainScreenFreezeLoader';
import useFetchApiData from '../../../Helper/ComponentHelper/useFetchApiData';

const SaleByCustomerReports = () => {
    const dispatch = useDispatch();

    const reportData = useSelector(state => state?.sale_by_customer);
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

    //fetch all data
    const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
        fy: localStorage.getItem('FinancialYear'),
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
    }), [searchTrigger]);

    useFetchApiData(saleByCustomerAction, payloadGenerator, [searchTrigger]);


    //print and pdf implementation
    const [loading, setLoading] = useState(false);

    const handleDownloadPDF = () => {
        if (!allData) {
            alert("Data is still loading, please try again.");
            return;
        }

        const contentComponent = (
            <ReportsPrintContent reportData={reportData} cusVenData={allData?.customer} masterData="" moduleId={allData?.quotation_id} section="Sale By Customer" />
        );

        generatePDF(contentComponent, "Sale_By_Customer.pdf", setLoading, 500);
    };

    return (
        <>
            {(loading) && <MainScreenFreezeLoader />}

            {/* <ReportsPrintContent data={allData} cusVenData={allData?.customer} masterData="" moduleId={allData?.quotation_id} section="Sale By Customer" /> */}
            <div className="maindivofreporstx5w633">

                <div className="reportbarinsx5w">
                    <h1>Sale By Customer</h1>
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
                            <h4>
                                From  {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate3(reportData?.data?.start_date)}, To {formatDate3(reportData?.data?.end_date)}</>}
                            </h4>
                        </div>

                        <div className="ch2xjlokw5456w">
                            <ResizeFL section="reports" />
                        </div>
                    </div>

                    <div className="ch2xjlokw5456w1">
                        {/* <div className="x45wx5w1">Anurag Mourya</div> */}
                        <div className="x45wx5w2"> <h4> Sale By Customer</h4></div>
                        {/* <div className="x45wx5w3">Output CGST</div> */}
                        <div className='x45wx5w34'>
                            From  {reportData?.loading ? <> Date is  <LoadingText /> </> : <> {formatDate3(reportData?.data?.start_date)}, To {formatDate3(reportData?.data?.end_date)}</>}
                        </div>
                    </div>

                    <div className='sale_by_customer_reports_888'>

                        <div className="ch2xjlokw5456wx321">
                            <div className="tex5w6x6ws xkwls2z1">Name</div>
                            <div className="tex5w6x6ws xkwls2z2">Invoice Count</div>
                            <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>Sales</p></div>
                            <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'>Sales With Tax</p ></div>
                        </div>

                        {reportData?.loading ?
                            <TableViewSkeleton />
                            :
                            <>
                                {allData?.length >= 1 ?
                                    <>
                                        {allData?.map((sale, index) => (
                                            <div className="ch2xjlokw5456wx3211" key={index}>
                                                <div className="tex5w6x6ws xkwls2z1">{sale?.display_name}</div>
                                                <div className="tex5w6x6ws xkwls2z2">{sale?.number_of_sales}</div>
                                                <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>{showAmountWithCurrencySymbol(sale?.total_amount)}</p></div>
                                                <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'>{showAmountWithCurrencySymbol(sale?.total_sales_amount)}</p></div>
                                            </div>

                                        ))}
                                    </>
                                    : (
                                        <NoDataFound />
                                    )}
                            </>
                        }
                    </div>


                </div>
            </div>
        </>
    )
}

export default SaleByCustomerReports;
