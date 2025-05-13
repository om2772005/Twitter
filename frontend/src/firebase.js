import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKEJHsM0VO_CRaji2cyxZo-XqiBeKAXqk",
  authDomain: "auth-52980.firebaseapp.com",
  projectId: "auth-52980",
  storageBucket: "auth-52980.firebasestorage.app",
  messagingSenderId: "139729359906",
  appId: "1:139729359906:web:cc9bc2059a6dbf68bfe67b",
  measurementId: "G-3JN1RPS7WG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };