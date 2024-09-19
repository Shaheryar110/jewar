"use client";
import DashboardHeader from "@/components/common/DashboardHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import SellingSection from "@/components/property/dashboard/dashboard-cms/SellingSection";
import { getCmsData } from "@/services/cms";
import React, { useEffect, useState } from "react";

const DashboardCms = () => {
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

              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p40 mb30 overflow-hidden position-relative">
                    <div className="packages_table table-responsive">
                      {/* <UserDataTable /> */}
                      <div
                        className=""
                        style={{ width: "100%", overflowX: "hidden" }}
                      >
                        <SellingSection />
                        {/* <SellingSection
                          docName={"rightOption"}
                          heading={"Users Selling Section"}
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardCms;
