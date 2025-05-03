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
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// Allow multiple origins for CORS
const allowedOrigins = [
    'http://localhost:5173',
    'https://digital-diner.netlify.app' // Add your Netlify URL here when deployed
];
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express_1.default.json());
// API routes
app.use('/menu', menuRoutes_1.default);
app.use('/order', orderRouter_1.default);
// Health check endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await (0, mongodb_1.default)();
    console.log(`Server is running on port ${PORT}`);
});
