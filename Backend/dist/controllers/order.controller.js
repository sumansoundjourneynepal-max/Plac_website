"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByStatus = exports.cancelOrder = exports.getOrders = exports.getMyOrders = exports.updateOrderStatus = exports.updateOrderToPaid = exports.getOrderById = exports.createOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = __importDefault(require("../models/order.model"));
const errorResponse_1 = require("../utils/errorResponse");
const OrderStatusValues = {
    PENDING: "pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
};
// Create a demo ObjectId that we'll reuse for all demo orders
const DEMO_USER_ID = new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439011");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderItems, items, shippingAddress, paymentMethod, itemsPrice, subtotal, taxPrice, tax, shippingPrice, deliveryCharge, totalPrice, totalAmount, userId, } = req.body;
        const finalItems = orderItems || items;
        if (!finalItems || finalItems.length === 0) {
            return next(new errorResponse_1.ErrorResponse("No order items", 400));
        }
        // Use the actual user ID if provided, otherwise use demo ID
        const finalUserId = userId && mongoose_1.default.Types.ObjectId.isValid(userId) ? new mongoose_1.default.Types.ObjectId(userId) : DEMO_USER_ID;
        const order = new order_model_1.default({
            userId: finalUserId,
            items: finalItems,
            shippingAddress,
            paymentMethod,
            subtotal: subtotal || itemsPrice || 0,
            tax: tax || taxPrice || 0,
            deliveryCharge: deliveryCharge || shippingPrice || 0,
            totalAmount: totalAmount || totalPrice || 0,
            status: OrderStatusValues.PENDING,
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        const createdOrder = yield order.save();
        const transformedOrder = {
            id: createdOrder._id.toString(),
            userId: createdOrder.userId,
            items: createdOrder.items,
            shippingAddress: createdOrder.shippingAddress,
            paymentMethod: createdOrder.paymentMethod,
            subtotal: createdOrder.subtotal,
            deliveryCharge: createdOrder.deliveryCharge,
            tax: createdOrder.tax,
            totalAmount: createdOrder.totalAmount,
            status: createdOrder.status,
            orderDate: createdOrder.createdAt,
            estimatedDelivery: createdOrder.estimatedDelivery,
            isPaid: createdOrder.isPaid || false,
            paidAt: createdOrder.paidAt,
            isDelivered: createdOrder.isDelivered || false,
            deliveredAt: createdOrder.deliveredAt,
            trackingNumber: createdOrder.trackingNumber,
        };
        res.status(201).json(transformedOrder);
    }
    catch (error) {
        console.error("Create order error:", error);
        next(error);
    }
});
exports.createOrder = createOrder;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.findById(req.params.id).populate("userId", "firstName lastName email");
        if (!order) {
            return next(new errorResponse_1.ErrorResponse("Order not found", 404));
        }
        res.json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderById = getOrderById;
