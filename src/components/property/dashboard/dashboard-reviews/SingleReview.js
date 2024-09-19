import React from "react";
import DataReviewRender from "./DataReviewRender";

const SingleReview = ({ data, setReCall, reCall }) => {
  console.log(data);
  return (
    <>
      {data?.map((review, index) => {
        return (
          <DataReviewRender
            key={index}
            review={review}
            setReCall={setReCall}
            reCall={reCall}
          />
        );
      })}
    </>
  );
};

export default SingleReview;
