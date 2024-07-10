"use client";
import { decodeData, encodeData } from "./jwt";

export const saveData = (key, value) => {
    console.log("value",key);

  if (window) {
    try {
      const encryptedData = encodeData(value);

      window.localStorage.setItem(key, encryptedData);
    } catch (error) {
      console.log("error",error);

    }
  }
};

export const getData = (key) => {
  if (typeof window !== "undefined") {
    try {
      const localEncryptedData = window.localStorage.getItem(key);
      if (localEncryptedData) {
        return decodeData(localEncryptedData);
      }
    } catch (error) {
      return "";
    }
  }
};

export const removeData = (key) => {
  if (window) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {}
  }
};

export const updateData = (key, value) => {
  if (window) {
    try {
      removeData(key);
      saveData(key, value);
    } catch (error) {}
  }
};

export const removeAll = () => {
  if (window) {
    try {
      window.localStorage.clear();
    } catch (error) {}
  }
};
