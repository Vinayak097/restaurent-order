"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.getallOrders = void 0;
const db_1 = __importDefault(require("../db"));
const getallOrders = async (req, res) => {
    const { limit = 5, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    try {
        // Get total count for pagination
        const totalCount = await db_1.default.order.count();
        const orders = await db_1.default.order.findMany({
            skip,
            take: Number(limit),
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                orderItems: true,
                user: true
            }
        });
        // Calculate totalAmount for each order
        const ordersWithTotal = orders.map((order) => {
            const totalAmount = order.orderItems.reduce((sum, item) => sum + Number(item.subtotal), 0);
            return { ...order, totalAmount };
        });
        res.status(200).json({
            orders: ordersWithTotal,
            total: totalCount,
            page: Number(page),
            limit: Number(limit)
        });
        return;
    }
    catch (e) {
        console.log(e, 'getall orders');
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};
exports.getallOrders = getallOrders;
const getOrder = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Order ID is required' });
        return;
    }
    try {
        const order = await db_1.default.order.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                orderItems: true,
                user: true
            }
        });
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        // Calculate the total amount
        const totalAmount = order.orderItems.reduce((sum, item) => sum + Number(item.subtotal), 0);
        // Add totalAmount to the order object
        const orderWithTotal = {
            ...order,
            totalAmount
        };
        res.status(200).json({ message: 'order fetched', order: orderWithTotal });
        return;
    }
    catch (e) {
        console.log(e, 'getorder');
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
exports.getOrder = getOrder;
