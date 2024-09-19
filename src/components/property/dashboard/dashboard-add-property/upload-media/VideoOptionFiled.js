"use client";
import Select from "react-select";

const videoField = [
  { value: "Youtube", label: "Youtube" },
  { value: "Facebook", label: "Facebook" },
  { value: "Vimeo", label: "Vimeo" },
];

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#527FE2"
        : isHovered
        ? "#527FE212"
        : isFocused
        ? "#527FE212"
        : undefined,
    };
  },
};

const VideoOptionFiled = ({
  handleChange,
  videourl,
  videoFrom,
  currentRtl,
}) => {
  return (
    <>
      {/* <div className="col-sm-6 col-xl-4">
        <div className="mb30">
          <label className="heading-color ff-heading fw600 mb10">
            Video from
          </label>
          <div className="location-area">
            <Select
              name="colors"
              options={videoField}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              isMulti
              value={videoFrom || []}
              onChange={(e) => handleChange("videoFrom", e)}
            />
          </div>
        </div>
      </div> */}
      <div className="col-sm-6 col-xl-8">
        <div className="mb30">
          <label className="heading-color ff-heading fw600 mb10">
            {currentRtl === "ltr"
              ? " Embed Video url"
              : "تضمين عنوان URL للفيديو"}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={currentRtl === "ltr" ? "Video url" : "رابط الفيديو"}
            value={videourl}
            onChange={(e) => handleChange("videourl", e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default VideoOptionFiled;
