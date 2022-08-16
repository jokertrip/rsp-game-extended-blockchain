// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAn7dAD2hPaGu9AborPrAjdbMq2MuUfaq8",
    authDomain: "rcp-game-7321e.firebaseapp.com",
    projectId: "rcp-game-7321e",
    storageBucket: "rcp-game-7321e.appspot.com",
    messagingSenderId: "507797004690",
    appId: "1:507797004690:web:917d38f655ea4a4260e14b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
