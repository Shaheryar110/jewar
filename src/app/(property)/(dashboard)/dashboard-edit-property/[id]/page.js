"use client";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import AddPropertyTabContent from "@/components/property/dashboard/dashboard-edit-property";
import { getPropertyByUidAndPid } from "../../../../../services/propertyServices";
import { AuthContext } from "@/Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Script from "next/script";
const DashboardAddProperty = ({ params }) => {
  const { currentUser } = useContext(AuthContext);
  const [property, setProperty] = useState();
  useEffect(() => {
    if (params.id && currentUser?.uid) {
      getPropertyByUidAndPid(currentUser?.uid, params.id).then((data) => {
        if (data) {
          console.log(data, "edit");
          setProperty({ ...data, id: params.id });
        }
      });
    }
  }, [params.id, currentUser?.uid]);
  return (
    <>
      {/* Main Header Nav */}
      {/* <Script
        type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560&libraries=places"
        strategy="afterInteractive"
        async
      ></Script> */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-md">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content property-page bgc-f7">
              <div className="row pb40 d-block d-lg-none">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Edit Property</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              {property && (
                <div className="row">
                  <div className="col-xl-12">
                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                      <div className="navtab-style1">
                        <AddPropertyTabContent property={property} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* End .row */}
            </div>
            {/* End dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardAddProperty;
