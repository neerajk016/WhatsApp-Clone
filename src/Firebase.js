// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOAXMxBd5zJ1FSCgW7x9JANhQ-R0u25OY",
  authDomain: "whatsapp-cbb2c.firebaseapp.com",
  projectId: "whatsapp-cbb2c",
  storageBucket: "whatsapp-cbb2c.appspot.com",
  messagingSenderId: "679126590523",
  appId: "1:679126590523:web:a6ce751bc6b463e0e7681e",
  measurementId: "G-TMRQDN3PXT"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export  const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

