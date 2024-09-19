import React from "react";

const PropertyAddress = ({ data, currentRtl }) => {
  const addresses = [
    {
      address: data?.address,
      city: data?.City?.value && data?.City.value,
      state: data?.District?.value && data?.District?.value,
      zipCode: data?.zip,
      country: "Sudia Arabia",
    },
  ];

  return (
    <>
      {addresses.map((address, index) => (
        <div
          key={index}
          className={`col-md-6 col-xl-12 ${index === 1 ? "offset-xl-2" : ""}`}
        >
          <div className="d-flex justify-content-between">
            {currentRtl === "ltr" ? (
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">Address</p>
                <p className="fw600 mb10 ff-heading dark-color">City</p>
                <p className="fw600 mb-0 ff-heading dark-color">District</p>
                <p className="fw600 mb-0 ff-heading dark-color">Country</p>
              </div>
            ) : (
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">العنوان</p>
                <p className="fw600 mb10 ff-heading dark-color">المدينة</p>
                <p className="fw600 mb-0 ff-heading dark-color">الحي</p>
                <p className="fw600 mb-0 ff-heading dark-color">البلد</p>
              </div>
            )}
            <div className="pd-list">
              <p className="text mb10">{address.address}</p>
              <p className="text mb10">{address.city}</p>
              <p className="text mb-0">{address.state}</p>
              <p className="text mb-0">{address.country}</p>
            </div>
          </div>
        </div>
      ))}
      {/* End col */}

      {data && (
        <div className="col-md-12">
          <iframe
            className="position-relative bdrs12 mt30 h250"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${data?.coord?.lat},${data?.coord?.lng}&t=m&z=14&output=embed&markers=${data.coord.lat},${data.coord.lng}`}
            // title={addresses[0].address}
            // aria-label={addresses[0].address}
          />
        </div>
      )}
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
