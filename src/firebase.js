import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnN016qEYGTn6yKofs2Xzr215MVHAzS5E",
  authDomain: "clone-85ae9.firebaseapp.com",
  projectId: "clone-85ae9",
  storageBucket: "clone-85ae9.appspot.com",
  messagingSenderId: "461561045284",
  appId: "1:461561045284:web:6e8ed79282c8b7ce9cd3b1",
  measurementId: "G-X20NKZB95V"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider}