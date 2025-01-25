// PdfTemplate.js
import React, { useState } from 'react';
// import './PdfTemplate.scss';
import { activeOrg_details, showAmountWithCurrencySymbol, showRateWithPercent } from '../../../HelperFunctions';
import { otherIcons } from '../../../SVGIcons/ItemsIcons/Icons';
import { currentTime, formatDate3, todayDate } from '../../../DateFormat';
import CommonItemReport from '../../../../Reports/ReportsData/SaleReport/CommonItemReport';
import CommonPurchasesReport from '../../../../Reports/ReportsData/PurchasesReport/CommonPurchasesReport';
import CommonCustomerBlance from '../../../../Reports/ReportsData/ReceivablesReport/CommonCustomerBlance';
import CommonDebitNote from '../../../../Reports/ReportsData/DebitNoteReport/CommonDebitNote';
import CommonExpense from '../../../../Reports/ReportsData/ExportReport/CommonExpense';
import CommonAccountTransaction from '../../../../Reports/ReportsData/AccountantsReport/CommonAccountTransaction';

const ReportsPrintContent = ({ reportData, cusVenData, masterData, moduleId, section }) => {
    const data = reportData?.data?.data;

    const calculateTotalTaxAmount = () => {
        return data?.items?.reduce((total, entry) => {
            return total + ((entry?.tax_amount) ? parseFloat(entry?.tax_amount) : 0);
        }, 0);
    };

    // console.log("repot data", reportData)

    return (
        <div id='pdf_print_container' className='reports_pdf_print_container'>

            {/* Section 1 megamarket module No and date and time */}
            <h4>Facial Tax {section}</h4>

            {/* Section 1 megamarket module No and date and time */}
            <div className="megamarket_logo_module_no_12_time_date">

                {/* megamarket logo view */}
                <div className="logoofkcs42w5wss">
                    {otherIcons?.megamarket_svg}
                </div>
                {/* megamarket logo view */}

                <div className="module_no" style={{ width: "100%", justifyContent: "center" }}>
                    {/* <p>{section} No. : {moduleId}</p> */}
                    <p>Date From. : {(reportData?.data?.start_date ? formatDate3(reportData?.data?.start_date) : formatDate3(reportData?.data?.startDate))} </p>
                    <p>Date To. : {(reportData?.data?.end_date ? formatDate3(reportData?.data?.end_date) : formatDate3(reportData?.data?.endDate))} </p>
                    <p>Time. : {currentTime()}</p>
                </div>
            </div>

            <div className="maindivofreporstx5w633">

                <div className="xklwefs5d456s">
                    <div className='xklwefs5d456s23'>
                        {/* <div className="xjlokw5456w">
                            <p>Basis: Accrual</p>
                            <h4>
                                From  {data?.loading ? <>Date is <LoadingText /> </> : <> {formatDate3(data?.data?.start_date)}, To {formatDate3(data?.data?.end_date)}</>}
                            </h4>
                        </div> */}

                        {/* <div className="ch2xjlokw5456w">
                            <ResizeFL section="reports" />
                        </div> */}
                    </div>

                    <div className="ch2xjlokw5456w1">
                        {/* <div className="x45wx5w1">Anurag Mourya</div> */}
                        <div className="x45wx5w2"> <h4> {section}</h4></div>
                        {/* <div className="x45wx5w3">Output CGST</div> */}
                        {/* <div className='x45wx5w34'>
                            From  {data?.loading ? <>Date is  <LoadingText /> </> : <> {formatDate3(data?.data?.start_date)}, To {formatDate3(data?.data?.end_date)}</>}
                        </div> */}
                    </div>

                    <div className='sale_by_customer_reports_888'>

                        {section === "Sale By Customer" && <>
                            <div className="ch2xjlokw5456wx321">
                                <div className="tex5w6x6ws xkwls2z1">Name</div>
                                <div className="tex5w6x6ws xkwls2z2">Invoice Count</div>
                                <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>Sales</p></div>
                                <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'>Sales With Tax</p ></div>
                            </div>

                            <>
                                {data?.map((sale, index) => (
                                    <div className="ch2xjlokw5456wx3211" key={index}>
                                        <div className="tex5w6x6ws xkwls2z1">{sale?.display_name}</div>
                                        <div className="tex5w6x6ws xkwls2z2">{sale?.number_of_sales}</div>
                                        <div className="tex5w6x6ws xkwls2z3"><p className='amt34x3'>{showAmountWithCurrencySymbol(sale?.total_amount)}</p></div>
                                        <div className="tex5w6x6ws xkwls2z4"><p className='amt34x3'>{showAmountWithCurrencySymbol(sale?.total_sales_amount)}</p></div>
                                    </div>
                                ))}
                            </>
                        </>}


                        {section === "Sale By Item" &&
                            <>
                                <CommonItemReport reportData={reportData} />
                            </>}
                        {section === "Purchases By Vendor" &&
                            <>
                                <CommonPurchasesReport reportData={reportData} />
                            </>}

                        {(section === "Customer Balance Summary" || section === "Vendor Balance Summary") &&
                            <>
                                <CommonCustomerBlance reportData={reportData} section={(section === "Customer Balance Summary" ? "customer" : vendor)} />
                            </>}

                        {(section === "Debit Note Detail" || section === "Credit Note Detail") &&
                            <>
                                <CommonDebitNote reportData={reportData} section={(section === "Debit Note Detail" ? "vendor" : "customer")} />
                            </>}

                        {section === "Expense Detail" &&
                            <>
                                <CommonExpense reportData={reportData} masterData={masterData} />
                            </>}

                        {section === "Account Transaction" &&
                            <>
                                <CommonAccountTransaction reportData={reportData} masterData={masterData} />
                            </>}

                    </div>

                </div>
            </div>
        </div >
    );
};

export default ReportsPrintContent;
