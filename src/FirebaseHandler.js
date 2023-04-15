// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYM_Eq1P4M17mDI1PtQevL0R6hTzu61aQ",
  authDomain: "homeless-eats-f9c11.firebaseapp.com",
  projectId: "homeless-eats-f9c11",
  storageBucket: "homeless-eats-f9c11.appspot.com",
  messagingSenderId: "376841442505",
  appId: "1:376841442505:web:2279a7027f363e4b70a918",
  measurementId: "G-K79PJRFERW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FirebaseInfo = { firebaseConfig: firebaseConfig, app: app, db: db };
export default FirebaseInfo;