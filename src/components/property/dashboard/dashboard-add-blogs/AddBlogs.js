"use client";
import React, { useContext, useEffect, useState } from "react";
import UploadMedia from "./UploadMedia";
import Select from "react-select";
import Editor from "react-simple-wysiwyg";
import { auth } from "@/Firebase/Config";
import { AddBlog } from "@/services/Blogs";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/Context/AuthContext";

const initial = {
  title: "",
  desc: "",
  images: [],
  category: "",
  user_id: "",
};

const AddBlogs = ({ currentRtl }) => {
  const { currentUser } = useContext(AuthContext);
  const tag = [
    "All",
    "Home Improvment",
    "Life & Style",
    "Finance",
    "Selling a Home",
    "Buying a Home",
  ];

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
  const [CurrentBlog, setCurrentBlog] = useState(initial);

  const handleBlogChange = (name, data) => {
    setCurrentBlog((prev) => ({
      ...prev,
      [name]: data,
    }));
  };

  const submitBlog = () => {
    AddBlog(CurrentBlog)
      .then((data) => {
        toast.success("Blog Published");
        setCurrentBlog(initial);
      })
      .catch((err) => toast.error("Problem in publishing blog"));
  };
  useEffect(() => {
    if (currentUser) {
      setCurrentBlog((prev) => ({
        ...prev,
        user_id: currentUser?.uid,
      }));
    }
  }, []);

  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">
        {currentRtl === "ltr" ? "Blogs Description" : "وصف المدونات"}
      </h4>
      <form className="form-style1">
        <div className="row">
          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                {currentRtl === "ltr" ? "Title" : "العنوان"}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="اسم المدونة"
                value={CurrentBlog.title || ""}
                onChange={(e) => handleBlogChange("title", e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                {currentRtl === "ltr" ? "Publish Date" : "تاريخ النشر"}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="99.aa.yyyy"
                value={CurrentBlog.date || ""}
                onChange={(e) => handleBlogChange("date", e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                {currentRtl === "ltr" ? "Tag" : "الوسم"}
              </label>
              <div className="location-area">
                <Select
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  required
                  isMulti
                  onChange={(e) => handleBlogChange("category", e)}
                  options={tag.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
              </div>
            </div>
          </div>

          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                {currentRtl === "ltr" ? "Description" : "الوصف"}
              </label>
              <div className="location-area">
                <textarea
                  cols={30}
                  rows={5}
                  placeholder="أدخل HTML هنا..."
                  value={CurrentBlog.desc || ""}
                  onChange={(e) => handleBlogChange("desc", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Media Upload Component */}
      <UploadMedia handleChange={handleBlogChange} currentRtl={currentRtl} />

      {/* Publish Button */}
      <label className="ud-btn btn-white" onClick={submitBlog}>
        {currentRtl === "ltr" ? "Publish" : "نشر"}
      </label>

      {/* Toaster for Notifications */}
      <Toaster />
    </div>
  );
};

export default AddBlogs;
