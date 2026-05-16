import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC3AQfg6z3utMy0AkFDvSR-VYNyRL4hyz8",
  authDomain: "axiompc-ddc28.firebaseapp.com",
  projectId: "axiompc-ddc28",
  storageBucket: "axiompc-ddc28.firebasestorage.app",
  messagingSenderId: "401743424154",
  appId: "1:401743424154:web:7370488e0f6800b62c4d23",
  measurementId: "G-RNYHJ09LMB"
};

// init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// =======================
// GOOGLE LOGIN
// =======================
const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      localStorage.setItem("user", JSON.stringify(result.user));

      window.location.href = "./index.html";

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  });
}


// =======================
// EMAIL LOGIN
// =======================
const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("user", JSON.stringify(userCred.user));

      window.location.href = "./index.html";

    } catch (error) {
      console.log(error);
      alert("Login xato yoki user topilmadi");
    }
  });
}