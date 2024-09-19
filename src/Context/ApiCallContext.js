"use client";
import { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();

export const ApiCallProvider = ({ children }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(data, "dat");
  }, [data]);

  return (
    <ApiContext.Provider value={{ data, setData }}>
      {children}
    </ApiContext.Provider>
  );
};
