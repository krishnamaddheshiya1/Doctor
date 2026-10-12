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

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

const PUBLIC_DIR = path.join(__dirname, "..");
app.use(express.static(PUBLIC_DIR));

app.get("/admin", function (req, res) {
    res.sendFile(path.join(PUBLIC_DIR, "admin.html"));
});

function readOrders() {
    try {
        const data = fs.readFileSync(
            ORDERS_FILE,
            "utf8"
        );

        if (!data.trim()) {
            return [];
        }

        const orders = JSON.parse(data);

        return Array.isArray(orders)
            ? orders
            : [];
    } catch (error) {
        console.error(
            "Error reading orders:",
            error
        );

        return [];
    }
}

function writeOrders(orders) {
    try {
        fs.writeFileSync(
            ORDERS_FILE,
            JSON.stringify(orders, null, 2),
            "utf8"
        );
    } catch (writeError) {
        console.error("Error writing orders:", writeError);
    }
}

function generateOrderNumber() {
    return (
        "DMG" +
        Date.now().toString().slice(-8)
    );
}
function formatOrderForDashboard(order) {
    return {
        ...order,

        order_number:
            order.orderNumber,

        customer_name:
            order.customerName,

        customer_phone:
            order.customerPhone,

        customer_address:
            order.customerAddress,

        address:
            order.customerAddress,

        delivery_address:
            order.customerAddress,

        order_type:
            order.orderType,

        payment_method:
            order.paymentMethod,

        created_at:
            order.createdAt,

        updated_at:
            order.updatedAt,

        delivery_charge:
            order.deliveryCharge,

        coupon_discount:
            order.couponDiscount,

        sunday_discount:
            order.sundayDiscount
    };
}

app.get("/api", function (req, res) {
    res.json({
        success: true,
        message: "DMG Waffles backend is running",
        server: `http://localhost:${PORT}`,
        api: `http://localhost:${PORT}/api`
    });
});

app.get("/api/health", function (req, res) {
    res.json({
        success: true,
        message: "API is healthy"
    });
});

app.get("/api/dashboard", function (req, res) {
    try {
        const orders = readOrders();

        const totalOrders = orders.length;

        const pendingOrders = orders.filter(
            function (order) {
                return order.status === "Pending";
            }
        ).length;

        const completedOrders = orders.filter(
            function (order) {
                return order.status === "Completed";
            }
        ).length;

        const cancelledOrders = orders.filter(
            function (order) {
                return order.status === "Cancelled";
            }
        ).length;

        const totalRevenue = orders
            .filter(function (order) {
                return order.status !== "Cancelled";
            })
            .reduce(function (total, order) {
                return (
                    total +
                    Number(order.total || 0)
                );
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
        console.error(
            "Dashboard error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to load dashboard data"
        });
    }
});
app.get("/api/orders", function (req, res) {
    try {
        const orders = readOrders();

        orders.sort(function (a, b) {
            return (
                new Date(
                    b.createdAt ||
                    b.created_at ||
                    0
                ) -
                new Date(
                    a.createdAt ||
                    a.created_at ||
                    0
                )
            );
        });

        const dashboardOrders =
            orders.map(function (order) {
                return formatOrderForDashboard(
                    order
                );
            });

        res.json({
            success: true,
            orders: dashboardOrders
        });
    } catch (error) {
        console.error(
            "Get orders error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to load orders"
        });
    }
});

app.get(
    "/api/orders/:orderNumber",
    function (req, res) {
        try {
            const orders = readOrders();

            const order = orders.find(
                function (item) {
                    return (
                        String(
                            item.orderNumber
                        ).toLowerCase() ===
                        String(
                            req.params.orderNumber
                        ).toLowerCase()
                    );
                }
            );

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }

            res.json({
                success: true,
                order
            });
        } catch (error) {
            console.error(
                "Get order error:",
                error
            );

            res.json({
    success: true,
    order:
        formatOrderForDashboard(order)
});
        }
    }
);

