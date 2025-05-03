import prisma from "../db";
import { RequestHandler } from "../types";

export const getallOrders: RequestHandler = async (req, res) => {
    const { limit = 5, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    try {
        // Get total count for pagination
        const totalCount = await prisma.order.count();

        const orders = await prisma.order.findMany({
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
        const ordersWithTotal = orders.map((order: any) => {
            const totalAmount = order.orderItems.reduce(
                (sum: number, item: { subtotal: any }) => sum + Number(item.subtotal),
                0
            );
            return { ...order, totalAmount };
        });

        res.status(200).json({
            orders: ordersWithTotal,
            total: totalCount,
            page: Number(page),
            limit: Number(limit)
        });
        return;
    } catch (e) {
        console.log(e, 'getall orders');
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

export const getOrder: RequestHandler = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: 'Order ID is required' });
        return;
    }

    try {
        const order = await prisma.order.findUnique({
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
        const totalAmount = order.orderItems.reduce(
            (sum: number, item: { subtotal: any }) => sum + Number(item.subtotal),
            0
        );

        // Add totalAmount to the order object
        const orderWithTotal = {
            ...order,
            totalAmount
        };

        res.status(200).json({ message: 'order fetched', order: orderWithTotal });
        return;
    } catch (e) {
        console.log(e, 'getorder');
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}