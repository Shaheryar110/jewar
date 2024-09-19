"use client";
import { AuthContext } from "@/Context/AuthContext";
import { auth } from "@/Firebase/Config";
import { getUserById, updateUser } from "@/services/user";
import React, { useContext, useEffect, useState } from "react";
const SocialField = ({ currentRtl }) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState();
  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUser(user).then((data) => console.log(data));
  };
  useEffect(() => {
    if (currentUser) {
      getUserById(currentUser?.uid).then((data) => setUser(data));
    }
  }, []);
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? " Facebook Url" : "فيسبوك URL"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.fbURL}
              onChange={(e) => handleChange("fbURL", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Pinterest Url" : "بينتريست URL"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.pintrestURL}
              onChange={(e) => handleChange("pintrestURL", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? " Instagram Url" : "انستغرام URL"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.InstaURL}
              onChange={(e) => handleChange("InstaURL", e.target.value)}
            />
          </div>
        </div>{" "}
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? " Twitter Url" : "تويتر URL"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.twitterURL}
              onChange={(e) => handleChange("twitterURL", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Linkedin Url" : "ينكدين URL"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.linkdinURL}
              onChange={(e) => handleChange("linkdinURL", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr"
                ? "Website Url (without http)"
                : "عنوان URL لموقع الويب (بدون http)"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              value={user?.webURL}
              onChange={(e) => handleChange("webURL", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-md-12">
          <div className="text-end">
            <button
              type="submit"
              className="ud-btn btn-dark"
              onClick={handleUpdateUser}
            >
              {currentRtl === "ltr" ? "Update Social" : "تحديث الاجتماعية"}

              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default SocialField;
