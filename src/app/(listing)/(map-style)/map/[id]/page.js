"use client";

import { useSearchParams } from "next/navigation";
import DefaultHeader from "@/components/common/DefaultHeader";

import MobileMenu from "@/components/common/mobile-menu";

import PropertyFilteringMapFive from "@/components/listing/map-style/map-v4/PropertyFilteringMapFive";

import React, { useEffect, useState } from "react";

const MapV4 = () => {
  const [search, setSearch] = useState({
    City: "",
    Category: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    propertyId: "",
    propertyType: "",
    sqft: [],
    District: "",
  });
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("advanceSearch")) {
      let searching = JSON.parse(searchParams.get("advanceSearch"));
      setSearch((prev) => ({
        ...prev,
        City: searching.selectedLocation.label,
        Category: searching.selectedCategory.label,
        price: searching.priceRange,
        bedrooms: searching.selectedBed,
        bathrooms: searching.selectedBath,
        propertyId: searching.propertyId,
        sqft: searching.sqft,
        searchQuery: searchParams.get("search"),
        District: searchParams.get("District"),
      }));
    } else {
      setSearch((prev) => ({
        ...prev,
        City: searchParams.get("City"),
        Category: searchParams.get("Category"),
        propertyType: searchParams.get("propertyType"),
        searchQuery: searchParams.get("search"),
        District: searchParams.get("District"),
      }));
    }
  }, []);
  useEffect(() => {
    console.log(search, "search");
  }, [search]);

  return (
    <>
      <DefaultHeader />

      <MobileMenu />
      {/* End Mobile Nav  */}
      <PropertyFilteringMapFive paramData={search && search} />

      {/* Property Filtering */}
    </>
  );
};

export default MapV4;
