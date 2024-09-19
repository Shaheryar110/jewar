"use client";
import { getUserById } from "@/services/user";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SingleReview = ({ data }) => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const promises = data?.map(async (element) => {
        const user = await getUserById(element?.userId);
        return { userId: element?.userId, user };
      });

      const userDataArray = await Promise.all(promises);

      setUserInfo(userDataArray);
    };

    fetchUserData();
  }, [data]);

  return (
    <>
      {data &&
        data?.length > 0 &&
        data?.map((review, index) => (
          <div className="col-md-12" key={index}>
            <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
              <Image
                width={60}
                height={60}
                src={
                  userInfo[index] && userInfo[index].user?.photoURL
                    ? userInfo[index].user?.photoURL
                    : "/images/blog/comments-2.png"
                }
                className="mr-3"
                alt="comments-2.png"
                style={{ borderRadius: "50%" }}
              />
              <div className="ml20">
                <h6 className="mt-0 mb-0">{review?.data?.email}</h6>
                <div>
                  <span className="fz14">{review?.reviewDate}</span>
                  <div className="blog-single-review">
                    <ul className="mb0 ps-0">
                      {[...Array(Number(review?.data?.rating))].map((_, i) => (
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

            <p className="text mt20 mb20">{review?.data?.review}</p>
            {/* <ul className="mb20 ps-0">
            {review.images.map((image, i) => (
              <li className="list-inline-item mb5-xs" key={i}>
                <Image
                  width={110}
                  height={90}
                  className="bdrs6"
                  src={image}
                  alt="review-img"
                />
              </li>
            ))}
          </ul> */}
          </div>
        ))}
    </>
  );
};

export default SingleReview;
