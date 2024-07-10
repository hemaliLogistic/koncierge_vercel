"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { API_ROUTER } from "@/services/apiRouter";
import { toast } from "react-toastify";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import useToaster from "@/hooks/useToaster";
import { FormProvider, RHFTextInput } from "@/components/hook-form";
import { axiosPost } from "@/services/axiosHelper";
import Link from "next/link";
import { loginAction, registerAction } from "@/redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import { setIsForgotPassword } from "@/redux/Auth/AuthSlice";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { getData } from "@/utils/storage";
import "../verifyEmail/global.css";
import CustomSlider from "@/components/CustomSlider/customeSlider";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = getData("user");
  const userAuth = user?.token;
  const [isHidden, setIsHidden] = useState(false);
  const [isConfirmHidden, setIsConfirmHidden] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (CodeResponse) => decode(CodeResponse.access_token),
  });

  const decode = (token) => {
    let accessTokenForGoogle = token;
    async function check() {
      try {
        let response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessTokenForGoogle}`,
            },
          }
        );
        if (response.ok) {
          let data = await response.json();
          console.log("data", data);
          try {
            const res = await dispatch(
              registerAction({
                fullname: data.name,
                email: data.email,
                google_token: token,
                is_google_login: 1,
              })
            );
            // if (!res?.data?.status) {
            //   return toast.error(
            //     res?.data?.message || "Something went wrong 1 !"
            //   );
            // }
            if (res?.payload?.status) {
              toaster(TOAST_ALERTS.LOGIN_SUCCESS, TOAST_TYPES.SUCCESS);
              router.push(`/que1`);
            }
          } catch (error) {
            toast.error("Something went wrong !");
            console.log("Error", error);
          }
        } else {
          throw new Error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    check();
  };

  // Form Config
  const defaultValues = useMemo(
    () => ({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }),
    []
  );

  const formSchema = useMemo(() => {
    return yup
      .object()
      .shape({
        userName: yup
          .string()
          .required("Please enter your name")
          .trim("Enter valid name"),
        email: yup
          .string()
          .required("Please enter email address")
          .email("Please enter valid email address")
          .trim("Please enter valid email address"),
        password: yup
          .string()
          .required("Password is required")
          .trim("Enter valid password"),
        confirmPassword: yup
          .string()
          .required("Please confirm your password")
          .oneOf([yup.ref("password")], "Your passwords do not match")
          .trim("Enter valid confirm password"),
      })
      .strict(true);
  }, []);

  //Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  // Constants
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = methods;

  const { toaster } = useToaster();

  const onSubmitForm = async (formData) => {
    try {
      const { email, password } = formData;

      const res = await dispatch(
        loginAction({
          is_google_login: 0,
          email,
          password,
        })
      );
      //   const res = await axiosPost(API_ROUTER.LOGIN, {
      //     is_google_login: 0,
      //     email,
      //     password,
      //   });

      console.log("res", res);
      if (!res.payload.status) {
        return toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      }
      if (res.payload.status) {
        toaster(TOAST_ALERTS.LOGIN_SUCCESS, TOAST_TYPES.SUCCESS);
        methods.reset();
        router.push("/que1");
      }
    } catch (error) {
      toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      console.log("Error", error);
    }
  };

  return (
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
            <p className='login-title'>Forgot Password</p>
            <text className='login-desc'>Reset your password</text>
          </div>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmitForm)}
            className='provider-div'>
            <div className='column-div'>
              <div className='inside-form'>
                <RHFTextInput
                  name='password'
                  type={isHidden ? "password" : "text"}
                  className='input-login-div input-div-text pl-10 '
                  placeholder='New Password'
                />
                <div className='input-left-icon'>
                  <img src='/images/lock.png' alt='icon' className='w-5 h-5' />
                </div>
                <button
                  type='button'
                  onClick={() => setIsHidden(!isHidden)}
                  className='input-right-icon'>
                  <img
                    src={isHidden ? "/images/hidden.png" : "/images/eye.png"}
                    alt='icon'
                    className='w-5 h-5'
                  />
                </button>
              </div>
              <div className='inside-form'>
                <RHFTextInput
                  name='confirmPassword'
                  type={isConfirmHidden ? "password" : "text"}
                  className='input-login-div input-div-text pl-10 '
                  placeholder='Confirm New Password'
                />
                <div className='input-left-icon'>
                  <img src='/images/lock.png' alt='icon' className='w-5 h-5' />
                </div>
                <button
                  type='button'
                  onClick={() => setIsConfirmHidden(!isConfirmHidden)}
                  className='input-right-icon'>
                  <img
                    src={
                      isConfirmHidden ? "/images/hidden.png" : "/images/eye.png"
                    }
                    alt='icon'
                    className='w-5 h-5'
                  />
                </button>
              </div>
            </div>

            <div className='center-div'>
              <button type='submit' className='save-btn'>
                Save
              </button>
            </div>
          </FormProvider>
          <div className='bottom-div'>
            <text className='register-text'>Go to</text>
            <button onClick={() => router.replace("/login")}>
              {/* <Link className='register-btn' href='/register'> */}
              <div className='register-btn'>Login</div>
              {/* </Link> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
