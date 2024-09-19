"use client";
import { getAllLeads } from "@/services/user";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";

const LeadsDataTable = ({ currentRtl }) => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [Data, setPData] = useState();
  useEffect(() => {
    if (currentUser?.uid)
      getAllLeads(currentUser).then((data) => setPData(data));
  }, [currentUser]);
  useEffect(() => {
    console.log(Data, "Data");
  }, [Data]);

  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">{currentRtl === "ltr" ? "Name" : "الاسم"}</th>
          <th scope="col">
            {currentRtl === "ltr" ? "Email" : "البريد الإلكتروني"}
          </th>
          <th scope="col">{currentRtl === "ltr" ? "Phone" : "الهاتف"}</th>
          <th scope="col">{currentRtl === "ltr" ? "Message" : "الرسالة"}</th>
          <th scope="col">{currentRtl === "ltr" ? "Send" : "إرسال"}</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {Data?.map((property, index) => (
          <tr key={index}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <td className="vam">{property?.formFeilds?.name}</td>
              </div>
            </th>
            <td className="vam">{property?.formFeilds?.email}</td>
            <td className="vam">{property?.formFeilds?.phone}</td>
            <td className="vam">{property?.formFeilds?.message}</td>
            <td className="vam">
              {" "}
              <button
                onClick={() => {
                  router.push(
                    `/dashboard-message?data=${JSON.stringify(
                      property?.userId
                    )}`
                  );
                }}
                className="ud-btn btn-thm mb15"
              >
                Send Message
                <i className="fal fa-arrow-right-long" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadsDataTable;
