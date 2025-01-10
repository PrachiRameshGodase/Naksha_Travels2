import React from 'react'
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';
import TableViewSkeleton from '../../../../Components/SkeletonLoder/TableViewSkeleton';


const CommonCustomerBlance = ({ reportData, section }) => {
    const allData = reportData?.data?.data;

    return (
        <div className='sale_by_customer_reports_888'>



            <div className="ch2xjlokw5456wx321">
                <div className="tex5w6x6ws xkwls2z1">{section === "vendor" ? "Vendor " : "Customer "}Name</div>
                <div className="tex5w6x6ws xkwls2z2"></div>
                <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>Balance</p></div>
                <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'></p ></div>
            </div>

            {reportData?.loading ?
                <TableViewSkeleton />
                :
                <>
                    {allData?.length >= 1 ?
                        <>
                            {allData?.map((data, index) => (
                                <div className="ch2xjlokw5456wx3211" key={index}>
                                    <div className="tex5w6x6ws xkwls2z1">{data?.display_name}</div>
                                    <div className="tex5w6x6ws xkwls2z2">{data?.number_of_datas}</div>
                                    <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>{showAmountWithCurrencySymbol(data?.balance)}</p></div>
                                    <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'>{showAmountWithCurrencySymbol(data?.total_datas_amount)}</p></div>
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

export default CommonCustomerBlance