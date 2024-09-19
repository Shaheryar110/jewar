import React from "react";

const PropertyFeaturesAminites = ({ data }) => {
  return (
    <>
      {data &&
        data?.map((row, rowIndex) => (
          <>
            {row.defaultChecked && (
              <div key={rowIndex} className="col-sm-6 col-md-4">
                <div className="pd-list">
                  <p className="text mb10">
                    <i className="fas fa-circle fz6 align-middle pe-2 ml5" />
                    {row?.label}
                  </p>
                </div>
              </div>
            )}
          </>
        ))}
    </>
  );
};

export default PropertyFeaturesAminites;
