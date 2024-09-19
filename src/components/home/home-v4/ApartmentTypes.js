"use client";
import { RtlContext } from "@/Context/RtlContext";
import apartmentTypes from "@/data/apartmentTypes2";
import { propertyCategoryCount } from "@/services/propertyServices";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const ApartmentTypes = () => {
  const [categoryCount, setCategoryCount] = useState();
  const { currentRtl } = useContext(RtlContext);

  useEffect(() => {
    propertyCategoryCount()
      .then((data) => setCategoryCount(data))
      .catch((err) => console.log(err));
  }, []);

  const data = [
    {
      title: "House",
      imageSrc: "/images/house.jpg",
      properties: categoryCount?.houses?.count,
      category: "Houses",
    },
    {
      title: "Apartments",
      imageSrc: "/images/apartment.jpg",
      properties: categoryCount?.apartment?.count,
      category: "Apartments",
    },
    {
      title: "Office",
      imageSrc: "/images/office.jpg",
      properties: categoryCount?.office?.count,
      category: "Office",
    },
    {
      title: "Villa",
      imageSrc: "/images/villa.jpg",
      properties: categoryCount?.Villa?.count,
      category: "Villa",
    },
    {
      title: "Bungalow",
      imageSrc: "/images/house.jpg",
      properties: categoryCount?.Bungalow?.count,
      category: "Bungalow",
    },
  ];
  const dataAr = [
    {
      title: "منازل",
      imageSrc: "/images/house.jpg",
      properties: categoryCount?.houses?.count,
      category: "Houses",
    },
    {
      title: "شقق سكنية ",
      imageSrc: "/images/apartment.jpg",
      properties: categoryCount?.apartment?.count,
      category: "Apartments",
    },
    {
      title: "مكتب",
      imageSrc: "/images/office.jpg",
      properties: categoryCount?.office?.count,
      category: "Office",
    },
    {
      title: "فيلا",
      imageSrc: "/images/villa.jpg",
      properties: categoryCount?.Villa?.count,
      category: "Villa",
    },
    {
      title: "بيت من طابق واحد",
      imageSrc: "/images/house.jpg",
      properties: categoryCount?.Bungalow?.count,
      category: "Bungalow",
    },
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".apartment-type2-next__active",
          prevEl: ".apartment-type2-prev__active",
        }}
        pagination={{
          el: ".apartment-type2_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {currentRtl === "ltr"
          ? data.slice(0, 7).map((apartment, index) => (
              <SwiperSlide key={index}>
                <div className="item">
                  <Link href={`/map/data?Category=${apartment.category}`}>
                    <div className="apartment-style1">
                      <div className="apartment-img">
                        <Image
                          width={217}
                          height={223}
                          className="w-100 h-100 cover"
                          src={apartment?.imageSrc}
                          alt="apartment city"
                        />
                      </div>
                      <div className="apartment-content">
                        <h6 className="title mb-0">{apartment?.title}</h6>
                        <p className="text mb-0">
                          {apartment?.properties} Properties
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))
          : dataAr.slice(0, 7).map((apartment, index) => (
              <SwiperSlide key={index}>
                <div className="item">
                  <Link href={`/map/data?Category=${apartment.category}`}>
                    <div className="apartment-style1">
                      <div className="apartment-img">
                        <Image
                          width={217}
                          height={223}
                          className="w-100 h-100 cover"
                          src={apartment?.imageSrc}
                          alt="apartment city"
                        />
                      </div>
                      <div className="apartment-content">
                        <h6 className="title mb-0">{apartment?.title}</h6>
                        <p className="text mb-0">
                          {apartment?.properties} Properties
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
};

export default ApartmentTypes;
