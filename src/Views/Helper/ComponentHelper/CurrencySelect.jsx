import React from 'react'
import { CustomDropdown012 } from '../../../Components/CustomDropdown/CustomDropdown12'
import { otherIcons } from '../SVGIcons/ItemsIcons/Icons'
import { useSelector } from 'react-redux';
import CustomDropdown26 from '../../../Components/CustomDropdown/CustomDropdown26';
import { CiMoneyBill } from "react-icons/ci";


const CurrencySelect = ({ disable, style, ...rest }) => {
    const getCurrency = useSelector((state) => state?.getCurrency?.data);
    return (
        <>
            <label>Currency</label>
            <span >
                {otherIcons.currency_icon}
                <CustomDropdown26
                    label="Currency Name"
                    name="currency"
                    defaultOption="Select Currency"
                    type="currency"
                    options={getCurrency?.currency}
                    disable={disable}
                    style={style}
                    {...rest}
                />
            </span>
        </>
    )
}

export default CurrencySelect

export const CurrencySelect2 = ({ disable, style, ...rest }) => {
    const getCurrency = useSelector((state) => state?.getCurrency?.data);
    return (
        <>
            <label>Currency</label>
            <span >
                <CiMoneyBill />
                <CustomDropdown012
                    label="Currency Name"
                    name="currency"
                    defaultOption="Select Currency"
                    type="currency"
                    options={getCurrency?.currency}
                    disable={disable}
                    style={style}
                    {...rest}
                />
            </span>
        </>
    )
}