import agents from "@/data/agents";
import Image from "next/image";
import React from "react";

const SingleAgentCta = ({ id }) => {
  const data = agents.filter((elm) => elm.id == id)[0] || agents[0];
  const agentData = {
    name: id?.displayName || "No Name Found",
    company: id?.companyName || "Modern House Real Estate",

    phone1: id?.phoneNumber || "Not Provided Yet",

    social: [
      { icon: "fab fa-facebook-f", link: "#" },
      { icon: "fab fa-twitter", link: "#" },
      { icon: "fab fa-instagram", link: "#" },
      { icon: "fab fa-linkedin-in", link: "#" },
    ],
  };
  return (
    <>
      <div className="agent-single d-sm-flex align-items-center">
        <div className="single-img mb30-sm">
          <Image
            width={172}
            height={172}
            style={{ borderRadius: "50%", objectFit: "cover" }}
            src={id?.photoURL ? id?.photoURL : data.image}
            alt="agents"
          />
        </div>
        {/* End single image */}
        <div className="single-contant ml30 ml0-xs">
          <h2 className="title mb-0">{agentData.name}</h2>
          {id?.companyName && (
            <p className="fz15">
              Company Agent at <b>{agentData.company}</b>
            </p>
          )}
          <div className="agent-meta mb15 d-md-flex align-items-center">
            <a className="text fz15 pe-2 ps-2 bdrr1" href="#">
              <i className="flaticon-call pe-1" />
              {agentData.phone1}
            </a>
          </div>
          <div className="agent-social">
            {agentData.social.map((socialItem, index) => (
              <a key={index} className="mr20" href={socialItem.link}>
                <i className={socialItem.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleAgentCta;