const updateOrderToPaid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const order = yield order_model_1.default.findById(req.params.id);
        if (!order) {
            return next(new errorResponse_1.ErrorResponse("Order not found", 404));
        }
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(req.params.id, {
            $set: {
                status: OrderStatusValues.PROCESSING,
                isPaid: true,
                paidAt: new Date(),
                paymentResult: {
                    id: req.body.id || "demo-payment",
                    status: req.body.status || "completed",
                    update_time: req.body.update_time || new Date().toISOString(),
                    email_address: ((_a = req.body.payer) === null || _a === void 0 ? void 0 : _a.email_address) || "demo@example.com",
                },
            },
        }, { new: true });
        res.json(updatedOrder);
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderToPaid = updateOrderToPaid;
const updateOrderStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, trackingNumber } = req.body;
        if (!Object.values(OrderStatusValues).includes(status)) {
            return next(new errorResponse_1.ErrorResponse("Invalid order status", 400));
        }
        const order = yield order_model_1.default.findById(req.params.id);
        if (!order) {
            return next(new errorResponse_1.ErrorResponse("Order not found", 404));
        }
        // Simplified - allow any status change for demo purposes
        const updateData = {
            status,
        };
        if (status === OrderStatusValues.SHIPPED && trackingNumber) {
            updateData.trackingNumber = trackingNumber;
        }
        if (status === OrderStatusValues.DELIVERED) {
            updateData.deliveredAt = new Date();
            updateData.isDelivered = true;
        }
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
        // Transform response to match frontend expectations
        const transformedOrder = {
            id: updatedOrder._id.toString(),
            userId: updatedOrder.userId,
            items: updatedOrder.items,
            shippingAddress: updatedOrder.shippingAddress,
            paymentMethod: updatedOrder.paymentMethod,
            subtotal: updatedOrder.subtotal,
            deliveryCharge: updatedOrder.deliveryCharge,
            tax: updatedOrder.tax,
            totalAmount: updatedOrder.totalAmount,
            status: updatedOrder.status,
            orderDate: updatedOrder.createdAt,
            estimatedDelivery: updatedOrder.estimatedDelivery,
            isPaid: updatedOrder.isPaid,
            paidAt: updatedOrder.paidAt,
            isDelivered: updatedOrder.isDelivered,
            deliveredAt: updatedOrder.deliveredAt,
            trackingNumber: updatedOrder.trackingNumber,
        };
        res.json(transformedOrder);
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderStatus = updateOrderStatus;
const getMyOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return next(new errorResponse_1.ErrorResponse("User ID is required", 400));
        }
        console.log("Fetching orders for user:", userId);
        // Try to find orders by userId (could be string or ObjectId)
        let orders;
        if (mongoose_1.default.Types.ObjectId.isValid(userId)) {
            // If it's a valid ObjectId, search by ObjectId
            orders = yield order_model_1.default.find({ userId: new mongoose_1.default.Types.ObjectId(userId) }).sort({ createdAt: -1 });
        }
        else {
            // If it's not a valid ObjectId, search by string
            orders = yield order_model_1.default.find({ userId: userId }).sort({ createdAt: -1 });
        }
        console.log(`Found ${orders.length} orders for user ${userId}`);
        // Transform the data to match frontend expectations
        const transformedOrders = orders.map((order) => ({
            id: order._id.toString(),
            userId: order.userId,
            items: order.items,
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            subtotal: order.subtotal,
            deliveryCharge: order.deliveryCharge,
            tax: order.tax,
            totalAmount: order.totalAmount,
            status: order.status,
            orderDate: order.createdAt,
            estimatedDelivery: order.estimatedDelivery,
            isPaid: order.isPaid || false,
            paidAt: order.paidAt,
            isDelivered: order.isDelivered || false,
            deliveredAt: order.deliveredAt,
            trackingNumber: order.trackingNumber,
        }));
        res.json(transformedOrders);
    }
    catch (error) {
        console.error("Get my orders error:", error);
        next(error);
    }
});
exports.getMyOrders = getMyOrders;
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find({}).populate("userId", "firstName lastName email").sort({ createdAt: -1 });
        // Transform the data to match frontend expectations
        const transformedOrders = orders.map((order) => ({
            id: order._id.toString(),
            userId: order.userId,
            items: order.items,
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            subtotal: order.subtotal,
            deliveryCharge: order.deliveryCharge,
            tax: order.tax,
            totalAmount: order.totalAmount,
            status: order.status,
            orderDate: order.createdAt,
            estimatedDelivery: order.estimatedDelivery,
            isPaid: order.isPaid || false,
            paidAt: order.paidAt,
            isDelivered: order.isDelivered || false,
            deliveredAt: order.deliveredAt,
            trackingNumber: order.trackingNumber,
        }));
        res.json(transformedOrders);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrders = getOrders;
const cancelOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.findById(req.params.id);
        if (!order) {
            return next(new errorResponse_1.ErrorResponse("Order not found", 404));
        }
        // Simplified - allow cancellation from any status for demo
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(req.params.id, { $set: { status: OrderStatusValues.CANCELLED } }, { new: true });
        res.json(updatedOrder);
    }
    catch (error) {
        next(error);
    }
});
exports.cancelOrder = cancelOrder;
const getOrdersByStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.params;
        if (!Object.values(OrderStatusValues).includes(status)) {
            return next(new errorResponse_1.ErrorResponse("Invalid order status", 400));
        }
        const orders = yield order_model_1.default.find({ status }).populate("userId", "firstName lastName email").sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrdersByStatus = getOrdersByStatus;
