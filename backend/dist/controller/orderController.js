"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const model_1 = __importDefault(require("../mongodb/model"));
const orderModel_1 = __importDefault(require("../mongodb/orderModel"));
const validator_1 = require("../validators/validator");
const createOrder = async (req, res) => {
    console.log("Order route hit with body:", JSON.stringify(req.body));
    console.log("Request headers:", req.headers);
    console.log("Request method:", req.method);
    // Extract orderItems from request body
    const { orderItems } = req.body;
    console.log("Extracted orderItems:", orderItems);
    const name = "Guest";
    const phoneNumber = "1234567890";
    // Basic validation
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
        console.error("Invalid orderItems:", orderItems);
        return res.status(400).json({
            message: 'Invalid order data: orderItems must be a non-empty array'
        });
    }
    // Validate request body with Zod
    const validation = validator_1.orderSchema.safeParse(req.body);
    if (!validation.success) {
        console.error("Validation error:", validation.error.errors);
        return res.status(400).json({
            message: 'Invalid order data',
            errors: validation.error.errors
        });
    }
    console.log("Validation successful");
    try {
        console.log("Processing order items:", JSON.stringify(orderItems));
        // Ensure all quantities are numbers
        const normalizedOrderItems = orderItems.map(item => {
            console.log("Processing item:", JSON.stringify(item));
            return {
                menuItemId: item.menuItemId,
                quantity: typeof item.quantity === 'string' ? parseInt(item.quantity, 10) : item.quantity
            };
        });
        console.log("Normalized order items:", JSON.stringify(normalizedOrderItems));
        const menuItemIds = normalizedOrderItems.map(item => item.menuItemId);
        console.log("Menu item IDs:", menuItemIds);
        console.log("Looking for menu items with IDs:", menuItemIds);
        // Validate that all IDs are valid MongoDB ObjectIds
        const validMongoIds = menuItemIds.filter(id => /^[0-9a-fA-F]{24}$/.test(id));
        if (validMongoIds.length === 0) {
            console.error("No valid MongoDB IDs found in request");
            return res.status(400).json({
                message: 'No valid menu item IDs provided'
            });
        }
        if (validMongoIds.length !== menuItemIds.length) {
            console.warn(`Some invalid IDs were filtered out: ${menuItemIds.filter(id => !validMongoIds.includes(id))}`);
        }
        let menuItems = [];
        try {
            menuItems = await model_1.default.find({ _id: { $in: validMongoIds } });
            console.log("Found menu items:", menuItems.length);
            console.log("Menu items:", JSON.stringify(menuItems));
            if (menuItems.length === 0) {
                return res.status(400).json({
                    message: 'No valid menu items found for the provided IDs'
                });
            }
        }
        catch (err) {
            console.error("Error finding menu items:", err);
            return res.status(500).json({
                message: 'Error finding menu items',
                error: err.message
            });
        }
        // Create a map of menuItemId to price for quick lookup
        const menuItemPrices = {};
        menuItems.forEach((item) => {
            menuItemPrices[item._id.toString()] = item.price;
        });
        // Prepare order items with calculated subtotals
        const orderItemsWithSubtotal = normalizedOrderItems.map(item => {
            const price = menuItemPrices[item.menuItemId];
            if (!price) {
                throw new Error(`Menu item with ID ${item.menuItemId} not found`);
            }
            return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                unitPrice: price,
                subtotal: item.quantity * price
            };
        });
        // Calculate the total amount
        const totalAmount = orderItemsWithSubtotal.reduce((sum, item) => sum + item.subtotal, 0);
        console.log("Creating order with total:", totalAmount);
        // Create the order in MongoDB
        const newOrder = await orderModel_1.default.create({
            userName: name,
            phoneNumber: phoneNumber,
            status: "PENDING",
            orderItems: orderItemsWithSubtotal,
            totalAmount
        });
        console.log("Order created successfully:", newOrder._id);
        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder
        });
        return;
    }
    catch (error) {
        console.error("Error creating order:", error);
        // Check if it's a menu item not found error
        if (error.message && error.message.includes('Menu item with ID')) {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
exports.createOrder = createOrder;
