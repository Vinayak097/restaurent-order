"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = __importDefault(require("./mongodb/mongodb"));
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const orderRouter_1 = __importDefault(require("./routes/orderRouter"));
const userRoutes_1 = __importDefault(require("./routes//userRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true, // if you're using cookies/auth headers
}));
app.use(express_1.default.json());
app.use('/menu', menuRoutes_1.default);
app.use('/order', orderRouter_1.default);
app.use('/user', userRoutes_1.default);
app.listen(3000, async () => {
    await (0, mongodb_1.default)();
    console.log('server is ruuning');
});
