import React, { useEffect } from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { accountTransactionAction } from '../../../../Redux/Actions/ReportsActions/AccountReportAction';

const AccountTransaction = () => {
    const reportData = useSelector(state => state?.accTran);
    const allData = reportData?.data?.data;
    const accTranId = new URLSearchParams(location.search).get("id");

    const dispatch = useDispatch();

    //load all the api's of reports when this page is fully loaded
    useEffect(() => {
        if (accTranId) {
            dispatch(accountTransactionAction({ account_id: accTranId }));
        }
    }, [dispatch, accTranId]);
    return (
        <>
            <div className="maindivofreporstx5w633">
                <div className="reportbarinsx5w">
                    <h1>Account Transactions</h1>
                    <div className="rightfiltex4w">
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
                        <h4>From 01 Dec 2021 To 31 Dec 2021</h4>
                    </div>

                    <div className="ch2xjlokw5456w">
                        <div className="x45wx5w activexkl5w2">Collapse all</div>
                        <div className="x45wx5w">Expand all</div>
                    </div>
                    <div className="ch2xjlokw5456w1">
                        <div className="x45wx5w1">Anurag Mourya</div>
                        <div className="x45wx5w2"> <h4> Account Transactions</h4></div>
                        <div className="x45wx5w3">Output CGST</div>
                        <div className='x45wx5w34'>From 01 Dec 2021 To 31 Dec 2021</div>
                    </div>

                    <div className='account_report_888'>

                        <div className="ch2xjlokw5456wx321">
                            <div className="tex5w6x6ws xkwls2z1">Date</div>
                            <div className="tex5w6x6ws xkwls2z2">Account</div>
                            <div className="tex5w6x6ws xkwls2z3">Transactions Details</div>
                            <div className="tex5w6x6ws xkwls2z4">Transactins Types</div>
                            <div className="tex5w6x6ws xkwls2z5">Transactins#</div>
                            <div className="tex5w6x6ws xkwls2z6">Refrence#</div>
                            <div className="tex5w6x6ws xkwls2z7">Debit</div>
                            <div className="tex5w6x6ws xkwls2z8">Credit</div>
                            <div className="tex5w6x6ws xkwls2z9">Amount</div>
                        </div>

                        <div className="ch2xjlokw5456wx3211">
                            <div className="tex5w6x6ws xkwls2z1">Date</div>
                            <div className="tex5w6x6ws xkwls2z2">Account</div>
                            <div className="tex5w6x6ws xkwls2z3">Transactions Details</div>
                            <div className="tex5w6x6ws xkwls2z4">Transactins Types</div>
                            <div className="tex5w6x6ws xkwls2z5">Transactins#</div>
                            <div className="tex5w6x6ws xkwls2z6">Refrence#</div>
                            <div className="tex5w6x6ws xkwls2z7">Debit</div>
                            <div className="tex5w6x6ws xkwls2z8">Credit</div>
                            <div className="tex5w6x6ws xkwls2z9">Amount</div>
                        </div>
                        <div className="ch2xjlokw5456wx3211">
                            <div className="tex5w6x6ws xkwls2z1">Date</div>
                            <div className="tex5w6x6ws xkwls2z2">Account</div>
                            <div className="tex5w6x6ws xkwls2z3">Transactions Details</div>
                            <div className="tex5w6x6ws xkwls2z4">Transactins Types</div>
                            <div className="tex5w6x6ws xkwls2z5">Transactins#</div>
                            <div className="tex5w6x6ws xkwls2z6">Refrence#</div>
                            <div className="tex5w6x6ws xkwls2z7">Debit</div>
                            <div className="tex5w6x6ws xkwls2z8">Credit</div>
                            <div className="tex5w6x6ws xkwls2z9">Amount</div>
                        </div>
                        <div className="ch2xjlokw5456wx3211">
                            <div className="tex5w6x6ws xkwls2z1">Date</div>
                            <div className="tex5w6x6ws xkwls2z2">Account</div>
                            <div className="tex5w6x6ws xkwls2z3">Transactions Details</div>
                            <div className="tex5w6x6ws xkwls2z4">Transactins Types</div>
                            <div className="tex5w6x6ws xkwls2z5">Transactins#</div>
                            <div className="tex5w6x6ws xkwls2z6">Refrence#</div>
                            <div className="tex5w6x6ws xkwls2z7">Debit</div>
                            <div className="tex5w6x6ws xkwls2z8">Credit</div>
                            <div className="tex5w6x6ws xkwls2z9">Amount</div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default AccountTransaction;
