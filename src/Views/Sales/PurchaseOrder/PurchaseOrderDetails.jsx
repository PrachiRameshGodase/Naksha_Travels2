import React, { useEffect, useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
// import { purchaseOrderDelete, purchaseOrderDetails, purchaseOrderStatus } from '../../../Redux/Actions/purchaseOrderActions';
import { useDispatch, useSelector } from "react-redux";
import Loader02 from "../../../Components/Loaders/Loader02";
import MainScreenFreezeLoader from "../../../Components/Loaders/MainScreenFreezeLoader";
import { Toaster } from "react-hot-toast";
import {
  formatDate3,

} from "../../Helper/DateFormat";

import { useReactToPrint } from "react-to-print";
import useOutsideClick from "../../Helper/PopupData";
import {
  purchasesDelete,
  purchasesDetails,
  purchasesStatus
} from "../../../Redux/Actions/purchasesActions";

import ItemDetailTable from "../../Common/InsideSubModulesCommon/ItemDetailTable";
import {
  MoreInformation,
  FromToDetailsPurchases,
  ShowDropdownContent,
  ShowAllStatusPurchase
} from "../../Common/InsideSubModulesCommon/DetailInfo";
import useFetchApiData from "../../Helper/ComponentHelper/useFetchApiData";
import PrintContent from "../../Helper/ComponentHelper/PrintAndPDFComponent/PrintContent";
import { generatePDF } from "../../Helper/createPDF";
import { currencyRateListAction } from "../../../Redux/Actions/manageCurrencyActions";
import { UserMasterListAction } from "../../../Redux/Actions/userMasterActions";
import { confirIsCurrencyPDF } from "../../Helper/ConfirmHelperFunction/ConfirmWithZeroAmount";

const PurchaseOrderDetails = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();


  const purchaseStatus = useSelector((state) => state?.purchseStatus);
  const purchaseDelete = useSelector((state) => state?.deletePurchase);
  const purchaseDetail = useSelector((state) => state?.detailsPurchase);
  const purchase = purchaseDetail?.data?.purchaseOrder;

  const masterData = useSelector(state => state?.masterData?.masterData);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownx1, setShowDropdownx1] = useState(false);
  const [showDropdownx2, setShowDropdownx2] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  useOutsideClick(dropdownRef2, () => setShowDropdown(false));
  useOutsideClick(dropdownRef1, () => setShowDropdownx1(false));
  useOutsideClick(dropdownRef, () => setShowDropdownx2(false));

  const UrlId = new URLSearchParams(location.search).get("id");
  const [callApi, setCallApi] = useState(false);

  const handleEditThing = (val) => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);
    if (val === "edit") {
      queryParams.set("edit", true);
      Navigate(`/dashboard/create-purchases?${queryParams.toString()}`);
    }
    else if (val === "purchase_to_bill") {
      queryParams.set("convert", "purchase_to_bill");
      Navigate(`/dashboard/create-bills?${queryParams.toString()}`);
    }
    else if (val === "purchase_to_grn") {
      queryParams.set("convert", "purchase_to_grn");
      Navigate(`/dashboard/new-grn?${queryParams.toString()}`);
    }
    else if (val === "duplicate") {
      queryParams.set("duplicate", true);
      Navigate(`/dashboard/create-purchases?${queryParams.toString()}`);
    } else if (val === "approved") {
      dispatch(purchasesStatus({ id: UrlId, status: 1 }, setCallApi));
    } else if (val === "delete") {
      dispatch(purchasesDelete({ id: UrlId }, Navigate));
    }
  };


  const payloadGenerator = useMemo(() => () => ({//useMemo because  we ensure that this function only changes when [dependency] changes
    id: UrlId,
  }), [callApi]);

  useFetchApiData(purchasesDetails, payloadGenerator, [callApi]);

  // pdf & print
  const componentRef = useRef(null);

  const changeStatus = (statusVal) => {
    try {
      const sendData = {
        id: UrlId
      }
      switch (statusVal) {
        case 'accepted':
          sendData.status = 1
          break;
        case 'decline':
          sendData.status = 2
          break;
        case 'sent':
          sendData.status = 6
          break;
        default:
      }

      if (statusVal === "delete") {
        dispatch(purchasesDelete(sendData, Navigate)).then(() => {
          setCallApi((preState) => !preState);
        });
      } else {
        dispatch(purchasesStatus(sendData)).then(() => {
          setCallApi((preState) => !preState);
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const [loading, setLoading] = useState(false);

  const rateLoading = useSelector(state => state?.currencyRateList);

  const handleDownloadPDF = async () => {
    try {
      if (!payment?.transaction_date) return;

      // Fetch currency rates for the transaction date
      const res = await dispatch(currencyRateListAction({ date: purchase?.transaction_date }));
      const fetchCurrencyData = res?.data?.find(val => val?.code === purchase?.currency);

      // Ensure masterData & quotation exist before proceeding
      if (!purchase || !masterData) {
        dispatch(UserMasterListAction());
        alert("Data is still loading, please try again.");
        return;
      }

      const generatePDFWithData = (currencyData) => {
        const contentComponent = (
          <PrintContent
            data={purchase}
            masterData={masterData}
            moduleId={purchase?.purchase_order_id}
            section="Payment Receive"
            fetchCurrencyData={currencyData}
          />
        );
        generatePDF(contentComponent, "Purchases_Document.pdf", setLoading, 500);
      };

      if (fetchCurrencyData) {
        generatePDFWithData(fetchCurrencyData);
      } else if (purchase?.currency === getCurrencyValue()) {
        generatePDFWithData(null); // No conversion needed
      } else {
        // Prompt user to create missing currency
        const res = await confirIsCurrencyPDF(purchase?.currency);
        if (res) {
          Navigate(`/dashboard/manage-currency?date=${purchase?.transaction_date}&currency=${purchase?.currency}`);
        }
      }
    } catch (error) {
      console.error("Error fetching currency rates:", error);
    }
  };

  return (
    <>
      {(purchaseDelete?.loading || purchaseStatus?.loading || loading || rateLoading?.loading) && <MainScreenFreezeLoader />}

      {purchaseDetail?.loading ? (
        <Loader02 />
      ) : (
        <div ref={componentRef}>
          <div id="Anotherbox" className="formsectionx1">
            <div id="leftareax12">
              <h1 id="firstheading">{purchase?.purchase_order_id}</h1>
            </div>
            <div id="buttonsdata">

              {purchase?.status == 1 ? (
                ""
              ) : (
                <div
                  className="mainx1"
                  onClick={() => handleEditThing("edit")}
                  data-tooltip-place="bottom"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Edit"
                >
                  <img src="/Icons/pen-clip.svg" alt="" />
                  <p>Edit</p>
                </div>
              )}

              <div className="mainx1" onClick={handleDownloadPDF}>
                <p style={{ cursor: 'pointer' }}>
                  PDF/Print
                </p>
              </div>

              <div className="sepc15s63x63"></div>
              <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef2}>
                <img src="/Icons/menu-dots-vertical.svg" alt="" data-tooltip-id="my-tooltip" data-tooltip-content="More Options" data-tooltip-place='bottom' />
                {showDropdown && (
                  <ShowDropdownContent quotation={purchase}
                    changeStatus={changeStatus}
                  />
                )}
              </div>

              <Link
                to={"/dashboard/purchase"}
                className="linkx3"
                data-tooltip-place="bottom"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Close"
              >
                <RxCross2 />
              </Link>
            </div>
          </div>

          <div className="listsectionsgrheigh" id="quotation-content">
            {purchase?.status == "1" && (
              <div className="commonquoatjkx54s">
                <div className="firstsecquoatjoks45">
                  <div className="detailsbox4x15sfirp">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9329/9329876.png"
                      alt=""
                    />
                  </div>
                  <div className="detailsbox4x15s">
                    <h2>Convert and Send the Purchase Order</h2>
                    <p>
                      Create GRN for this estimate to confirm the sale and bill
                      your customer.
                    </p>
                    <button onClick={() => setShowDropdownx2(!showDropdownx2)} ref={dropdownRef}>Convert {otherIcons?.arrow_svg}
                      {showDropdownx2 && (
                        <div className="dropdownmenucustom5sc51s">
                          {/* <div
                            className="dmncstomx1 btextcolor"
                            onClick={() => handleEditThing("purchase_to_grn")}
                          >
                            {otherIcons?.print_svg}
                            GRN
                          </div> */}
                          <div
                            className="dmncstomx1 btextcolor"
                            onClick={() =>
                              handleEditThing("purchase_to_bill")
                            }
                          >
                            {otherIcons?.pdf_svg}
                            Bill
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="commonquoatjkx55s">
              <div className="childommonquoatjkx55s">
                <ShowAllStatusPurchase quotation={purchase} />
                <div className="detailsbox4x15s1">
                  <div className="xhjksl45s">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 19 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.7582 0.894043L18.8566 4.51588L16.7582 8.13771H12.5615L10.4631 4.51588L12.5615 0.894043L16.7582 0.894043Z" />
                      <path d="M6.29509 0.894043L13.5963 13.4842L11.4979 17.1061H7.30116L0 4.51588L2.09836 0.894043L6.29509 0.894043Z" />
                    </svg>
                    <p>Accounts</p>
                  </div>
                  <div className="xhjksl45s2">
                    <h1>PURCHASE ORDER</h1>
                    <span>
                      <p>Purchase Order No:</p>
                      <h3>{purchase?.purchase_order_id}</h3>
                    </span>
                    <span>
                      <p>Purchase Date:</p>
                      <h3>{formatDate3(purchase?.transaction_date)}</h3>
                    </span>
                  </div>
                </div>
                <br />

                <FromToDetailsPurchases
                  quotation={purchase?.vendor}
                  section="Purchase Order"
                />
                <ItemDetailTable itemsData={purchase} showChargesVal={true} />
              </div>
            </div>

            <MoreInformation
              sale={purchase?.sale_person}
              note={purchase?.vendor_note}
              tc={purchase?.terms_and_condition}
              section="Vendor"
            />
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default PurchaseOrderDetails;
