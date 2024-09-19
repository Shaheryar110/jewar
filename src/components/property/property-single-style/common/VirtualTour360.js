import Image from "next/image";
import React from "react";

const VirtualTour360 = ({ link }) => {
  return (
    <>
      <div className="col-md-12">
        <iframe className="h600 w-100" src={link} allowFullScreen />
      </div>
    </>
  );
};

export default VirtualTour360;
