import Order, { IOrder } from "../mongodb/orderModel";
import { RequestHandler } from "../types";

export const getallOrders: RequestHandler = async (req, res) => {
    const { limit = 5, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    try {
        console.log("Fetching orders with limit:", limit, "page:", page);

        // Get total count for pagination
        const totalCount = await Order.countDocuments();

        const orders: IOrder[] = await Order.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        console.log("Found orders:", orders.length);

        res.status(200).json({
            orders,
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
        console.log("Fetching order with ID:", id);

        const order: IOrder | null = await Order.findById(id);

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        console.log("Found order:", order._id);

        res.status(200).json({ message: 'Order fetched', order });
        return;
    } catch (e) {
        console.log(e, 'getorder');
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}