"use client";
import { AuthContext } from "@/Context/AuthContext";
import { RtlContext } from "@/Context/RtlContext";
import { auth } from "@/Firebase/Config";
import listings from "@/data/listings";
import { getUserByIdAndAddFvrtInuser } from "@/services/Dashboard";
import { getAllProperty } from "@/services/propertyServices";
import { formatNumberWithComma } from "@/utilis/helpers";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FilterProperties = () => {
  const [selectedTag, setSelectedTag] = useState("House");
  const [filteredListings, setSFilteredListings] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { currentRtl } = useContext(RtlContext);
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    getAllProperty(true)
      .then((data) => {
        let filter = data.filter(
          (item) =>
            item.propertyFeilds.category[0].value === tag &&
            item?.propertyFeilds?.isPopular === "Yes"
        );
        setSFilteredListings(filter);
      })
      .catch((err) => console.log(err));
  };

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
        let filter = data
          .sort((a, b) => (b?.views || 0) - (a?.views || 0))
          .slice(0, 6);

        setSFilteredListings(filter);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="row wow fadeInUp" data-wow-delay="100ms" dir={currentRtl}>
        <div className="col-lg-6">
          <div className="main-title2">
            <h2 className="title">
              {currentRtl === "ltr"
                ? "Discover Popular Properties"
                : "اكتشف العقارات المشهورة"}{" "}
            </h2>
            {/* <p className="paragraph">Aliquam lacinia diam quis lacus euismod</p> */}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="dark-light-navtab style2 text-start text-lg-end mt-0 mt-lg-4 mb-4">
            <ul className="nav nav-pills justify-content-start justify-content-lg-end">
              <li className="nav-item">
                <button
                  className={`nav-link mb10-sm ${
                    selectedTag === "Houses" ? "active" : ""
                  }`}
                  onClick={() => handleTagClick("Houses")}
                >
                  {currentRtl === "ltr" ? "House" : "بيت"}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link mb10-sm ${
                    selectedTag === "Villa" ? "active" : ""
                  }`}
                  onClick={() => handleTagClick("Villa")}
                >
                  {currentRtl === "ltr" ? "Villa" : "فيلا"}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link mb10-sm ${
                    selectedTag === "Office" ? "active" : ""
                  }`}
                  onClick={() => handleTagClick("Office")}
                >
                  {currentRtl === "ltr" ? "Office" : "مكتب"}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link mb10-sm ${
                    selectedTag === "Apartments" ? "active" : ""
                  }`}
                  onClick={() => handleTagClick("Apartments")}
                >
                  {currentRtl === "ltr" ? "Apartments" : "شقق"}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link mb10-sm ${
                    selectedTag === "Bungalow" ? "active" : ""
                  }`}
                  onClick={() => handleTagClick("Bungalow")}
                >
                  {currentRtl === "ltr" ? "Bungalow" : "بنغلو"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
          <div className="tab-content">
            <div className="row">
              {filteredListings && filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <div className="col-md-6 col-xl-4" key={listing?.id}>
                    <div className="listing-style6">
                      <div className="list-thumb">
                        <Link href={`/single/${listing?.id}`}>
                          <Image
                            width={386}
                            height={334}
                            className="w-100 cover"
                            src={
                              listing?.propertyFeilds?.uploadedImages?.length >
                                0 && listing?.propertyFeilds?.uploadedImages[0]
                            }
                            alt="listings"
                          />
                        </Link>

                        <div className="sale-sticker-wrap">
                          {listing?.propertyFeilds?.isFeatured === "Yes" && (
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
                        <h6 className="list-title" style={{ width: "65%" }}>
                          {/* <Link href={`/single/${listing?.id}`}> */}
                          {listing?.propertyFeilds?.name}
                          {/* </Link> */}
                        </h6>
                        <p className="list-text">
                          {listing?.propertyFeilds?.address}
                        </p>
                        <div className="customeButton">
                          {formatNumberWithComma(
                            listing?.propertyFeilds?.price
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h4
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                    fontWeight: 600,
                  }}
                >
                  No Property Found
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default FilterProperties;
