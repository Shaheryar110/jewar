import { RtlContext } from "@/Context/RtlContext";
import { useContext } from "react";

const Features = ({ data }) => {data
  const { currentRtl } = useContext(RtlContext);
  // Define an array of feature objects
  const features = [
    {
      icon: "flaticon-security",
      title: "Property Management",
      description:
        "Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.",
    },
    {
      icon: "flaticon-keywording",
      title: "Mortgage Services",
      description:
        "Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.",
    },
    {
      icon: "flaticon-investment",
      title: "Currency Services",
      description:
        "Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.",
    },
  ];

  const data2 = {};

  return (
    <>
  <div dangerouslySetInnerHTML={{ __html: currentRtl === 'ltr' ? data?.sellingListText1?.en : data?.sellingListText1?.ar }} />
<div dangerouslySetInnerHTML={{ __html: currentRtl === 'ltr' ? data?.sellingListText2?.en : data?.sellingListText2?.ar }} />
<div dangerouslySetInnerHTML={{ __html: currentRtl === 'ltr' ? data?.sellingListText3?.en : data?.sellingListText3?.ar }} />

    </>
  );
};

export default Features;
