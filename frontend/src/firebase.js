// Import necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7QwkXiM74iNHpJWBzhw_by6uiAM6LqdE",
    authDomain: "smartattendance-7f0c4.firebaseapp.com",
    projectId: "smartattendance-7f0c4",
    storageBucket: "smartattendance-7f0c4.firebasestorage.app",
    messagingSenderId: "694652348473",
    appId: "1:694652348473:web:5b7716823e5b944a0945e8",
    measurementId: "G-7J6EYD788S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
