"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "../../../../../components/home/home-v4/footer";
import MobileMenu from "@/components/common/mobile-menu";
import FloorPlans from "@/components/property/property-single-style/common/FloorPlans";
import NearbySimilarProperty from "@/components/property/property-single-style/common/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyAddress from "@/components/property/property-single-style/common/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/single-v4/PropertyHeader";
import PropertyVideo from "@/components/property/property-single-style/common/PropertyVideo";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import ReviewBoxForm from "@/components/property/property-single-style/common/ReviewBoxForm";
import VirtualTour360 from "@/components/property/property-single-style/common/VirtualTour360";
import AllReviews from "@/components/property/property-single-style/common/reviews";
import ContactWithAgent from "@/components/property/property-single-style/sidebar/ContactWithAgent";
import PropertyGallery from "@/components/property/property-single-style/single-v4/property-gallery";
import { getDocByField } from "../../../../../services/propertyServices";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/Firebase/Config";
import FormContactSingle from "@/components/property/agency-single/FormContactSingle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { GoAlertFill } from "react-icons/go";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { RtlContext } from "@/Context/RtlContext";
// export const metadata = {
//   title: "Property Single V4 || Jewar - Real Estate  ",
// };

const SingleV4 = ({ params }) => {
  const { currentUser } = useContext(AuthContext);
  const { currentRtl } = useContext(RtlContext);
  const [data, setData] = useState();
  const [showAlter, setShowAlter] = useState();
  const router = useRouter();

  const getProperty = async (id) => {
    const washingtonRef = doc(db, "Property", id);

    await updateDoc(washingtonRef, {
      views: increment(1),
    });
  };
  useEffect(() => {
    if (params.id) {
      getDocByField(params.id).then((data) => {
        console.log(data, "prop");
        setData(data);
      });
      getProperty(params.id);
    }
  }, [params]);
  useEffect(() => {
    if (data) {
      if (
        data[0]?.propertyFeilds?.status !== "Published" &&
        data[0]?.userId === currentUser?.uid
      ) {
        setShowAlter(data[0]?.propertyFeilds?.status);
      } else if (data[0]?.propertyFeilds?.status !== "Published") {
        router.push("/404");
      }
      // else {
      //   router.push("/404");
      // }
    }
  }, [data]);
  // const selectedStatusText = currentRtl === "ltr" ? statusText.ltr : statusText.rtl;
  useEffect(() => {
    console.log(showAlter, "show");
  }, [showAlter]);
  return (
    <>
      <DefaultHeader />

      {/* Mobile Nav  */}
      <MobileMenu />
      {showAlter && showAlter !== "" && (
        <div className="container">
          <div className="row">
            <Box sx={style.warningBox}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: 19,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {" "}
                <GoAlertFill
                  style={{ color: "white", fontSize: 19, marginRight: "8px" }}
                />{" "}
                {currentRtl === "ltr"
                  ? `This Property is in ${showAlter} Status`
                  : `هذا العقار في حالة ${showAlter}`}
                {}
              </Typography>
            </Box>
          </div>
        </div>
      )}
      {data && data.length >= 0 && (
        <>
          {" "}
          <section className="pt20 pb60 bgc-white">
            <PropertyGallery
              id={params.id}
              doc={data}
              imageArray={data[0]?.propertyFeilds?.uploadedImages}
            />
          </section>
          <section className="pt0 pb90 bgc-white">
            <div className="container">
              <div className="row">
                <PropertyHeader id={params.id} data={data[0]?.propertyFeilds} />
              </div>

              <div className="row wrap">
                <div className="col-lg-8">
                  <div
                    dir={currentRtl}
                    className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
                  >
                    <h4 className="title fz17 mb30">
                      {currentRtl === "ltr" ? "Overview" : "ملخص"}
                    </h4>
                    <div className="row">
                      <OverView
                        id={params.id}
                        data={data[0]?.propertyFeilds}
                        currentRtl={currentRtl}
                      />
                    </div>
                  </div>

                  <div
                    dir={currentRtl}
                    className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
                  >
                    <h4 className="title fz17 mb30">
                      {" "}
                      {currentRtl === "ltr"
                        ? "Property Description "
                        : "وصف العقار"}
                    </h4>
                    <ProperytyDescriptions data={data[0]?.propertyFeilds} />

                    <h4 className="title fz17 mb30 mt50">
                      {" "}
                      {currentRtl === "ltr"
                        ? "Property Details "
                        : "تفاصيل اوضح"}
                    </h4>
                    <div className="row">
                      <PropertyDetails
                        currentRtl={currentRtl}
                        data={data[0]?.propertyFeilds}
                      />
                    </div>
                  </div>

                  <div
                    dir={currentRtl}
                    className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
                  >
                    <h4 className="title fz17 mb30 mt30">
                      {" "}
                      {currentRtl === "ltr" ? "Address" : "عنوان"}
                    </h4>
                    <div className="row">
                      <PropertyAddress
                        data={data[0]?.propertyFeilds}
                        currentRtl={currentRtl}
                      />
                    </div>
                  </div>

                  <div
                    dir={currentRtl}
                    className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
                  >
                    {currentRtl === "ltr" ? (
                      <h4 className="title fz17 mb30">
                        Features &amp; Amenities
                      </h4>
                    ) : (
                      <h4 className="title fz17 mb30">
                        سمات &amp; وسائل الراحة
                      </h4>
                    )}
                    <div className="row">
                      <PropertyFeaturesAminites
                        data={data[0]?.propertyFeilds?.amenitiesDataValues}
                      />
                    </div>
                  </div>

                  {data[0]?.propertyFeilds?.floors && (
                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">Floor Plans</h4>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="accordion-style1 style2">
                            <FloorPlans />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {data[0]?.propertyFeilds?.video && (
                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                      <h4 className="title fz17 mb30">Video</h4>
                      <div className="row">
                        <PropertyVideo url={data[0]?.propertyFeilds?.video} />
                      </div>
                    </div>
                  )}

                  {data[0]?.propertyFeilds?.virtualTour && (
                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">360° Virtual Tour</h4>
                      <div className="row">
                        <VirtualTour360
                          link={data[0]?.propertyFeilds?.virtualTour}
                        />
                      </div>
                    </div>
                  )}

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="row">
                      <AllReviews propertyId={params.id} />
                    </div>
                  </div>

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">
                      {" "}
                      {currentRtl === "ltr"
                        ? "Leave A Review"
                        : "اترك تقييمًا"}{" "}
                    </h4>
                    <div className="row">
                      <ReviewBoxForm propertyId={params.id} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="column">
                    <div className="agent-single-form home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                      <h4 dir={currentRtl} className="form-title mb25">
                        {currentRtl === "ltr"
                          ? "Contact Form"
                          : " نموذج الاتصال"}
                      </h4>
                      <FormContactSingle
                        userId={data[0]?.userId}
                        porpertyId={params.id}
                        currentRtl={currentRtl}
                      />
                    </div>
                    <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                      <div className="widget-wrapper mb-0">
                        <h6 dir={currentRtl} className="title fz17 mb30">
                          {currentRtl === "ltr"
                            ? "Get More Information"
                            : "احصل على معلومات اكثر"}
                        </h6>
                        <ContactWithAgent
                          userId={data[0]?.userId}
                          currentRtl={currentRtl}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt30 align-items-center justify-content-between">
                <div className="col-auto">
                  <div className="main-title">
                    <h2 className="title">
                      {" "}
                      {currentRtl === "ltr"
                        ? "Related Properties"
                        : "الخصائص المتعلقة"}{" "}
                    </h2>
                  </div>
                </div>

                <div className="col-auto mb30">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-auto">
                      <button className="featured-prev__active swiper_button">
                        <i className="far fa-arrow-left-long" />
                      </button>
                    </div>

                    <div className="col-auto">
                      <div className="pagination swiper--pagination featured-pagination__active" />
                    </div>

                    <div className="col-auto">
                      <button className="featured-next__active swiper_button">
                        <i className="far fa-arrow-right-long" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="property-city-slider">
                    <NearbySimilarProperty />
                  </div>
                </div>
              </div>
            </div>
          </section>{" "}
        </>
      )}

      <section className=" pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default SingleV4;
const style = {
  warningBox: {
    padding: "12px",
    width: "100%",
    background: "#FFCC00",
    boxShadow: 3,
  },
};
