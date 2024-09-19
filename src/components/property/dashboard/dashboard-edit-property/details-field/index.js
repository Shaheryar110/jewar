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
}) => {
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Build-up Area
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="In squre meters"
              value={buildUpArea}
              onChange={(e) => handleChange("buildUpArea", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Lot Area
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="In squre meters "
              value={lotSizeInft}
              onChange={(e) => handleChange("lotSizeInft", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Rooms</label>
            <input
              type="number"
              className="form-control"
              placeholder="Rooms number"
              value={rooms}
              onChange={(e) => handleChange("rooms", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Bedrooms
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="No of bedrooms"
              value={bedrooms}
              onChange={(e) => handleChange("bedrooms", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Bathrooms
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="No of bathrooms"
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
              Garage Size/No of Cars
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Size in sq meters/Number"
              value={garageSize}
              onChange={(e) => handleChange("garageSize", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Year (numeric)
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
              Basement
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Yes/No"
              value={basement}
              onChange={(e) => handleChange("basement", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Extra details
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter extra detail "
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
              Exterior Material
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Material"
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
        <MultiSelectField />

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Owner/ Agent nots (not visible on front end)
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder="Type here"
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
