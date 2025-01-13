import React, { useEffect } from 'react'
import CustomDropdown12, { CustomDropdown012 } from '../../../Components/CustomDropdown/CustomDropdown12'
import { otherIcons } from '../SVGIcons/ItemsIcons/Icons'
import { useDispatch, useSelector } from 'react-redux';
import { currencySymbol } from '../HelperFunctions';
import CustomDropdown26 from '../../../Components/CustomDropdown/CustomDropdown26';

const CurrencySelect = ({ disable, style, ...rest }) => {
    const getCurrency = useSelector((state) => state?.getCurrency?.data);
    // console.log("getcurrrrrrrrrrr", getCurrency)
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
                {otherIcons.main_currency_icon}
                <CustomDropdown012
                    label="Currency Name"
                    name="currency"
                    defaultOption="Select Currency"
                    type="currency2"
                    options={getCurrency?.currency}
                    disable={disable}
                    style={style}
                    {...rest}
                />
            </span>
        </>
    )
}