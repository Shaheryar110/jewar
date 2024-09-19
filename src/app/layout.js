"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import { DM_Sans, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { useContext, useEffect } from "react";
import { AuthContextProvider } from "@/Context/AuthContext";
import { ChatContextProvider } from "@/Context/ChatContext";
import { auth } from "@/Firebase/Config";
import { Toaster } from "react-hot-toast";
import { useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import { RtlContextProvider } from "@/Context/RtlContext";
import { ApiCallProvider, ApiContext } from "@/Context/ApiCallContext";
import { RtlContext } from "@/Context/RtlContext";
import Wrapper from "./layout-wrapper/wrapper";
if (typeof window !== "undefined") {
  import("bootstrap");
}

// DM_Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   setCurrentRtl(window.localStorage.getItem("rtl"));
  // }, [currentRtl]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560",
    libraries: ["places", "maps"],
  });

  return (
    <html lang="en">
      <body
        className={`body  ${poppins.className} ${dmSans.className}`}
        cz-shortcut-listen="false"
      >
        <NextTopLoader color="#527FE2" height={5} />
        <RtlContextProvider>
          <AuthContextProvider>
            <ChatContextProvider>
              <ApiCallProvider>
                <Wrapper>
                  {isLoaded && <div className="wrapper ovh">{children}</div>}
                </Wrapper>
              </ApiCallProvider>
            </ChatContextProvider>
          </AuthContextProvider>
        </RtlContextProvider>
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
