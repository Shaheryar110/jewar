"use client";
import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { auth } from "../../Firebase/Config";
import { AuthContext } from "@/Context/AuthContext";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { RtlContext } from "@/Context/RtlContext";

const menuItems = [
  {
    title: "MAIN",
    items: [
      {
        icon: "flaticon-discovery",
        text: "Dashboard",
        href: "/dashboard-home",
      },
      {
        icon: "flaticon-chat-1",
        text: "Message",
        href: "/dashboard-message",
      },
    ],
  },
  {
    title: "MANAGE LISTINGS",
    items: [
      {
        icon: "flaticon-new-tab",
        text: "Add New Property",
        href: "/dashboard-add-property",
      },
      {
        icon: "flaticon-home",
        text: "My Properties",
        href: "/dashboard-my-properties",
      },
      {
        icon: "flaticon-like",
        text: "My Favorites",
        href: "/dashboard-my-favourites",
      },

      { icon: "flaticon-review", text: "Reviews", href: "/dashboard-review" },
    ],
  },
  {
    title: "MANAGE ACCOUNT",
    items: [
      {
        icon: "flaticon-user",
        text: "My Profile",
        href: "/dashboard-my-profile",
      },
      { icon: "flaticon-exit", text: "Logout", href: "/login" },
    ],
  },
];
const menuItemsAr = [
  {
    title: "الرئيسية",
    items: [
      {
        icon: "flaticon-discovery",
        text: "لوحة القيادة",
        href: "/dashboard-home",
      },
      {
        icon: "flaticon-chat-1",
        text: "الرسائل",
        href: "/dashboard-message",
      },
    ],
  },
  {
    title: "إدارة القوائم",
    items: [
      {
        icon: "flaticon-new-tab",
        text: "إضافة عقار جديد",
        href: "/dashboard-add-property",
      },
      {
        icon: "flaticon-home",
        text: "عقاراتي",
        href: "/dashboard-my-properties",
      },
      {
        icon: "flaticon-like",
        text: "المفضلة",
        href: "/dashboard-my-favourites",
      },
      {
        icon: "flaticon-review",
        text: "التقييمات",
        href: "/dashboard-review",
      },
    ],
  },
  {
    title: "إدارة الحساب",
    items: [
      {
        icon: "flaticon-user",
        text: "ملفي الشخصي",
        href: "/dashboard-my-profile",
      },
      {
        icon: "flaticon-exit",
        text: "تسجيل الخروج",
        href: "/login",
      },
    ],
  },
];

const DefaultHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const [userData, setUserData] = useState({});
  const [isUser, setIsUser] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { currentRtl, setCurrentRtl } = useContext(RtlContext);
  const pathname = usePathname();

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const handleRtl = () => {
    if (currentRtl === "ltr") {
      setCurrentRtl("rtl");
      window.localStorage.setItem("rtl", "rtl");
      // window.location.reload();
    } else {
      setCurrentRtl("ltr");
      window.localStorage.setItem("rtl", "ltr");
      // window.location.reload();
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      let temp = {
        photo: currentUser.photoURL,
        name: currentUser.displayName,
      };
      setUserData(temp);
      setIsUser(true);
    } else {
      setIsUser(false);
      console.log("error occur");
    }
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, [currentUser]);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
        dir={currentRtl}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={150}
                        height={31}
                        src="/images/favicon.png"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <Image
                        width={150}
                        height={31}
                        src="/images/favicon.png"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu currentRtl={currentRtl} />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  {!isUser && (
                    <a
                      className="login-info d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#loginSignupModal"
                      role="button"
                      style={{ marginRight: "10px" }}
                    >
                      <i className="far fa-user-circle fz16 me-2" />{" "}
                      <span className="d-none d-xl-block">
                        {currentRtl === "ltr"
                          ? "Login / Register"
                          : "تسجيل الدخول/ يسجل"}
                      </span>
                    </a>
                  )}
                  <li className=" user_setting">
                    <div className="dropdown">
                      {isUser && (
                        <a className="btn" href="" data-bs-toggle="dropdown">
                          <Avatar
                            alt={
                              userData && userData.name !== ""
                                ? userData.name
                                : "Ramp"
                            }
                            src={`${userData?.photo}`}
                            sx={{ width: 46, height: 46, marginLeft: "10px" }}
                          />
                        </a>
                      )}
                      <div className="dropdown-menu">
                        <div className="user_setting_content">
                          {currentRtl === "ltr" &&
                            menuItems.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <p
                                  className={`fz15 fw400 ff-heading ${
                                    sectionIndex === 0 ? "mb20" : "mt30"
                                  }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, itemIndex) => (
                                  <React.Fragment key={itemIndex}>
                                    {item.text === "Logout" ? (
                                      <Link
                                        key={itemIndex}
                                        className={`dropdown-item ${
                                          pathname == item.href
                                            ? "-is-active"
                                            : ""
                                        } `}
                                        href={item.href}
                                        onClick={() => signOut(auth)}
                                      >
                                        <i className={`${item.icon} mr10`} />
                                        {item.text}
                                      </Link>
                                    ) : (
                                      <Link
                                        key={itemIndex}
                                        className={`dropdown-item ${
                                          pathname == item.href
                                            ? "-is-active"
                                            : ""
                                        } `}
                                        href={item.href}
                                      >
                                        <i className={`${item.icon} mr10`} />
                                        {item.text}
                                      </Link>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            ))}
                          {currentRtl !== "ltr" &&
                            menuItemsAr.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <p
                                  className={`fz15 fw400 ff-heading ${
                                    sectionIndex === 0 ? "mb20" : "mt30"
                                  }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, itemIndex) => (
                                  <React.Fragment key={itemIndex}>
                                    {item.text === "Logout" ? (
                                      <Link
                                        key={itemIndex}
                                        className={`dropdown-item ${
                                          pathname == item.href
                                            ? "-is-active"
                                            : ""
                                        } `}
                                        href={item.href}
                                        onClick={() => signOut(auth)}
                                      >
                                        <i className={`${item.icon} mr10`} />
                                        {item.text}
                                      </Link>
                                    ) : (
                                      <Link
                                        key={itemIndex}
                                        className={`dropdown-item ${
                                          pathname == item.href
                                            ? "-is-active"
                                            : ""
                                        } `}
                                        href={item.href}
                                      >
                                        <i className={`${item.icon} mr10`} />
                                        {item.text}
                                      </Link>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </li>

                  {isUser && (
                    <Link
                      className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-2"
                      href="/dashboard-add-property"
                    >
                      {currentRtl === "ltr" ? "Add Property" : "أضف خاصية "}
                      <i className="fal fa-arrow-right-long" />
                    </Link>
                  )}
                  <button
                    onClick={handleRtl}
                    className="ud-btn btn-white add-property bdrs60 mx-2 "
                  >
                    {currentRtl !== "ltr" ? "EN" : "AR"}
                  </button>
                  <div
                    className="sidemenu-btn filter-btn-right"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <Image
                      width={25}
                      height={9}
                      className="img-1"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                    <Image
                      width={25}
                      height={9}
                      className="img-2"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </div>
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default DefaultHeader;
