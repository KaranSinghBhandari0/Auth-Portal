import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDiyocUfgjJr5KhVPlo23A5BGKvOOb_pPQ",
    authDomain: "auth-portal-6dd87.firebaseapp.com",
    projectId: "auth-portal-6dd87",
    storageBucket: "auth-portal-6dd87.firebasestorage.app",
    messagingSenderId: "681936560691",
    appId: "1:681936560691:web:c26cfdfdf6d911659c3946"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {auth, db, googleProvider}