import Image from "next/image";
import React from "react";



const EnergyClass = ({data}) => {
  const energyMetrics = [
    {
      label: "Global Energy Performance Index",
      value: "A+",
    },
    {
      label: "Energy Class",
      value: "92.42 kWh / m²a",
    },
    
  ];
  return (
    <>
      <div className="col-sm-12">
        {energyMetrics.map((metric, index) => (
          <div className="pd-list d-flex justify-content-between" key={index}>
            <p className="text mb10">{metric.label}</p>
            <p>{metric.value}</p>
          </div>
        ))}
      </div>
      <div className="col-lg-12 mt20">
        <Image
          width={736}
          height={94}
          className="w-100 contain"
          src="/images/resource/energy-class.png"
          alt=""
        />
      </div>
    </>
  );
};

export default EnergyClass;
