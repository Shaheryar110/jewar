"use client";
import { allblogs } from "@/data/blogs";
import { getUserById } from "@/services/user";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Details({ data }) {
  const [blogUser, seBlogUser] = useState();
  useEffect(() => {
    getUserById(data.user_id).then((data) => {
      seBlogUser(data);
    });
  }, []);
  return (
    <>
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12">
            <h2 className="blog-title">
              {data.title ||
                `7 Simple Ways to Keep Your Kid&apos;s Toys From Taking Over Your
                Home`}
            </h2>
            <div className="blog-single-meta">
              <div className="post-author d-sm-flex align-items-center">
                <Avatar
                  alt="Remy Sharp"
                  className="mr10"
                  src={
                    blogUser && blogUser?.photoURL != ""
                      ? blogUser?.photoURL
                      : blogUser?.displayName
                  }
                  sx={{ width: 36, height: 36 }}
                />
                {/* <Image
                  width={40}
                  height={40}
                  className="mr10"
                 
                  alt="blog"
                  style={{ borderRadius: "50%" }}
                /> */}
                <a className="pr15 bdrr1" href="#">
                  {blogUser && blogUser?.displayName != ""
                    ? blogUser?.displayName
                    : blogUser?.email}
                </a>
                {data &&
                  data?.category?.map((tag, index) => {
                    return (
                      <>
                        <a className="ml15 pr15 bdrr1" href="#" key={index}>
                          {tag.label}
                        </a>
                      </>
                    );
                  })}
                <a className="ml15" href="#">
                  {data?.date}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .container */}

      <div
        className="mx-auto maxw1600 mt60"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="large-thumb">
              <Image
                width={1600}
                height={600}
                priority
                className=" cover"
                // style={{maxHeight:'600px',objectFit:'cover'}}
                src={
                  data?.images
                    ? data?.images[0]
                    : "/images/blog/blog-single-1.jpg"
                }
                alt="blog"
                style={{ borderRadius: "30px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
