import React, { useEffect, useState } from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { accountTransactionAction } from '../../../../Redux/Actions/ReportsActions/AccountReportAction';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import { formatDate3, formatDate4 } from '../../../Helper/DateFormat';
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import ShowMastersValue from '../../../Helper/ShowMastersValue';
import LoadingText from '../../../../Components/Loaders/LoadingText';
import ResizeFL from '../../../../Components/ExtraButtons/ResizeFL';
import DatePicker from '../../../Common/DatePicker/DatePicker';

const AccountTransaction = () => {
    const reportData = useSelector(state => state?.accTran);
    const allData = reportData?.data?.data;
    const accTranId = new URLSearchParams(location.search).get("id");

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
                    ? { custom_date: formatDate3(new Date(specificDate)) }
                    : dateRange[0]?.startDate && dateRange[0]?.endDate && {
                        end_date: formatDate3(new Date(dateRange[0].endDate)),
                        start_date: formatDate3(new Date(dateRange[0].startDate)),
                    }),
            }),
        };
        if (accTranId) {
            dispatch(accountTransactionAction({ account_id: accTranId, ...sendData }));
        }
    }, [dispatch, accTranId, searchTrigger]);



    // state and data of showing total debit and credit amount which is opening and closing blance....
    const [showBalDebit, setShowBalDebit] = useState(null);
    const [showBalCredit, setShowBalCredit] = useState(null);

    const [showColBalDebit, setShowColBalDebit] = useState(null);
    const [showColBalCredit, setShowColBalCredit] = useState(null);

    useEffect(() => {
        const openingBalance = +reportData?.data?.opening_balance || 0;
        const closingBalance = +reportData?.data?.closing_balance || 0;

        // Set opening balance
        setShowBalDebit(openingBalance > 0 ? openingBalance : null);
        setShowBalCredit(openingBalance < 0 ? openingBalance : null);

        // Set closing balance
        setShowColBalDebit(closingBalance > 0 ? closingBalance : null);
        setShowColBalCredit(closingBalance < 0 ? closingBalance : null);
    }, [reportData]);

    return (
        <>

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
                        <div className="xw15sf5w5s6">{otherIcons?.print_svg}Print</div>
                        <div className="xw15sf5w5s6">{otherIcons?.export_svg}Export as PDF</div>
                        <Link className="crossicox45wsx2w3" to={"/dashboard/reports"}>
                            <RxCross2 />
                        </Link>
                    </div>
                </div>

                <div className="xklwefs5d456s">

                    <div className="xjlokw5456w">
                        <p>Basis: Accrual</p>
                        From  {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate3(reportData?.data?.start_date)}, To {formatDate3(reportData?.data?.end_date)}</>}
                    </div>

                    <div className="ch2xjlokw5456w">
                        <ResizeFL section="reports" />
                    </div>

                    <div className="ch2xjlokw5456w1">
                        <div className="x45wx5w2"> <h3> Account Transactions</h3></div>
                        <div className="x45wx5w3">{reportData?.data?.account_name}</div>
                        <div className='x45wx5w34'> From  {reportData?.loading ? <>Date is <LoadingText /> </> : <> {formatDate4(reportData?.data?.start_date)}, To {formatDate4(reportData?.data?.end_date)}</>}
                        </div>
                    </div>


                    <div className='account_report_888'>
                        <div className="ch2xjlokw5456wx321">
                            <div className="tex5w6x6ws xkwls2z1">Date</div>
                            <div className="tex5w6x6ws xkwls2z2">Account</div>
                            <div className="tex5w6x6ws xkwls2z3">Transactions Details</div>
                            <div className="tex5w6x6ws xkwls2z4">Transactions Types</div>
                            <div className="tex5w6x6ws xkwls2z5">Transactions#</div>
                            <div className="tex5w6x6ws xkwls2z6">Refrence#</div>

                            <div className="tex5w6x6ws xkwls2z7"> <p style={{
                                width: "100px",
                                textAlign: "right"
                            }}> Debit</p></div>

                            <div className="tex5w6x6ws xkwls2z9"><p style={{
                                width: "100px",
                                textAlign: "right"
                            }}> Credit</p></div>

                        </div>


                        {/* show opening blance at top */}
                        <div className="ch2xjlokw5456wx3211 bbx123">
                            <div className="tex5w6x6ws xkwls2z1">As on date {reportData?.loading ? <> <LoadingText /> </> : <> {formatDate4(reportData?.data?.start_date)}</>}</div>
                            <div className="tex5w6x6ws xkwls2z2">Opening Balance</div>
                            <div className="tex5w6x6ws xkwls2z3"></div>
                            <div className="tex5w6x6ws xkwls2z4">  </div>
                            <div className="tex5w6x6ws xkwls2z5"></div>
                            <div className="tex5w6x6ws xkwls2z6"></div>
                            <div className="tex5w6x6ws xkwls2z7"><p style={{ width: "100px", textAlign: "right" }}>{showBalDebit !== null && showAmountWithCurrencySymbol(showBalDebit)}</p></div>
                            <div className="tex5w6x6ws xkwls2z9"><p style={{ width: "100px", textAlign: "right" }}> {showBalCredit != null && showAmountWithCurrencySymbol(Math.abs(showBalCredit))} </p></div>
                        </div>
                        {/* show opening blance at top */}


                        {reportData?.loading ? <TableViewSkeleton /> :
                            <>
                                {
                                    allData?.length >= 1 ?
                                        <>
                                            {allData?.map((val, index) => (
                                                <div className="ch2xjlokw5456wx3211" key={index}>
                                                    <div className="tex5w6x6ws xkwls2z1">{formatDate4(val?.transaction_date)}</div>
                                                    <div className="tex5w6x6ws xkwls2z2">{reportData?.data?.account_name}</div>
                                                    <div className="tex5w6x6ws xkwls2z3">{val?.vendor ? val?.vendor?.display_name : val?.customer?.display_name}</div>
                                                    <div className="tex5w6x6ws xkwls2z4">  <ShowMastersValue type="11" id={val?.transaction_type} />  </div>
                                                    <div className="tex5w6x6ws xkwls2z5">{val?.entity_no}</div>
                                                    <div className="tex5w6x6ws xkwls2z6"></div>
                                                    <div className="tex5w6x6ws xkwls2z7"><p style={{ width: "100px", textAlign: "right" }}> {showAmountWithCurrencySymbol(val?.debit)} </p></div>
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



                        {/* show Closing blance at bottom */}
                        <div className="ch2xjlokw5456wx3211 bbx123" >
                            <div className="tex5w6x6ws xkwls2z1">As on date {reportData?.loading ? <> <LoadingText /> </> : <> {formatDate4(reportData?.data?.end_date)}</>}</div>
                            <div className="tex5w6x6ws xkwls2z2">Closing Balance</div>
                            <div className="tex5w6x6ws xkwls2z3"></div>
                            <div className="tex5w6x6ws xkwls2z4">  </div>
                            <div className="tex5w6x6ws xkwls2z5"></div>
                            <div className="tex5w6x6ws xkwls2z6"></div>
                            <div className="tex5w6x6ws xkwls2z7"><p style={{ width: "100px", textAlign: "right" }}>{showColBalDebit !== null && showAmountWithCurrencySymbol(showColBalDebit)}</p></div>
                            <div className="tex5w6x6ws xkwls2z9"><p style={{ width: "100px", textAlign: "right" }}> {showColBalCredit != null && showAmountWithCurrencySymbol(Math.abs(showColBalCredit))} </p></div>
                        </div>
                        {/* show Closing blance at bottom */}


                        {/* show Total debit and credit */}
                        <div className="ch2xjlokw5456wx3211 bbx123">
                            <div className="tex5w6x6ws xkwls2z1" style={{ width: "40%" }}>Total Debit and Credits </div>
                            <div className="tex5w6x6ws xkwls2z5">({reportData?.loading ? <> <LoadingText /> </> : <> {formatDate4(reportData?.data?.start_date)}</>} / {reportData?.loading ? <> <LoadingText /> </> : <> {formatDate4(reportData?.data?.end_date)}</>})</div>
                            <div className="tex5w6x6ws xkwls2z6"></div>
                            <div className="tex5w6x6ws xkwls2z6"></div>
                            <div className="tex5w6x6ws xkwls2z6"></div>
                            <div className="tex5w6x6ws xkwls2z6"></div>
                            <div className="tex5w6x6ws xkwls2z7"><p style={{ width: "100px", textAlign: "right" }}>{showAmountWithCurrencySymbol(reportData?.data?.total_debit)}</p></div>
                            <div className="tex5w6x6ws xkwls2z9"><p style={{ width: "100px", textAlign: "right" }}> {showAmountWithCurrencySymbol(reportData?.data?.total_credit)} </p></div>
                        </div>
                        {/* show Total debit and credit */}
                    </div>

                </div>
            </div >
        </>
    )
}

export default AccountTransaction;
