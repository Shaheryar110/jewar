"use client";
import React from "react";
import Select from "react-select";

const options = {
  districts: [
    "Al-Malaz",
    "Al-Ma'ather",
    "Al-Olaya",
    "Al-Aziziyyah",
    "Al-Bat'ha",
    "Al-Dhubbat",
    "Al-Dir'iyyah",
    "Al-Fayhaa",
    "Al-Ghadeer",
    "Al-Ha'ir",
    "Al-Hair Road",
    "Al-Hamra",
    "Al-Izdihar",
    "Al-Kharj Road",
    "Al-Khozama",
    "Al-Ma'athar Ash Shamali",
    "Al-Mansouriyah",
    "Al-Mugharrazat",
    "Al-Mursalat",
    "Al-Muruj",
    "Al-Nafal",
    "Al-Nahdah",
    "Al-Naseem",
    "Al-Oyaina",
    "Al-Qadisiyyah",
    "Al-Quds",
    "Al-Rabwah",
    "Al-Rahmaniyah",
    "Al-Rawdah",
    "Al-Rimal",
    "Al-Riyadh Al-Khabra",
    "Al-Selayy",
    "Al-Shifa",
    "Al-Sulaymaniyah",
    "Al-Takhasusi",
    "Al-Waha",
    "Al-Warood",
    "Al-Wazarat",
    "Al-Wurud",
    "An Narjis",
    "Dhahrat Laban",
    "King Abdullah Financial District",
    "Manfouha",
    "Mursalat",
    "Qurtubah",
    "Qusur",
    "Rafha",
    "Rayyan",
    "Salam",
    "Shubra",
    "Suwaidi",
    "Umm Al-Hammam",
    "Umm Al-Joud",
    "Umm Salim",
    "Umm Suqeim",
    "Wadi Laban",
    "Yarmouk",
  ],
  cities: ["Riyadh"],
};

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#527FE2"
        : isHovered
        ? "#527FE212"
        : isFocused
        ? "#527FE212"
        : undefined,
    };
  },
};

const SelectMultiField = ({ handleChange }) => {
  const fieldTitles = ["District", "City"];
  return (
    <>
      {Object.keys(options).map((key, index) => (
        <div className="col-sm-6 col-xl-4" key={index}>
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {fieldTitles[index]}
            </label>
            <div className="location-area">
              <Select
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                options={options[key].map((item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={(e) => handleChange(fieldTitles[index], e)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SelectMultiField;
