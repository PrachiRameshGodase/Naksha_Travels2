import React from 'react'
import { useSelector } from 'react-redux';

const ShowMastersValue = ({ type, id }) => {
    const masterData = useSelector(state => state?.masterData?.masterData);

    const allMasters = masterData?.filter(type_id => type_id?.type == type);

    const findUnitNameById = () => {
        const lable = allMasters?.find(unit => unit.labelid == id);
        return lable ? lable.label : '';
    };
    return (
        <span style={{ border: "none" }} >{findUnitNameById()} </span>
    )
}

export const ShowUserMastersValue = ({ type, id }) => {
    const userMasterData = useSelector(state => state?.userMasterList?.data);

    const allMasters = userMasterData?.filter(type_id => type_id?.type == type);

    const findUnitNameById = () => {
        const lable = allMasters?.find(unit => unit.labelid == id);
        return lable ? lable.label : '';
    };
    return (
        <span style={{ border: "none" }} >{findUnitNameById()} </span>
    )
}

export default ShowMastersValue;

export const PdfShowMastersValue = ({ type, id, masterData }) => {

    const allMasters = masterData?.filter(type_id => type_id?.type == type);

    const findUnitNameById = () => {
        const lable = allMasters?.find(unit => unit.labelid == id);
        return lable ? lable.label : '';
    };
    return (
        <>{findUnitNameById()}</>
    )
}

export const PdfShowUserMastersValue = ({ type, id, masterData }) => {

    const allMasters = masterData?.filter(type_id => type_id?.type == type);

    const findUnitNameById = () => {
        const lable = allMasters?.find(unit => unit.labelid == id);
        return lable ? lable.label : '';
    };
    return (
        <>{findUnitNameById()}</>
    )
}
