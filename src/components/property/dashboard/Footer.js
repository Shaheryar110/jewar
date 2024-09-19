"use client";
import { RtlContext } from "@/Context/RtlContext";
import React, { useContext } from "react";

const footerLinks = [
  { text: "Privacy", href: "#" },
  { text: "Terms", href: "#" },
  { text: "Sitemap", href: "#" },
];
const footerLinksArabic = [
  { text: "الخصوصية", href: "#" },
  { text: "الشروط", href: "#" },
  { text: "خريطة الموقع", href: "#" },
];

const Footer = () => {
  const { currentRtl } = useContext(RtlContext);
  const currentYear = new Date().getFullYear();
  const linksToRender = currentRtl === "ltr" ? footerLinks : footerLinksArabic;
  return (
    <footer className="dashboard_footer pt30 pb10">
      <div className="container">
        <div className="row items-center justify-content-center justify-content-md-between">
          <div className="col-auto">
            <div className="copyright-widget">
              <p className="text">
                {" "}
                {currentRtl === "ltr"
                  ? `© Jewar ${currentYear}- All rights reserved`
                  : `جميع الحقوق محفوظة © Jewar ${currentYear}`}{" "}
              </p>
            </div>
          </div>

          <div className="col-auto">
            <div className="footer_bottom_right_widgets text-center text-lg-end">
              <p>
                {linksToRender.map((link, index) => (
                  <React.Fragment key={index}>
                    <a href={link.href} style={{ padding: "10px" }}>
                      {link.text}
                    </a>
                    {/* {index !== links.length - 1 && " · "} */}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
