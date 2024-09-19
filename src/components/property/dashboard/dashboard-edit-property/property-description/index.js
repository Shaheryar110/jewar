"use client";
import Select from "react-select";

const PropertyDescription = ({
  handleChange,
  name,
  description,
  category,
  listedInValue,
  status,
  price,
  yearlyTaxRate,
  afterPriceLabel,
}) => {
  const catergoryOptions = [
    { value: "Apartment", label: "Apartment" },
    { value: "Palace", label: "Palace" },
    { value: "Studio", label: "Studio" },
    { value: "Villa", label: "Villa" },
    { value: "Penthouse", label: "Penthouse" },
  ];
  const listedIn = [
    { value: "Rent", label: "Rent" },
    { value: "Sell", label: "Sell" },
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
  const inputStyles = {
    WebkitAppearance: "none", // Remove up and down arrows in WebKit browsers
    MozAppearance: "textfield", // Remove up and down arrows in Firefox
    appearance: "none", // Remove up and down arrows in modern browsers
    width: "200px", // Set the width of the input field (example)
    padding: "10px", // Set padding (example)
    border: "1px solid #ccc", // Set border (example)
    borderRadius: "4px", // Set border radius (example)
  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Property title"
              value={name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Description
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder="Enter a breif description of your property"
              value={description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Select Category
            </label>
            <div className="location-area">
              <Select
                name="colors"
                options={catergoryOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                value={category || []}
                onChange={(e) => {
                  handleChange("category", e);
                }}
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Listed in
            </label>
            <div className="location-area">
              <Select
                name="colors"
                options={listedIn}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                value={listedInValue || []}
                onChange={(e) => handleChange("listedInValue", e)}
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Property Status
            </label>
            <div className="location-area">
              <Select
                name="colors"
                options={PropertyStatus}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
                value={status || []}
                onChange={(e) => handleChange("status", e)}
              />
            </div>
          </div>
        </div> */}
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-6">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Price in $
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Price here..."
              value={price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-6 */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Yearly Tax Rate
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Yearly Tax Rate here.."
              value={yearlyTaxRate}
              onChange={(e) => handleChange("yearlyTaxRate", e.target.value)}
            />
          </div>
        </div> */}
        {/* End .col-6 */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              After Price Label
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=" After Price Label here.."
              value={afterPriceLabel}
              onChange={(e) => handleChange("afterPriceLabel", e.target.value)}
            />
          </div>
        </div> */}
        {/* End .col-6 */}
      </div>
    </form>
  );
};

export default PropertyDescription;
