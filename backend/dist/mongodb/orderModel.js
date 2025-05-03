"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Order Item Schema
const orderItemSchema = new mongoose_1.default.Schema({
    menuItemId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unitPrice: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    }
});
// Order Schema
const orderSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    },
    orderItems: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Ensure we don't have duplicate model
let Order;
try {
    Order = mongoose_1.default.model('Order');
}
catch (e) {
    Order = mongoose_1.default.model('Order', orderSchema);
}
exports.default = Order;
