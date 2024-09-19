"use client";
import { auth, db } from "@/Firebase/Config";
import {
  getAllProperty,
  getAllPropertyByUserId,
} from "@/services/propertyServices";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AuthContext } from "@/Context/AuthContext";
import { formatNumberWithComma } from "@/utilis/helpers";
import { doc, deleteDoc } from "firebase/firestore";
const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "pending-style style1";
    case "Published":
      return "pending-style style2";
    case "Processing":
      return "pending-style style3";
    case "Rejected":
      return "pending-style style3";
    default:
      return "";
  }
};

const PropertyDataTable = ({ currentRtl }) => {
  const [Data, setPData] = useState();
  const { currentUser } = useContext(AuthContext);

  const fetchProperty = (id) => {
    getAllPropertyByUserId(id, false).then((data) => {
      if (data === "Please Login First") return;
      setPData(data);
      console.log(data);
    });
  };
  const deleteProperty = async (id) => {
    await deleteDoc(doc(db, "Property", id));
    fetchProperty(currentUser?.uid);
  };
  useEffect(() => {
    if (currentUser?.uid) {
      fetchProperty(currentUser?.uid);
    }
  }, [currentUser?.uid]);
  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">
            {currentRtl === "ltr" ? "Listing title" : "عنوان القائمة"}
          </th>
          <th scope="col">
            {currentRtl === "ltr" ? "City / District" : "المدينة / الحي"}
          </th>
          <th scope="col">{currentRtl === "ltr" ? "Status" : "الحالة"}</th>
          <th scope="col">{currentRtl === "ltr" ? "View" : "العرض"}</th>
          <th scope="col">{currentRtl === "ltr" ? "Action" : "الإجراء"}</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {Data && Data?.length > 0 ? (
          Data?.map((property, index) => (
            <tr key={index}>
              <th scope="row">
                <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                  <div className="list-thumb">
                    <Image
                      width={110}
                      height={94}
                      className="cover"
                      src={property?.propertyFeilds?.uploadedImages[0]}
                      alt="property"
                    />
                  </div>
                  <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                    <div className="h6 list-title">
                      <Link href={`/single/${property?.id}`}>
                        {property?.propertyFeilds?.name}
                      </Link>
                    </div>

                    <div className="list-price">
                      <a href="">
                        $
                        {formatNumberWithComma(property?.propertyFeilds?.price)}
                      </a>
                    </div>
                  </div>
                </div>
              </th>
              <td className="vam" style={{ width: "20%" }}>
                {property?.propertyFeilds?.City
                  ? property?.propertyFeilds?.City?.label
                  : null}{" "}
                /{" "}
                {property?.propertyFeilds?.District
                  ? property?.propertyFeilds?.District?.label
                  : null}
              </td>
              <td className="vam">
                {property?.propertyFeilds?.status && (
                  <span
                    className={getStatusStyle(property?.propertyFeilds?.status)}
                  >
                    {property?.propertyFeilds?.status}
                  </span>
                )}
              </td>
              <td className="vam">{property?.views}</td>
              <td className="vam">
                <div className="d-flex">
                  <button
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`edit-${property?.propertyFeilds?.customId}`}
                  >
                    <Link href={`/dashboard-edit-property/${property?.id}`}>
                      <span className="fas fa-pen fa" />
                    </Link>
                  </button>
                  <button
                    className="icon"
                    style={{ border: "none" }}
                    onClick={() => deleteProperty(property?.id)}
                    data-tooltip-id={`delete-${property?.propertyFeilds?.customId}`}
                  >
                    <span className="flaticon-bin" />
                  </button>

                  <ReactTooltip
                    id={`edit-${property?.propertyFeilds?.customId}`}
                    place="top"
                    content="Edit"
                  />
                  <ReactTooltip
                    id={`delete-${property?.propertyFeilds?.customId}`}
                    place="top"
                    content="Delete"
                  />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <>
            <h5>
              {" "}
              {currentRtl === "ltr"
                ? "No Properties Found"
                : "لم يتم العثور على خصائص"}{" "}
            </h5>
          </>
        )}
      </tbody>
    </table>
  );
};

export default PropertyDataTable;
