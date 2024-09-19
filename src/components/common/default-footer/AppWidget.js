"use client";
import { RtlContext } from "@/Context/RtlContext";
import React, { useContext } from "react";

const AppWidget = () => {
  const { currentRtl } = useContext(RtlContext);

  const appList = [
    {
      icon: "fab fa-apple fz30 text-white",
      text: currentRtl === "ltr" ? "Download on the" : "تحميل على",
      title: currentRtl === "ltr" ? "Apple Store" : "متجر آبل",
      link: "#",
    },
    {
      icon: "fab fa-google-play fz30 text-white",
      text: currentRtl === "ltr" ? "Get it on" : "احصل عليه",
      title: currentRtl === "ltr" ? "Google Play" : "تطبيقات جوجل",
      link: "#",
    },
  ];

  return (
    <div className="app-widget">
      <h5 className="title text-white mb10">
        {currentRtl === "ltr" ? "Apps" : "تطبيقات"}
      </h5>
      <div className="row mb-4 mb-lg-5">
        {appList.map((app, index) => (
          <div className="col-auto" key={index}>
            <a href={app.link} target="_blank" rel="noopener noreferrer">
              <div className="app-info d-flex align-items-center mb10">
                <div className="flex-shrink-0">
                  <i className={app.icon} />
                </div>
                <div className="flex-grow-1 ml20">
                  <p className="app-text fz13 mb0">{app.text}</p>
                  <h6 className="app-title text-white fz14">{app.title}</h6>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppWidget;
