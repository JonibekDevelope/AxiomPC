import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// =====================
// FIREBASE CONFIG
// =====================
const firebaseConfig = {
  apiKey: "AIzaSyC3AQfg6z3utMy0AkFDvSR-VYNyRL4hyz8",
  authDomain: "axiompc-ddc28.firebaseapp.com",
  projectId: "axiompc-ddc28",
  storageBucket: "axiompc-ddc28.firebasestorage.app",
  messagingSenderId: "401743424154",
  appId: "1:401743424154:web:7370488e0f6800b62c4d23",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// =====================
// DOM (HTML MOS)
// =====================
const productsContainer = document.getElementById("productCards");
const searchInput = document.querySelector(".header-center input");

let allProducts = [];

// =====================
// AUTH CHECK
// =====================
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "./login.html";
  } else {
    console.log("Logged in:", user.email);
    fetchProducts();
  }
});

// =====================
// FETCH PRODUCTS (API)
// =====================
async function fetchProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    allProducts = data.products;
    renderProducts(allProducts);

  } catch (err) {
    productsContainer.innerHTML = `
      <h2 style="color:white; text-align:center;">
        Product yuklanmadi
      </h2>
    `;
  }
}

// =====================
// RENDER CARDS
// =====================
function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    productsContainer.innerHTML += `
      <div class="card">
        <img src="${product.thumbnail}" alt="${product.title}">

        <div class="card-body">
          <h2>${product.title}</h2>
          <p>${product.description.slice(0, 60)}...</p>

          <div class="price-box">
            <span>$${product.price}</span>
            <button onclick="addToCart(${product.id})">
              Sotib olish
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// =====================
// SEARCH (HTML input bilan)
// =====================
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = allProducts.filter(p =>
      p.title.toLowerCase().includes(value)
    );

    renderProducts(filtered);
  });
}

// =====================
// CART SYSTEM
// =====================
window.addToCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = allProducts.find(p => p.id === id);

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Savatga qo‘shildi!");
};

// =====================
// LOGOUT (ixtiyoriy)
// =====================
window.logout = async () => {
  await signOut(auth);
  window.location.href = "./login.html";
};

console.log(productsContainer);