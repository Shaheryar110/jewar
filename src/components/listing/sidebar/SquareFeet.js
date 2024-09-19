"use client";

import React, { useEffect, useRef, useState } from "react";

const SquareFeet = ({ filterFunctions }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState();

  useEffect(() => {
    filterFunctions?.handlesquirefeet([min, max]);
  }, [min, max]);

  return (
    <div className="space-area">
      <div className="d-flex align-items-center justify-content-between">
        <div className="form-style1">
          <input
            type="number"
            onChange={(e) => setMin(e.target.value)}
            className="form-control filterInput"
            placeholder="Min."
          />
        </div>
        <span className="dark-color">-</span>
        <div className="form-style1">
          <input
            type="number"
            onChange={(e) => setMax(e.target.value)}
            className="form-control filterInput"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
};

export default SquareFeet;
