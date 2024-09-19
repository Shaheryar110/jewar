"use client";

import { ApiContext } from "@/Context/ApiCallContext";
import { RtlContext } from "@/Context/RtlContext";
import React, { useContext } from "react";

const TopFilterBar = ({
  setCurrentSortingOption,
  colstyle,
  setColstyle,
  pageContentTrac,
}) => {
  const { currentRtl } = useContext(RtlContext);
  const { data } = useContext(ApiContext);
  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            {currentRtl === "ltr"
              ? ` Showing ${pageContentTrac} results`
              : `عرض ${pageContentTrac} نتيجة`}
          </p>
        </div>
      </div>
      {/* End .col-sm-6 */}

      <div className="col-sm-6">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>
              {" "}
              {currentRtl === "ltr" ? data?.sortBy?.en : data?.sortBy?.ar}
            </span>
            <select
              className="form-select"
              onChange={(e) =>
                setCurrentSortingOption &&
                setCurrentSortingOption(e.target.value)
              }
            >
              <option>Newest</option>
              <option>Best Seller</option>
              <option>Best Match</option>
              <option>Price Low</option>
              <option>Price High</option>
            </select>
          </div>
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
