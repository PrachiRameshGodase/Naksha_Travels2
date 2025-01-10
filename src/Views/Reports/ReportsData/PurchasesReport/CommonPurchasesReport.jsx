import React from 'react'
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';


const CommonPurchasesReport = ({ reportData }) => {
    const allData = reportData?.data?.data;

    return (
        <div className='sale_by_customer_reports_888'>



            <div className="ch2xjlokw5456wx321">
                <div className="tex5w6x6ws xkwls2z1">Name</div>
                <div className="tex5w6x6ws xkwls2z2">Purchases Count</div>
                <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>Purchases</p></div>
                <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'>Amount</p ></div>
            </div>

            {reportData?.loading ?
                <TableViewSkeleton />
                :
                <>
                    {allData?.length >= 1 ?
                        <>
                            {allData?.map((sale, index) => (
                                <div className="ch2xjlokw5456wx3211" key={index}>
                                    <div className="tex5w6x6ws xkwls2z1">{sale?.display_name == 0 ? "" : sale?.display_name}</div>
                                    <div className="tex5w6x6ws xkwls2z2">{sale?.number_of_purchases}</div>
                                    <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>{showAmountWithCurrencySymbol(sale?.total_purchase_amount)}</p></div>
                                    <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'>{showAmountWithCurrencySymbol(sale?.total_amount)}</p></div>
                                </div>

                            ))}
                        </>
                        : (
                            <NoDataFound />
                        )}
                </>
            }
        </div>
    )
}

export default CommonPurchasesReport