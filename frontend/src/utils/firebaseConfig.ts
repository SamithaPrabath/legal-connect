// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwjLS6CoL6A5VWozfLAAywqcV9tGb_oWg",
  authDomain: "legal-connect-e56b4.firebaseapp.com",
  projectId: "legal-connect-e56b4",
  storageBucket: "legal-connect-e56b4.firebasestorage.app",
  messagingSenderId: "188469453211",
  appId: "1:188469453211:web:631da586de8e5e21f1813e",
  measurementId: "G-NQDYB3YK49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
