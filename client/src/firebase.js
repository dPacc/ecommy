import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaVzAR9EbZNIPIwUwXrXShvnSNW7vD38I",
  authDomain: "ecommy-27d4e.firebaseapp.com",
  projectId: "ecommy-27d4e",
  storageBucket: "ecommy-27d4e.appspot.com",
  messagingSenderId: "872698404483",
  appId: "1:872698404483:web:27d536218fc355ea1645b6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export var googleAuthProvider = new firebase.auth.GoogleAuthProvider();
