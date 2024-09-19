"use client";
import { RtlContext } from "@/Context/RtlContext";
import { slice } from "@/data/mobileMenuItems";
import {
  getAllUsers,
  getUsersOrderedByTimestamp,
  getselectedUser,
} from "@/services/user";
import { Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const ExclusiveAgnts = () => {
  const [recentUsers, setRecentUsers] = useState([]);
  const { currentRtl } = useContext(RtlContext);
  useEffect(() => {
    getUsersOrderedByTimestamp().then((data) => setRecentUsers(data));
  }, []);

  return (
    <div className="exclusive-agent-widget mb30-sm">
      {recentUsers && (
        <h4 className="title mb20">
          <span className="text-thm">{recentUsers.length}+</span>{" "}
          {currentRtl === "ltr" ? "Interacted Recently." : "تم التفاعل مؤخرًا."}
        </h4>
      )}
      {recentUsers &&
        recentUsers?.slice(0, 4).map((agent, index) => (
          <div className="thumb d-flex align-items-center mb20" key={index}>
            <div className="flex-shrink-0">
              <Avatar
                alt={agent?.displayName}
                src={
                  agent && agent?.photoURL != ""
                    ? agent?.photoURL
                    : agent?.displayName
                }
                sx={{ width: 36, height: 36 }}
              />
            </div>
            <div className="flex-grow-1 ml20 mr20">
              <h6 className="title fz14 mb-0">{agent?.displayName}</h6>
              <p className="fz13 mb-0">{agent?.role ? agent?.role : "User"}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ExclusiveAgnts;
