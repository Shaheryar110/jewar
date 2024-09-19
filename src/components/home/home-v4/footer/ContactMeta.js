import React from "react";

const ContactMeta = ({ currentRtl }) => {
  const contactInfoData = [
    {
      text: "Address",
      info: "329 Queensberry Street, North Melbourne VIC 3051, Australia.",
      link: "#", // Empty link value for the first object
    },
    {
      text: "Total Free Customer Care",
      info: "+(0) 123 050 945 02",
      link: "tel:+012305094502",
    },
    {
      text: "Need Live Support?",
      info: "hi@Jewar.com",
      link: "mailto:hi@Jewar.com",
    },
  ];
  const contactInfoDataAr = [
    {
      text: "العنوان",
      info: "329 شارع كوينزبري، نورث ملبورن، فيكتوريا 3051، أستراليا.",
      link: "#", // قيمة رابط فارغة للعنصر الأول
    },
    {
      text: "خدمة العملاء المجانية الكاملة",
      info: "+(0) 123 050 945 02",
      link: "tel:+012305094502",
    },
    {
      text: "هل تحتاج إلى دعم مباشر؟",
      info: "hi@Jewar.com",
      link: "mailto:hi@Jewar.com",
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5">
      {currentRtl === "ltr"
        ? contactInfoData.map((contact, index) => (
            <div className="contact-info mb25" key={index}>
              <p className="text mb5">{contact.text}</p>
              {contact.link.startsWith("mailto:") ? (
                <h6 className="info-mail">
                  <a href={contact.link}>{contact.info}</a>
                </h6>
              ) : (
                <h6 className="info-phone">
                  <a href={contact.link}>{contact.info}</a>
                </h6>
              )}
            </div>
          ))
        : contactInfoDataAr.map((contact, index) => (
            <div className="contact-info mb25" key={index}>
              <p className="text mb5">{contact.text}</p>
              {contact.link.startsWith("mailto:") ? (
                <h6 className="info-mail">
                  <a href={contact.link}>{contact.info}</a>
                </h6>
              ) : (
                <h6 className="info-phone">
                  <a href={contact.link}>{contact.info}</a>
                </h6>
              )}
            </div>
          ))}
    </div>
  );
};

export default ContactMeta;
