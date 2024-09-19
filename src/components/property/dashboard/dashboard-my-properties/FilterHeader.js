import React from "react";

const FilterHeader = ({ currentRtl }) => {
  const options = [
    { ltr: "Best Seller", rtl: "الأفضل مبيعاً" },
    { ltr: "Best Match", rtl: "أفضل تطابق" },
    { ltr: "Price Low", rtl: "السعر منخفض" },
    { ltr: "Price High", rtl: "السعر مرتفع" },
  ];

  // Determine which set of options to use based on currentRtl value
  const selectedOptions =
    currentRtl === "ltr"
      ? options.map((opt) => opt.ltr)
      : options.map((opt) => opt.rtl);

  const sortByText = {
    ltr: "Sort by:",
    rtl: "ترتيب حسب:",
  };

  // Determine which text to display based on currentRtl value
  const selectedSortByText =
    currentRtl === "ltr" ? sortByText.ltr : sortByText.rtl;

  return (
    <div className="dashboard_search_meta d-md-flex align-items-center justify-content-xxl-end">
      <div className="item1 mb15-sm">
        <div className="search_area">
          <input
            type="text"
            className="form-control bdrs12"
            placeholder={currentRtl === "ltr" ? "Search" : "ابحث"}
            required
          />
          <label>
            <span className="flaticon-search" />
          </label>
        </div>
      </div>
      {/* End item1 */}

      <div className="page_control_shorting bdr1 bdrs12 py-2 ps-3 pe-2 mx-1 mx-xxl-3 bgc-white mb15-sm maxw160">
        <div className="pcs_dropdown d-flex align-items-center">
          <span style={{ minWidth: "50px" }} className="title-color">
            {selectedSortByText}
          </span>
          <select className="form-select show-tick">
            {selectedOptions.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <a href="#" className="ud-btn btn-thm">
        {currentRtl === "ltr" ? "Add New Property" : "إضافة عقار جديد"}

        <i className="fal fa-arrow-right-long" />
      </a>
    </div>
  );
};

export default FilterHeader;
