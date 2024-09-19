"use client";
import { getUserById } from "@/services/user";
import { Avatar } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ContactWithAgent = ({ userId, currentRtl }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    getUserById(userId).then((data) => {
      setUser(data);
    });
  }, []);
  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          <Avatar
            src={user?.photoURL ? user?.photoURL : user?.displayName[0]}
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">{user?.displayName}</h6>
          {user?.phoneNumber && (
            <div className="agent-meta mb10 d-md-flex align-items-center">
              <a className="text fz15" href="#">
                <i className="flaticon-call pe-1" />
                {user?.phoneNumber}
              </a>
            </div>
          )}
          <Link
            href={`/agent-single/${userId}`}
            className="text-decoration-underline fw600"
          >
            {currentRtl === "ltr" ? "View Listings" : "عرض القوائم"}
          </Link>
        </div>
      </div>
      {/* End agent-single */}

      <div className="d-grid">
        <Link href={`/agent-single/${userId}`} className="ud-btn btn-white2">
          {currentRtl === "ltr" ? " Contact Agent" : "وكيل الاتصال"}
          <i className="fal fa-arrow-right-long" />
        </Link>
      </div>
    </>
  );
};

export default ContactWithAgent;
