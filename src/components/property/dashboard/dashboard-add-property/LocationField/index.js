import React, { useEffect, useState } from "react";
import SelectMulitField from "./SelectMulitField";
import Map from "./Map";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
const LocationField = ({
  handleChange,
  address,
  zip,
  neighborhood,
  coord,
  District,
  City,
  setPropertyData,
  propertyData,
  currentRtl,
}) => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (value?.value?.place_id) {
      geocodeByPlaceId(value.value.place_id)
        .then((results) => {
          let District = "";
          let City = "";
          let zipCode = "";
          results.forEach((result) => {
            result.address_components.forEach((adddress) => {
              if (adddress.types.includes("administrative_area_level_2"))
                console.log(
                  address.long_name.replace(/Principality/gi, "").trim(),
                  'address.long_name.replace(/Principality/gi, "").trim()'
                );

              City = address.long_name.replace(/Principality/gi, "").trim();
            });
          });
          results.forEach((result) => {
            result.address_components.forEach((adddress) => {
              if (adddress.types.includes("sublocality_level_1"))
                District = adddress.long_name;
            });
          });
          results.forEach((result) => {
            result.address_components.forEach((adddress) => {
              if (adddress.types.includes("postal_code")) {
                zipCode = adddress.long_name;
              }
            });
          });

          if (results && results?.length > 0) {
            setPropertyData({
              ...propertyData,
              coord: {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              },
              address: results[0].formatted_address,
              zip: zipCode,
              District: {
                label: District,
                value: District,
              },
              City: {
                label: City,

                value: City,
              },
            });
          }
        })
        .catch((error) => console.error(error));
    }
  }, [value]);
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Address" : "عنوان"}
            </label>

            <GooglePlacesAutocomplete
              className="form-control"
              selectProps={{
                value,
                onChange: (e) => {
                  setValue(e);
                },
              }}
              autocompletionRequest={{
                componentRestrictions: { country: ["sa"] },
              }}
              debounce={500}
              minLengthAutocomplete={4}
            />
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "District" : "يصرف"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={currentRtl === "ltr" ? "District" : "الحي"}
              value={District?.label || ""}
              onChange={(e) =>
                handleChange("District", {
                  label: e.target.value,
                  value: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "City" : "مدينة"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={currentRtl === "ltr" ? "City" : "المدينة"}
              value={City?.label || ""}
              onChange={(e) =>
                handleChange("City", {
                  label: e.target.value,
                  value: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Zip" : "أَزِيز"}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder={currentRtl === "ltr" ? "Zip code" : "الرمز البريدي"}
              value={zip}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </div>
        </div>
        {/* End col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Neighborhood" : "حيّ"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={currentRtl === "ltr" ? "Neighborhood" : "الحي"}
              value={neighborhood}
              onChange={(e) => handleChange("neighborhood", e.target.value)}
            />
          </div>
        </div>
        {/* End col-4 */}

        <div className="col-sm-12">
          <div className="mb20 mt30">
            <label className="heading-color ff-heading fw600 mb30">
              {currentRtl === "ltr"
                ? "Place the listing pin on the map"
                : "ضع دبوس القائمة على الخريطة"}
            </label>
            <Map
              handleChange={handleChange}
              coord={coord}
              setPropertyData={setPropertyData}
              propertyData={propertyData}
            />
          </div>
        </div>
        {/* End col-12 */}
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Latitude" : "خط العرض"}
            </label>
            <input
              disabled
              type="text"
              className="form-control"
              value={coord?.lat}
            />
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              {currentRtl === "ltr" ? "Longitude" : "خط الطول"}
            </label>
            <input
              type="text"
              className="form-control"
              value={coord?.lng}
              disabled
            />
          </div>
        </div>
      </div>
      {/* End .row */}
    </form>
  );
};

export default LocationField;
