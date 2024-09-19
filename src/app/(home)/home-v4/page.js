"use client";
import MobileMenu from "@/components/common/mobile-menu";
import CallToActions from "@/components/home/home-v4/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Partner from "@/components/common/Partner";
import PropertiesByCities from "@/components/home/home-v4/PropertiesByCities";
import Hero from "@/components/home/home-v4/hero";
import Blog from "@/components/common/Blog";
import Features from "@/components/home/home-v4/Features";
import Link from "next/link";
import Funfact from "@/components/home/home-v4/Funfact";
import ApartmentTypes from "@/components/home/home-v4/ApartmentTypes";
import About from "@/components/home/home-v4/about";
import Testimonial from "@/components/home/home-v4/Testimonial";
import FilterProperties from "@/components/home/home-v4/FilterProperties";
import Footer from "@/components/home/home-v4/footer";
import { getCmsData } from "@/services/cms";
import { useContext, useEffect, useState } from "react";
import { RtlContext } from "@/Context/RtlContext";
import { ApiContext } from "@/Context/ApiCallContext";

// export const metadata = {
//   title: "Home v4 || Jewar - Real Estate  ",
// };

const Home_V4 = () => {
  const { setData, data } = useContext(ApiContext);
  const { currentRtl } = useContext(RtlContext);

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Home Banner Style V1 */}
      <section className="home-banner-style4 p0 bgc-white" dir={currentRtl}>
        <div className="home-style4 maxw1600 bdrs24 position-relative mx-auto mx20-lg">
          <div className="container">
            <div className="row">
              <div className="col-xl-9">
                <Hero data={data} />
              </div>
            </div>
          </div>
          {/* End .container */}
        </div>
      </section>
      {/* End Home Banner Style V4 */}

      {/* Explore property-city */}
      <section className="pb40-md pb90">
        <div className="container">
          <div
            dir={currentRtl}
            className="row align-items-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="col-lg-9">
              <div className="main-title2">
                <h2 className="title">
                  {" "}
                  {currentRtl === "ltr"
                    ? "Properties by District "
                    : "العقارات حسب المنطقة"}
                </h2>
              </div>
            </div>
            {/* End col-lg-9 */}

            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <Link className="ud-btn2" href="/map/data?propertyType='All'">
                  {currentRtl === "ltr" ? "See All Cities" : "رؤية جميع المدن"}
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
            {/* End col-lg-3 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider position-relative">
                <PropertiesByCities />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Explore property-city */}

      {/* Popular Property */}
      <section className="pt-0 pb60">
        <div className="container">
          <FilterProperties />
        </div>
      </section>

      {/* Abut intro */}
      <section className="pt30 pb-0">
        <div className="cta-banner3 bgc-thm-light mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 col-lg-5 pl30-md pl15-xs"
                data-aos="fade-left"
                data-aos-delay="300"
                dir={currentRtl}
              >
                <div className="mb30">
                  <h2 className="title text-capitalize">
                    <br className="d-none d-md-block" />
                    {currentRtl === "ltr"
                      ? data?.sellingNameText?.en
                      : data?.sellingNameText?.ar}
                  </h2>
                </div>
                <div className="why-chose-list style2">
                  <Features data={data} />
                </div>
                <Link href="#" className="ud-btn btn-dark">
                  {currentRtl === "ltr" ? "Learn More" : "يتعلم أكثر"}
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Abut intro */}

      {/* Funfact */}
      <section className="pt45 pb-0">
        <div className="container maxw1600 bdrb1 pb50">
          <div
            className="row justify-content-center wow fadeInUp"
            data-wow-delay="300ms"
          >
            <Funfact
              text={
                currentRtl === "ltr"
                  ? data?.funFactText1?.en
                  : data?.funFactText1?.ar
              }
              num={
                currentRtl === "ltr"
                  ? data?.funFactnumber1?.en
                  : data?.funFactnumber1?.ar
              }
            />
            <Funfact
              text={
                currentRtl === "ltr"
                  ? data?.funFactText2?.en
                  : data?.funFactText2?.ar
              }
              num={
                currentRtl === "ltr"
                  ? data?.funFactnumber2?.en
                  : data?.funFactnumber2?.ar
              }
            />
            <Funfact
              text={
                currentRtl === "ltr"
                  ? data?.funFactText3?.en
                  : data?.funFactText3?.ar
              }
              num={
                currentRtl === "ltr"
                  ? data?.funFactnumber3?.en
                  : data?.funFactnumber3?.ar
              }
            />
          </div>
        </div>
      </section>
      {/* End Funfact */}

      {/* Property Cities */}
      <section className="pb80 pb30-md">
        <div className="container">
          <div
            className="row  justify-content-between align-items-center"
            dir={currentRtl}
          >
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h2 className="title">
                  {currentRtl === "ltr"
                    ? "Explore Apartment Types"
                    : "اكتشف أنواع الشقق"}
                </h2>
              </div>
            </div>
            {/* End header */}

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="apartment-type2-prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination apartment-type2_pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="apartment-type2-next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider">
                <ApartmentTypes />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End property cities */}

      {/* About Us */}
      <section className="pt0 pb40-md" dir={currentRtl}>
        <About data={data} />
      </section>
      {/* End About Us */}

      {/* Our Partners */}
      <section className="our-partners p-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up">
              <div className="main-title text-center">
                <h6>
                  {currentRtl === "ltr"
                    ? "Trusted by the world’s best"
                    : "موثوق به من قبل الأفضل في العالم"}
                </h6>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div
                className="dots_none nav_none"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Partner data={data} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our Partners */}

      {/* Our CTA */}
      <section
        className="our-cta p-0 "
        style={{ marginTop: "170px" }}
        dir={currentRtl}
      >
        <CallToActions data={data} />
      </section>
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 at-home4 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Home_V4;
