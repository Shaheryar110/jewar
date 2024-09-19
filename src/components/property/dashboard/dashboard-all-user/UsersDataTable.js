"use client";
import { getAllUsers } from "@/services/user";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const UserDataTable = ({ currentRtl }) => {
  const [Data, setPData] = useState();
  useEffect(() => {
    getAllUsers().then((data) => setPData(data));
  }, []);
  useEffect(() => {
    console.log(Data);
  }, [Data]);
  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">{currentRtl === "ltr" ? "Photo" : "الصورة"}</th>
          <th scope="col">
            {currentRtl === "ltr" ? "Display Name" : "اسم العرض"}
          </th>
          <th scope="col">
            {currentRtl === "ltr" ? "Email" : "البريد الإلكتروني"}
          </th>
        </tr>
      </thead>
      <tbody className="t-body">
        {Data?.map((property, index) => (
          <tr key={index}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">
                  <Image
                    width={110}
                    height={94}
                    className="w-100"
                    src={
                      property?.photoURL
                        ? property?.photoURL
                        : "/images/paris.svg"
                    }
                    alt="property"
                  />
                </div>
                {/* <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">{property?.displayName}</div>
                </div> */}
              </div>
            </th>
            <td className="vam">
              {property?.displayName ? property?.displayName : "No Name Found"}
            </td>
            <td className="vam">{property?.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserDataTable;
