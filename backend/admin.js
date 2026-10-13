const isFileProto = window.location.protocol === "file:";
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API_URL = (isFileProto || (isLocalhost && window.location.port !== "" && window.location.port !== "5000" && window.location.protocol !== "https:"))
    ? "http://localhost:5000/api"
    : "/api";

let orders = [];

document.addEventListener("DOMContentLoaded", function () {
    loadOrders();

    setInterval(function () {
        loadOrders();
    }, 10000);

    const refreshButton = document.querySelector(".refresh-btn");

    if (refreshButton) {
        refreshButton.addEventListener("click", function () {
            loadOrders();
        });
    }
});

async function requestOrdersAPI(endpointPath, options = {}) {
    const cleanPath = endpointPath.startsWith("/") ? endpointPath : `/${endpointPath}`;
    const endpointsToTry = [
        `${API_URL}${cleanPath}`,
        cleanPath.startsWith("/orders") ? cleanPath : `/orders${cleanPath}`,
        cleanPath.startsWith("/api") ? cleanPath : `/api${cleanPath}`
    ];
    const unique = [...new Set(endpointsToTry)];
    let lastError = null;

    for (const ep of unique) {
        try {
            const res = await fetch(ep, options);
            if (res.status === 404 && ep !== unique[unique.length - 1]) {
                continue;
            }
            return res;
        } catch (err) {
            lastError = err;
            if (ep !== unique[unique.length - 1]) {
                continue;
            }
        }
    }
    throw lastError || new Error("Failed to connect to DMG Waffles server.");
}

async function loadOrders() {
    const ordersContainer = document.getElementById("orders");

    if (!ordersContainer) {
        console.error("Orders container #orders was not found.");
        return;
    }

    try {
        const response = await requestOrdersAPI("/orders", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        const text = await response.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch (error) {
            throw new Error(
                `Server returned an invalid response. HTTP ${response.status}`
            );
        }

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || `Unable to load orders. HTTP ${response.status}`
            );
        }

        orders = Array.isArray(data.orders) ? data.orders : [];

        renderOrders();
        updateDashboard();

    } catch (error) {
        console.error("Load orders error:", error);

        ordersContainer.innerHTML = `
            <div class="empty">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <h2>Server Not Connected</h2>
                <p>${escapeHTML(error.message)}</p>
                <p>Make sure the DMG Waffles backend is running.</p>
            </div>
        `;

        updateDashboard();
    }
}

