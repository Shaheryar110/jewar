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

const Map = ({ handleChange, coord }) => {
  const [getLocation, setLocation] = useState(null);

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560",
  // });

  const center = useMemo(
    () => getLocation || { lat: 24.7136, lng: 46.6753 },
    [getLocation]
  );

  const handleMapClick = (e) => {
    geocodeByLatLng(e.latLng).then((data) => {
      handleChange("coord", {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        address: data[2].formatted_address,
      });
    });
  };
  useEffect(() => {
    setLocation({
      lat: Number(coord?.lat) || 0,
      lng: Number(coord?.lng) || 0,
    });
  }, [coord]);

  return (
    <>
      {/* {!isLoaded ? (
        <p>Loading...</p>
      ) : ( */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
      >
        <MarkerClusterer>
          {(clusterer) =>
            getLocation && (
              <Marker position={getLocation} clusterer={clusterer} />
            )
          }
        </MarkerClusterer>
      </GoogleMap>
      {/* )} */}
    </>
  );
};

export default Map;
