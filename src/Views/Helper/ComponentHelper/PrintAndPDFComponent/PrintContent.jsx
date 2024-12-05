// PdfTemplate.js
import React, { useState } from 'react';
import './PdfTemplate.scss';
import { activeOrg_details, parseJSONofString, showAmountWithCurrencySymbol, showRateWithPercent } from '../../HelperFunctions';
import { PdfShowMastersValue } from '../../ShowMastersValue';
import { otherIcons } from '../../SVGIcons/ItemsIcons/Icons';
import { currentTime, formatDate3, todayDate } from '../../DateFormat';

const PrintContent = ({ data, cusVenData, masterData, moduleId, section }) => {
    const [showCharges, setShowCharges] = useState(false);
    const active_orgnization = activeOrg_details;

    const calculateTotalTaxAmount = () => {
        return data?.items?.reduce((total, entry) => {
            return total + ((entry?.tax_amount) ? parseFloat(entry?.tax_amount) : 0);
        }, 0);
    };

    const totalExpenseCharges = parseJSONofString(data?.charges);

    // const showModuleText = section==="Quotation"?

    return (
        <div id='pdf_print_container'>
            <h4>Facial Tax {section}</h4>


            {/* Section 1 megamarket module No and date and time */}
            <div className="megamarket_logo_module_no_12_time_date">

                {/* megamarket logo view */}
                <div className="logoofkcs42w5wss">
                    {otherIcons?.megamarket_svg}
                </div>
                {/* megamarket logo view */}

                <div className="module_no">
                    <p>{section} No. : {moduleId}</p>
                    <p>Date. : {todayDate()}</p>
                    <p>Time. : {currentTime()}</p>
                </div>
            </div>
            {/* Section 1 megamarket module No and date and time */}


            {/*Section 2  Contacts*/}
            <div className="contacts_321">
                <p>Tel. : {cusVenData?.work_phone}</p>
                <p>VAT No. : {cusVenData?.gst_no}</p>
                <p>TIN No. : {cusVenData?.tin_no}</p>
                <p>Pick List No. : {cusVenData?.pic_no}</p>
                <p>Due Date. : {formatDate3(data?.due_date)}</p>
            </div>
            {/*Section 2  Contacts*/}


            {/*Section 2  Addresses*/}
            <div className="del_And_Billing_Address">
                <div className="commonquoatjkx55s">
                    <div className="childommonquoatjkx55s">
                        <div className="detailsbox4x15s2">
                            <div className="cjkls5xs1">
                                {section == "Debit Note" ? (
                                    <h1>Deliver Address</h1>
                                ) : (
                                    <h1> Billing Address</h1>
                                )}

                                <p>
                                    <p>
                                        {" "}
                                        <b>{active_orgnization?.name || ""}</b>
                                    </p>

                                    <p>{active_orgnization?.email || ""}</p>

                                    <p>{active_orgnization?.mobile_no || ""}</p>

                                    <p>{active_orgnization?.street2 || ""}</p>

                                    <p>{active_orgnization?.street1 || ""}</p>

                                </p>
                            </div>
                            <div className="cjkls5xs2">
                                {section == "Debit Note" ? (

                                    <h1> Billing Address</h1>
                                ) : (
                                    <h1>Deliver Address</h1>

                                )}
                                <p>
                                    <b> {`${cusVenData?.display_name || ""}`}</b>
                                </p>
                                {cusVenData?.registration_type === "Registered" ? (
                                    <>
                                        <p>VAT Number: {cusVenData?.gst_no || ""}</p>
                                        <p>
                                            Bussiness Leagal Name:{" "}
                                            {cusVenData?.business_leagal_name || "business_leagal_name"}
                                        </p>
                                    </>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* /*Section 3 table print and pdf */}

            <>
                <table id="tablex15s56s31s1">
                    <thead className="thaedaksx433">
                        <tr>
                            <th className="sfdjklsd1xs2w1">#</th>
                            <th className="sfdjklsd1xs2w2" style={{ width: "12%" }}>Item & Description</th>
                            <th className="sfdjklsd1xs2w4 sfdjklsd1xs2wrate">Rate</th>
                            <th className="sfdjklsd1xs2w3 sfdjklsd1xs2w3qty">Qty</th>
                            {/* <th className="sfdjklsd1xs2w3">Unit</th> */}
                            <th className="sfdjklsd1xs2w3 sfdjklsd1xs2w3Width">Tax Rate</th>
                            <th className="sfdjklsd1xs2w5 sfdjklsd1xs2wamount ">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.items?.map((val, index) => (
                            <tr key={index} className="rowsxs15aksx433">
                                <td className="sfdjklsd1xs2w1">{index + 1}</td>
                                <td className="sfdjklsd1xs2w2">{val?.item?.name || ""}</td>
                                <td className="sfdjklsd1xs2w4 sfdjklsd1xs2wrate">{showAmountWithCurrencySymbol(val?.rate)}</td>
                                <td className="sfdjklsd1xs2w3 sfdjklsd1xs2w3qty">{val?.quantity || ""}{"  "}
                                    {val?.unit_id &&
                                        <>
                                            (<PdfShowMastersValue type="2" id={val?.unit_id} masterData={masterData} />)
                                        </>
                                    }

                                </td>
                                {/* <td className="sfdjklsd1xs2w3"><ShowMastersValue type="2" id={val?.unit_id} /></td> */}
                                <td className="sfdjklsd1xs2w3">{showRateWithPercent(val?.tax_rate)}</td>
                                <td className="sfdjklsd1xs2w5 sfdjklsd1xs2wamount" >{showAmountWithCurrencySymbol(val?.final_amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="finalcalculateiosxl44s">
                    <span><p>Subtotal</p> <h5>{showAmountWithCurrencySymbol(data?.subtotal)}</h5></span>
                    <span><p>Total Tax</p> <h5>{showAmountWithCurrencySymbol(calculateTotalTaxAmount())}</h5></span>
                    <span><p>Shipping Charge</p> <h5>{showAmountWithCurrencySymbol(data?.shipping_charge)}</h5></span>
                    <span><p>Adjustment Charge</p> <h5>{showAmountWithCurrencySymbol(data?.adjustment_charge)}</h5></span>

                    {totalExpenseCharges?.length >= 1 && <>
                        <span onClick={() => setShowCharges(!showCharges)} style={{ cursor: "pointer", color: "#408dfb" }}><p>Charges</p> </span>
                        <>
                            {totalExpenseCharges?.map(val => (
                                <span><p>{val?.account_name}</p> <h5>{showAmountWithCurrencySymbol(val?.amount)}</h5></span>
                            ))}
                        </>
                    </>}

                    <span><p>Total</p> <h5>{showAmountWithCurrencySymbol(data?.total)}</h5></span>

                </div>
            </>

            {/* /*Section 3 table print and pdf */}


            {/* /*Section 4 copy stamp */}
            <div className="copy_bottom_footer_98">
                <h1>Copy</h1>
                <div className="" style={{ marginTop: "10px" }}>
                    <h5>I UNDERSIGNED HEREBY ACKNOWLEDGE THAT GOODS WERE RECEIVED IN GOOD ORDER & ACCEPT THAT TERMS AND CONDITIONS AT THE BACK OF THIS INVOICE </h5>
                </div>
                <div className="stamp_remark">
                    <div className="remark">
                        <p>Remarks: {data?.customer?.remarks}</p>
                    </div>
                    <div className="Stamp">
                        <p>Stamp</p>
                    </div>
                </div>
            </div>
            {/* /*Section 4 copy stamp */}




            {/* /*Section 5 main footer boxes */}
            <div className="megamarket_boxes_343">
                <p>Mega Market</p>
                <p>AEF 53543564/AFQ 9244</p>
            </div>
            <div className="megamarket_boxes_343">
                <p>PETROS K</p>
                <p>86656</p>
            </div>

            {/* /*Section 5 main footer boxes */}
        </div>
    );
};

export default PrintContent;
