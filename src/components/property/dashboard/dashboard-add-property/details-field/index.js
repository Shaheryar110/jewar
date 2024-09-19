import React from "react";
import MultiSelectField from "./MultiSelectField";
import StructureType from "./StructureType";

const DetailsFiled = ({
  handleChange,
  buildUpArea,
  lotSizeInft,
  rooms,
  bedrooms,
  bathrooms,
  customId,
  garages,
  garageSize,
  yearBuilt,
  availableFrom,
  basement,
  extraDetails,
  roofing,
  exteriorMaterial,
  owner,
  currentRtl,
}) => {
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Build-up Area" : "منطقة البناء"}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder={
                currentRtl === "ltr" ? "In square meters" : "في المتر المربع"
              }
              value={buildUpArea}
              onChange={(e) => handleChange("buildUpArea", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Lot Area" : "منطقة قطعة أرض"}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder={
                currentRtl === "ltr" ? "In square meters" : "في المتر المربع"
              }
              value={lotSizeInft}
              onChange={(e) => handleChange("lotSizeInft", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {" "}
              {currentRtl === "ltr" ? "Rooms" : "غرف"}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder={currentRtl === "ltr" ? "Rooms number" : "عدد الغرف"}
              value={rooms}
              onChange={(e) => handleChange("rooms", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Bedrooms" : "غرف نوم"}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder={
                currentRtl === "ltr" ? "No of bedrooms" : "عدد غرف النوم"
              }
              value={bedrooms}
              onChange={(e) => handleChange("bedrooms", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Bathrooms" : "الحمامات"}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder={
                currentRtl === "ltr" ? "No of bathrooms" : "عدد الحمامات"
              }
              value={bathrooms}
              onChange={(e) => handleChange("bathrooms", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Custom ID (text)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="id"
              value={customId}
              onChange={(e) => handleChange("customId", e.target.value)}
            />
          </div>
        </div> */}
        {/* End .col-4 */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Garages
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="No of Garages"
              value={garages}
              onChange={(e) => handleChange("garages", e.target.value)}
            />
          </div>
        </div> */}
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr"
                ? "Garage Size/No of Cars"
                : "حجم المرآب / عدد السيارات"}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder={
                currentRtl === "ltr"
                  ? "Size in sq meters/Number"
                  : "الحجم بالمتر المربع/العدد"
              }
              value={garageSize}
              onChange={(e) => handleChange("garageSize", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr"
                ? "Year (numeric)"
                : "سنة البناء (رقمي)"}
            </label>
            <input
              type="date"
              className="form-control"
              value={yearBuilt}
              onChange={(e) => handleChange("yearBuilt", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Available from (date)
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="99.aa.yyyy"
              value={availableFrom}
              onChange={(e) => handleChange("availableFrom", e.target.value)}
            />
          </div>
        </div> */}
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Basement" : "قبو"}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder={currentRtl === "ltr" ? "Yes/No" : "نعم/لا"}
              value={basement}
              onChange={(e) => handleChange("basement", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Extra details" : "تفاصيل اضافية"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={
                currentRtl === "ltr"
                  ? "Enter extra detail"
                  : "أدخل تفاصيل إضافية"
              }
              value={extraDetails}
              onChange={(e) => handleChange("extraDetails", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Roofing
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Yes/No"
              value={roofing}
              onChange={(e) => handleChange("roofing", e.target.value)}
            />
          </div>
        </div> */}
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Exterior Material" : "المواد الخارجية"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={currentRtl === "ltr" ? "Material" : "المواد"}
              value={exteriorMaterial}
              onChange={(e) => handleChange("exteriorMaterial", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        {/* <StructureType /> */}
      </div>
      {/* End .row */}

      <div className="row">
        {/* <MultiSelectField /> */}

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr"
                ? "Owner/ Agent nots (not visible on front end)"
                : "ملاحظات المالك/الوكيل (غير مرئية في الواجهة الأمامية)"}
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder={currentRtl === "ltr" ? "Type here" : "اكتب هنا"}
              value={owner}
              onChange={(e) => handleChange("owner", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-12 */}
      </div>
      {/* <div className="d-flex justify-content-end  w-full">
        <button
          className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
          // onClick={() => submitAddProperty()}
        >
          Next
          <i className="fal fa-arrow-right-long" />
        </button>
      </div> */}
    </form>
  );
};

export default DetailsFiled;
