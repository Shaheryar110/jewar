"use client";
import { updateReviewWithHelpful } from "@/services/Review";
import { getUserById } from "@/services/user";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DataReviewRender = ({ review, setReCall, reCall }) => {
  const [clinetID, setClientId] = useState();
  const addHelpfulCountwithcurrentUser = (uid, reviewUserId, type) => {
    updateReviewWithHelpful(uid, reviewUserId, type)
      .then((data) => {
        toast.success("Your Review Added ( Thank You )");
        setReCall(!reCall);
      })
      .catch((err) => {
        toast.error("Failed");
      });
  };

  useEffect(() => {
    getUserById(review?.userId).then((data) => {
      setClientId(data);
    });
  }, []);

  return (
    <>
      <div className="col-md-12">
        <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
          <Image
            width={60}
            height={60}
            style={{ borderRadius: "50%" }}
            src={
              clinetID?.photoURL
                ? clinetID?.photoURL
                : "/images/blog/comments-2.png"
            }
            className="mr-3"
            alt="comments-2.png"
          />
          <div className="ml20">
            <h6 className="mt-0 mb-0">{review?.data?.email}</h6>
            <div>
              <span className="fz14">{review?.reviewDate}</span>
              <div className="blog-single-review">
                <ul className="mb0 ps-0">
                  {[...Array(Number(review?.data?.rating))]?.map((_, i) => (
                    <li className="list-inline-item me-0" key={i}>
                      <a href="#">
                        <i className="fas fa-star review-color2 fz10" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* End .d-flex */}

        <p className="text mt20 mb20">{review?.review?.review}</p>

        <div className="review_cansel_btns d-flex bdrb1 pb30">
          <a
            style={{
              color: review?.helpfulUsers?.includes(clinetID?.userId)
                ? "green"
                : "black",
            }}
            onClick={() =>
              addHelpfulCountwithcurrentUser(
                clinetID?.userId,
                review?.docId,
                "helpful"
              )
            }
          >
            {review?.helpful} <i className="fas fa-thumbs-up" />
            Helpful
          </a>
          <a
            style={{
              color: review?.notHelpfulUsers?.includes(clinetID?.userId)
                ? "red"
                : "black",
            }}
            onClick={() =>
              addHelpfulCountwithcurrentUser(
                clinetID?.userId,
                review?.docId,
                "notHelpful"
              )
            }
          >
            {review?.notHelpful} <i className="fas fa-thumbs-down" />
            Not helpful
          </a>
        </div>
      </div>
      {/* <ToastBar /> */}
    </>
  );
};

export default DataReviewRender;
