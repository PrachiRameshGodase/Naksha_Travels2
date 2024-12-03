import React, { useEffect } from 'react'
import CustomDropdown12 from '../../../Components/CustomDropdown/CustomDropdown12'
import { otherIcons } from '../SVGIcons/ItemsIcons/Icons'
import { useDispatch, useSelector } from 'react-redux';

const CurrencySelect = ({ ...rest }) => {
    const getCurrency = useSelector((state) => state?.getCurrency?.data);

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
                    {...rest}
                />
            </span>
        </>
    )
}

export default CurrencySelect