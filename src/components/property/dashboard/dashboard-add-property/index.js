"use client";
import React, { useContext, useEffect, useState } from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import { addPropertyService } from "@/services/propertyServices";

import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { addAnimites, getAnemeites } from "@/services/cms";
import { RtlContext } from "@/Context/RtlContext";
const AddPropertyTabContent = () => {
  const { currentRtl } = useContext(RtlContext);
  const [propertyData, setPropertyData] = useState({});
  const [disables, setDisables] = useState({
    desc: true,
    media: true,
    loc: false,
    det: false,
    amen: false,
  });
  const [active, setActive] = useState("Description");
  const [ameneties, setAmeneties] = useState();
  const router = useRouter();
  const handleChange = (name, value) => {
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };
  const submitAddProperty = () => {
    addPropertyService({ ...propertyData, status: "Pending" })
      .then((data) => {
        toast.success("Your Property is Added");
        setPropertyData({});
        router.push("/dashboard-my-properties");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAnemeites().then((data) => {
      setAmeneties(data);
    });
  }, []);

  const handleValidation = () => {
    const {
      name,
      description,
      category,
      listedInValue,
      price,
      videoFrom,
      videoId,
      virtualTour,
      uploadedImages,
      City,
      District,
      neighborhood,
      address,

      buildUpArea,
      lotSizeInft,
      rooms,
      bedrooms,
      bathrooms,

      garageSize,

      extraDetails,

      exteriorMaterial,
      owner,
    } = propertyData;
    if (active === "Description") {
      if (!name) {
        toast.error("Title is Required");
        return false;
      }
      if (!description) {
        toast.error("Description is Required");
        return false;
      }
      if (!price) {
        toast.error("Price is Required");
        return false;
      }
      if (!category) {
        toast.error("Category is Required");
        return false;
      }
      if (!listedInValue) {
        toast.error("Listed in is Required");
        return false;
      }
      disables.loc = true;
      return true;
    }
    //media

    if (active === "Media") {
      console.log(uploadedImages, "uploadedImages");
      if (uploadedImages.length < 1) {
        toast.error("File is Required");
        return false;
      }
      if (videoId && !videoId.startsWith("https")) {
        toast.error("Link should be https");
        return false;
      }
      disables.det = true;
      return true;
    }

    //location

    if (active === "Location") {
      if (!address) {
        toast.error("Address is Required");
        return false;
      }
      if (!neighborhood) {
        toast.error("Street Name is Required");
        return false;
      }
      if (!District) {
        toast.error("District is Required");
        return false;
      }
      if (!City) {
        toast.error("City is Required");
        return false;
      }
      disables.amen = true;
      return true;
    }

    if (active === "Detail") {
      if (!buildUpArea) {
        toast.error("buildUpArea is Required");
        return false;
      }
      if (!lotSizeInft) {
        toast.error("lotSizeInft is Required");
        return false;
      }
      if (!rooms) {
        toast.error("rooms is Required");
        return false;
      }
      if (!bedrooms) {
        toast.error("bedrooms is Required");
        return false;
      }
      if (!bathrooms) {
        toast.error("bathrooms  is Required");
        return false;
      }
      if (!garageSize) {
        toast.error("garageSize  is Required");
        return false;
      }
      if (!extraDetails) {
        toast.error("extraDetails  is Required");
        return false;
      }
      if (!exteriorMaterial) {
        toast.error("exteriorMaterial  is Required");
        return false;
      }
      if (!owner) {
        toast.error("owner in is Required");
        return false;
      }

      return true;
    }
  };
  return (
    <>
      <nav>
        <div
          className="nav nav-tabs "
          id="nav-tab2"
          role="tablist"
          style={{ borderBottom: "0px solid white !important" }}
        >
          <button
            className={`nav-link  fw600 ms-3 ${
              active == "Description" ? "active" : ""
            } `}
            // id="nav-item1-tab"
            // data-bs-toggle="tab"
            // data-bs-target="#nav-item1"
            onClick={() => setActive("Description")}
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected="true"
          >
            {currentRtl === "ltr" ? "1. Description" : "1. الوصف"}
          </button>
          <button
            className={`nav-link fw600 ${active == "Media" ? "active" : ""} `}
            // id="nav-item2-tab"
            // data-bs-toggle="tab"
            // data-bs-target="#nav-item2"
            onClick={() => {
              const isValid = handleValidation();
              console.log(isValid, "valid");
              if (isValid) {
                setActive("Media");
              }
            }}
            type="button"
            role="tab"
            aria-controls="nav-item2"
            aria-selected="false"
          >
            {currentRtl === "ltr" ? " 2. Media" : "2. وسائل الإعلام"}
          </button>
          <button
            className={`nav-link fw600 ${
              active == "Location" ? "active" : ""
            } `}
            // id="nav-item3-tab"
            // data-bs-toggle="tab"
            // data-bs-target="#nav-item3"
            onClick={() => {
              const isValid = handleValidation();

              if (isValid) {
                setActive("Location");
              }
            }}
            disabled={!disables.loc}
            type="button"
            role="tab"
            aria-controls="nav-item3"
            aria-selected="false"
          >
            {currentRtl === "ltr" ? "3. Location" : "3. الموقع"}
          </button>
          <button
            className={`nav-link fw600 ${active == "Detail" ? "active" : ""} `}
            // id="nav-item4-tab"
            // data-bs-toggle="tab"
            // data-bs-target="#nav-item4"
            type="button"
            role="tab"
            aria-controls="nav-item4"
            aria-selected="false"
            disabled={!disables.det}
            onClick={() => {
              const isValid = handleValidation();

              if (isValid) {
                setActive("Detail");
              }
            }}
          >
            {currentRtl === "ltr" ? "4. Detail" : "4. التفاصيل"}
          </button>
          <button
            className={`nav-link fw600 ${
              active == "Amenities" ? "active" : ""
            } `}
            // id="nav-item5-tab"
            // data-bs-toggle="tab"
            // data-bs-target="#nav-item5"
            type="button"
            role="tab"
            aria-controls="nav-item5"
            aria-selected="false"
            disabled={!disables.amen}
            onClick={() => {
              const isValid = handleValidation();

              if (isValid) {
                setActive("Amenities");
              }
            }}
          >
            {currentRtl === "ltr" ? "5. Amenities" : "5. وسائل الراحة"}
          </button>
        </div>
      </nav>
      {/* End nav tabs */}

      <div className="tab-content" id="nav-tabContent">
        {active === "Description" && (
          <div
            className={`tab-pane fade show  ${
              active === "Description" && "active"
            } `}
            id="nav-item1"
            role="tabpanel"
            aria-labelledby="nav-item1-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">
                {" "}
                {currentRtl === "ltr"
                  ? "Property Description"
                  : "وصف العقار"}{" "}
              </h4>
              <PropertyDescription
                handleChange={handleChange}
                price={propertyData?.price}
                yearlyTaxRate={propertyData?.yearlyTaxRate}
                afterPriceLabel={propertyData?.afterPriceLabel}
                name={propertyData?.name}
                description={propertyData?.description}
                category={propertyData?.category}
                listedInValue={propertyData?.listedInValue}
                status={propertyData?.status}
                currentRtl={currentRtl}
              />
              <nav>
                <div
                  // className="d-flex justify-content-end  w-full"
                  className="nav customTabs d-flex justify-content-end  w-full"
                  id="nav-tab2"
                  role="tablist"
                >
                  <button
                    id="nav-item2-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-item2"
                    type="button"
                    role="tab"
                    className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
                    onClick={() => {
                      const isValid = handleValidation();

                      if (isValid) {
                        setActive("Media");
                      }
                    }}
                  >
                    {currentRtl === "ltr" ? "Next" : "التالي"}{" "}
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
        {/* End tab for Property Description */}

        {active === "Media" && (
          <div
          // className={`tab-pane fade active  ${
          //   active === "Media" && "active"
          // } `}
          // id="nav-item2"
          // role="tabpanel"
          // aria-labelledby="nav-item2-tab"
          >
            <UploadMedia
              handleChange={handleChange}
              videoFrom={propertyData?.videoFrom}
              videourl={propertyData?.videourl}
              virtualTour={propertyData?.virtualTour}
              currentRtl={currentRtl}
            />
            <nav>
              <div
                // className="d-flex justify-content-end  w-full"
                className="nav customTabs d-flex justify-content-end  w-full"
                id="nav-tab2"
                role="tablist"
              >
                <button
                  id="nav-item3-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-item3"
                  type="button"
                  role="tab"
                  className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
                  onClick={() => {
                    const isValid = handleValidation();

                    if (isValid) {
                      setActive("Location");
                    }
                  }}
                >
                  {currentRtl === "ltr" ? "Next" : "التالي"}
                  <i className="fal fa-arrow-right-long" />
                </button>
              </div>
            </nav>
          </div>
        )}
        {/* End tab for Upload photos of your property */}

        {active === "Location" && (
          <div
          // className={`tab-pane fade  ${active === "Location" && "active"} `}
          // id="nav-item3"
          // role="tabpanel"
          // aria-labelledby="nav-item3-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">
                {currentRtl === "ltr" ? "Listing Location" : "موقع القائمة"}
              </h4>
              <LocationField
                handleChange={handleChange}
                address={propertyData?.address}
                zip={propertyData?.zip}
                neighborhood={propertyData?.neighborhood}
                coord={propertyData?.coord}
                City={propertyData.City}
                District={propertyData.District}
                propertyData={propertyData}
                setPropertyData={setPropertyData}
                currentRtl={currentRtl}
              />
              <nav>
                <div
                  className="nav customTabs d-flex justify-content-end  w-full"
                  id="nav-tab2"
                  role="tablist"
                >
                  <button
                    id="nav-item4-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-item4"
                    type="button"
                    role="tab"
                    className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
                    onClick={() => {
                      const isValid = handleValidation();

                      if (isValid) {
                        setActive("Detail");
                      }
                    }}
                  >
                    {currentRtl === "ltr" ? "Next" : "التالي"}
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
        {/* End tab for Listing Location */}

        {active === "Detail" && (
          <div
          // className="tab-pane fade"
          // id="nav-item4"
          // role="tabpanel"
          // aria-labelledby="nav-item4-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">
                {currentRtl === "ltr" ? "Listing Details" : "تفاصيل قائمة"}
              </h4>
              <DetailsFiled
                handleChange={handleChange}
                sizeInft={propertyData?.buildUpArea}
                lotSizeInft={propertyData?.lotSizeInft}
                rooms={propertyData?.rooms}
                bedrooms={propertyData?.bedrooms}
                bathrooms={propertyData?.bathrooms}
                customId={propertyData?.customId}
                garages={propertyData?.garages}
                garageSize={propertyData?.garageSize}
                yearBuilt={propertyData?.yearBuilt}
                availableFrom={propertyData?.availableFrom}
                basement={propertyData?.basement}
                extraDetails={propertyData?.extraDetails}
                roofing={propertyData?.roofing}
                exteriorMaterial={propertyData?.exteriorMaterial}
                owner={propertyData?.owner}
                currentRtl={currentRtl}
              />
              <nav>
                <div
                  // className="d-flex justify-content-end  w-full"
                  className="nav customTabs d-flex justify-content-end  w-full"
                  id="nav-tab2"
                  role="tablist"
                >
                  <button
                    id="nav-item4-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-item5"
                    type="button"
                    role="tab"
                    className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
                    onClick={() => {
                      const isValid = handleValidation();

                      if (isValid) {
                        setActive("Amenities");
                      }
                    }}
                  >
                    {currentRtl === "ltr" ? "Next" : "التالي"}
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
        {/* End tab for Listing Details */}

        {active === "Amenities" && ameneties?.length > 0 && (
          <div
          // className="tab-pane fade"
          // id="nav-item5"
          // role="tabpanel"
          // aria-labelledby="nav-item5-tab"
          >
            {/* {console.log(ameneties, "ameneties")} */}
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">
                {currentRtl === "ltr" ? "Select Amenities" : "حدد وسائل الراحة"}
              </h4>
              <div className="row">
                <Amenities
                  handleChange={handleChange}
                  submitAddProperty={submitAddProperty}
                  amenities={ameneties}
                  currentRtl={currentRtl}
                />
              </div>
            </div>
          </div>
        )}
        {/* End tab for Select Amenities */}
        <div
          style={{
            width: "100%",
            marginY: "2rem",
            display: "flex",
            justifyContent: "end",
          }}
        ></div>
      </div>
    </>
  );
};

export default AddPropertyTabContent;
