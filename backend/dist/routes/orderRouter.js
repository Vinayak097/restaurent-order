"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderItem_controller_1 = require("../controller/orderItem.controller");
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
const model_1 = __importDefault(require("../mongodb/model"));
const middleware_1 = require("../middleware");
router.get('/getallorders', orderItem_controller_1.getallOrders);
router.get('/getorder/:id', orderItem_controller_1.getOrder);
router.post('/', middleware_1.middleware, async (req, res) => {
    const { orderItems } = req.body;
    const userId = req.user.userId;
    if (!userId || !orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
        res.status(400).json({ message: 'Invalid order data' });
        return;
    }
    try {
        const menuItemIds = orderItems.map(item => item.menuItemId);
        const menuItems = await model_1.default.find({ _id: { $in: menuItemIds } });
        // Create a map of menuItemId to price for quick lookup
        const menuItemPrices = {};
        menuItems.forEach(item => {
            menuItemPrices[item._id.toString()] = item.price;
        });
        // Prepare order items with calculated subtotals
        const orderItemsWithSubtotal = orderItems.map(item => {
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
        const order = await db_1.default.$transaction(async (tx) => {
            // Create the order first
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    status: "PENDING",
                    orderItems: {
                        create: orderItemsWithSubtotal
                    }
                },
                include: {
                    orderItems: true,
                    user: true
                }
            });
            return newOrder;
        });
        // Calculate the total amount from the order items
        const totalAmount = order.orderItems.reduce((sum, item) => sum + Number(item.subtotal), 0);
        res.status(201).json({
            message: 'Order created successfully',
            order: {
                ...order,
                totalAmount
            }
        });
        return;
    }
    catch (error) {
        console.log(error, 'create order error');
        // Check if it's a menu item not found error
        if (error.message && error.message.includes('Menu item with ID')) {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
