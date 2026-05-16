const isLoggedIn = localStorage.getItem("isLoggedIn");

if(!isLoggedIn){
    window.location.href = "login.html";
}

const productsContainer = document.getElementById("productCards");
const searchInput = document.querySelector(".header-center input");

let allProducts = [];

// API dan mahsulot olish
async function getProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        allProducts = data.products;

        renderProducts(allProducts);

    } catch (error) {
        productsContainer.innerHTML = `
            <h1 style="color:white;">Xatolik yuz berdi...</h1>
        `;
        console.log(error);
    }
}

// Productlarni chiqarish
function renderProducts(products) {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        productsContainer.innerHTML += `
        
        <div class="card">
            <img src="${product.thumbnail}" alt="">
            
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

// Search system
searchInput.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(value)
    );

    renderProducts(filtered);
});

getProducts();