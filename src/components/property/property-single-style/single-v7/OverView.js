import listings from "@/data/listings";
import React from "react";

const OverView = ({ id }) => {
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: data.bed,
    },
    {
      icon: "flaticon-shower",
      label: "Bath",
      value: data.bath,
    },
    {
      icon: "flaticon-event",
      label: "Year",
      value: data.yearBuilding,
    },
    {
      icon: "flaticon-garage",
      label: "Garage",
      value: "2",
    },
    {
      icon: "flaticon-expand",
      label: "Sqft",
      value: data.sqft,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: data.propertyType,
    },
  ];
  return (
    <>
      {overviewData.map((item, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-xl-2">
          <div className="overview-element dark-version mb25 d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0 text-white">{item.label}</h6>
              <p className="text mb-0 fz15 text-white">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
