import listings from "@/data/listings";
import React from "react";

const OverView = ({ id, data, currentRtl }) => {
  // const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: data?.bedrooms,
    },
    {
      icon: "flaticon-shower",
      label: "Bath",
      value: data?.bathrooms,
    },
    {
      icon: "flaticon-event",
      label: "Year",
      value: data?.yearBuilt,
    },
    {
      icon: "flaticon-garage",
      label: "Garage Size",
      value: data?.garageSize,
      xs: true,
    },
    {
      icon: "flaticon-expand",
      label: "Sq meters",
      value: data?.sizeInft,
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: data?.category[0].value,
    },
  ];
  const overviewDataAr = [
    {
      icon: "flaticon-bed",
      label: "غرف النوم",
      value: data?.bedrooms,
    },
    {
      icon: "flaticon-shower",
      label: "الحمامات",
      value: data?.bathrooms,
    },
    {
      icon: "flaticon-event",
      label: "سنة البناء",
      value: data?.yearBuilt,
    },
    {
      icon: "flaticon-garage",
      label: "حجم المرآب",
      value: data?.garageSize,
      xs: true,
    },
    {
      icon: "flaticon-expand",
      label: "متر مربع",
      value: data?.sizeInft,
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "نوع العقار",
      value: data?.category[0].value,
    },
  ];

  return (
    <>
      {currentRtl === "ltr"
        ? overviewData.map((item, index) => (
            <div
              key={index}
              className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
            >
              <div className="overview-element d-flex align-items-center">
                <span className={`icon ${item.icon}`} />
                <div className="ml15">
                  <h6 className="mb-0">{item.label}</h6>
                  <p className="text mb-0 fz15">{item.value}</p>
                </div>
              </div>
            </div>
          ))
        : overviewDataAr.map((item, index) => (
            <div
              key={index}
              className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
            >
              <div className="overview-element d-flex align-items-center">
                <span className={`icon ${item.icon}`} />
                <div className="ml15">
                  <h6 className="mb-0">{item.label}</h6>
                  <p className="text mb-0 fz15">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default OverView;
