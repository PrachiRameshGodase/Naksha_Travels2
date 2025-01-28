import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaMapSigns } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GiFallingRocks } from "react-icons/gi";
import CreateItemPopup from '../CreateItemPopup';
import CreateStockPopup from '../CreateStockPopup';
import { GoPlus } from 'react-icons/go';


const WarehouseInformation = ({ warehouseData, itemDetails }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [itemDetailData, setitemDetailData] = useState([]);

    const handleAddStock = (val) => {
        setShowPopup(true);
        setitemDetailData(val);
    }

    return (
        <>
            <div id="middlesection" >
                {/* warehouse */}
                <>
                    <div className="warehouseitemx2w2">
                        <div id="Anotherbox" className='Anotherbox4'>
                            <div id="leftareax12">
                                {/* <span><FaMapSigns /></span> */}

                                <h1 id="firstheading">
                                    Warehouse
                                </h1>
                                <p id="firsttagp">{warehouseData?.total_quantity_by_warehouse?.length} Records</p>
                            </div>
                        </div>
                        <table id="tablex15s56s31s1">
                            <thead className="thaedaksx433">
                                <tr>
                                    <th className="sfdjklsd1xs2w1">#</th>
                                    <th className="sfdjklsd1xs2w2" style={{textAlign:"left",width:"33%"}}>Warehoue Name</th>
                                    <th className="sfdjklsd1xs2w3" style={{textAlign:"left", width: "30%" }}>Quantity</th>
                                    <th className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"9%"}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warehouseData?.total_quantity_by_warehouse?.map((quotation, index) => (
                                    <tr key={index} className="rowsxs15aksx433">
                                        <td className="sfdjklsd1xs2w1">{index + 1}</td>
                                        <td className="sfdjklsd1xs2w2" style={{textAlign:"left",width:"33%"}}>  {quotation?.warehouse?.name}</td>
                                        <td className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"30%"}}>  {quotation?.total_quantity}</td>
                                        <td className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"11%"}}  onClick={() => handleAddStock(quotation)}>
                                            <span className="nodatainrow">
                                                <GoPlus /> Adjust Stock
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>




                {/* zone */}
                <>
                    {/* <div className="warehouseitemx2w2">
                        <div id="Anotherbox" className='Anotherbox4'>
                            <div id="leftareax12">
                                <h1 id="firstheading">
                                   
                                    Zone
                                </h1>
                                <p id="firsttagp">{warehouseData?.total_quantity_by_zone?.length} Records</p>
                            </div>
                        </div>
                        <table id="tablex15s56s31s1">
                            <thead className="thaedaksx433">
                                <tr>
                                    <th className="sfdjklsd1xs2w1">#</th>
                                    <th className="sfdjklsd1xs2w1" style={{textAlign:"left",width:"24%"}}>Zone Name</th>
                                    <th className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"29%"}}>Warehoue</th>
                                    <th className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"20%"}}>Quantity</th>
                                    <th className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"12%"}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warehouseData?.total_quantity_by_zone?.map((quotation, index) => (
                                    <tr key={index} className="rowsxs15aksx433">
                                        <td className="sfdjklsd1xs2w1">{index + 1}</td>
                                        <td className="sfdjklsd1xs2w2" style={{textAlign:"left",width:"24%"}}> {quotation?.zone?.name}</td>
                                        <td className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"29%"}}>  {quotation?.zone?.warehouse?.name}</td>
                                        <td className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"20%"}}>  {quotation?.total_quantity}</td>
                                        <td className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"12%"}} onClick={() => handleAddStock(quotation)}>

                                            <span className="nodatainrow">
                                                <GoPlus /> Adjust Stock
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
                </>




                {/* racks */}

                <>
                    {/* <div className="warehouseitemx2w2">
                        <div id="Anotherbox" className='Anotherbox4'>
                            <div id="leftareax12">
                                <h1 id="firstheading">
                                    
                                    Rack
                                </h1>
                                <p id="firsttagp">{warehouseData?.total_quantity_by_rack?.length} Records</p>
                            </div>
                        </div>
                        <table id="tablex15s56s31s1">
                            <thead className="thaedaksx433">
                                <tr>
                                    <th className="sfdjklsd1xs2w1">#</th>
                                    <th className="sfdjklsd1xs2w2" style={{textAlign:"left",width:"20%"}}>Rack Name</th>
                                    <th className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"18%"}}>Zone Name</th>
                                    <th className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"24%"}}>Warehouse Name</th>
                                    <th className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"14%"}}>Quantity</th>
                                    <th className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"12%"}}>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {warehouseData?.total_quantity_by_rack?.map((quotation, index) => (
                                    <tr key={index} className="rowsxs15aksx433">
                                        <td className="sfdjklsd1xs2w1">{index + 1}</td>
                                        <td className="sfdjklsd1xs2w2" style={{textAlign:"left",width:"20%"}}> {quotation?.rack?.name}</td>
                                        <td className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"18%"}}>  {quotation?.rack?.zone?.name}</td>
                                        <td className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"24%"}}>  {quotation?.rack?.warehouse?.name}</td>
                                        <td className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"12%"}}>  {quotation?.total_quantity} </td>
                                        <td className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"13%"}} onClick={() => handleAddStock(quotation)}>

                                            <span className="nodatainrow">
                                                <GoPlus /> Adjust Stock
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
                </>



                <>
                    {/* <div className="warehouseitemx2w2">
                        <div id="Anotherbox" className='Anotherbox4'>
                            <div id="leftareax12">
                                <h1 id="firstheading">
                                    Bin
                                </h1>
                                <p id="firsttagp">{warehouseData?.total_quantity_by_bin?.length} Records</p>
                            </div>
                        </div>
                        <table id="tablex15s56s31s1">
                            <thead className="thaedaksx433" style={{textAlign:"left"}}>
                                <tr>
                                    <th className="sfdjklsd1xs2w1">#</th>
                                    <th className="sfdjklsd1xs2w2" style={{width:"15%"}}>Bin Name</th>
                                    <th className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"16%"}}>Rack Name</th>
                                    <th className="sfdjklsd1xs2w4"style={{textAlign:"left",width:"14%"}}>Zone Name</th>
                                    <th className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"20%"}}>Warehouse Name</th>
                                    <th className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"16%"}}>Quantity</th>
                                    <th className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"12%"}}>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {warehouseData?.total_quantity_by_bin?.map((quotation, index) => (
                                    <tr key={index} className="rowsxs15aksx433">
                                        <td className="sfdjklsd1xs2w1">{index + 1}</td>
                                        <td className="sfdjklsd1xs2w2" style={{textAlign:"left",width:"15%"}}> {quotation?.bin?.name}</td>
                                        <td className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"16%"}}>  {quotation?.bin?.rack?.name}</td>
                                        <td className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"14%"}}>  {quotation?.bin?.zone?.name}</td>
                                        <td className="sfdjklsd1xs2w4" style={{textAlign:"left",width:"20%"}}>  {quotation?.bin?.warehouse?.name}</td>
                                        <td className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"16%"}}>  {quotation?.total_quantity}</td>
                                        <td className="sfdjklsd1xs2w3" style={{textAlign:"left",width:"14%"}} onClick={() => handleAddStock(quotation)}>

                                            <span className="nodatainrow">
                                                <GoPlus /> Adjust Stock
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
                </>
            </div >

            {showPopup === true ?
                <div className="mainxpopups2">
                    <div className="popup-content02">
                        <CreateStockPopup closePopup={setShowPopup}
                            itemDetailData={itemDetailData}
                            itemDetails={itemDetails}
                        />
                    </div>
                </div> : ""
            }


        </>
    )
}

export default WarehouseInformation