//    Login / User Info
const userInfo = document.querySelector('#user_info');
const userName = document.querySelector('#user');
const links = document.querySelector('#links');

if (
    localStorage.getItem('fristName') &&
    localStorage.getItem('lastName')
) {
    userName.textContent =
        `${localStorage.getItem('fristName')} ${localStorage.getItem('lastName')}`;
    userInfo.style.display = "flex";
    links.style.display = "none";
} else {
    userInfo.style.display = "none";
    links.style.display = "flex";
}

/* Logout */
const logout = document.querySelector('#logout');
if (logout) {
    logout.addEventListener("click", () => {
        localStorage.clear();
        alert("Log out successfully");
        window.location = "index.html";
    });
}

//    Slide Bar Toggle
const shopIcon = document.querySelector(".shopping-basket");
const showPlants = document.querySelector(".show_plants");

shopIcon.addEventListener("click", () => {
    showPlants.classList.toggle("open");
});

//    Products Data
const productsContainer = document.getElementById("products-container");

const cards = [
    { id: 1, title: "Basil", category: "Aromatic", price: 10, img: "assets/imgs/plants/Aromatic/Basil.jpg" },
    { id: 2, title: "Aloe Vera", category: "Medicinal", price: 15, img: "assets/imgs/plants/Medicinal/Aloe Vera.jpg" },
    { id: 3, title: "Ficus", category: "Ornamental", price: 20, img: "assets/imgs/plants/Ornamental/Ficus.jpg" },
    { id: 4, title: "Mint", category: "Aromatic", price: 9, img: "assets/imgs/plants/Aromatic/Mint.jpg" },
    { id: 5, title: "Chamomile", category: "Medicinal", price: 13, img: "assets/imgs/plants/Medicinal/Chamomile.jpg" },
    { id: 6, title: "Monstera", category: "Ornamental", price: 22, img: "assets/imgs/plants/Ornamental/Monstera.jpg" },
    { id: 7, title: "Rosemary", category: "Aromatic", price: 11, img: "assets/imgs/plants/Aromatic/Rosemary.jpg" },
    { id: 8, title: "Ginger", category: "Medicinal", price: 12, img: "assets/imgs/plants/Medicinal/Ginger Leaves.jpg" },
    { id: 9, title: "Snake Plant", category: "Ornamental", price: 19, img: "assets/imgs/plants/Ornamental/Snake Plant.jpg" },
];

/* Render Products */
function renderProducts() {
    productsContainer.innerHTML = cards.map(item => `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card plant-card shadow-sm text-center" data-id="${item.id}">
                <img src="${item.img}" class="card-img-top object-fit-cover">
                <div class="card-body d-flex flex-column gap-2">
                <span class="badge badge-${item.category.toLowerCase()}">${item.category}</span>
                <h5>${item.title}</h5>
                <p>$${item.price}</p>
                <div class="mt-auto d-flex justify-content-center gap-3">
                <button class="btn btn-success add-to-basket" onclick="toggleBasket(this)">
                <i class="fas fa-shopping-basket basket-icon"></i>
                <span>Add to Basket</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}
renderProducts();

//    Basket Logic
const show = document.querySelector(".shadow_plants_list");
const numberProducts = document.querySelector(".number_plants");

/* Read basket from storage */
let basket = JSON.parse(localStorage.getItem("basket")) || [];

/* Render basket on load */
basket.forEach(item => renderBasketItem(item));
updateBasketCount();

/* Toggle Add / Remove */
function toggleBasket(button) {
    if (
        !localStorage.getItem("fristName") ||
        !localStorage.getItem("lastName")
    ) {
        alert("Please log in first");
        window.location = "login.html";
        return;
    }

    const card = button.closest(".plant-card");
    const id = Number(card.dataset.id);
    const text = button.querySelector("span");

    const exist = basket.find(p => p.id === id);

    /* Remove */
    if (exist) {
        basket = basket.filter(p => p.id !== id);
        show.querySelector(`[data-id="${id}"]`)?.remove();
        button.classList.remove("added");
        text.textContent = "Add to Basket";
    }
    /* Add */
    else {
        const product = cards.find(p => p.id === id);
        basket.push({ ...product, quantity: 1 });
        renderBasketItem({ ...product, quantity: 1 });
        button.classList.add("added");
        text.textContent = "Remove from Basket";
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    updateBasketCount();
}

/* Render single basket item */
function renderBasketItem(item) {
    show.innerHTML += `
        <div class="plants_list" data-id="${item.id}">
            <div class="left">
                <h5>${item.title}</h5>
                <div class="digital">
                    <button onclick="changeQuantity(this, -1)">-</button>
                    <span class="digital-numder">${item.quantity}</span>
                    <button onclick="changeQuantity(this, 1)">+</button>
                </div>
            </div>
            <div class="right">
                <h5>price</h5>
                <p>$${item.price}</p>
            </div>
        </div>
    `;
}

/* Change Quantity */
function changeQuantity(btn, step) {
    const itemEl = btn.closest(".plants_list");
    const id = Number(itemEl.dataset.id);

    const product = basket.find(p => p.id === id);
    if (!product) return;

    product.quantity += step;
    if (product.quantity < 1) product.quantity = 1;

    itemEl.querySelector(".digital-numder").textContent = product.quantity;
    localStorage.setItem("basket", JSON.stringify(basket));
    updateBasketCount();
}

/* Update basket counter */
function updateBasketCount() {
    const total = basket.reduce((sum, item) => sum + item.quantity, 0);

    if (total > 0) {
        numberProducts.textContent = total;
        numberProducts.style.display = "block";
    } else {
        numberProducts.style.display = "none";
    }
}


