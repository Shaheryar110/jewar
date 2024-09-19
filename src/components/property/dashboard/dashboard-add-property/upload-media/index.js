"use client";
import React from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";
import VideoOptionFiled from "./VideoOptionFiled";

const UploadMedia = ({
  handleChange,
  videourl,
  videoFrom,
  virtualTour,
  currentRtl,
}) => {
  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">
        {" "}
        {currentRtl === "ltr"
          ? "Upload photos of your property"
          : "تحميل الصور من الممتلكات الخاصة بك"}{" "}
      </h4>
      <form className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery
              handleChange={handleChange}
              currentRtl={currentRtl}
            />
          </div>
        </div>
        {/* End col-12 */}

        <div className="row">
          <h4 className="title fz17 mb30">
            {" "}
            {currentRtl === "ltr" ? "Video Option" : "خيار الفيديو"}{" "}
          </h4>
          <VideoOptionFiled
            handleChange={handleChange}
            videoFrom={videoFrom}
            videourl={videourl}
            currentRtl={currentRtl}
          />
        </div>
        {/* End .row */}

        <div className="row">
          <h4 className="title fz17 mb30">
            {" "}
            {currentRtl === "ltr" ? "Virtual Tour" : "جولة افتراضية"}{" "}
          </h4>
          <div className="col-sm-6 col-xl-12">
            <div className="mb30">
              {/* <label className="heading-color ff-heading fw600 mb10">
                Virtual Tour
              </label> */}
              <input
                type="text"
                className="form-control"
                placeholder={
                  currentRtl === "ltr" ? "Virtual Tour" : "جولة افتراضية"
                }
                value={virtualTour}
                onChange={(e) => handleChange("virtualTour", e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* End .row */}
      </form>
    </div>
  );
};

export default UploadMedia;
