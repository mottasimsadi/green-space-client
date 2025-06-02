// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjJyUhylQYxL0Z259pXlnOf78AVif_i6k",
  authDomain: "green-space-aa531.firebaseapp.com",
  projectId: "green-space-aa531",
  storageBucket: "green-space-aa531.firebasestorage.app",
  messagingSenderId: "385580886778",
  appId: "1:385580886778:web:336c99a131c7708b62b743",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);