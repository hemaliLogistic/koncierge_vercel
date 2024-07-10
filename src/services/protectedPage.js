"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { getData } from "@/utils/storage";
import { useSelector } from "react-redux";

const ProtectedPageService = () => {
  const router = useRouter();
  const path = usePathname();
  const user = getData("user");
  const userAuth = user?.token;
  const selector = useSelector(state => state.registerApi);

  const afterLoginProtectedPages = [
   ];
  const afterLoginNotAccessiblePages = [
    "/",
    "/home",
    "/register",
    "/login",
    "/resetPassword",
    "/forgotPassword",
     ];

  useEffect(() => {
    if (afterLoginNotAccessiblePages.includes(path) && userAuth) {
      let dashboard_url = `/que1`;
      router.push(dashboard_url);
    }

    let isProtectedDynamicPath = false;
    afterLoginProtectedPages.forEach((pattern) => {
      if (
        (pattern instanceof RegExp && pattern.test(path)) ||
        path === pattern
      ) {
        isProtectedDynamicPath = true;
      }
    });

    if (isProtectedDynamicPath && !userAuth) {
      router.push("/login");
    }
  }, [userAuth, path]);

  return null;
};

export default ProtectedPageService;
