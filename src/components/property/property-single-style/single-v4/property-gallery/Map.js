import ListingMap1 from "@/components/listing/map-style/ListingMap1";
import React from "react";

const Map = ({ data }) => {
  const properties = data?.map((item) => ({
    id: item.id,
    image:
      item?.propertyFeilds?.uploadedImages &&
      item?.propertyFeilds?.uploadedImages?.length > 0
        ? item?.propertyFeilds?.uploadedImages[0]
        : "",
    title: item?.propertyFeilds?.name,
    city:
      item?.propertyFeilds?.City && item?.propertyFeilds?.City.length > 0
        ? item?.propertyFeilds?.City[0]?.value
        : "",
    location:
      item?.propertyFeilds?.Country && item?.propertyFeilds?.Country.length > 0
        ? item?.propertyFeilds?.Country[0]?.value
        : "",
    lat: item?.propertyFeilds?.coord.lat,
    long: item?.propertyFeilds?.coord.lng,
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
    featured: true,
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
        ? item?.propertyFeilds?.amenitiesDataValues.map((item) => item.label)
        : [],
  }));
  return (
    <div style={{ height: "600px" }}>
      <ListingMap1 listedData={properties} />
    </div>
  );
};

export default Map;
