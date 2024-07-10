"use client";

import { Inter, Outfit, Roboto, Rubik } from "next/font/google";
import { Open_Sans } from "next/font/google";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/steps-bar";
import MainDiv from "@/components/styles/main.style";
import Stepbardiv from "@/components/styles/stepsbar.style.";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ToastWrapper from "@/components/ToastContainer";
import StyledJsxRegistry from "./registry";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import ProtectedPageService from "@/services/protectedPage";
import { appWithTranslation } from "next-i18next";
import { I18nextProvider } from "react-i18next";
import common_en from "../locales/en/common_en.json";
import i18next from "i18next";
import { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const open_sans = Open_Sans({ subsets: ["latin"] });
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en", // language to use
  resources: {
    en: {
      common: common_en, // 'common' is our custom namespace
    },
  },
});

function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const isLoginPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname == "/resetPassword" ||
    pathname == "/forgotPassword";

  return (
    <html lang='en'>
      <body className={`${inter.className} ${open_sans.className}`}>
        <title>Koncierge</title>
        <meta name='description' content='Koncierge description' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Provider store={store}>
          <I18nextProvider i18n={i18next}>
            <GoogleOAuthProvider clientId='598913711908-ps1ud5pqp6diuci99laprr35pkbqffoa.apps.googleusercontent.com'>
              <ProtectedPageService />
              <ToastWrapper />
              <div>
                <div>
                  {!isLoginPage && isSidebarOpen && (
                    <Stepbardiv $isvisible={isSidebarOpen}>
                      <Sidebar />
                    </Stepbardiv>
                  )}
                  <MainDiv $isvisible={isSidebarOpen}>
                    {/* {!isLoginPage && (
                    <Header
                      onToggleSidebar={toggleSidebar}
                      isSidebarOpen={isSidebarOpen}
                    />
                  )} */}
                    <StyledJsxRegistry>{children}</StyledJsxRegistry>
                  </MainDiv>
                </div>
              </div>
            </GoogleOAuthProvider>
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}

export default appWithTranslation(RootLayout);
