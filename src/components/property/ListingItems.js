import { formatNumberWithComma } from "@/utilis/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ListingItems = ({ data }) => {
  return (
    <>
      {data?.map((listing) => (
        <div className="col-md-6" key={listing?.id}>
          <div className="listing-style1">
            <div className="list-thumb">
              <Image
                width={382}
                height={248}
                className=" cover"
                src={listing?.propertyFeilds?.uploadedImages[0]}
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {listing?.propertyFeilds?.listedInValue[0]?.label ===
                  "Rent" && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    FEATURED
                  </div>
                )}
              </div>

              <div className="list-price">
                {formatNumberWithComma(listing?.propertyFeilds?.price)} /{" "}
                <span>mo</span>
              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
                <Link href={`/single/${listing?.id}`}>
                  {listing?.propertyFeilds?.name}
                </Link>
              </h6>
              <p className="list-text">{listing?.propertyFeilds?.address}</p>
              <div className="list-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" />{" "}
                  {listing?.propertyFeilds?.bedrooms} bed
                </a>
                <a href="#">
                  <span className="flaticon-shower" />{" "}
                  {listing?.propertyFeilds?.bathrooms} bath
                </a>
                <a href="#">
                  <span className="flaticon-expand" />{" "}
                  {listing?.propertyFeilds?.lotSizeInft} sqft
                </a>
              </div>
              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what">
                  For {listing?.propertyFeilds?.listedInValue[0]?.label}
                </span>
                <div className="icons d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-fullscreen" />
                  </a>
                  <a href="#">
                    <span className="flaticon-new-tab" />
                  </a>
                  <a href="#">
                    <span className="flaticon-like" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListingItems;
