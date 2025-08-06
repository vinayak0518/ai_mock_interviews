// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp} from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCe_w0DBdkvL7l2kOHM8Tyx_KZQ3sbsiY0",
  authDomain: "interviewprep-361ae.firebaseapp.com",
  projectId: "interviewprep-361ae",
  storageBucket: "interviewprep-361ae.firebasestorage.app",
  messagingSenderId: "678399304673",
  appId: "1:678399304673:web:3a5bf21d22d1a46fe428a0",
  measurementId: "G-931YTQQR2Y"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig):getApp;


export const auth = getAuth(app);

export const db = getFirestore(app);