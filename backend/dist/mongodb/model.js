"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// MongoDB - menuItem.model.js
const menuItemSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'], required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    available: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose_1.default.model('MenuItem', menuItemSchema);
const MenuItem = mongoose_1.default.model('MenuItem', menuItemSchema);
exports.default = MenuItem;
