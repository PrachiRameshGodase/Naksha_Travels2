import React from 'react'
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';


const CommonCustomerBlance = ({ reportData, section }) => {
    const allData = reportData?.data?.data;


    // for show debit price acc. to customer and vendor
    const showDebit = (data) => {
        const getDebit = section === "customer" ? data?.cust_transactions[0]?.total_debit : section === "vendor" ? data?.
            vendor_transactions[0]?.total_debit : "";

        return parseFloat(getDebit)?.toFixed(2);
    }

    // for show credit price acc. to customer and vendor
    const showCredit = (data) => {
        const getCredit = section === "customer" ? data?.cust_transactions[0]?.total_credit : section === "vendor" ? data?.
            vendor_transactions[0]?.total_credit : "";

        return parseFloat(getCredit)?.toFixed(2);
    }

    // for show reciables and payables price acc. to customer and vendor
    const showRecPay = (data) => {
        const showRecPay = section === "customer" ? data?.total_receivables : section === "vendor" ? data?.total_paybles : "";

        return parseFloat(showRecPay)?.toFixed(2);
    }


    return (
        <div className='sale_by_customer_reports_888'>

            <div className="ch2xjlokw5456wx321">
                <div className="tex5w6x6ws xkwls2z1">{section === "vendor" ? "Vendor " : "Customer "}Name</div>
                <div className="tex5w6x6ws xkwls2z2" ><p className='amt34x3'>Debit</p></div>
                <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>Credit</p></div>
                <div className="tex5w6x6ws  xkwls2z4"><p className='amt34x3'>Balance</p></div>
            </div>

            {reportData?.loading ?
                <TableViewSkeleton />
                :
                <>
                    {allData?.length >= 1 ?
                        <>
                            {allData?.map((data, index) => (


                                <>
                                    <div className="ch2xjlokw5456wx3211" key={index}>
                                        <div className="tex5w6x6ws xkwls2z1">{data?.display_name}</div>

                                        <div className="tex5w6x6ws xkwls2z2"><p className='amt34x3'>{showAmountWithCurrencySymbol(showDebit(data))}</p></div>

                                        <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>{showAmountWithCurrencySymbol(showCredit(data))}</p></div>

                                        <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'>

                                            {(section === "customer" || section === "vendor") && (
                                                <>
                                                    {showAmountWithCurrencySymbol(
                                                        section === "customer"
                                                            ? (parseFloat(showDebit(data)) - parseFloat(showCredit(data))).toFixed(2)
                                                            : (parseFloat(showCredit(data)) - parseFloat(showDebit(data))).toFixed(2)
                                                    )}
                                                </>
                                            )}


                                        </p></div>
                                    </div>
                                </>
                            ))}


                            {/* create a row for show Customr blance */}
                            <div className="ch2xjlokw5456wx3211 bbx123">
                                <div className="tex5w6x6ws xkwls2z1" style={{ width: "" }}>Total Blance</div>
                                <div className="tex5w6x6ws xkwls2z2" style={{ width: "" }}> <p style={{
                                    width: "100%",
                                    textAlign: "right"
                                }}> {showAmountWithCurrencySymbol(parseFloat?.(showRecPay(reportData?.data))?.toFixed(2))}</p></div>
                            </div>


                        </>
                        : (
                            <NoDataFound />
                        )}
                </>
            }
        </div>
    )
}

export default CommonCustomerBlance