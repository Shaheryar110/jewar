"use client";
import {
  getAllProperty,
  updatePropertyById,
} from "@/services/propertyServices";
import { getAllUsers } from "@/services/user";
import { Chip, MenuItem } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import { Tooltip as ReactTooltip } from "react-tooltip";
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
const PropertyDataTable = ({ currentRtl }) => {
  const [Data, setPData] = useState();
  const handleChange = (e, index, docId) => {
    console.log(e);

    setPData((prevData) => {
      const newData = [...prevData];
      newData[index].propertyFeilds.status = e;
      newData[index].propertyFeilds.status = e;
      return newData;
    });
    // console.log(Data[index]);
    updatePropertyById(docId, Data[index])
      .then((data) => toast.success("Updated Successfully"))
      .catch((err) => toast.error("Not Updated Successfully"));
  };
  const handleChangeFeature = (e, index, docId) => {
    console.log(e);

    setPData((prevData) => {
      const newData = [...prevData];
      newData[index].propertyFeilds.isFeatured = e;
      newData[index].propertyFeilds.isFeatured = e;
      return newData;
    });
    // console.log(Data[index]);
    updatePropertyById(docId, Data[index])
      .then((data) => toast.success("Updated Successfully"))
      .catch((err) => toast.error("Not Updated Successfully"));
  };
  const handleChangePopular = (e, index, docId) => {
    console.log(e);

    setPData((prevData) => {
      const newData = [...prevData];
      newData[index].propertyFeilds.isPopular = e;
      newData[index].propertyFeilds.isPopular = e;
      return newData;
    });
    // console.log(Data[index]);
    updatePropertyById(docId, Data[index])
      .then((data) => toast.success("Updated Successfully"))
      .catch((err) => toast.error("Not Updated Successfully"));
  };
  useEffect(() => {
    getAllProperty().then((data) => setPData(data));
  }, []);
  useEffect(() => {
    console.log(Data, "on change");
  }, [Data]);
  const options = ["Published", "Rejected", "Pending"];
  const featured = ["Yes", "No"];
  const Popular = ["Yes", "No"];
  return (
    <table
      className="table-style3 table at-savesearch"
      style={{ width: "100%" }}
    >
      <thead className="t-head" style={{ width: "100%" }}>
        <tr>
          <th scope="col">
            {currentRtl === "ltr" ? "Property Image" : "صورة العقار"}
          </th>
          <th scope="col">
            {currentRtl === "ltr" ? "Property Name" : "اسم العقار"}
          </th>
          <th scope="col">{currentRtl === "ltr" ? "Views" : "المشاهدات"}</th>
          <th scope="col">
            {currentRtl === "ltr" ? " City/District" : "المدينة/الحي"}
          </th>
          <th scope="col">{currentRtl === "ltr" ? "Featured" : "مميز"}</th>

          <th scope="col">
            {currentRtl === "ltr" ? "Property Status" : "حالة العقار"}
          </th>
        </tr>
      </thead>
      <tbody className="t-body" style={{ width: "100%" }}>
        {Data?.map((property, index) => (
          <tr key={index} style={{ width: "100%" }}>
            <th scope="row" style={{ width: "20%" }}>
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">
                  <Image
                    width={110}
                    height={94}
                    className="cover"
                    src={
                      property?.propertyFeilds.uploadedImages[0]
                        ? property?.propertyFeilds.uploadedImages[0]
                        : "/images/paris.svg"
                    }
                    alt="property"
                  />
                </div>
              </div>
            </th>
            <td className="vam" style={{ width: "50%" }}>
              {property?.propertyFeilds.name
                ? property?.propertyFeilds.name
                : "No Name Found"}
            </td>
            <td className="vam" style={{ width: "50%" }}>
              {property?.views ? property?.views : 0}
            </td>
            <td className="vam" style={{ width: "20%" }}>
              {property?.propertyFeilds?.City
                ? property?.propertyFeilds?.City?.label
                : null}{" "}
              /{" "}
              {property?.propertyFeilds?.District
                ? property?.propertyFeilds?.District?.label
                : null}
            </td>
            <td className="vam">
              <div className="col-sm-6 col-xl-4" style={{ width: "150px" }}>
                <div className="mb20">
                  <label
                    className="heading-color ff-heading fw600 mb10"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    Featured{" "}
                    <Chip
                      color={
                        property?.propertyFeilds.isFeatured &&
                        property?.propertyFeilds.isFeatured == "Yes"
                          ? "success"
                          : "error"
                      }
                      label={
                        property?.propertyFeilds.isFeatured
                          ? property?.propertyFeilds.isFeatured
                          : "NO"
                      }
                    />
                  </label>
                  <div className="location-area">
                    <Select
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      required
                      isMulti={false}
                      options={featured.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      onChange={(e) => {
                        handleChangeFeature(e.label, index, property.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </td>

            <td className="vam">
              <div className="col-sm-6 col-xl-4" style={{ width: "150px" }}>
                <div className="mb20">
                  <label
                    className="heading-color ff-heading fw600 mb10"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    Status{" "}
                    <Chip
                      color={
                        property?.propertyFeilds.status &&
                        property?.propertyFeilds.status == "Published"
                          ? "success"
                          : property?.propertyFeilds.status == "Rejected"
                          ? "error"
                          : "warning"
                      }
                      label={
                        property?.propertyFeilds.status
                          ? property?.propertyFeilds.status
                          : "NO STATUS"
                      }
                    />
                  </label>
                  <div className="location-area">
                    <Select
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      required
                      isMulti={false}
                      options={options.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      //   value={property?.propertyFeilds.status[0].label}
                      onChange={(e) => {
                        console.log(e);
                        handleChange(e.label, index, property.id);
                      }}
                    />
                    {/* <MenuItem value={"Published"}>Published</MenuItem>
                      <MenuItem value={"Rejected"}>Rejected</MenuItem>
                      <MenuItem value={"Pending"}>Pending</MenuItem> */}
                    {/* </Select> */}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyDataTable;
