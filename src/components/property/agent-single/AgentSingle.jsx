"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { RtlContext } from "@/Context/RtlContext";
import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import SingleAgentCta from "./SingleAgentCta";
import ListingItemsContainer from "../agency-single/ListingItems";
import AllReviews from "../reviews";
import ReviewBoxForm from "../property-single-style/common/ReviewBoxForm";
import FormContact from "../FormContact";
import Footer from "@/components/home/home-v4/footer";

const AgentSingle = ({ userById, propertyByuid, finalReviws }) => {
  const { currentRtl } = useContext(RtlContext);

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Agent Single Section Area */}
      <section className="agent-single pt60">
        <div className="cta-agent bgc-thm-light mx-auto maxw1600 pt60 pb60 bdrs12 position-relative mx20-lg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-7">
                <SingleAgentCta id={userById} />
                <div className="img-box-11 position-relative d-none d-xl-block">
                  <Image
                    width={120}
                    height={120}
                    className="img-1 spin-right"
                    src="/images/about/element-3.png"
                    alt="agents"
                  />
                  <Image
                    width={41}
                    height={11}
                    className="img-2 bounce-x"
                    src="/images/about/element-5.png"
                    alt="agents"
                  />
                  <Image
                    width={57}
                    height={49}
                    className="img-3 bounce-y"
                    src="/images/about/element-7.png"
                    alt="agents"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End cta-agent */}

        <div className="container">
          <div className="row wow fadeInUp" data-aos-delay="300">
            <div className="col-lg-8 pr40 pr20-lg">
              <div className="row">
                <div className="col-lg-12">
                  {userById?.about && (
                    <div className="agent-single-details mt30 pb30 bdrb1">
                      <h6 className="fz17 mb30">
                        {currentRtl === "ltr" ? "About Agents" : "حول الوكلاء"}
                      </h6>
                      <p className="text">{userById?.about}</p>
                      <div className="agent-single-accordion">
                        <div
                          className="accordion accordion-flush"
                          id="accordionFlushExample"
                        >
                          <div className="accordion-item">
                            <div
                              id="flush-collapseOne"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingOne"
                              data-bs-parent="#accordionFlushExample"
                              style={{}}
                            >
                              <div className="accordion-body p-0">
                                <p className="text">
                                  Placeholder content for this accordion, which
                                  is intended to demonstrate the class. This is
                                  the first item&apos;s accordion body you get
                                  groundbreaking performance and amazing battery
                                  life. Add to that a stunning Liquid Retina XDR
                                  display, the best camera and audio ever in a
                                  Mac notebook, and all the ports you need.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* End .row */}

              <ListingItemsContainer propertyDetails={propertyByuid} />
              <div className="row">
                <div className="col-lg-12">
                  <AllReviews finalReviws={finalReviws} />

                  <div className="bsp_reveiw_wrt">
                    <h6 className="fz17">
                      {currentRtl === "ltr" ? "Leave A Review" : "ترك التعليق"}
                    </h6>
                    <ReviewBoxForm />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="agent-single-form home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                <h4 className="form-title mb25">
                  {currentRtl === "ltr" ? "Contact Form" : "نموذج الاتصال"}
                </h4>
                <FormContact userId={userById} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default AgentSingle;