app.post("/api/orders", function (req, res) {
    try {
        const body = req.body || {};

        const customerName =
            String(
                body.customerName || ""
            ).trim();

        const customerPhone =
            String(
                body.customerPhone || ""
            ).trim();

        const customerAddress =
            String(
                body.customerAddress || ""
            ).trim();

        const orderType =
            String(
                body.orderType ||
                    "Delivery"
            ).trim();

        const paymentMethod =
            String(
                body.paymentMethod ||
                    "Cash on Delivery"
            ).trim();

        if (!customerName) {
            return res.status(400).json({
                success: false,
                message:
                    "Customer name is required"
            });
        }

        if (!customerPhone) {
            return res.status(400).json({
                success: false,
                message:
                    "Customer phone is required"
            });
        }

        if (
            orderType.toLowerCase() ===
                "delivery" &&
            !customerAddress
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Delivery address is required"
            });
        }

        if (
            !Array.isArray(body.items) ||
            body.items.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Order must contain at least one item"
            });
        }

        const orders = readOrders();

        let orderNumber =
            String(
                body.orderNumber || ""
            ).trim();

        if (!orderNumber) {
            orderNumber =
                generateOrderNumber();
        }

        const existingOrder =
            orders.find(function (order) {
                return (
                    order.orderNumber ===
                    orderNumber
                );
            });

        if (existingOrder) {
            orderNumber =
                generateOrderNumber();
        }

        const order = {
            id:
                Date.now().toString() +
                Math.random()
                    .toString(36)
                    .substring(2, 8),

            orderNumber,

            customerName,

            customerPhone,

            customerAddress,

            orderType,

            paymentMethod,

            items: body.items.map(
                function (item) {
                    return {
                        id:
                            item.id ??
                            null,

                        name:
                            String(
                                item.name || ""
                            ),

                        category:
                            String(
                                item.category ||
                                    ""
                            ),

                        price:
                            Number(
                                item.price || 0
                            ),

                        quantity:
                            Number(
                                item.quantity ||
                                    1
                            ),

                        itemTotal:
                            Number(
                                item.itemTotal ||
                                    (
                                        Number(
                                            item.price ||
                                                0
                                        ) *
                                        Number(
                                            item.quantity ||
                                                1
                                        )
                                    )
                            )
                    };
                }
            ),

            subtotal:
                Number(
                    body.subtotal || 0
                ),

            deliveryCharge:
                Number(
                    body.deliveryCharge || 0
                ),

            couponDiscount:
                Number(
                    body.couponDiscount || 0
                ),

            sundayDiscount:
                Number(
                    body.sundayDiscount || 0
                ),

            total:
                Number(
                    body.total || 0
                ),

            status: "Pending",

            createdAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString()
        };

        orders.push(order);

        writeOrders(orders);

        console.log(
            "New order received:",
            order.orderNumber
        );

        res.status(201).json({
            success: true,
            message:
                "Order saved successfully",
            orderNumber:
                order.orderNumber,
            order
        });
    } catch (error) {
        console.error(
            "Create order error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to save order",
            error:
                error.message
        });
    }
});

app.patch(
    "/api/orders/:id/status",
    function (req, res) {
        try {
            const orders = readOrders();

            const index =
                orders.findIndex(
                    function (order) {
                        return (
                            String(
                                order.id
                            ) ===
                            String(
                                req.params.id
                            )
                        );
                    }
                );

            if (index === -1) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Order not found"
                });
            }

            const allowedStatuses = [
                "Pending",
                "Preparing",
                "Ready",
                "Completed",
                "Cancelled"
            ];

            const newStatus =
                String(
                    req.body.status || ""
                ).trim();

            if (
                !allowedStatuses.includes(
                    newStatus
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid order status"
                });
            }

            orders[index].status =
                newStatus;

            orders[index].updatedAt =
                new Date().toISOString();

            writeOrders(orders);

            res.json({
                success: true,
                message:
                    "Order status updated",
                order: orders[index]
            });
        } catch (error) {
            console.error(
                "Update status error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to update order status",
                error:
                    error.message
            });
        }
    }
);

app.delete(
    "/api/orders/:id",
    function (req, res) {
        try {
            const orders = readOrders();

            const filteredOrders =
                orders.filter(
                    function (order) {
                        return (
                            String(
                                order.id
                            ) !==
                            String(
                                req.params.id
                            )
                        );
                    }
                );

            if (
                filteredOrders.length ===
                orders.length
            ) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Order not found"
                });
            }

            writeOrders(
                filteredOrders
            );

            res.json({
                success: true,
                message:
                    "Order deleted successfully"
            });
        } catch (error) {
            console.error(
                "Delete order error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to delete order",
                error:
                    error.message
            });
        }
    }
);

app.use(
    function (req, res) {
        res.status(404).json({
            success: false,
            message:
                "API endpoint not found",
            path: req.originalUrl
        });
    }
);

app.use(
    function (error, req, res, next) {
        console.error(
            "Server error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Internal server error",
            error:
                error.message
        });
    }
);

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