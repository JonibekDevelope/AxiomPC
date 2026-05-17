import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// ======================
// FIREBASE CONFIG
// ======================

const firebaseConfig = {
  apiKey: "AIzaSyC3AQfg6z3utMy0AkFDvSR-VYNyRL4hyz8",
  authDomain: "axiompc-ddc28.firebaseapp.com",
  projectId: "axiompc-ddc28",
  storageBucket: "axiompc-ddc28.firebasestorage.app",
  messagingSenderId: "401743424154",
  appId: "1:401743424154:web:7370488e0f6800b62c4d23",
};

// ======================
// FIREBASE INIT
// ======================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// ======================
// DOM
// ======================

const productsContainer =
  document.getElementById("productCards");

const searchInput =
  document.querySelector(".header-center input");

let allProducts = [];

// ======================
// AUTH CHECK
// ======================

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "./login.html";
  } else {
    console.log("Logged in:", user.email);

    fetchProducts();
  }

});

// ======================
// FETCH PRODUCTS
// ======================

async function fetchProducts() {

  try {

    const res = await fetch(
      "https://dummyjson.com/products/category/laptops"
    );

    const data = await res.json();

    allProducts = data.products;

    renderProducts(allProducts);

  } catch (error) {

    console.log(error);

  }

}

// ======================
// RENDER PRODUCTS
// ======================

function renderProducts(products) {

  productsContainer.innerHTML = "";

  products.forEach((product) => {

    productsContainer.innerHTML += `
    
      <div class="card">

        <img 
          src="${product.thumbnail}" 
          alt="${product.title}"
        >

        <div class="card-body">

          <h2>${product.title}</h2>

          <p>
            ${product.description.slice(0, 70)}...
          </p>

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

// ======================
// SEARCH SYSTEM
// ======================

if (searchInput) {

  searchInput.addEventListener("input", (e) => {

    const value =
      e.target.value.toLowerCase();

    const filtered = allProducts.filter(
      (product) =>
        product.title
          .toLowerCase()
          .includes(value)
    );

    renderProducts(filtered);

  });

}

// ======================
// CART SYSTEM
// ======================

window.addToCart = (id) => {

  let cart =
    JSON.parse(localStorage.getItem("cart"))
    || [];

  const product = allProducts.find(
    (p) => p.id === id
  );

  cart.push(product);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  alert("Savatga qo‘shildi!");

};

// ======================
// LOGOUT
// ======================

window.logout = async () => {

  await signOut(auth);

  window.location.href = "./login.html";

};

const slider =
  document.getElementById("slider");

let currentSlide = 0;

// ======================
// FETCH SLIDER IMAGES
// ======================

async function getSliderImages() {

  try {

    const res = await fetch(
      "https://dummyjson.com/products/category/laptops"
    );

    const data = await res.json();

    renderSlides(data.products);

  } catch (error) {

    console.log(error);

  }

}

// ======================
// RENDER SLIDES
// ======================

function renderSlides(products) {

  slider.innerHTML = "";

  products.forEach((product) => {

    slider.innerHTML += `

      <img
        class="slide-image"
        src="${product.images[0]}"
        alt="${product.title}"
      >

    `;

  });

  startSlider();

}

// ======================
// AUTO SLIDER
// ======================

function startSlider() {

  const slides =
    document.querySelectorAll(".slide-image");

  slides.forEach((img, index) => {

    img.style.display =
      index === 0 ? "block" : "none";

  });

  setInterval(() => {

    slides[currentSlide].style.display =
      "none";

    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    slides[currentSlide].style.display =
      "block";

  }, 3000);

}

// ======================
// START
// ======================

getSliderImages();