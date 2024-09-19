"use client";
import React, { useEffect, useState } from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import {
  addPropertyService,
  updatePropertyById,
} from "@/services/propertyServices";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
const AddPropertyTabContent = ({ property }) => {
  const [propertyData, setPropertyData] = useState();
  const [disables, setDisables] = useState({
    desc: true,
    media: true,
    loc: false,
    det: false,
    amen: false,
  });
  const [active, setActive] = useState("Description");
  const router = useRouter();
  const handleChange = (name, value) => {
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

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
    if (active === "Amenities") {
      return true;
    }
  };
  const submitAddProperty = () => {
    console.log(property);
    updatePropertyById(property?.id, {
      ...property,
      propertyFeilds: { ...propertyData, status: "Pending" },
    })
      .then((data) => {
        toast.success("Your Property is Updated");
        setPropertyData({});
        router.push("/dashboard-my-properties");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setPropertyData(property?.propertyFeilds);
    // console.log(propertyData?.uploadedImages, "propertyData?.uploadedImages");
  }, [property]);
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
            1. Description
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
            2. Media
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
            3. Location
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
            4. Detail
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
            5. Amenities
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
              <h4 className="title fz17 mb30">Property Description</h4>
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
                    Next
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
              uploadedImages={
                propertyData?.uploadedImages ? propertyData?.uploadedImages : []
              }
              handleChange={handleChange}
              videoFrom={propertyData?.videoFrom}
              videoId={propertyData?.videoId}
              virtualTour={propertyData?.virtualTour}
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
                  Next
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
              <h4 className="title fz17 mb30">Listing Location</h4>
              <LocationField
                handleChange={handleChange}
                address={propertyData?.address}
                zip={propertyData?.zip}
                neighborhood={propertyData?.neighborhood}
                coord={propertyData?.coord}
                district={propertyData?.District}
                city={propertyData?.City}
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
                    Next
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
              <h4 className="title fz17 mb30">Listing Details</h4>
              <DetailsFiled
                handleChange={handleChange}
                sizeInft={propertyData?.sizeInft}
                lotSizeInft={propertyData?.lotSizeInft}
                rooms={propertyData?.rooms}
                bedrooms={propertyData?.bedrooms}
                bathrooms={propertyData?.bathrooms}
                customId={propertyData?.customId}
                buildUpArea={propertyData?.buildUpArea}
                garages={propertyData?.garages}
                garageSize={propertyData?.garageSize}
                yearBuilt={propertyData?.yearBuilt}
                availableFrom={propertyData?.availableFrom}
                basement={propertyData?.basement}
                extraDetails={propertyData?.extraDetails}
                roofing={propertyData?.roofing}
                exteriorMaterial={propertyData?.exteriorMaterial}
                owner={propertyData?.owner}
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
                    Next
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
        {/* End tab for Listing Details */}

        {active === "Amenities" && (
          <div
          // className="tab-pane fade"
          // id="nav-item5"
          // role="tabpanel"
          // aria-labelledby="nav-item5-tab"
          >
            {/* {console.log(ameneties, "ameneties")} */}
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">Select Amenities</h4>
              <div className="row">
                <Amenities
                  handleChange={handleChange}
                  amenities={propertyData?.amenitiesDataValues}
                  submitAddProperty={submitAddProperty}
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
