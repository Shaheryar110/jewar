import { formatNumberWithComma } from "@/utilis/helpers";
import React from "react";

const PropertyDetails = ({ data, currentRtl }) => {
  const columns = [
    [
      {
        label: "Price",
        value: `$ ${formatNumberWithComma(data?.price)}`,
      },
      {
        label: "Property Size",
        value: `${data?.sizeInft} Sq meters `,
      },
      {
        label: "Bathrooms",
        value: data?.bathrooms,
      },
      {
        label: "Bedrooms",
        value: data?.rooms,
      },
    ],
    [
      {
        label: "Garage Size",
        value: `${data?.garageSize} Sq meters`,
      },
      {
        label: "Year",
        value: data?.yearBuilt,
      },
      {
        label: "Neighborhood",
        value: data?.neighborhood,
      },
      {
        label: "Property Type",
        value: data?.category[0]?.value,
      },
    ],
  ];
  const columnsAr = [
    [
      {
        label: "السعر",
        value: `$ ${formatNumberWithComma(data?.price)}`,
      },
      {
        label: "حجم العقار",
        value: `${data?.sizeInft} متر مربع`,
      },
      {
        label: "الحمامات",
        value: data?.bathrooms,
      },
      {
        label: "غرف النوم",
        value: data?.rooms,
      },
    ],
    [
      {
        label: "حجم المرآب",
        value: `${data?.garageSize} متر مربع`,
      },
      {
        label: "سنة البناء",
        value: data?.yearBuilt,
      },
      {
        label: "الحي",
        value: data?.neighborhood,
      },
      {
        label: "نوع العقار",
        value: data?.category[0]?.value,
      },
    ],
  ];

  return (
    <div className="row">
      {currentRtl === "ltr"
        ? columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`col-md-6 col-xl-4${
                columnIndex === 1 ? " offset-xl-2" : ""
              }`}
            >
              {column.map((detail, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <div className="pd-list">
                    <p className="fw600 mb10 ff-heading dark-color">
                      {detail.label}
                    </p>
                  </div>
                  <div className="pd-list">
                    <p className="text mb10">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        : columnsAr.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`col-md-6 col-xl-4${
                columnIndex === 1 ? " offset-xl-2" : ""
              }`}
            >
              {column.map((detail, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <div className="pd-list">
                    <p className="fw600 mb10 ff-heading dark-color">
                      {detail.label}
                    </p>
                  </div>
                  <div className="pd-list">
                    <p className="text mb10">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
    </div>
  );
};

export default PropertyDetails;
