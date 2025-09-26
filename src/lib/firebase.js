import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA81-lO0skdp_RK8En9Qf-YeYkYexBHqRc",
  authDomain: "adminconsultationtool.firebaseapp.com",
  projectId: "adminconsultationtool",
  storageBucket: "adminconsultationtool.firebasestorage.app",
  messagingSenderId: "65741902163",
  appId: "1:65741902163:web:a7eb89a2c93e2ef6a191a6"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


let analytics;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn("Analytics not supported in this environment:", error);
  }
}


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, analytics };
