import React, { useEffect, useMemo, useState } from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, formatDate3 } from '../../../Helper/DateFormat';
import ResizeFL from '../../../../Components/ExtraButtons/ResizeFL';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';
import { saleByItemAction } from '../../../../Redux/Actions/ReportsActions/SaleReportsAction';
import LoadingText from '../../../../Components/Loaders/LoadingText';
import DatePicker from '../../../Common/DatePicker/DatePicker';
import ReportsPrintContent from '../../../Helper/ComponentHelper/PrintAndPDFComponent/ReportsModulPrintAndPDF/ReportsPrintContent';
import MainScreenFreezeLoader from '../../../../Components/Loaders/MainScreenFreezeLoader';
import CommonItemReport from './CommonItemReport';
import { generatePDF } from '../../../Helper/createPDF';
import useFetchApiData from '../../../Helper/ComponentHelper/useFetchApiData';

const SaleByItemReport = () => {
    const dispatch = useDispatch();

    const reportData = useSelector(state => state?.sale_by_item);
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

    useFetchApiData(saleByItemAction, payloadGenerator, [searchTrigger]);


    const [loading, setLoading] = useState(false);

    const handleDownloadPDF = () => {
        if (!allData) {
            alert("Data is still loading, please try again.");
            return;
        }
        const contentComponent = (
            <ReportsPrintContent reportData={reportData} cusVenData={allData?.customer} masterData="" moduleId={allData?.quotation_id} section="Sale By Item" />
        );
        generatePDF(contentComponent, "Sale_By_Item.pdf", setLoading, 500);
    };
    return (
        <>
            {(loading) && <MainScreenFreezeLoader />}
            {/* <ReportsPrintContent reportData={reportData} cusVenData={allData?.customer} masterData="" moduleId={allData?.quotation_id} section="Sale By Item" /> */}

            <div className="maindivofreporstx5w633">
                <div className="reportbarinsx5w">
                    <h1>Sale By Item</h1>
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
                        <div className="x45wx5w2"> <h4> Sale By Item</h4></div>
                        {/* <div className="x45wx5w3">Demo Org</div> */}
                        <div className='x45wx5w34'>
                            From  {reportData?.loading ? <> Date is  <LoadingText /> </> : <> {formatDate3(reportData?.data?.start_date)}, To {formatDate3(reportData?.data?.end_date)}</>}
                        </div>
                    </div>

                    <div className='sale_by_customer_reports_888'>

                        {reportData?.loading ?
                            <TableViewSkeleton />
                            :
                            <>
                                <CommonItemReport reportData={reportData} />
                            </>
                        }
                    </div>


                </div>
            </div>
        </>
    )
}

export default SaleByItemReport;