function renderOrders() {
    const ordersContainer = document.getElementById("orders");

    if (!ordersContainer) return;

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty">
                <i class="fa-solid fa-receipt"></i>
                <h2>No Orders Yet</h2>
                <p>Customer orders will appear here.</p>
            </div>
        `;
        return;
    }

    ordersContainer.innerHTML = orders.map(function (order) {
        return createOrderCard(order);
    }).join("");
}

function createOrderCard(order) {
    const orderId = String(order.id || "");

    const orderNumber =
        order.orderNumber ||
        order.order_number ||
        "Unknown";

    const customerName =
        order.customerName ||
        order.customer_name ||
        "Unknown";

    const customerPhone =
        order.customerPhone ||
        order.customer_phone ||
        "Not provided";

    const customerAddress =
        order.customerAddress ||
        order.customer_address ||
        order.address ||
        "Pickup";

    const orderType =
        order.orderType ||
        order.order_type ||
        "Pickup";

    const paymentMethod =
        order.paymentMethod ||
        order.payment_method ||
        "Not provided";

    const status =
        order.status ||
        "Pending";

    const createdAt =
        order.createdAt ||
        order.created_at;

    const items =
        Array.isArray(order.items)
            ? order.items
            : [];

    const statusClass =
        status
            .toLowerCase()
            .replace(/\s+/g, "-");

    const itemsHTML = items.length
        ? items.map(function (item) {
            const name =
                item.name || "Item";

            const quantity =
                Number(item.quantity || 1);

            const price =
                Number(item.price || 0);

            const itemTotal =
                Number(
                    item.itemTotal ??
                    price * quantity
                );

            return `
                <div class="item">
                    <div>
                        <span class="item-name">
                            ${escapeHTML(name)}
                        </span>
                        <span class="item-qty">
                            × ${quantity}
                        </span>
                    </div>

                    <span class="item-price">
                        ₹${itemTotal.toFixed(0)}
                    </span>
                </div>
            `;
        }).join("")
        : `
            <p>No items found.</p>
        `;

    const total =
        Number(order.total || 0);

    return `
        <article
            class="order-card"
            data-order-id="${escapeHTML(orderId)}"
        >
            <div class="order-top">
                <div>
                    <div class="order-number">
                        #${escapeHTML(orderNumber)}
                    </div>

                    <div class="order-date">
                        ${formatDate(createdAt)}
                    </div>
                </div>

                <span class="status status-${statusClass}">
                    ${escapeHTML(status)}
                </span>
            </div>

            <div class="order-details">
                <div class="detail">
                    <span>Customer</span>
                    <strong>
                        ${escapeHTML(customerName)}
                    </strong>
                </div>

                <div class="detail">
                    <span>Phone</span>
                    <strong>
                        ${escapeHTML(customerPhone)}
                    </strong>
                </div>

                <div class="detail">
                    <span>Order Type</span>
                    <strong>
                        ${escapeHTML(orderType)}
                    </strong>
                </div>

                <div class="detail">
                    <span>Payment</span>
                    <strong>
                        ${escapeHTML(paymentMethod)}
                    </strong>
                </div>

                <div
                    class="detail"
                    style="grid-column: 1 / -1;"
                >
                    <span>Address</span>
                    <strong>
                        ${escapeHTML(customerAddress)}
                    </strong>
                </div>
            </div>

            <div class="items">
                <h3>Ordered Items</h3>
                ${itemsHTML}
            </div>

            <div class="order-total">
                <span>Total</span>
                <span>
                    ₹${total.toFixed(0)}
                </span>
            </div>

            <div class="order-actions">
                <button
                    type="button"
                    class="status-btn"
                    data-action="status"
                    data-status="Pending"
                    data-order-id="${escapeHTML(orderId)}"
                >
                    New
                </button>

                <button
                    type="button"
                    class="status-btn"
                    data-action="status"
                    data-status="Preparing"
                    data-order-id="${escapeHTML(orderId)}"
                >
                    Preparing
                </button>

                <button
                    type="button"
                    class="status-btn"
                    data-action="status"
                    data-status="Ready"
                    data-order-id="${escapeHTML(orderId)}"
                >
                    Ready
                </button>

                <button
                    type="button"
                    class="status-btn"
                    data-action="status"
                    data-status="Completed"
                    data-order-id="${escapeHTML(orderId)}"
                >
                    Completed
                </button>

                <button
                    type="button"
                    class="status-btn"
                    data-action="status"
                    data-status="Cancelled"
                    data-order-id="${escapeHTML(orderId)}"
                >
                    Cancelled
                </button>

                <button
                    type="button"
                    class="delete-btn"
                    data-action="delete"
                    data-order-id="${escapeHTML(orderId)}"
                >
                    <i class="fa-solid fa-trash"></i>
                    Delete
                </button>
            </div>
        </article>
    `;
}

document.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button) return;

    const action =
        button.dataset.action;

    const orderId =
        button.dataset.orderId;

    if (!orderId) return;

    if (action === "status") {
        updateStatus(
            orderId,
            button.dataset.status
        );
    }

    if (action === "delete") {
        deleteOrder(orderId);
    }
});

async function updateStatus(orderId, status) {
    try {
        const response = await requestOrdersAPI(
            `/orders/${encodeURIComponent(orderId)}/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    status: status
                })
            }
        );

        const text = await response.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch (error) {
            throw new Error(
                `Server returned an invalid response. HTTP ${response.status}`
            );
        }

        if (!response.ok || !data.success) {
            throw new Error(
                data.message ||
                `Unable to update order. HTTP ${response.status}`
            );
        }

        await loadOrders();

    } catch (error) {
        console.error(
            "Update status error:",
            error
        );

        alert(
            error.message ||
            "Unable to update order."
        );
    }
}

async function deleteOrder(orderId) {
    const confirmed = confirm(
        "Delete this order?"
    );

    if (!confirmed) return;

    try {
        const response = await requestOrdersAPI(
            `/orders/${encodeURIComponent(orderId)}`,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const text = await response.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch (error) {
            throw new Error(
                `Server returned an invalid response. HTTP ${response.status}`
            );
        }

        if (!response.ok || !data.success) {
            throw new Error(
                data.message ||
                `Unable to delete order. HTTP ${response.status}`
            );
        }

        await loadOrders();

    } catch (error) {
        console.error(
            "Delete order error:",
            error
        );

        alert(
            error.message ||
            "Unable to delete order."
        );
    }
}

function updateDashboard() {
    const totalOrders =
        orders.length;

    const newOrders =
        orders.filter(function (order) {
            return (
                order.status === "Pending" ||
                order.status === "New"
            );
        }).length;

    const preparingOrders =
        orders.filter(function (order) {
            return (
                order.status === "Preparing"
            );
        }).length;

    const revenue =
        orders
            .filter(function (order) {
                return (
                    order.status !==
                    "Cancelled"
                );
            })
            .reduce(function (total, order) {
                return (
                    total +
                    Number(order.total || 0)
                );
            }, 0);

    const totalElement =
        document.getElementById(
            "totalOrders"
        );

    const newElement =
        document.getElementById(
            "newOrders"
        );

    const preparingElement =
        document.getElementById(
            "preparingOrders"
        );

    const revenueElement =
        document.getElementById(
            "revenue"
        );

    if (totalElement) {
        totalElement.textContent =
            totalOrders;
    }

    if (newElement) {
        newElement.textContent =
            newOrders;
    }

    if (preparingElement) {
        preparingElement.textContent =
            preparingOrders;
    }

    if (revenueElement) {
        revenueElement.textContent =
            `₹${revenue.toFixed(0)}`;
    }
}

function formatDate(value) {
    if (!value) {
        return "Date unavailable";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "Date unavailable";
    }

    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

window.loadOrders = loadOrders;
window.updateStatus = updateStatus;
window.deleteOrder = deleteOrder;