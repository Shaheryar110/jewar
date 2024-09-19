import Details from "@/components/blog/blog-single/Details";
import Features from "@/components/blog/blog-single/Features";
import Pagination from "@/components/blog/blog-single/Pagination";
import ReviewBoxForm from "@/components/blog/blog-single/ReviewBoxForm";
import Social from "@/components/blog/blog-single/Social";
import Tags from "@/components/blog/blog-single/Tags";
import TopComments from "@/components/blog/blog-single/TopComments";
import AllReviews from "@/components/blog/blog-single/reviews";
import Blog from "@/components/common/Blog";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "../../../../components/home/home-v4/footer";
import MobileMenu from "@/components/common/mobile-menu";
import { getBlogById } from "@/services/Blogs";

export const metadata = {
  title: "Blog Single  || Jewar - Real Estate  ",
};

function HTMLRenderer({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

const BlogSingle = async ({ params }) => {
  const singleBlog = await getBlogById(params.id);
  return (
    <>
      <DefaultHeader />

      <MobileMenu />

      <section className="our-blog pt50">
        <Details data={singleBlog} />

        <div className="container">
          <div className="roww" data-aos="fade-up" data-aos-delay="500">
            <div className="col-xl-8 offset-xl-2">
              <div className="row" style={{ marginTop: "30px" }}>
                <HTMLRenderer htmlString={singleBlog?.desc} />
              </div>

              <AllReviews blogId={singleBlog.id} />

              <div className="bsp_reveiw_wrt">
                <h6 className="fz17">Leave A Review</h6>
                <ReviewBoxForm blogId={singleBlog.id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb90 pb20-md pt-0">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="main-title text-start text-md-center">
                <h2 className="title">Related Posts</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
          </div>

          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <Blog />
          </div>
        </div>
      </section>

      <section className="pt60 pb-0">
        {/* <Footer /> */}
        <Footer />
      </section>
    </>
  );
};

export default BlogSingle;
