"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    items: [
        {
            productId: { type: String, required: [true, "Product ID is required"] },
            productName: { type: String, required: [true, "Product name is required"] },
            productImage: { type: String, required: [true, "Product image is required"] },
            quantity: { type: Number, required: [true, "Quantity is required"], min: 1 },
            price: { type: Number, required: [true, "Price is required"], min: 0 },
            size: { type: String },
            tone: { type: String },
        },
    ],
    shippingAddress: {
        firstName: { type: String, required: [true, "First name is required"] },
        lastName: { type: String, required: [true, "Last name is required"] },
        email: { type: String, required: [true, "Email is required"] },
        phone: { type: String, required: [true, "Phone is required"] },
        street: { type: String, required: [true, "Street is required"] },
        city: { type: String, required: [true, "City is required"] },
        state: { type: String, required: [true, "State is required"] },
        zipCode: { type: String, required: [true, "ZIP code is required"] },
        country: { type: String, required: [true, "Country is required"] },
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "paypal"],
        required: [true, "Payment method is required"],
    },
    subtotal: { type: Number, required: [true, "Subtotal is required"], min: 0 },
    deliveryCharge: { type: Number, required: [true, "Delivery charge is required"], min: 0 },
    tax: { type: Number, required: [true, "Tax is required"], min: 0 },
    totalAmount: { type: Number, required: [true, "Total amount is required"], min: 0 },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    orderDate: { type: Date, default: Date.now },
    estimatedDelivery: { type: Date, required: [true, "Estimated delivery is required"] },
    trackingNumber: { type: String },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    paidAt: { type: Date },
    isPaid: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
}, { timestamps: true });
// Add indexes for better performance
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderDate: -1 });
orderSchema.index({ createdAt: -1 });
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
