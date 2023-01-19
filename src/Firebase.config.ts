// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

import {getAuth, EmailAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0ECfcjB8YtJ--TwIgzqfM1caVFzlKLpY",
  authDomain: "reactfb-profile-example.firebaseapp.com",
  projectId: "reactfb-profile-example",
  storageBucket: "reactfb-profile-example.appspot.com",
  messagingSenderId: "962497871453",
  appId: "1:962497871453:web:d8a3b4e24661ca9b45d7b4",
  measurementId: "G-X7GVYW7D7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new EmailAuthProvider()