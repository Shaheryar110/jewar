"use client";
import { AuthContext } from "@/Context/AuthContext";
import { auth } from "@/Firebase/Config";
import { getUserByIdAndAddFvrtInuser } from "@/services/Dashboard";
import { getAllProperty } from "@/services/propertyServices";
import { formatNumberWithComma } from "@/utilis/helpers";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const NearbySimilarProperty = () => {
  const [filteredListings, setFilteredListings] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const AddToFavorite = (propertyId) => {
    if (currentUser?.uid) {
      getUserByIdAndAddFvrtInuser(currentUser?.uid, propertyId).then(() =>
        toast.success("Property Added in favourites")
      );
    } else {
      toast.error("Please Login to add favorite");
    }
  };

  useEffect(() => {
    getAllProperty(true)
      .then((data) => {
        setFilteredListings(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {filteredListings?.slice(0, 5)?.map((listing) => (
          <SwiperSlide key={listing.id}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">
                  <Image
                    width={382}
                    height={248}
                    src={listing.propertyFeilds.uploadedImages[0]}
                    alt="listings"
                  />
                  <div className="sale-sticker-wrap">
                    {listing.propertyFeilds.forRent && (
                      <div className="list-tag rounded-0 fz12">
                        <span className="flaticon-electricity" />
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="list-price">
                    {formatNumberWithComma(listing.propertyFeilds.price)} /{" "}
                    <span>mo</span>
                  </div>
                </div>
                <div className="list-content">
                  <h6 className="list-title">
                    <Link href={`/single-v1/${listing.id}`}>
                      {listing.title}
                    </Link>
                  </h6>
                  <p className="list-text">{listing.location}</p>
                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-bed" />{" "}
                      {listing.propertyFeilds.bedrooms} bed
                    </a>
                    <a href="#">
                      <span className="flaticon-shower" />{" "}
                      {listing.propertyFeilds.bathrooms} bath
                    </a>
                    <a href="#">
                      <span className="flaticon-expand" />{" "}
                      {listing.propertyFeilds.sizeInft} sq meters
                    </a>
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">For Rent</span>
                    <div className="icons d-flex align-items-center">
                      <a href={`/single/${listing.id}`} target="_blank">
                        <span className="flaticon-fullscreen" />
                      </a>
                      <a href="#">
                        <span className="flaticon-new-tab" />
                      </a>
                      <a
                        href=""
                        onClick={(e) => {
                          e.stopPropagation();
                          AddToFavorite(listing.id);
                        }}
                      >
                        <span className="flaticon-like" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default NearbySimilarProperty;
