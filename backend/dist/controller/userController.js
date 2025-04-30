"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = void 0;
const validator_1 = require("../validators/validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const saveUser = async (req, res) => {
    const body = req.body;
    const payload = validator_1.crateSchema.safeParse(body);
    if (!payload.success) {
        res.status(400).json({ error: payload.error.errors });
        return;
    }
    try {
        const user = await db_1.default.user.create({
            data: {
                name: payload.data?.name,
                phoneNumber: payload.data?.phone_number
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '72h' });
        res.json({ message: "User created", token });
        return;
    }
    catch (e) {
        console.log("failed to craete user ", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.saveUser = saveUser;
