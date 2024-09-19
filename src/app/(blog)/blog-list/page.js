"use client";
import Pagination from "@/components/blog/Pagination";
import BlogFilter from "@/components/blog/blog-list-v3/BlogFilter";
import BlogFilterContainer from "@/components/blog/blog-list-v3/BlogFilterContainer";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/home/home-v4/footer";
import MobileMenu from "@/components/common/mobile-menu";
import { useContext } from "react";
import { RtlContext } from "@/Context/RtlContext";

// export const metadata = {
//   title: "Blog List v3  || Jewar - Real Estate  ",
// };

const BlogV3 = () => {
  const { currentRtl } = useContext(RtlContext);
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Start */}
      <section className="breadcumb-section" dir={currentRtl}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">
                  {currentRtl === "ltr" ? "Blog" : "مدونة"}
                </h2>
                <div className="breadcumb-list">
                  <a href="/">{currentRtl === "ltr" ? "Home" : "بيت"}</a>
                  <a href="/blog-list">
                    {currentRtl === "ltr" ? "Blog" : "مدونة"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Start */}

      {/* Blog Section Area */}
      <BlogFilterContainer currentRtl={currentRtl} />
      {/* End Blog Section Area */}

      {/* Start Our Footer */}
      <section className=" pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default BlogV3;
