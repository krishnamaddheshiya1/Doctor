const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const isVercel = Boolean(process.env.VERCEL);
const DATA_DIR = isVercel ? path.join(require("os").tmpdir(), "dmg-waffles-data") : path.join(__dirname, "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

try {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(ORDERS_FILE)) {
        let initialData = "[]";
        const seedFile = path.join(__dirname, "data", "orders.json");
        if (fs.existsSync(seedFile)) {
            const bundled = fs.readFileSync(seedFile, "utf8").trim();
            if (bundled) initialData = bundled;
        }
        fs.writeFileSync(ORDERS_FILE, initialData, "utf8");
    }
} catch (storageInitError) {
    console.warn("Storage initialization warning:", storageInitError.message);
}

app.use(
    cors({
        origin: true,
        credentials: true
    })
);

// Normalize URL for Vercel serverless function rewrites & proxies
app.use(function (req, res, next) {
    if (req.url && req.url.startsWith("/api/index.js")) {
        req.url = req.url.replace(/^\/api\/index\.js/, "") || "/";
    }
    next();
});

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// Resilient body parsing: handle string or Buffer payloads when pre-handled by serverless wrappers
app.use(function (req, res, next) {
    if (typeof req.body === "string" && req.body.trim()) {
        try {
            req.body = JSON.parse(req.body);
        } catch (_) {}
    } else if (Buffer.isBuffer(req.body)) {
        try {
            req.body = JSON.parse(req.body.toString("utf8"));
        } catch (_) {}
    }
    next();
});

const staticDirs = [
    path.join(__dirname, "public"),
    path.join(__dirname, "manga"),
    path.join(__dirname),
    path.join(__dirname, "..", "public"),
    path.join(__dirname, "..", "manga"),
    path.join(__dirname, "..")
];
for (const dir of staticDirs) {
    if (fs.existsSync(dir)) {
        app.use(express.static(dir));
    }
}

function getIndexHtmlPath() {
    const locations = [
        path.join(__dirname, "index.html"),
        path.join(__dirname, "public", "index.html"),
        path.join(__dirname, "..", "public", "index.html"),
        path.join(__dirname, "..", "index.html"),
        path.join(process.cwd(), "public", "index.html"),
        path.join(process.cwd(), "index.html")
    ];
    for (const loc of locations) {
        if (fs.existsSync(loc)) return loc;
    }
    return locations[0];
}

function getMangaAdminHtmlPath() {
    const locations = [
        path.join(__dirname, "manga", "index.html"),
        path.join(__dirname, "public", "manga", "index.html"),
        path.join(__dirname, "admin.html"),
        path.join(__dirname, "..", "manga", "index.html"),
        path.join(__dirname, "..", "public", "manga", "index.html"),
        path.join(__dirname, "..", "admin.html"),
        path.join(process.cwd(), "public", "manga", "index.html"),
        path.join(process.cwd(), "manga", "index.html")
    ];
    for (const loc of locations) {
        if (fs.existsSync(loc)) return loc;
    }
    return locations[0];
}

function getAdminJsPath() {
    const locations = [
        path.join(__dirname, "manga", "admin.js"),
        path.join(__dirname, "admin.js"),
        path.join(__dirname, "public", "manga", "admin.js"),
        path.join(__dirname, "..", "manga", "admin.js"),
        path.join(__dirname, "..", "admin.js"),
        path.join(__dirname, "..", "public", "manga", "admin.js")
    ];
    for (const loc of locations) {
        if (fs.existsSync(loc)) return loc;
    }
    return locations[0];
}

let adminHtmlContent = "";
let adminJsContent = "";
let indexHtmlContent = "";
let styleCssContent = "";
let scriptJsContent = "";

try { adminHtmlContent = require("./adminHtml"); } catch (_) {}
try { adminJsContent = require("./adminJs"); } catch (_) {}
try { indexHtmlContent = require("./indexHtml"); } catch (_) {}
try { styleCssContent = require("./styleCss"); } catch (_) {}
try { scriptJsContent = require("./scriptJs"); } catch (_) {}

// Serve main customer website
app.get("/", function (req, res) {
    const indexPath = getIndexHtmlPath();
    if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
    }
    if (indexHtmlContent) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.send(indexHtmlContent);
    }
    res.status(200).send("<h1>DMG Waffles</h1>");
});

