import express from "express";
import { getallOrders, getOrder } from "../controller/orderItem.controller";
import { createOrder } from "../controller/orderController";

const router = express.Router();

// Get all orders
router.get('/getallorders', getallOrders);

// Get a specific order by ID
router.get('/getorder/:id', getOrder);

// Create a new order
router.post('/', createOrder);

export default router;