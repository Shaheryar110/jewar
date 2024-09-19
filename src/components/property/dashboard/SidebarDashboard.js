"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { auth } from "@/Firebase/Config";
import { signOut } from "firebase/auth";
import { getUserById } from "@/services/user";
import { AuthContext } from "@/Context/AuthContext";
import { RtlContext } from "@/Context/RtlContext";

const SidebarDashboard = () => {
  const pathname = usePathname();
  const { currentUser } = useContext(AuthContext);
  const [currentUsers, setCurrentUser] = useState(currentUser);
  const [isCurrentUserRole, setIsCurrentUserRole] = useState();
  const { currentRtl } = useContext(RtlContext);

  const sidebarItems = [
    {
      title: "MAIN",
      items: [
        {
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "Dashboard",
        },
        {
          href: "/dashboard-message",
          icon: "flaticon-chat-1",
          text: "Message",
        },
      ],
    },
    {
      title: "MANAGE LISTINGS",
      items: [
        {
          href: "/dashboard-add-property",
          icon: "flaticon-new-tab",
          text: "Add New Property",
        },
        {
          href: "/dashboard-my-properties",
          icon: "flaticon-home",
          text: "My Properties",
        },
        {
          href: "/dashboard-my-favourites",
          icon: "flaticon-like",
          text: "My Favorites",
        },
        {
          href: "/dashboard-all-users",
          icon: "flaticon-search-2",
          text: "All Users",
        },
        {
          href: "/dashboard-all-properties",
          icon: "flaticon-home",
          text: "All Properties",
        },
        {
          href: "/dashboard-reviews",
          icon: "flaticon-review",
          text: "Reviews",
        },
        {
          href: "/dashboard-add-blogs",
          icon: "flaticon-new-tab",
          text: "Add New Blogs",
        },
        {
          href: "/dashboard-leads",
          icon: "flaticon-search-2",
          text: "Leads",
        },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          href: "/dashboard-cms",
          icon: "flaticon-protection",
          text: "CMS",
          adminOnly: true, // Add this property
        },
        {
          href: "/dashboard-my-profile",
          icon: "flaticon-user",
          text: "My Profile",
        },
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "Logout",
        },
      ],
    },
  ];

  const sidebarItemsArabic = [
    {
      title: "الرئيسية",
      items: [
        {
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "لوحة القيادة",
        },
        {
          href: "/dashboard-message",
          icon: "flaticon-chat-1",
          text: "الرسائل",
        },
      ],
    },
    {
      title: "إدارة القوائم",
      items: [
        {
          href: "/dashboard-add-property",
          icon: "flaticon-new-tab",
          text: "إضافة عقار جديد",
        },
        {
          href: "/dashboard-my-properties",
          icon: "flaticon-home",
          text: "عقاراتي",
        },
        {
          href: "/dashboard-my-favourites",
          icon: "flaticon-like",
          text: "المفضلة لدي",
        },
        {
          href: "/dashboard-all-users",
          icon: "flaticon-search-2",
          text: "جميع المستخدمين",
        },
        {
          href: "/dashboard-all-properties",
          icon: "flaticon-home",
          text: "جميع العقارات",
        },
        {
          href: "/dashboard-reviews",
          icon: "flaticon-review",
          text: "التقييمات",
        },
        {
          href: "/dashboard-add-blogs",
          icon: "flaticon-new-tab",
          text: "إضافة مدونات جديدة",
        },
        {
          href: "/dashboard-leads",
          icon: "flaticon-search-2",
          text: "الاستفسارات",
        },
      ],
    },
    {
      title: "إدارة الحساب",
      items: [
        {
          href: "/dashboard-cms",
          icon: "flaticon-protection",
          text: "CMS",
          adminOnly: true, // Add this property
        },
        {
          href: "/dashboard-my-profile",
          icon: "flaticon-user",
          text: "الملف الشخصي",
        },
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "تسجيل الخروج",
        },
      ],
    },
  ];

  const Logout = () => {
    console.log("logout");

    signOut(auth)
      .then(() => {
        console.log("sign Out done");
      })
      .catch((error) => {
        console.log("Error in sign out");
      });
  };

  useEffect(() => {
    getUserById(currentUsers?.uid).then((data) => {
      setIsCurrentUserRole(data?.role);
    });
  }, [currentUsers]);

  const renderSidebarItems = (items) => {
    return items.map((section, sectionIndex) => (
      <div key={sectionIndex}>
        <p
          className={`fz15 fw400 ff-heading ${
            sectionIndex === 0 ? "mt-0" : "mt30"
          }`}
        >
          {section.title}
        </p>
        {section.items.map((item, itemIndex) => {
          if (item.adminOnly && isCurrentUserRole !== "admin") {
            return null;
          }
          return (
            <div key={itemIndex} className="sidebar_list_item">
              {item.text === "Logout" || item.text === "تسجيل الخروج" ? (
                <Link
                  onClick={Logout}
                  className={`items-center   ${
                    pathname == item.href ? "-is-active" : ""
                  } `}
                  href={item.href}
                >
                  <i className={`${item.icon} mr15 ml15`} />
                  {item.text}
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className={`items-center   ${
                    pathname == item.href ? "-is-active" : ""
                  } `}
                >
                  <i className={`${item.icon} mr15 ml15`} />
                  {item.text}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list" dir={currentRtl}>
        {currentRtl === "ltr"
          ? renderSidebarItems(sidebarItems)
          : renderSidebarItems(sidebarItemsArabic)}
      </div>
    </div>
  );
};

export default SidebarDashboard;
