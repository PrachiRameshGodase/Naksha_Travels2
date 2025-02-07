import React from 'react'
import ShowMastersValue from '../../../Helper/ShowMastersValue';
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';
import { formatDate3 } from '../../../Helper/DateFormat';
import { useSelector } from 'react-redux';


const CommonExpense = ({ reportData, masterData }) => {
    const allData = reportData?.data?.expense;

    const findUnitNameById = (type, id) => {
        const allMasters = masterData?.filter(type_id => type_id?.type == type);
        const lable = allMasters?.find(unit => unit.labelid == id);
        return lable ? lable.label : '';
    };

    return (
        <div className='account_report_888'>
            <div className="ch2xjlokw5456wx321">
                <div className="tex5w6x6ws xkwls2z1">Status</div>
                <div className="tex5w6x6ws xkwls2z2">Date</div>
                <div className="tex5w6x6ws xkwls2z3">Vendor Name</div>
                <div className="tex5w6x6ws xkwls2z3">Customer Name</div>
                <div className="tex5w6x6ws xkwls2z4">Transaction Type</div>
                {/* <div className="tex5w6x6ws xkwls2z5">Amount</div> */}
                {/* <div className="tex5w6x6ws xkwls2z6">Transactions#</div> */}

                {/* <div className="tex5w6x6ws xkwls2z5"><p style={{
                width: "130px",
                textAlign: "right"
            }}>Amount</p></div> */}

                <div className="tex5w6x6ws xkwls2z9">
                    <p style={{
                        width: "130px",
                        textAlign: "right"
                    }}>Amount</p>
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
                                                            : ""}
                                        </div>
                                        <div className="tex5w6x6ws xkwls2z2">{formatDate3(val?.transaction_date)}</div>

                                        <div className="tex5w6x6ws xkwls2z3">
                                            {val?.vendor?.display_name}
                                        </div>

                                        <div className="tex5w6x6ws xkwls2z3">
                                            {val?.customer?.display_name}
                                        </div>

                                        <div className="tex5w6x6ws xkwls2z4"> {findUnitNameById(11, val?.transaction_type)}</div>

                                        {/* <div className="tex5w6x6ws xkwls2z5">  <ShowMastersValu type="11" id={val?.transaction_type} />  </div> */}
                                        {/* <div className="tex5w6x6ws xkwls2z6">{val?.entity_no}</div> */}

                                        {/* <div className="tex5w6x6ws xkwls2z5"><p style={{ width: "130px", textAlign: "right" }}>{showAmountWithCurrencySymbol(val?.total)}</p></div> */}

                                        <div className="tex5w6x6ws xkwls2z9"><p style={{ width: "130px", textAlign: "right" }}> {showAmountWithCurrencySymbol(val?.amount)} </p></div>
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

export default CommonExpense