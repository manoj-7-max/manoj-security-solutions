
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjfJSKgKHGEx_x0XrYGcGG9B4w6-hceH0",
    authDomain: "manojsecuritysolutions.firebaseapp.com",
    projectId: "manojsecuritysolutions",
    storageBucket: "manojsecuritysolutions.firebasestorage.app",
    messagingSenderId: "850224695709",
    appId: "1:850224695709:web:69e5c27f93ac47b7498774",
    measurementId: "G-T2ED7D2ZS6"
};

// Initialize Firebase (Singleton pattern to prevent multiple re-initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Initialize Analytics only on client side
let analytics;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, analytics };
