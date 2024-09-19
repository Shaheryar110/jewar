import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import { geocodeByLatLng } from "react-google-places-autocomplete";

const containerStyle = {
  width: "100%",
  height: "500px", // Use viewport height for full screen
};

const Map = ({ handleChange, coord, setPropertyData, propertyData }) => {
  const [getLocation, setLocation] = useState(null);

  const center = useMemo(
    () => getLocation || { lat: 24.7136, lng: 46.6753 },
    [getLocation]
  );
  const handleMapClick = (e) => {
    geocodeByLatLng(e.latLng).then((results) => {
      let District = "";
      let City = "";
      results.forEach((result) => {
        result.address_components.forEach((adddress) => {
          if (adddress.types.includes("administrative_area_level_2"))
            City = adddress.long_name.replace(/Principality/gi, "").trim();
        });
      });
      results.forEach((result) => {
        result.address_components.forEach((adddress) => {
          if (adddress.types.includes("sublocality_level_1"))
            District = adddress.long_name;
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
    });
  };
  useEffect(() => {
    setLocation({
      lat: coord?.lat || 24.7136,
      lng: coord?.lng || 46.6753,
    });
  }, [coord]);

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
        onLoad={() => console.log("loaded")}
      >
        <MarkerClusterer>
          {(clusterer) =>
            getLocation && (
              <Marker position={getLocation} clusterer={clusterer} />
            )
          }
        </MarkerClusterer>
      </GoogleMap>
    </>
  );
};

export default Map;
