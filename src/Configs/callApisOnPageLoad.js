import { billLists } from "../Redux/Actions/billActions";
import { customersList } from "../Redux/Actions/customerActions";
import { expenseLists } from "../Redux/Actions/expenseActions";
import { fetchCurrencies, fetchGetCountries, fetchMasterData, fetchTexRates } from "../Redux/Actions/globalActions";
import { GRNlistActions, GRNreceiptListActions } from "../Redux/Actions/grnActions";
import { itemLists, vendorsLists, quotationLists, saleOrderLists, purchseOrdersLists, debitNoteLists, creditNoteLists, invoiceLists, accountLists } from "../Redux/Actions/listApisActions";
import { paymentRecList } from "../Redux/Actions/PaymentRecAction";
import { binViewAction, rackViewAction, warehouseViewAction, zoneViewAction } from "../Redux/Actions/warehouseActions";
import { sendData } from "../Views/Helper/HelperFunctions";


// list api datas

// console.log("send data")

export const callApisOnPageLoad = (dispatch) => {
    dispatch(itemLists(sendData));
    dispatch(customersList(sendData));
    dispatch(quotationLists(sendData));
    dispatch(saleOrderLists(sendData));
    dispatch(creditNoteLists(sendData));
    dispatch(debitNoteLists(sendData));
    // dispatch(paymentRecList({ ...sendData, inout: 1 }));
    dispatch(purchseOrdersLists(sendData));
    dispatch(vendorsLists(sendData));
    dispatch(GRNlistActions(sendData));
    dispatch(GRNreceiptListActions(sendData));
    dispatch(billLists(sendData));
    dispatch(expenseLists(sendData));
    dispatch(accountLists(sendData));
    dispatch(warehouseViewAction(sendData));
    dispatch(rackViewAction(sendData));
    dispatch(zoneViewAction(sendData));
    dispatch(binViewAction(sendData));

    dispatch(fetchMasterData());
    dispatch(fetchCurrencies());
    dispatch(fetchTexRates());
    dispatch(fetchGetCountries());
}
