import React, { useEffect } from 'react'
import CustomDropdown12 from '../../../Components/CustomDropdown/CustomDropdown12'
import { otherIcons } from '../SVGIcons/ItemsIcons/Icons'
import { useDispatch, useSelector } from 'react-redux';
import { currencySymbol } from '../HelperFunctions';

const CurrencySelect = ({ disable, style, ...rest }) => {
    const getCurrency = useSelector((state) => state?.getCurrency?.data);
    // console.log("getcurrrrrrrrrrr", getCurrency)
    return (
        <>
            <label>Currency</label>
            <span >
                {otherIcons.currency_icon}
                <CustomDropdown12
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