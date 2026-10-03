import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

export const firebaseAuth = getAuth(
  (() => {
    try {
      return getApp();
    } catch {
      return initializeApp(firebaseConfig);
    }
  })(),
);