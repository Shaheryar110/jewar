const Amenities = ({ amenities, handleAmenityChange, selectedAmenities }) => {
  return (
    <>
      {amenities.map((column, columnIndex) => (
        <div className="col-sm-4" key={columnIndex}>
          <div className="widget-wrapper mb20">
            <div className="checkbox-style1">
              {column.map((amenity, amenityIndex) => (
                <label className="custom_checkbox" key={amenityIndex}>
                  {amenity.label}
                  <input
                    type="checkbox"
                    checked={
                      selectedAmenities[columnIndex] &&
                      selectedAmenities[columnIndex][amenityIndex]
                    }
                    onChange={() =>
                      handleAmenityChange(columnIndex, amenityIndex)
                    }
                  />
                  <span className="checkmark" />
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Amenities;
