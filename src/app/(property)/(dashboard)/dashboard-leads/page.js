"use client";
import DashboardHeader from "@/components/common/DashboardHeader";
import Footer from "@/components/property/dashboard/Footer";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import React, { useContext } from "react";
import UserDataTable from "@/components/property/dashboard/dashboard-all-user/UsersDataTable";
import LeadsDataTable from "@/components/property/dashboard/dashboard-leads/Allleads";
import { RtlContext } from "@/Context/RtlContext";

const Page = () => {
  const { currentRtl } = useContext(RtlContext);
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

              <div className="row align-items-center pb40" dir={currentRtl}>
                <div className="col-xxl-3">
                  <div className="dashboard_title_area">
                    <h2>
                      {currentRtl === "ltr" ? "All Leads" : "جميع الخيوط"}{" "}
                    </h2>
                    <p className="text">
                      {currentRtl === "ltr"
                        ? "The list of that users who filled your contact form"
                        : "قائمة المستخدمين الذين ملأوا نموذج الاتصال الخاص بك"}
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="packages_table table-responsive">
                      {/* <UserDataTable /> */}
                      <LeadsDataTable currentRtl={currentRtl} />
                    </div>
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

export default Page;
