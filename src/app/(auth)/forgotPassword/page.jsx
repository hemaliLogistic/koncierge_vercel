"use client";
import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { FormProvider, RHFTextInput } from "@/components/hook-form";
import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "@/redux/Auth/action";
import CustomSlider from "@/components/CustomSlider/customeSlider";
import "../forgotPassword/global.css";

const ForgotPassword = () => {
  const selector = useSelector((state) => state.registerApi);
  const router = useRouter();

  //   useEffect(() => {
  //     if (!selector.isForgotPassword) {
  //       router.replace("/login");
  //     }

  //   }, [selector.isForgotPassword]);
  //Hooks

  // Form Config
  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const formSchema = useMemo(() => {
    return yup
      .object()
      .shape({
        email: yup
          .string()
          .required("Please enter email address")
          .email("Please enter valid email address")
          .trim("Please enter valid email address"),
      })
      .required()
      .strict(true);
  }, []);
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

  const onSubmitForm = async (formData) => {
    try {
      const { email } = formData;

      const res = await dispatch(
        forgotPasswordAction({
          email,
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
                  name='email'
                  className='input-login-div input-div-text pl-10 ' // Add padding to the left to accommodate the image
                  placeholder='Email Address'
                />
                <div className='input-left-icon'>
                  <img src='/images/mail.png' alt='icon' className='w-5 h-5' />
                </div>
              </div>
            </div>

            <div className='center-div'>
              <button type='submit' className='login-btn'>
                Save
              </button>
            </div>

            {/* <div className='mt-[80px] lg:mt-[50px]  text-create-account-link'>
              <span className='font-normal'>
                Don’t have an account?&nbsp;
                <Link className='font-medium' href='/register'>
                  Register here
                </Link>
              </span>
            </div> */}
          </FormProvider>
          <div className='bottom-div'>
            <text className='register-text'>Go to</text>
            <button onClick={() => router.push("/login")}>
              {/* <Link className='register-btn' href='/register'> */}
              <div className='register-btn'>Log in</div>
              {/* </Link> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
