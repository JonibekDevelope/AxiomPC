import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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

// ✅ AUTH CHECK (TO‘G‘RI YO‘L)
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "./login.html";
  } else {
    console.log("Logged in:", user.email);
    loadProducts(); // faqat login bo‘lsa ishlaydi
  }
});

const productsContainer = document.getElementById("productCards");
const searchInput = document.querySelector(".header-center input");

let allProducts = [];

// API
async function getProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  allProducts = data.products;
  renderProducts(allProducts);
}

// render
function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    productsContainer.innerHTML += `
      <div class="card">
        <img src="${product.thumbnail}" />
        <div class="card-body">
          <h2>${product.title}</h2>
          <p>${product.description.slice(0, 60)}...</p>
          <div class="price-box">
            <span>$${product.price}</span>
            <button>Sotib olish</button>
          </div>
        </div>
      </div>
    `;
  });
}

// search
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = allProducts.filter(p =>
      p.title.toLowerCase().includes(value)
    );
    renderProducts(filtered);
  });
}

function loadProducts() {
  getProducts();
}