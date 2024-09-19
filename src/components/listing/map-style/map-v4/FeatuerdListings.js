"use client";
import { AuthContext } from "@/Context/AuthContext";
import { getUserByIdAndAddFvrtInuser } from "@/services/Dashboard";
import { formatNumberWithComma } from "@/utilis/helpers";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import toast from "react-hot-toast";

const FeaturedListings = ({ data, colstyle }) => {
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
  return (
    <>
      {data?.length > 0 &&
        data?.map((listing, index) => (
          <div
            className={`${colstyle ? "col-sm-12 col-lg-6" : "col-sm-6"}  `}
            key={index}
          >
            <div
              className={
                colstyle
                  ? "listing-style6 listCustom listing-type"
                  : "listing-style6"
              }
            >
              <div className="list-thumb">
                <Link href={`/single/${listing?.id}`}>
                  <Image
                    width={386}
                    height={334}
                    className="w-100 cover"
                    style={{ height: "334px" }}
                    src={listing.image}
                    alt="listings"
                  />
                </Link>
                <div className="sale-sticker-wrap">
                  {listing?.featured && (
                    <div className="list-tag fz12">
                      <span className="flaticon-electricity me-2" />
                      FEATURED
                    </div>
                  )}
                </div>

                <div className="list-meta">
                  <div className="icons">
                    <a onClick={() => AddToFavorite(listing?.id)}>
                      <span className="flaticon-like" />
                    </a>
                    <a href={`/single/${listing?.id}`} target="_blank">
                      <span className="flaticon-new-tab" />
                    </a>
                    <a href={`/single/${listing?.id}`}>
                      <span className="flaticon-fullscreen" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="list-content">
                {/* <div className="list-price mb-2">{listing.price}</div> */}
                <h6 className="list-title">{listing.title}</h6>
                <p className="list-text">{listing.location}</p>
                <div className="customeButton">
                  {formatNumberWithComma(listing.price)}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default FeaturedListings;
