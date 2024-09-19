"use client";
import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
import { getReviewsByPropertyId } from "../../../../../services/Review";

const AllReviews = ({ propertyId }) => {
  const [Review, setReview] = useState();
  const [reCall, setReCall] = useState(false);

  const calculateAverageRating = () => {
    let temp = 0;

    if (Review?.length > 0) {
      Review.forEach((item) => {
        temp = temp + Number(item.review.rating || 0);
      });
    }
    return temp / Review.length;
  };

  useEffect(() => {
    getReviewsByPropertyId(propertyId).then((data) => {
      setReview(data);
    });
  }, [reCall]);
  return (
    <div className="product_single_content mb50">
      <div className="mbp_pagination_comments">
        <div className="row">
          {Review && Review?.length > 0 && (
            <div className="col-lg-12">
              <div className="total_review d-flex align-items-center justify-content-between mb20">
                <h6 className="fz17 mb15">
                  <i className="fas fa-star fz12 pe-2" />
                  {calculateAverageRating()} · {Review?.length} reviews
                </h6>
                <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end"></div>
              </div>
            </div>
          )}
          {/* End review filter */}
          {Review?.length > 0 &&
            Review.map((item, index) => (
              <SingleReview
                data={item}
                Review={Review}
                key={index}
                setReCall={setReCall}
                reCall={reCall}
              />
            ))}

          {/* End reviews */}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
