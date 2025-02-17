import React, { useEffect, useMemo, useState } from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { formatDate, formatDate3, formatDate4 } from '../../../Helper/DateFormat';
import LoadingText from '../../../../Components/Loaders/LoadingText';
import ResizeFL from '../../../../Components/ExtraButtons/ResizeFL';
import DatePicker from '../../../Common/DatePicker/DatePicker';
import { creditNoteReportAction } from '../../../../Redux/Actions/ReportsActions/DebitCreditReportAction';
import ReportsPrintContent from '../../../Helper/ComponentHelper/PrintAndPDFComponent/ReportsModulPrintAndPDF/ReportsPrintContent';
import { generatePDF } from '../../../Helper/createPDF';
import CommonDebitNote from '../DebitNoteReport/CommonDebitNote';
import MainScreenFreezeLoader from '../../../../Components/Loaders/MainScreenFreezeLoader';
import { financialYear, getCurrencyValue } from '../../../Helper/ComponentHelper/ManageStorage/localStorageUtils';
import useFetchApiData from '../../../Helper/ComponentHelper/useFetchApiData';
import PrintContent from '../../../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent';
import { currencyRateListAction } from '../../../../Redux/Actions/manageCurrencyActions';
import { UserMasterListAction } from '../../../../Redux/Actions/userMasterActions';
import { confirIsCurrencyPDF } from '../../../Helper/ConfirmHelperFunction/ConfirmWithZeroAmount';

const CreditNoteDetailsReport = () => {

    const reportData = useSelector(state => state?.creditReport);
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
        fy: financialYear(),
    }), [searchTrigger]);

    useFetchApiData(creditNoteReportAction, payloadGenerator, [searchTrigger]);

    //print and pdf implementation
    const [loading, setLoading] = useState(false);

    // const handleDownloadPDF = () => {
    //     if (!allData) {
    //         alert("Data is still loading, please try again.");
    //         return;
    //     }
    //     const contentComponent = (
    //         <ReportsPrintContent reportData={reportData} cusVenData={allData?.vendor} masterData="" moduleId={allData?.quotation_id} section="Credit Note Detail" />
    //     );

    //     generatePDF(contentComponent, "Debit_Note_Detail.pdf", setLoading, 500);

    // }



    const rateLoading = useSelector(state => state?.currencyRateList);

    const handleDownloadPDF = async () => {
        try {
            if (!allData?.transaction_date) return;

            // Fetch currency rates for the transaction date
            const res = await dispatch(currencyRateListAction({ date: allData?.transaction_date }));
            const fetchCurrencyData = res?.data?.find(val => val?.code === allData?.currency);

            // Ensure masterData & quotation exist before proceeding
            if (!allData || !masterData) {
                dispatch(UserMasterListAction());
                alert("Data is still loading, please try again.");
                return;
            }

            const generatePDFWithData = (currencyData) => {
                const contentComponent = (
                    <PrintContent
                        data={allData}
                        masterData={masterData}
                        moduleId={allData?.credit_note_id}
                        section="Credit Note"
                        fetchCurrencyData={currencyData}
                    />
                );
                generatePDF(contentComponent, "Credit_Note_Document.pdf", setLoading, 500);
            };

            if (fetchCurrencyData) {
                generatePDFWithData(fetchCurrencyData);
            } else if (allData?.currency === getCurrencyValue()) {
                generatePDFWithData(null); // No conversion needed
            } else {
                // Prompt user to create missing currency
                const res = await confirIsCurrencyPDF(allData?.currency);
                if (res) {
                    Navigate(`/dashboard/manage-currency?date=${allData?.transaction_date}&currency=${allData?.currency}`);
                }
            }
        } catch (error) {
            console.error("Error fetching currency rates:", error);
        }
    };

    return (
        <>
            {(loading || rateLoading?.loading) && <MainScreenFreezeLoader />}

            <div className="maindivofreporstx5w633">
                <div className="reportbarinsx5w">
                    <h1>Credit Note Details</h1>

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
                            From {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate3(reportData?.data?.startDate)}, To {formatDate3(reportData?.data?.endDate)}</>}
                        </div>
                        <div className="ch2xjlokw5456w">
                            <ResizeFL section="reports" />
                        </div>
                    </div>

                    <div className="ch2xjlokw5456w1">
                        {/* <div className="x45wx5w3">Demo Org</div> */}
                        <div className="x45wx5w2"> <h3> Credit Note Details</h3></div>
                        <div className='x45wx5w34'> From  {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate4(reportData?.data?.startDate)}, To {formatDate4(reportData?.data?.endDate)}</>}
                        </div>
                    </div>



                    <CommonDebitNote reportData={reportData} section="customer" />



                </div>
            </div >
        </>
    )
}

export default CreditNoteDetailsReport;
