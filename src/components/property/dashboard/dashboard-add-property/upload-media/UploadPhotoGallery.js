"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { imageUpload } from "@/services/ImageUpload";

const UploadPhotoGallery = ({ handleChange, currentRtl }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
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
        <h4 className="title fz17 mb10">
          {" "}
          {currentRtl === "ltr"
            ? "Upload/Drag photos of your property"
            : "تحميل/سحب الصور من الممتلكات الخاصة بك"}{" "}
        </h4>
        <p className="text mb25">
          {currentRtl === "ltr"
            ? "Photos must be JPEG or PNG format and at least 2048x768"
            : "يجب أن تكون الصور بتنسيق JPEG أو PNG وبحجم 2048 × 768 على الأقل"}
        </p>
        <label className="ud-btn btn-white">
          {currentRtl === "ltr" ? "Browse Files" : "تصفح ملفات"}

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
        {uploadedImages.map((imageData, index) => (
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
