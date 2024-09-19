"use client";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { formatNumberWithComma } from "@/utilis/helpers";

const containerStyle = {
  width: "100%",
  height: "100%",
};
export default function ListingMap1({ listedData }) {
  const [getLocation, setLocation] = useState(null);
  const [property, setProperty] = useState([]);
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560",
  // });
  const center = useMemo(
    () => getLocation || { lat: 24.69329463419974, lng: 46.68971955566404 },
    [getLocation]
  );

  const locationHandler = (location) => {
    setLocation({
      ...location,
      lat: location.lat,
      lng: location.long,
    });
  };

  const closeCardHandler = () => {
    setLocation(null);
  };
  useEffect(() => {
    console.log(listedData);
    setProperty(listedData);
  }, [listedData]);
  return (
    <>
      {/* {!isLoaded ? (
        <p>Loading...</p>
      ) : ( */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={(e) => console.log(e.latLng.lat())}
      >
        <MarkerClusterer>
          {(clusterer) =>
            property?.map((marker, index) => (
              <Marker
                key={index}
                position={{
                  lat: marker.lat ? Number(marker.lat) : 0,
                  lng: marker.long ? Number(marker.long) : 0,
                }}
                clusterer={clusterer}
                onClick={() => locationHandler(marker)}
              >
                {getLocation !== null && getLocation.id === marker.id && (
                  <InfoWindow
                    position={{
                      lat: getLocation.lat,
                      lng: getLocation.long,
                    }}
                    onCloseClick={closeCardHandler}
                  >
                    <div>
                      <div className="listing-style1">
                        <div className="list-thumb">
                          <Image
                            width={382}
                            height={248}
                            className="w-100 h-100 cover"
                            src={getLocation.image}
                            alt="listings"
                          />
                          <div className="sale-sticker-wrap">
                            {!getLocation.forRent && (
                              <div className="list-tag fz12">
                                <span className="flaticon-electricity me-2" />
                                FEATURED
                              </div>
                            )}
                          </div>

                          <div className="list-price">
                            {formatNumberWithComma(getLocation.price)} /{" "}
                            <span>mo</span>
                          </div>
                        </div>
                        <div className="list-content">
                          <h6 className="list-title">
                            <Link href={`/single/${getLocation?.id}`}>
                              {getLocation.title}
                            </Link>
                          </h6>
                          <p className="list-text">{getLocation.location}</p>
                          <div className="list-meta d-flex align-items-center">
                            <a href="#">
                              <span className="flaticon-bed" />{" "}
                              {getLocation.bed} bed
                            </a>
                            <a href="#">
                              <span className="flaticon-shower" />{" "}
                              {getLocation.bath} bath
                            </a>
                            <a href="#">
                              <span className="flaticon-expand" />{" "}
                              {getLocation.sqft} sqft
                            </a>
                          </div>
                          <hr className="mt-2 mb-2" />
                          <div className="list-meta2 d-flex justify-content-between align-items-center">
                            <span className="for-what">For Rent</span>
                            <div className="icons d-flex align-items-center">
                              <a href="#">
                                <span className="flaticon-fullscreen" />
                              </a>
                              <a href="#">
                                <span className="flaticon-new-tab" />
                              </a>
                              <a href="#">
                                <span className="flaticon-like" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
      {/* )} */}
    </>
  );
}
