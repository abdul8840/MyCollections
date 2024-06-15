// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mycollections-9c1f7.firebaseapp.com",
  projectId: "mycollections-9c1f7",
  storageBucket: "mycollections-9c1f7.appspot.com",
  messagingSenderId: "926697117573",
  appId: "1:926697117573:web:ad8021d9829500573ed6ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;