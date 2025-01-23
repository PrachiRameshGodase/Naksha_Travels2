// import { billLists } from "../Redux/Actions/billActions";
// import { customersList } from "../Redux/Actions/customerActions";
// import { expenseLists } from "../Redux/Actions/expenseActions";
import { useCallback } from "react";
import { fetchCurrencies, fetchGetCountries, fetchMasterData, fetchTexRates } from "../Redux/Actions/globalActions";
// import { GRNlistActions, GRNreceiptListActions } from "../Redux/Actions/grnActions";
// import { itemLists, vendorsLists, quotationLists, saleOrderLists, purchseOrdersLists, debitNoteLists, creditNoteLists, accountLists, categoryList } from "../Redux/Actions/listApisActions";
// import { orgListAction } from "../Redux/Actions/OrgnizationActions";
// import { binViewAction, rackViewAction, warehouseViewAction, zoneViewAction } from "../Redux/Actions/warehouseActions";
// import { sendData } from "../Views/Helper/HelperFunctions";

// list api datas
import { useDispatch } from "react-redux";
import { UserMasterListAction } from "../Redux/Actions/userMasterActions";

const useFetchOnMount = () => {
    const dispatch = useDispatch();
    const callApisOnPageLoad = useCallback(async () => {
        // dispatch(itemLists(sendData));
        // dispatch(customersList(sendData));
        // dispatch(quotationLists(sendData));
        // dispatch(saleOrderLists(sendData));
        // dispatch(creditNoteLists(sendData));
        // dispatch(debitNoteLists(sendData));
        // dispatch(paymentRecList({ ...sendData, inout: 1 }));
        // dispatch(purchseOrdersLists(sendData));
        // dispatch(vendorsLists(sendData));
        // dispatch(GRNlistActions(sendData));
        // dispatch(GRNreceiptListActions(sendData));
        // dispatch(billLists(sendData));
        // dispatch(expenseLists(sendData));
        // dispatch(accountLists(sendData));
        // dispatch(warehouseViewAction(sendData));
        // dispatch(rackViewAction(sendData));
        // dispatch(zoneViewAction(sendData));
        // dispatch(binViewAction(sendData));

        dispatch(fetchMasterData());
        dispatch(UserMasterListAction())
        dispatch(fetchCurrencies());
        dispatch(fetchTexRates());
        dispatch(fetchGetCountries());
    }, []);
    return callApisOnPageLoad;
};

export default useFetchOnMount;

