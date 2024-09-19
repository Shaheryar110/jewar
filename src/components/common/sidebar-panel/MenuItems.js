"use client";
import { RtlContext } from "@/Context/RtlContext";
import { useContext } from "react";

const MenuItems = () => {
  const { currentRtl } = useContext(RtlContext);
  const menuItems = [
    { id: 1, title: "Apartments" },
    { id: 2, title: "Bungalow" },
    { id: 3, title: "Houses" },
    { id: 4, title: "Loft" },
    { id: 5, title: "Office" },
    { id: 6, title: "Townhome" },
    { id: 7, title: "Villa" },
  ];
  const menuItemsAr = [
    { id: 1, title: "شقق" }, // Apartments
    { id: 2, title: "بنغلو" }, // Bungalow
    { id: 3, title: "منازل" }, // Houses
    { id: 4, title: "لوفت" }, // Loft
    { id: 5, title: "مكتب" }, // Office
    { id: 6, title: "بيت البلدية" }, // Townhome
    { id: 7, title: "فيلا" }, // Villa
  ];
  const itemsToRender = currentRtl === "ltr" ? menuItems : menuItemsAr;
  return (
    <ul className="navbar-nav">
      {itemsToRender.map((item) => (
        <li className="nav-item" key={item.id}>
          <a className="nav-link" href="#" role="button">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
