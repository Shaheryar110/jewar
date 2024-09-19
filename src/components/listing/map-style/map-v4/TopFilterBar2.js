import React, { useContext } from "react";
import PropertyType from "../../sidebar/PropertyType";
import PriceRange from "../../sidebar/PriceRange";
import Bedroom from "../../sidebar/Bedroom";
import Bathroom from "../../sidebar/Bathroom";
import ListingStatus from "../../sidebar/ListingStatus";
import { RtlContext } from "@/Context/RtlContext";
import { ApiContext } from "@/Context/ApiCallContext";

const TopFilterBar2 = ({ filterFunctions, setSearchQuery, value }) => {
  const { currentRtl } = useContext(RtlContext);
  const { data } = useContext(ApiContext);

  return (
    <>
      <li className="list-inline-item position-relative">
        <input
          type="text"
          className="form-control search-field"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={value}
          placeholder={
            currentRtl === "ltr" ? data?.search?.en : data?.search?.ar
          }
        />
      </li>
      {/* End Search Input */}

      <li className="list-inline-item position-relative">
        <button
          type="button"
          className="open-btn mb15 dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
        >
          {currentRtl === "ltr" ? data?.sale?.en : data?.sale?.ar}
          <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu">
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
            <h6 className="list-title">
              {currentRtl === "ltr"
                ? data?.listingSatus?.en
                : data?.listingSatus?.ar}
            </h6>
            <div className="radio-element">
              <ListingStatus filterFunctions={filterFunctions} />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            <button type="button" className="done-btn ud-btn btn-thm drop_btn">
              {currentRtl === "ltr" ? data?.done?.en : data?.done?.ar}
            </button>
          </div>
        </div>
      </li>
      {/* End Listing Status */}

      {/* Property Type Dropdown */}
      <li className="list-inline-item position-relative">
        <button
          type="button"
          className="open-btn mb15 dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
        >
          {currentRtl === "ltr"
            ? data?.propertyType?.en
            : data?.propertyType?.ar}
          <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu">
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
            <h6 className="list-title">
              {currentRtl === "ltr"
                ? data?.propertyType?.en
                : data?.propertyType?.ar}
            </h6>
            <div className="checkbox-style1">
              <PropertyType filterFunctions={filterFunctions} />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            <button
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              type="button"
              className="done-btn ud-btn btn-thm dropdown-toggle"
            >
              {currentRtl === "ltr" ? data?.done?.en : data?.done?.ar}
            </button>
          </div>
        </div>
      </li>
      {/* End Property Type */}

      {/* Price Range Dropdown */}
      <li className="list-inline-item position-relative">
        <button
          type="button"
          className="open-btn mb15 dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
        >
          {currentRtl === "ltr" ? data?.price?.en : data?.price?.ar}
          <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu dd3">
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
            <h6 className="list-title">
              {currentRtl === "ltr"
                ? data?.priceRange?.en
                : data?.priceRange?.ar}
            </h6>
            <div className="range-slider-style1">
              <PriceRange filterFunctions={filterFunctions} />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            <button type="button" className="done-btn ud-btn btn-thm drop_btn3">
              {currentRtl === "ltr" ? data?.done?.en : data?.done?.ar}
            </button>
          </div>
        </div>
      </li>
      {/* End Price Range */}

      {/* Beds / Baths Dropdown */}
      <li className="list-inline-item position-relative">
        <button
          type="button"
          className="open-btn mb15 dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
        >
          {currentRtl === "ltr"
            ? data?.bedsAndBaths?.en
            : data?.bedsAndBaths?.ar}
          <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu dd4 pb20">
          <div className="widget-wrapper pl20 pr20">
            <h6 className="list-title">
              {currentRtl === "ltr" ? data?.bedrooms?.en : data?.bedrooms?.ar}
            </h6>
            <div className="d-flex">
              <Bedroom filterFunctions={filterFunctions} />
            </div>
          </div>
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
            <h6 className="list-title">
              {currentRtl === "ltr" ? data?.bathrooms?.en : data?.bathrooms?.ar}
            </h6>
            <div className="d-flex">
              <Bathroom filterFunctions={filterFunctions} />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            <button type="button" className="done-btn ud-btn btn-thm drop_btn4">
              {currentRtl === "ltr" ? data?.done?.en : data?.done?.ar}
            </button>
          </div>
        </div>
      </li>
      {/* End Beds / Baths */}

      {/* More Filters Button */}
      <li className="list-inline-item">
        <button
          type="button"
          className="open-btn mb15"
          data-bs-toggle="modal"
          data-bs-target="#advanceSeachModal"
        >
          <i className="flaticon-settings me-2" />{" "}
          {currentRtl === "ltr" ? data?.filters?.en : data?.filters?.ar}
        </button>
      </li>
      {/* End More Filters */}
    </>
  );
};

export default TopFilterBar2;
