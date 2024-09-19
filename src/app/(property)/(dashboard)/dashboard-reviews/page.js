"use client";
import { AuthContext } from "@/Context/AuthContext";
import { RtlContext } from "@/Context/RtlContext";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Pagination from "@/components/property/Pagination";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import AllReviews from "@/components/property/dashboard/dashboard-reviews";
import { getReviewOfUserByPropertyId } from "@/services/Review";
import { useContext, useEffect, useState } from "react";

// export const metadata = {
//   title: "Dashboard Reviews || Jewar - Real Estate  ",
// };

const DashboardReviews = () => {
  const [data, setData] = useState();
  const [reCall, setReCall] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { currentRtl } = useContext(RtlContext);
  useEffect(() => {
    if (currentUser?.uid)
      getReviewOfUserByPropertyId(currentUser).then((data) => {
        setData(data);
      });
  }, [currentUser]);
  useEffect(() => {
    getReviewOfUserByPropertyId(currentUser).then((data) => {
      setData(data);
    });
    console.log(reCall, "reCall");
  }, [reCall]);
  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-lg-12" dir={currentRtl}>
                  <div className="dashboard_title_area">
                    <h2>{currentRtl === "ltr" ? "Reviews" : "التعليقات"}</h2>
                    <p className="text">
                      {currentRtl === "ltr"
                        ? "We are glad to see you again!"
                        : "نحن سعداء لرؤيتك مرة أخرى!"}
                    </p>{" "}
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <AllReviews
                      currentRtl={currentRtl}
                      data={data}
                      setReCall={setReCall}
                      reCall={reCall}
                    />
                    {data && data.length > 0 && (
                      <div className="mt30">
                        <Pagination />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardReviews;
