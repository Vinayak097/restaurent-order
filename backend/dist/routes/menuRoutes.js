"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongodb/model"));
const router = express_1.default.Router();
//Fetching all menu items (potentially by category).
//Fetching all menu items (potentially by category).
//Fetching all menu items (potentially by category).
//Fetching all menu items (potentially by category).
router.get("/", async (req, res) => {
    const { category, limit = 5, page = 1 } = req.query;
    let query = {};
    if (category && category !== 'all') {
        query = { category };
    }
    try {
        // Convert limit and page to numbers
        const limitNum = parseInt(limit) || 20;
        const pageNum = parseInt(page) || 1;
        const skip = (pageNum - 1) * limitNum;
        // Get total count for pagination info
        const total = await model_1.default.countDocuments(query);
        // Get menu items with pagination
        const menuItems = await model_1.default.find(query)
            .sort({ category: 1 })
            .skip(skip)
            .limit(limitNum);
        res.status(200).json({
            message: "success",
            menu: menuItems,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum)
            }
        });
    }
    catch (e) {
        console.log(e, 'menu items');
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
//Fetching a single menu item's details (if needed).
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await model_1.default.findById(id);
        if (!menuItem) {
            res.status(404).json({ message: 'Menu item not found' });
            return;
        }
        res.status(200).json(menuItem);
        return;
    }
    catch (e) {
        console.log(e, 'menu items');
        res.status(500).json("Internal Server Error");
        return;
    }
});
exports.default = router;