// Serve admin dashboard at /manga, /api/manga, /admin, /api/admin, /admin.html
const adminDashboardRoutes = [
    "/manga",
    "/manga/",
    "/manga/index.html",
    "/api/manga",
    "/api/manga/",
    "/api/manga/index.html",
    "/admin",
    "/admin/",
    "/admin.html",
    "/admin/index.html",
    "/api/admin",
    "/api/admin/",
    "/api/admin.html",
    "/api/admin/index.html",
    "/manga.html",
    "/api/manga.html"
];

app.get(adminDashboardRoutes, function (req, res) {
    const mangaPath = getMangaAdminHtmlPath();
    if (fs.existsSync(mangaPath)) {
        return res.sendFile(mangaPath);
    }
    if (adminHtmlContent) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.send(adminHtmlContent);
    }
    res.status(200).send("<h1>Owner Dashboard</h1>");
});

// Serve admin javascript for /manga, /admin, /api/manga, /api/admin
const adminScriptRoutes = [
    "/manga/admin.js",
    "/admin.js",
    "/api/manga/admin.js",
    "/api/admin.js",
    "/admin/admin.js",
    "/api/admin/admin.js"
];

app.get(adminScriptRoutes, function (req, res) {
    const jsPath = getAdminJsPath();
    if (fs.existsSync(jsPath)) {
        res.setHeader("Content-Type", "application/javascript; charset=utf-8");
        return res.sendFile(jsPath);
    }
    if (adminJsContent) {
        res.setHeader("Content-Type", "application/javascript; charset=utf-8");
        return res.send(adminJsContent);
    }
    res.status(404).end();
});

// Serve style.css fallback
app.get("/style.css", function (req, res, next) {
    const p = path.join(__dirname, "style.css");
    if (fs.existsSync(p)) return res.sendFile(p);
    if (styleCssContent) {
        res.setHeader("Content-Type", "text/css; charset=utf-8");
        return res.send(styleCssContent);
    }
    next();
});

// Serve script.js fallback
app.get("/script.js", function (req, res, next) {
    const p = path.join(__dirname, "script.js");
    if (fs.existsSync(p)) return res.sendFile(p);
    if (scriptJsContent) {
        res.setHeader("Content-Type", "application/javascript; charset=utf-8");
        return res.send(scriptJsContent);
    }
    next();
});

// Reliable in-memory storage fallback
let inMemoryOrders = [];

function loadInitialSeed() {
    const seedCandidates = [
        path.join(__dirname, "data", "orders.json"),
        path.join(__dirname, "..", "data", "orders.json"),
        path.join(process.cwd(), "backend", "data", "orders.json"),
        path.join(process.cwd(), "data", "orders.json")
    ];
    for (const seedPath of seedCandidates) {
        try {
            if (fs.existsSync(seedPath)) {
                const data = fs.readFileSync(seedPath, "utf8").trim();
                if (data) {
                    const parsed = JSON.parse(data);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        return parsed;
                    }
                }
            }
        } catch (_) {}
    }
    return [];
}

inMemoryOrders = loadInitialSeed();

function readOrders() {
    try {
        if (fs.existsSync(ORDERS_FILE)) {
            const data = fs.readFileSync(ORDERS_FILE, "utf8");
            if (data && data.trim()) {
                const parsed = JSON.parse(data);
                if (Array.isArray(parsed)) {
                    inMemoryOrders = parsed;
                    return parsed;
                }
            }
        }
    } catch (error) {
        console.warn("Storage read warning (fallback to in-memory store):", error.message);
    }
    return inMemoryOrders;
}

