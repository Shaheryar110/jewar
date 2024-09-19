import AdvanceFilterModal from "@/components/common/advance-filter";
import HeroContent from "./HeroContent";
import Category from "./Category";
import { useContext } from "react";
import { RtlContext } from "@/Context/RtlContext";

const Hero = ({ data }) => {
  const { currentRtl } = useContext(RtlContext);
  
  // Determine which language variant to use
  const bannerName = currentRtl === "ltr" ? data?.bannerNameText?.en : data?.bannerNameText?.ar;
  const bannerDescription = currentRtl === "ltr" ? data?.bannerDescriptionText?.en : data?.bannerDescriptionText?.ar;

  return (
    <>
      <div className="inner-banner-style4">
        <h2 className="hero-title animate-up-1">{bannerName}</h2>
        <p className="hero-text fz15 animate-up-2">
          {bannerDescription}
        </p>

        <HeroContent />
      </div>
      {/* End Hero content */}

      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}

      <Category />
    </>
  );
};

export default Hero;
