import React from 'react'
import { showAmountWithCurrencySymbol } from '../../../Helper/HelperFunctions';
import NoDataFound from '../../../../Components/NoDataFound/NoDataFound';


const CommonItemReport = ({ reportData }) => {
    const allData = reportData?.data?.data;

    const total_calculation = reportData?.data?.total_calculation;
    return (
        <>
            <div className="ch2xjlokw5456wx321">
                <div className="tex5w6x6ws xkwls2z1">Item Name</div>
                <div className="tex5w6x6ws xkwls2z2">Quantity Sold</div>
                <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>Avrage Price</p></div>
                <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'>Amount</p ></div>
            </div>
            {
                allData?.length >= 1 ?
                    <>
                        {allData?.map((data, index) => (
                            <div className="ch2xjlokw5456wx3211" key={index}>
                                <div className="tex5w6x6ws xkwls2z1">{data?.item?.name}</div>
                                <div className="tex5w6x6ws xkwls2z2">{data?.quantity_sold}qty</div>
                                <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>{showAmountWithCurrencySymbol(data?.average_price)}</p></div>
                                <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'>{showAmountWithCurrencySymbol(data?.amount)}</p></div>
                            </div>
                        ))}

                        {total_calculation?.map((data, index) => (
                            <div className="ch2xjlokw5456wx3211 bbx123" key={index}>
                                <div className="tex5w6x6ws xkwls2z1"> Total Sold Quantity </div>
                                <div className="tex5w6x6ws xkwls2z2"> {(data?.total_quantity_sold)} qty</div>
                                <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'></p></div>
                                <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'></p></div>
                            </div>
                        ))}

                        {total_calculation?.map((data, index) => (
                            <div className="ch2xjlokw5456wx3211 bbx123" key={index}>
                                <div className="tex5w6x6ws xkwls2z1" style={{ width: "" }}>Total Amount</div>
                                <div className="tex5w6x6ws xkwls2z2" style={{ width: "" }}> <p style={{
                                    width: "100%",
                                    textAlign: "right"
                                }}> {showAmountWithCurrencySymbol(data?.total_amount)}</p></div>
                            </div>
                        ))}
                    </>
                    : (
                        <NoDataFound />
                    )}
        </>
    )
}

export default CommonItemReport