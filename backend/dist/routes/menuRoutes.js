"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongodb/model"));
const router = express_1.default.Router();
//Fetching all menu items (potentially by category).
router.get("/", async (req, res) => {
    const { category } = req.body;
    try {
        const menu = await model_1.default.aggregate([
            { $sort: { category: 1 } },
            { $limit: 10 },
            {
                $group: {
                    _id: '$category',
                    items: { $push: '$$ROOT' }
                }
            },
            {
                $project: {
                    category: '$_id',
                    items: 1,
                    _id: 0
                }
            }
        ]);
        res.status(200).json({ message: "success ", menu });
        return;
    }
    catch (e) {
        console.log(e, 'menu items');
        res.status(500).json("Internal Server Error");
        return;
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
