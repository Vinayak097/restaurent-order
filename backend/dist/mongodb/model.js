"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const menuItemSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image_url: { type: String },
    customizations: [
        {
            name: { type: String, required: true },
            options: [
                {
                    name: { type: String, required: true },
                    price_addition: { type: Number, required: true }
                }
            ]
        }
    ],
    availability: { type: Boolean, default: true },
    nutritional_info: {
        calories: { type: Number },
        allergens: [{ type: String }]
    }
}, {
    timestamps: true
});
const MenuItem = mongoose_1.default.model('MenuItem', menuItemSchema);
exports.default = MenuItem;
