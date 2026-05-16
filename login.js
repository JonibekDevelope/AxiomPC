import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3AQfg6z3utMy0AkFDvSR-VYNyRL4hyz8",
  authDomain: "axiompc-ddc28.firebaseapp.com",
  projectId: "axiompc-ddc28",
  storageBucket: "axiompc-ddc28.firebasestorage.app",
  messagingSenderId: "401743424154",
  appId: "1:401743424154:web:7370488e0f6800b62c4d23",
  measurementId: "G-RNYHJ09LMB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* GOOGLE LOGIN */
document.getElementById("googleLogin").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem("user", JSON.stringify(result.user));
    window.location.href = "/index.html";
  } catch (e) {
    alert(e.message);
  }
});

/* EMAIL LOGIN */
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user", JSON.stringify(userCred.user));
    window.location.href = "/index.html";
  } catch (e) {
    alert("Login xato");
  }
});