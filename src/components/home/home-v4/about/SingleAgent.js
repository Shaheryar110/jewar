"use client";
import { getUsersOrderedByTimestamp } from "@/services/user";
import Image from "next/image";
import { useEffect, useState } from "react";

const SingleAgent = () => {
  const [recentUsers, setRecentUsers] = useState([]);
  useEffect(() => {
    getUsersOrderedByTimestamp().then((data) => setRecentUsers(data));
  }, []);
  return (
    <div className="exclusive-agent-single mb30-sm">
      {recentUsers && (
        <div className="agent-img">
          <Image
            width={210}
            height={240}
            src={
              recentUsers && recentUsers[0]?.photoURL
                ? recentUsers[0]?.photoURL
                : "/images/agent-5.jpg"
            }
            alt="team"
          />
        </div>
      )}
      {recentUsers && (
        <div className="agent-content pt20">
          <h6 className="mb-0">{recentUsers[0]?.displayName}</h6>
          <p className="fz15 mb-0">
            {recentUsers[0]?.role ? recentUsers[0]?.role : "User"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleAgent;