function writeOrders(orders) {
    inMemoryOrders = Array.isArray(orders) ? orders : [];
    try {
        const dir = path.dirname(ORDERS_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(
            ORDERS_FILE,
            JSON.stringify(inMemoryOrders, null, 2),
            "utf8"
        );
    } catch (writeError) {
        console.warn("Storage write warning (saved to in-memory store):", writeError.message);
    }
}

function generateOrderNumber() {
    return "DMG" + Date.now().toString().slice(-8);
}

function formatOrderForDashboard(order) {
    if (!order || typeof order !== "object") {
        return {};
    }
    return {
        ...order,
        order_number: order.orderNumber || "",
        customer_name: order.customerName || "",
        customer_phone: order.customerPhone || "",
        customer_address: order.customerAddress || "",
        address: order.customerAddress || "",
        delivery_address: order.customerAddress || "",
        order_type: order.orderType || "",
        payment_method: order.paymentMethod || "",
        created_at: order.createdAt || "",
        updated_at: order.updatedAt || "",
        delivery_charge: Number(order.deliveryCharge) || 0,
        coupon_discount: Number(order.couponDiscount) || 0,
        sunday_discount: Number(order.sundayDiscount) || 0
    };
}

// API health & info routes (support both /api and root paths)
app.get(["/api", "/api/"], function (req, res) {
    res.json({
        success: true,
        message: "DMG Waffles backend is running",
        server: `http://localhost:${PORT}`,
        api: `http://localhost:${PORT}/api`
    });
});

app.get(["/api/health", "/health"], function (req, res) {
    res.json({
        success: true,
        message: "API is healthy"
    });
});

app.get(["/api/dashboard", "/dashboard"], function (req, res) {
    try {
        const orders = readOrders();
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(function (order) {
            return order && order.status === "Pending";
        }).length;
        const completedOrders = orders.filter(function (order) {
            return order && order.status === "Completed";
        }).length;
        const cancelledOrders = orders.filter(function (order) {
            return order && order.status === "Cancelled";
        }).length;
        const totalRevenue = orders
            .filter(function (order) {
                return order && order.status !== "Cancelled";
            })
            .reduce(function (total, order) {
                return total + (Number(order.total) || 0);
            }, 0);

        res.json({
            success: true,
            dashboard: {
                totalOrders,
                pendingOrders,
                completedOrders,
                cancelledOrders,
                totalRevenue
            }
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to load dashboard data",
            error: error.message
        });
    }
});

// GET all orders
app.get(["/api/orders", "/orders"], function (req, res) {
    try {
        const orders = readOrders();

        orders.sort(function (a, b) {
            return (
                new Date((b && (b.createdAt || b.created_at)) || 0) -
                new Date((a && (a.createdAt || a.created_at)) || 0)
            );
        });

        const dashboardOrders = orders.map(function (order) {
            return formatOrderForDashboard(order);
        });

        res.json({
            success: true,
            orders: dashboardOrders
        });
    } catch (error) {
        console.error("Get orders error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to load orders",
            error: error.message
        });
    }
});

// GET single order by order number
app.get(["/api/orders/:orderNumber", "/orders/:orderNumber"], function (req, res) {
    try {
        const orders = readOrders();
        const orderNumber = String(req.params.orderNumber || "").trim().toLowerCase();

        const order = orders.find(function (item) {
            return item && String(item.orderNumber).toLowerCase() === orderNumber;
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            order: formatOrderForDashboard(order)
        });
    } catch (error) {
        console.error("Get order error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to load order",
            error: error.message
        });
    }
});

// POST create order (supports both /api/orders and /orders)
app.post(["/api/orders", "/orders"], function (req, res) {
    try {
        let body = req.body;
        if (typeof body === "string") {
            try { body = JSON.parse(body); } catch (_) { body = {}; }
        }
        if (!body || typeof body !== "object") {
            body = {};
        }

        const customerName = String(body.customerName || "").trim();
        const customerPhone = String(body.customerPhone || "").trim();
        const customerAddress = String(body.customerAddress || "").trim();
        const orderType = String(body.orderType || "delivery").trim();
        const paymentMethod = String(body.paymentMethod || "cod").trim();

        if (!customerName) {
            return res.status(400).json({
                success: false,
                message: "Customer name is required"
            });
        }

        if (!customerPhone) {
            return res.status(400).json({
                success: false,
                message: "Customer phone is required"
            });
        }

        if (orderType.toLowerCase() === "delivery" && !customerAddress) {
            return res.status(400).json({
                success: false,
                message: "Delivery address is required"
            });
        }

        if (!Array.isArray(body.items) || body.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain at least one item"
            });
        }

        const orders = readOrders();

        let orderNumber = String(body.orderNumber || "").trim();
        if (!orderNumber) {
            orderNumber = generateOrderNumber();
        }

        const existingOrder = orders.find(function (order) {
            return order && String(order.orderNumber).toUpperCase() === String(orderNumber).toUpperCase();
        });

        if (existingOrder) {
            orderNumber = generateOrderNumber();
        }

        const safeItems = body.items.map(function (item) {
            if (!item || typeof item !== "object") {
                return {
                    id: null,
                    name: "Waffle Item",
                    category: "",
                    price: 0,
                    quantity: 1,
                    itemTotal: 0
                };
            }
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;
            const itemTotal = Number(item.itemTotal) || (price * quantity);
            return {
                id: item.id ?? null,
                name: String(item.name || ""),
                category: String(item.category || ""),
                price: price,
                quantity: quantity,
                itemTotal: itemTotal
            };
        });

        const subtotal = Number(body.subtotal) || safeItems.reduce((acc, it) => acc + it.itemTotal, 0);
        const deliveryCharge = Number(body.deliveryCharge) || 0;
        const couponDiscount = Number(body.couponDiscount) || 0;
        const sundayDiscount = Number(body.sundayDiscount) || 0;
        const total = Number(body.total) || Math.max(0, subtotal + deliveryCharge - couponDiscount - sundayDiscount);

        const order = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 8),
            orderNumber: orderNumber,
            customerName: customerName,
            customerPhone: customerPhone,
            customerAddress: customerAddress,
            orderType: orderType,
            paymentMethod: paymentMethod,
            items: safeItems,
            subtotal: subtotal,
            deliveryCharge: deliveryCharge,
            couponDiscount: couponDiscount,
            sundayDiscount: sundayDiscount,
            total: total,
            status: "Pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        orders.push(order);
        writeOrders(orders);

        console.log("New order received:", order.orderNumber);

        return res.status(201).json({
            success: true,
            message: "Order saved successfully",
            orderNumber: order.orderNumber,
            order: order
        });
    } catch (error) {
        console.error("Create order error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to save order: " + (error.message || "Unknown error"),
            error: error.message
        });
    }
});

