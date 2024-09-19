import { RtlContext } from "@/Context/RtlContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
const categories = [
  { icon: "flaticon-home-1", text: "Houses" },
  { icon: "flaticon-corporation", text: "Apartments" },
  { icon: "flaticon-network", text: "Office" },
  { icon: "flaticon-garden", text: "Villa" },
];
const categoriesAr = [
  { icon: "flaticon-home-1", text: "منازل" },
  { icon: "flaticon-corporation", text: "شقق سكنية " },
  { icon: "flaticon-network", text: "مكتب" },
  { icon: "flaticon-garden", text: "فيلا" },
];
const Category = () => {
  const { currentRtl } = useContext(RtlContext);
  const [currCat, setCurrCat] = useState(categories);
  useEffect(() => {
    if (currentRtl === "ltr") {
      setCurrCat(categories);
    } else {
      setCurrCat(categoriesAr);
    }
  }, [currentRtl]);

  return (
    <div className="home4-icon-style mt30 d-none d-sm-flex animate-up-4">
      {currCat?.map((category, index) => (
        <Link
          key={index}
          href={`/map/data?Category=${category.text}`}
          className="d-flex align-items-center dark-color ff-heading me-4"
          style={{
            fontSize: "22px",
            fontWeight: currentRtl === "ltr" ? 400 : 600,
          }}
        >
          <i className={`icon mr10 ml10 ${category.icon}`} /> {category.text}
        </Link>
      ))}
    </div>
  );
};

export default Category;
