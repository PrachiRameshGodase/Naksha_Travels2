import React from 'react'
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';
import { formatDate3 } from '../../../Helper/DateFormat';


const CommonDebitNote = ({ reportData, section }) => {
    const allData = reportData?.data?.data;
    return (
        <div className='account_report_888'>
            <div className="ch2xjlokw5456wx321">
                <div className="tex5w6x6ws xkwls2z1">Status</div>
                <div className="tex5w6x6ws xkwls2z2">Date</div>
                <div className="tex5w6x6ws xkwls2z3">{section === "vendor" ? "Vendor " : "Customer "} Name</div>
                <div className="tex5w6x6ws xkwls2z4">{section === "vendor" ? "Debit " : "Credit "} Note#</div>

                <div className="tex5w6x6ws xkwls2z5"><p style={{
                    width: "130px",
                    textAlign: "right"
                }}> Balance Amount</p></div>

                <div className="tex5w6x6ws xkwls2z9">
                    <p style={{
                        width: "130px",
                        textAlign: "right"
                    }}> {section === "vendor" ? "Debit " : "Credit "} Note Amount</p>
                </div>

            </div>

            {reportData?.loading ? <TableViewSkeleton /> :
                <>
                    {
                        allData?.length >= 1 ?
                            <>
                                {allData?.map((val, index) => (
                                    <div className="ch2xjlokw5456wx3211" key={index}>
                                        <div className="tex5w6x6ws xkwls2z1"> {val?.status == "1"
                                            ? "Approved"
                                            : val?.status == "2"
                                                ? "Rejected"
                                                : val?.status == "3"
                                                    ? "Sent"
                                                    : val?.status == "0"
                                                        ? "Draft"
                                                        : val?.status == "4"
                                                            ? "Close"
                                                            : ""}</div>
                                        <div className="tex5w6x6ws xkwls2z2">{formatDate3(val?.transaction_date)}</div>
                                        <div className="tex5w6x6ws xkwls2z3">{val?.display_name == "0" ? "" : val?.display_name}</div>
                                        <div className="tex5w6x6ws xkwls2z4">{section === "vendor" ? (val?.debit_note_id) : (val?.credit_note_id)}</div>
                                        <div className="tex5w6x6ws xkwls2z5"><p style={{ width: "130px", textAlign: "right" }}>{showAmountWithCurrencySymbol(val?.total)}</p></div>
                                        <div className="tex5w6x6ws xkwls2z9"><p style={{ width: "130px", textAlign: "right" }}> {showAmountWithCurrencySymbol(val?.total)} </p></div>
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
    )
}

export default CommonDebitNote