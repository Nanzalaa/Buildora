const CART_KEY = "buildora_cart";
const ORDERS_KEY = "buildora_orders";
const DELIVERY_FEE = 500;
const FREE_DELIVERY_OVER = 20000;

// Helpers
function formatPrice(amount) {
  return "KSh " + amount.toLocaleString("en-KE");
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Cart
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, qty = 1) {
  const product = getProduct(productId);
  if (!product) return;

  const cart = getCart();
  const item = cart.find((i) => i.id === product.id);
  const currentQty = item ? item.qty : 0;

  if (currentQty + qty > product.stock) {
    showToast(`Only ${product.stock} in stock`, "error");
    return;
  }

  if (item) item.qty += qty;
  else cart.push({ id: product.id, qty });

  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

function updateQty(productId, qty) {
  const product = getProduct(productId);
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((i) => i.id !== productId);
  } else {
    const item = cart.find((i) => i.id === productId);
    if (item) item.qty = Math.min(qty, product.stock);
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  saveCart(getCart().filter((i) => i.id !== productId));
}

function clearCart() {
  saveCart([]);
}

function getCartSummary() {
  const items = getCart()
    .map((i) => ({ ...getProduct(i.id), qty: i.qty }))
    .filter((i) => i.id);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  return { items, subtotal, delivery, total: subtotal + delivery, count };
}

function updateCartCount() {
  const { count } = getCartSummary();
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "inline-flex" : "none";
  });
}

// Product cards and messages
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add("hide"), 2200);
  setTimeout(() => toast.remove(), 2600);
}

function productImage(product, size = "") {
  return `<div class="product-img ${size}">
    <img src="${productImageSrc(product.id)}" alt="${escapeHTML(product.name)}" loading="lazy">
  </div>`;
}

function productCard(product) {
  const cat = getCategory(product.category);
  return `
    <article class="product-card">
      <a href="product.html?id=${product.id}" class="product-link">
        ${productImage(product)}
      </a>
      <div class="product-info">
        <span class="product-cat">${cat.name}</span>
        <a href="product.html?id=${product.id}" class="product-name">${escapeHTML(product.name)}</a>
        <div class="product-bottom">
          <div>
            <span class="price">${formatPrice(product.price)}</span>
            <small class="unit">/ ${product.unit}</small>
          </div>
          <button class="btn btn-sm" onclick="addToCart(${product.id})">Add</button>
        </div>
      </div>
    </article>`;
}

// Header and footer
function renderHeader() {
  const page = location.pathname.split("/").pop() || "index.html";
  const link = (href, label) =>
    `<a href="${href}" class="${page === href ? "active" : ""}">${label}</a>`;

  document.getElementById("site-header").innerHTML = `
    <div class="topbar">Free delivery within Nairobi on orders above ${formatPrice(FREE_DELIVERY_OVER)}</div>
    <nav class="navbar container">
      <a href="index.html" class="logo">Build<span>ora</span></a>
      <form class="nav-search" action="shop.html">
        <input type="search" name="q" placeholder="Search cement, iron sheets, pipes..." aria-label="Search products">
        <button type="submit" aria-label="Search">Search</button>
      </form>
      <button class="menu-toggle" aria-label="Open menu">Menu</button>
      <div class="nav-links">
        ${link("index.html", "Home")}
        ${link("shop.html", "Shop")}
        ${link("about.html", "About")}
        ${link("contact.html", "Contact")}
        <a href="cart.html" class="cart-link ${page === "cart.html" ? "active" : ""}">
          Cart <span class="cart-count">0</span>
        </a>
      </div>
    </nav>`;

  document.querySelector(".menu-toggle").addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("open");
  });
}

function renderFooter() {
  document.getElementById("site-footer").innerHTML = `
    <div class="container footer-grid">
      <div>
        <a href="index.html" class="logo">Build<span>ora</span></a>
        <p>Quality building materials delivered to your site. Build better, build with Buildora.</p>
      </div>
      <div>
        <h4>Shop</h4>
        ${CATEGORIES.slice(0, 4).map((c) => `<a href="shop.html?category=${c.id}">${c.name}</a>`).join("")}
      </div>
      <div>
        <h4>Company</h4>
        <a href="about.html">About us</a>
        <a href="contact.html">Contact</a>
        <a href="cart.html">My cart</a>
      </div>
      <div>
        <h4>Visit us</h4>
        <p>Mombasa Road, Nairobi<br>Monday to Friday, 7:30am to 6pm<br>Saturday, 8am to 4pm<br>+254 700 000 000</p>
      </div>
    </div>
    <p class="copyright">Copyright ${new Date().getFullYear()} Buildora. All rights reserved.</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("site-header")) renderHeader();
  if (document.getElementById("site-footer")) renderFooter();
  updateCartCount();
});
