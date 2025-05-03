"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByPhone = exports.saveUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const validator_1 = require("../validators/validator");
const saveUser = async (req, res) => {
    const body = req.body;
    // Validate request body
    const validation = validator_1.userSchema.safeParse(body);
    if (!validation.success) {
        return res.status(400).json({
            message: 'Invalid input data',
            errors: validation.error.errors
        });
    }
    try {
        // Check if user already exists
        const existingUser = await db_1.default.user.findUnique({
            where: {
                phoneNumber: validation.data.phone_number
            }
        });
        let user;
        if (existingUser) {
            // Use existing user
            user = existingUser;
        }
        else {
            // Create new user
            user = await db_1.default.user.create({
                data: {
                    name: validation.data.name,
                    phoneNumber: validation.data.phone_number
                }
            });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '72h' });
        return res.status(existingUser ? 200 : 201).json({
            message: existingUser ? "User logged in" : "User created",
            token,
            userId: user.id
        });
    }
    catch (error) {
        console.error("Error in user creation/login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.saveUser = saveUser;
const getUserByPhone = async (req, res) => {
    const { phoneNumber } = req.params;
    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }
    try {
        const user = await db_1.default.user.findUnique({
            where: {
                phoneNumber
            },
            include: {
                orders: {
                    include: {
                        orderItems: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getUserByPhone = getUserByPhone;
