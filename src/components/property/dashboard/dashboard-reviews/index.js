"use client";
import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
import { getReviewOfUserByPropertyId } from "@/services/Review";

const AllReviews = ({ data, setReCall, reCall, currentRtl }) => {
  return (
    <div className="product_single_content mb50">
      <div className="mbp_pagination_comments">
        <div className="row">
          <div className="col-lg-12">
            <div className="total_review d-flex align-items-center justify-content-between mb20 mt60">
              <h6 className="fz17 mb15">
                <i className="fas fa-star fz12 pe-2" />
                5.0 · {data?.length}{" "}
                {currentRtl === "ltr" ? "reviews" : "التعليقات"}
              </h6>
            </div>
          </div>

          <SingleReview data={data} setReCall={setReCall} reCall={reCall} />
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
