"use client";
import { useEffect, useContext } from "react";

import { RtlContext } from "@/Context/RtlContext";
import { getCmsData } from "@/services/cms";
import { ApiContext } from "@/Context/ApiCallContext";

const Wrapper = ({ children }) => {
  const { currentRtl, setCurrentRtl } = useContext(RtlContext);
  const { setData } = useContext(ApiContext);

  const getDataFromCms = async () => {
    try {
      const data = await getCmsData("CmsDataHome");
      setData(data);
    } catch (error) {
      console.error("Error fetching CMS data:", error);
      // Handle errors gracefully (e.g., display an error message)
    }
  };

  useEffect(() => {
    getDataFromCms();
  }, []);
  useEffect(() => {
    setCurrentRtl(window.localStorage.getItem("rtl") || "ltr");
  }, []);
  return <>{children}</>;
};

export default Wrapper;
