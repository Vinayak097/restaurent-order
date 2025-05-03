"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderItem_controller_1 = require("../controller/orderItem.controller");
const orderController_1 = require("../controller/orderController");
const router = express_1.default.Router();
// Get all orders
router.get('/getallorders', orderItem_controller_1.getallOrders);
// Get a specific order by ID
router.get('/getorder/:id', orderItem_controller_1.getOrder);
// Create a new order
router.post('/', orderController_1.createOrder);
exports.default = router;
