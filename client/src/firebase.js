// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-mern-30668.firebaseapp.com",
  projectId: "estate-mern-30668",
  storageBucket: "estate-mern-30668.firebasestorage.app",
  messagingSenderId: "308449649150",
  appId: "1:308449649150:web:045c3ab9eaf05407f3a0af",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
