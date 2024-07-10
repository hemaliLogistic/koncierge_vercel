"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import "./(auth)/login/global.css";
import CustomSlider from "@/components/CustomSlider/customeSlider";
import { useRouter, usePathname } from "next/navigation";

const Home = () => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const getRoute = (routeName) => {
    router.push(routeName);
  };

  return (
    <>
      <div className='container-div'>
        <div className='logo-div-section'>
          <div className=''>
            <img src='/images/webLogo.png' className='' alt='Property' />
          </div>
        </div>
        <div className='image-div '>
          <CustomSlider />
        </div>

        <div className='form-div'>
          <div className='center-div'>
            <img
              src='/images/webLogo.png'
              className='logo-image'
              alt='Property'
            />
          </div>

          <div className='center-form-div'>
            <div className='title-div'>
              <p className='login-title'>Get Started</p>
              <text className='login-desc'>Log in or Create an account</text>
            </div>

            <div className='auth-div'>
              <button className='social-div'>
                <div className='social-image'>
                  <div className='social-image-overlay'></div>
                  <img src='images/facebook.png' className='w-6 h-6' />
                </div>
                <div className='social-text-div'>
                  <text className='social-text'>Continue with Facebook</text>
                </div>
              </button>
              <button className='social-div bg-redEB'>
                <div className='social-image bg-redEB'>
                  <div className='social-image-overlay'></div>
                  <img src='images/Google.png' className='w-6 h-6' />
                </div>
                <div className='social-text-div bg-redEB'>
                  <text className='social-text'>Continue with Google</text>
                </div>
              </button>
              <button
                onClick={() => getRoute("/login")}
                className='social-div bg-green00'>
                <div className='social-image bg-green00'>
                  <div className='social-image-overlay'></div>
                  <img src='images/mail_white.png' className='w-6 h-6' />
                </div>
                <div className='social-text-div bg-green00'>
                  <text className='social-text'>Login with Email</text>
                </div>
              </button>
            </div>
          </div>
          <div className='bottom-start-div'>
            <text className='register-text mt-0'>First time here?</text>
            <button>
              <Link className='register-btn' href='/register'>
                Register
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// }

export default Home;
