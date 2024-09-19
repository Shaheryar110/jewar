import Script from "next/script";
import Home_V4 from "./(home)/home-v4/page";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "Home v1 || Jewar - Real Estate  ",
};

export default function MainRoot() {
  return (
    <Wrapper>
      {/* <Script
        type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560&libraries=places"
      ></Script> */}
      <Home_V4 />
    </Wrapper>
  );
}
