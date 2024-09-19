import React from "react";
import SingleReview from "./SingleReview";

const sortOptions = [
  "Newest",
  "Best Seller",
  "Best Match",
  "Price Low",
  "Price High",
];

const AllReviews = ({ finalReviws }) => {
  return (
    <div className="product_single_content mb50">
      <div className="mbp_pagination_comments">
        <div className="row">
          <div className="col-lg-12">
            <div className="total_review d-flex align-items-center justify-content-between mb20 mt60">
              <h6 className="fz17 mb15">
                <i className="fas fa-star fz12 pe-2" />
                {finalReviws?.length} reviews
              </h6>
            </div>
          </div>
          {/* End review filter */}

          <SingleReview data={finalReviws} />

          {/* End reviews */}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
