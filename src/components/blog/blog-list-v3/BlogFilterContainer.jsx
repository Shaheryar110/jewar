"use client";

import React, { useEffect, useState } from "react";
import BlogFilter from "./BlogFilter";
import Pagination from "../Pagination";
import toast from "react-hot-toast";
import { getAllBlogs } from "@/services/Blogs";

export default function BlogFilterContainer({ currentRtl }) {
  const [data, setData] = useState();
  const getData = () => {
    getAllBlogs()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        toast.error("Error Loading Blogs");
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="our-blog pt-0">
      <div className="container">
        <div
          className="row"
          data-aos="fade-up"
          data-aos-delay="300"
          dir={currentRtl}
        >
          <div className="col-xl-12 navpill-style1">
            <BlogFilter data={data} />
          </div>
        </div>
        {/* End .row */}

        {data && data.length > 0 && (
          <div className="row">
            <div className="mbp_pagination text-center">
              {/* <Pagination /> */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
