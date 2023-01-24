import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAi3MXhBUgF__wuJ1rbP2837drkU-Y0vdU",
    authDomain: "ecommerce-90b3d.firebaseapp.com",
    projectId: "ecommerce-90b3d",
    storageBucket: "ecommerce-90b3d.appspot.com",
    messagingSenderId: "397337930429",
    appId: "1:397337930429:web:019942e67defa992f7a5d4"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
 
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();