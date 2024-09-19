"use client";
import { RtlContext } from "@/Context/RtlContext";
import { blogsThree } from "@/data/blogs";
import { getAllBlogs } from "@/services/Blogs";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const BlogFilter = ({ data }) => {
  const [filteredBlogs, setFilteredBlogs] = useState(data);
  const [activeCategory, setActiveCategory] = useState("All");
  const { currentRtl } = useContext(RtlContext);

  const handleFilter = (category) => {
    if (category === "All") {
      setFilteredBlogs(data);
    } else {
      const filtered = filteredBlogs?.filter((blog) =>
        blog.category.some((cat) => cat.label === category)
      );
      setFilteredBlogs(filtered);
    }
    setActiveCategory(category);
  };

  const categories = [];
  const categoriesAr = [
    {
      category: "All",
      text: "الكل",
    },
    {
      category: "Home Improvement",
      text: "تحسين المنزل",
    },
    {
      category: "Life & Style",
      text: "الحياة والأسلوب",
    },
    {
      category: "Finance",
      text: "المالية",
    },
    {
      category: "Selling a Home",
      text: "بيع منزل",
    },
    {
      category: "Renting a Home",
      text: "تأجير منزل",
    },
    {
      category: "Buying a Home",
      text: "شراء منزل",
    },
  ];
  const list = currentRtl === "ltr" ? categories : categoriesAr;
  useEffect(() => {
    setFilteredBlogs(data);
  }, [data]);
  return (
    <>
      <ul className="nav nav-pills mb20">
        {list.map((item, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link mb-2 mb-lg-0 fw500 dark-color ${
                item.category === activeCategory ? "active" : ""
              }`}
              onClick={() => handleFilter(item.category)}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
      {/* End nav */}

      {filteredBlogs ? (
        <div className="row">
          {filteredBlogs.length > 0 ? (
            filteredBlogs?.map((blog, index) => {
              let dateString = blog.date;
              const [day, month, year] = dateString.split(".");
              return (
                <div className="col-sm-6 col-lg-4" key={index}>
                  <div className="blog-style1">
                    <div className="blog-img">
                      <Image
                        width={386}
                        height={271}
                        // className="cover"
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
    </>
  );
};

export default BlogFilter;
