"use client";
import { createContext, useEffect, useState } from "react";

export const RtlContext = createContext();

export const RtlContextProvider = ({ children }) => {
  const [currentRtl, setCurrentRtl] = useState("ltr");

  return (
    <RtlContext.Provider value={{ currentRtl, setCurrentRtl }}>
      {children}
    </RtlContext.Provider>
  );
};
