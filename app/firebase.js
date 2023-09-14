// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcIswaKCUIx3wBLu8zeQqjwrbATIsEu98",
  authDomain: "reactjs-bf320.firebaseapp.com",
  projectId: "reactjs-bf320",
  storageBucket: "reactjs-bf320.appspot.com",
  messagingSenderId: "45779734195",
  appId: "1:45779734195:web:af89e07eec62116a4b6ac6",
  measurementId: "G-RH0FF5XT5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
