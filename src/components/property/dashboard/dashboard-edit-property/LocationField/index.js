import React, { useEffect, useState } from "react";
import SelectMulitField from "./SelectMulitField";
import Map from "./Map";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
const LocationField = ({ handleChange, address, zip, neighborhood, coord }) => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (value?.value?.place_id) {
      geocodeByPlaceId(value.value.place_id)
        .then((results) => {
          if (results && results?.length > 0) {
            handleChange("coord", {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              address: results[0].formatted_address,
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
              Address
            </label>

            <GooglePlacesAutocomplete
              className="form-control"
              // apiKey="AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560"
              selectProps={{
                value,
                onChange: (e) => {
                  console.log(e);
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

        <SelectMulitField handleChange={handleChange} />

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Zip</label>
            <input
              type="number"
              className="form-control"
              placeholder="Zip code"
              value={zip}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </div>
        </div>
        {/* End col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Neighborhood
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=" Neighborhood"
              value={neighborhood}
              onChange={(e) => handleChange("neighborhood", e.target.value)}
            />
          </div>
        </div>
        {/* End col-4 */}

        <div className="col-sm-12">
          <div className="mb20 mt30">
            <label className="heading-color ff-heading fw600 mb30">
              Place the listing pin on the map
            </label>
            <Map handleChange={handleChange} coord={coord} />
          </div>
        </div>
        {/* End col-12 */}
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Latitude
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
              Longitude
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
