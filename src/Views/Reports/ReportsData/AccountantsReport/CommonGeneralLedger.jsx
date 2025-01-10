import React from 'react'

const CommonGeneralLedger = ({ reportData, masterData }) => {
    const allData = reportData?.data?.data;

    return (
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


        </div>)
}

export default CommonGeneralLedger