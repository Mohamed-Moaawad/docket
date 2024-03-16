// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8pLlXAVX6CofzBP8LGrB2zexR3Cmoo9s",
    authDomain: "to-do-project-c3879.firebaseapp.com",
    projectId: "to-do-project-c3879",
    storageBucket: "to-do-project-c3879.appspot.com",
    messagingSenderId: "1078765695473",
    appId: "1:1078765695473:web:08b092df5b0bc82cded450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app);