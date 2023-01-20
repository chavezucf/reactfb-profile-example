import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "../Firebase.config"

import {getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
