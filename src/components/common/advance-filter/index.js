"use client";
import Select from "react-select";
import PriceRange from "./PriceRange";
import Amenities from "./Amenities";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getAllProperty } from "@/services/propertyServices";
import { RtlContext } from "@/Context/RtlContext";

const AdvanceFilterModal = () => {
  const router = useRouter();

  const { currentRtl } = useContext(RtlContext);
  const catOptionsEng = [
    { value: "Apartments", label: "Apartments" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Houses" },
    { value: "Loft", label: "Loft" },
    { value: "Office", label: "Office" },
    { value: "Townhome", label: "Townhome" },
    { value: "Villa", label: "Villa" },
  ];
  const locationOptionsEng = [
    { value: "All Cities", label: "All Cities" },
    { value: "California", label: "California" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "New Jersey", label: "New Jersey" },
    { value: "New York", label: "New York" },
    { value: "San Diego", label: "San Diego" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "Texas", label: "Texas" },
  ];
  const bedOptionsEng = [
    { id: "any", label: "any" },
    { id: "1", label: "1+" },
    { id: "2", label: "2+" },
    { id: "3", label: "3+" },
    { id: "4", label: "4+" },
    { id: "5", label: "5+" },
  ];
  const bathOptionsEng = [
    { ids: "any", labels: "any", value: "any" },
    { ids: "01", labels: "1+", value: "1" },
    { ids: "02", labels: "2+", value: "2" },
    { ids: "03", labels: "3+", value: "3" },
    { ids: "04", labels: "4+", value: "4" },
    { ids: "05", labels: "5+", value: "5" },
  ];
  const amenitiesEng = [
    [
      { label: "Attic" },
      { label: "Basketball court" },
      { label: "Air Conditioning" },
      { label: "Lawn" },
    ],
    [
      { label: "TV Cable" },
      { label: "Dryer" },
      { label: "Outdoor Shower" },
      { label: "Washer" },
    ],
    [
      { label: "Lake view" },
      { label: "Wine cellar" },
      { label: "Front yard" },
      { label: "Refrigerator" },
    ],
  ];

  const catOptionsArr = [
    { value: "Apartments", label: "الشقق" },
    { value: "Bungalow", label: "بنغلو" },
    { value: "Houses", label: "المنازل" },
    { value: "Loft", label: "لوفت" },
    { value: "Office", label: "المكاتب" },
    { value: "Townhome", label: "المنازل البلدية" },
    { value: "Villa", label: "الفلل" },
  ];
  const locationOptionsArr = [
    { value: "All Cities", label: "جميع المدن" },
    { value: "California", label: "كاليفورنيا" },
    { value: "Los Angeles", label: "لوس أنجلوس" },
    { value: "New Jersey", label: "نيو جيرسي" },
    { value: "New York", label: "نيويورك" },
    { value: "San Diego", label: "سان دييغو" },
    { value: "San Francisco", label: "سان فرانسيسكو" },
    { value: "Texas", label: "تكساس" },
  ];
  const bedOptionsArr = [
    { id: "any", label: "أي عدد" },
    { id: "1", label: "1+" },
    { id: "2", label: "2+" },
    { id: "3", label: "3+" },
    { id: "4", label: "4+" },
    { id: "5", label: "5+" },
  ];
  const bathOptionsArr = [
    { ids: "any", labels: "أي عدد", value: "أي عدد" },
    { ids: "01", labels: "1+", value: "1" },
    { ids: "02", labels: "2+", value: "2" },
    { ids: "03", labels: "3+", value: "3" },
    { ids: "04", labels: "4+", value: "4" },
    { ids: "05", labels: "5+", value: "5" },
  ];
  const amenitiesArr = [
    [
      { label: "العلية" },
      { label: "ملعب كرة سلة" },
      { label: "تكييف الهواء" },
      { label: "الحديقة" },
    ],
    [
      { label: "كابل التلفزيون" },
      { label: "مجفف" },
      { label: "دش خارجي" },
      { label: "غسالة" },
    ],
    [
      { label: "إطلالة على البحيرة" },
      { label: "قبو النبيذ" },
      { label: "الفناء الأمامي" },
      { label: "ثلاجة" },
    ],
  ];
  const catOptions = currentRtl === "ltr" ? catOptionsEng : catOptionsArr;
  const amenities = currentRtl === "ltr" ? amenitiesEng : amenitiesArr;
  const bathOptions = currentRtl === "ltr" ? bathOptionsEng : bathOptionsArr;
  const locationOptions =
    currentRtl === "ltr" ? locationOptionsEng : locationOptionsArr;
  const bedOptions = currentRtl === "ltr" ? bedOptionsEng : bedOptionsArr;
  const [data, setData] = useState();
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategory, setSelectedCategory] = useState(catOptions[1]);
  const [propertyId, setPropertyId] = useState("");
  const [selectedBed, setSelectedBed] = useState(bedOptions[0].id);
  const [selectedBath, setSelectedBath] = useState(bathOptions[0].id);
  const [selectedLocation, setSelectedLocation] = useState(locationOptions[0]);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#527FE2"
          : isHovered
          ? "#527FE212"
          : isFocused
          ? "#527FE212"
          : undefined,
      };
    },
  };
  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleBedChange = (event) => {
    setSelectedBed(event.target.id);
  };
  const handleBathChange = (event) => {
    setSelectedBath(event.target.id);
  };

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const handleMinChange = (event) => {
    setMinValue(event.target.value);
  };

  const handleMaxChange = (event) => {
    setMaxValue(event.target.value);
  };

  const handleAmenityChange = (columnIndex, amenityIndex) => {
    const updatedAmenities = [...selectedAmenities];
    updatedAmenities[columnIndex] = updatedAmenities[columnIndex] || [];
    updatedAmenities[columnIndex][amenityIndex] =
      !updatedAmenities[columnIndex][amenityIndex];
    setSelectedAmenities(updatedAmenities);
  };
  const handleSearchAdvance = () => {
    const queryParams = {
      priceRange: priceRange,
      selectedCategory: selectedCategory,
      selectedBed: selectedBed,
      selectedBath: selectedBath,
      selectedLocation: selectedLocation,
      propertyId: propertyId,
      selectedAmenities: selectedAmenities,
      sqft: [minValue, maxValue], // Example array of amenities
    };
    router.push(`/map/data?advanceSearch=${JSON.stringify(queryParams)}`);
  };
  useEffect(() => {
    getAllProperty().then((data) => setData(data));
  }, []);
  useEffect(() => {
    setSelectedLocation(locationOptions[0]);

    setSelectedCategory(catOptions[1]);
  }, [currentRtl]);
  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            {currentRtl === "ltr" ? " More Filter" : "المزيد من التصفية"}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>

        <div className="modal-body pb-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">
                  {" "}
                  {currentRtl === "ltr" ? "Price Range " : "نطاق السعر"}
                </h6>
                <div className="range-slider-style modal-version">
                  <PriceRange handlepriceRange={handlepriceRange} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {" "}
                  {currentRtl === "ltr" ? "Type " : "يكتب"}
                </h6>
                <div className="form-style2 input-group">
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    defaultValue={[catOptions[1]]}
                    name="colors"
                    options={catOptions}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {" "}
                  {currentRtl === "ltr" ? "Property ID " : "معرف العقار"}
                </h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="RT04949213"
                    onChange={(e) => setPropertyId(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {" "}
                  {currentRtl === "ltr" ? "Bedrooms " : "غرف نوم"}
                </h6>
                <div className="d-flex">
                  {bedOptions.map((option, index) => (
                    <div className="selection" key={option.id}>
                      <input
                        id={option.id}
                        name="bed"
                        type="radio"
                        checked={selectedBed === option.id}
                        onChange={handleBedChange}
                      />
                      <label htmlFor={option.id}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {" "}
                  {currentRtl === "ltr" ? "Bathrooms " : "الحمامات"}
                </h6>
                <div className="d-flex">
                  {bathOptions.map((option, index) => (
                    <div className="selection" key={option.ids}>
                      <input
                        id={option.ids}
                        name="bath"
                        type="radio"
                        checked={selectedBath === option.ids}
                        onChange={handleBathChange}
                      />
                      <label htmlFor={option.ids}>{option.labels}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {" "}
                  {currentRtl === "ltr" ? "Location " : "موقع"}
                </h6>
                <div className="form-style2 input-group">
                  <Select
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    name="colors"
                    styles={customStyles}
                    options={locationOptions}
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {" "}
                  {currentRtl === "ltr" ? "Square Feet " : "قدم مكعب"}
                </h6>
                <div className="space-area">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control"
                        placeholder={
                          currentRtl === "ltr" ? "Min" : "الحد الأدنى"
                        }
                        value={minValue}
                        onChange={handleMinChange}
                      />
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control"
                        placeholder={
                          currentRtl === "ltr" ? "Max" : "الحد الأقصى"
                        }
                        value={maxValue}
                        onChange={handleMaxChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">
                  {" "}
                  {currentRtl === "ltr" ? "Amenities " : "وسائل الراحة"}
                </h6>
              </div>
            </div>
            {amenities.map((column, columnIndex) => (
              <div className="col-sm-4" key={columnIndex}>
                <div className="widget-wrapper mb20">
                  <div className="checkbox-style1">
                    {column.map((amenity, amenityIndex) => (
                      <label className="custom_checkbox" key={amenityIndex}>
                        {amenity.label}
                        <input
                          type="checkbox"
                          checked={
                            selectedAmenities[columnIndex] &&
                            selectedAmenities[columnIndex][amenityIndex]
                          }
                          onChange={() =>
                            handleAmenityChange(columnIndex, amenityIndex)
                          }
                        />
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer justify-content-between">
          <button className="reset-button">
            <span className="flaticon-turn-back" />
            <u>
              {currentRtl === "ltr"
                ? "Reset all filters"
                : "إعادة ضبط جميع المرشحات"}
            </u>
          </button>
          <div className="btn-area">
            <button
              data-bs-dismiss="modal"
              type="submit"
              className="ud-btn btn-thm"
              onClick={() => handleSearchAdvance()}
            >
              <span className="flaticon-search align-text-top pr10" />
              {currentRtl === "ltr" ? "Search" : "يبحث"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
