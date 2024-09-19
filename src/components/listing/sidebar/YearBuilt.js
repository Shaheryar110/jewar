"use client";

import React, { useEffect, useRef, useState } from "react";

const YearBuilt = ({ filterFunctions }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(2050);

  useEffect(() => {
    filterFunctions?.handleyearBuild([min || 0, max || 2050]);
  }, [min, max]);
  return (
    <div className="space-area">
      <div className="d-flex align-items-center justify-content-between">
        <div className="form-style1">
          <input
            type="number"
            onChange={(e) => setMin(e.target.value)}
            className="form-control filterInput"
            placeholder={2019}
          />
        </div>
        <span className="dark-color">-</span>
        <div className="form-style1">
          <input
            type="number"
            onChange={(e) => setMax(e.target.value)}
            className="form-control filterInput"
            placeholder={2022}
          />
        </div>
      </div>
    </div>
  );
};

export default YearBuilt;
