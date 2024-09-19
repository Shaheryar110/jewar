"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { imageUpload } from "@/services/ImageUpload";

const UploadPhotoGallery = ({ handleChange, uploadedImage }) => {
  const [uploadedImages, setUploadedImages] = useState(uploadedImage);
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const newImages = [...uploadedImages];
    if (e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      filesArray.forEach((file) => {
        imageUpload(file)
          .then((data) => {
            setUploadedImages((prevImages) => [...prevImages, data]);
          })
          .catch((err) => console.log(err));
      });
    } else {
      imageUpload(e.target.files[0])
        .then((data) => {
          newImages.push(data);
          setUploadedImages(newImages);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    console.log(event.target, "file");
    // const files = event.target.files.dataTransfer.files;
    // handleUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };
  useEffect(() => {
    handleChange("uploadedImages", uploadedImages);
  }, [uploadedImages]);

  // useEffect(() => {
  //   console.log(uploadedImages, "uploadedImages");
  //   console.log(uploadedImage, "uploadedImage");
  // }, []);

  return (
    <>
      <div
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="icon mb30">
          <span className="flaticon-upload" />
        </div>
        <h4 className="title fz17 mb10">Upload/Drag photos of your property</h4>
        <p className="text mb25">
          Photos must be JPEG or PNG format and at least 2048x768
        </p>
        <label className="ud-btn btn-white">
          Browse Files
          <input
            ref={fileInputRef}
            id="fileInput"
            name=""
            type="file"
            multiple
            className="ud-btn btn-white"
            onChange={(e) => handleUpload(e)}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Display uploaded images */}
      <div className="row profile-box position-relative d-md-flex align-items-end mb50">
        {uploadedImage?.map((imageData, index) => (
          <div className="col-2" key={index}>
            <div className="profile-img mb20 position-relative">
              <Image
                width={212}
                height={194}
                className="w-100 bdrs12 cover"
                src={imageData}
                alt={`Uploaded Image ${index + 1}`}
              />
              <button
                style={{ border: "none" }}
                className="tag-del"
                title="Delete Image"
                onClick={() => handleDelete(index)}
                type="button"
                data-tooltip-id={`delete-${index}`}
              >
                <span className="fas fa-trash-can" />
              </button>

              <ReactTooltip
                id={`delete-${index}`}
                place="right"
                content="Delete Image"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadPhotoGallery;
