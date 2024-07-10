import React from "react";
import Image from "next/image";
import { Footer } from "@/components";
import { useForm } from "react-hook-form";
import Link from "next/link";

const ResetPassword = () => {
  return (
    <div className="container pt-[20px] ">
      <div className="profile-question-main">
        <div className="grid grid-cols-1 grid-div gap-52">
          <div className="right-div-login">
            <div className="profile-question-text-div">
              <p className="started-div text-welcome">Reset Your Password</p>
              <Image
                src="/images/get-started-bar.svg"
                className="get-started-bar"
                width={200}
                height={5}
              />
              <div className="flex justify-center pt-[50px] md:pt-[147px]">
                <span className="text-question ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </span>
              </div>
            </div>
          </div>
          <div className="left-div flex justify-end">
            <div className="bg-[#64FFDA29] bg-opacity-[16%] w-[600px] mt-[-166px]">
              <div className="px-[24px] py-[24px] md:px-[50px] md:py-[63px]">
                <p className="text-center sign-in-title">Forgot Password</p>
                <form className="mt-[80px]">
                  <div className="mt-10">
                    <input
                      type="text"
                      className="input-tag input-text"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="mt-10">
                    <input
                      type="text"
                      className="input-tag input-text"
                      placeholder="Confirm New Password"
                    />
                  </div>
                  <div className="mt-[100px] flex items-center flex-col lg:flex-row">
                    <div className="flex w-full h-full justify-start">
                      <button className="w-[160px] h-[60px] rounded-xl text-center text-login-button bg-[#054141]">
                        Submit
                      </button>
                    </div>
                    <Link
                      href="/login"
                      className="flex w-full h-full justify-end text-forget-password mt-[-146px] lg:mt-0"
                    >
                      Go To Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
