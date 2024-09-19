"use client";
import { getAnemeites } from "@/services/cms";
import React, { useEffect, useState } from "react";

// const amenitiesData = [
//   { label: "Attic", defaultChecked: false },
//   { label: "Basketball court", defaultChecked: false },
//   { label: "Air Conditioning", defaultChecked: false },
//   { label: "Lawn", defaultChecked: false },
//   { label: "Swimming Pool", defaultChecked: false },
//   { label: "Barbeque", defaultChecked: false },
//   { label: "Microwave", defaultChecked: false },
//   { label: "TV Cable", defaultChecked: false },
//   { label: "Dryer", defaultChecked: false },
//   { label: "Outdoor Shower", defaultChecked: false },
//   { label: "Washer", defaultChecked: false },
//   { label: "Gym", defaultChecked: false },
//   { label: "Ocean view", defaultChecked: false },
//   { label: "Private space", defaultChecked: false },
//   { label: "Lake view", defaultChecked: false },
//   { label: "Wine cellar", defaultChecked: false },
//   { label: "Front yard", defaultChecked: false },
//   { label: "Refrigerator", defaultChecked: false },
//   { label: "WiFi", defaultChecked: false },
//   { label: "Laundry", defaultChecked: false },
//   { label: "Sauna", defaultChecked: false },
// ];

const Amenities = ({ handleChange, submitAddProperty, amenities }) => {
  const [amenitiesDataValues, setAmenitiesDataValues] = useState([]);

  useEffect(() => {
    getAnemeites().then((data) => {
      setAmenitiesDataValues(data);

      if (amenities) {
        const updatedAmenities = data.map((amenity) => {
          const selectedAmenity = amenities.find(
            (selected) => selected.label === amenity.label
          );
          return {
            ...amenity,
            defaultChecked: selectedAmenity
              ? selectedAmenity.defaultChecked
              : false,
          };
        });
        setAmenitiesDataValues(updatedAmenities);
      }
    });
  }, [amenities]);

  const handleCheckboxChange = (index) => {
    const updatedAmenitiesDataValues = [...amenitiesDataValues];
    updatedAmenitiesDataValues[index].defaultChecked =
      !updatedAmenitiesDataValues[index].defaultChecked;
    setAmenitiesDataValues(updatedAmenitiesDataValues);
    handleChange("amenitiesDataValues", updatedAmenitiesDataValues);
  };
  const dividedAmenities = [];
  for (let i = 0; i < amenitiesDataValues?.length; i += 3) {
    dividedAmenities.push(amenitiesDataValues?.slice(i, i + 3));
  }
  useEffect(() => {
    setAmenitiesDataValues(amenitiesDataValues);
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
      <div className="d-flex justify-content-end  w-full">
        <button
          className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
          onClick={() => submitAddProperty()}
        >
          Update Property
          <i className="fal fa-arrow-right-long" />
        </button>
      </div>
    </div>
  );
};

export default Amenities;
