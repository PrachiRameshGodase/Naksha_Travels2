import { combineReducers } from "redux";
import {
  accountListReducer,
  categoryListReducer,
  creditNoteListReducer,
  customListReducer,
  debitNoteListReducer,
  invoiceListReducer,
  itemListReducer,
  journalListReducer,
  purchseListReducer,
  quoatationListReducer,
  saleOrderListReducer,
  vendorListReducer,
} from "./listApisReducers";
import {
  activeInactiveItemReducer,
  addItemsReducer,
  itemActivityReducer,
  itemDeleteReducer,
  itemExportReducer,
  itemImportReducer,
  itemsDetailReducer,
  itemStockeducer,
  stockItemsReducer,
} from "./itemsReducers";
import {
  masterDataReducer,
  countriesDataReducer,
  citiesDataReducer,
  stateDataReducer,
  createCustomReducer,
  getCurrencyReducer,
  getTaxRateReducer,
  updateAddressReducer,
  expenseHeadListReducer,
  autoGenerateIdReducer,
  autoGenerateIdListReducer,
} from "./globalReducers";
import {
  categoryStatusReducer,
  createCategoryReducer,
  deleteCategoryReducer,
  subCategoryListReducer,
} from "./categoryReducers";
import {
  createCustomerReducer,
  customerDeleteReducer,
  customerListReducer,
  customerStatusReducer,
  viewCustomerReducer,
} from "./customerReducers";
import {
  quotationDeleteReducer,
  quotationDetailReducer,
  quotationSendReducer,
  quotationStatusReducer,
  quotationUpdateReducer,
} from "./quotationReducers";
import {
  saleOrderDeleteReducer,
  saleOrderDetailReducer,
  saleOrderSendReducer,
  saleOrderStatusReducer,
} from "./saleOrderReducers";
import {
  invoiceDeleteReducer,
  invoiceDetailReducer,
  invoiceMailSendReducer,
  invoicePendingReducer,
  invoiceSendReducer,
  invoiceStatusReducer,
} from "./invoiceReducers";
import {
  creditNoteCreateReducers,
  creditNoteDeleteReducer,
  creditNoteDetailReducer,
  creditNoteStatusReducer,
  debitNoteDeleteReducer,
  debitNoteDetailReducer,
  debitNoteStatusReducer,
} from "./noteReducers";
import {
  vendorCreateReducer,
  vendorDeleteReducer,
  vendorStatusReducer,
  vendorViewReducer,
} from "./vendorReducers";
import {
  JournalDetailReducer,
  accountDeleteReducer,
  accountDetailsReducer,
  accountStatusReducer,
  accountTypeReducer,
  createAccountReducer,
  journalsReducer,
} from "./accountReducers";
import {
  createPaymentReducer,
  paymentDeleteReducer,
  paymentDetailReducer,
  paymentListReducer,
  paymentStatusReducer,
} from "./paymentReducers";
import {
  billDeleteReducer,
  billDetailReducer,
  billListReducer,
  billSendReducer,
  billStatusReducer,
  pendingBillReducer,
} from "./billReducers";
import {
  createPurchasesReducer,
  purchasesDeleteReducer,
  purchasesDetailsReducer,
  purchasesSendReducer,
  purchasesStatusReducer,
} from "./purchasesReducers";
import {
  expenseCreateReducer,
  expenseDeleteReducer,
  expenseDetailReducer,
  expenseListReducer,
} from "./expenseReducers";
import {
  createGRNreducer,
  GRNdeleteReducer,
  GRNdetailsReducer,
  GRNrecepitDetailReducer,
  GRNrecepitListReducer,
  GRNrecepitMoveItemReducer,
  GRNstatusReducer,
  listGRNreducer,
} from "./grnReducers";
import {
  binCreateReducer,
  binDetailsReducer,
  binStatusReducer,
  binViewReducer,
  rackCreateReducer,
  rackDetailsReducer,
  rackStatusReducer,
  rackViewReducer,
  warehouseCreateReducer,
  warehouseDetailReducer,
  warehouseStatusReducer,
  warehouseViewReducer,
  zoneCreateReducer,
  zoneDetailsReducer,
  zoneStatusReducer,
  zoneViewReducer,
} from "./warehouseReducers";
import {
  manufacturingCreateStockApprovalReducers,
  requisitionApprovalListReducer,
  requisitionDetailReducer,
  requisitionListReducer,
} from "./manufacturingReducers";
import {
  createHelpreducer,
  listHelpreducer,
  statusHelpreducer,
} from "./helpReducers";
import {
  isIdEqualReducer,
  productTypeReducer,
} from "./ManageStateReducer/manageStateReducers";
import { createMasterReducer, listMasterReducer } from "./masterReducers";
import { saleByCustomerReducer } from "./ReportReducers/SaleReportReducers";
import { accountTransactionReducer } from "./ReportReducers/AccountReportReducers";
import {
  createHotelReducer,
  createHotelRoomReducer,
  hotelDetailReducer,
  hotelrOOMDetailReducer,
  hotelRoomStatusReducer,
  hotelStatusReducer,
  hoteltDeleteReducer,
  hoteltRoomDeleteReducer,
  listHotelReducer,
  listHotelrOOMReducer,
} from "./hotelReducers";
import {
  createItineraryReducer,
  createTourPackageReducer,
  itinerarydeleteReducer,
  itinerarystatusReducer,
  listItineraryReducer,
  listTourPackageReducer,
  tourPackagedeleteReducer,
  tourPackageDetailReducer,
  tourPackagestatusReducer,
} from "./tourPackageReducers";
import {
  createFlightReducer,
  flightdeleteReducer,
  flightDetailReducer,
  flightstatusReducer,
  listFlightReducer,
} from "./flightReducers";
import {
  createVisaReducer,
  listVisaReducer,
  visadeleteReducer,
  visaDetailReducer,
  visastatusReducer,
} from "./visaReducers";
import {
  carHiredeleteReducer,
  carHireDetailReducer,
  carHirestatusReducer,
  createcarHireReducer,
  listCarHireReducer,
} from "./carHireReducers";
import {
  assistdeleteReducer,
  assistDetailReducer,
  assiststatusReducer,
  createAssistReducer,
  listAssistReducer,
} from "./assistReducers";
import {
  createInsuranceReducer,
  InsurancedeleteReducer,
  InsuranceDetailReducer,
  InsurancestatusReducer,
  listInsuranceReducer,
} from "./insuranceReducers";
import {
  AddPassengerReducer,
  createDSRreducer,
  DeletePassengerReducer,
  DSRDetailReducer,
  listDSRreducer,
} from "./DSRReducers";
import {
  createPassengerHotelReducer,
  passengerHotelDetailReducer,
  passengerHoteltDeleteReducer,
} from "./passengerHotelReducers";
import {
  createPassengerFlightReducer,
  passengerFlighttDeleteReducer,
} from "./passengerFlightReducers";
import {
  createPassengerVisaReducer,
  passengerVisaDeleteReducer,
} from "./passengerVisaReducers";
import { createPassengerCarHireReducer, passengerCarHireDeleteReducer } from "./passengerCarHireReducers";
import { createPassengerAssistReducer, passengerAssistDeleteReducer } from "./passengerAssistReducers";
import { createPassengerInsuranceReducer, passengerInsuranceDeleteReducer } from "./passengerInsuranceReducers";
import { createPassengerOthersReducer, passengerOthersDeleteReducer } from "./passengerOthersReducers";
import { createUpdateOrgnizationReducer, orgnizationListReducer } from "./orgnizationReducers";
const reducer = combineReducers({
  addItemsReducer,

  //orgnization 
  createUpdateOrg: createUpdateOrgnizationReducer,
  orgnizationList: orgnizationListReducer,

  stockAdjustment: stockItemsReducer,
  itemStock: itemStockeducer,
  itemDetail: itemsDetailReducer,
  itemList: itemListReducer,
  importItems: itemImportReducer,
  exportItems: itemExportReducer,
  activity: itemActivityReducer,
  //services
  createHotel: createHotelReducer,
  hotelList: listHotelReducer,
  hotelDetail: hotelDetailReducer,
  hotelStatus: hotelStatusReducer,
  hotelDelete: hoteltDeleteReducer,

  createHotelRoom: createHotelRoomReducer,
  hotelRoomList: listHotelrOOMReducer,
  hotelRoomDetail: hotelrOOMDetailReducer,
  hotelRoomStatus: hotelRoomStatusReducer,
  hotelRoomDelete: hoteltRoomDeleteReducer,

  createTourPackage: createTourPackageReducer,
  tourPackageList: listTourPackageReducer,
  tourPackageDetail: tourPackageDetailReducer,
  tourPackageStatus: tourPackagestatusReducer,
  tourPackageDelete: tourPackagedeleteReducer,
  createItinerary: createItineraryReducer,
  itineraryList: listItineraryReducer,
  itineraryStatus: itinerarystatusReducer,
  itineraryDelete: itinerarydeleteReducer,

  createFlight: createFlightReducer,
  flightList: listFlightReducer,
  flightDetails: flightDetailReducer,
  flightStatus: flightstatusReducer,
  flightDelete: flightdeleteReducer,

  createVisa: createVisaReducer,
  visaList: listVisaReducer,
  visaDetails: visaDetailReducer,
  visaStatus: visastatusReducer,
  visaDelete: visadeleteReducer,

  createCarHire: createcarHireReducer,
  carHireList: listCarHireReducer,
  carHireDetails: carHireDetailReducer,
  carHireStatus: carHirestatusReducer,
  carHireDelete: carHiredeleteReducer,

  createAssist: createAssistReducer,
  assistList: listAssistReducer,
  assistDetails: assistDetailReducer,
  assistStatus: assiststatusReducer,
  assistDelete: assistdeleteReducer,

  createInsurance: createInsuranceReducer,
  insuranceList: listInsuranceReducer,
  insuranceDetails: InsuranceDetailReducer,
  insuranceStatus: InsurancestatusReducer,
  insuranceDelete: InsurancedeleteReducer,

  createPassengerHotel: createPassengerHotelReducer,
  passengerDetail: passengerHotelDetailReducer,
  passengerHotelDelete: passengerHoteltDeleteReducer,

  createPassengerFlight: createPassengerFlightReducer,
  passengerFlightDelete: passengerFlighttDeleteReducer,

  createPassengerVisa: createPassengerVisaReducer,
  passengerVisaDelete: passengerVisaDeleteReducer,

  createPassengerCarHire: createPassengerCarHireReducer,
  passengerCarHireDelete: passengerCarHireDeleteReducer,

  createPassengerAssist: createPassengerAssistReducer,
  passengerAssistDelete: passengerAssistDeleteReducer,

  createPassengerVisa: createPassengerVisaReducer,
  passengerVisaDelete: passengerVisaDeleteReducer,

  createPassengerInsurance: createPassengerInsuranceReducer,
  passengerInsuranceDelete: passengerInsuranceDeleteReducer,

  createPassengerOthers: createPassengerOthersReducer,
  passengerOthersDelete: passengerOthersDeleteReducer,

  createDSR: createDSRreducer,
  DSRList: listDSRreducer,
  DSRDetails: DSRDetailReducer,
  addPassenger: AddPassengerReducer,
  deletePassenger: DeletePassengerReducer,

  masterData: masterDataReducer,
  autoId: autoGenerateIdReducer,
  autoIdList: autoGenerateIdListReducer,

  createCategory: createCategoryReducer,
  categoryStatus: categoryStatusReducer,

  // customer
  createCustomer: createCustomerReducer,
  customerStatus: customerStatusReducer,
  customerDelete: customerDeleteReducer,
  viewCustomer: viewCustomerReducer,
  customerList: customerListReducer,

  categoryList: categoryListReducer,
  deleteCategory: deleteCategoryReducer,
  subCategoryList: subCategoryListReducer,

  getAccType: accountTypeReducer,
  createAccount: createAccountReducer,
  deleteAccount: accountDeleteReducer,
  accountList: accountListReducer,
  accountStatus: accountStatusReducer,
  accountDetails: accountDetailsReducer,

  journalList: journalListReducer,

  quoteList: quoatationListReducer,
  quoteDetail: quotationDetailReducer,
  quoteStatus: quotationStatusReducer,
  quoteDelete: quotationDeleteReducer,
  quoteSend: quotationSendReducer,
  quoteUpdate: quotationUpdateReducer,

  saleList: saleOrderListReducer,
  saleDetail: saleOrderDetailReducer,
  saleStatus: saleOrderStatusReducer,
  saleDelete: saleOrderDeleteReducer,
  saleSend: saleOrderSendReducer,

  vendorList: vendorListReducer,
  vendorView: vendorViewReducer,
  vendorDelete: vendorDeleteReducer,
  vendorStatus: vendorStatusReducer,
  purchseList: purchseListReducer,
  purchseSend: purchasesSendReducer,
  purchseStatus: purchasesStatusReducer,
  createVendor: vendorCreateReducer,

  invoiceDetail: invoiceDetailReducer,
  invoiceList: invoiceListReducer,
  invoicesStatus: invoiceStatusReducer,
  invoicesDelete: invoiceDeleteReducer,
  invoicePending: invoicePendingReducer,
  invoiceSend: invoiceMailSendReducer,
  invoiceSent: invoiceSendReducer,

  creditNoteStatus: creditNoteStatusReducer,
  createCreditNote: creditNoteCreateReducers,
  creditNoteList: creditNoteListReducer,
  creditNoteDetail: creditNoteDetailReducer,
  creditNoteDelete: creditNoteDeleteReducer,

  debitNoteList: debitNoteListReducer,
  debitNoteDetail: debitNoteDetailReducer,
  debitNoteDelete: debitNoteDeleteReducer,
  debitNoteStatus: debitNoteStatusReducer,

  countries: countriesDataReducer,
  states: stateDataReducer,
  cities: citiesDataReducer,

  status: activeInactiveItemReducer,
  deleteItem: itemDeleteReducer,
  createCustom: createCustomReducer,

  customList: customListReducer,

  getCurrency: getCurrencyReducer,
  getTaxRate: getTaxRateReducer,
  updateAddress: updateAddressReducer,

  // payment receive
  paymentRecList: paymentListReducer,
  paymentRecDelete: paymentDeleteReducer,
  paymentRecDetail: paymentDetailReducer,
  paymentRecStatus: paymentStatusReducer,
  createPayment: createPaymentReducer,

  // Journal
  journalDetail: JournalDetailReducer,
  createJournal: journalsReducer,

  // Bill
  billList: billListReducer,
  billDetail: billDetailReducer,
  billDelete: billDeleteReducer,
  billStatuses: billStatusReducer,
  billSend: billSendReducer,

  pendingBill: pendingBillReducer,
  createPurchase: createPurchasesReducer,
  detailsPurchase: purchasesDetailsReducer,
  deletePurchase: purchasesDeleteReducer,
  expenseCreate: expenseCreateReducer,
  expenseList: expenseListReducer,
  expenseHeadList: expenseHeadListReducer,
  expenseDelete: expenseDeleteReducer,
  expenseDetail: expenseDetailReducer,

  GRNcreate: createGRNreducer,
  GRNlist: listGRNreducer,
  GRNdetails: GRNdetailsReducer,
  GRNreceptList: GRNrecepitListReducer,
  GRNreceptDetail: GRNrecepitDetailReducer,
  GRNstatus: GRNstatusReducer,
  GRNdelete: GRNdeleteReducer,
  GRNitem: GRNrecepitMoveItemReducer,

  warehouseView: warehouseViewReducer,
  warehouseCreate: warehouseCreateReducer,
  warehouseDetail: warehouseDetailReducer,
  warehouseStatus: warehouseStatusReducer,

  zoneCrate: zoneCreateReducer,
  zoneView: zoneViewReducer,
  zoneDetail: zoneDetailsReducer,
  zoneStatus: zoneStatusReducer,

  rackCreate: rackCreateReducer,
  rackView: rackViewReducer,
  rackDetail: rackDetailsReducer,
  rackStatus: rackStatusReducer,

  //bin
  binCreate: binCreateReducer,
  binView: binViewReducer,
  binDetail: binDetailsReducer,
  binStatus: binStatusReducer,

  //manufaturing requisitions
  requisitionList: requisitionListReducer,
  requisitionDetail: requisitionDetailReducer,
  requisitionApprovalList: requisitionApprovalListReducer,
  createStockApproval: manufacturingCreateStockApprovalReducers,

  //help
  helpCreate: createHelpreducer,
  helpList: listHelpreducer,
  helpStatus: statusHelpreducer,

  //master
  masterCreate: createMasterReducer,
  masterList: listMasterReducer,

  //manage all State data
  type: productTypeReducer,
  isIdReducer: isIdEqualReducer,

  //Sale By Customer Report
  sale_by_customer: saleByCustomerReducer,

  //account transaction report
  accTran: accountTransactionReducer,
});

export default reducer;
