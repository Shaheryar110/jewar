import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Amenities from "./Amenities";
import { useEffect, useState, useContext } from "react";
import { RtlContext } from "@/Context/RtlContext";

const AdvanceFilterModal = ({ filterFunctions }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const { currentRtl } = useContext(RtlContext); // Access currentRtl value from context

  useEffect(() => {
    filterFunctions?.handlesquirefeet([min, max]);
  }, [min, max]);

  const catOptions = [
    { value: "Houses", label: "Houses" },
    { value: "Office", label: "Office" },
    { value: "Apartments", label: "Apartments" },
    { value: "Villa", label: "Villa" },
  ];

  const locationOptions = [
    { value: "All Cities", label: "All Cities" },
    { value: "California", label: "California" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "New Jersey", label: "New Jersey" },
    { value: "New York", label: "New York" },
    { value: "San Diego", label: "San Diego" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "Texas", label: "Texas" },
  ];

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

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            {currentRtl === "ltr" ? "More Filter" : "مرشحات إضافية"}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>

        <div className="modal-body pb-0">
          {/* Price Range */}
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">
                  {currentRtl === "ltr" ? "Price Range" : "نطاق السعر"}
                </h6>
                <div className="range-slider-style modal-version">
                  <PriceRange filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
          </div>

          {/* Type and Property ID */}
          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {currentRtl === "ltr" ? "Type" : "النوع"}
                </h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[catOptions[1]]}
                    name="colors"
                    options={catOptions}
                    styles={customStyles}
                    onChange={(e) =>
                      filterFunctions?.setPropertyTypes([e.value])
                    }
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
                  {currentRtl === "ltr" ? "Property ID" : "معرف العقار"}
                </h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="RT04949213"
                    onChange={(e) =>
                      filterFunctions?.setpropertyId(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {currentRtl === "ltr" ? "Bedrooms" : "غرف النوم"}
                </h6>
                <div className="d-flex">
                  <Bedroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {currentRtl === "ltr" ? "Bathrooms" : "الحمامات"}
                </h6>
                <div className="d-flex">
                  <Bathroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
          </div>

          {/* Location and Square Feet */}
          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {currentRtl === "ltr" ? "Location" : "الموقع"}
                </h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[locationOptions[0]]}
                    name="colors"
                    styles={customStyles}
                    options={locationOptions}
                    className="select-custom filterSelect"
                    value={{
                      value: filterFunctions?.location,
                      label: filterFunctions?.location,
                    }}
                    classNamePrefix="select"
                    onChange={(e) => filterFunctions?.handlelocation(e.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {currentRtl === "ltr" ? "Square Feet" : "قدم مربع"}
                </h6>
                <div className="space-area">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control filterInput"
                        onChange={(e) => setMin(e.target.value)}
                        placeholder="Min."
                      />
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control filterInput"
                        placeholder="Max"
                        onChange={(e) => setMax(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">
                  {currentRtl === "ltr" ? "Amenities" : "المرافق"}
                </h6>
              </div>
            </div>
            <Amenities filterFunctions={filterFunctions} />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer justify-content-between">
          <button
            className="reset-button"
            onClick={() => filterFunctions?.resetFilter()}
          >
            <span className="flaticon-turn-back" />
            <u>
              {currentRtl === "ltr"
                ? "Reset all filters"
                : "إعادة تعيين جميع المرشحات"}
            </u>
          </button>
          <div className="btn-area">
            <button type="submit" className="ud-btn btn-thm">
              <span className="flaticon-search align-text-top pr10" />
              {currentRtl === "ltr" ? "Search" : "بحث"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
