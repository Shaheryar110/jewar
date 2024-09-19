"use client";
import React, { useEffect, useState } from "react";

const Amenities = ({
  handleChange,
  submitAddProperty,
  amenities,
  currentRtl,
}) => {
  const [amenitiesDataValues, setAmenitiesDataValues] = useState(amenities);

  const handleCheckboxChange = (index) => {
    const updatedAmenitiesDataValues = [...amenitiesDataValues];
    updatedAmenitiesDataValues[index].defaultChecked =
      !updatedAmenitiesDataValues[index].defaultChecked;
    setAmenitiesDataValues(updatedAmenitiesDataValues);
    handleChange("amenitiesDataValues", updatedAmenitiesDataValues);
  };

  // Divide the amenities into groups of three
  const dividedAmenities = [];
  for (let i = 0; i < amenitiesDataValues?.length; i += 3) {
    dividedAmenities.push(amenitiesDataValues?.slice(i, i + 3));
  }
  useEffect(() => {
    setAmenitiesDataValues(amenities);
  }, [amenities]);

  return (
    <div>
      {dividedAmenities.map((group, groupIndex) => (
        <div className="row" key={groupIndex}>
          {group.map((amenity, index) => (
            <div className="col-sm-4" key={index}>
              <label className="custom_checkbox">
                {amenity.label}
                <input
                  type="checkbox"
                  checked={amenity.defaultChecked}
                  onChange={() => handleCheckboxChange(index + groupIndex * 3)}
                />
                <span className="checkmark" />
              </label>
            </div>
          ))}
        </div>
      ))}
      <div className="d-flex justify-content-end w-full">
        <button
          className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
          onClick={submitAddProperty}
        >
          {currentRtl === "ltr" ? "Add Property" : "أضف خاصية"}

          <i className="fal fa-arrow-right-long" />
        </button>
      </div>
    </div>
  );
};

export default Amenities;
