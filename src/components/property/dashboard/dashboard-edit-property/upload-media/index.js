"use client";
import React from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";
import VideoOptionFiled from "./VideoOptionFiled";

const UploadMedia = ({
  handleChange,
  videoId,
  videoFrom,
  virtualTour,
  uploadedImages,
}) => {
  // console.log(uploadedImages, "uploadedImages top");
  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">Upload photos of your property</h4>
      <form className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery
              handleChange={handleChange}
              uploadedImage={uploadedImages}
            />
          </div>
        </div>
        {/* End col-12 */}

        <div className="row">
          <h4 className="title fz17 mb30">Video Option</h4>
          <VideoOptionFiled
            handleChange={handleChange}
            videoFrom={videoFrom}
            videoId={videoId}
          />
        </div>
        {/* End .row */}

        <div className="row">
          <h4 className="title fz17 mb30">Virtual Tour</h4>
          <div className="col-sm-6 col-xl-12">
            <div className="mb30">
              {/* <label className="heading-color ff-heading fw600 mb10">
                Virtual Tour
              </label> */}
              <input
                type="text"
                className="form-control"
                placeholder="Virtual Tour"
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
