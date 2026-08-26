"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
// All routes are now public - no authentication required
router.post("/", order_controller_1.createOrder);
router.get("/myorders", order_controller_1.getMyOrders);
router.get("/admin", order_controller_1.getOrders); // This is what your frontend calls
router.get("/", order_controller_1.getOrders); // Keep for backward compatibility
router.get("/:id", order_controller_1.getOrderById);
router.put("/:id/pay", order_controller_1.updateOrderToPaid);
router.put("/:id/cancel", order_controller_1.cancelOrder);
router.put("/:id/status", order_controller_1.updateOrderStatus); // No admin check needed
router.get("/status/:status", order_controller_1.getOrdersByStatus);
exports.default = router;
