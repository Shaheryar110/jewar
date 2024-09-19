"use client";
import { getAllBlogs } from "@/services/Blogs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Blog = () => {
  const [blogs, setBlogs] = useState();
  const getData = () => {
    getAllBlogs()
      .then((data) => {
        setBlogs(data);
      })
      .catch((err) => {
        toast.error("Error Loading Blogs");
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {blogs ? (
        <div className="row">
          {blogs.length > 0 ? (
            blogs?.map((blog, index) => {
              let dateString = blog.date;
              const [day, month, year] = dateString.split(".");
              return (
                <div className="col-sm-6 col-lg-4" key={index}>
                  <div className="blog-style1">
                    <div className="blog-img">
                      <Image
                        width={386}
                        height={271}
                        className="w-100 h-100 cover"
                        src={
                          blog.images
                            ? blog.images[0]
                            : "/images/blog/blog-2.jpg"
                        }
                        alt="blog"
                      />
                    </div>
                    <div className="blog-content">
                      <div className="date">
                        <span className="month">{month}</span>
                        <span className="day">{day}</span>
                      </div>
                      <a className="tag" href="#">
                        {blog.tag}
                      </a>
                      <h6 className="title mt-1">
                        <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <h2>NO BLOGS FOUND !</h2>
            </>
          )}
        </div>
      ) : (
        <>
          <h2>Loading...</h2>
        </>
      )}
      <Toaster />
    </>
  );
};

export default Blog;
