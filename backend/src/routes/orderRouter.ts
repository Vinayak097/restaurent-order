import e from "express";
import { getallOrders, getOrder } from "../controller/orderItem.controller";
import prisma from "../db";

const router = e.Router();
import MenuItem from "../mongodb/model";
import { middleware } from "../middleware";
router.get('/getallorders' , getallOrders)
router.get('/getorder/:id' , getOrder)
router.post('/',middleware, async (req, res) => {
    const {  orderItems } = req.body;
    const userId=req.user.userId
    if (!userId || !orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
        res.status(400).json({ message: 'Invalid order data' });
        return;
    }
    try {

        const menuItemIds = orderItems.map(item => item.menuItemId);


        const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } });

        // Create a map of menuItemId to price for quick lookup
        const menuItemPrices: { [key: string]: number } = {};
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

        const order = await prisma.$transaction(async (tx: any) => {
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
        const totalAmount = order.orderItems.reduce(
            (sum: number, item: { subtotal: any }) => sum + Number(item.subtotal),
            0
        );

        res.status(201).json({
            message: 'Order created successfully',
            order: {
                ...order,
                totalAmount
            }
        });
        return;
    } catch (error: any) {
        console.log(error, 'create order error');

        // Check if it's a menu item not found error
        if (error.message && error.message.includes('Menu item with ID')) {
            res.status(400).json({ message: error.message });
            return;
        }

        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;