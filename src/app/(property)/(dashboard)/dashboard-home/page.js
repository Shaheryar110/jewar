"use client";
import { AuthContext } from "@/Context/AuthContext";
import { RtlContext } from "@/Context/RtlContext";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import RecentActivities from "@/components/property/dashboard/dashboard-home/RecentActivities";
import TopStateBlock from "@/components/property/dashboard/dashboard-home/TopStateBlock";
import PropertyViews from "@/components/property/dashboard/dashboard-home/property-view";
import { countOfEveryThing } from "@/services/propertyServices";
import { useContext, useEffect, useState } from "react";

const DashboardHome = () => {
  const { currentUser } = useContext(AuthContext);
  const { currentRtl } = useContext(RtlContext);
  return (
    <>
      <DashboardHeader />
      {/* Main Header Nav */}

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

                <div className="col-lg-12">
                  <div className="dashboard_title_area" dir={currentRtl}>
                    <h2>
                      {currentUser
                        ? currentUser.displayName
                          ? currentUser.displayName
                          : currentUser.email
                        : null}
                    </h2>
                    <p className="text">
                      {currentRtl === "ltr"
                        ? "We are glad to see you again!"
                        : "نحن سعداء لرؤيتك مرة أخرى!"}
                    </p>
                  </div>
                </div>
                {/* col-lg-12 */}
              </div>
              {/* End .row */}

              <div className="row">
                <TopStateBlock currentRtl={currentRtl} />
              </div>
              {/* End .row */}
              {/* <div className="col-xl-12">
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb25">Recent Activities</h4>
                  <RecentActivities />
                </div>
              </div> */}
              <div className="col-xl-12">
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <div className="row">
                    <PropertyViews currentRtl={currentRtl} />
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

export default DashboardHome;
