"use client";
import { auth } from "@/Firebase/Config";
import {
  calulateTotalView,
  calculateTotalReviewCount,
  calulateTotalFvrt,
} from "../../../../services/Dashboard";
import {
  countOfEveryThing,
  getAllPropertyByUserIdInParameter,
} from "@/services/propertyServices";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { getUserById } from "@/services/user";

const TopStateBlock = ({ currentRtl }) => {
  const [propertyCount, setProperttyCount] = useState(0);
  const [TotoalViewsCount, setTotoalViewsCount] = useState(0);
  const [TotoalVisitorsCount, setTotoalVisitorsCount] = useState(0);
  const [TotalFvrt, setTotalFvrt] = useState(0);
  const [adminCounts, setAdminCounts] = useState();
  const { currentUser } = useContext(AuthContext);
  const [role, setRole] = useState();
  useEffect(() => {
    if (currentUser?.uid) {
      getUserById(currentUser?.uid).then((data) => {
        setRole((prev) => data.role);
        if (data.role === "admin") {
          countOfEveryThing().then((data) => {
            setAdminCounts(data);
          });
        } else {
          calulateTotalFvrt(currentUser?.uid).then((data) =>
            setTotalFvrt(data)
          );
          getAllPropertyByUserIdInParameter(currentUser?.uid, false).then(
            (data) => setProperttyCount(data.length)
          );
          calulateTotalView(currentUser?.uid).then((data) =>
            setTotoalViewsCount(data)
          );
          calculateTotalReviewCount()
            .then((data) => setTotoalVisitorsCount(data))
            .catch((err) => console.log(err));
        }
      });
    }
  }, [currentUser]);
  useEffect(() => {
    console.log(role, "role");
  }, [role]);

  const statisticsData = [
    {
      text: "All Properties",
      title: propertyCount,
      icon: "flaticon-home",
    },
    {
      text: "Total Views",
      title: TotoalViewsCount,
      icon: "flaticon-search-chart",
    },
    {
      text: "Total Visitor Reviews",
      title: TotoalVisitorsCount,
      icon: "flaticon-review",
    },
    {
      text: "Total Favorites",
      title: TotalFvrt || 0,
      icon: "flaticon-like",
    },
  ];
  const statisticsDataArabic = [
    {
      text: "جميع العقارات",
      title: propertyCount,
      icon: "flaticon-home",
    },
    {
      text: "إجمالي المشاهدات",
      title: TotoalViewsCount,
      icon: "flaticon-search-chart",
    },
    {
      text: "إجمالي تقييمات الزوار",
      title: TotoalVisitorsCount,
      icon: "flaticon-review",
    },
    {
      text: "إجمالي المفضلة",
      title: TotalFvrt || 0,
      icon: "flaticon-like",
    },
  ];
  const adminCountBoxes = [
    {
      text: "All Properties",
      title: adminCounts?.propertyLength,
      icon: "flaticon-home-1",
    },
    {
      text: "Total Views",
      title: adminCounts?.totalViews,
      icon: "flaticon-discovery",
    },
    {
      text: "Published Properties",
      title: adminCounts?.PublishPropertyLength,
      icon: "flaticon-protection",
    },
    {
      text: "Pending Properties",
      title: adminCounts?.PendingPropertyLength,
      icon: "flaticon-home-2",
    },
    {
      text: "Rejected Properties",
      title: adminCounts?.RejectedPropertyLength,
      icon: "flaticon-bin",
    },
    {
      text: "Featured Properties",
      title: adminCounts?.featuredPropertyLength,
      icon: "flaticon-corporation",
    },
    {
      text: "Popular Properties",
      title: adminCounts?.PopularPropertyLength,
      icon: "flaticon-eiffel-tower",
    },
  ];
  const adminCountBoxesArabic = [
    {
      text: "جميع العقارات",
      title: adminCounts?.propertyLength,
      icon: "flaticon-home-1",
    },
    {
      text: "إجمالي المشاهدات",
      title: adminCounts?.totalViews,
      icon: "flaticon-discovery",
    },
    {
      text: "العقارات المنشورة",
      title: adminCounts?.PublishPropertyLength,
      icon: "flaticon-protection",
    },
    {
      text: "العقارات المعلقة",
      title: adminCounts?.PendingPropertyLength,
      icon: "flaticon-home-2",
    },
    {
      text: "العقارات المرفوضة",
      title: adminCounts?.RejectedPropertyLength,
      icon: "flaticon-bin",
    },
    {
      text: "العقارات المميزة",
      title: adminCounts?.featuredPropertyLength,
      icon: "flaticon-corporation",
    },
    {
      text: "العقارات الشهيرة",
      title: adminCounts?.PopularPropertyLength,
      icon: "flaticon-eiffel-tower",
    },
  ];

  let adminRender =
    currentRtl === "ltr" ? adminCountBoxes : adminCountBoxesArabic;
  let userRender = currentRtl === "ltr" ? statisticsData : statisticsDataArabic;

  return (
    <>
      {currentUser && currentUser.email !== "jewaradmin@jewar.com"
        ? userRender?.map((data, index) => (
            <div key={index} className="col-sm-6 col-xxl-3">
              <div className="d-flex justify-content-between statistics_funfact">
                <div className="details">
                  <div className="text fz25">{data.text}</div>
                  <div className="title">{data.title}</div>
                </div>
                <div className="icon text-center">
                  <i className={data.icon} />
                </div>
              </div>
            </div>
          ))
        : adminRender?.map((data, index) => (
            <div key={index} className="col-sm-6 col-xxl-3">
              <div className="d-flex justify-content-between statistics_funfact">
                <div className="details">
                  <div className="text fz25">{data.text}</div>
                  <div className="title">{data.title}</div>
                </div>
                <div className="icon text-center">
                  <i className={data.icon} />
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default TopStateBlock;
