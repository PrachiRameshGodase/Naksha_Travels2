import React, { useEffect, useMemo } from 'react'
import CustomDropdown15 from '../../../Components/CustomDropdown/CustomDropdown15'
import { useSelector } from 'react-redux';
import { GoPlus } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';
import NumericInput from '../NumericInput';
import { sendData } from '../HelperFunctions';
import { accountLists } from '../../../Redux/Actions/listApisActions';
import useFetchApiData from './useFetchApiData';

const ExpenseCharges = ({ formValues }) => {
    const { formData, setFormData } = formValues;

    const itemListState = useSelector(state => state?.accountList);
    const accountList = itemListState?.data?.accounts || [];
    const expensesAccounts = accountList?.filter((val) => val?.account_type === "Expense");

    // calculate total charges
    const calculateTotal = (charges, existingTotal) => {
        const chargesTotal = charges.reduce((acc, charge) => acc + (parseFloat(charge.amount) || 0), 0);
        return (existingTotal || 0) + chargesTotal; // Add charges total to the existing total
    };

    // Add new charge
    const handleItemAdd = () => {
        const newCharges = [...formData.charges, {
            account_id: null,
            amount: null
        }];
        setFormData({
            ...formData,
            charges: newCharges,
            total: calculateTotal(newCharges) // update total
        });
    };

    // Remove charge
    const handleItemRemove = (index) => {
        const newItems = formData.charges?.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            charges: newItems,
            total: calculateTotal(newItems) // update total
        });
    };


    // Handle change for account_id and amount for specific row
    const handleChargesChange = (index, name, value, acc_name) => {
        const updatedCharges = [...formData.charges];
        // Ensure the amount is a valid number or fallback to 0
        const amountValue = name === 'amount' ? (isNaN(Number(value)) || value === '' ? 0 : Number(value)) : value;

        updatedCharges[index] = {
            ...updatedCharges[index],
            [name]: amountValue,
        };

        if (name === "account_id") {
            updatedCharges[index].account_name = acc_name
        }

        // console.log("updatedCharges", updatedCharges)

        // Calculate the new total charges, making sure invalid amounts are excluded
        const totalCharges = updatedCharges.reduce((sum, charge) => sum + (charge.amount || 0), 0);

        setFormData({
            ...formData,
            charges: updatedCharges,
            total_charges: totalCharges,
        });
    };


    const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
        ...sendData
    }), []);
    useFetchApiData(accountLists, payloadGenerator, []);


    return (
        <>
            <div className='itemsectionrows' id='expense_charges_3223'>
                <div className="tableheadertopsxs1">
                    <p className='tablsxs1a1x3'>Charges</p>
                    <p className='tablsxs1a2x3' style={{width:"175px"}}>Price</p>
                </div>

                {formData?.charges?.length >= 1 ? <>
                    {formData?.charges?.map((item, index) => (
                        <div key={index} className="tablerowtopsxs1">
                            <div className="tablsxs1a1x3">
                                <CustomDropdown15
                                    label="Account"
                                    options={expensesAccounts}
                                    value={item.account_id}
                                    onChange={(e, acc_name) => handleChargesChange(index, 'account_id', e.target.value, acc_name)}
                                    name="account_id"
                                    defaultOption="Select An Account"
                                />
                            </div>

                            <div className="tablsxs1a2x3" style={{width:"175px"}}>
                                <NumericInput
                                    value={item?.amount}
                                    onChange={(e) => handleChargesChange(index, 'amount', e.target.value)}
                                />
                            </div>

                            {formData?.charges?.length > 1 && (
                                <button className='removeicoofitemrow' type="button" onClick={() => handleItemRemove(index)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleItemRemove(index);
                                        }
                                    }}
                                >
                                    <RxCross2 />
                                </button>
                            )}
                        </div>
                    ))}
                </> :
                    ""}

                <button id='additembtn45srow' type="button" onClick={handleItemAdd}>
                    Add New Charges<GoPlus />
                </button>
            </div>
        </>
    );
};


export default ExpenseCharges