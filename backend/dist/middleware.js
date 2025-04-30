"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const middleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(403).json({ message: "user not authanticated" });
        return;
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (e) {
        console.log('middlewware ', e);
        res.status(400).json({ message: 'error decodeing token' });
        return;
    }
};
exports.middleware = middleware;