// PATCH order status
app.patch(["/api/orders/:id/status", "/orders/:id/status"], function (req, res) {
    try {
        const orders = readOrders();
        const targetId = String(req.params.id);

        const index = orders.findIndex(function (order) {
            return order && String(order.id) === targetId;
        });

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const allowedStatuses = ["Pending", "Preparing", "Ready", "Completed", "Cancelled"];
        const newStatus = String(req.body && req.body.status ? req.body.status : "").trim();

        if (!allowedStatuses.includes(newStatus)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        orders[index].status = newStatus;
        orders[index].updatedAt = new Date().toISOString();

        writeOrders(orders);

        res.json({
            success: true,
            message: "Order status updated",
            order: orders[index]
        });
    } catch (error) {
        console.error("Update status error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to update order status",
            error: error.message
        });
    }
});

// DELETE order
app.delete(["/api/orders/:id", "/orders/:id"], function (req, res) {
    try {
        const orders = readOrders();
        const targetId = String(req.params.id);

        const filteredOrders = orders.filter(function (order) {
            return order && String(order.id) !== targetId;
        });

        if (filteredOrders.length === orders.length) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        writeOrders(filteredOrders);

        res.json({
            success: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        console.error("Delete order error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to delete order",
            error: error.message
        });
    }
});

// 404 handler: only serve HTML for browser page requests, never for API or non-GET requests
app.use(function (req, res) {
    if (
        req.method === "GET" &&
        !req.path.startsWith("/api") &&
        !req.path.startsWith("/orders") &&
        !req.path.startsWith("/dashboard") &&
        !req.path.startsWith("/health")
    ) {
        const indexPath = getIndexHtmlPath();
        if (fs.existsSync(indexPath)) {
            return res.sendFile(indexPath);
        }
        if (indexHtmlContent) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            return res.send(indexHtmlContent);
        }
    }

    res.status(404).json({
        success: false,
        message: "API endpoint not found",
        path: req.originalUrl || req.url
    });
});

// 500 error handler
app.use(function (error, req, res, next) {
    console.error("Server error:", error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error && error.message ? error.message : String(error)
    });
});

if (!process.env.VERCEL) {
    app.listen(
        PORT,
        HOST,
        function () {
            console.log("");
            console.log(
                "======================================"
            );
            console.log(
                "       DMG WAFFLES BACKEND"
            );
            console.log(
                "======================================"
            );
            console.log(
                `Server: http://localhost:${PORT}`
            );
            console.log(
                `API:    http://localhost:${PORT}/api`
            );
            console.log(
                `Health: http://localhost:${PORT}/api/health`
            );
            console.log(
                `Orders: http://localhost:${PORT}/api/orders`
            );
            console.log(
                "======================================"
            );
            console.log("");
        }
    );
}

module.exports = app;