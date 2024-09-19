import { RtlContext } from "@/Context/RtlContext";
import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");
  const { currentRtl, setCurrentRtl } = useContext(RtlContext);
  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("home");
      }
    });
    // blogItems.forEach((elm) => {
    //   if (elm.href.split("/")[1] == pathname.split("/")[1]) {
    //     setTopMenu("blog");
    //   }
    // });
    // pageItems.forEach((elm) => {
    //   if (elm.href.split("/")[1] == pathname.split("/")[1]) {
    //     setTopMenu("pages");
    //   }
    // });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
  }, []);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };
  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "home" ? "title menuActive" : "title"}>
            <Link className={`${handleActive("/")}`} href={"/"}>
              {currentRtl === "ltr" ? "Home" : "بيت"}
            </Link>
          </span>
        </a>
      </li>

      <li className="megamenu_style dropitem">
        <a className="list-item" href={`/map/data?propertyType="All"`}>
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            {currentRtl === "ltr" ? "Listing" : "قائمة"}
          </span>
        </a>
      </li>
      <li className="megamenu_style dropitem">
        <a className="list-item" href={`/blog-list`}>
          <span className={topMenu == "Blogs" ? "title menuActive" : "title"}>
            {currentRtl === "ltr" ? "Blogs" : "المدونات"}
          </span>
        </a>
      </li>
    </ul>
  );
};

export default MainMenu;
