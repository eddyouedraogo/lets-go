// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDANs97tIzYR730LR8cwgUkWu0F7B0742Q",
  authDomain: "letsgo-ec12d.firebaseapp.com",
  projectId: "letsgo-ec12d",
  storageBucket: "letsgo-ec12d.appspot.com",
  messagingSenderId: "1001624161068",
  appId: "1:1001624161068:web:9575a524e81c84fc337a89",
  measurementId: "G-DBPXLG33GQ"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);