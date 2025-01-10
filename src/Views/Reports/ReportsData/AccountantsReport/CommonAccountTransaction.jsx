import React, { useEffect, useState } from 'react'
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';
import { formatDate4 } from '../../../Helper/DateFormat';
import LoadingText from '../../../../Components/Loaders/LoadingText';


const CommonAccountTransaction = ({ reportData, masterData }) => {
    const allData = reportData?.data?.data;

    const findUnitNameById = (type, id) => {
        const allMasters = masterData?.filter(type_id => type_id?.type == type);
        const lable = allMasters?.find(unit => unit.labelid == id);
        return lable ? lable.label : '';
    };

    // state and data of showing total debit and credit amount which is opening and closing balance....
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


            {/* show opening balance at top */}
            <div className="ch2xjlokw5456wx3211 bbx123">
                <div className="tex5w6x6ws xkwls2z1">As on date ({reportData?.loading ? <> <LoadingText /> </> : <> {formatDate4(reportData?.data?.start_date)})</>}</div>
                <div className="tex5w6x6ws xkwls2z2">Opening Balance</div>
                <div className="tex5w6x6ws xkwls2z3"></div>
                <div className="tex5w6x6ws xkwls2z4">  </div>
                <div className="tex5w6x6ws xkwls2z5"></div>
                <div className="tex5w6x6ws xkwls2z6"></div>
                <div className="tex5w6x6ws xkwls2z7"><p style={{ width: "100px", textAlign: "right" }}>{showBalDebit !== null && showAmountWithCurrencySymbol(showBalDebit)}</p></div>
                <div className="tex5w6x6ws xkwls2z9"><p style={{ width: "100px", textAlign: "right" }}> {showBalCredit != null && showAmountWithCurrencySymbol(Math.abs(showBalCredit))} </p></div>
            </div>
            {/* show opening balance at top */}


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
                                        <div className="tex5w6x6ws xkwls2z4">{findUnitNameById(11, val?.transaction_type)}  </div>
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



            {/* show Closing balance at bottom */}
            <div className="ch2xjlokw5456wx3211 bbx123" >
                <div className="tex5w6x6ws xkwls2z1">As on date ({reportData?.loading ? <> <LoadingText /> </> : <> {formatDate4(reportData?.data?.end_date)})</>}</div>
                <div className="tex5w6x6ws xkwls2z2">Closing Balance</div>
                <div className="tex5w6x6ws xkwls2z3"></div>
                <div className="tex5w6x6ws xkwls2z4"></div>
                <div className="tex5w6x6ws xkwls2z5"></div>
                <div className="tex5w6x6ws xkwls2z6"></div>
                <div className="tex5w6x6ws xkwls2z7"><p style={{ width: "100px", textAlign: "right" }}>{showColBalDebit !== null && showAmountWithCurrencySymbol(showColBalDebit)}</p></div>
                <div className="tex5w6x6ws xkwls2z9"><p style={{ width: "100px", textAlign: "right" }}> {showColBalCredit != null && showAmountWithCurrencySymbol(Math.abs(showColBalCredit))} </p></div>
            </div>
            {/* show Closing balance at bottom */}


            {/* show Total debit and credit */}
            <div className="ch2xjlokw5456wx3211 bbx123">
                <div className="tex5w6x6ws xkwls2z1" style={{ width: "36%" }}>Total Debit/Credits as on</div>
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
    )
}

export default CommonAccountTransaction