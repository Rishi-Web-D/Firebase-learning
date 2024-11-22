// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBdTDOCA-IBOtrn4D3FEws2_1polwSXSUk",
  authDomain: "fir-learning-3a951.firebaseapp.com",
  projectId: "fir-learning-3a951",
  storageBucket: "fir-learning-3a951.firebasestorage.app",
  messagingSenderId: "799660623340",
  appId: "1:799660623340:web:34875d9039144a24b92cc9",
  measurementId: "G-J88GJPHN0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider;
export const db = getFirestore(app)