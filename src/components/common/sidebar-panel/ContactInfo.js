import { RtlContext } from "@/Context/RtlContext";
import React, { useContext } from "react";

const ContactInfo = () => {
  const { currentRtl } = useContext(RtlContext);
  const contactInfo = [
    {
      id: 1,
      title: "Total Free Customer Care",
      phone: "+(0) 123 050 945 02",
      phoneHref: "tel:+012305094502",
    },
    {
      id: 2,
      title: "Need Live Support?",
      email: "hi@Jewar.com",
      emailHref: "mailto:hi@Jewar.com",
    },
  ];
  const contactInfoArabic = [
    {
      id: 1,
      title: "خدمة العملاء المجانية الكاملة",
      phone: "+(0) 123 050 945 02",
      phoneHref: "tel:+012305094502",
    },
    {
      id: 2,
      title: "هل تحتاج إلى دعم مباشر؟",
      email: "hi@Jewar.com",
      emailHref: "mailto:hi@Jewar.com",
    },
  ];

  const contct = currentRtl === "ltr" ? contactInfo : contactInfoArabic;

  return (
    <>
      {contct.map((info) => (
        <div className="col-auto" key={info.id}>
          <div className="contact-info">
            <p className="info-title dark-color">{info.title}</p>
            {info.phone && (
              <h6 className="info-phone dark-color">
                <a href={info.phoneHref}>{info.phone}</a>
              </h6>
            )}
            {info.email && (
              <h6 className="info-mail dark-color">
                <a href={info.emailHref}>{info.email}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
