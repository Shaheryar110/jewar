"use client";
import { auth } from "@/Firebase/Config";
import { getUserById, updateUser } from "@/services/user";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import toast from "react-hot-toast";

const PersonalInfo = ({ currentRtl }) => {
  const [user, setUser] = useState();
  const { currentUser } = useContext(AuthContext);

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUser(user).then((data) => toast.success("Profile Updated"));
  };
  useEffect(() => {
    getUserById(currentUser?.uid).then((data) => setUser(data));
  }, [currentUser?.uid]);
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Username" : "اسم المستخدم"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.displayName}
              onChange={(e) => handleChange("displayName", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {" "}
              {currentRtl === "ltr" ? "Email" : "بريد إلكتروني"}
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {" "}
              {currentRtl === "ltr" ? "Phone" : "هاتف"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Position" : "موضع"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.position}
              onChange={(e) => handleChange("position", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Language" : "لغة"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.language}
              onChange={(e) => handleChange("language", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Company Name" : "اسم الشركة"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Tax Number" : "الرقم الضريبي"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={user?.taxNumber}
              onChange={(e) => handleChange("taxNumber", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Address" : "عنوان"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              onChange={(e) => handleChange("address", e.target.value)}
              value={user?.address}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "About me" : "ْعَنِّي"}
            </label>
            <textarea
              cols={30}
              rows={4}
              placeholder="There are many variations of passages."
              value={user?.about}
              onChange={(e) => handleChange("about", e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="text-end">
            <button
              // type="submit"
              className="ud-btn btn-dark"
              onClick={handleUpdateUser}
            >
              {currentRtl === "ltr" ? " Update Profile" : "تحديث الملف"}

              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default PersonalInfo;
