// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRdIYDoj75RSSVfXg-IV_IcIK2a3tzVfI",
  authDomain: "my-ai-study.firebaseapp.com",
  projectId: "my-ai-study",
  storageBucket: "my-ai-study.firebasestorage.app",
  messagingSenderId: "22335663124",
  appId: "1:22335663124:web:e7bb1ba77f5e0708ee0b01",
  measurementId: "G-CBQ9G0KP8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
