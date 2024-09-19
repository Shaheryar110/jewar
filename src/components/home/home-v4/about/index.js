import React, { useContext } from "react";
import SellingList from "./SellingList";
import Link from "next/link";
import ExclusiveAgnts from "./ExclusiveAgnts";
import SingleAgent from "./SingleAgent";
import Image from "next/image";
import { getCmsData } from "@/services/cms";
import { RtlContext } from "@/Context/RtlContext";

const About = ({ data }) => {
  const { currentRtl } = useContext(RtlContext);
  return (
    <div className="cta-banner bgc-f7 mx-auto maxw1600 pt70 pb140 pb30-md bdrs12 position-relative mx20-lg px20-sm">
      <div className="container">
        <div className="row align-items-start align-items-xl-center">
          <div className="col-md-10 col-lg-7 col-xl-6">
            <div
              className="position-relative mb35 mb0-sm"
              data-aos="fade-left"
              data-aos-delay="0"
            >
              <ExclusiveAgnts />
              <SingleAgent />
              <div className="img-box-10 position-relative d-none d-xl-block">
                <Image
                  width={120}
                  height={120}
                  className="img-1 spin-right"
                  src="/images/about/element-3.png"
                  alt="shape"
                />
                <Image
                  width={41}
                  height={11}
                  className="img-2 bounce-x contain"
                  src="/images/about/element-5.png"
                  alt="shape"
                />
                <Image
                  width={8}
                  height={34}
                  className="img-3 bounce-y contain"
                  src="/images/about/element-6.png"
                  alt="shape"
                />
                <Image
                  width={57}
                  height={49}
                  className="img-4 bounce-y"
                  src="/images/about/element-7.png"
                  alt="shape"
                />
                <Image
                  width={71}
                  height={71}
                  className="img-5 spin-right"
                  src="/images/about/element-8.png"
                  alt="shape"
                />
              </div>
            </div>
          </div>
          {/* End .col */}

          <div className="col-md-8 col-lg-5 col-xl-5 offset-xl-1">
            <div
              className="about-box-1 pe-4 mt100 mt0-lg mb30-lg"
              data-aos="fade-right"
              data-aos-delay="200"
            >
          <h2 className="title mb20">
  {currentRtl === 'ltr' ? data?.userNameText?.en : data?.userNameText?.ar}
</h2>
<p className="text mb55 mb30-md fz14">
  {currentRtl === 'ltr' ? data?.userDescriptionText?.en : data?.userDescriptionText?.ar}
</p>
<SellingList desc={currentRtl === 'ltr' ? data?.userlistNmae1?.en : data?.userlistNmae1?.ar} />
<SellingList desc={currentRtl === 'ltr' ? data?.userlistNmae2?.en : data?.userlistNmae2?.ar} />
<SellingList desc={currentRtl === 'ltr' ? data?.userlistNmae3?.en : data?.userlistNmae3?.ar} />

              <Link href="#" className="ud-btn btn-dark">
                {currentRtl === "ltr" ? "See More" : "شاهد المزيد"}
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
