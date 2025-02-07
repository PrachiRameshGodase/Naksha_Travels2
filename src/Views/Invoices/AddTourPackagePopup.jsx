import React, { useEffect, useMemo, useRef, useState } from "react";
import { SubmitButton6 } from "../Common/Pagination/SubmitButton";
import { CalculationSection2 } from "../DSR/CalculationSection";
import CustomDropdown10 from "../../Components/CustomDropdown/CustomDropdown10";
import CustomDropdown29 from "../../Components/CustomDropdown/CustomDropdown29";
import { CustomDropdown003 } from "../../Components/CustomDropdown/CustomDropdown03";
import { useDispatch, useSelector } from "react-redux";
import { vendorsLists } from "../../Redux/Actions/listApisActions";
import { itineraryListAction, tourPackageListAction } from "../../Redux/Actions/tourPackageActions";
import { sendData, ShowUserMasterData } from "../Helper/HelperFunctions";
import useFetchApiData from "../Helper/ComponentHelper/useFetchApiData";
import { RxCross2 } from "react-icons/rx";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import CustomDropdown04, { CustomDropdown0004, CustomDropdown004 } from "../../Components/CustomDropdown/CustomDropdown04";
import { transport } from "../Helper/ComponentHelper/DropdownData";

const AddTourPackagePopup = ({
  setShowModal,
  handleAddService,
  edit_data,
  section,
}) => {
  const dispatch = useDispatch();
  const dropdownRef1 = useRef(null);
  const {
    discount,
    discount_type,
    gross_amount,
    item_id,
    item_name,
    rate,
    tax_rate,
    service_data,
  } = edit_data;

  const vendorList = useSelector((state) => state?.vendorList);
  const tourPackageListData = useSelector((state) => state?.tourPackageList);
  const tourPackageLists = tourPackageListData?.data?.data || [];
  const itinaeraryListData = useSelector((state) => state?.itineraryList);
  const itineraryLists = itinaeraryListData?.data?.data || [];

  const hotelType = ShowUserMasterData("35");
  const meal = ShowUserMasterData("37");

  const [formData, setFormData] = useState({
    service_name: "Tour Package",
    tour_package_id:service_data?.tour_package_id || "",
    hotel_type: service_data?.hotel_type || null, // Example for airport ID
    package_name: service_data?.package_name || "", // Example for airport name
    destination: service_data?.destination || "", // Example for meeting type
    meal_id: service_data?.meal_id || "", // Example for the number of persons
    is_transport: service_data?.is_transport || "", // Example for the number of persons
    days: service_data?.days || "", // Example for the number of persons
    supplier_id: service_data?.supplier_id || "", // Example for supplier ID
    supplier_name: service_data?.supplier_name || null, // Example for supplier name
    itinerary:[{}],

    // Amount fields
    gross_amount: gross_amount || 0, // Gross amount if provided
    discount: 0.0, // Default discount value
    tax_percent: tax_rate || null, // Tax percent if provided
    tax_amount: 0.0, // Default tax amount
    total_amount: 0.0, // Default total amount
  });

  const [errors, setErrors] = useState({
    package_name: false,
  });

  const [cusData1, setcusData1] = useState(null);
  const [cusData2, setcusData2] = useState(null);
  
  const handleChange =(e)=>{
   const { name, value } = e.target;
   let updatedFields = { [name]: value };
   if (name === "package_name") {
        const selectedPackage = tourPackageLists?.find((tourpackage) => tourpackage?.package_name == value);
        updatedFields = {
          ...updatedFields,
          tour_package_id:selectedPackage?.id,
          package_name: selectedPackage?.package_name,
          hotel_type :selectedPackage?.hotel_type ||"", 
          destination: selectedPackage?.destination || "",
          meal_id: selectedPackage?.meal_id || "",
          is_transport: selectedPackage?.is_transport || "",
          days: selectedPackage?.days || "",
          supplier_id: selectedPackage?.supplier_id,
          gross_amount:selectedPackage?.price_per_person
        };
    }
    if (name === "supplier_id") {
        const selectedHotel = vendorList?.data?.user?.find(
          (item) => item?.id == value
        );
        updatedFields = {
          ...updatedFields,
          supplier_name: selectedHotel?.display_name || "",
        };
      }
      
    setFormData((prev) => ({
        ...prev,
        ...updatedFields,
      }));
      setErrors((prevData) => ({
        ...prevData,
        ...updatedFields,
       
        [name]: false,
      }));
  }
  useEffect(() => {
    if (formData.tour_package_id) {
      const sendData = {
        tour_package_id: formData.tour_package_id,
      };
      dispatch(itineraryListAction(sendData));
    }
  }, [formData.tour_package_id, dispatch]);
  
  useEffect(() => {
    if (itineraryLists.length > 0) {
      setFormData((prev) => ({
        ...prev,
        itinerary: itineraryLists, // Automatically set itinerary data
      }));
    }
  }, [itineraryLists]);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      package_name: formData?.package_name ? false : true,
    };
    setErrors(newErrors);
    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
      await Swal.fire({
        text: "Please fill all the required fields.",
        confirmButtonText: "OK",
      });
      return;
    } else {
      const sendData = {
        ...formData,
      };
      handleAddService(sendData);
      setShowModal(false);
    }
  };

   // call item api on page load...
   const payloadGenerator = useMemo(() => () => ({ ...sendData }), []);
   useFetchApiData(tourPackageListAction, payloadGenerator, []); //call api common function
   useFetchApiData(vendorsLists, payloadGenerator, []); //call api common function
   // call item api on page loa
   // d...

  return (
    <div id="formofcreateitems">
      <div className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add Tour Package Service</h5>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              <RxCross2 />
            </button>
          </div>

          <div className="modal-body">
            <form>
              {/* Keep your form as it is */}
              <div className="relateivdiv">
                <div
                  className="itemsformwrap"
                  style={{ paddingBottom: "50px" }}
                >
                  <div className="f1wrapofcreq">
                    <div className="f1wrapofcreqx1">
                      <div className="form_commonblock">
                        <label>
                          Package Name<b className="color_red">*</b>
                        </label>
                        <div id="sepcifixspanflex">
                          <span id="">
                            {otherIcons.name_svg}
                            <CustomDropdown003
                              options={tourPackageLists}
                              value={formData?.package_name}
                              name="package_name"
                              onChange={handleChange}
                              type="package_name"
                              setItemData={setcusData2}
                              defaultOption="Select Package Name"
                              index="0"
                              extracssclassforscjkls=""
                              itemData={cusData2}
                              ref={dropdownRef1}
                            />
                          </span>
                          {errors?.package_name && (
                            <p
                              className="error_message"
                              style={{
                                whiteSpace: "nowrap",
                                marginBottom: "0px important",
                              }}
                            >
                              {otherIcons.error_svg}
                              Please Select Package Name
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        className={`form_commonblock ${
                          formData?.package_name ? "" : "disabledfield"
                        }`}
                        data-tooltip-content={
                          formData?.package_name
                            ? "It is getting from package"
                            : "Please Select Package First"
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                      >
                        <label>Destination</label>

                        <span>
                          {otherIcons.placeofsupply_svg}
                          <input
                            value={formData.destination}
                            // onChange={handleChange}
                            name="destination"
                            placeholder="Enter Destination"
                            readOnly
                          />
                        </span>
                      </div>
                      <div
                        className={`form_commonblock ${
                          formData?.package_name ? "" : "disabledfield"
                        }`}
                        data-tooltip-content={
                          formData?.package_name
                            ? ""
                            : "Please Select Package First"
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                      >
                        <label>Hotel Type</label>

                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown0004
                            label="Hotel Type"
                            options={hotelType}
                            value={formData?.hotel_type}
                            onChange={handleChange}
                            name="hotel_type"
                            defaultOption="Select Hotel Type"
                            type="masters"
                            disabled={!formData?.package_name}

                          />
                        </span>
                      </div>
                    </div>
                    <div className="f1wrapofcreqx1">
                      <div
                        className={`form_commonblock ${
                          formData?.package_name ? "" : "disabledfield"
                        }`}
                        data-tooltip-content={
                          formData?.package_name
                            ? ""
                            : "Please Select Package First"
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                      >
                        <label>Meal Plan</label>
                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown0004
                            label="Meal"
                            options={meal}
                            value={formData?.meal_id}
                            onChange={handleChange}
                            name="meal_id"
                            defaultOption="Select Meal"
                            type="masters"
                            disabled={!formData?.package_name}

                          />
                        </span>
                      </div>
                      <div
                        className={`form_commonblock ${
                          formData?.package_name ? "" : "disabledfield"
                        }`}
                        data-tooltip-content={
                          formData?.package_name
                            ? ""
                            : "Please Select Room First"
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                      >
                        <label>Transport</label>
                        <span id="">
                          {otherIcons.name_svg}
                          <CustomDropdown0004
                              label="Transport"
                              options={transport}
                              value={formData?.is_transport}
                              onChange={handleChange}
                              name="is_transport"
                              defaultOption="Select Yes/No"
                              type="masters"
                              disabled={!formData?.package_name}

                            />
                        </span>
                      </div>
                      <div  className={`form_commonblock ${
                          formData?.package_name ? "" : "disabledfield"
                        }`}
                        data-tooltip-content={
                          formData?.package_name
                            ? "It is getting from package"
                            : "Please Select Package First"
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom">
                        <label>Total Days</label>
                        <div id="inputx1">
                          <span>
                            {otherIcons.name_svg}
                            <input
                              value={formData.days}
                              // onChange={handleChange}
                              name="days"
                              placeholder="Enter Transport"
                              readOnly
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="f1wrapofcreqx1">
                      
                      {section != "sales" && (
                        <div className="form_commonblock">
                          <label>Supplier</label>
                          <div id="sepcifixspanflex">
                            <span id="">
                              {otherIcons.name_svg}
                              <CustomDropdown10
                                ref={dropdownRef1}
                                label="Select Supplier"
                                options={vendorList?.data?.user}
                                value={formData.supplier_id}
                                onChange={handleChange}
                                name="supplier_id"
                                defaultOption="Select Supplier"
                                setcusData={setcusData1}
                                cusData={cusData1}
                                type="vendor"
                                required
                              />
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className="secondtotalsections485s"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <CalculationSection2
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                        section="Tour Package"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <SubmitButton6
                onClick={handleFormSubmit}
                createUpdate=""
                setShowModal={setShowModal}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTourPackagePopup;
