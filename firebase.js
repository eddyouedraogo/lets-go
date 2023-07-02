// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import * as firebaseAnalytics from "firebase/analytics";
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
let app;
if (firebase.getApps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebaseAuth.getAuth();
const analytics = firebaseAnalytics.getAnalytics(app);

export { auth, firebaseAuth };