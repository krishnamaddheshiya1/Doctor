document.addEventListener("DOMContentLoaded", function () {
    const isFileProto = window.location.protocol === "file:";
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const API_URL = (isFileProto || (isLocalhost && window.location.port !== "" && window.location.port !== "5000" && window.location.protocol !== "https:"))
        ? "http://localhost:5000/api"
        : "/api";

    const products = [
        {
            id: 1,
            name: "Triple Chocolate",
            category: "MINI",
            price: 49,
            description: "Mini Stick Waffle • Triple chocolate",
            badge: "MINI",
            image: "triple.jpg.jpeg"
        },
        {
            id: 2,
            name: "Double Chocolate",
            category: "MINI",
            price: 49,
            description: "Mini Stick Waffle • Double chocolate",
            badge: "MINI",
            image: "double.jpg.png"
        },
        {
            id: 3,
            name: "Dark Chocolate",
            category: "MINI",
            price: 49,
            description: "Mini Stick Waffle • Dark chocolate",
            badge: "MINI",
            image: "dark.jpg.png"
        },
        {
            id: 4,
            name: "Brown Chocolate",
            category: "MINI",
            price: 49,
            description: "Mini Stick Waffle • Brown chocolate",
            badge: "MINI",
            image: "brown.jpg.png"
        },
        {
            id: 5,
            name: "Rainbow Truffle",
            category: "MINI",
            price: 59,
            description: "Mini Stick Waffle • Rainbow truffle",
            badge: "MINI",
            image: "rainbow.jpg.png"
        },
        {
            id: 6,
            name: "White Chocolate",
            category: "MINI",
            price: 69,
            description: "Mini Stick Waffle • White chocolate",
            badge: "MINI",
            image: "white.jpg.png"
        },
        {
            id: 7,
            name: "Crunchy KitKat",
            category: "MINI",
            price: 99,
            description: "Mini Stick Waffle • Crunchy KitKat",
            badge: "POPULAR",
            image: "kitkat.jpg.png"
        },
        {
            id: 8,
            name: "Nutella Truffle",
            category: "MINI",
            price: 119,
            description: "Mini Stick Waffle • Nutella truffle",
            badge: "HOT",
            image: "nuttela.jpg.png"
        },
        {
            id: 9,
            name: "Dark Chocolate Fantasy",
            category: "Stick",
            price: 129,
            description: "Stick Waffle • Dark chocolate fantasy",
            badge: "STICK",
            image: "darkStick.jpg.jpeg"
        },
        {
            id: 10,
            name: "Milk Chocolate Fantasy",
            category: "Stick",
            price: 129,
            description: "Stick Waffle • Milk chocolate fantasy",
            badge: "STICK",
            image: "milkStick.jpg"
        },
        {
            id: 11,
            name: "Dark Milk Delight",
            category: "Stick",
            price: 129,
            description: "Stick Waffle • Dark milk delight",
            badge: "STICK",
            image: "darkmilk.jpg"
        },
        {
            id: 12,
            name: "White Milk Delight",
            category: "Stick",
            price: 149,
            description: "Stick Waffle • White milk delight",
            badge: "STICK",
            image: "whiltemilk.jpg"
        },
        {
            id: 13,
            name: "Belgium Triple Chocolate",
            category: "Stick",
            price: 159,
            description: "Stick Waffle • Belgium Triple chocolate",
            badge: "BEST SELLER",
            image: "belgiumtriple.jpg"
        },
        {
            id: 14,
            name: "Rainbow Truffle",
            category: "Stick",
            price: 159,
            description: "Stick Waffle • Rainbow truffle",
            badge: "STICK",
            image: "rainbowStick.jpg"
        },
        {
            id: 15,
            name: "Crackle Oreo",
            category: "Stick",
            price: 179,
            description: "Stick Waffle • Crackle Oreo",
            badge: "POPULAR",
            image: "crackleoreo.jpg"
        },
        {
            id: 16,
            name: "Crunchy KitKat",
            category: "Stick",
            price: 179,
            description: "Stick Waffle • Crunchy KitKat",
            badge: "POPULAR",
            image: "crunchykitkat.jpg"
        },
        {
            id: 17,
            name: "Nutella Truffle",
            category: "Stick",
            price: 199,
            description: "Stick Waffle • Nutella truffle",
            badge: "HOT",
            image: "nutellaStick.jpg"
        },
        {
            id: 18,
            name: "KitKat Nutella Truffle",
            category: "Stick",
            price: 229,
            description: "Stick Waffle • KitKat Nutella truffle",
            badge: "PREMIUM",
            image: "nutellakitkatStick.jpg"
        },
        {
            id: 19,
            name: "Milk Chocolate Fantasy",
            category: "Bubble",
            price: 99,
            description: "Bubble Bites • Milk chocolate fantasy",
            badge: "BUBBLE",
            image: "milkbubble.jpg"
        },
        {
            id: 20,
            name: "Belgian Triple Chocolate",
            category: "Bubble",
            price: 129,
            description: "Bubble Bites • Belgian triple chocolate",
            badge: "BUBBLE",
            image: "triplebubble.jpg"
        },
        {
            id: 21,
            name: "Crunchy Oreo",
            category: "Bubble",
            price: 149,
            description: "Bubble Bites • Crunchy Oreo",
            badge: "POPULAR",
            image: "oreobubble.jpg"
        },
        {
            id: 22,
            name: "KitKat Break",
            category: "Bubble",
            price: 149,
            description: "Bubble Bites • KitKat break",
            badge: "BUBBLE",
            image: "kitkatbubble.jpg"
        },
        {
            id: 23,
            name: "Nutella Truffle",
            category: "Bubble",
            price: 169,
            description: "Bubble Bites • Nutella truffle",
            badge: "HOT",
            image: "nutellabubble.jpg"
        },
        {
            id: 24,
            name: "KitKat Nutella",
            category: "Bubble",
            price: 199,
            description: "Bubble Bites • KitKat Nutella",
            badge: "PREMIUM",
            image: "KitKatNutellabubble.jpg"
        },
        {
            id: 25,
            name: "Dark Chocolate Fantasy",
            category: "Belgian",
            price: 99,
            description: "Belgian Waffle • Dark chocolate fantasy",
            badge: "BELGIAN",
            image: "belgiandark.jpg"
        },
        {
            id: 26,
            name: "Milk Chocolate Fantasy",
            category: "Belgian",
            price: 99,
            description: "Belgian Waffle • Milk chocolate fantasy",
            badge: "BELGIAN",
            image: "milkbelgium.png"
        },
        {
            id: 27,
            name: "Belgium Triple Chocolate",
            category: "Belgian",
            price: 129,
            description: "Belgian Waffle • Belgium Triple chocolate",
            badge: "BEST SELLER",
            image: "belgiumtriple1.jpg"
        },
        {
            id: 28,
            name: "Rainbow Truffle",
            category: "Belgian",
            price: 129,
            description: "Belgian Waffle • Rainbow truffle",
            badge: "BELGIAN",
            image: "belgiumrainbow.jpg"
        },
        {
            id: 29,
            name: "Crackle Oreo",
            category: "Belgian",
            price: 149,
            description: "Belgian Waffle • Crackle Oreo",
            badge: "POPULAR",
            image: "belgiumoreo.jpg"
        },
        {
            id: 30,
            name: "Crunchy KitKat",
            category: "Belgian",
            price: 149,
            description: "Belgian Waffle • Crunchy KitKat",
            badge: "POPULAR",
            image: "belgiumkitkat.jpg"
        },
        {
            id: 31,
            name: "Nutella Truffle",
            category: "Belgian",
            price: 169,
            description: "Belgian Waffle • Nutella truffle",
            badge: "HOT",
            image: "belgiumnutella.jpg"
        },
        {
            id: 32,
            name: "KitKat Nutella Truffle",
            category: "Belgian",
            price: 229,
            description: "Belgian Waffle • KitKat Nutella truffle",
            badge: "PREMIUM",
            image: "belgiumnutellakitkat.jpg"
        }
    ];

    let cart = [];
    let selectedCategory = "all";
    let couponDiscount = 0;
    let toastTimer;

    try {
        const savedCart = localStorage.getItem("dmg-cart");

        if (savedCart) {
            cart = JSON.parse(savedCart);
        }

        if (!Array.isArray(cart)) {
            cart = [];
        }
    } catch (error) {
        cart = [];
    }

    const productsContainer = document.getElementById("products");
    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".category-btn");

    const cartButton = document.getElementById("cartButton");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCartButton = document.getElementById("closeCart");

    const cartItemsContainer = document.getElementById("cartItems");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartBottom = document.getElementById("cartBottom");
    const cartCount = document.getElementById("cartCount");
    const viewCartBar = document.getElementById("viewCartBar");
    const viewCartCount = document.getElementById("viewCartCount");
    const viewCartTotal = document.getElementById("viewCartTotal");

    const couponInput = document.getElementById("couponInput");
    const checkoutButton = document.getElementById("checkoutButton");

    const checkoutModal = document.getElementById("checkoutModal");
    const closeCheckout = document.getElementById("closeCheckout");
    const checkoutForm = document.getElementById("checkoutForm");

    const successModal = document.getElementById("successModal");
    const orderNumberElement = document.getElementById("orderNumber");
    const myOrdersButton = document.getElementById("myOrdersButton");
    const myOrdersModal = document.getElementById("myOrdersModal");
    const closeMyOrders = document.getElementById("closeMyOrders");
    const myOrdersList = document.getElementById("myOrdersList");
    const contactForm = document.getElementById("contactForm");

    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
/* =====================================
   MY ORDERS - LOCAL BROWSER HISTORY
===================================== */

function getSavedOrders() {
    try {
        const orders = JSON.parse(
            localStorage.getItem("dmg-orders") || "[]"
        );

        return Array.isArray(orders) ? orders : [];
    } catch (error) {
        console.error("Unable to read order history:", error);
        return [];
    }
}

function saveOrderToHistory(orderData, orderNumber) {
    const orders = getSavedOrders();

    const savedOrder = {
        ...orderData,
        orderNumber: orderNumber,
        orderDate: new Date().toISOString()
    };

    // Keep the newest order first.
    orders.unshift(savedOrder);

    try {
        localStorage.setItem(
            "dmg-orders",
            JSON.stringify(orders)
        );
    } catch (error) {
        console.error("Unable to save order history:", error);
        showToast("Order placed, but history could not be saved.");
    }
}

function renderMyOrders() {
    if (!myOrdersList) return;

    const orders = getSavedOrders();

    if (orders.length === 0) {
        myOrdersList.innerHTML = `
            <div class="my-orders-empty">
                <i class="fa-solid fa-receipt"></i>
                <h3>No previous orders</h3>
                <p>Your completed orders will appear here.</p>
            </div>
        `;
        return;
    }

    myOrdersList.innerHTML = orders.map(function (order) {
        const items = Array.isArray(order.items)
            ? order.items
            : [];

        const itemsHTML = items.map(function (item) {
            const quantity = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;

            return `
                <div class="my-order-item">
                    <span>
                        ${escapeHTML(item.name)}
                        × ${quantity}
                    </span>
                    <strong>
                        ₹${(price * quantity).toFixed(0)}
                    </strong>
                </div>
            `;
        }).join("");

        const orderDate = order.orderDate
            ? new Date(order.orderDate).toLocaleString("en-IN")
            : "Date unavailable";

        const orderType = order.orderType === "pickup"
            ? "Pickup"
            : "Delivery";

        return `
            <article class="my-order-card">

                <div class="my-order-heading">
                    <div>
                        <span>ORDER ID</span>
                        <h3>#${escapeHTML(order.orderNumber || "N/A")}</h3>
                    </div>

                    <span class="my-order-status">
                        Placed
                    </span>
                </div>

                <p class="my-order-date">
                    ${escapeHTML(orderDate)}
                </p>

                <div class="my-order-items">
                    ${itemsHTML}
                </div>

                <div class="my-order-info">
                    <span>Order type</span>
                    <strong>${orderType}</strong>
                </div>

                <div class="my-order-info">
                    <span>Payment method</span>
                    <strong>${escapeHTML(order.paymentMethod || "N/A")}</strong>
                </div>

                <div class="my-order-info">
                    <span>Customer</span>
                    <strong>${escapeHTML(order.customerName || "N/A")}</strong>
                </div>

                <div class="my-order-info">
                    <span>Phone</span>
                    <strong>${escapeHTML(order.customerPhone || "N/A")}</strong>
                </div>

                <div class="my-order-total">
                    <span>Total paid / payable</span>
                    <strong>₹${Number(order.total || 0).toFixed(0)}</strong>
                </div>

            </article>
        `;
    }).join("");
}

if (myOrdersButton && myOrdersModal) {
    myOrdersButton.addEventListener("click", function () {
        renderMyOrders();
        myOrdersModal.classList.add("active");
    });
}

if (closeMyOrders && myOrdersModal) {
    closeMyOrders.addEventListener("click", function () {
        myOrdersModal.classList.remove("active");
    });
}

if (myOrdersModal) {
    myOrdersModal.addEventListener("click", function (event) {
        if (event.target === myOrdersModal) {
            myOrdersModal.classList.remove("active");
        }
    });
}


    function saveCart() {
        try {
            localStorage.setItem("dmg-cart", JSON.stringify(cart));
        } catch (error) {
            console.error("Unable to save cart:", error);
        }
    }

    function showToast(message) {
        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;
        toast.classList.add("active");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {
            toast.classList.remove("active");
        }, 3000);
    }

    function imageFallback(image) {
        image.style.display = "none";

        const fallback = image.nextElementSibling;

        if (fallback) {
            fallback.style.display = "flex";
        }
    }

    function renderProducts() {
        if (!productsContainer) return;

        const searchTerm = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const filteredProducts = products.filter(function (product) {
            const categoryMatch =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            const searchText = (
                product.name +
                " " +
                (product.description || "") +
                " " +
                product.category
            ).toLowerCase();

            const searchMatch = searchText.includes(searchTerm);

            return categoryMatch && searchMatch;
        });

        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-products">
                    <i class="fa-solid fa-face-frown"></i>
                    <h3>No products found</h3>
                    <p>Try another search or category.</p>
                </div>
            `;
            return;
        }

        productsContainer.innerHTML = filteredProducts.map(function (product) {
            return `
                <article class="product-card" data-category="${escapeHTML(product.category)}">

                    <div class="product-image">
                        <span class="product-tag">
                            ${escapeHTML(product.category)}
                        </span>

                        ${
                            product.image
                                ? `
                                    <img
                                        src="${escapeHTML(product.image)}"
                                        alt="${escapeHTML(product.name)}"
                                        onerror="imageFallback(this)"
                                    >
                                `
                                : ""
                        }

                        <div
                            class="product-image-fallback"
                            style="
                                display:${product.image ? "none" : "flex"};
                                width:100%;
                                height:100%;
                                align-items:center;
                                justify-content:center;
                                background:linear-gradient(135deg,#fff7d6,#ffe49a);
                                color:#111;
                                font-size:55px;
                            "
                        >
                            <i class="fa-solid fa-cookie-bite"></i>
                        </div>
                    </div>

                    <div class="product-info">

                        <h3>
                            ${escapeHTML(product.name)}
                        </h3>

                        <p>
                            ${escapeHTML(product.description || "")}
                        </p>

                        <div class="product-bottom">

                            <span class="product-price">
                                ₹${Number(product.price).toFixed(0)}
                            </span>

                            <button
    type="button"
    class="add-button"
    onclick="addToCart(${product.id})"
    title="Add to cart"
    aria-label="Add ${escapeHTML(product.name)} to cart"
>
    ${
        (() => {
            const cartItem = cart.find(
                item => item.id === product.id
            );
            const quantity = cartItem
                ? Number(cartItem.quantity)
                : 0;

            return quantity > 0
                ? `<span class="menu-quantity">${quantity}</span>`
                : "";
        })()
    }
    <i class="fa-solid fa-plus"></i>
</button>
                        </div>

                    </div>
                </article>
            `;
        }).join("");
    }

    window.imageFallback = imageFallback;

    window.addToCart = function (productId) {
        const product = products.find(function (item) {
            return item.id === Number(productId);
        });

        if (!product) return;

        const existingItem = cart.find(function (item) {
            return item.id === product.id;
        });

        if (existingItem) {
            existingItem.quantity =
                Number(existingItem.quantity) + 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                category: product.category,
                price: Number(product.price),
                quantity: 1
            });
        }

        saveCart();
renderCart();
renderProducts();

showToast(product.name + " added to cart");
    };

    function renderCart() {
        if (
            !cartItemsContainer ||
            !cartEmpty ||
            !cartBottom ||
            !cartCount
        ) {
            return;
        }

        const totalItems = cart.reduce(function (total, item) {
            return total + Number(item.quantity || 0);
        }, 0);

        cartCount.textContent = totalItems;

// Update the floating View Cart bar
if (viewCartBar && viewCartCount) {
    viewCartCount.textContent = totalItems;

    viewCartBar.style.display =
        totalItems > 0 ? "flex" : "none";
}

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "";
            cartEmpty.classList.add("active");
            cartBottom.style.display = "none";
            updateBill();
            return;
        }

        cartEmpty.classList.remove("active");
        cartBottom.style.display = "block";

        cartItemsContainer.innerHTML = cart.map(function (item) {
            const quantity = Number(item.quantity);
            const price = Number(item.price);

            return `
                <div class="cart-item">

                    <div class="cart-item-image">
                        <div class="mini-waffle"></div>
                    </div>

                    <div class="cart-item-details">

                        <h4>
                            ${escapeHTML(item.name)}
                        </h4>

                        <div class="cart-item-price">
                            ₹${price.toFixed(0)} each
                        </div>

                        <div class="quantity-controls">

                            <button
                                type="button"
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                <i class="fa-solid fa-minus"></i>
                            </button>

                            <span>${quantity}</span>

                            <button
                                type="button"
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                <i class="fa-solid fa-plus"></i>
                            </button>

                        </div>

                    </div>

                    <button
                        type="button"
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>
            `;
        }).join("");
        
const freeMiniCount = calculateSundayFreeItems();

if (freeMiniCount > 0) {
    cartItemsContainer.innerHTML += `
        <div class="cart-item sunday-free-item">
            <div class="cart-item-image">
                <div class="mini-waffle"></div>
            </div>

            <div class="cart-item-details">
                <h4>Triple Chocolate Mini Waffle</h4>
                <div class="cart-item-price">
                    Sunday Offer — FREE
                </div>
                <div>Quantity: ${freeMiniCount}</div>
            </div>

            <span class="product-tag">FREE</span>
        </div>
    `;
}


        updateBill();
    }

    window.changeQuantity = function (productId, change) {
        const item = cart.find(function (cartItem) {
            return cartItem.id === Number(productId);
        });

        if (!item) return;

        item.quantity =
            Number(item.quantity) + Number(change);

        if (item.quantity <= 0) {
            cart = cart.filter(function (cartItem) {
                return cartItem.id !== Number(productId);
            });
        }

        saveCart();
renderCart();
renderProducts();
    };

    window.removeFromCart = function (productId) {
        cart = cart.filter(function (item) {
            return item.id !== Number(productId);
        });

        saveCart();
renderCart();
renderProducts();

showToast("Item removed from cart");
    };

    function calculateSubtotal() {
        return cart.reduce(function (total, item) {
            return total +
                Number(item.price) *
                Number(item.quantity);
        }, 0);
    }

    function calculateDelivery(subtotal) {
        if (subtotal <= 0) return 0;

        return subtotal >= 499 ? 0 : 20;
    }

    function calculateDiscount(subtotal) {
        if (couponDiscount === 30) {
            return subtotal * 0.30;
        }

        if (couponDiscount === 20) {
            return subtotal * 0.20;
        }

        if (couponDiscount === 10) {
            return subtotal * 0.10;
        }

        return 0;
    }

    function isSunday() {
        return new Date().getDay() === 0;
    }

    function getWaffleItemsCount() {
        return cart.reduce(function (total, item) {
            return total + Number(item.quantity || 0);
        }, 0);
    }

    


function calculateSundayFreeItems() {
    if (!isSunday()) return 0;

    // Count purchased Mini Waffles
    const miniCount = cart.reduce(function (total, item) {
        if (item.category === "MINI") {
            return total + Number(item.quantity || 0);
        }
        return total;
    }, 0);

    // Count purchased Stick, Belgian, and Bubble Waffles
    const eligibleCategories = ["Stick", "Belgian", "Bubble"];

    const otherWaffleCount = cart.reduce(function (total, item) {
        if (eligibleCategories.includes(item.category)) {
            return total + Number(item.quantity || 0);
        }
        return total;
    }, 0);

    // Buy 3 Mini Waffles, get 1 Mini Waffle free
    const freeFromMini = Math.floor(miniCount / 2);

    // Buy 2 Stick, Belgian, or Bubble Waffles, get 1 Mini Waffle free
    const freeFromOther = Math.floor(otherWaffleCount / 2);

    
    // Combine both Sunday offers
    return freeFromMini + freeFromOther;
}

function calculateSundayDiscount() {
    // Free Mini Waffles are separate ₹0 items.
    // Never discount purchased waffles.
    return 0;
}

function updateBill() {

        const subtotal = calculateSubtotal();
        const delivery = calculateDelivery(subtotal);
        const regularDiscount = calculateDiscount(subtotal);
        const sundayDiscount = calculateSundayDiscount();

        const total = Math.max(
            0,
            subtotal +
            delivery -
            regularDiscount -
            sundayDiscount
        );

        const subtotalElement =
            document.getElementById("subtotal");

        const deliveryElement =
            document.getElementById("delivery");

        const totalElement =
            document.getElementById("total");

        if (subtotalElement) {
            subtotalElement.textContent =
                `₹${subtotal.toFixed(0)}`;
        }

        if (deliveryElement) {
            deliveryElement.textContent =
                delivery === 0 && subtotal > 0
                    ? "FREE"
                    : `₹${delivery.toFixed(0)}`;
        }

       if (totalElement) {
    totalElement.textContent =
        `₹${total.toFixed(0)}`;
}

// Keep the floating View Cart price updated
if (viewCartTotal) {
    viewCartTotal.textContent =
        `₹${total.toFixed(0)}`;
}
    }

   window.activateSundayOffer = function () {
    if (!isSunday()) {
        showToast("The Buy 2 Get 1 FREE offer is available every Sunday!");
        return;
    }

    const freeItems = calculateSundayFreeItems();

    if (freeItems === 0) {
        showToast(
            "Buy 2 waffles from the same eligible category to get a FREE Mini Waffle!"
        );
        openCart();
        return;
    }

    renderCart();

    showToast(
        freeItems + " FREE Mini Waffle" +
        (freeItems > 1 ? "s" : "") +
        " added to your Sunday offer!"
    );

    openCart();
};

    window.applyCoupon = function () {
        if (!couponInput) return;

        const code = couponInput.value
            .trim()
            .toUpperCase();

        if (code === "DMG3000") {
            couponDiscount = 30;
            showToast("30% coupon applied");
        } else if (code === "DMG2000") {
            couponDiscount = 20;
            showToast("20% coupon applied");
        } else if (code === "DMG1000") {
            couponDiscount = 10;
            showToast("10% coupon applied");
        } else {
            couponDiscount = 0;
            showToast("Invalid coupon code");
        }

        updateBill();
    };

    function openCart() {
        if (!cartSidebar || !cartOverlay) return;

        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    window.openCart = openCart;

    window.closeCart = function () {
        if (cartSidebar) {
            cartSidebar.classList.remove("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }

        document.body.style.overflow = "";
    };

   if (cartButton) {
    cartButton.addEventListener("click", openCart);
}

// Open cart when the floating View Cart bar is clicked
if (viewCartBar) {
    viewCartBar.addEventListener("click", openCart);
}

    if (closeCartButton) {
        closeCartButton.addEventListener(
            "click",
            window.closeCart
        );
    }

    if (cartOverlay) {
        cartOverlay.addEventListener(
            "click",
            window.closeCart
        );
    }

    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            categoryButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            selectedCategory =
                button.dataset.category || "all";

            renderProducts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            renderProducts
        );
    }

    if (checkoutButton) {
        checkoutButton.addEventListener(
            "click",
            function () {

                if (cart.length === 0) {
                    showToast("Your cart is empty");
                    return;
                }

                if (checkoutModal) {
                    checkoutModal.classList.add("active");
                }
            }
        );
    }

    if (closeCheckout) {
        closeCheckout.addEventListener(
            "click",
            function () {

                if (checkoutModal) {
                    checkoutModal.classList.remove("active");
                }
            }
        );
    }

    if (checkoutModal) {
        checkoutModal.addEventListener(
            "click",
            function (event) {

                if (event.target === checkoutModal) {
                    checkoutModal.classList.remove("active");
                }
            }
        );
    }

    async function sendOrderToBackend(orderData) {
        let response;
        const endpointsToTry = [
            `${API_URL}/orders`,
            API_URL.endsWith("/api") ? API_URL.replace(/\/api$/, "/orders") : "/orders"
        ];
        const uniqueEndpoints = [...new Set(endpointsToTry)];
        let lastError = null;

        for (const endpoint of uniqueEndpoints) {
            try {
                response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(orderData)
                });

                if (response.status === 404 && endpoint !== uniqueEndpoints[uniqueEndpoints.length - 1]) {
                    continue;
                }
                break;
            } catch (err) {
                lastError = err;
                if (endpoint !== uniqueEndpoints[uniqueEndpoints.length - 1]) {
                    continue;
                }
            }
        }

        if (!response) {
            console.error("Backend connection error:", lastError);
            throw new Error(
                "Cannot connect to DMG Waffles server. Please verify your connection or make sure the backend is running."
            );
        }

        const responseText = await response.text();
        let data = null;

        if (responseText) {
            try {
                data = JSON.parse(responseText);
            } catch (error) {
                if (!response.ok) {
                    throw new Error(
                        `Server returned HTTP ${response.status}. Please try again.`
                    );
                }
                throw new Error(
                    `Server returned an invalid response. HTTP ${response.status}`
                );
            }
        }

        if (!response.ok) {
            throw new Error(
                data && (data.message || data.error)
                    ? (data.message || data.error)
                    : `Server error: HTTP ${response.status}`
            );
        }

        if (!data) {
            throw new Error(
                "Server returned an empty response."
            );
        }

        if (data.success !== true) {
            throw new Error(
                data.message ||
                "Order could not be saved."
            );
        }

        return data;
    }

    if (checkoutForm) {
        checkoutForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                if (cart.length === 0) {
                    showToast("Your cart is empty");
                    return;
                }

                const customerNameElement =
                    document.getElementById("customerName");

                const customerPhoneElement =
                    document.getElementById("customerPhone");

                const customerAddressElement =
                    document.getElementById("customerAddress");

                const customerName =
                    customerNameElement
                        ? customerNameElement.value.trim()
                        : "";

                const customerPhone =
                    customerPhoneElement
                        ? customerPhoneElement.value.trim()
                        : "";

                const customerAddress =
                    customerAddressElement
                        ? customerAddressElement.value.trim()
                        : "";

                const selectedOrderType =
                    document.querySelector(
                        'input[name="orderType"]:checked'
                    );

                const selectedPayment =
                    document.querySelector(
                        'input[name="payment"]:checked'
                    );

                const orderType =
                    selectedOrderType
                        ? selectedOrderType.value
                        : "delivery";

                const paymentMethod =
                    selectedPayment
                        ? selectedPayment.value
                        : "cod";

                if (!customerName) {
                    showToast("Please enter your name");
                    return;
                }

                if (!customerPhone) {
                    showToast("Please enter your phone number");
                    return;
                }

               
const allowedLocations = [
    "Atal Gate, Parul University",
    "Pit Gate, Parul University",
    "Main Gate, Parul University",
    "Abraham Lincoln, Parul University"
];

if (
    orderType === "delivery" &&
    !allowedLocations.includes(customerAddress)
) {
    showToast(
        "Please select one of the four Parul University locations."
    );
    return;
}


                const subtotal =
                    calculateSubtotal();

                const delivery =
                    orderType === "pickup"
                        ? 0
                        : calculateDelivery(subtotal);

                const regularDiscount =
                    calculateDiscount(subtotal);

                const sundayDiscount =
                    calculateSundayDiscount();

                const total = Math.max(
                    0,
                    subtotal +
                    delivery -
                    regularDiscount -
                    sundayDiscount
                );

                const generatedOrderNumber =
                    "DMG" +
                    Date.now()
                        .toString()
                        .slice(-6);

                const orderData = {
                    orderNumber: generatedOrderNumber,
                    customerName: customerName,
                    customerPhone: customerPhone,
                    customerAddress: customerAddress,
                    orderType: orderType,
                    paymentMethod: paymentMethod,

                    
items: cart.map(function (item) {
    const price = Number(item.price);
    const quantity = Number(item.quantity);

    return {
        id: item.id,
        name: item.name,
        category: item.category,
        price: price,
        quantity: quantity,
        itemTotal: price * quantity
    };
}).concat(
    calculateSundayFreeItems() > 0
        ? [{
            id: 1,
            name: "FREE Triple Chocolate Mini Waffle",
            category: "MINI",
            price: 0,
            quantity: calculateSundayFreeItems(),
            itemTotal: 0
        }]
        : []
),


                    subtotal:
                        Number(subtotal.toFixed(2)),

                    deliveryCharge:
                        Number(delivery.toFixed(2)),

                    couponDiscount:
                        Number(
                            regularDiscount.toFixed(2)
                        ),

                    sundayDiscount:
                        Number(
                            sundayDiscount.toFixed(2)
                        ),

                    total:
                        Number(total.toFixed(2))
                };

                const originalButtonHTML =
                    checkoutButton
                        ? checkoutButton.innerHTML
                        : "";

                try {

                    if (checkoutButton) {
                        checkoutButton.disabled = true;

                        checkoutButton.innerHTML = `
                            <span>Processing...</span>
                            <i class="fa-solid fa-spinner fa-spin"></i>
                        `;
                    }

                    const data =
                        await sendOrderToBackend(
                            orderData
                        );

                    const savedOrderNumber =
    data.orderNumber ||
    generatedOrderNumber;

if (orderNumberElement) {
    orderNumberElement.textContent =
        "#" + savedOrderNumber;
}

// SAVE THE SUCCESSFUL ORDER TO MY ORDERS
saveOrderToHistory(orderData, savedOrderNumber);

cart = [];
                    couponDiscount = 0;

                    saveCart();
                    renderCart();

                    checkoutForm.reset();

                    if (checkoutModal) {
                        checkoutModal.classList.remove(
                            "active"
                        );
                    }

                    window.closeCart();

                    if (successModal) {
                        successModal.classList.add(
                            "active"
                        );
                    }

                    showToast(
                        "Order placed successfully!"
                    );

                } catch (error) {

                    console.error(
                        "Order submission error:",
                        error
                    );

                    showToast(
                        error.message ||
                        "Unable to save your order."
                    );

                } finally {

                    if (checkoutButton) {
                        checkoutButton.disabled = false;

                        checkoutButton.innerHTML =
                            originalButtonHTML ||
                            `
                                <span>
                                    Proceed to Checkout
                                </span>
                                <i class="fa-solid fa-arrow-right"></i>
                            `;
                    }
                }
            }
        );
    }

    window.closeSuccessModal = function () {
        if (successModal) {
            successModal.classList.remove("active");
        }
    };

    if (successModal) {
        successModal.addEventListener(
            "click",
            function (event) {

                if (event.target === successModal) {
                    successModal.classList.remove(
                        "active"
                    );
                }
            }
        );
    }

    /*
       CONTACT FORM
       Do NOT use preventDefault here.
       Your Formspree HTML action will handle submission.
    */

    if (contactForm) {
        contactForm.addEventListener(
            "submit",
            function () {

                const button =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                if (button) {
                    button.disabled = true;

                    button.innerHTML = `
                        <i class="fa-solid fa-spinner fa-spin"></i>
                        Sending...
                    `;
                }
            }
        );
    }

    if (themeToggle) {

        const savedTheme =
            localStorage.getItem("dmg-theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
        }

        themeToggle.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "dark-mode"
                );

                const isDark =
                    document.body.classList.contains(
                        "dark-mode"
                    );

                localStorage.setItem(
                    "dmg-theme",
                    isDark ? "dark" : "light"
                );

                const icon =
                    themeToggle.querySelector("i");

                if (icon) {
                    icon.className =
                        isDark
                            ? "fa-solid fa-sun"
                            : "fa-solid fa-moon";
                }
            }
        );
    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            function (event) {
                event.stopPropagation();
                navLinks.classList.toggle(
                    "active"
                );
            }
        );

        navLinks
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.classList.remove(
                            "active"
                        );
                    }
                );
            });

        document.addEventListener(
            "click",
            function (event) {
                if (
                    navLinks.classList.contains("active") &&
                    !navLinks.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {
                    navLinks.classList.remove("active");
                }
            }
        );

        window.addEventListener(
            "resize",
            function () {
                if (window.innerWidth > 850 && navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                }
            }
        );
    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                if (navLinks) {
                    navLinks.classList.remove("active");
                }

                if (myOrdersModal) {
    myOrdersModal.classList.remove("active");
}

                window.closeCart();

                if (checkoutModal) {
                    checkoutModal.classList.remove(
                        "active"
                    );
                }

                if (successModal) {
                    successModal.classList.remove(
                        "active"
                    );
                }
            }
        }
    );

    function checkBackendConnection() {

        fetch(
            `${API_URL}/health`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }
        )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if (data && data.success === true) {
                console.log(
                    "DMG Waffles backend connected successfully."
                );
            } else {
                console.warn(
                    "DMG Waffles backend health check failed."
                );
            }

        })
        .catch(function (error) {

            console.warn(
                "Backend is not connected. Frontend cart will still work.",
                error.message
            );
        });
    }

    renderProducts();
    renderCart();
    checkBackendConnection();
});