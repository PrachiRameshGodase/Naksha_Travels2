import React, { useEffect, useState } from "react";

import homes_chinmey from "../../../assets/outlineIcons/home.svg";
import shopping_cart from "../../../assets/outlineIcons/shopping-cart.svg";
import basket_shopping_simple from "../../../assets/outlineIcons/basket-shopping-simple.svg";
import shopping_cart_add from "../../../assets/outlineIcons/shopping_cart_add.svg";
import accountantIco from "../../../assets/outlineIcons/accountantIco.svg";
import helpIcon from "../../../assets/outlineIcons/helpIcon.svg";
import reportsIco from "../../../assets/outlineIcons/reportsIco.svg";
import manufacturing from "../../../assets/outlineIcons/manufacturing.svg";
import documentIco from "../../../assets/outlineIcons/documentIco.svg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { otherIcons } from "../../../Views/Helper/SVGIcons/ItemsIcons/Icons";

const MainLinks = ({
  handleMenuItemClick,
  selectedMenuItem,
  isSidebarCollapsedx1,
  handleShrinkSidebarx1,
}) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };
  //items
  const itemListMenuItems = [
    "manage-items",
    "item-details",
    "create-items",
    "import-items",
    "items-categories",
    "category-details",
    "create-categories",
    "services",
    "create-hotels",
    "hotels-services",
    "hotel-details",
    "create-hotelservices",
    "hotel-service-details",
    "flights-services",
    "create-flights",
    "tour-package-services",
    "create-tour-package",
    "tour-package-details",
    "visas-services",
    "create-visas",
    "visas-details",
    "car-hire-services",
    "create-car-hire",
    "car-hire-details",
    "assists-services",
    "create-assists",
    "assists-details",
    "insurances-services",
    "create-insurances",
  ];

  const servicesMenuItems = [
    "services",
    "create-hotels",
    "hotels-services",
    "hotel-details",
    "create-hotelservices",
    "hotel-service-details",
    "flights-services",
    "create-flights",
    "tour-package-services",
    "create-tour-package",
    "tour-package-details",
    "visas-services",
    "create-visas",
    "visas-details",
    "car-hire-services",
    "create-car-hire",
    "car-hire-details",
    "assists-services",
    "create-assists",
    "assists-details",
    "insurances-services",
    "create-insurances",
  ];

  const salesDataMenuItems = [
    "create-dsr",
    "dsr",
    "dsr-details",
    "serviceslist",
    "create-mice",
    "mice",
    "mice-details",
    "mice-serviceslist",
    "dsr-supplier-summary",
    "mice-supplier-summary",
  ]
  const dsrMenuItems = [
    "create-dsr",
    "dsr",
    "dsr-details",
    "serviceslist",
    "dsr-supplier-summary"
  ]

  const miceMenuItems = [
    "create-mice",
    "mice",
    "mice-details",
    "mice-serviceslist",
    "mice-supplier-summary"
  ]
  const categoryMenuItems = [
    "items-categories",
    "category-details",
    "create-categories",
  ];

  //sales
  const customersMenuItems = [
    "customers",
    "create-customer",
    "customer-details",
  ];
  const quotationsMenuItems = [
    "quotation",
    "create-quotations",
    "quotation-details",
  ];
  const salesOrdersMenuItems = [
    "sales-orders",
    "create-sales-orders",
    "sales-order-details",
  ];
  const deliveryChallanMenuItems = [
    "delivery_challan",
    "delivery-challans-details",
    "create-delivery-challans",
  ];
  const invoicesMenuItems = ["invoices", "invoice-details", "create-invoice"];
  const invoiceApprovalMenuItems = [
    "invoice-approval",
    "invoice_approval_details",
  ];
  const creditNotesMenuItems = [
    "credit-notes",
    "creditnote-details",
    "create-credit-note",
  ];
  const paymentReceivedMenuItems = [
    "payment-recieved",
    "payment-recieved-detail",
    "payment-rec-details",
    "create-payment-rec",
  ];

  //purchases
  const vendorMenuItems = ["vendors", "create-vendor", "vendor-details"];

  const purchaseOrderMenuItem = [
    "create-purchases",
    "purchase",
    "purchase-details",
  ];

  const GRNMenuItem = ["grn", "new-grn", "grn-detail"];

  const GRNApprovalMenuItem = ["grn_approval", "grn_approval_detail"];

  const GRNRecAreaMenuItem = ["grn_receipt", "grn_receipt_detail"];
  const BillMenuItem = ["bills", "create-bills", "bill-details"];
  const ExpensesMenuItem = ["expenses", "create-expenses", "expense-details"];

  const PaymentMadeMenuItem = [
    "payment-made",
    "create-payment-made",
    "payment-made-detail",
  ];
  const DebitNoteMenuItem = [
    "debit-notes",
    "create-debit-note",
    "debit-note-detail",
  ];

  const WarehouseMenuItem = [
    "warehouse",
    "create-warehouse",
    "warehouse_detail",
  ];

  const ZoneMenuItem = ["zone", "create-zone", "zone_detail"];
  const RacksMenuItem = ["racks", "create-racks", "racks_detail"];
  const WarehouseItem = ["warehouse", "create-warehouse", "warehouse-detail"];
  const BinMenuItem = ["bin", "create-bins", "bin_detail"];

  //Account
  const AccountChartMenuItem = [
    "account-details",
    "account-chart",
    "create-account-chart",
  ];

  const ManualJournalMenuItem = [
    "journal",
    "journal-details",
    "create-journal",
  ];

  //requisition
  const RequisitionMenuItem = [
    "requisition",
    "requisition-approval",
    "requisition-details",
  ];

  //Help
  const HelpMenuItem = ["create-help", "help"];

  //Masters
  const MastersMenuItem = ["create-masters", "create-user-masters"];

  //ManageCurrency
  const ManageCurrency = [
    "currency-list",
    "manage-currency",
  ];
  return (
    <>
      <div id="sidebarx1">
        <div
          {...(isSidebarCollapsedx1 && {
            "data-tooltip-id": "my-tooltip",
            "data-tooltip-content": "Home",
          })}
          onClick={() => handleMenuItemClick("home")}
          className={`menu-item ${selectedMenuItem === "home" ? "active" : ""}`}
        >
          <img className="svgiconsidebar" src={homes_chinmey} alt="" />
          <p className="dispynonesidebarc5w6s">Home</p>
        </div>

        {/* organization start */}
        {/* <div className="menu-itemxse">
          <div
            className="menu-title"
            onClick={() => setOrgMenuOpen(!orgMenuOpen)}
          >
            <span>
              <SiAwsorganizations />
              Organisations{" "}
            </span>{" "}
            {orgMenuOpen ? (
              <IoIosArrowUp />
            ) : (
              <IoIosArrowDown />
            )}
          </div>
          {orgMenuOpen && (
            <ul className="submenu">
              <li
                onClick={() => handleMenuItemClick("organisations")}
                className={`menu-item ${selectedMenuItem === "organisations" ? "active" : ""
                  }`}
              >
                Manage
              </li>
              <li
                onClick={() => handleMenuItemClick("create-organization")}
                className={`menu-item ${selectedMenuItem === "create-organization"
                  ? "active"
                  : ""
                  }`}
              >
                Create & Update
              </li>
              <li
                onClick={() => handleMenuItemClick("users")}
                className={`menu-item ${selectedMenuItem === "users"
                  ? "active"
                  : ""
                  }`}
              >
                Users
              </li>
              <li
                onClick={() =>
                  handleMenuItemClick("invite-user-to-organization")
                }
                className={`menu-item ${selectedMenuItem === "invite-user-to-organization"
                  ? "active"
                  : ""
                  }`}
              >
                Invite User
              </li>
            </ul>
          )}
        </div> */}
        {/* organization end */}

        <div className="menu-itemxse">
          <div
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Items",
            })}
            className={`menu-title ${itemListMenuItems.includes(selectedMenuItem) ||
              categoryMenuItems.includes(selectedMenuItem)
              ? "active"
              : ""
              }`}
            onClick={() => {
              handleMenuClick("items");
              handleShrinkSidebarx1();
            }}
          >
            <span>
              <img className="svgiconsidebar" src={shopping_cart} alt="" />
              <p className="dispynonesidebarc5w6s">Items</p>
            </span>
            <p className="dispynonesidebarc5w6s">
              {activeMenu === "items" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </div>

          <ul
            className={`submenu ${activeMenu === "items" ? "opensidebardropdownx5" : ""
              }`}
          >
            <li
              onClick={() => handleMenuItemClick("manage-items")}
              className={`menu-item ${[
                "manage-items",
                "create-items",
                "item-details",
                "import-items",
              ].includes(selectedMenuItem)
                ? "active"
                : ""
                }`}
            >
              Item List
            </li>

            <li
              onClick={() => handleMenuItemClick("items-categories")}
              className={`menu-item ${[
                "items-categories",
                "create-categories",
                "category-details",
              ].includes(selectedMenuItem)
                ? "active"
                : ""
                }`}
            >
              Categories
            </li>

            <li
              onClick={() => handleMenuItemClick("services")}
              className={`menu-item ${servicesMenuItems.includes(selectedMenuItem) ? "active" : ""
                }`}
            >
              Services
            </li>
          </ul>
        </div>
        <div className="menu-itemxse">
          <div
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Items",
            })}
            className={`menu-title ${customersMenuItems.includes(selectedMenuItem) || salesDataMenuItems.includes(selectedMenuItem) ||
              dsrMenuItems.includes(selectedMenuItem)
              ? "active"
              : ""
              }`}
            onClick={() => {
              handleMenuClick("sales_data");
              handleShrinkSidebarx1();
            }}
          >
            <span>
              <img className="svgiconsidebar" src={shopping_cart} alt="" />
              <p className="dispynonesidebarc5w6s">Sales Data</p>
            </span>
            <p className="dispynonesidebarc5w6s">
              {activeMenu === "sales_data" ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </p>
          </div>

          <ul
            className={`submenu ${activeMenu === "sales_data" ? "opensidebardropdownx5" : ""
              }`}
          >
            <li
              onClick={() => {
                handleMenuItemClick("customers");
              }}
              className={`menu-item ${customersMenuItems.includes(selectedMenuItem) ? "active" : ""
                }`}
            >
              Customers
            </li>
            <li
              onClick={() => handleMenuItemClick("dsr")}
              className={`menu-item ${dsrMenuItems.includes(selectedMenuItem)
                ? "active"
                : ""
                }`}
            >
              DSR
            </li>
            <li
              onClick={() => handleMenuItemClick("mice")}
              className={`menu-item ${miceMenuItems.includes(selectedMenuItem)
                ? "active"
                : ""
                }`}
            >
              MICE
            </li>
          </ul>
        </div>

        <div id="" className="menu-itemxse">
          {/* <div className="heighseprx4w65s"></div> */}
          <div
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Sales",
            })}
            className={`menu-title ${quotationsMenuItems.includes(selectedMenuItem) ||
              salesOrdersMenuItems.includes(selectedMenuItem) ||
              deliveryChallanMenuItems.includes(selectedMenuItem) ||
              invoicesMenuItems.includes(selectedMenuItem) ||
              invoiceApprovalMenuItems.includes(selectedMenuItem) ||
              creditNotesMenuItems.includes(selectedMenuItem) ||
              paymentReceivedMenuItems.includes(selectedMenuItem)
              ? "active"
              : ""
              }`}
            onClick={() => {
              handleMenuClick("sales");
              handleShrinkSidebarx1();
            }}
          >
            <span>
              <img
                className="svgiconsidebar"
                src={basket_shopping_simple}
                alt=""
              />
              <p className="dispynonesidebarc5w6s">Sales</p>
            </span>{" "}
            <p className="dispynonesidebarc5w6s">
              {activeMenu === "sales" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </div>

          {/* {Sales && ( */}

          <ul
            className={`submenu ${activeMenu === "sales" ? "opensidebardropdownx5" : ""
              }`}
          >


            <li
              onClick={() => {
                handleMenuItemClick("quotation");
              }}
              className={`menu-item ${selectedMenuItem === "quotation" ||
                selectedMenuItem === "create-quotations" ||
                selectedMenuItem === "quotation-details"
                ? "active"
                : ""
                }`}
            >
              Quotation
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("sales-orders");
              }}
              className={`menu-item ${selectedMenuItem === "sales-orders" ||
                selectedMenuItem === "create-sales-orders" ||
                selectedMenuItem === "sales-order-details"
                ? "active"
                : ""
                }`}
            >
              Sales Orders
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("delivery_challan");
              }}
              className={`menu-item ${selectedMenuItem === "delivery_challan" ||
                selectedMenuItem === "delivery-challans-details" ||
                selectedMenuItem === "create-delivery-challans"
                ? "active"
                : ""
                }`}
            >
              Delivery Challans
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("invoices");
              }}
              className={`menu-item ${selectedMenuItem === "invoices" ||
                selectedMenuItem === "invoice-details" ||
                selectedMenuItem === "create-invoice"
                ? "active"
                : ""
                }`}
            >
              Invoices
            </li>

            <li
              onClick={() => {
                handleMenuItemClick("invoice-approval");
              }}
              className={`menu-item ${selectedMenuItem === "invoice-approval" ||
                selectedMenuItem === "invoice_approval_details"
                ? "active"
                : ""
                }`}
            >
              Invoice Approval
            </li>

            {/* <li
              onClick={() => {
                handleMenuItemClick("pick_list");
              }}
              className={`menu-item ${selectedMenuItem === "pick_list" ? "active" : ""
                }`}
            >
              Pick List
            </li> */}

            <li
              onClick={() => {
                handleMenuItemClick("credit-notes");
              }}
              className={`menu-item ${selectedMenuItem === "credit-notes" ||
                selectedMenuItem === "creditnote-details" ||
                selectedMenuItem === "create-credit-note"
                ? "active"
                : ""
                }`}
            >
              Credit Notes
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("payment-recieved");
              }}
              className={`menu-item ${selectedMenuItem === "payment-recieved" ||
                selectedMenuItem === "payment-recieved-detail" ||
                selectedMenuItem === "payment-rec-details" ||
                selectedMenuItem === "create-payment-rec"
                ? "active"
                : ""
                }`}
            >
              Payment Recieved
            </li>
          </ul>

          {/* )} */}
        </div>

        <div id="" className="menu-itemxse">
          <div
            className={`menu-title ${vendorMenuItems.includes(selectedMenuItem) ||
              purchaseOrderMenuItem.includes(selectedMenuItem) ||
              GRNMenuItem.includes(selectedMenuItem) ||
              GRNApprovalMenuItem.includes(selectedMenuItem) ||
              GRNRecAreaMenuItem.includes(selectedMenuItem) ||
              BillMenuItem.includes(selectedMenuItem) ||
              ExpensesMenuItem.includes(selectedMenuItem) ||
              PaymentMadeMenuItem.includes(selectedMenuItem) ||
              DebitNoteMenuItem.includes(selectedMenuItem)
              ? "active"
              : ""
              }`}
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Purchases",
            })}
            onClick={() => {
              handleMenuClick("Purchases");
              handleShrinkSidebarx1();
            }}
          >
            <span>
              <img className="svgiconsidebar" src={shopping_cart_add} alt="" />
              <p className="dispynonesidebarc5w6s">Purchases</p>
            </span>{" "}
            <p className="dispynonesidebarc5w6s">
              {activeMenu === "Purchases" ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </p>
          </div>

          {/* {Purchases && ( */}

          <ul
            className={`submenu ${activeMenu === "Purchases" ? "opensidebardropdownx5" : ""
              }`}
          >
            <li
              onClick={() => {
                handleMenuItemClick("vendors");
              }}
              className={`menu-item ${selectedMenuItem === "vendors" ||
                selectedMenuItem === "vendor-details" ||
                selectedMenuItem === "create-vendor"
                ? "active"
                : ""
                }`}
            >
              Vendors
            </li>

            <li
              onClick={() => handleMenuItemClick("purchase")}
              className={`menu-item ${selectedMenuItem === "purchase" ||
                selectedMenuItem === "create-purchases" ||
                selectedMenuItem === "purchase" ||
                selectedMenuItem === "purchase-details"
                ? "active"
                : ""
                }`}
            >
              Purchase Order
            </li>
            <li
              onClick={() => handleMenuItemClick("grn")}
              className={`menu-item ${selectedMenuItem === "grn" ||
                selectedMenuItem === "grn" ||
                selectedMenuItem == "new-grn" ||
                selectedMenuItem === "account-chart" ||
                selectedMenuItem === "create-account-chart" ||
                selectedMenuItem === "grn-detail"
                ? "active"
                : ""
                }`}
            >
              GRN
            </li>
            <li
              onClick={() => handleMenuItemClick("grn_approval")}
              className={`menu-item ${selectedMenuItem === "grn_approval" ||
                selectedMenuItem === "grn_approval" ||
                selectedMenuItem === "grn_approval_detail"
                ? "active"
                : ""
                }`}
            >
              GRN Approval
            </li>
            <li
              onClick={() => handleMenuItemClick("grn_receipt")}
              className={`menu-item ${selectedMenuItem === "grn_receipt" ||
                selectedMenuItem === "grn_receipt" ||
                selectedMenuItem === "grn_receipt_detail"
                ? "active"
                : ""
                }`}
            >
              GRN Receiving Area
            </li>

            <li
              onClick={() => {
                handleMenuItemClick("bills");
              }}
              className={`menu-item ${selectedMenuItem === "bills" ||
                selectedMenuItem === "bills" ||
                selectedMenuItem === "create-bills" ||
                selectedMenuItem === "bill-details"
                ? "active"
                : ""
                }`}
            >
              Bills
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("payment-made");
              }}
              className={`menu-item ${selectedMenuItem === "payment-made" ||
                // selectedMenuItem==="payment-recieved"||
                // selectedMenuItem==="payment-recieved-detail"||
                selectedMenuItem === "payment-made" ||
                selectedMenuItem === "create-payment-made" ||
                selectedMenuItem === "payment-made-detail"
                ? "active"
                : ""
                }`}
            >
              Payment Made
            </li>

            <li
              onClick={() => {
                handleMenuItemClick("expenses");
              }}
              className={`menu-item ${selectedMenuItem === "expenses" ||
                selectedMenuItem === "expenses" ||
                selectedMenuItem === "create-expenses" ||
                selectedMenuItem === "expense-details"
                ? "active"
                : ""
                }`}
            >
              Expenses
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("debit-notes");
              }}
              className={`menu-item ${selectedMenuItem === "debit-notes" ||
                selectedMenuItem === "debit-notes" ||
                selectedMenuItem === "create-debit-note" ||
                selectedMenuItem === "debit-note-detail"
                ? "active"
                : ""
                }`}
            >
              Debit Notes
            </li>
          </ul>
        </div>

        {/* warehouse */}
        <div id="" className="menu-itemxse">
          <div
            className={`menu-title ${WarehouseMenuItem.includes(selectedMenuItem) ||
              ZoneMenuItem.includes(selectedMenuItem) ||
              RacksMenuItem.includes(selectedMenuItem) ||
              // WarehouseItem.includes(selectedMenuItem) ||
              BinMenuItem.includes(selectedMenuItem)
              ? "active"
              : ""
              }`}
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Warehouse",
            })}
            onClick={() => {
              handleMenuClick("Warehouse");
              handleShrinkSidebarx1();
            }}
          >
            <span>
              {/* <img className="svgiconsidebar" src={shopping_cart_add} alt="" /> */}
              {otherIcons?.warehouse_list_svg}
              <p className="dispynonesidebarc5w6s">Warehouse</p>
            </span>{" "}
            <p className="dispynonesidebarc5w6s">
              {activeMenu === "Warehouse" ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </p>
          </div>

          {/* {Purchases && ( */}
          <ul
            className={`submenu ${activeMenu === "Warehouse" ? "opensidebardropdownx5" : ""
              }`}
          >
            <li
              onClick={() => {
                handleMenuItemClick("warehouse");
              }}
              className={`menu-item ${selectedMenuItem === "warehouse" ||
                selectedMenuItem === "warehouse" ||
                selectedMenuItem === "create-warehouse" ||
                selectedMenuItem === "warehouse_detail"
                ? "active"
                : ""
                }`}
            >
              Warehouse
            </li>

            {/* <li
              onClick={() => {
                handleMenuItemClick("zone");
              }}
              className={`menu-item ${selectedMenuItem === "zone" ||
                selectedMenuItem === "zone" ||
                selectedMenuItem === "create-zone" ||
                selectedMenuItem === "zone_detail"
                ? "active"
                : ""
                }`}
            >
              Zone
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("racks");
              }}
              className={`menu-item ${selectedMenuItem === "racks" ||
                selectedMenuItem === "racks" ||
                selectedMenuItem === "create-racks" ||
                selectedMenuItem === "racks_detail"
                ? "active"
                : ""
                }`}
            >
              Racks
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("bin");
              }}
              className={`menu-item ${selectedMenuItem === "bin" ||
                selectedMenuItem === "bin" ||
                selectedMenuItem === "create-bins" ||
                selectedMenuItem === "bin_detail"
                ? "active"
                : ""
                }`}
            >
              Bin
            </li> */}
          </ul>

          {/* )} */}
        </div>

        {/* accountant start */}
        <div id="" className="menu-itemxse">
          <div
            className={`menu-title ${AccountChartMenuItem.includes(selectedMenuItem) ||
              ManualJournalMenuItem.includes(selectedMenuItem)
              ? "active"
              : ""
              }`}
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Accountant",
            })}
            onClick={() => {
              handleMenuClick("account");
              handleShrinkSidebarx1();
            }}
          >
            <span>
              <img className="svgiconsidebar" src={accountantIco} alt="" />
              <p className="dispynonesidebarc5w6s">Accountant</p>
            </span>{" "}
            <p className="dispynonesidebarc5w6s">
              {activeMenu === "account" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </div>
          <ul
            className={`submenu ${activeMenu === "account" ? "opensidebardropdownx5" : ""
              }`}
          >
            <li
              onClick={() => handleMenuItemClick("account-chart")}
              className={`menu-item ${selectedMenuItem === "account-chart" ||
                selectedMenuItem === "create-account-chart" ||
                selectedMenuItem === "account-details"
                ? "active"
                : ""
                }`}
            >
              Account chart
            </li>
            <li
              onClick={() => handleMenuItemClick("journal")}
              className={`menu-item ${selectedMenuItem === "journal" ||
                selectedMenuItem === "journal-details" ||
                selectedMenuItem === "create-journal"
                ? "active"
                : ""
                }`}
            >
              Manual Journal
            </li>
          </ul>
        </div>
        {/* accountant end */}

        {/* Reports */}
        <div
          id=""
          className="menu-itemxse"
          onClick={() => handleMenuItemClick("reports")}
        >
          <div
            className="menu-title"
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Reports",
            })}
          >
            <span>
              {" "}
              <img className="svgiconsidebar" src={reportsIco} alt="" />
              <p className="dispynonesidebarc5w6s">Reports</p>
            </span>
          </div>
        </div>

        {/* accountant start */}
        {/* <div id="" className="menu-itemxse">
          <div
            className={`menu-title ${RequisitionMenuItem.includes(selectedMenuItem) ? "active" : ""
              }`}
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Requisition",
            })}
            onClick={() => {
              handleMenuClick("requisition");
              handleShrinkSidebarx1();
            }}
          >
            <span>
              <img className="svgiconsidebar" src={accountantIco} alt="" />
              <p className="dispynonesidebarc5w6s">Requisition</p>
            </span>{" "}
            <p className="dispynonesidebarc5w6s">
              {activeMenu === "requisition" ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </p>
          </div>
          <ul
            className={`submenu ${activeMenu === "requisition" ? "opensidebardropdownx5" : ""
              }`}
          >
            <li
              onClick={() => handleMenuItemClick("requisition-approval")}
              className={`menu-item ${selectedMenuItem === "requisition-approval" ? "active" : ""
                }`}
            >
              Requisition Approval
            </li>
           
          </ul>
        </div> */}

        {/* Help section started */}
        <div
          id=""
          className="menu-itemxse"
          onClick={() => handleMenuItemClick("help")}
        >
          <div
            className={`menu-title ${HelpMenuItem.includes(selectedMenuItem) ? "active" : ""
              }`}
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "help",
            })}
          >
            <span>
              {" "}
              <img className="svgiconsidebar" src={helpIcon} alt="" />
              <p className="dispynonesidebarc5w6s">Help</p>
            </span>
          </div>
        </div>

        {/* <div id="" className="menu-itemxse">
          <div className="heighseprx4w65s"></div>
          <div
            className="menu-title"
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Documents",
            })}
          >
            <span>
              <img className="svgiconsidebar" src={documentIco} alt="" />
              <p className="dispynonesidebarc5w6s">Documents</p>
            </span>
          </div>
        </div> */}

        <div id="" className="menu-itemxse">
          <div
            className={`menu-title ${MastersMenuItem.includes(selectedMenuItem) ? "active" : ""
              }`}
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Masters",
            })}
            onClick={() => {
              handleMenuClick("masters");
              handleShrinkSidebarx1();
            }}
          >
            <span>
              <img className="svgiconsidebar" src={shopping_cart_add} alt="" />
              <p className="dispynonesidebarc5w6s">Masters</p>
            </span>{" "}
            <p className="dispynonesidebarc5w6s">
              {activeMenu === "masters" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </div>

          {/* {Purchases && ( */}

          <ul
            className={`submenu ${activeMenu === "masters" ? "opensidebardropdownx5" : ""
              }`}
          >
            <li
              onClick={() => {
                handleMenuItemClick("create-masters");
              }}
              className={`menu-item ${selectedMenuItem === "create-masters" ? "active" : ""
                }`}
            >
              System Masters
            </li>

            <li
              onClick={() => {
                handleMenuItemClick("create-user-masters");
              }}
              className={`menu-item ${selectedMenuItem === "create-user-masters" ? "active" : ""
                }`}
            >
              User Masters
            </li>
            {/* hide currency in nakshsa */}
            {/* <li
              onClick={() => {
                handleMenuItemClick("manage-currency");
              }}
              className={`menu-item ${selectedMenuItem === "manage-currency" ? "active" : ""
                }`}
            >
              Currency
            </li> */}

            <li
              onClick={() => {
                handleMenuItemClick("sequence-format");
              }}
              className={`menu-item ${selectedMenuItem === "sequence-format" ? "active" : ""
                }`}
            >
              Sequence Format
            </li>
          </ul>

          {/* )} */}
        </div>

        {/* Currency start */}
        <div id="" className="menu-itemxse">
          <div
            className={`menu-title ${ManageCurrency.includes(selectedMenuItem) ? "active" : ""
              }`}
            {...(isSidebarCollapsedx1 && {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": "Currency",
            })}
            onClick={() => {
              handleMenuClick("currency");
              handleShrinkSidebarx1();
            }}
          >
            <span>
              <img className="svgiconsidebar" src={accountantIco} alt="" />
              <p className="dispynonesidebarc5w6s">Manage Currency</p>
            </span>{" "}
            <p className="dispynonesidebarc5w6s">
              {activeMenu === "currency" ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </p>
          </div>
          <ul
            className={`submenu ${activeMenu === "currency" ? "opensidebardropdownx5" : ""
              }`}
          >
            <li
              onClick={() => handleMenuItemClick("currency-list")}
              className={`menu-item ${selectedMenuItem === "currency-list" ? "active" : ""
                }`}
            >
              Currency List
            </li>
            <li
              onClick={() => handleMenuItemClick("manage-currency")}
              className={`menu-item ${selectedMenuItem === "manage-currency" ? "active" : ""
                }`}
            >
              Manage Currency
            </li>
          </ul>

        </div>

        {/* Help */}
      </div>
    </>
  );
};

export default MainLinks;
