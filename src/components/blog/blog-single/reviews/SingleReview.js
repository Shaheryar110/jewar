"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getReviewsByuserId } from "@/services/Review";
import { Avatar, Rating } from "@mui/material";

const SingleReview = ({ data, Review }) => {
  const [reviewDetaildById, setReviewDetaildById] = useState();

  useEffect(() => {
    getReviewsByuserId(data.userId)
      .then((data) => {
        setReviewDetaildById(data);
      })
      .catch((err) => console.log(err, "err"));
  }, []);

  return (
    <>
      <div className="col-md-12">
        <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
          <Avatar
            src={
              reviewDetaildById?.photoURL
                ? reviewDetaildById?.photoURL
                : reviewDetaildById?.displayName[0]
            }
          />
          <div className="ml20">
            <h6 className="mt-0 mb-0">
              {reviewDetaildById &&
              reviewDetaildById?.displayName &&
              reviewDetaildById?.displayName
                ? reviewDetaildById?.displayName
                : reviewDetaildById?.email
                ? reviewDetaildById?.email
                : "Anonymous"}
            </h6>
            <div>
              <span className="fz14">{data?.reviewDate}</span>
              <div className="blog-single-review">
                <ul className="mb0 ps-0">
                  <Rating
                    name="simple-controlled"
                    value={parseFloat(data?.review?.rating)}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="text mt20 mb20">{data?.review?.review}</p>

        <div className="review_cansel_btns d-flex bdrb1 pb30">
          <a href="#">
            <i className="fas fa-thumbs-up" />
            Helpful
          </a>
          <a href="#">
            <i className="fas fa-thumbs-down" />
            Not helpful
          </a>
        </div>
      </div>
      {Review?.length > 5 && (
        <div className="col-md-12">
          <div className="position-relative bdrb1 pt30 pb20">
            <a href="#" className="ud-btn btn-white2">
              Show all {Review?.length} reviews
              <i className="fal fa-arrow-right-long" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleReview;
