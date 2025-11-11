// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhYJ0NTalZeIAKfrbNjNqBvBo9dvu0YuQ",
  authDomain: "artify-90fa0.firebaseapp.com",
  projectId: "artify-90fa0",
  storageBucket: "artify-90fa0.firebasestorage.app",
  messagingSenderId: "888906624133",
  appId: "1:888906624133:web:105d11a10386149c7e4dec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth