"use client";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import { deleteFvrtIdInUsers } from "@/services/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatNumberWithComma } from "@/utilis/helpers";
const ListingsFavourites = ({ userId, fvrtPropertyData }) => {
  const handleDeleteListing = (Fvrtid, userId) => {
    deleteFvrtIdInUsers(userId, Fvrtid)
      .then(() => toast.success("Deleted From Favourite"))
      .catch((err) => {
        toast.error("There is some Error In Deleting", err);
        console.log(err, "err");
      });
  };

  return (
    <>
      {!fvrtPropertyData ? (
        <h3>No items available.</h3>
      ) : (
        fvrtPropertyData?.map((listing) => (
          <div className="col-md-6 col-lg-4 col-xl-3" key={listing.id}>
            <div className="listing-style1 style2">
              <div className="list-thumb">
                <Image
                  width={382}
                  height={208}
                  className="w-100  cover"
                  src={listing?.propertyFeilds?.uploadedImages[0]}
                  alt="listings"
                />

                <button
                  className="tag-del"
                  title="Delete Item"
                  onClick={() => handleDeleteListing(listing?.id, userId)}
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${listing?.id}`}
                >
                  <span className="fas fa-trash-can"></span>
                </button>

                <ReactTooltip
                  id={`delete-${listing?.id}`}
                  place="left"
                  content="Delete"
                />

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
                    {listing?.propertyFeilds?.sizeInft} sqft
                  </a>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <span className="for-what">
                    {listing?.propertyFeilds?.listedInValue[0]?.label}
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
        ))
      )}
      <ToastContainer />
    </>
  );
};

export default ListingsFavourites;
