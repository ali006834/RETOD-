import * as React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { IkasStorefrontConfig } from "@ikas/storefront-config";

import Config from "config.json";

// You can remove this and add your own styles
import "src/styles/global.css";
import { ThemeProvider } from "styled-components";
import { theme } from "src/styles/styled";
import FloatingButtons from "src/components/floating-buttons";
import CookieConsent from "src/components/cookie-consent";
// import HeartTrails from "src/components/heart-trails";

IkasStorefrontConfig.init({
  ...Config,
  apiUrl: process.env.NEXT_PUBLIC_GQL_URL,
  cdnUrl: process.env.NEXT_PUBLIC_CDN_URL,
});

const IkasThemeApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <FloatingButtons />
      <CookieConsent />
      {/* <HeartTrails /> */}
    </ThemeProvider>
  );
};

export default IkasThemeApp;
