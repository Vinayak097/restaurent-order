import { Request, Response } from "express";
import prisma from "../db";

export const getallOrders = async (req: Request, res: Response) => {
    const { limit = 10, page = 1 } = req.query;
    console.log('minit ' , limit, page)
    const skip = (Number(page) - 1) * Number(limit);
    try {
        const orders = await prisma.order.findMany({
            skip,
            take: Number(limit),
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

        res.status(200).json({ orders: ordersWithTotal });
        return;
    } catch (e) {
        console.log(e, 'getall orders');
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(401).json({ message: 'id not found' });
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
            res.status(404).json({ message: 'order not found' });
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