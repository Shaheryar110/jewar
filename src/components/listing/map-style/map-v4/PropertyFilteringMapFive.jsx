"use client";

import listings from "@/data/listings";
import React, { useState, useEffect, useContext } from "react";
import TopFilterBar2 from "./TopFilterBar2";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";

import PaginationTwo from "../../PaginationTwo";
import ListingMap1 from "../ListingMap1";
import { getAllProperty } from "@/services/propertyServices";
import { RtlContext } from "@/Context/RtlContext";

export default function PropertyFilteringMapFive({ paramData }) {
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);
  const { currentRtl } = useContext(RtlContext);
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [listingStatus, setListingStatus] = useState("All");
  const [propertyTypes, setPropertyTypes] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [District, setDistrict] = useState("All");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice((pageNumber - 1) * 4, pageNumber * 4)
    );
    setPageContentTrac([
      (pageNumber - 1) * 4 + 1,
      pageNumber * 4,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);
  useEffect(() => {
    if (paramData?.Category) {
      setPropertyTypes([paramData.Category]);
    }
    if (paramData.City) {
      setLocation(paramData.City);
    }
    if (paramData.District) {
      setDistrict(paramData.District);
    }
    if (paramData?.sqft?.length > 0) {
      setSquirefeet(paramData?.sqft);
    }
    if (paramData.bedrooms > 0) {
      setBedrooms(paramData.bedrooms);
    }
    if (paramData.bathrooms > 0) {
      setBathroms(paramData.bathrooms);
    }
    if (paramData?.price?.length > 0) {
      setPriceRange(paramData.price);
    }
    if (paramData?.searchQuery !== "") {
      setSearchQuery(paramData.searchQuery);
    }
  }, [paramData]);
  const resetFilter = () => {
    setListingStatus("All");
    setPropertyTypes("All");
    setPriceRange([0, 1000000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setyearBuild([]);
    setCategories([]);
    setCurrentSortingOption("Newest");

    setSearchQuery("");
    document.querySelectorAll(".filterSelect").forEach(function (element) {
      element.value = "All Cities";
    });
    getPropertyData();
  };

  const handlelistingStatus = (elm) => {
    setListingStatus((pre) => (pre == elm ? "All" : elm));
  };

  const handlepropertyTypes = (elm) => {
    if (elm == "All") {
      setPropertyTypes("All");
    } else {
      setPropertyTypes((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };
  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };
  const handlebedrooms = (elm) => {
    setBedrooms(elm);
  };
  const handlebathroms = (elm) => {
    setBathroms(elm);
  };
  const handlelocation = (elm) => {
    setLocation(elm);
  };
  const handlesquirefeet = (elm) => {
    setSquirefeet(elm);
  };
  const handleyearBuild = (elm) => {
    setyearBuild(elm);
  };
  const handlecategories = (elm) => {
    if (elm == "All") {
      setCategories([]);
    } else {
      setCategories((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };
  const filterFunctions = {
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    District,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery,
  };

  useEffect(() => {
    let filteredItems = allData.filter((elm) => {
      if (listingStatus === "All") {
        return true;
      } else if (listingStatus === "Buy") {
        return !elm.forRent;
      } else if (listingStatus === "Rent") {
        return elm.forRent;
      }
    });
    if (propertyTypes.length > 0) {
      filteredItems = filteredItems.filter((elm) => {
        if (propertyTypes.includes("All")) return true;
        return propertyTypes.includes(elm.propertyType);
      });
    }

    if (bedrooms > 0) {
      filteredItems = filteredItems.filter((elm) => elm.bed >= bedrooms);
    }

    if (bathroms > 0) {
      filteredItems = filteredItems.filter((elm) => elm.bath >= bathroms);
    }

    if (searchQuery?.trim() !== "" && searchQuery?.length > 0) {
      const query = searchQuery?.toLowerCase()?.trim();
      filteredItems = filteredItems.filter(
        (elm) =>
          elm.city.toLowerCase().includes(query) ||
          elm.location.toLowerCase().includes(query) ||
          elm.title.toLowerCase().includes(query) ||
          elm.features.some((feature) =>
            feature.toLowerCase().includes(query)
          ) ||
          elm.District.toLowerCase().includes(query)
      );
    }

    if (location !== "All Cities") {
      filteredItems = filteredItems.filter((elm) => elm.city === location);
    }
    if (District !== "All") {
      filteredItems = filteredItems.filter((elm) => elm.District === District);
    }

    setFilteredData(filteredItems);
  }, [
    allData,
    listingStatus,
    propertyTypes,
    bedrooms,
    bathroms,
    location,
    District,
    priceRange,
    squirefeet,
    searchQuery,
  ]);

  const getPropertyData = () => {
    getAllProperty(true)
      .then((data) => {
        setFilteredData(
          data.map((item) => ({
            id: item.id,
            image:
              item?.propertyFeilds?.uploadedImages &&
              item?.propertyFeilds?.uploadedImages?.length > 0
                ? item?.propertyFeilds?.uploadedImages[0]
                : "",
            title: item?.propertyFeilds?.name,
            city:
              item?.propertyFeilds?.City &&
              item?.propertyFeilds?.City.length > 0
                ? item?.propertyFeilds?.City[0]?.value
                : "",
            District: item?.propertyFeilds?.District
              ? item?.propertyFeilds?.District?.value
              : "",
            location:
              item?.propertyFeilds?.Country &&
              item?.propertyFeilds?.Country.length > 0
                ? item?.propertyFeilds?.Country[0]?.value
                : "",
            lat: Number(item?.propertyFeilds?.coord.lat),
            long: Number(item?.propertyFeilds?.coord.lng),
            bed: item?.propertyFeilds?.bedrooms,
            bath: item?.propertyFeilds?.bathrooms,
            sqft: item?.propertyFeilds?.sizeInft,
            price: item?.propertyFeilds?.price,
            forRent:
              item?.propertyFeilds?.listedInValue &&
              item?.propertyFeilds?.listedInValue.length > 0
                ? item?.propertyFeilds?.listedInValue[0]?.value === "Rent"
                  ? true
                  : false
                : false,
            featured: item?.propertyFeilds?.isFeatured === "Yes" ? true : false,
            propertyType:
              item?.propertyFeilds?.category &&
              item?.propertyFeilds?.category?.length > 0
                ? item?.propertyFeilds?.category[0]?.value
                : "",
            yearBuilding: item?.propertyFeilds?.yearBuilt,
            tags: ["house", "office"],
            features:
              item?.propertyFeilds?.amenitiesDataValues &&
              item?.propertyFeilds?.amenitiesDataValues.length > 0
                ? item?.propertyFeilds?.amenitiesDataValues.map(
                    (item) => item.label
                  )
                : [],
          }))
        );
        setAllData(
          data.map((item) => ({
            id: item.id,
            image:
              item?.propertyFeilds?.uploadedImages &&
              item?.propertyFeilds?.uploadedImages?.length > 0
                ? item?.propertyFeilds?.uploadedImages[0]
                : "",
            title: item?.propertyFeilds?.name,
            city:
              item?.propertyFeilds?.City &&
              item?.propertyFeilds?.City.length > 0
                ? item?.propertyFeilds?.City[0]?.value
                : "",
            District: item?.propertyFeilds?.District
              ? item?.propertyFeilds?.District?.value
              : "",
            location:
              item?.propertyFeilds?.Country &&
              item?.propertyFeilds?.Country.length > 0
                ? item?.propertyFeilds?.Country[0]?.value
                : "",
            lat: Number(item?.propertyFeilds?.coord.lat),
            long: Number(item?.propertyFeilds?.coord.lng),
            bed: item?.propertyFeilds?.bedrooms,
            bath: item?.propertyFeilds?.bathrooms,
            sqft: item?.propertyFeilds?.sizeInft,
            price: item?.propertyFeilds?.price,
            forRent:
              item?.propertyFeilds?.listedInValue &&
              item?.propertyFeilds?.listedInValue.length > 0
                ? item?.propertyFeilds?.listedInValue[0]?.value === "Rent"
                  ? true
                  : false
                : false,
            featured: item?.propertyFeilds?.isFeatured === "Yes" ? true : false,
            propertyType:
              item?.propertyFeilds?.category &&
              item?.propertyFeilds?.category?.length > 0
                ? item?.propertyFeilds?.category[0]?.value
                : "",
            yearBuilding: item?.propertyFeilds?.yearBuilt,
            tags: ["house", "office"],
            features:
              item?.propertyFeilds?.amenitiesDataValues &&
              item?.propertyFeilds?.amenitiesDataValues.length > 0
                ? item?.propertyFeilds?.amenitiesDataValues.map(
                    (item) => item.label
                  )
                : [],
          }))
        );
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPropertyData();
  }, []);
  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption == "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) => a.yearBuilding - b.yearBuilding
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price Low") {
      const sorted = [...filteredData].sort((a, b) => b.price - a.price);
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price High") {
      const sorted = [...filteredData].sort((a, b) => a.price - b.price);
      setSortedFilteredData(sorted);
    } else {
      setSortedFilteredData(filteredData);
    }
  }, [filteredData, currentSortingOption]);
  return (
    <>
      <section className="advance-search-menu bg-white position-relative default-box-shadow2 pt15 pb5 bb1 dn-992">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="advance-search-list no-box-shadow d-flex justify-content-center">
                <div className="dropdown-lists">
                  <ul className="p-0 mb-0">
                    <TopFilterBar2
                      filterFunctions={filterFunctions}
                      setSearchQuery={setSearchQuery}
                      value={searchQuery}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End container-fluid */}

        {/* <!-- Advance Feature Modal Start --> */}
        <div className="advance-feature-modal">
          <div
            className="modal fade"
            id="advanceSeachModal"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="true"
          >
            <AdvanceFilterModal filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* <!-- Advance Feature Modal End --> */}
      </section>

      {/* Property Filtering */}
      <section className="p-0 bgc-f7">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="200">
            <div className="col-xl-7 overflow-hidden position-relative">
              <div className="half_map_area map-canvas half_style">
                <ListingMap1 listedData={pageItems} />
              </div>
            </div>
            {/* End col-7 */}

            <div className="col-xl-5">
              <div className="half_map_area_content mt30">
                {currentRtl === "ltr" && (
                  <h4 className="mb-1">
                    {paramData?.District
                      ? `Properties in ${paramData?.District}`
                      : paramData?.Category
                      ? `${paramData?.Category}`
                      : "All Properties"}
                  </h4>
                )}
                {currentRtl === "rtl" && (
                  <h4 className="mb-1">
                    {paramData?.District
                      ? `الخصائص ${paramData?.District}`
                      : paramData?.Category
                      ? `${paramData?.Category}`
                      : "كل الخصائص"}
                  </h4>
                )}

                <div className="row align-items-center mb10">
                  <TopFilterBar
                    pageContentTrac={filteredData.length}
                    colstyle={colstyle}
                    setColstyle={setColstyle}
                    setCurrentSortingOption={setCurrentSortingOption}
                  />
                </div>
                <div className="row">
                  <FeaturedListings colstyle={colstyle} data={pageItems} />
                </div>
                {/* End .row */}

                <div className="row text-center">
                  <PaginationTwo
                    pageCapacity={4}
                    data={sortedFilteredData}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                </div>
                {/* End .row */}
              </div>
              {/* End .half_map_area_content */}
            </div>
            {/* End col-5 */}
          </div>
          {/* End TopFilterBar */}
        </div>
        {/* End .container */}
      </section>
    </>
  );
}
