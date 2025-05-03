"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = exports.orderItemSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
// User validation schema
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    phone_number: zod_1.z.string().min(10).max(15)
});
// Order validation schema
exports.orderItemSchema = zod_1.z.object({
    menuItemId: zod_1.z.string().min(1),
    quantity: zod_1.z.number().int().positive()
});
exports.orderSchema = zod_1.z.object({
    orderItems: zod_1.z.array(exports.orderItemSchema).min(1)
});
